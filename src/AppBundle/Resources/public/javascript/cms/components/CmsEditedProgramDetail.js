import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Translate from "@components/Translator/Translate";

import { LanguageSelector } from "../../main/components/LanguageSelector";
import CmsTerritorySelector from "./CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";

class CmsEditedProgramDetail extends Component {
	constructor(props) {
		super(props);
		const startYear = 2030;
		const years = [];

		for (let i = 0; i < 81; i++) {
			years.push(startYear - i);
		}
		const territoriesMode = props.program.territoriesMode || BUNDLE_TERRITORIES_METHOD.WORLDWIDE;
		this.state = {
			years,
			programName: props.program.name || "",
			programEpisode: props.program.episode || "",
			programYear: props.program.year || "",
			programType: props.program.type || "",
			programDuration: props.program.duration || "",
			programDescription: props.program.description || "",
			programLanguages: props.program.languages || [],
			programSubtitles: props.program.subtitles || [],
			programScripts: props.program.scripts || [],
			editProgramDescriptionOptional: props.program.editProgramDescriptionOptional || true,
			exclusively: props.program.exclusively || false,
			territories: territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? props.countries : (props.program.territories || []),
			territoriesMode,
		};
	}

	updateContentValue = (key, value) => {
		this.setState({ [key]: value });
	};

	save = () => {
		const {
			programName,
			programEpisode,
			programYear,
			programType,
			programDuration,
			programDescription,
			programLanguages,
			programSubtitles,
			programScripts,
			editProgramDescriptionOptional,
			exclusively,
			territories,
			territoriesMode,
		} = this.state;
		const { onSave } = this.props;
		if (onSave) {
			onSave({
				name: programName,
				episode: programEpisode,
				year: programYear,
				type: programType,
				duration: programDuration,
				description: programDescription,
				languages: programLanguages,
				subtitles: programSubtitles,
				scripts: programScripts,
				editProgramDescriptionOptional,
				exclusively,
				territories,
				territoriesMode,
			});
		}
	};

	getTooltipMessages = () => {
		const {
			programName,
			programEpisode,
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
		if (!programEpisode) {
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

	handleTerritories = (territories, territoriesMode) => {
		this.setState({ territories, territoriesMode });
	};

	render() {
		const {
			programName,
			programEpisode,
			programYear,
			programType,
			programDuration,
			programDescription,
			programSubtitles,
			programScripts,
			programLanguages,
			editProgramDescriptionOptional,
			exclusively,
			territoriesMode,
			territories,
		} = this.state;
		const { onCancel } = this.props;
		return (
			<section>
				<div className="property-edited-program-tab__container">
					<div className="row">
						<div className="w-50">
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

							<div className="row">
								<div className="modal-input w-66">
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

								<div className="modal-input w-33">
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
						</div>

						<div className="w-50">
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
					</div>

					<div className="row">
						<div className="row w-50">
							<div className="w-33">
								<div className="modal-input">
									<label>
										<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_EPISODES" />
									</label>
									<input
										type="number"
										value={programEpisode}
										onChange={(e) => {
											this.updateContentValue("programEpisode", Number(e.target.value));
										}}
									/>
								</div>
							</div>
							<div className="w-33">
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
							</div>
							<div className="w-33">
								<div className="modal-input">
									<label>
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
						</div>
					</div>

					<div className="row">
						<div className="modal-input w-33">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LANGUAGE" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programLanguages}
									onChange={(value) => {
										this.updateContentValue("programLanguages", value);
									}}
								/>
							</div>
						</div>

						<div className="modal-input w-33">
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

						<div className="modal-input w-33">
							<label>
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SCRIPT" />
							</label>
							<div className="select">
								<LanguageSelector
									value={programScripts}
									onChange={(value) => {
										this.updateContentValue("programScripts", value);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="modal-input w-50">
							<div className="region-filter-title">
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_EXCLUSIVELY" />
							</div>

							<div className="radio-box">
								<input
									type="radio"
									checked={exclusively}
									onChange={() => {
										this.updateContentValue("exclusively", true);
									}}
									id="exclusively"
									className="ca-radio package-selector"
								/>
								<label htmlFor="exclusively"><Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_EXCLUSIVE" /></label>
								<input
									type="radio"
									checked={!exclusively}
									onChange={() => {
										this.updateContentValue("exclusively", false);
									}}
									id="non-exclusively"
									className="ca-radio package-selector"
								/>
								<label htmlFor="non-exclusively"><Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_NON_EXCLUSIVE" /></label>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="modal-input w-50">
							<div className="region-filter-title">
								<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_TERRITORIES" />
							</div>
						</div>
					</div>
					<CmsTerritorySelector
						className="small-select"
						onChange={this.handleTerritories}
						onSelectRegion={() => { }}
						value={territories}
						territoriesMode={territoriesMode}
						multiple
					/>
				</div>
				<div className="buttons">
					<div className="centered-btn">
						<button
							type="button"
							className="yellow-button"
							onClick={onCancel}
						>
							<Translate i18nKey="Cancel" />
						</button>
						<div data-tip={this.getTooltipMessages()}>
							<button
								type="button"
								className={`yellow-button ${this.getTooltipMessages() ? "disabled" : ""}`}
								disabled={this.getTooltipMessages()}
								onClick={this.save}

							>
								<Translate i18nKey="Save" />
							</button>
						</div>
						<ReactTooltip html />
					</div>
				</div>

			</section>
		);
	}
}

CmsEditedProgramDetail.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	countries: state.property.countries,
});

export default connect(
	mapStateToProps,
	null,
)(CmsEditedProgramDetail);
