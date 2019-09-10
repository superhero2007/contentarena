import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { getTerritoriesFromRights } from "@utils/property";
import SeasonSelector from "@components/Season/SeasonSelector";
import RightSelector from "@components/Right/RightSelector";
import AccordionContainer from "@components/Containers/AccordionContainer";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD, CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import { sortSeasons } from "../helpers/PropertyDetailsHelper";
import PropertyListingButtons from "../components/PropertyListingButtons";
import { updateListing } from "../../sell/actions/contentActions";
import { getListingName } from "../helpers/PropertyListingHelper";

class PropertyCreateListingStep1 extends React.Component {
	constructor(props) {
		super(props);

		let currentStep = 1;

		if (props.listing.customId) {
			currentStep = 4;
		}

		// currentStep = props.property.seasons && props.property.seasons.length === 0 ? 2 : 1;

		this.state = {
			seasons: props.listing.seasons,
			rights: [],
			territories: [],
			territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
			currentStep,
		};

		this.seasonStep = React.createRef();
		this.rightsStep = React.createRef();
		this.territoriesStep = React.createRef();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const { listing: { seasons, customId } } = nextProps;

		this.setState({
			seasons,
		});
	}

	seasonsAreValid = () => {
		const { seasons } = this.state;
		return !!seasons.length;
	};

	rightsAreValid = () => {
		const { rights } = this.state;
		return !!rights.length;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onChangeSeason = (value) => {
		let { seasons } = this.state;
		const selectedSeason = seasons.find(season => season.id === value.id);
		if (selectedSeason) {
			seasons = seasons.filter(season => season.id !== value.id);
		} else {
			seasons.push(value);
		}
		this.setState({
			seasons,
			currentStep: 1,
			rights: [],
		});
	};

	onSelectAllRights = () => {
		const { property: { rights } } = this.props;
		const newRights = rights.map(element => Object.assign({}, element, { exclusive: null }));
		this.setState({
			rights: newRights,
			currentStep: 2,
		});
	};

	onUnSelectAllRights = () => {
		this.setState({
			rights: [],
			currentStep: 2,
		});
	};

	onExclusive = (right, exclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.id !== right.id);
		const newValue = Object.assign({}, right, { exclusive });
		rights.push(newValue);
		this.setState({
			rights,
			currentStep: 2,
		});
	};

	onSelectRight = (value) => {
		let { rights } = this.state;
		const selectedRight = rights.find(element => element.id === value.id);
		if (selectedRight) {
			rights = rights.filter(element => element.id !== value.id);
		} else {
			const newValue = Object.assign({}, value, { exclusive: null });
			rights.push(newValue);
		}
		this.setState({
			rights,
			currentStep: 2,
		});
	};

	onSelectTerritories = (territories, territoriesMode) => {
		this.setState({
			territories,
			territoriesMode,
		});
	};

	onNext = (currentStep) => {
		this.setState({ currentStep });
	};

	updateListing = () => {
		const { seasons, rights } = this.state;
		const { property } = this.props;
		this.props.updateListing({
			seasons,
			rights,
			name: getListingName(property, seasons),
		});
		this.onNext(4);
	};

	render() {
		const {
			seasons,
			rights,
			territories,
			territoriesMode,
			currentStep,
		} = this.state;
		const { property: { seasons: allSeasons, rights: allRights }, history } = this.props;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();
		const territory = getTerritoriesFromRights(rights);
		allSeasons.sort(sortSeasons);

		return (
			<>
				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_BUTTON" />}
					disabled={!allSeasons.length}
					enableNextStep={seasonsValid || !allSeasons.length}
					onNext={() => {
						this.onNext(2);
						this.seasonStep.current.close();
						this.rightsStep.current.open();
					}}
					opened={currentStep === 1}
					ref={this.seasonStep}
				>
					<SeasonSelector
						availableSeasons={allSeasons}
						selectedSeasons={seasons}
						onSelectSeason={this.onChangeSeason}
					/>
				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_BUTTON" />}
					disabled={currentStep < 2}
					enableNextStep={rightsValid}
					onNext={() => {
						this.onNext(3);
						this.rightsStep.current.close();
						this.territoriesStep.current.open();
					}}
					ref={this.rightsStep}
				>
					<RightSelector
						availableRights={allRights}
						selectedRights={rights}
						onSelectAll={this.onSelectAllRights}
						onUnselectAll={this.onUnSelectAllRights}
						onSelectRight={this.onSelectRight}
						onExclusive={this.onExclusive}
						exclusivityDisabled
					/>
				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP3_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP3_BUTTON" />}
					disabled={currentStep < 3}
					enableNextStep={territoriesValid}
					onNext={() => this.updateListing()}
					ref={this.territoriesStep}
				>
					<CmsTerritorySelector
						className="small-select"
						onChange={this.onSelectTerritories}
						selectedCountries={territory.territories}
						value={territories}
						territoriesMode={territoriesMode}
						multiple
					/>
				</AccordionContainer>

				{currentStep > 3 && (
					<PropertyListingButtons history={history} />
				)}

			</>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	listing: state.content,
});

const mapDispatchToProps = dispatch => ({
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListingStep1);
