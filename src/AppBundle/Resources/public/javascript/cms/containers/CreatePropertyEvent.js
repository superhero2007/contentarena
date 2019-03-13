import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import moment from "moment/moment";
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
	addCustomSeason, removeCustomSeason, resetProperty,
} from "../actions/propertyActions";
import { ROUTE_PATHS } from "@constants";
import CmsRightsSelector from "../components/CmsRightsSelector";
import { getPropertyName } from "../helpers/PropertyHelper";
import CmsSeasonSelector from "../components/CmsSeasonSelector";
import CmsCustomSeason from "../components/CmsCustomSeason";


const AddSeason = ({ onClick }) => (
	<span className="add-season" onClick={onClick}>
		<i className="fa fa-plus-circle" />
		<Translate i18nKey="CMS_FORM_ADD_SEASON" />
	</span>
);

class CreatePropertyEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSeasonApplicable: props.property.tournament.length !== 0,
		};
	}

	componentDidMount() {
		scrollMainContainer();
	}

	componentWillReceiveProps(nextProps) {}

	handleSeasonCheckbox = () => this.setState(prevState => ({ isSeasonApplicable: !prevState.isSeasonApplicable }));

	rightsAreInvalid = () => {
		const { property } = this.props;
		const { rights } = property;

		if (rights.length === 0) return true;

		return rights.filter(right => right.exclusive === null).length > 0;
	};

	seasonsAreInvalid = () => {
		const { isSeasonApplicable } = this.state;
		const { property } = this.props;
		const { seasons } = property;

		if (isSeasonApplicable) {
			if (seasons.length === 0) return true;
			if (seasons.filter(s => s.custom && (s.endDate === undefined || s.startDate === undefined)).length > 0) return true;
		}
		return false;
	};

	render() {
		const { isSeasonApplicable } = this.state;

		const {
			history,
			property,
			addCustomSeason,
			removeCustomSeason,
			resetProperty,
		} = this.props;

		const {
			seasons,
			tournament,
		} = property;

		const customSeasons = seasons.filter(season => season.custom);
		const rightsInvalid = this.rightsAreInvalid();
		const seasonsInvalid = this.seasonsAreInvalid();

		return (
			<div className="default-container no-title property">
				<DefaultBox>
					<h4>
						{getPropertyName(property)}
					</h4>
				</DefaultBox>

				<DefaultBox>
					<h4>
						<Translate i18nKey="CMS_CREATE_PROPERTY_TITLE" />
					</h4>
					<h6>
						<Translate i18nKey="CMS_CREATE_PROPERTY_DESCRIPTION" />
					</h6>

					{isSeasonApplicable && (
						<CmsSeasonSelector />
					)}

					{isSeasonApplicable && customSeasons && customSeasons.length > 0 && seasons.map((season, i) => {
						if (!season.custom) return (null);

						return (
							<CmsCustomSeason
								season={season}
								key={i}
								index={i}
								onDelete={removeCustomSeason}
							/>
						);
					})}

					{isSeasonApplicable && (
						<div className="season-buttons">
							<AddSeason onClick={addCustomSeason} />
						</div>
					)}

					<div className="season-checkbox">
						<input
							id="season-checkbox"
							type="checkbox"
							className="ca-checkbox blue"
							onClick={this.handleSeasonCheckbox}
							disabled={tournament.length === 0}
						/>
						<label htmlFor="season-checkbox">
							<Translate i18nKey="CMS_FORM_NOT_APPLICABLE" />
						</label>
					</div>
				</DefaultBox>
				<DefaultBox>
					<h4>
						<Translate i18nKey="CMS_SELECT_RIGHTS_TITLE" />
					</h4>
					<h6>
						<Translate i18nKey="CMS_SELECT_RIGHTS_DESCRIPTION" />
					</h6>
					<CmsRightsSelector />
				</DefaultBox>
				<VerticalButtonBox>
					<button
						className="yellow-button"
						disabled={rightsInvalid || seasonsInvalid}
						onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_2)}
					>
						<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
					</button>
					<button
						onClick={() => {
							resetProperty();
							history.push(ROUTE_PATHS.CREATE_PROPERTY);
						}}
						className="link-button property-cancel-button"
					>
						<Translate i18nKey="CMS_CANCEL_CREATE_PROPERTY_BUTTON" />
					</button>
					<button
						onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY)}
						className="link-button property-cancel-button no-margin"
					>
						<Translate i18nKey="CMS_CREATE_PROPERTY_BACK_BUTTON" />
					</button>
				</VerticalButtonBox>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({}, state, {
	sportValue: getSportName(state),
	sportCategoryValue: getSportCategoryName(state),
	seasonValues: getSeasonNames(state),
	tournamentValue: getTournamentName(state),
	hasCustomSport: hasCustomSport(state),
	hasCustomSportCategory: hasCustomSportCategory(state),
	hasCustomTournament: hasCustomTournament(state),
	hasCustomSeason: hasCustomSeason(state),

});

const mapDispatchToProps = dispatch => ({
	resetProperty: () => dispatch(resetProperty()),
	addCustomSeason: () => dispatch(addCustomSeason()),
	removeCustomSeason: index => dispatch(removeCustomSeason(index)),
	updateFromMultiple: (type, index, key, value) => dispatch(updateFromMultiple(type, index, key, value)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyEvent);
