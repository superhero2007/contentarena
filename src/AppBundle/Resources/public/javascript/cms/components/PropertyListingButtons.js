import React from "react";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { HorizontalButtonBox } from "@components/Containers";
import { connect } from "react-redux";
import { saveListing } from "../../sell/actions/contentActions";
import { getListingStepRoute } from "../helpers/PropertyListingHelper";

class PropertyListingButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	onSave = () => {
		const { property: { customId }, history, listing } = this.props;
		const updateUrl = !listing.customId;

		this.props.saveListing(listing)
			.then((data) => {
				const stepRoute = getListingStepRoute(customId, data.customId, 1);
				if (updateUrl) history.push(stepRoute);
			})
			.catch()
			.finally();
	};

	onNext = () => {
		const { property: { customId }, history, listing } = this.props;
		this.props.saveListing(listing)
			.then(() => {
				const stepRoute = getListingStepRoute(customId, listing.customId, listing.step + 1);
				history.push(stepRoute);
			})
			.catch()
			.finally();
	};


	render() {
		const { listing } = this.props;
		return (
			<HorizontalButtonBox style={{ marginTop: 20 }}>
				<button
					className="yellow-button"
					disabled={listing.saving || listing.step === 1}
					onClick={this.prev}
				>
					<Translate i18nKey="CMS_CREATE_LISTING_PREV_BUTTON" />
				</button>
				<button
					disabled={listing.saving}
					className="yellow-button"
					onClick={this.onSave}
				>
					{listing.saving
						? <Loader xSmall loading />
						: <Translate i18nKey="CMS_CREATE_LISTING_SAVE_BUTTON" />
					}
				</button>
				<button
					className="yellow-button"
					disabled={listing.saving}
					onClick={this.onNext}
				>
					{listing.saving
						? <Loader xSmall loading />
						: <Translate i18nKey="CMS_CREATE_LISTING_NEXT_BUTTON" />
					}
				</button>
			</HorizontalButtonBox>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	listing: state.content,
});

const mapDispatchToProps = dispatch => ({
	saveListing: listing => dispatch(saveListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyListingButtons);
