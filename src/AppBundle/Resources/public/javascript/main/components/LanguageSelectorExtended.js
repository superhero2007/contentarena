import React from "react";
import Select from "react-select";
import { languages } from "../../../data/languages";

class LanguageSelectorExtended extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleOnChange = (selection) => {
		const { onChange } = this.props;
		onChange(selection ? selection.value : null);
	};

	componentDidMount = () => {
	};

	render() {
		const { value, multi = true, placeholder } = this.props;
		return (
			<Select
				name="form-field-name"
				onChange={this.handleOnChange}
				value={{ value, label: value }}
				placeholder={placeholder}
				multi={multi}
				options={Object.values(languages).map(i => ({ value: i.name, label: i.name }))}
			/>
		);
	}
}

export default LanguageSelectorExtended;
