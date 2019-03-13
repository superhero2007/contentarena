import React from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader";
import { ROUTE_PATHS } from "../../common/constants";

class CmsSearchCompetition extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pageSize: 20,
			input: "",
			valid: false,
			searching: false,
			searchDone: false,
			results: [],
			resultMessage: "",
		};

		this.competitionInput = React.createRef();
	}

	componentDidMount() {
		this.competitionInput.current.focus();
	}

	search = () => {
		const _this = this;
		const {
			onSearch,
		} = this.props;

		this.setState({
			searching: true,
		});

		ContentArena.Api.searchCompetition(this.state.input).done((results) => {
			const names = [];

			results = results.map((item) => {
				item.name = item.name.replace(/ singles/gi, "").replace(/ double/gi, "");
				return item;
			}).filter((item) => {
				if (!item.sport || !item.sport.externalId || item.sport.externalId !== "sr:sport:5") {
					return true;
				}

				if (names.indexOf(item.name) === -1) {
					names.push(item.name);
					return true;
				}
				return false;
			});

			_this.setState({
				results,
				searching: false,
				searchDone: true,
			});
			_this.setState({
				resultMessage: _this.getResultMessage(0),
			});

			onSearch(results);
		}).always(() => {
			_this.setState({
				searching: false,
				searchDone: true,
			});
		});
	};

	handleInput = (e) => {
		const input = e.target.value;

		this.setState(prevState => ({
			valid: input.length > 2,
			input,
			searchDone: (input.length > 0) ? prevState.searchDone : false,
		}));
	};

	handleKeyPress = (e) => {
		const { searching, valid } = this.state;
		if (e.key === "Enter" && !searching && valid) {
			this.search();
		}
	};

	getResultMessage = (page) => {
		page++;
		const total = this.state.results.length;
		let pageTotal = this.state.pageSize * page;
		const pageQuantity = (page === 1) ? 1 : (this.state.pageSize * (page - 1)) + 1;

		if (pageTotal > total) pageTotal = total;

		return `${pageQuantity}-${pageTotal} of ${total} results for '${this.state.input}'`;
	};

	render() {
		const {
			searching,
		} = this.state;

		const {
			onCreateManually,
		} = this.props;

		return (
			<div className="step-content-container search-competition">
				<div className="base-input search-competition-input">
					<input
						type="text"
						onKeyPress={this.handleKeyPress}
						onChange={this.handleInput}
						placeholder={this.context.t("CL_STEP1_SEARCH_PLACEHOLDER")}
						ref={this.competitionInput}
					/>
					<button
						className="standard-button"
						disabled={!this.state.valid || this.state.searching}
						onClick={this.search}
					>
						{!searching && "Search"}
						<Loader loading={searching} xSmall />
					</button>
				</div>

				{this.state.searchDone && this.state.results.length === 0 && (
					<div className="search-competition-messages">
						<i className="fa fa-exclamation-circle" />
						<Translate i18nKey="CMS_SEARCH_NO_RESULTS" params={{ n: this.state.input }} style={{ width: "auto" }} />
						<a onClick={onCreateManually}>
							<Translate i18nKey="CMS_WELCOME_SEARCH_PHRASE_2" />
						</a>
					</div>
				)}
			</div>
		);
	}
}

CmsSearchCompetition.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsSearchCompetition;
