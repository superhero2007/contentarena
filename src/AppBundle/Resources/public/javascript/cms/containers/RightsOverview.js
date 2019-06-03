import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import cn from "classnames";
import ReactTable from "react-table";
import CmsRightsFilter from "../components/CmsRightsFilter";
import CmsSeasonsFilter from "../components/CmsSeasonsFilter";
import CmsTerritoriesFilter from "../components/CmsTerritoriesFilter";
import { blueCheckIcon, yellowCheckIcon } from "../../main/components/Icons";
import { RIGHT_STATUS } from "../../common/constants";

class RightsOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectedTerritories: new Map(),
		};
	}

	componentWillReceiveProps(nextProps) {
		const { propertyFilters: { selectedTerritories, rights, regions } } = nextProps;
		if (this.props.propertyFilters.rights.length !== rights.length
			|| this.props.propertyFilters.regions.length !== regions.length) this.setState({ selectedTerritories });
	}

	renderSeasonRightHeader = (right, key, list, season) => (
		<div className="d-flex justify-content-center">
			{
				key === 0
					&& (
						<div className="season-header" style={{ width: 40 * list.length }}>
							{season.year}
						</div>
					)
			}
			<span>
				{right.code}
			</span>
		</div>
	);

	renderSeasonRightCell = (right, key, list) => (
		<div className="d-flex justify-content-center">
			<img src={right.exclusive ? yellowCheckIcon : blueCheckIcon} alt="" />
		</div>
	);

	renderRightHeader = right => (
		<div className="d-flex justify-content-center">
			<span>
				{right.code}
			</span>
		</div>
	);

	renderRightCell = right => (
		<div className="d-flex justify-content-center">
			<img src={right.exclusive ? yellowCheckIcon : blueCheckIcon} alt="" />
		</div>
	);

	getColumns = () => {
		const { propertyFilters: { seasons, rights } } = this.props;

		const columns = [];

		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY"),
			accessor: "name",
		});

		if (seasons.length > 0) {
			seasons.forEach((season) => {
				rights.forEach((right, key, list) => {
					columns.push({
						headerClassName: "season-header-column",
						Header: props => this.renderSeasonRightHeader(right, key, list, season),
						Cell: () => this.renderSeasonRightCell(right, key, list),
						maxWidth: 40,
					});
				});
			});
		} else {
			rights.forEach((right, key, list) => {
				columns.push({
					headerClassName: "season-header-column",
					Header: () => this.renderRightHeader(right),
					Cell: () => this.renderRightCell(right),
					maxWidth: 40,
				});
			});
		}


		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING"),
			Cell: props => (
				<div className="d-flex justify-content-center">
					1
				</div>

			),
		});

		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS"),
			Cell: props => (
				<div className="d-flex justify-content-center">
					1
				</div>
			),
		});

		return columns;
	};

	render() {
		const {
			selectedTerritories,
		} = this.state;

		const { property, common: { totalCountries } } = this.props;

		const territories = Array.from(selectedTerritories.values());

		return (
			<div className="region-filter">
				<CmsSeasonsFilter property={property} />
				<CmsRightsFilter property={property} />
				<CmsTerritoriesFilter property={property} />

				<div className="d-flex">
					<div className="split-filter">
						<div className="region-filter-title">
							{ this.context.t("CMS_STATUS_TITLE")}
						</div>
						<div className="right-status">
							<div>
								<input
									type="checkbox"
									checked={this.state[RIGHT_STATUS.AVAILABLE_RIGHTS]}
									className="ca-checkbox blue"
									onChange={(e) => { this.setState({ [RIGHT_STATUS.AVAILABLE_RIGHTS]: e.target.checked }); }}
									id={RIGHT_STATUS.AVAILABLE_RIGHTS}
								/>
								<label
									className={cn({ selected: this.state[RIGHT_STATUS.AVAILABLE_RIGHTS] })}
									htmlFor={RIGHT_STATUS.AVAILABLE_RIGHTS}
								>
									{this.context.t("CMS_AVAILABLE_RIGHTS")}
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									checked={this.state[RIGHT_STATUS.OFFERED_RIGHTS]}
									className="ca-checkbox blue"
									onChange={(e) => { this.setState({ [RIGHT_STATUS.OFFERED_RIGHTS]: e.target.checked }); }}
									id={RIGHT_STATUS.OFFERED_RIGHTS}
								/>
								<label
									className={cn({ selected: this.state[RIGHT_STATUS.OFFERED_RIGHTS] })}
									htmlFor={RIGHT_STATUS.OFFERED_RIGHTS}
								>
									{this.context.t("CMS_OFFERED_RIGHTS")}
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									checked={this.state[RIGHT_STATUS.CLOSED_DEALS]}
									className="ca-checkbox blue"
									onChange={(e) => { this.setState({ [RIGHT_STATUS.CLOSED_DEALS]: e.target.checked }); }}
									id={RIGHT_STATUS.CLOSED_DEALS}
								/>
								<label
									className={cn({ selected: this.state[RIGHT_STATUS.CLOSED_DEALS] })}
									htmlFor={RIGHT_STATUS.CLOSED_DEALS}
								>
									{this.context.t("CMS_CLOSED_DEALS")}
								</label>
							</div>
						</div>
					</div>
					<div className="split-filter">
						<div className="region-filter-title">
							{ this.context.t("CMS_RIGHT_LEGENDS_TITLE")}
						</div>
						<div className="right-legends">
							<div className="right-legends-item">
								<img src={blueCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_AVAILABLE")}
							</div>
							<div className="right-legends-item">
								<img src={blueCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_OFFERED")}
							</div>
							<div className="right-legends-item">
								<img src={blueCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_SOLD")}
							</div>
							<div className="right-legends-item">
								<img src={yellowCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_EXCLUSIVE_AVAILABLE")}
							</div>
							<div className="right-legends-item">
								<img src={yellowCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_EXCLUSIVE_OFFERED")}
							</div>
							<div className="right-legends-item">
								<img src={yellowCheckIcon} alt="" />
								{ this.context.t("CMS_RIGHT_LEGENDS_EXCLUSIVE_SOLD")}
							</div>
						</div>
					</div>
				</div>


				{
					territories.length > 0
					&& (
						<ReactTable
							showPageSizeOptions={false}
							showPagination={false}
							resizable={false}
							collapseOnPageChange={false}
							collapseOnDataChange={false}
							minRows={0}
							defaultPageSize={totalCountries}
							data={territories}
							select={this.props.select}
							className="ca-table"
							columns={this.getColumns()}
							sorted={[{
								id: "name",
								desc: false,
							}]}
						/>
					)
				}
			</div>
		);
	}
}

RightsOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RightsOverview);
