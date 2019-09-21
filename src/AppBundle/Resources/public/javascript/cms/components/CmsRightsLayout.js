import React, { useState } from "react";
import Translate from "@components/Translator/Translate";

import CmsRightsContent from "./CmsRightsContent";

const CmsRightsLayout = ({ type, onSave, defaultValue = "" }) => {
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
		<div className="rights-layout">
			<div className="rights-layout-container">
				<CmsRightsContent
					type={type}
					onUpdate={handleUpdate}
				/>
			</div>
			<div className="rights-layout-note">
				<label>
					<Translate i18nKey="PROPERTY_DETAILS_RIGHTS_DESCRIPTION_LABEL" />
				</label>
				<textarea
					placeholder={<Translate i18nKey="PROPERTY_DETAILS_RIGHTS_DESCRIPTION_PLACEHOLDER" />}
				/>
			</div>
			<div className="rights-layout-action">
				<button
					className="secondary-outline-button rights-layout-action-button"
					onClick={handleReset}
				>
					<div className="button-content">
						<Translate i18nKey="PROPERTY_DETAILS_RIGHTS_RESET_BUTTON" />
					</div>
				</button>
				<button
					className="secondary-button rights-layout-action-button"
					onClick={handleSave}
				>
					<div className="button-content">
						<Translate i18nKey="PROPERTY_DETAILS_RIGHTS_SAVE_BUTTON" />
					</div>
				</button>
			</div>
		</div>
	);
};

export default CmsRightsLayout;
