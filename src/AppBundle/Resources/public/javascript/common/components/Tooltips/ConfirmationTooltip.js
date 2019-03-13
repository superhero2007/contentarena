import React, { Component } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";

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
			message = <Translate i18nKey="GENERAL_CONFIRMATION_TOOLTIP_MESSAGE" />,
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
					<Translate i18nKey="GENERAL_CONFIRMATION_TOOLTIP_CONFIRM" />
				</button>
				<button
					className="button"
					onClick={(e) => {
						onConfirm(false);
						e.stopPropagation();
					}}
				>
					<Translate i18nKey="GENERAL_CONFIRMATION_TOOLTIP_CANCEL" />
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
