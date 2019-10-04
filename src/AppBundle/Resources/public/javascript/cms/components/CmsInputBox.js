import React from "react";
import cn from "classnames";

const CmsInputBox = ({
	 className = "", prepend = "", value, append = "", onChange, disabled = false, invalid = false,
}) => (
	<div className={`input-group ${className}`}>
		{prepend && (
			<span className="input-group-prepend">
				{prepend}
			</span>
		)}
		<input
			className={cn("input-group-text", {
				invalid,
			})}
			type="text"
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
		{append && (
			<span className="input-group-append">
				{append}
			</span>
		)}
	</div>
);

export default CmsInputBox;
