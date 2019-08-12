import React from "react";
import { connect } from "react-redux";
import Moment from "moment";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import PopupRight from "../components/PopupRight";
import LicenseDateSelector from "../components/LicenseDateSelector";
import RightDefinitions from "../components/RightDefinitions";
import ProductionStandardsDefinitions from "../components/ProductionStandardsDefinitions";
import { SummaryText, TitleBar } from "../components/SellFormItems";
import { DATE_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import RightsList from "../../main/components/RightsList";

const licenseStyles = {
	fontSize: "15px",
	fontWeight: "100",
	justifyContent: "left",
};

class SellFormStep3 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			licensePopup: false,
			rights: RightDefinitions,
			productionStandards: ProductionStandardsDefinitions,
			contentDeliveryShouldBeConfigured: !ProductionStandardsDefinitions.find(item => this.skipContentDelivery(item)),
			contentDeliveryConfigured: props.contentDeliveryConfigured,
		};

		this.updateContentDeliveryStatus();

		this.blueCheck = `${assetsBaseDir}app/images/blue_check.png`;
		this.yellowCheck = `${assetsBaseDir}app/images/yellow_chech.png`;
	}

	componentWillReceiveProps(nextProps) {
		const { rightsPackage, contentDeliveryConfigured } = this.props;

		if (rightsPackage !== nextProps.rightsPackage || contentDeliveryConfigured !== nextProps.contentDeliveryConfigured) {
			this.setState({
				contentDeliveryShouldBeConfigured: !ProductionStandardsDefinitions.find(item => this.skipContentDelivery(item, nextProps)),
				contentDeliveryConfigured: nextProps.contentDeliveryConfigured,
			}, () => this.updateContentDeliveryStatus());
		}
	}

	closeLicensePopup = () => {
		this.setState({ licensePopup: false });
	};

	selectLicenseDates = (key, value) => {
		this.props.updateContentValue(key, value);
	};

	updateRight = (rightsPackage) => {
		this.props.superRightsUpdated(rightsPackage);
	};

	superRightsEnabled = (superRights) => {
		const selected = this.props.rightsPackage.map(a => a.shortLabel);

		return superRights.filter(r => selected.indexOf(r) !== -1).length > 0;
	};

	skipContentDelivery = (right, { rightsPackage } = this.props) => {
		const selected = rightsPackage.map(a => a.shortLabel);

		return right.key === "CONTENT_DELIVERY"
			&& selected.indexOf("NA") === -1
			&& selected.indexOf("LB") === -1
			&& selected.indexOf("HL") === -1
			&& selected.indexOf("DT") === -1;
	};

	render() {
		const {
			step,
			rightsPackage,
			startDateMode,
			endDateMode,
			endDate,
			updateContentValue,
			PROGRAM_NAME,
			LICENSED_LANGUAGES,
			validation,
		} = this.props;
		if (step !== 3) return (null);

		const isLicenseInvalid = !endDateMode && validation;

		return (

			<div className="step-content step-3">

				{/* SUMMARY */}
				<div className="listing-summary">
					<div>
						<SummaryText {...this.props} />
						<RightsList rightsPackage={rightsPackage} />
					</div>
					<div>
						<RightsLegend />
					</div>
				</div>

				<div className="step-content-container">
					<LicenseDateSelector
						isOpen={this.state.licensePopup}
						onUpdate={this.selectLicenseDates}
						startDate={this.props.startDate}
						endDateLimit={this.props.endDateLimit}
						endDateMode={endDateMode}
						startDateMode={startDateMode}
						endDate={endDate}
						onClose={this.closeLicensePopup}
					/>

					<TitleBar title="CL3_LICENSE_PERIOD" />

					<div className="license-date-container">
						<div className="table-right">
							<div className="row">
								<div className="column right-name">
									<Translate i18nKey="CL_STEP3_TITLE_LICENSE_PERIOD_START" />
								</div>
								<div
									className="column right-item-content"
									style={licenseStyles}
									onClick={this.showLicensePopup}
								>
									{this.props.startDateMode === "LICENSE" && <Translate i18nKey="CL3_CONTRACT_CONCLUSION" />}
									{this.props.startDateMode === "DATE" && Moment(this.props.startDate)
										.format(DATE_FORMAT)}
								</div>
								<div className="column right-name">
									<Translate i18nKey="CL_STEP3_TITLE_LICENSE_PERIOD_END" />
								</div>
								<div
									className={`column right-item-content ${isLicenseInvalid ? "is-invalid" : ""}`}
									style={licenseStyles}
									onClick={this.showLicensePopup}
								>

									{isLicenseInvalid ? (
										<Translate i18nKey="LICENSE_PERIOD_EMPTY" />
									) : (
										<span>
											{endDateMode === "LIMITED" && this.props.endDateLimit}
											{endDateMode === "LIMITED" && <Translate i18nKey="LISTING_DETAILS_LICENSE_END_DAYS" />}
											{endDateMode === "DATE" && Moment(this.props.endDate)
												.format(DATE_FORMAT)}
											{endDateMode === "UNLIMITED" && <Translate i18nKey="Unlimited" />}
											{!endDateMode && <Translate i18nKey="CL_STEP3_SELECT_LICENSE_PERIOD" />}
										</span>
									)}

									<div
										className="column right-item-content edit-item"
										onClick={this.showLicensePopup}
									>
										<i className="fa fa-edit" />
									</div>
								</div>
							</div>
						</div>
					</div>

					<TitleBar title="CL_STEP3_TITLE_GRANT_RIGHT" />

					<div className="rights-container">
						{
							this.state.rights.length > 0 && this.state.rights.map((right) => {
								if (right.superRights.length > 0
									&& !this.superRightsEnabled(right.superRights)) {
									return;
								}

								const rightKeyPreffix = "RIGHTS_";
								const rightKeySuffix = "_DESCRIPTION";

								return (
									<PopupRight
										key={right.key}
										id={right.key}
										name={rightKeyPreffix + right.key}
										description={rightKeyPreffix + right.key + rightKeySuffix}
										global={right.global}
										language={right.language}
										languages={LICENSED_LANGUAGES}
										options={right.options}
										multiple={right.multiple}
										superRights={right.superRights}
										showTextArea={right.showTextArea}
										textAreaRequired={right.textAreaRequired}
										onUpdate={this.updateRight}
										onUpdateListing={(k, v) => {
											updateContentValue(k, v);
										}}
										rightsPackage={this.props.rightsPackage}
									/>
								);
							})
						}
					</div>

					<TitleBar title="CL_STEP3_TITLE_PRODUCTION_STANDARDS" />

					<div className="rights-container">
						{
							this.state.productionStandards.length > 0 && this.state.productionStandards.map((right) => {
								const { superRights } = right;

								if (right.superRights.length > 0
									&& !this.superRightsEnabled(right.superRights)) {
									return;
								}

								if (this.skipContentDelivery(right)) return;

								const { contentDeliveryShouldBeConfigured, contentDeliveryConfigured } = this.state;

								const rightDisabled = contentDeliveryShouldBeConfigured
									&& !contentDeliveryConfigured && right.key !== "CONTENT_DELIVERY";

								const rightKeyPreffix = "RIGHTS_";
								const rightKeySuffix = "_DESCRIPTION";

								return (
									<PopupRight
										key={right.key}
										id={right.key}
										name={rightKeyPreffix + right.key}
										description={rightKeyPreffix + right.key + rightKeySuffix}
										selected={this.props[right.key]}
										options={right.options}
										multiple={right.multiple}
										productionLabel={right.productionLabel}
										checkContentDelivery
										programName={PROGRAM_NAME}
										onOKClicked={this.onProductionPopupOKClicked}
										onProgram={() => {
											this.setState({
												programPopupActive: true,
											});
										}}
										content={this.props}
										superRights={superRights}
										showTextArea={right.showTextArea}
										textAreaRequired={right.textAreaRequired}
										technicalFee={right.technicalFee}
										onUpdate={this.updateRight}
										onUpdateListing={(k, v) => {
											updateContentValue(k, v);
										}}
										rightsPackage={this.props.rightsPackage}
										disabled={rightDisabled}
										contentDeliveryConfigured={this.props.contentDeliveryConfigured}
										validation={validation}
									/>
								);
							})
						}
					</div>
				</div>
			</div>
		);
	}

	showLicensePopup = () => {
		this.setState({
			licensePopup: true,
		});
	};

	onProductionPopupOKClicked = (name) => {
		const { updateContentValue } = this.props;

		if (name === "CONTENT_DELIVERY") {
			updateContentValue("contentDeliveryConfigured", true);
			this.setState({
				contentDeliveryConfigured: true,
			});
		}
	};

	updateContentDeliveryStatus = () => {
		const { updateContentValue, tempData } = this.props;
		const { contentDeliveryShouldBeConfigured } = this.state;

		updateContentValue("tempData", {
			...tempData,
			CONTENT_DELIVERY_SHOULD_BE_CONFIGURED: contentDeliveryShouldBeConfigured,
		});
	};
}

SellFormStep3.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	superRightsUpdated: rightsPackage => dispatch({
		type: "SUPER_RIGHTS_UPDATED",
		rightsPackage,
	}),
	removeNewSport: index => dispatch({
		type: "REMOVE_NEW",
		index,
		selectorType: "sports",
	}),
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SellFormStep3);
