import React, { useState } from "react";
import PropTypes from "prop-types";
import CmsTabElement from "./CmsTabElement";

const CmsListingStep = ({
	title, button, enableNextStep, onNext, children, disabled, style, opened,
}) => {
	const [toggle, setToggle] = useState(opened);
	return (
		<>
			<div className="listing-step" style={style}>
				<div className="" onClick={() => setToggle(!toggle)}>
					<i className={`fa fa-angle-${toggle ? "down" : "right"}`} />
					<span>{title}</span>
				</div>
				{toggle && (
					<div className="">
						{children}
					</div>
				)}
			</div>
			{button && !disabled && (
				<button className="button-listing-step" disabled={!enableNextStep} onClick={onNext}>
					{button}
				</button>
			)}
		</>
	);
};

CmsListingStep.propTypes = {
	title: PropTypes.node.isRequired,
	button: PropTypes.node,
	enableNextStep: PropTypes.bool.isRequired,
	onNext: PropTypes.func,
};

CmsListingStep.defaultProps = {
	button: "",
	onNext: null,
};

export default CmsListingStep;
