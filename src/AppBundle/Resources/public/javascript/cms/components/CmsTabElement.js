import React, { useState } from "react";
import PropTypes from "prop-types";

const CmsTabElement = ({
	label, children, noBorder, opened,
}) => {
	const [toggle, setToggle] = useState(opened);
	return (
		<div className="details-tab-element">
			<div className={`details-tab-element__title ${noBorder && "no-border"}`} onClick={() => setToggle(!toggle)}>
				<i className={`fa fa-angle-${toggle ? "down" : "right"}`} />
				<span>{label}</span>
			</div>
			{toggle && (
				<div className="details-tab-element__content">
					{children}
				</div>
			)}
		</div>
	);
};

CmsTabElement.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsTabElement;
