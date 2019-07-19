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
			invalid: [],
			years,
			PROGRAM_NAME: "",
			PROGRAM_EPISODES: "",
			PROGRAM_YEAR: "",
			PROGRAM_TYPE: "",
			PROGRAM_DURATION: "",
			PROGRAM_DESCRIPTION: "",
			PROGRAM_LANGUAGE: [],
			PROGRAM_SUBTITLES: [],
			PROGRAM_SCRIPT: [],
			EDIT_PROGRAM_DESCRIPTION_OPTIONAL: true,
		};
	}

	updateContentValue = (key, value) => {
		let { invalid } = this.state;
		invalid = invalid.filter(element => element !== key);
		this.setState({ [key]: value, invalid });
	};

	save = () => {
		const {
			PROGRAM_NAME,
			PROGRAM_EPISODES,
			PROGRAM_TYPE,
			PROGRAM_DURATION,
			PROGRAM_DESCRIPTION,
		} = this.state;
		const invalid = [];
		if (!PROGRAM_NAME) {
			invalid.push("PROGRAM_NAME");
		}
		if (!PROGRAM_DESCRIPTION) {
			invalid.push("PROGRAM_DESCRIPTION");
		}
		if (!PROGRAM_TYPE) {
			invalid.push("PROGRAM_TYPE");
		}
		if (!PROGRAM_EPISODES) {
			invalid.push("PROGRAM_EPISODES");
		}
		if (!PROGRAM_DURATION) {
			invalid.push("PROGRAM_DURATION");
		}
		this.setState({ invalid });
		if (!invalid.length) {
			// Save
		}
	};

	isInvalid = (type) => {
		const { invalid } = this.state;
		return invalid.indexOf(type) !== -1;
	};

	getTooltipMessages = () => {
		const {
			PROGRAM_NAME,
			PROGRAM_EPISODES,
			PROGRAM_TYPE,
			PROGRAM_DURATION,
			PROGRAM_DESCRIPTION,
		} = this.state;
		let message = "";
		if (!PROGRAM_NAME) {
			message += "<br/>-  Enter program name.";
		}
		if (!PROGRAM_DESCRIPTION) {
			message += "<br/>-  Enter program description.";
		}
		if (!PROGRAM_TYPE) {
			message += "<br/>-  Enter program type.";
		}
		if (!PROGRAM_EPISODES) {
			message += "<br/>-  Enter program type.";
		}
		if (!PROGRAM_DURATION) {
			message += "<br/>-  Enter program duration.";
		}
		if (message.length) {
			message = `Please complete missing information\n${message}`;
		}
		return message;
	};

	render() {
		const {
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
								value={PROGRAM_NAME}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_NAME", e.target.value);
								}}
								className={`${this.isInvalid("PROGRAM_NAME") ? "is-invalid" : ""}`}
							/>
						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION" />
							</label>
							<textarea
								value={PROGRAM_DESCRIPTION}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_DESCRIPTION", e.target.value);
								}}
								placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION_PLACEHOLDER")}
								className={`${this.isInvalid("PROGRAM_DESCRIPTION") ? "is-invalid" : ""}`}
							/>
						</div>
					</div>

					<div className="d-flex row">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE" />
							</label>
							<select
								value={PROGRAM_TYPE}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_TYPE", e.target.value);
								}}
								className={`${this.isInvalid("PROGRAM_TYPE") ? "is-invalid" : ""}`}
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
								value={PROGRAM_YEAR}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_YEAR", e.target.value);
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
								value={PROGRAM_EPISODES}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_EPISODES", Number(e.target.value));
								}}
								className={`${this.isInvalid("PROGRAM_EPISODES") ? "is-invalid" : ""}`}
							/>
						</div>

						<div className="modal-input">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DURATION" />
							</label>
							<input
								type="number"
								value={PROGRAM_DURATION}
								onChange={(e) => {
									this.updateContentValue("PROGRAM_DURATION", Number(e.target.value));
								}}
								className={`${this.isInvalid("PROGRAM_DURATION") ? "is-invalid" : ""}`}
							/>
						</div>

						<div className="modal-input">
							<label htmlFor="similar-length">
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_DESC" />
							</label>

							<div className="radio-box">
								<input
									type="radio"
									checked={EDIT_PROGRAM_DESCRIPTION_OPTIONAL}
									onChange={() => {
										this.updateContentValue("EDIT_PROGRAM_DESCRIPTION_OPTIONAL", true);
									}}
									id="edit-program-optional"
									className="ca-radio package-selector"
								/>
								<label htmlFor="edit-program-optional"><Translate i18nKey="Yes" /></label>
								<input
									type="radio"
									checked={!EDIT_PROGRAM_DESCRIPTION_OPTIONAL}
									onChange={() => {
										this.updateContentValue("EDIT_PROGRAM_DESCRIPTION_OPTIONAL", false);
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
									value={PROGRAM_LANGUAGE}
									onChange={(value) => {
										this.updateContentValue("PROGRAM_LANGUAGE", value);
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
									value={PROGRAM_SUBTITLES}
									onChange={(value) => {
										this.updateContentValue("PROGRAM_SUBTITLES", value);
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
									value={PROGRAM_SCRIPT}
									onChange={(value) => {
										this.updateContentValue("PROGRAM_SCRIPT", value);
									}}
								/>
							</div>
						</div>
					</div>

				</div>
				<div className="property-edited-program-tab__action" data-tip={this.getTooltipMessages()}>
					<button type="button" className={`ca-btn primary ${this.getTooltipMessages() ? "disabled" : ""}`} onClick={this.save}>
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
