import React, { Component } from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import Modal from "../Modal";
import api from "../../../api";
import Loader from "../Loader";

class ConfirmationTooltip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: props.isOpen,
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			isOpen: props.isOpen,
		});
	}

	render() {
		const {
			isOpen,
		} = this.state;

		const {
			onConfirm,
			message = this.context.t("GENERAL_CONFIRMATION_TOOLTIP_MESSAGE"),
		} = this.props;

		if (!isOpen) return null;

		return (
			<div className="confirmation-tooltip">
				<div className="confirmation-text">
					{message}
				</div>
				<button
					className="button button-confirm"
					onClick={(e) => {
						onConfirm(true);
						e.stopPropagation();
					}}
				>
					{this.context.t("GENERAL_CONFIRMATION_TOOLTIP_CONFIRM")}
				</button>
				<button
					className="button"
					onClick={(e) => {
						onConfirm(false);
						e.stopPropagation();
					}}
				>
					{this.context.t("GENERAL_CONFIRMATION_TOOLTIP_CANCEL")}
				</button>
			</div>
		);
	}
}

ConfirmationTooltip.contextTypes = {
	t: PropTypes.func.isRequired,
};

ConfirmationTooltip.propTypes = {};
ConfirmationTooltip.defaultProps = {};

export default ConfirmationTooltip;
