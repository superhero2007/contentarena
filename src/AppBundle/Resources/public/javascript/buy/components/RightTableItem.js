import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { RepresenationTextArea } from "../../sell/components/SellFormItems";

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
					{textarea && <RepresenationTextArea value={value} />}
				</div>
			</td>
		);
	}
}

RightTableItem.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default RightTableItem;
