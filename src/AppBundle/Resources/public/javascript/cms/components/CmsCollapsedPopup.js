import React, { useState } from "react";
import PropTypes from "prop-types";

const CmsCollapsedPopup = ({
	defaultToggle, icon, title, children,
}, context) => {
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

CmsCollapsedPopup.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsCollapsedPopup.propTypes = {
	defaultToggle: PropTypes.bool,
	icon: PropTypes.node.isRequired,
	title: PropTypes.object.isRequired,
};

CmsCollapsedPopup.defaultProps = {
	defaultToggle: false,
};

export default CmsCollapsedPopup;
