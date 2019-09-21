import React, { useState } from "react";
import Translate from "@components/Translator/Translate";

import CmsProductionContent from "./CmsProductionContent";

const CmsProductionLayout = ({ type, onSave, defaultValue = "" }) => {
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
		<div className="production-layout">
			<div className="production-layout-container">
				<CmsProductionContent
					type={type}
					onUpdate={handleUpdate}
				/>
			</div>
			<div className="production-layout-note">
				<label>
					<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_DESCRIPTION_LABEL" />
				</label>
				<textarea
					placeholder={<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_DESCRIPTION_PLACEHOLDER" />}
				/>
			</div>
			<div className="production-layout-action">
				<button
					className="secondary-outline-button production-layout-action-button"
					onClick={handleReset}
				>
					<div className="button-content">
						<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_RESET_BUTTON" />
					</div>
				</button>
				<button
					className="secondary-button production-layout-action-button"
					onClick={handleSave}
				>
					<div className="button-content">
						<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_SAVE_BUTTON" />
					</div>
				</button>
			</div>
		</div>
	);
};

export default CmsProductionLayout;
