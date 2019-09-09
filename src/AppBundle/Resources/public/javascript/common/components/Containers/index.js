import React from "react";
import cn from "classnames";
import { isMobileOnly } from "react-device-detect";

export const DefaultBox = props => (
	<div className={cn("default-box", { mobile: isMobileOnly })}>
		{props.children}
	</div>
);

export const SkinContainer = ({ skin, children }) => (
	<div className={cn({ skin }, skin, "container", { mobile: isMobileOnly })}>
		{children}
	</div>
);


export const VerticalButtonBox = props => (
	<div className={cn("vertical-button-box", { mobile: isMobileOnly })}>
		{props.children}
	</div>
);

export const HorizontalButtonBox = props => (
	<div className={cn("horizontal-button-box", { mobile: isMobileOnly })} style={props.style}>
		{props.children}
	</div>
);
