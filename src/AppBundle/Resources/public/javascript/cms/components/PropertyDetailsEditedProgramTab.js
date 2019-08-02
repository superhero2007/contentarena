import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import ReactTooltip from "react-tooltip";
import { LanguageSelector } from "../../main/components/LanguageSelector";

class PropertyDetailsEditedProgramTab extends Component {
	constructor(props) {
		super(props);
		const startYear = 2030;
		const years = [];

		for (let i = 0; i < 81; i++) {
			years.push(startYear - i);
		}

		this.state = {
			years,
			programName: "",
			programEpisodes: "",
			programYear: "",
			programType: "",
			programDuration: "",
			programDescription: "",
			programLanguage: [],
			programSubtitles: [],
			programScript: [],
			editProgramDescriptionOptional: true,
		};
	}

	updateContentValue = (key, value) => {
		this.setState({ [key]: value });
	};

	save = () => {
		console.log(this.state);
	};

	getTooltipMessages = () => {
		const {
			programName,
			programEpisodes,
			programType,
			programDuration,
			programDescription,
		} = this.state;
		let message = "";
		if (!programName) {
			message += "<br/>-  Enter program name.";
		}
		if (!programDescription) {
			message += "<br/>-  Enter program description.";
		}
		if (!programType) {
			message += "<br/>-  Enter program type.";
		}
		if (!programEpisodes) {
			message += "<br/>-  Enter program type.";
		}
		if (!programDuration) {
			message += "<br/>-  Enter program duration.";
		}
		if (message.length) {
			message = `Please complete missing information\n${message}`;
		}
		return message;
	};

	render() {
		const {
			programName,
			programEpisodes,
			programYear,
			programType,
			programDuration,
			programDescription,
			programSubtitles,
			programScript,
			programLanguage,
			editProgramDescriptionOptional,
		} = this.state;
		return (
			<section className="property-edited-program-tab">
				<div className="property-edited-program-tab__header">
					<h5 className="title">
						<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_TITLE" />
					</h5>
					<h6 className="subtitle">
						<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SUBTITLE" />
					</h6>
				</div>
				<div className="property-edited-program-tab__container">
					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_NAME" />
							</label>
							<input
								type="text"
								value={programName}
								onChange={(e) => {
									this.updateContentValue("programName", e.target.value);
								}}
							/>
						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION" />
							</label>
							<textarea
								value={programDescription}
								onChange={(e) => {
									this.updateContentValue("programDescription", e.target.value);
								}}
								placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION_PLACEHOLDER")}
							/>
						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE" />
							</label>
							<select
								value={programType}
								onChange={(e) => {
									this.updateContentValue("programType", e.target.value);
								}}
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
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_YEAR" />
							</label>
							<select
								value={programYear}
								onChange={(e) => {
									this.updateContentValue("programYear", e.target.value);
								}}
							>
								<option value="Year">Year</option>
								{this.state.years.map((year, i) => (<option key={i} value={year}>{year}</option>))}
							</select>
						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_EPISODES" />
							</label>
							<input
								type="number"
								value={programEpisodes}
								onChange={(e) => {
									this.updateContentValue("programEpisodes", Number(e.target.value));
								}}
							/>
						</div>

						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DURATION" />
							</label>
							<input
								type="number"
								value={programDuration}
								onChange={(e) => {
									this.updateContentValue("programDuration", Number(e.target.value));
								}}
							/>
						</div>

						<div className="modal-input">
							<label htmlFor="similar-length">
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_DESC" />
							</label>

							<div className="radio-box">
								<input
									type="radio"
									checked={editProgramDescriptionOptional}
									onChange={() => {
										this.updateContentValue("editProgramDescriptionOptional", true);
									}}
									id="edit-program-optional"
									className="ca-radio package-selector"
								/>
								<label htmlFor="edit-program-optional"><Translate i18nKey="Yes" /></label>
								<input
									type="radio"
									checked={!editProgramDescriptionOptional}
									onChange={() => {
										this.updateContentValue("editProgramDescriptionOptional", false);
									}}
									id="edit-program"
									className="ca-radio package-selector"
								/>
								<label htmlFor="edit-program"><Translate i18nKey="No" /></label>
							</div>

						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LANGUAGE" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programLanguage}
									onChange={(value) => {
										this.updateContentValue("programLanguage", value);
									}}
								/>
							</div>
						</div>

						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SUBTITLES" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programSubtitles}
									onChange={(value) => {
										this.updateContentValue("programSubtitles", value);
									}}
								/>
							</div>
						</div>

						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SCRIPT" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programScript}
									onChange={(value) => {
										this.updateContentValue("programScript", value);
									}}
								/>
							</div>
						</div>
					</div>

				</div>
				<div className="buttons" data-tip={this.getTooltipMessages()}>
					<button
						type="button"
						className={`yellow-button centered-btn ${this.getTooltipMessages() ? "disabled" : ""}`}
						disabled={this.getTooltipMessages()}
						onClick={this.save}
					>
						<Translate i18nKey="Save" />
					</button>
				</div>
				<ReactTooltip html />
			</section>
		);
	}
}

PropertyDetailsEditedProgramTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

export default connect(
	mapStateToProps,
	null,
)(PropertyDetailsEditedProgramTab);
