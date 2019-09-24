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
import CmsRightsOverviewTable from "../components/CmsRightsOverviewTable";


class RightsOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectedTerritories: props.propertyFilters.selectedTerritories,
		};
	}

	render() {
		const {
			property,
			propertyFilters,
			baseProperty,
			territories,
			seasons,
			rights,
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

				<CmsRightsOverviewTable
					territories={territories}
					seasons={seasons}
					rights={rights}
				/>
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
