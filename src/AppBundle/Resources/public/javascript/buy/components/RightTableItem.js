import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import Translate from "@components/Translator/Translate";

class RightTableItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.textArea = React.createRef();
	}

	componentDidMount() {
		this.setTextAreaHeight();
	}

	componentDidUpdate() {
		this.setTextAreaHeight();
	}

	setTextAreaHeight = () => {
		if (this.textArea.current) {
			this.textArea.current.style.height = `${this.textArea.current.scrollHeight}px`;
		}
	};

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
					{textarea && <textarea readOnly className="representation-textarea" ref={this.textArea} value={value} />}
				</div>
			</td>
		);
	}
}

export default RightTableItem;
