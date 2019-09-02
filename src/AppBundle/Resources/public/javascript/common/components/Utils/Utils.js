import React from "react";
import { PropTypes } from "prop-types";

export const GhostModeDisabledMessage = () => (
	<>
		This feature is disabled in ghost mode
	</>
);

export const GhostModeDisabledIcon = () => (
	<i className="fa fa-circle-o-notch" />
);

export const SelectAllButtons = ({ onSelectAll, onUnselectAll }) => (
	<div className="select-item">
		<button
			type="button"
			onClick={onSelectAll}
			className="ca-btn link-button"
		>
			Select All
		</button>
		<button
			type="button"
			onClick={onUnselectAll}
			className="ca-btn link-button"
		>
			UnSelect All
		</button>
	</div>
);

SelectAllButtons.propTypes = {
	onSelectAll: PropTypes.func.isRequired,
	onUnselectAll: PropTypes.func.isRequired,
};
