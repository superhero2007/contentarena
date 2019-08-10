import React from "react";
import PropTypes from "prop-types";
import CmsTabElement from "./CmsTabElement";

const CmsStepSelector = ({
	title, button, enableNextStep, onNext, children,
}, context) => (
	<CmsTabElement
		label={title}
		opened
		noBorder
	>
		{children}
		<button className="ca-btn primary" disabled={!enableNextStep} onClick={onNext}>
			{button}
		</button>
	</CmsTabElement>
);

CmsStepSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsStepSelector.propTypes = {
	title: PropTypes.node.isRequired,
	button: PropTypes.node.isRequired,
	enableNextStep: PropTypes.bool.isRequired,
	onNext: PropTypes.func.isRequired,
};

export default CmsStepSelector;
