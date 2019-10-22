import React from "react";
import { formatFee } from "../helpers/PropertyDetailsHelper";

class InputFee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fee: formatFee(props.value),
			original: 0,
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ fee: formatFee(nextProps.value) });
	}

	handleChange = (value) => {
		const newValue = Number(value.replace(/,/g, ""));

		this.setState({
			fee: formatFee(newValue),
			original: newValue,
		});
	};

	render() {
		const { fee } = this.state;
		const { onBlur, onKeyDown } = this.props;
		return (
			<input
				type="text"
				className="input-group-text"
				placeholder="Enter fee"
				onFocus={e => e.target.select()}
				value={fee}
				onKeyDown={onKeyDown}
				onBlur={() => onBlur(this.state.original)}
				onChange={e => this.handleChange(e.target.value)}
			/>
		);
	}
}

export default InputFee;
