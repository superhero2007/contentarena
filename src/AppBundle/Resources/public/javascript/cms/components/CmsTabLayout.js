import React, { useState } from "react";
import Translate from "@components/Translator/Translate";

import CmsTabContent from "./CmsTabContent";

const CmsTabLayout = ({ type, onSave, defaultValue = "" }) => {
	const [value, setValue] = useState(defaultValue);

	const handleReset = () => {
		setValue(defaultValue);
	};

	const handleSave = () => {
		onSave(type, value);
	};

	const handleUpdate = (content) => {
		setValue(content);
	};

	return (
		<div className="tab-layout">
			<div className="tab-layout-container">
				<CmsTabContent
					type={type}
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
