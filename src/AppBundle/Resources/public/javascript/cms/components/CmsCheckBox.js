import React from "react";

const CmsCheckBox = ({ text, value, onChange }) => (
	<div className="input-checkbox">
		<input
			type="checkbox"
			checked={value}
			onChange={onChange}
		/>
		<span className="input-checkbox-selector" />
		<span className="input-checkbox-text">
			{text}
		</span>
	</div>
);

export default CmsCheckBox;
