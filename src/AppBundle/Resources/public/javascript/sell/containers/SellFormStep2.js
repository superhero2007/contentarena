import React from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import SuperRightList from "./SuperRightList";
import RightDefinitions from "../components/RightDefinitions";
import ProductionStandardsDefinitions from "../components/ProductionStandardsDefinitions";
import { editedProgramSelected } from "../../main/actions/utils";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import { LanguageSelector } from "../../main/components/LanguageSelector";
import { SummaryText } from "../components/SellFormItems";
import { listingEdited, updateStep } from "../actions/contentActions";

class SellFormStep2 extends React.Component {
	constructor(props) {
		super(props);

		const startYear = 2030;
		const years = [];

		for (let i = 0; i < 81; i++) {
			years.push(startYear - i);
		}

		this.state = {
			years,
			listingEdited: false,
			title: "Step 2 - Configure Rights",
			licensePopup: false,
			rights: RightDefinitions,
			productionStandards: ProductionStandardsDefinitions,
		};

		this.defaultValue = "";
	}

	componentWillReceiveProps(nextProps, context) {
		if (nextProps.step === 2 && this.props.step !== 2) this.props.updateStep(2);
	}

	componentDidMount() {
		window.addEventListener("beforeunload", this.beforeunload);
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.beforeunload);
	}

	beforeunload = (e) => {
		if (this.props.edited) {
			e.preventDefault();
			e.returnValue = true;
		}
	};

	handleCheckboxChange = (flag) => {
		const { changeAllEpisodeFlag, EDIT_PROGRAM_DESCRIPTION_OPTIONAL } = this.props;
		if (flag !== EDIT_PROGRAM_DESCRIPTION_OPTIONAL) {
			changeAllEpisodeFlag(flag);
		}
	};

	getProgramDescriptionDefaultValue = (value) => {
		const { updateContentValue, programDescription } = this.props;
		if (value && !this.userDescriptionAdded && (!programDescription || programDescription === "")) {
			this.userDescriptionAdded = false;
			updateContentValue("programDescription", value);
		}
	};

	isInvalid = (type) => {
		const { validation } = this.props;
		return !type && validation;
	};

	render() {
		const {
			programDescription,
			updateContentValue,
			listingEdited,
			PROGRAM_NAME,
			PROGRAM_EPISODES,
			PROGRAM_YEAR,
			PROGRAM_TYPE,
			PROGRAM_DURATION,
			PROGRAM_DESCRIPTION,
			PROGRAM_SUBTITLES,
			PROGRAM_SCRIPT,
			PROGRAM_LANGUAGE,
			EDIT_PROGRAM_DESCRIPTION_OPTIONAL,
			rightsPackage,
			step,
			sports,
			sportCategory,
			tournament,
			seasons,
			packages,
			validation,
			edited,
		} = this.props;

		if (step !== 2) return (null);

		const editedProgram = editedProgramSelected(rightsPackage);

		const isProgramDescriptionInvalid = !programDescription && validation;

		return (

			<div className="step-content step-2">

				<Prompt
					when={edited}
					message="Are you sure you want to leave? Changes you made may not be saved."
				/>

				{(sports.length || sportCategory.length || tournament.length || seasons.length) && (
					<div className="listing-summary">
						<SummaryText {...this.props} />
					</div>
				)}

				<div className="step-content-container">
					<div className="textarea-input-wrapper">
						<header>
							<Translate i18nKey="CL_STEP2_PROGRAM_DESCRIPTION_TITLE" />
						</header>
						<div className="textarea-input-description">
							<Translate i18nKey="CL_STEP2_PROGRAM_DESCRIPTION_TEXT" />
						</div>
						<textarea
							onChange={(e) => {
								updateContentValue("programDescription", e.target.value);
								listingEdited();
								this.userDescriptionAdded = true;
							}}
							value={programDescription}
							placeholder={isProgramDescriptionInvalid ? this.context.t("PROGRAM_DESCRIPTION_EMPTY") : this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_PLACEHOLDER")}
							style={{ minHeight: 150 }}
							className={isProgramDescriptionInvalid ? "is-invalid" : ""}
						/>

						{/* TODO: Remove this hidden div and replace default value fro a proper fn */}
						{!this.userDescriptionAdded && (
							<div className="is-hidden">
								<ContentListingEventDetails
									{...this.props}
									setRawContent={this.getProgramDescriptionDefaultValue}
								/>
							</div>
						)}
					</div>

					<SuperRightList packages={packages} />
				</div>

				{/* PROGRAM DETAILS */}
				{editedProgram && (
					<div className="program-container">
						<div className="left">
							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_NAME" />
								</label>
								<input
									type="text"
									value={PROGRAM_NAME}
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_NAME", e.target.value);
									}}
									className={`${this.isInvalid(PROGRAM_NAME) ? "is-invalid" : ""}`}
								/>
							</div>

							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_EPISODES" />
								</label>
								<input
									type="number"
									value={PROGRAM_EPISODES}
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_EPISODES", Number(e.target.value));
									}}
									className={`${this.isInvalid(PROGRAM_EPISODES) ? "is-invalid" : ""}`}
								/>
							</div>

							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_DURATION" />
								</label>
								<input
									type="number"
									value={PROGRAM_DURATION}
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_DURATION", Number(e.target.value));
									}}
									className={`${this.isInvalid(PROGRAM_DURATION) ? "is-invalid" : ""}`}
								/>
							</div>

							<div className="modal-input">
								<label htmlFor="similar-length">
									<Translate i18nKey="LISTING_DETAILS_PROGRAM_ENTER_DETAILS_VIA_EDITED_PROGRAM_DESC" />
								</label>

								<div className="radio-box">
									<input
										type="radio"
										checked={EDIT_PROGRAM_DESCRIPTION_OPTIONAL}
										onChange={() => {
											listingEdited();
											this.handleCheckboxChange(true);
										}}
										id="edit-program-optional"
										className="ca-radio package-selector"
									/>
									<label htmlFor="edit-program-optional"><Translate i18nKey="Yes" /></label>
									<input
										type="radio"
										checked={!EDIT_PROGRAM_DESCRIPTION_OPTIONAL}
										onChange={() => {
											listingEdited();
											this.handleCheckboxChange(false);
										}}
										id="edit-program"
										className="ca-radio package-selector"
									/>
									<label htmlFor="edit-program"><Translate i18nKey="No" /></label>
								</div>

							</div>
							{!EDIT_PROGRAM_DESCRIPTION_OPTIONAL && (
								<div className="modal-input red-text">
									<Translate i18nKey="LISTING_DETAILS_PROGRAM_SIMILAR_LENGTH_EPISODES" />
								</div>
							)}
							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_TYPE" />
								</label>
								<select
									value={PROGRAM_TYPE}
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_TYPE", e.target.value);
									}}
									className={`${this.isInvalid(PROGRAM_TYPE) ? "is-invalid" : ""}`}
								>
									<option value="">Select</option>
									<option value="HIGHLIGHT_SHOW">Highlight show</option>
									<option value="DOCUMENTARY">Documentary</option>
									<option value="PREVIEW">Preview</option>
									<option value="TALK_SHOW">Talk show</option>
									<option value="OTHER">Other</option>
								</select>

							</div>

							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_YEAR" />
								</label>
								<select
									value={PROGRAM_YEAR}
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_YEAR", e.target.value);
									}}
								>
									<option value="Year">Year</option>
									{this.state.years.map((year, i) => (<option key={i} value={year}>{year}</option>))}
								</select>
							</div>
							<div>
								<div className="modal-input">
									<label>
										<Translate i18nKey="CL_STEP3_PROGRAM_MODAL_LANGUAGE" />
									</label>
									<div className="select">
										<LanguageSelector
											value={PROGRAM_LANGUAGE}
											onChange={(value) => {
												listingEdited();
												updateContentValue("PROGRAM_LANGUAGE", value);
											}}
										/>
									</div>

								</div>
								<div className="modal-input">
									<label>
										<Translate i18nKey="CL_STEP3_PROGRAM_MODAL_SUBTITLES" />
									</label>
									<div className="select">
										<LanguageSelector
											value={PROGRAM_SUBTITLES}
											onChange={(value) => {
												listingEdited();
												updateContentValue("PROGRAM_SUBTITLES", value);
											}}
										/>
									</div>
								</div>
								<div className="modal-input">
									<label>
										<Translate i18nKey="CL_STEP3_PROGRAM_MODAL_SCRIPT" />
									</label>
									<div className="select">
										<LanguageSelector
											value={PROGRAM_SCRIPT}
											onChange={(value) => {
												listingEdited();
												updateContentValue("PROGRAM_SCRIPT", value);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="right">
							<div className="modal-input">
								<label>
									<Translate i18nKey="CL_STEP2_PROGRAM_DESCRIPTION" />
								</label>
								<textarea
									onChange={(e) => {
										listingEdited();
										updateContentValue("PROGRAM_DESCRIPTION", e.target.value);
									}}
									placeholder={this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_OPTIONAL_PLACEHOLDER")}
								>
									{PROGRAM_DESCRIPTION}
								</textarea>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

SellFormStep2.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	updateStep: step => dispatch(updateStep(step)),
	listingEdited: () => dispatch(listingEdited()),
	superRightsUpdated: rightsPackage => dispatch({
		type: "SUPER_RIGHTS_UPDATED",
		rightsPackage,
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
)(SellFormStep2);
