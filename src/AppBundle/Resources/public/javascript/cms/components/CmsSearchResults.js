import React from "react";
import ReactTable from "react-table";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader";

class CmsSearchResults extends React.Component {
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
			results,
		} = this.props;

		const {
			searching,
		} = this.state;

		return (
			<div className="step-content-container search-competition">

				{results.length > 0 && (
					<div style={{ marginBottom: 20 }}>
						<ReactTable
							defaultPageSize={this.state.pageSize}
							showPagination={results.length > 10}
							showPageSizeOptions={false}
							onPageChange={this.onPageChange}
							minRows={0}
							data={results}
							select={this.props.select}
							className="ca-table"
							columns={[{
								Header: <Translate i18nKey="CL_STEP1_SEARCH_HEADER_COMPETITION" />,
								className: "d-flex align-items-center",
								accessor: "name", // String-based value accessors!
							}, {
								Header: <Translate i18nKey="CL_STEP1_SEARCH_HEADER_COUNTRY" />,
								className: "d-flex align-items-center",
								accessor: "sportCategory.name",
							}, {
								accessor: "sport.name", // Required because our accessor is not a string
								className: "d-flex align-items-center",
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

CmsSearchResults.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsSearchResults;
