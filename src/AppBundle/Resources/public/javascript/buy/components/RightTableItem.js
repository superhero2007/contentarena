import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
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
			translate,
			length = 1,
		} = this.props;

		return (
			<td className={cn("right-definition", className)} colSpan={length}>
				<div className="right-definition-content">
					{!textarea && !translate && value}
					{!textarea && translate && <Translate i18nKey={value} /> }
					{textarea && <RepresentationTextArea value={value} />}
				</div>
			</td>
		);
	}
}

export default RightTableItem;
