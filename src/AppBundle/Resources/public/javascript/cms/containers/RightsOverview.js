import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import {
	SeasonFilter, RightFilter, RegionFilter, RightStatusFilter,
} from "@components/Filters";
import { blueCheckIcon, yellowCheckIcon } from "../../main/components/Icons";
import CmsRightsLegend from "../components/CmsRightsLegend";
import CmsFilterBox from "../components/CmsFilterBox";
import {
	setRegions, setRights, setSeasons, setStatus,
} from "../actions/propertyFiltersActions";
import { getFilteredRights, getFilteredSeasons, getFilteredTerritories } from "../reducers/property";
import { getUnifiedRegions } from "../helpers/PropertyHelper";


class RightsOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectedTerritories: props.propertyFilters.selectedTerritories,
		};
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
		const { seasons, rights } = this.props;

		const columns = [];

		columns.push({
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY" />,
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
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING" />,
			Cell: props => (
				<div className="d-flex justify-content-center">
					1
				</div>

			),
		});

		columns.push({
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS" />,
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
			property,
			propertyFilters,
			baseProperty,
			territories,
		} = this.props;

		const unifiedTerritories = getUnifiedRegions(baseProperty.regions, baseProperty.territories);

		return (
			<>
				<CmsRightsLegend open />

				<CmsFilterBox open>
					<SeasonFilter
						options={property.seasons}
						value={propertyFilters.seasons}
						onChange={this.props.setSeasons}
					/>

					<RightFilter
						options={property.rights}
						value={propertyFilters.rights}
						onChange={this.props.setRights}
					/>

					<RegionFilter
						options={unifiedTerritories}
						value={propertyFilters.regions}
						onChange={this.props.setRegions}
					/>

					<RightStatusFilter
						value={propertyFilters.statuses}
						onChange={this.props.setStatus}
					/>
				</CmsFilterBox>

				{territories.length > 0 && (
					<ReactTable
						showPageSizeOptions={false}
						showPagination
						resizable={false}
						collapseOnPageChange={false}
						collapseOnDataChange={false}
						minRows={0}
						defaultPageSize={30}
						data={territories}
						select={this.props.select}
						className="ca-table"
						columns={this.getColumns()}
						sorted={[{
							id: "name",
							desc: false,
						}]}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
	baseProperty: state.property,
	territories: getFilteredTerritories(state),
	seasons: getFilteredSeasons(state),
	rights: getFilteredRights(state),
});

const mapDispatchToProps = dispatch => ({
	setSeasons: seasons => dispatch(setSeasons(seasons)),
	setRights: rights => dispatch(setRights(rights)),
	setRegions: regions => dispatch(setRegions(regions)),
	setStatus: statuses => dispatch(setStatus(statuses)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RightsOverview);
