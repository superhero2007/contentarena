import React from "react";
import { PropTypes } from "prop-types";

export const TranslatedPlaceholderInput = (props, context) => (
	<input placeholder={context.translation} {...props} />
);

TranslatedPlaceholderInput.contextTypes = {
	translation: PropTypes.string,
};

export const TitledDiv = (props, context) => (
	<div title={context.translation} {...props}>
		{props.children}
	</div>
);

TitledDiv.contextTypes = {
	translation: PropTypes.string,
};
