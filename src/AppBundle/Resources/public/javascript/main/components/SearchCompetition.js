import React from "react";
import ReactTable from "react-table";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader";

class SearchCompetition extends React.Component {
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
	}

	search = () => {
		const _this = this;

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

	onPageChange = (page) => {
		const resultMessage = this.getResultMessage(page);
		this.setState(() => ({
			resultMessage,
		}));
	};

	render() {
		const {
			hideDescription,
			hideEnterManually,
		} = this.props;

		const {
			searching,
		} = this.state;

		return (
			<div className="step-content-container search-competition">
				{
					!hideDescription
					&& (
						<div className="step-item-description">
							<Translate i18nKey="CL_STEP1_SEARCH_TITLE" />
						</div>
					)
				}
				<div className="base-input search-competition-input">
					<input
						type="text"
						onKeyPress={this.handleKeyPress}
						onChange={this.handleInput}
						placeholder={this.context.t("CL_STEP1_SEARCH_PLACEHOLDER")}
						style={{ marginLeft: "inherit" }}
					/>
					<button
						className="standard-button"
						disabled={!this.state.valid || this.state.searching}
						onClick={this.search}
					>
						Search <Loader loading={searching} xSmall />
					</button>
				</div>

				<div className="search-competition-messages">
					{this.state.searchDone && this.state.results.length === 0 && (
						<div style={{ width: 645, alignSelf: "center" }}>
							{this.context.t("CL_STEP1_SEARCH_NO_RESULTS", { n: this.state.input })}
							<Translate i18nKey="CL_STEP1_SEARCH_TRY" />
						</div>
					)}

					{this.state.searchDone && this.state.results.length > 0 && !hideEnterManually && (
						<div className="step-item-description" style={{ margin: "auto", marginRight: -210 }}>
							<Translate i18nKey="CL_STEP1_SEARCH_CANT_FIND" />
						</div>
					)}

					{
						!hideEnterManually
						&& (
							<button
								className="standard-button standard-button-big"
								onClick={this.props.close}
								style={{ marginLeft: "auto", alignSelf: "center" }}
							>
								<Translate i18nKey="CL_STEP1_ENTER_MANUALLY" />
							</button>
						)
					}
				</div>

				{this.state.searchDone && this.state.results.length > 0 && (
					<div style={{ color: "#4F4F4F" }}>
						{this.state.resultMessage}
					</div>
				)}

				{this.state.results.length > 0 && (
					<div style={{ marginBottom: 20 }}>
						<ReactTable
							defaultPageSize={this.state.pageSize}
							showPageSizeOptions={false}
							onPageChange={this.onPageChange}
							minRows={0}
							data={this.state.results}
							select={this.props.select}
							className="ca-table"
							columns={[{
								Header: <Translate i18nKey="CL_STEP1_SEARCH_HEADER_COMPETITION" />,
								accessor: "name", // String-based value accessors!
							}, {
								Header: <Translate i18nKey="CL_STEP1_SEARCH_HEADER_COUNTRY" />,
								accessor: "sportCategory.name",
							}, {
								accessor: "sport.name", // Required because our accessor is not a string
								Header: <Translate i18nKey="CL_STEP1_SEARCH_HEADER_SPORT" />,
							}, {
								Header: "", // Custom header components!
								Cell: props => (
									<button
										className="blue-button"
										onClick={() => {
											this.props.select(props.original);
										}}
									>
										<Translate i18nKey="CL_STEP1_SEARCH_BUTTON_SELECT" />
									</button>
								),
							}]}
						/>
					</div>
				)}

			</div>
		);
	}
}

SearchCompetition.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default SearchCompetition;
