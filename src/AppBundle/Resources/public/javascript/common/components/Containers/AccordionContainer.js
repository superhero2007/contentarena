import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

class AccordionContainer extends React.Component {
	constructor(props) {
		super(props);

		const { opened } = props;

		this.state = {
			toggle: opened || false,
		};
	}

	close = () => this.setState({ toggle: false });

	open = () => this.setState({ toggle: true });

	render() {
		const {
			title, button, enableNextStep, onNext, children, disabled, style, value,
		} = this.props;

		const { toggle } = this.state;

		return (
			<div className="accordion-container" style={style}>
				<div
					className={cn("accordion-container-header", { "accordion-container-disabled": disabled })}
					onClick={() => !disabled && this.setState({ toggle: !toggle })}
				>
					<span className="accordion-container-title">
						{title}
					</span>
					<span className="accordion-container-value">
						{value}
					</span>
					<i className={cn("accordion-container-icon fa", { "fa-minus": toggle, "fa-plus": !toggle })} />
				</div>

				{toggle && !disabled && (
					<div className="accordion-container-content">
						{children}
					</div>
				)}

				{toggle && !disabled && button && (
					<div className="accordion-container-buttons">
						<button className="button secondary-button" disabled={!enableNextStep} onClick={onNext}>
							{button}
						</button>
					</div>
				)}
			</div>
		);
	}
}

AccordionContainer.propTypes = {
	title: PropTypes.node.isRequired,
	button: PropTypes.node,
	enableNextStep: PropTypes.bool.isRequired,
	onNext: PropTypes.func,
};

AccordionContainer.defaultProps = {
	button: "",
	onNext: null,
};

export default AccordionContainer;
