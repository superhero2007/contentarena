import React from "react";

const CmsRadioBox = ({
	text, value, onChange, disabled,
}) => (
	<div className="input-radio" onClick={!disabled ? onChange : undefined}>
		<input
			type="radio"
			checked={value}
			disabled={disabled}
			onChange={onChange}
		/>
		<span className="input-radio-selector" />
		<span className="input-radio-text">
			{text}
		</span>
	</div>
);

export default CmsRadioBox;
