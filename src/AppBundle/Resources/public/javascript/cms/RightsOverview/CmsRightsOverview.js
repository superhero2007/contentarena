import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import {
	SeasonFilter, RightFilter, RegionFilter, RightStatusFilter, ProgramFilter, ProgramYearsFilter,
} from "@components/Filters";
import Translate from "@components/Translator/Translate";
import CmsRightsLegend from "../components/CmsRightsLegend";
import CmsFilterBox from "../components/CmsFilterBox";
import {
	setPrograms, setProgramYears,
	setRegions, setRights, setSeasons, setStatus,
} from "../actions/propertyFiltersActions";
import {
	getFilteredPrograms, getFilteredProgramTerritories, getFilteredProgramYears,
	getFilteredRights,
	getFilteredSeasons,
	getFilteredTerritories,
} from "../reducers/property";
import { getUnifiedRegions } from "../helpers/PropertyHelper";
import CmsRightsOverviewTable from "./CmsRightsOverviewTable";
import { RIGHT_TYPE } from "../../common/constants";
import CmsProgramsOverviewTable from "./CmsProgramsOverviewTable";

class CmsRightsOverview extends React.Component {
	constructor(props) {
		super(props);

		this.seasonTab = "SEASON";
		this.programTab = "PROGRAM";
		this.state = {
			hasEditedPrograms: !!props.property.programs.length,
			tab: this.seasonTab,
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
			programs,
			programTerritories,
			programYears,
		} = this.props;

		const {
			hasEditedPrograms,
			tab,
		} = this.state;

		const unifiedTerritories = getUnifiedRegions(baseProperty.regions, baseProperty.territories);

		return (
			<>
				{hasEditedPrograms && (
					<div className="property-rights-tab">
						<div
							className={cn("property-rights-tab-item", { active: tab === this.seasonTab })}
							onClick={() => this.setState({ tab: this.seasonTab })}
						>
							<Translate i18nKey="CMS_RIGHTS_OVERVIEW_SEASONAL_TAB" />
						</div>
						<div
							className={cn("property-rights-tab-item", { active: tab === this.programTab })}
							onClick={() => this.setState({ tab: this.programTab })}
						>
							<Translate i18nKey="CMS_RIGHTS_OVERVIEW_PROGRAMS_TAB" />
						</div>
					</div>
				)}

				{tab === this.seasonTab && (<CmsRightsLegend open />)}

				{tab === this.programTab && (<CmsRightsLegend open type={RIGHT_TYPE.sale} />)}

				<CmsFilterBox open>
					{tab === this.seasonTab && (
						<SeasonFilter
							options={property.seasons}
							value={propertyFilters.seasons}
							onChange={this.props.setSeasons}
						/>
					)}

					{tab === this.programTab && (
						<ProgramFilter
							options={property.programs}
							value={propertyFilters.programs}
							onChange={this.props.setPrograms}
						/>
					)}

					{tab === this.seasonTab && (
						<RightFilter
							options={property.rights}
							value={propertyFilters.rights}
							onChange={this.props.setRights}
						/>
					)}

					{tab === this.programTab && (
						<ProgramYearsFilter
							options={programYears}
							multi
							value={propertyFilters.programYears}
							onChange={this.props.setProgramYears}
						/>
					)}

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

				{tab === this.seasonTab && (
					<CmsRightsOverviewTable
						territories={territories}
						seasons={seasons}
						rights={rights}
					/>
				)}

				{tab === this.programTab && (
					<CmsProgramsOverviewTable
						territories={programTerritories}
						programs={programs}
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
	programs: getFilteredPrograms(state),
	programTerritories: getFilteredProgramTerritories(state),
	programYears: getFilteredProgramYears(state),
});

const mapDispatchToProps = dispatch => ({
	setSeasons: seasons => dispatch(setSeasons(seasons)),
	setRights: rights => dispatch(setRights(rights)),
	setRegions: regions => dispatch(setRegions(regions)),
	setStatus: statuses => dispatch(setStatus(statuses)),
	setPrograms: programs => dispatch(setPrograms(programs)),
	setProgramYears: years => dispatch(setProgramYears(years)),

});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsRightsOverview);
