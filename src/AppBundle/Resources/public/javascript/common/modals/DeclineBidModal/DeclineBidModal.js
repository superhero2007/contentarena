import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { GenericModalStyle } from "../../../main/styles/custom";
import Loader from "../../components/Loader";

class DeclineBidModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			isFail: false,
			isLoading: false,
		};
	}

	handleMsgChange = event => this.setState({ message: event.target.value });

	handleDeclineBid = () => {
		this.setState({ isLoading: true });

		const { selectedBid, onCloseModal, postAction } = this.props;
		const { message } = this.state;
		let payload = selectedBid;
		payload = { ...payload, message };

		ContentArena.ContentApi.rejectBid(payload)
			.then(
				() => {
					onCloseModal();
					postAction();
				},
				() => this.setState({ isFail: false, isLoading: false }),
			);
	};

	render() {
		const { isOpen, onCloseModal } = this.props;
		const { isLoading, isFail } = this.state;

		return (
			<Modal isOpen={isOpen} className="modal-wrapper" style={GenericModalStyle} onRequestClose={onCloseModal}>
				<header className="modal-header">
					<h3 className="modal-title">{this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_REJECT")}</h3>
				</header>
				<section className="modal-body">
					<Loader loading={isLoading}>
						{!isFail ? (
							<textarea
								placeholder={this.context.t("COMMERCIAL_ACTIVITY_BID_REJECT_PLACEHOLDER")}
								onChange={this.handleMsgChange}
								name="messageBox"
								value={this.state.message}
							/>
						) : (
							<div className="body-msg">
								{this.context.t("COMMERCIAL_ACTIVITY_DECLINE_BID_FAILED")}
							</div>
						)}
					</Loader>
				</section>
				<footer className="modal-footer">
					{isFail || isLoading
						? (
							<button className="cancel-btn" onClick={onCloseModal}>
								{this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
							</button>
						)
						: (
							<React.Fragment>
								<button className="cancel-btn" onClick={onCloseModal}>
									{this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
								</button>
								<button className="standard-button" onClick={this.handleDeclineBid}>
									{this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REJECT_CONFIRM")}
								</button>
							</React.Fragment>
						)
					}
				</footer>

			</Modal>
		);
	}
}

DeclineBidModal.propTypes = {
	selectedBid: PropTypes.object.isRequired,
	postAction: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

DeclineBidModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default DeclineBidModal;
