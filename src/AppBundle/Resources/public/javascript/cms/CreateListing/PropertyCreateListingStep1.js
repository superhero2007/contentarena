import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { getTerritoriesFromRights } from "@utils/property";
import RightSelector from "@components/Right/RightSelector";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import {
	getRightsString,
	getSeasonsYearString,
	sortSeasons,
	sortSeasonsOldToNew,
} from "../helpers/PropertyDetailsHelper";
import PropertyListingButtons from "../components/PropertyListingButtons";
import { updateListing } from "../../sell/actions/contentActions";
import { getListingName } from "../helpers/PropertyListingHelper";
import SeasonSelection from "./SeasonSelection";
import BundleCreator from "./BundleCreator";
import BundleList from "./BundleList";

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
			bundles: [],
			currentStep,
			showBundleCreator: true,
		};

		this.seasonStep = React.createRef();
		this.rightsStep = React.createRef();
		this.territoriesStep = React.createRef();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const { listing: { seasons } } = nextProps;

		this.setState({
			seasons,
		});
	}

	seasonsAreValid = () => !!this.state.seasons.length;

	rightsAreValid = () => !!this.state.rights.length
		&& !this.state.rights.filter(right => right.exclusive === null).length;

	onCreateBundles = bundles => this.setState({
		bundles: [...this.state.bundles, ...bundles],
		showBundleCreator: false,
	});

	onRemoveBundle = (index) => {
		const bundles = this.state.bundles;
		bundles.splice(index, 1);
		this.setState({ bundles });
	};

	bundlesAreValid = () => !!this.state.bundles.length;

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onSelectSeason = seasons => this.setState({ seasons, currentStep: 1, rights: [] });

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

	onNext = currentStep => this.setState({ currentStep });

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
			currentStep,
			bundles,
			showBundleCreator,
		} = this.state;

		const {
			property: { seasons: availableSeasons, rights: availableRights, id: propertyId },
			history,
		} = this.props;

		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const bundlesAreValid = this.bundlesAreValid();
		const availableCountries = getTerritoriesFromRights(rights);
		const selectedSeasonsValue = getSeasonsYearString(seasons.sort(sortSeasonsOldToNew));
		const selectedRightsValue = getRightsString(rights);

		availableSeasons.sort(sortSeasons);
		seasons.sort(sortSeasons);

		return (
			<div className="property-create-tab">
				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_BUTTON" />}
					disabled={!availableSeasons.length}
					enableNextStep={seasonsValid || !availableSeasons.length}
					onNext={() => {
						this.onNext(2);
						this.seasonStep.current.close();
						this.rightsStep.current.open();
					}}
					value={`${selectedSeasonsValue}`}
					opened={currentStep === 1}
					ref={this.seasonStep}
				>
					<SeasonSelection
						availableSeasons={availableSeasons}
						selectedSeasons={seasons}
						propertyId={propertyId}
						onSelectSeason={this.onSelectSeason}
					/>

				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_BUTTON" />}
					disabled={currentStep < 2}
					enableNextStep={rightsValid}
					value={`${selectedRightsValue}`}
					onNext={() => {
						this.onNext(3);
						this.rightsStep.current.close();
						this.territoriesStep.current.open();
					}}
					ref={this.rightsStep}
				>
					<RightSelector
						availableRights={availableRights}
						selectedRights={rights}
						onSelectRight={this.onSelectRight}
						onExclusive={this.onExclusive}
					/>
				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP3_TITLE" />}
					disabled={currentStep < 3}
					enableNextStep={bundlesAreValid}
					onNext={() => this.updateListing()}
					ref={this.territoriesStep}
				>
					{!!bundles.length && (
						<div className="accordion-container-content-item">
							<BundleList
								bundles={bundles}
								onRemove={this.onRemoveBundle}
							/>

							<button
								className="link-button"
								style={{ marginTop: 20 }}
								onClick={() => this.setState({ showBundleCreator: true })}
							>
								<Translate i18nKey="CREATE_ANOTHER_BUNDLE_BUTTON" />
							</button>
						</div>
					)}

					{showBundleCreator && (
						<BundleCreator
							availableCountries={availableCountries.territories}
							onCreateBundles={this.onCreateBundles}
							onCancel={() => {}}
						/>
					)}

				</AccordionContainer>

				{bundlesAreValid && <PropertyListingButtons history={history} />}
			</div>
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
