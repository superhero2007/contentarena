import React from "react";

const CmsCheckBox = ({
	text, value, onChange, disabled, isInvalid = false,
}) => (
	<div className="input-checkbox" onClick={!disabled ? onChange : undefined}>
		<input
			type="checkbox"
			checked={value}
			disabled={disabled}
			onChange={onChange}
		/>
		<span className={`input-checkbox-selector ${isInvalid ? "invalid" : ""}`} />
		<span className="input-checkbox-text">
			{text}
		</span>
	</div>
);

export default CmsCheckBox;
