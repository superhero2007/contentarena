import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import store from "../../main/store";
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ListingDetails from "../../buy/containers/ListingDetails";
import ContentListing from "../../main/components/ContentListing";
import DigitalSignature from "../../main/components/DigitalSignature";
import { goTo, goToListing, parseSeasons } from "../../main/actions/utils";
import { customStyles } from "../../main/styles/custom";
import Comments from "../components/Comments";
import { SummaryText } from "../components/SellFormItems";
import RightsLegend from "../../main/components/RightsLegend";
import { disableValidation, enableValidation } from "../../main/actions/validationActions";
import RightsList from "../../main/components/RightsList";

class ReviewAndSign extends React.Component {
	constructor(props) {
		super(props);
		this.asBundle = "SELL_AS_BUNDLE";
		this.individually = "SELL_INDIVIDUALLY";
		this.worldwide = "WORLDWIDE";
		this.worldwideExcluding = "WORLDWIDE_EXCLUDING";
		this.selectedTerritories = "SELECTED_TERRITORIES";
		this.fixed = "FIXED";
		this.bidding = "BIDDING";
		this.limit = 3;
		this.state = {};
	}

	componentWillReceiveProps(nextProps) {
		const { status, step, updateContentValue } = nextProps;

		if ((step === 5 && status && (status.name === "APPROVED" || status.name === "EDITED")) && !this.termsAutoSelected) {
			updateContentValue("terms", true);
			updateContentValue("termsArena", true);
			this.termsAutoSelected = true;
		}
	}

	submit = () => {
		const { updateContentValue, disableValidation } = this.props;

		let { content } = store.getState();
		const _this = this;
		content = parseSeasons(content);

		disableValidation();
		this.setState({ showSubmitting: true });
		ContentArena.ContentApi.saveContentAsActive(content)
			.done((response) => {
				if (response.success && response.contentId) {
					updateContentValue("id", response.contentId);
					_this.setState({
						showSuccessScreen: true,
						showSubmitting: false,
					});
				} else {
					_this.setState({
						showSubmitting: false,
					});
				}
			});
	};

	save = () => {
		this.setState({ showSubmitting: true });

		let { content } = store.getState();
		content = parseSeasons(content);
		ContentArena.ContentApi.saveContentAsDraft(content)
			.done(() => {
				this.setState({ showSubmitting: false });
			})
			.fail(() => {
				this.setState({ showSubmitting: false });
			});
	};

	closeSuccessScreen = () => {
		this.setState({ showSuccessScreen: false });
		goTo("managelistings");
	};

