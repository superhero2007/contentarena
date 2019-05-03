import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { GenericModalStyle } from "../../../main/styles/custom";

class ExpiredSessionModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: true,
		};
	}

	onClose = () => {
		this.setState({
			showModal: false,
		});

		document.location.href = "/login";
	};

	render() {
		return (
			<Modal
				isOpen={this.state.showModal}
				className="modal-wrapper wide"
				style={GenericModalStyle}
				onRequestClose={this.onClose}
			>
				<header className="modal-header">
					<h3 className="modal-title">Session Expired</h3>
					<i className="fa fa-times" onClick={this.onClose} />
				</header>
				<section className="modal-body" style={{ fontSize: "24px" }}>
					Your session has expired.
				</section>
				<footer className="modal-footer">
					<button
						className="standard-button"
						onClick={this.onClose}
					>
						Close
					</button>
				</footer>
			</Modal>
		);
	}
}

const showModal = () => {
	ReactDOM.render(<ExpiredSessionModal />, document.querySelector(".ReactModalPortal"));
};


export default showModal;
