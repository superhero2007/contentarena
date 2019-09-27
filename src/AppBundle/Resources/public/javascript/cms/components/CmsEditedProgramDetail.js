import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Translate from "@components/Translator/Translate";

import CmsProgramTypeFilter from "@components/Filters/CmsProgramTypeFilter";
import TerritorySelector from "@components/Territories/TerritorySelector";
import { LanguageSelector } from "../../main/components/LanguageSelector";
import CmsTerritorySelector from "./CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";
import { getAvailableTerritories, getFilteredTerritories } from "../reducers/property";

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
			name: props.program.name || "",
			episodes: props.program.episodes || "",
			releaseYear: props.program.releaseYear || "",
			type: props.program.type || "",
			episodeDuration: props.program.episodeDuration || "",
			description: props.program.description || "",
			languages: props.program.languages || [],
			subtitles: props.program.subtitles || [],
			scripts: props.program.scripts || [],
			similarEpisodesLength: props.program.similarEpisodesLength || true,
			exclusive: props.program.exclusive || false,
			territories: territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE ? props.countries : (props.program.territories || []),
			territoriesMode,
		};
	}

	updateContentValue = (key, value) => {
		this.setState({ [key]: value });
	};

	save = () => {
		const {
			name,
			episodes,
			releaseYear,
			type,
			episodeDuration,
			description,
			languages,
			subtitles,
			scripts,
			similarEpisodesLength,
			exclusive,
			territories,
			territoriesMode,
		} = this.state;
		const { onSave } = this.props;
		if (onSave) {
			onSave({
				name,
				episodes,
				releaseYear,
				type,
				episodeDuration,
				description,
				languages,
				subtitles,
				scripts,
				similarEpisodesLength,
				exclusive,
				territories,
				territoriesMode,
			});
		}
	};

	getTooltipMessages = () => {
		const {
			name,
			episodes,
			type,
			episodeDuration,
			description,
		} = this.state;
		let message = "";
		if (!name) {
			message += "<br/>-  Enter program name.";
		}
		if (!description) {
			message += "<br/>-  Enter program description.";
		}
		if (!type) {
			message += "<br/>-  Enter program type.";
		}
		if (!episodes) {
			message += "<br/>-  Enter program episodes.";
		}
		if (!episodeDuration) {
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
			name,
			episodes,
			releaseYear,
			type,
			episodeDuration,
			description,
			subtitles,
			scripts,
			languages,
			similarEpisodesLength,
			exclusive,
			territoriesMode,
			territories,
		} = this.state;

		const { onCancel, availableCountries } = this.props;
		return (
			<>
				<div className="d-flex">
					<div className="form-group">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_NAME" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								value={name}
								onChange={(e) => {
									this.updateContentValue("name", e.target.value);
								}}
							/>
						</div>
					</div>

					<CmsProgramTypeFilter
						value={type}
						onChange={type => this.updateContentValue("type", type.id)}
					/>

					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_YEAR" />
						</label>
						<select
							value={releaseYear}
							onChange={(e) => {
								this.updateContentValue("releaseYear", e.target.value);
							}}
						>
							<option value="Year">Year</option>
							{this.state.years.map((year, i) => (<option key={i} value={year}>{year}</option>))}
						</select>
					</div>
				</div>

				<div className="w-50">
					<div className="form-group">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION" />
						</label>
						<textarea
							value={description}
							onChange={(e) => {
								this.updateContentValue("description", e.target.value);
							}}
							placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION_PLACEHOLDER")}
						/>
					</div>
				</div>

				<div className="row" style={{ marginBottom: 30 }}>
					<div className="row w-50">
						<div className="w-33">
							<div className="modal-input">
								<label>
									<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_EPISODES" />
								</label>
								<input
									type="number"
									value={episodes}
									onChange={(e) => {
										this.updateContentValue("episodes", Number(e.target.value));
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
									value={episodeDuration}
									onChange={(e) => {
										this.updateContentValue("episodeDuration", Number(e.target.value));
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
										checked={similarEpisodesLength}
										onChange={() => {
											this.updateContentValue("similarEpisodesLength", true);
										}}
										id="edit-program-optional"
										className="ca-radio package-selector"
									/>
									<label htmlFor="edit-program-optional"><Translate i18nKey="Yes" /></label>
									<input
										type="radio"
										checked={!similarEpisodesLength}
										onChange={() => {
											this.updateContentValue("similarEpisodesLength", false);
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
								value={languages}
								onChange={(value) => {
									this.updateContentValue("languages", value);
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
								value={subtitles}
								onChange={(value) => {
									this.updateContentValue("subtitles", value);
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
								value={scripts}
								onChange={(value) => {
									this.updateContentValue("scripts", value);
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
								checked={exclusive}
								onChange={() => {
									this.updateContentValue("exclusive", true);
								}}
								id="exclusive"
								className="ca-radio package-selector"
							/>
							<label htmlFor="exclusive"><Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_EXCLUSIVE" /></label>
							<input
								type="radio"
								checked={!exclusive}
								onChange={() => {
									this.updateContentValue("exclusive", false);
								}}
								id="non-exclusive"
								className="ca-radio package-selector"
							/>
							<label htmlFor="non-exclusive"><Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_NON_EXCLUSIVE" /></label>
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

				<TerritorySelector
					availableCountries={availableCountries.territories}
					selectedCountries={territories}
					onSelect={this.handleTerritories}
				/>

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

			</>
		);
	}
}

CmsEditedProgramDetail.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	countries: state.property.countries,
	availableCountries: getAvailableTerritories(state),
});

export default connect(
	mapStateToProps,
	null,
)(CmsEditedProgramDetail);
