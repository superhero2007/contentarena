import React from "react";
import PropTypes from "prop-types";

const CmsStepSelector = ({
	title, button, enableNextStep, children,
}, context) => (
	<div>
		{title}
		{children}
		<button className="ca-btn primary" disabled={!enableNextStep}>
			{button}
		</button>
	</div>
);

CmsStepSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsStepSelector.propTypes = {
	title: PropTypes.node.isRequired,
	button: PropTypes.node.isRequired,
	enableNextStep: PropTypes.bool.isRequired,
};

export default CmsStepSelector;
