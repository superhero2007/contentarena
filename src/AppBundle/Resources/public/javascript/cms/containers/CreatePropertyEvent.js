import React from "react";
import { connect } from "react-redux";
import { scrollMainContainer } from "@utils/listing";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import { ROUTE_PATHS } from "@constants";
import CmsRightsSelector from "../components/CmsRightsSelector";
import { getPropertyName } from "../helpers/PropertyHelper";
import CmsSeasonSelector from "../components/CmsSeasonSelector";

class CreatePropertyEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSeasonApplicable: props.property.tournament.length !== 0,
			showCustomSeason: false,
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

		return !rights.length || rights.filter(right => right.exclusive === null).length;
	};

	seasonsAreInvalid = () => {
		const { isSeasonApplicable } = this.state;
		const { property } = this.props;
		const { seasons } = property;

		return isSeasonApplicable && !seasons.length;
	};

	render() {
		const { isSeasonApplicable } = this.state;

		const {
			history,
			property,
		} = this.props;

		const {
			tournament,
		} = property;

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

					<div className="season-checkbox">
						<input
							id="season-checkbox"
							type="checkbox"
							className="ca-checkbox blue"
							onClick={this.handleSeasonCheckbox}
							disabled={!tournament.length}
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
				<HorizontalButtonBox>
					<button
						onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY)}
						className="yellow-button"
					>
						<Translate i18nKey="CMS_CREATE_PROPERTY_BACK_BUTTON" />
					</button>
					<button
						className="yellow-button"
						disabled={rightsInvalid || seasonsInvalid}
						onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_2)}
					>
						<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
					</button>
				</HorizontalButtonBox>
			</div>
		);
	}
}

const mapStateToProps = state => state;
// const mapStateToProps = state => Object.assign({}, state, {
// 	sportValue: getSportName(state),
// 	sportCategoryValue: getSportCategoryName(state),
// 	seasonValues: getSeasonNames(state),
// 	tournamentValue: getTournamentName(state),
// 	hasCustomSport: hasCustomSport(state),
// 	hasCustomSportCategory: hasCustomSportCategory(state),
// 	hasCustomTournament: hasCustomTournament(state),
// 	hasCustomSeason: hasCustomSeason(state),
//
// });
//
// const mapDispatchToProps = dispatch => ({
// 	resetProperty: () => dispatch(resetProperty()),
// });
//
//
// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps,
// )(CreatePropertyEvent);


export default connect(
	mapStateToProps,
	null,
)(CreatePropertyEvent);
