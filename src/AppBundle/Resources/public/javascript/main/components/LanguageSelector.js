import React from "react";
import Select from "react-select";
import { languages } from "../../../data/languages";

export const allValue = {
	value: "all",
	label: "All local languages",
};

class LanguageSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.prevSelection = props.value ? [...props.value] : [];
	}

	handleOnChange = (selection) => {
		const { onChange } = this.props;
		const hasAll = !!selection.find(item => item.value === "all");
		const hasAllPrev = !!this.prevSelection.find(item => item.value === "all");
		// const itemsChanged = selection.length !== this.prevSelection.length;

		if (hasAll) {
			if (hasAllPrev) {
				// Remove All
				selection = selection.filter(item => item.value !== "all");
			} else {
				// Add All and remove others
				selection = [allValue];
			}
		}

		this.prevSelection = selection;

		onChange(selection);
	};

	render() {
		const { value, multi = true, placeholder } = this.props;
		const realLanguages = Object.values(languages).map((i, k) => ({ value: i.name, label: i.name }));
		const allLanguages = [allValue, ...realLanguages];

		return (
			<Select
				name="form-field-name"
				onChange={this.handleOnChange}
				value={value}
				multi={multi}
				placeholder={placeholder}
				options={allLanguages}
			/>
		);
	}
}

export { LanguageSelector };
