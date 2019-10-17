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
			label,
		} = this.props;

		return (
			<BaseFilter
				isClearable={false}
				name={label ? <Translate i18nKey="Currency" /> : null}
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

CmsCurrencyFilter.defaultProps = {
	label: true,
};

export default CmsCurrencyFilter;
