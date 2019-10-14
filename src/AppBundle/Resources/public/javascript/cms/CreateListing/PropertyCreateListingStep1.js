import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
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
import { getListingName } from "../helpers/PropertyListingHelper";
import SeasonSelection from "./SeasonSelection";
import BundleCreator from "./BundleCreator";
import BundleList from "./BundleList";
import { updateListing } from "../actions/propertyListingActions";
import RightDetailsDefault from "../../common/RightDetailsDefault";

class PropertyCreateListingStep1 extends React.Component {
	constructor(props) {
		super(props);

		let currentStep = 1;

		if (props.listing.customId) {
			currentStep = 4;
		}

		this.state = {
			seasons: props.listing.seasons,
			rights: props.listing.rights,
			bundles: props.listing.bundles,
			currentStep,
			showBundleCreator: !props.listing.bundles.length,
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
	}, this.updateListing);

	onUpdateBundle = (bundle) => {
		const bundles = this.state.bundles;
		bundles[bundle.index] = bundle;
		this.setState({ bundles, showBundleCreator: false }, this.updateListing);
	};

	onRemoveBundle = (index) => {
		const bundles = this.state.bundles;
		bundles.splice(index, 1);
		this.setState({ bundles }, this.updateListing);
	};

	onEditBundle = (index) => {
		const selectedBundle = this.state.bundles[index];
		selectedBundle.index = index;
		this.setState({ selectedBundle, showBundleCreator: true });
	};

	bundlesAreValid = () => !!this.state.bundles.length;

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onSelectSeason = seasons => this.setState({ seasons, currentStep: 1, rights: [] });

	onExclusive = (right, exclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.code !== right.code);
		const newValue = Object.assign({}, right, { exclusive });
		rights.push(newValue);
		this.setState({
			rights,
			currentStep: 2,
		}, this.updateListing);
	};

	onSelectRight = (value) => {
		let { rights } = this.state;
		const selectedRight = rights.find(element => element.code === value.code);
		if (selectedRight) {
			rights = rights.filter(element => element.code !== value.code);
		} else {
			const newValue = Object.assign({}, value, {
				exclusive: null,
				details: RightDetailsDefault,
			});
			rights.push(newValue);
		}
		this.setState({
			rights,
			currentStep: 2,
		}, this.updateListing);
	};

	onNext = currentStep => this.setState({ currentStep });

	updateListing = () => {
		const { seasons, rights, bundles } = this.state;
		const { property } = this.props;
		this.props.updateListing({
			seasons,
			rights,
			bundles,
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
			selectedBundle,
		} = this.state;

		const {
			property: { seasons: availableSeasons, rights: availableRights, id: propertyId },
			history,
		} = this.props;

		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const bundlesAreValid = this.bundlesAreValid();
		const availableCountries = getTerritoriesFromRights(availableRights);
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
					opened={currentStep === 4}
				>
					{!!bundles.length && (
						<div className="accordion-container-content-item">
							<BundleList
								bundles={bundles}
								onRemove={this.onRemoveBundle}
								onEdit={this.onEditBundle}
							/>
							{!showBundleCreator && (
								<button
									className="link-button"
									style={{ marginTop: 20 }}
									onClick={() => this.setState({ showBundleCreator: true })}
								>
									<Translate i18nKey="CREATE_ANOTHER_BUNDLE_BUTTON" />
								</button>
							)}
						</div>
					)}

					{showBundleCreator && (
						<BundleCreator
							selectedBundle={selectedBundle}
							availableCountries={availableCountries.territories}
							onCreateBundles={this.onCreateBundles}
							onUpdateBundle={this.onUpdateBundle}
							onCancel={() => this.setState({ showBundleCreator: false })}
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
	listing: state.propertyListing,
});

const mapDispatchToProps = dispatch => ({
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListingStep1);
