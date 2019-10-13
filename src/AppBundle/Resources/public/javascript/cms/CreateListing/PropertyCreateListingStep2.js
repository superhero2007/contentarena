import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import PropertyListingButtons from "../components/PropertyListingButtons";
import { updateListing } from "../actions/propertyListingActions";
import PropertyDetailsDescriptionTab from "../components/PropertyDetailsDescriptionTab";

class PropertyCreateListingStep2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.updateListing({ step: 2 });
	}

	updateListing = (data) => {
		this.props.updateListing(data);
	};

	render() {
		const {
			currentStep,
		} = this.state;

		const {
			listing,
			history,
		} = this.props;


		return (
			<div className="property-create-tab">
				<div className="property-create-header">
					<h4>
						<Translate i18nKey="CREATE_LISTING_EVENT_DETAILS_TITLE" />
					</h4>
					<span className="subtitle1">
						<Translate i18nKey="CREATE_LISTING_EVENT_DETAILS_SUBTITLE" />
					</span>
				</div>

				<div className="property-create-box">
					<PropertyDetailsDescriptionTab
						showSaveButtons={false}
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
)(PropertyCreateListingStep2);