	successScreen = () => (
		<Modal
			isOpen={this.state.showSuccessScreen}
			onRequestClose={this.closeSuccessScreen}
			bodyOpenClassName="selector"
			style={customStyles}
		>

			<div style={{
				color: "grey",
				padding: 20,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
			>
				<div style={{
					fontSize: 30,
					width: 600,
					textAlign: "center",
					fontWeight: 600,
				}}
				>
					{this.context.t("CL_STEP5_MODAL_SUCCESS_MESSAGE_1")}
				</div>
				<div style={{
					fontSize: 20,
					width: 600,
					margin: 40,
					textAlign: "center",
				}}
				>

					{this.context.t("CL_STEP5_MODAL_SUCCESS_MESSAGE_2")}
				</div>
				<div>
					<button className="standard-button" onClick={this.closeSuccessScreen}>
						{this.context.t("CL_STEP5_MODAL_BUTTON")}
					</button>
				</div>
			</div>

		</Modal>
	);

	updateSalesPackage = (salesPackage, index) => {
		this.props.updateSalesPackages("save", salesPackage, index);
	};

	removeSalesPackage = (index) => {
		this.props.updateSalesPackages("remove", null, index);
	};

	editSalesPackage = (index) => {
		this.setState({
			salesPackageToEdit: index,
			editOpen: true,
		});
	};

	toggleDetails = () => {
		this.setState({ showDetails: !this.state.showDetails });
	};

	getStatus = () => {
		const { status } = this.props;

		if ((!status || status.name === "DRAFT" || status.name === "INACTIVE" || status.name === "AUTO_INACTIVE")) {
			return this.context.t("CL_STEP5_BUTTON_SUBMIT");
		}

		if (status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED")) {
			return this.context.t("CL_STEP5_BUTTON_SAVE");
		}
	};

	render() {
		if (this.props.step !== 5) return (null);
		const {
			salesPackages,
			updateContentValue,
			signature,
			signatureName,
			signaturePosition,
			currency,
			company,
			termsArena,
			terms,
			history,
			customId,
			status,
			COMMENTS_RIGHTS,
		} = this.props;

		const { showDetails, showSubmitting } = this.state;

		const signatureReady = (signature && status !== undefined && (status.name === "INACTIVE" || status.name === "EDITED" || status.name === "APPROVED"));
		const isButtonDisabled = !(terms && termsArena && signature && signatureName && signaturePosition);

		return (
			<div className="step-content review-sign-container">
				{this.successScreen()}
				<div className="summary-text">
					<div className="listing-summary">
						<div>
							<SummaryText {...this.props} />
							<RightsList rightsPackage={this.props.rightsPackage} />
						</div>
						<div>
							<RightsLegend />
						</div>
					</div>
				</div>

				{showDetails && (
					<div>
						<div className="step-title">
							{this.context.t("CL_STEP5_TITLE_PREVIEW")}
						</div>
						<ListingDetails
							onBack={this.toggleDetails}
							company={company}
							listing={this.props}
							history={history}
							content={this.props}
						/>
					</div>
				)}

				{!showDetails && (
					<div className="step-content-container">

						<div
							className="base-full-input"
							style={{
								maxWidth: "none",
								borderBottom: "none",
							}}
						>
							<label>
								{this.context.t("CL_STEP5_PREVIEW_LISTING")}
							</label>
						</div>

						<div className="step-item-description" style={{ marginTop: 0 }}>
							{this.context.t("CL_STEP5_PREVIEW_INFO")}
						</div>

						<div onClick={(e) => {
							e.preventDefault();
						}}
						>
							<ContentListing {...this.props} nameCursor="normal" />
						</div>

						<div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 20 }}>
							<div style={{ marginLeft: "auto" }}>
								{this.context.t("CL_STEP5_PREVIEW_LISTING_DETAILS")}
							</div>
							<div
								onClick={() => {
									goToListing(customId, true);
								}}
								className="ca-btn primary"
								style={{ marginLeft: 20 }}
							>
								{this.context.t("CL_STEP5_PREVIEW_LISTING_BUTTON_TEXT")}
							</div>
						</div>

						<SalesPackageForm
							hideButtons
							sort
							listingId={customId}
							fullSize
							salesPackages={salesPackages}
							currency={currency}
							onEdit={this.editSalesPackage}
							onUpdate={this.updateSalesPackage}
							onRemove={this.removeSalesPackage}
						/>

						{this.state.editOpen && (
							<SalesPackageEdit
								isOpen={this.state.editOpen}
								onClose={() => {
									this.setState({
										editOpen: false,
									});
								}}
								onUpdate={this.updateSalesPackage}
								salesPackageId={this.state.salesPackageToEdit}
								salesPackages={salesPackages}
							/>
						)}

						<div style={{ padding: "20px 0 20px" }}>
							<Comments
								comments={COMMENTS_RIGHTS}
								propName="COMMENTS_RIGHTS"
								onClose={this.save}
							/>
						</div>


						<DigitalSignature
							onReady={(signature) => {
								updateContentValue("signature", signature);
							}}
							onChangeSignatureName={(e) => {
								updateContentValue("signatureName", e.target.value);
							}}
							onChangeSignaturePosition={(e) => {
								updateContentValue("signaturePosition", e.target.value);
							}}
							showTerms
							terms={terms}
							termsArena={termsArena}
							updateContentValue={updateContentValue}
							customClass="review-and-sign"
							ready={signatureReady}
							signature={signature}
							signatureName={signatureName}
							signaturePosition={signaturePosition}
						/>

						<div className="buttons" style={{ marginTop: 20 }}>
							<div className="buttons-container">
								{isButtonDisabled ? (
									<button
										id="draft-listing"
										className="standard-button-big steps disabled"
										onClick={this.props.enableValidation}
									>
										{this.getStatus()}
									</button>
								) : (
									showSubmitting ? (
										<i className="fa fa-cog fa-spin" />
									) : (
										<button
											id="draft-listing"
											className="standard-button-big steps"
											onClick={this.submit}
										>
											{this.getStatus()}
										</button>
									)
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

ReviewAndSign.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.content;

const mapDispatchToProps = dispatch => ({
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
	updateSalesPackages: (name, salesPackage, index) => dispatch({
		type: "UPDATE_SALES_PACKAGES",
		index,
		salesPackage,
		name,
	}),
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ReviewAndSign);
