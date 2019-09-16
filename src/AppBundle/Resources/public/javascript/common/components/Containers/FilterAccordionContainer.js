import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

class FilterAccordionContainer extends React.Component {
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
			title, children, disabled,
		} = this.props;

		const { toggle } = this.state;

		return (
			<div className={cn("filter-accordion", { "filter-accordion-disabled": disabled })}>
				<div
					className="filter-accordion-header"
					onClick={() => !disabled && this.setState({ toggle: !toggle })}
				>
					<i className={`fa fa-angle-${toggle ? "down" : "right"}`} />
					<span className="filter-accordion-title">
						{title}
					</span>
				</div>

				{toggle && !disabled && (
					<div className="filter-accordion-content">
						{children}
					</div>
				)}
			</div>
		);
	}
}

FilterAccordionContainer.propTypes = {
	title: PropTypes.node.isRequired,
};

export default FilterAccordionContainer;
