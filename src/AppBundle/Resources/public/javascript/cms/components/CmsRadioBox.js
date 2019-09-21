import React from "react";

const CmsRadioBox = ({ text, value, onChange }) => (
	<div className="input-radio">
		<input
			type="radio"
			checked={value}
			onChange={onChange}
		/>
		<span className="input-radio-selector" />
		<span className="input-radio-text">
			{text}
		</span>
	</div>
);

export default CmsRadioBox;
