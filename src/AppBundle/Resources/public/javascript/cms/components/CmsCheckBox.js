import React from "react";

const CmsCheckBox = ({
	text, value, onChange, isInvalid = false,
}) => (
	<div className="input-checkbox" onClick={onChange}>
		<input
			type="checkbox"
			checked={value}
			onChange={onChange}
		/>
		<span className={`input-checkbox-selector ${isInvalid ? "invalid" : ""}`} />
		<span className="input-checkbox-text">
			{text}
		</span>
	</div>
);

export default CmsCheckBox;
