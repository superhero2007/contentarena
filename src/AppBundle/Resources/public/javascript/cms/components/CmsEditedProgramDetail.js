import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import Translate from "@components/Translator/Translate";
import CmsProgramTypeFilter from "@components/Filters/CmsProgramTypeFilter";
import TerritorySelector from "@components/Territories/TerritorySelector";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";
import CmsProgramYearsFilter from "@components/Filters/CmsProgramYearsFilter";
import CmsLanguageFilter from "@components/Filters/CmsLanguageFilter";
import { getAvailableTerritories } from "../reducers/property";
import CmsNumberInput from "./CmsNumberInput";

class CmsEditedProgramDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.program.id || null,
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
			territories: props.program.territories || [],
			territoriesMode: props.program.territoriesMode || BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
		};

		this.territorySelector = React.createRef();
	}

	updateContentValue = (key, value) => {
		this.setState({ [key]: value });
	};

	save = () => {
		const {
			id,
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
				id,
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
			territories,
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
		if (!territories.length) {
			message += "<br/>-  Select territories.";
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
				<div className="d-flex justify-content-between">
					<div className="form-group w-50">
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
								placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_NAME_PLACEHOLDER")}
							/>
						</div>
					</div>

					<CmsProgramTypeFilter
						value={type}
						onChange={type => this.updateContentValue("type", type.id)}
					/>

					<CmsProgramYearsFilter
						value={releaseYear}
						onChange={year => this.updateContentValue("releaseYear", year.value)}
					/>

				</div>

				<div className="form-group">
					<label>
						<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION" />
					</label>
					<textarea
						className="input-textarea"
						style={{ height: 200 }}
						value={description}
						onChange={(e) => {
							this.updateContentValue("description", e.target.value);
						}}
						placeholder={this.context.t("CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DESCRIPTION_PLACEHOLDER")}
					/>
				</div>

				<div className="d-flex justify-content-between form-group">
					<div className="w-25">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_EPISODES" />
						</label>
						<CmsNumberInput
							value={episodes}
							onChange={value => this.updateContentValue("episodes", value)}
						/>
					</div>
					<div className="w-25">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_DURATION" />
						</label>

						<CmsNumberInput
							value={episodeDuration}
							onChange={value => this.updateContentValue("episodeDuration", value)}
						/>
					</div>
					<div className="w-50">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_DESC" />
						</label>

						<div className="input-radio-group">
							<label className="input-radio">
								<input
									type="radio"
									checked={similarEpisodesLength}
									onChange={() => {
										this.updateContentValue("similarEpisodesLength", true);
									}}
									id="edit-program-optional"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="Yes" />
								</span>
							</label>

							<label className="input-radio">
								<input
									type="radio"
									checked={!similarEpisodesLength}
									onChange={() => {
										this.updateContentValue("similarEpisodesLength", false);
									}}
									id="edit-program-optional"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="No" />
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-between form-group">
					<CmsLanguageFilter
						value={languages}
						onChange={value => this.updateContentValue("languages", value)}
						label={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_LANGUAGE" />}
					/>

					<CmsLanguageFilter
						value={subtitles}
						onChange={value => this.updateContentValue("subtitles", value)}
						label={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SUBTITLES" />}
					/>

					<CmsLanguageFilter
						value={scripts}
						onChange={value => this.updateContentValue("scripts", value)}
						label={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_SCRIPT" />}
					/>
				</div>

				<div className="d-flex form-group">
					<div className="w-50">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_EXCLUSIVELY" />
						</label>

						<div className="input-radio-group">
							<label className="input-radio">
								<input
									type="radio"
									checked={exclusive}
									onChange={() => this.updateContentValue("exclusive", true)}
									id="exclusive"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_EXCLUSIVE" />
								</span>
							</label>

							<label className="input-radio">
								<input
									type="radio"
									checked={!exclusive}
									onChange={() => this.updateContentValue("exclusive", false)}
									id="non-exclusive"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="MARKETPLACE_RIGHTS_LABEL_NON_EXCLUSIVE" />
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="modal-input w-50">
						<label>
							<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_TERRITORIES" />
						</label>
					</div>
				</div>

				<TerritorySelector
					availableCountries={availableCountries.territories}
					selectedCountries={territories}
					onSelect={this.handleTerritories}
					ref={this.territorySelector}
				/>

				<div className="buttons">
					<button
						type="button"
						className="button secondary-outline-button"
						onClick={onCancel}
					>
						<Translate i18nKey="Cancel" />
					</button>
					<div data-tip={this.getTooltipMessages()}>
						<button
							type="button"
							className={`button secondary-button ${this.getTooltipMessages() ? "disabled" : ""}`}
							disabled={this.getTooltipMessages()}
							onClick={this.save}

						>
							<Translate i18nKey="SAVE_PROGRAM" />
						</button>
					</div>
					<ReactTooltip html />
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
