import React, { useState } from "react";
import PropTypes from "prop-types";

const CmsCollapsedPopup = ({
	toggle: defaultToggle, icon, title, children,
}) => {
	const [toggle, setToggle] = useState(defaultToggle);
	const togglePopup = () => {
		setToggle(!toggle);
	};

	return (
		<div className={`collapsed-popup  ${toggle ? "opened" : ""}`}>
			<div className="collapsed-popup-header" onClick={togglePopup}>
				<div className="collapsed-popup-header-icon">
					{icon}
				</div>
				<div className="collapsed-popup-header-title">
					<span className="title">
						{title}
					</span>
					<span className="icon">
						{toggle ? (
							<i className="fa fa-caret-up" />
						) : (
							<i className="fa fa-caret-down" />
						)}
					</span>
				</div>
			</div>
			<div className="collapsed-popup-body">
				{children}
			</div>
		</div>
	);
};

CmsCollapsedPopup.propTypes = {
	toggle: PropTypes.bool.isRequired,
	icon: PropTypes.node.isRequired,
	title: PropTypes.object.isRequired,
};

export default CmsCollapsedPopup;
