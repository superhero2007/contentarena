import React, { useState } from "react";
import { PropTypes } from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import { PRODUCTION_TAB, RIGHTS_TAB } from "@constants";
import CmsTabContent from "./CmsTabContent";

const CmsTabLayout = ({
	type, onSave, rights = "", rightDetails,
}, context) => {
	const [value, setValue] = useState(cloneDeep(rights));

	const handleSave = () => {
		onSave(value);
	};

	const handleUpdate = (content) => {
		setValue(cloneDeep(content));
	};

	const handleTextarea = (e) => {
		for (const right of value) {
			right.details[`${type}_TEXTAREA`] = e.target.value;
		}
		setValue(cloneDeep(value));
	};

	const getApplyDisable = () => {
		switch (type) {
		case PRODUCTION_TAB.ASPECT_RATIO:
			return value.filter(right => right.details.ASPECT_RATIO === "ASPECT_RATIO_CUSTOM" && !right.details.ASPECT_RATIO_TEXT).length;
		case PRODUCTION_TAB.GRAPHICS:
			return value.filter(right => right.details.GRAPHICS === "GRAPHICS_YES" && (!right.details.GRAPHICS_LANGUAGES || !right.details.GRAPHICS_LANGUAGES.length)).length;
		case PRODUCTION_TAB.COMMENTARY:
			return value.filter(right => right.details.COMMENTARY === "COMMENTARY_YES" && (!right.details.COMMENTARY_LANGUAGES || !right.details.COMMENTARY_LANGUAGES.length)).length;
		case PRODUCTION_TAB.CAMERA:
			return value.filter(right => !right.details.CAMERAS).length;
		case RIGHTS_TAB.BROADCASTING:
			return value.filter(right => right.details.BROADCASTING === "BROADCASTING_YES" && !right.details.BROADCASTING_TEXTAREA).length;
		case RIGHTS_TAB.LICENSED_LANGUAGES:
			return value.filter(right => !right.details.LICENSED_LANGUAGE_LIST || !right.details.LICENSED_LANGUAGE_LIST.length).length;
		case RIGHTS_TAB.RESERVED_RIGHTS:
			return value.filter(right => right.details.RESERVED_RIGHTS === "RESERVED_RIGHTS_YES" && !right.details.RESERVED_RIGHTS_TEXTAREA).length;
		default:
		}
		return false;
	};

	const isApplyDisabled = getApplyDisable();
	const textareaRequired = isApplyDisabled && (type === RIGHTS_TAB.BROADCASTING || type === RIGHTS_TAB.RESERVED_RIGHTS);
	const [showTextArea, setShowTextArea] = useState(textareaRequired || !!rights[0].details[`${type}_TEXTAREA`]);

	return (
		<div className="tab-layout">
			<div className="tab-layout-container">
				<CmsTabContent
					type={type}
					rights={value}
					onUpdate={handleUpdate}
				/>
			</div>
			{showTextArea && (
				<div className="tab-layout-note">
					<label className="tab-layout-note-label">
						<Translate i18nKey="TAB_LAYOUT_DESCRIPTION_LABEL" />
					</label>
					<textarea
						placeholder={context.t("TAB_LAYOUT_DESCRIPTION_PLACEHOLDER")}
						onChange={handleTextarea}
						value={value[0].details[`${type}_TEXTAREA`] || ""}
						className={`input-textarea ${textareaRequired && "required"}`}
					/>
				</div>
			)}
			<div className="tab-layout-action">
				{!showTextArea && (
					<button
						className="info-outline-button tab-layout-action-textarea"
						onClick={() => setShowTextArea(true)}
					>
						<div className="button-content">
							+&nbsp;<Translate i18nKey="TAB_LAYOUT_ADD_TEXTAREA" />
						</div>
					</button>
				)}
				<div className="tab-layout-action-space" />
				<button
					className="secondary-button tab-layout-action-button"
					onClick={handleSave}
					disabled={isApplyDisabled}
				>
					<div className="button-content">
						<Translate i18nKey="TAB_LAYOUT_SAVE_BUTTON" />
					</div>
				</button>
			</div>
		</div>
	);
};

CmsTabLayout.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsTabLayout;
