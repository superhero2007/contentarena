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
import { getListingName } from "../helpers/PropertyListingHelper";
import SeasonSelection from "./SeasonSelection";
import BundleCreator from "./BundleCreator";
import BundleList from "./BundleList";
import { updateListing } from "../actions/propertyListingActions";
import PropertyDetailsRightsTab from "../components/PropertyDetailsRightsTab";
import PropertyDetailsProductionTab from "../components/PropertyDetailsProductionTab";

class PropertyCreateListingStep6 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.updateListing({ step: 6 });
	}

	updateListing = () => {
		this.props.updateListing({
		});
	};

	render() {
		const {
			bundlesAreValid,
			currentStep,
		} = this.state;

		const {
			listing: { bundles },
			history,
		} = this.props;

		return (
			<div className="property-create-tab">
				<div className="property-create-header">
					<h4>
						<Translate i18nKey="CREATE_LISTING_REVIEW_TITLE" />
					</h4>
					<span className="subtitle1">
						<Translate i18nKey="CREATE_LISTING_REVIEW_SUBTITLE" />
					</span>
				</div>

				<div className="property-create-box">
					<BundleList
						bundles={bundles}
						showActions={false}
					/>
				</div>

				<PropertyListingButtons history={history} />
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
)(PropertyCreateListingStep6);
