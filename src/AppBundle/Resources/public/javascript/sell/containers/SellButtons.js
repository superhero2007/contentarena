import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";
import { getMaxDate } from "@utils/listing";
import moment from "moment";
import Translate from "@components/Translator/Translate";
import store from "../../main/store";
import { listingSaved, updateContentValue } from "../actions/contentActions";
import { enableValidation, disableValidation } from "../../main/actions/validationActions";
import companyIsValid from "../actions/validationActions";
import { editedProgramSelected, parseSeasons } from "../../main/actions/utils";
import { LISTING_STATUS } from "../../common/constants";

const MIN_PROGRAM_DESC_LENGTH = 30;

class SellButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			lastStep: props.lastStep || 5,
			saving: false,
			savingSuccess: false,
			visited: [1],
		};
	}

	componentWillReceiveProps(props) {
		if (this.state.visited.indexOf(props.step) === -1) {
			this.setState({
				visited: [...this.state.visited, props.step],
			});
		}
		ReactTooltip.rebuild();
	}

	componentWillUnmount() {
		const { validation, disableValidation } = this.props;
		if (validation) disableValidation();
	}

	saveAndGoNext = (goNextStep = true) => {
		const { history } = this.props;
		this.props.disableValidation();
		this.props.listingSaved();
		this.setState({
			saving: goNextStep,
			savingDraft: !goNextStep,
			savingSuccess: false,
		});

		let { content } = store.getState();
		content = parseSeasons(content);
		ContentArena.ContentApi.saveContentAsDraft(content)
			.done((response) => {
				const currentStep = Number(content.step);
				const nextStep = currentStep + 1;

				if (response.success && response.contentId) {
					this.props.updateContentValue("id", response.contentId);
					this.props.updateContentValue("customId", response.customId);
				}

				if (response.success && response.sports) {
					this.props.updateContentValue("sports", response.sports);
				}

				this.setState({
					saving: false,
					savingSuccess: true,
					savingDraft: false,
				});

				setTimeout(() => {
					this.setState({ savingSuccess: false });
				}, 3000);

				if (currentStep === 1) {
					history.replace(`/contentlisting/${response.customId}/1`);
				}

				if (goNextStep) {
					history.push(`/contentlisting/${response.customId}/${nextStep}`);
				}
			})
			.fail(() => {
				this.setState({
					saving: false,
					savingDraft: false,
					savingSuccess: false,
				});
			});
	};

	/**
	 * if currency selected, listing image inserted, expiry date selected, sales bundles added,
	 * company address complete, place of jurisdiction selected and if vat = yes, percentage is inserted
	 * @returns {boolean}
	 */
	reviewAndSignEnabled = () => {
		const {
			expiresAt, vat, vatPercentage, salesPackages, company, law, jurisdiction,
		} = this.props;

		return expiresAt
			&& (vat === "no" || (vatPercentage && vatPercentage !== 0 && vatPercentage !== ""))
			&& law !== null
			&& jurisdiction !== null
			&& jurisdiction !== undefined
			&& jurisdiction !== ""
			&& salesPackages.length > 0
			&& companyIsValid(company);
	};

	reviewAndSignGetMessages = () => {
		const {
			expiresAt, vat, vatPercentage, salesPackages, company, law, jurisdiction,
		} = this.props;
		let message = "Please complete missing information\n";

		if (salesPackages.length === 0) message += "<br/>- Select at least one sales bundle.\n";
		if (!expiresAt) message += "<br/>- Select listing expiry.";
		if (!companyIsValid(company)) message += "<br/>- Enter company information.";
		if (law === null) message += "<br/>- Select application law";
		if (jurisdiction === null || jurisdiction === undefined || jurisdiction === "") message += "<br/>- Enter place of jurisdiction";
		if (vat === "yes" && (!vatPercentage || vatPercentage === 0 || vatPercentage === "")) message += "<br/>- Enter VAT percentage.";

		return message;
	};

	checkFixturesValidity = (seasons) => {
		let getAllFixtures = [];
		seasons.forEach((season) => {
			if (season.fixtures && season.fixtures.length) {
				getAllFixtures = [...getAllFixtures, ...season.fixtures];
			}
		});

		return getAllFixtures.length ? getAllFixtures.every(fixtures => fixtures.name.length) : true;
	};

	checkSeasonsValidity = (seasons) => {
		const { sports, customTournament } = this.props;

		if (sports.some(sport => sport.custom) && (customTournament === null || customTournament === "")) return true;

		return seasons.every(season => (season.startDate || season.customStartDate) && (season.endDate || season.customEndDate));
	};

	programIsValid = () => {
		const {
			rightsPackage,
			PROGRAM_NAME,
			PROGRAM_EPISODES,
			PROGRAM_DURATION,
			PROGRAM_TYPE,
			PROGRAM_DESCRIPTION,
			EDIT_PROGRAM_DESCRIPTION_OPTIONAL,
		} = this.props;

		const program = editedProgramSelected(rightsPackage);
		if (!program) return true;

		const editProgramDescriptionValidation = EDIT_PROGRAM_DESCRIPTION_OPTIONAL || PROGRAM_DESCRIPTION;

		return PROGRAM_NAME && PROGRAM_NAME !== ""
			&& PROGRAM_EPISODES && PROGRAM_EPISODES !== ""
			&& PROGRAM_DURATION && PROGRAM_DURATION !== ""
			&& PROGRAM_TYPE && PROGRAM_TYPE !== ""
			&& editProgramDescriptionValidation;
	};

	step2Enabled = () => {
		const { rightsPackage, programDescription } = this.props;
		const program = this.programIsValid();
		return rightsPackage.length > 0 && !rightsPackage.filter(element => element.exclusive === "").length && program && programDescription && programDescription.length >= MIN_PROGRAM_DESC_LENGTH;
	};

	step3Enabled = () => {
		const { endDateMode, contentDeliveryConfigured, tempData } = this.props;

		if (tempData.CONTENT_DELIVERY_SHOULD_BE_CONFIGURED && !contentDeliveryConfigured) {
			return false;
		}

		return endDateMode !== undefined;
	};

	step3GetMessages = () => {
		const { endDateMode, tempData, contentDeliveryConfigured } = this.props;
		let message = "Please complete missing information\n";
		if (endDateMode === undefined) message += "<br/>- Select when the license period ends.";

		if (tempData.CONTENT_DELIVERY_SHOULD_BE_CONFIGURED && !contentDeliveryConfigured) {
			message += "<br/>- Content Delivery must be configured first.";
		}

		return message;
	};

	step1Enabled = () => {
		const { sports, name, seasons } = this.props;
		const isFixturesValid = seasons.length ? this.checkFixturesValidity(seasons) : true;
		const isSeasonsValid = seasons.length ? this.checkSeasonsValidity(seasons) : true;

		return sports.length > 0 && name && isFixturesValid && isSeasonsValid;
	};

	step1GetMessages = () => {
		const { sports, name, seasons } = this.props;
		let message = "Please complete missing information\n";
		const isFixturesValid = seasons.length ? this.checkFixturesValidity(seasons) : true;
		const isSeasonsValid = seasons.length ? this.checkSeasonsValidity(seasons) : true;

		if (!isFixturesValid) message += "<br/>- Fixture name should not be empty.\n";
		if (!isSeasonsValid) message += "<br/>- Season duration is required.\n";
		if (sports.length === 0) message += "<br/>- Select a sport.\n";
		if (!name || name === "") message += "<br/>- Enter a name for the listing.";


		return message;
	};

	step2GetMessages = () => {
		const { programDescription, rightsPackage } = this.props;
		let message = "Please complete missing information\n";
		const program = this.programIsValid();
		if (rightsPackage.length === 0) message += "<br/>- Select at least one right.\n";
		if (rightsPackage.filter(element => element.exclusive === "").length) message += "<br/>- Define exclusivity for selected rights categories.\n";
		if (!programDescription || programDescription.length < MIN_PROGRAM_DESC_LENGTH) message += `<br/>- Program description must be at least ${MIN_PROGRAM_DESC_LENGTH} characters length`;
		if (!program) message += "<br/>-  Enter program information.";

		return message;
	};

	getTooltipMessages = () => {
		const { step } = this.props;

		if (step === 1 && !this.step1Enabled()) return this.step1GetMessages();
		if (step === 2 && !this.step2Enabled()) return this.step2GetMessages();
		if (step === 3 && !this.step3Enabled()) return this.step3GetMessages();
		if (step === 4 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
	};

	getReviewButtonTooltipMessages = () => {
		const { step } = this.props;

		if (step === 4 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
	};

	goToReviewAndSign = () => {
		const { history } = this.props;
		this.props.disableValidation();
		this.props.listingSaved();
		let savePromise = null;
		let { content } = store.getState();
		content = parseSeasons(content);
		this.setState({ saving: true });

		if (!content.status || (content.status.name === "DRAFT" && content.step === 4)) {
			// we are in new mode or editing draft
			savePromise = ContentArena.ContentApi.saveContentAsInactive({ ...content, ...{ status: "AUTO_INACTIVE" } });
		} else {
			savePromise = ContentArena.ContentApi.saveContentAsDraft(content);
		}

		savePromise.done((response) => {
			if (response.success && response.contentId) {
				if (response.salesPackages && Array.isArray(response.salesPackages)) {
					response.salesPackages.forEach((sp, i) => {
						if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
						if (sp.excludedCountries) {
							sp.excludedTerritories = sp.excludedCountries.map(t => ({
								label: t.name,
								value: t.name,
							}));
						}
						if (sp.territories) {
							sp.territories = sp.territories.map(t => ({
								label: t.name,
								value: t.name,
							}));
						}

						this.props.updateSalesPackages("save", sp, i);
					});
				}

				this.props.updateContentValue("id", response.contentId);
				this.setState({
					saving: false,
					savingSuccess: true,
				});
				history.push(`/contentlisting/${response.customId}/sign`);
			}
		});
	};

	goToPreviousStep = () => {
		const { history } = this.props;
		const { content } = store.getState();
		const prevStep = (Number(content.step) - 1);

		history.push(`/contentlisting/${content.customId}/${prevStep}`);
	};

	isSaveButtonDisabled = () => {
		const { step } = this.props;
		const { saving, savingDraft } = this.state;
		const cantReviewAndSign = (step === 4 && !this.reviewAndSignEnabled());

		return saving
			|| cantReviewAndSign
			|| savingDraft
			|| (step === 1 && !this.step1Enabled())
			|| (step === 2 && !this.step2Enabled())
			|| (step === 3 && !this.step3Enabled());
	};

	isSaveDraftButtonDisabled = () => {
		const { step } = this.props;
		const { saving, savingDraft } = this.state;

		return saving
			|| savingDraft
			|| (step === 1 && !this.step1Enabled());
	};

	render() {
		const { step, status } = this.props;
		const {
			lastStep, saving, savingDraft, savingSuccess,
		} = this.state;
		const cantReviewAndSign = (step === 4 && !this.reviewAndSignEnabled());
		const isSaveButtonDisabled = this.isSaveButtonDisabled();
		const isSaveDraftButtonDisabled = this.isSaveDraftButtonDisabled();
		const statusName = status ? status.name : "";

		return (
			<div className="buttons cl_buttons">
				{step < lastStep && (
					<div className="buttons-container step-1 step-2">
						<button
							className="yellow-border-button"
							disabled={step <= 1}
							onClick={this.goToPreviousStep}
						>
							<i className="fa fa-angle-left" />
							<Translate i18nKey="Back" />
						</button>

						<div
							data-tip={step === 1 && this.getTooltipMessages()}
							data-tip-disable={step !== 1}
						>
							<button
								id="next-step"
								className="yellow-button"
								disabled={isSaveDraftButtonDisabled}
								onClick={() => (this.saveAndGoNext(false))}
								style={{ height: 64 }}
							>
								{statusName === LISTING_STATUS.DRAFT && <Translate i18nKey="SAVE_DRAFT" />}
								{statusName !== LISTING_STATUS.DRAFT && <Translate i18nKey="SAVE" />}
								{savingDraft && <i className="fa fa-cog fa-spin" />}
								{savingSuccess && <i className="fa fa-check" />}
							</button>
						</div>

						<div
							data-tip={cantReviewAndSign ? this.getReviewButtonTooltipMessages() : this.getTooltipMessages()}
						>
							<button
								id="next-step"
								className="yellow-button"
								disabled={isSaveButtonDisabled}
								onClick={() => (step === 4 ? this.goToReviewAndSign() : this.saveAndGoNext())}
							>
								<Translate i18nKey="Next" />
								{saving ? <i className="fa fa-cog fa-spin" /> : <i className="fa fa-arrow-right" />}
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

SellButtons.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.content;

const mapDispatchToProps = dispatch => ({
	listingSaved: () => dispatch(listingSaved()),
	updateContentValue: (key, value) => dispatch(updateContentValue(key, value)),
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
)(SellButtons);
