import React from "react";
import Modal from "react-modal";

const CaModal = ({
	isOpen, onRequestClose, children, title, titleIcon,
}) => (
	<Modal
		isOpen={isOpen}
		onRequestClose={onRequestClose}
		bodyOpenClassName="ca-modal-open"
		className="ca-modal"
		overlayClassName="ca-modal-overlay"
	>
		<div className="ca-modal-title">
			{titleIcon}
			{title}
			<i className="fa fa-times close-icon" onClick={onRequestClose} />
		</div>
		<div className="ca-modal-body">
			{children}
		</div>
	</Modal>
);

export default CaModal;
