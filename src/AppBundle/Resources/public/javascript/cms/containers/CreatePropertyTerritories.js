import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { scrollMainContainer } from "@utils/listing";
import Translate from "@components/Translator/Translate";
import { DefaultBox, VerticalButtonBox } from "../../common/components/Containers";
import {
	updateFromMultiple,
} from "../../sell/actions/stepOneActions";
import {
	getSeasonNames, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament,
} from "../reducers/property";
import {
	setSelectedRights, setRights, fetchCountries, fetchTerritories, fetchRegions, resetProperty,
} from "../actions/propertyActions";
import Loader from "../../common/components/Loader/Loader";
import { ROUTE_PATHS, BUNDLE_TERRITORIES_METHOD, CMS_PROPERTY_TABS } from "@constants";
import CmsAvailableRightsSelector from "../components/CmsAvailableRightsSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import api from "../../api";


class CreatePropertyTerritories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			territories: [],
			territoriesMode: props.territoriesMode || BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
			savingProperty: false,
			propertySaved: false,
		};
	}

	componentDidMount() {
		this.props.getCountries();
		this.props.getTerritories();
		this.props.getRegions();
		scrollMainContainer();
	}

	onUndoTerritories = (selectedRight) => {
		const {
			property,
		} = this.props;

		const {
			rights,
		} = property;

		const editedRights = rights.map((right) => {
			if (selectedRight.code === right.code) {
				delete right.edited;
				delete right.territories;
				delete right.territoriesMode;
			}
			return right;
		});

		this.props.rightsUpdated(editedRights);
	};

	onEditTerritories = (selectedRight) => {
		const {
			property,
		} = this.props;

		const {
			rights,
			selectedRights,
		} = property;

		const editedRights = rights.map((right) => {
			if (selectedRight.code === right.code) {
				delete right.edited;
			}
			return right;
		});


		this.setState({ editMode: true });
		this.props.rightsUpdated(editedRights);
		this.props.selectedRightsUpdated([...selectedRights, selectedRight]);
	};

	applyTerritories = () => {
		const {
			property,
		} = this.props;

		const {
			territories,
			territoriesMode,
		} = this.state;

		const {
			rights,
			selectedRights,
		} = property;

		const selectedRightsIds = selectedRights.map(right => right.code);
		const editedRights = rights.map((right) => {
			if (selectedRightsIds.indexOf(right.code) !== -1) {
				right.edited = true;
				right.territories = territories;
				right.territoriesMode = territoriesMode;
			}
			return right;
		});

		this.props.rightsUpdated(editedRights);
		this.props.selectedRightsUpdated([]);
		this.setState({ territories: [], territoriesMode: null, editMode: false });
	};

	handleTerritories = (territories, territoriesMode) => {
		this.setState({ territories, territoriesMode, editMode: false });
	};

	rightsComplete = () => {
		const { property: { rights } } = this.props;
		return rights.length > 0 && rights.filter(right => !right.edited).length === 0;
	};

	isLoading = () => {
		const { isCountryFetched, isRegionsFetched, isTerritoriesFetched } = this.props;
		return !isCountryFetched || !isRegionsFetched || !isTerritoriesFetched;
	};

	createProperty = () => {
		const {
			property,
			resetProperty,
		} = this.props;

		this.setState({ savingProperty: true });

		api.properties.createProperty({
			property: {
				sports: property.sports,
				sportCategory: property.sportCategory,
				tournament: property.tournament,
				seasons: property.seasons,
				rights: property.rights,
			},
		})
			.then((response) => {
				const { data } = response;

				this.setState({
					propertySaved: true,
					propertyId: data.customId,
				});
				resetProperty();
			})
			.catch()
			.finally(() => {
				this.setState({ savingProperty: false });
			});
	};

	render() {
		const {
			editMode,
			propertySaved,
			savingProperty,
			propertyId,
		} = this.state;
		const { property, history, resetProperty } = this.props;
		const { selectedRights, rights } = property;

		let { territories, territoriesMode } = this.state;

		if (this.isLoading()) {
			return (
				<div className="settings-container">
					<Loader loading />
				</div>
			);
		}

		if (editMode && selectedRights.length > 0) {
			rights.forEach((right) => {
				if (selectedRights[0].code === right.code && right.territories && right.territories.length > 0) {
					territories = right.territories || [];
					territoriesMode = right.territoriesMode;
				}
			});
		}

		return (
			<div className="default-container no-title property">

				<DefaultBox>
					<h4>
						<Translate i18nKey="CMS_SELECT_RIGHTS_TITLE" />
					</h4>
					<h6>
						<Translate i18nKey="CMS_SELECT_RIGHTS_DESCRIPTION" />
					</h6>
					<CmsAvailableRightsSelector
						onUndoTerritories={this.onUndoTerritories}
						onEditTerritories={this.onEditTerritories}
					/>
				</DefaultBox>

				{selectedRights.length > 0 && (
					<DefaultBox>
						<h4>
							<Translate i18nKey="CMS_SELECT_TERRITORIES_TITLE" />
						</h4>
						<h6>
							<Translate i18nKey="CMS_SELECT_TERRITORIES_DESCRIPTION" />
						</h6>

						<CmsTerritorySelector
							className="small-select"
							onChange={this.handleTerritories}
							onSelectRegion={() => { }}
							value={territories}
							territoriesMode={territoriesMode}
							multiple
							filter={[]}
							selectedRights={selectedRights}
							exclusiveSoldTerritories={false}
						/>
					</DefaultBox>
				)
				}

				{propertySaved && (
					<DefaultBox>
						<h5>
							<i className="fa fa-check-circle" />
						</h5>
						<h5 className="text-center">
							<Translate i18nKey="CMS_PROPERTY_CREATION_COMPLETE" />
						</h5>
					</DefaultBox>
				)
				}

				<VerticalButtonBox>
					{!this.rightsComplete() && (
						<button
							className="yellow-button"
							disabled={selectedRights.length === 0 || territories.length === 0}
							onClick={this.applyTerritories}
						>
							<Translate i18nKey="CMS_APPLY_TERRITORIES_BUTTON" />
						</button>
					)}

					{this.rightsComplete() && !propertySaved && (
						<button
							disabled={savingProperty}
							className="yellow-button"
							onClick={this.createProperty}
						>
							{!savingProperty && <Translate i18nKey="CMS_CREATE_PROPERTY_BUTTON" />}
							{savingProperty && <Loader loading xSmall />}
						</button>
					)}

					{propertySaved && (
						<button
							className="yellow-button"
							onClick={() => {
								resetProperty();
								history.push(`${ROUTE_PATHS.PROPERTIES}/${propertyId}/${CMS_PROPERTY_TABS.RIGHTS}`);
							}}
						>
							<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
						</button>
					)}

					{!propertySaved && !savingProperty && (
						<button
							onClick={() => {
								history.push(ROUTE_PATHS.CREATE_PROPERTY);
							}}
							className="link-button property-cancel-button"
						>
							<Translate i18nKey="CMS_CANCEL_CREATE_PROPERTY_BUTTON" />
						</button>
					)}
					{!propertySaved && !savingProperty && (
						<button
							onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_1)}
							className="link-button property-cancel-button no-margin"
						>
							<Translate i18nKey="CMS_CREATE_PROPERTY_BACK_BUTTON" />
						</button>
					)}
				</VerticalButtonBox>
			</div>
		);
	}
}

CreatePropertyTerritories.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
	sportValue: getSportName(state),
	sportCategoryValue: getSportCategoryName(state),
	seasonValues: getSeasonNames(state),
	tournamentValue: getTournamentName(state),
	hasCustomSport: hasCustomSport(state),
	hasCustomSportCategory: hasCustomSportCategory(state),
	hasCustomTournament: hasCustomTournament(state),
	hasCustomSeason: hasCustomSeason(state),
	isCountryFetched: state.property.isCountryFetched,
	isRegionsFetched: state.property.isRegionsFetched,
	isTerritoriesFetched: state.property.isTerritoriesFetched,
});

const mapDispatchToProps = dispatch => ({
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
	rightsUpdated: rights => dispatch(setRights(rights)),
	selectedRightsUpdated: selectedRights => dispatch(setSelectedRights(selectedRights)),
	resetProperty: () => dispatch(resetProperty()),
	getTerritories: () => dispatch(fetchTerritories()),
	getCountries: () => dispatch(fetchCountries()),
	getRegions: () => dispatch(fetchRegions()),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyTerritories);
