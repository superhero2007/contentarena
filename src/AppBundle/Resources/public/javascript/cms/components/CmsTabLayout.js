import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";

import CmsTabContent from "./CmsTabContent";

const CmsTabLayout = ({ type, onSave, rights = "" }) => {
	const [value, setValue] = useState(cloneDeep(rights));
	const [isDisabled, setDisable] = useState(false);

	const handleReset = () => {
		setValue(cloneDeep(rights));
	};

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

	return (
		<div className="tab-layout">
			<div className="tab-layout-container">
				<CmsTabContent
					type={type}
					rights={value}
					onUpdate={handleUpdate}
				/>
			</div>
			<div className="tab-layout-note">
				<label>
					<Translate i18nKey="TAB_LAYOUT_DESCRIPTION_LABEL" />
				</label>
				<textarea
					className="input-textarea"
					placeholder={<Translate i18nKey="TAB_LAYOUT_DESCRIPTION_PLACEHOLDER" />}
					onChange={handleTextarea}
					value={value[0].details[`${type}_TEXTAREA`] || ""}
				/>
			</div>
			<div className="tab-layout-action">
				<button
					className="secondary-outline-button tab-layout-action-button"
					onClick={handleReset}
				>
					<div className="button-content">
						<Translate i18nKey="TAB_LAYOUT_CLEAR_BUTTON" />
					</div>
				</button>
				<button
					className="secondary-button tab-layout-action-button"
					onClick={handleSave}
					disabled={isDisabled}
				>
					<div className="button-content">
						<Translate i18nKey="TAB_LAYOUT_SAVE_BUTTON" />
					</div>
				</button>
			</div>
		</div>
	);
};

export default CmsTabLayout;
