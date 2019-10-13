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
import PropertyDetailsDescriptionTab from "../components/PropertyDetailsDescriptionTab";
import PropertyDetailsRightsTab from "../components/PropertyDetailsRightsTab";

class PropertyCreateListingStep3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.updateListing({ step: 3 });
	}

	updateListing = rights => this.props.updateListing({ rights });

	render() {
		const {
			history,
			listing,
		} = this.props;

		return (
			<div className="property-create-tab">

				<div className="property-create-header">
					<h4>
						<Translate i18nKey="CREATE_LISTING_RIGHTS_TITLE" />
					</h4>
					<span className="subtitle1">
						<Translate i18nKey="CREATE_LISTING_RIGHTS_SUBTITLE" />
					</span>
				</div>

				<div className="property-create-box">
					<PropertyDetailsRightsTab
						listing={listing}
						onChange={this.updateListing}
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
)(PropertyCreateListingStep3);
