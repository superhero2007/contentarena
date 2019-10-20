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

class PropertyCreateListingStep2 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bundles: props.listing.bundles,
			showBundleCreator: !props.listing.bundles.length,
		};
	}

	componentDidMount() {
		this.props.updateListing({ step: 2 });
	}

	onCreateBundles = bundles => this.setState({
		bundles: [...this.state.bundles, ...bundles],
		showBundleCreator: false,
	}, this.updateListing);

	onUpdateBundle = (bundle) => {
		const bundles = this.state.bundles;
		bundles[bundle.index] = bundle;
		this.setState({
			bundles,
			showBundleCreator: false,
			editMode: false,
			selectedBundle: null,
		}, this.updateListing);
	};

	onRemoveBundle = (index) => {
		const bundles = this.state.bundles;
		bundles.splice(index, 1);
		this.setState({
			bundles,
			showBundleCreator: !bundles.length ? true : this.state.showBundleCreator,
		}, this.updateListing);
	};

	onEditBundle = (index) => {
		const selectedBundle = this.state.bundles[index];
		selectedBundle.index = index;
		this.setState({ selectedBundle, showBundleCreator: true, editMode: true });
	};

	bundlesAreValid = () => !!this.state.bundles.length;

	updateListing = () => this.props.updateListing({ bundles: this.state.bundles });

	render() {
		const {
			seasons,
			bundles,
			showBundleCreator,
			selectedBundle,
			editMode,
		} = this.state;

		const {
			property: { rights: availableRights },
			history,
			countries,
		} = this.props;

		const bundlesAreValid = this.bundlesAreValid();
		const availableCountries = getTerritoriesFromRights(availableRights, countries);

		return (
			<div className="property-create-tab">

				{!!bundles.length && (
					<div className="accordion-container-content-item">
						{!showBundleCreator && (
							<button
								className="link-button"
								style={{
									marginTop: 20, fontSize: 16, marginBottom: 5, marginLeft: "auto",
								}}
								onClick={() => this.setState({ showBundleCreator: true })}
							>
								<Translate i18nKey="CREATE_ANOTHER_BUNDLE_BUTTON" />
							</button>
						)}
						<BundleList
							editMode={editMode}
							bundles={bundles}
							onRemove={this.onRemoveBundle}
							onEditBundle={this.onEditBundle}
						/>
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

				{bundlesAreValid && <PropertyListingButtons history={history} />}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	listing: state.propertyListing,
	countries: state.property.countries,
});

const mapDispatchToProps = dispatch => ({
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListingStep2);
