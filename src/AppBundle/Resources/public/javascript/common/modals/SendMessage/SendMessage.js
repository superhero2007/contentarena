import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { GenericModalStyle } from "../../../main/styles/custom";

class SendMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			isLoading: false,
			isFail: false,
			isSuccess: false,
		};
	}

	handleMsgChange = event => this.setState({ message: event.target.value });

	handleSendBtnClick = () => {
		this.setState({ isLoading: true });
		const { message } = this.state;
		const {
			listing,
			recipient,
			role = "BUYER",
		} = this.props;

		const payload = {
			listing,
			recipient,
			content: message,
			role,
		};

		this.sendMessage(payload);
	};

	sendMessage = (payload) => {
		ContentArena.ContentApi.sendMessage(payload)
			.then(
				() => this.setState({ isSuccess: true }),
				() => this.setState({ isFail: true }),
			)
			.always(
				() => this.setState({ isLoading: false }),
			);
	};

	render() {
		const {
			isOpen,
			title,
			onCloseModal,
		} = this.props;

		const { isLoading, isFail, isSuccess } = this.state;

		return (
			<Modal isOpen={isOpen} className="modal-wrapper" style={GenericModalStyle} onRequestClose={onCloseModal}>
				<header className="modal-header">
					<h3 className="modal-title">{title}</h3>
					<i className="fa fa-times" onClick={onCloseModal} />
				</header>
				<section className="modal-body">
					{!isLoading && !isFail && !isSuccess && (
						<textarea
							placeholder={this.context.t("ENTER_MESSAGE")}
							onChange={this.handleMsgChange}
							name="messageBox"
							value={this.state.message}
						/>
					)
					}
					{isLoading && <i className="fa fa-cog fa-spin" />}
					{(isFail || isSuccess) && (
						<div className="body-msg">
							{isFail ? this.context.t("MESSAGE_POPUP_FAILED") : this.context.t("MESSAGE_POPUP_SENT")}
						</div>
					)}
				</section>
				<footer className="modal-footer">
					{isFail || isSuccess
						? (
							<button className="standard-button" onClick={onCloseModal}>
								{this.context.t("MESSAGE_POPUP_BUTTON_CLOSE")}
							</button>
						)
						: (
							<React.Fragment>
								<button className="cancel-btn" onClick={onCloseModal}>
									{this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
								</button>
								<button
									className="standard-button"
									onClick={this.handleSendBtnClick}
								>
									{this.context.t("MESSAGES_SEND_BUTTON")}
								</button>
							</React.Fragment>
						)
					}
				</footer>
			</Modal>
		);
	}
}

SendMessage.propTypes = {
	title: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	listing: PropTypes.number.isRequired,
	recipient: PropTypes.number.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

SendMessage.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default SendMessage;
