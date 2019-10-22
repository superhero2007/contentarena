import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import PropertyListingButtons from "../components/PropertyListingButtons";
import BundleList from "./BundleList";
import { updateListing } from "../actions/propertyListingActions";

class PropertyCreateListingStep7 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.updateListing({ step: 7 });
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
)(PropertyCreateListingStep7);
