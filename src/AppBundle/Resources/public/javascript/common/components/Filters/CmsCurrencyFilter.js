import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { CURRENCIES } from "../../constants";

class CmsCurrencyFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			value,
			onChange,
		} = this.props;

		return (
			<BaseFilter
				name={<Translate i18nKey="Currency" />}
				options={CURRENCIES.map(currency => ({ label: currency, value: currency }))}
				value={value ? { value, label: value } : null}
				className="dropdown-container"
				placeholder={<Translate i18nKey="Currency" />}
				multi={false}
				onChange={option => onChange(option.value)}
				getOptionLabel={option => option.label}
				getOptionValue={option => option.value}
			/>
		);
	}
}

export default CmsCurrencyFilter;
