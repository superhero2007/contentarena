import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DefaultBox, VerticalButtonBox } from "../../common/components/Containers";
import {
	updateFromMultiple
} from "../../sell/actions/stepOneActions";
import {
	getSeasonName, getSeasonNames, getSportCategoryName, getSportName,
	getTournamentName, hasCustomSeason, hasCustomSport, hasCustomSportCategory, hasCustomTournament
} from "../reducers/property";
import {
	setSelectedRights, setRights
} from "../actions/propertyActions";
import Loader from "../../common/components/Loader/Loader";
import { DATE_FORMAT } from "@constants";
import CmsAvailableRightsSelector from "../components/CmsAvailableRightsSelector";
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

	onUndoTerritories = (selectedRight) => {
		const {
			property,
		} = this.props;

		const {
			rights,
		} = property;

		let editedRights = rights.map( right => {
			if ( selectedRight.id === right.id ) {
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

		let selectedRightsIds = selectedRights.map(right=>right.id);

		let editedRights = rights.map( right => {
			if ( selectedRight.id === right.id ) {
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

		let selectedRightsIds = selectedRights.map(right=>right.id);
		let editedRights = rights.map( right => {
			if ( selectedRightsIds.indexOf(right.id) !== -1 ) {
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

	rightsComplete = () => this.props.property.rights.filter(right=>!right.edited).length === 0;

	render() {
		let {
			territories,
			territoriesMode,
			editMode,
		} = this.state;

		const {
			property,
		} = this.props;

		const {
			selectedRights,
			rights,
		} = property;

		if (editMode && selectedRights.length > 0) {
			rights.forEach( right => {
				if ( selectedRights[0].id === right.id && right.territories && right.territories.length > 0) {
					territories = right.territories || [];
					territoriesMode = right.territoriesMode;
				}
			});
		}

		return (
			<div className="default-container no-title property">

				<DefaultBox>
					<h4>
						{this.context.t("CMS_SELECT_RIGHTS_TITLE")}
					</h4>
					<h6>
						{this.context.t("CMS_SELECT_RIGHTS_DESCRIPTION")}
					</h6>
					<CmsAvailableRightsSelector
						onUndoTerritories={this.onUndoTerritories}
						onEditTerritories={this.onEditTerritories}
					/>
				</DefaultBox>

				{
					selectedRights.length > 0 &&
					<DefaultBox>
						<h4>
							{this.context.t("CMS_SELECT_TERRITORIES_TITLE")}
						</h4>
						<h6>
							{this.context.t("CMS_SELECT_TERRITORIES_DESCRIPTION")}
						</h6>

						<CmsTerritorySelector
							className="small-select"
							onChange={this.handleTerritories}
							onSelectRegion={() => {
							}}
							value={territories}
							territoriesMode={territoriesMode}
							multiple
							filter={[]}
							selectedRights={selectedRights}
							exclusiveSoldTerritories={false}
						/>
					</DefaultBox>
				}

				{
					this.rightsComplete() &&
					<DefaultBox>
						<h5>
							<i className="fa fa-check-circle" />
						</h5>
						<h5>
							{this.context.t("CMS_PROPERTY_CREATION_COMPLETE")}
						</h5>
					</DefaultBox>
				}

				<VerticalButtonBox>
					{
						!this.rightsComplete() &&
						<button
							className="yellow-button"
							disabled={selectedRights.length === 0 || territories.length === 0}
							onClick={this.applyTerritories}
						>
							{this.context.t("CMS_APPLY_TERRITORIES_BUTTON")}
						</button>
					}

					{
						this.rightsComplete() &&
						<button
							className="yellow-button"
							onClick={() => {}}
						>
							{this.context.t("CMS_CREATE_PROPERTY_BUTTON")}
						</button>
					}

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
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
	rightsUpdated: rights => dispatch(setRights(rights)),
	selectedRightsUpdated: selectedRights => dispatch(setSelectedRights(selectedRights)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyTerritories);
