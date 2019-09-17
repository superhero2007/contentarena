import React, { Component } from "react";

class TableTooltip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: props.isOpen,
		};
	}

	render() {
		const {
			isOpen,
		} = this.state;

		const {
			children,
			icon,
			text,
			zIndex,
		} = this.props;

		return (
			<div className="tools">
				<div className="tools-wrapper listing" style={{ zIndex: (isOpen) ? zIndex : 1 }}>
					{isOpen && (
						<div className="tools-menu">
							{children}
						</div>
					)}

					{icon && (
						<div className="tools-icon" onClick={() => this.setState({ isOpen: !isOpen })}>
							{icon}
						</div>
					)}

					{text && (
						<div className="tools-text" onClick={() => this.setState({ isOpen: !isOpen })}>
							{text}
						</div>
					)}
				</div>
			</div>
		);
	}
}

TableTooltip.defaultProps = {
	zIndex: 9999,
};

export default TableTooltip;
