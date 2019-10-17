import React from "react";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { HorizontalButtonBox } from "@components/Containers";
import { connect } from "react-redux";
import { getListingStepRoute } from "../helpers/PropertyListingHelper";
import { saveListing } from "../actions/propertyListingActions";
import { goTo } from "../../main/actions/utils";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "../../common/constants";

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

	onPrevious= () => {
		const { property: { customId }, history, listing } = this.props;
		const stepRoute = getListingStepRoute(customId, listing.customId, listing.step - 1);
		history.push(stepRoute);
	};

	onNext = () => {
		const { property: { customId }, history, listing } = this.props;
		this.props.saveListing(listing)
			.then((data) => {
				if (listing.step === 6) {
					history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
					window.location.reload();
					return;
				}
				const stepRoute = getListingStepRoute(customId, data.customId, listing.step + 1);
				history.push(stepRoute);
			})
			.catch()
			.finally();
	};

	cancel = () => {};

	render() {
		const { listing } = this.props;
		return (
			<HorizontalButtonBox>
				{listing.step !== 1 && (
					<button
						className="button secondary-button"
						disabled={listing.saving}
						onClick={this.onPrevious}
						style={{ marginRight: "auto" }}
					>
						<Translate i18nKey="CMS_CREATE_LISTING_PREV_BUTTON" />
					</button>
				)}

				{listing.step === 1 && (
					<button
						className="button secondary-button"
						disabled={listing.saving}
						onClick={this.cancel}
						style={{ marginRight: "auto" }}
					>
						<Translate i18nKey="CANCEL" />
					</button>
				)}

				{listing.customId && listing.step < 6 && (
					<button
						className="button secondary-outline-button"
						disabled={listing.saving}
						onClick={this.onSave}
					>
						{listing.saving
							? <Loader xSmall loading />
							: <Translate i18nKey="CMS_CREATE_LISTING_SAVE_BUTTON" />
						}
					</button>
				)}

				{!listing.customId && (
					<button
						className="button secondary-outline-button"
						disabled={listing.saving}
						onClick={this.onSave}
					>
						{listing.saving
							? <Loader xSmall loading />
							: <Translate i18nKey="CMS_CREATE_LISTING_SAVE_AS_DRAFT" />
						}
					</button>
				)}

				<button
					className="button primary-button"
					disabled={listing.saving}
					onClick={this.onNext}
				>
					{listing.saving && <Loader xSmall loading />}
					{!listing.saving && listing.step < 6 && <Translate i18nKey="CMS_CREATE_LISTING_NEXT_BUTTON" /> }
					{!listing.saving && listing.step === 6 && <Translate i18nKey="CMS_CREATE_LISTING_PUBLISH_BUTTON" />}
				</button>
			</HorizontalButtonBox>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	listing: state.propertyListing,
});

const mapDispatchToProps = dispatch => ({
	saveListing: listing => dispatch(saveListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyListingButtons);
