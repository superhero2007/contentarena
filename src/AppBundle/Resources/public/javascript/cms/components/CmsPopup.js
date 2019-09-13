import React from "react";

const CmsPopup = ({
	title, children, onClose, close, apply, onApply = null,
}) => (
	<div className="popup-modal">
		<div className="popup-modal-container">
			{title && (
				<div className="popup-modal-header">
					<div className="popup-title">{title}</div>
					<i className="icon-remove popup-icon" onClick={onClose} />
				</div>
			)}
			{children && (
				<div className="popup-modal-content">
					{children}
				</div>
			)}
			<div className="popup-modal-footer">
				<button
					className="secondary-outline-button"
					onClick={onClose}
				>
					<div className="button-content">
						{close}
					</div>
				</button>
				<button
					className="primary-button"
					onClick={onApply}
				>
					<div className="button-content">
						{apply}
					</div>
				</button>
			</div>
		</div>
	</div>
);

export default CmsPopup;
