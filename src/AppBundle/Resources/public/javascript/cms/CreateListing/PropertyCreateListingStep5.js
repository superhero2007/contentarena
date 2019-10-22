import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import PropertyListingButtons from "../components/PropertyListingButtons";
import { updateListing } from "../actions/propertyListingActions";
import PropertyDetailsProductionTab from "../components/PropertyDetailsProductionTab";

class PropertyCreateListingStep5 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.updateListing({ step: 5 });
	}

	updateListing = rights => this.props.updateListing({ rights });

	render() {
		const {
			bundlesAreValid,
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
						<Translate i18nKey="CREATE_LISTING_RIGHTS_TITLE" />
					</h4>
					<span className="subtitle1">
						<Translate i18nKey="CREATE_LISTING_RIGHTS_SUBTITLE" />
					</span>
				</div>

				<div className="property-create-box">
					<PropertyDetailsProductionTab
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
)(PropertyCreateListingStep5);
