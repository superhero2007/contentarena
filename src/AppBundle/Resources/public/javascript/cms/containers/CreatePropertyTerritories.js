import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox, VerticalButtonBox } from "../../common/components/Containers";
import {
	openCategorySelector, openSeasonSelector, openSportSelector,
	openTournamentSelector, updateFromMultiple
} from "../../sell/actions/stepOneActions";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";
import {
	getSeasonName, getSeasonNames, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament
} from "../reducers/property";
import {
	setCustomSeasonName, setCustomSportCategoryName, setCustomSportName,
	setCustomTournamentName, removeNewSeason, removeNewSport, removeNewTournament
} from "../actions/propertyActions";
import Loader from "../../common/components/Loader/Loader";
import moment from "moment/moment";
import { getMonths, getYears } from "../../common/utils/time";
import { DATE_FORMAT } from "@constants";
import CmsRightsSelector from "../components/CmsRightsSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import { ROUTE_PATHS } from "../../main/routes";

class CreatePropertyTerritories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			territories : []
		};
	}

	componentWillReceiveProps(nextProps){

		const {
			loadingCategories,
		} = this.state;
		const {
			property,
		} = nextProps;


	}

	componentDidMount() {
	}

	render() {
		const {
			territories,
		} = this.state;

		const {
			property,
		} = this.props;

		return (
			<div className="default-container no-title property">
				<DefaultBox>
					<h4>
						{this.context.t("CMS_SELECT_TERRITORIES_TITLE")}
					</h4>
					<h6>
						{this.context.t("CMS_SELECT_TERRITORIES_DESCRIPTION")}
					</h6>

					<CmsTerritorySelector
						className="small-select"
						onChange={()=>{}}
						onSelectRegion={() => {
						}}
						value={territories}
						multiple
						filter={[]}
						exclusiveSoldTerritories={false}
					/>
				</DefaultBox>
				<VerticalButtonBox>
					<button className="yellow-button">
						{this.context.t("CMS_CREATE_PROPERTY_BUTTON")}
					</button>
					<a href={ROUTE_PATHS.CREATE_PROPERTY} className="link-button property-cancel-button">
						{this.context.t("CMS_CANCEL_CREATE_PROPERTY_BUTTON")}
					</a>
				</VerticalButtonBox>
			</div>
		);
	}

}

CreatePropertyTerritories.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return Object.assign({}, state, {
		sportValue: getSportName(state),
		sportCategoryValue: getSportCategoryName(state),
		seasonValues: getSeasonNames(state),
		tournamentValue: getTournamentName(state),
		hasCustomSport: hasCustomSport(state),
		hasCustomSportCategory: hasCustomSportCategory(state),
		hasCustomTournament: hasCustomTournament(state),
		hasCustomSeason: hasCustomSeason(state),

	});
};

const mapDispatchToProps = dispatch => ({
	openSportSelector: (index, selectedItems) => dispatch(openSportSelector(index, selectedItems)),
	openCategorySelector: selectedItems => dispatch(openCategorySelector(selectedItems)),
	openTournamentSelector: selectedItems => dispatch(openTournamentSelector(selectedItems)),
	openSeasonSelector: (index, selectedItems) => dispatch(openSeasonSelector(index, selectedItems)),
	removeCustomSport: (index) => dispatch(removeNewSport(index)),
	removeCustomTournament: (index) => dispatch(removeNewTournament(index)),
	removeCustomSeason: (index) => dispatch(removeNewSeason(index)),
	setCustomSportName: (index, sportName) => dispatch(setCustomSportName(index, sportName)),
	setCustomSportCategoryName: (index, sportCategoryName) => dispatch(setCustomSportCategoryName(index, sportCategoryName)),
	setCustomTournamentName: (index, tournamentName) => dispatch(setCustomTournamentName(index, tournamentName)),
	setCustomSeasonName: (index, seasonName) => dispatch(setCustomSeasonName(index, seasonName)),
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyTerritories);
