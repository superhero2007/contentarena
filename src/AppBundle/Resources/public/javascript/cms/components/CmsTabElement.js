import React, { useState } from "react";
import PropTypes from "prop-types";

const CmsTabElement = ({ label, component }) => {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="details-tab-element">
			<div className="details-tab-element__title" onClick={() => setToggle(!toggle)}>
				<i className={`fa fa-angle-${toggle ? "down" : "right"}`} />
				<span>{label}</span>
			</div>
			{toggle && (
				<div className="details-tab-element__content">
					{component}
				</div>
			)}
		</div>
	);
};

CmsTabElement.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsTabElement;
