import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { RepresentationTextArea } from "../../sell/components/SellFormItems";

class RightTableItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			value,
			className,
			textarea,
			length = 1,
		} = this.props;

		return (
			<td className={cn("right-definition", className)} colSpan={length}>
				<div className="right-definition-content">
					{!textarea && value}
					{textarea && <RepresentationTextArea value={value} />}
				</div>
			</td>
		);
	}
}

RightTableItem.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default RightTableItem;
