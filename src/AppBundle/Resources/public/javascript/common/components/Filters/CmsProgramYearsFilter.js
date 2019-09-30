import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import Select, { components } from "react-select-last";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";
import { BUNDLE_TERRITORIES_METHOD, EDITED_PROGRAM_TYPES } from "../../constants";
import TerritoryFilter from "../../../main/components/TerritoryFilter";

const MultiValueContainer = props => (
	<components.MultiValueContainer {...props}>
		{props.children}
	</components.MultiValueContainer>
);

class CmsProgramYearsFilter extends React.Component {
	constructor(props) {
		super(props);

		const startYear = new Date().getFullYear() + 15;
		const years = [];

		for (let i = 0; i < 81; i++) {
			years.push(startYear - i);
		}

		this.state = {
			years: this.yearsValueLabel(props.options || years),
		};
	}

	yearsValueLabel = years => years.map(year => ({ label: year, value: year }));

	render() {
		const {
			value,
			onChange,
			multi,
		} = this.props;

		return (
			<BaseFilter
				name={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_YEAR" />}
				options={this.state.years}
				value={value ? multi ? value : { value, label: value } : null}
				className="dropdown-container"
				placeholder={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_YEAR" />}
				multi={multi}
				onChange={onChange}
				getOptionLabel={option => option.label}
				getOptionValue={option => option.value}
				MultiValueComponent={MultiValueContainer}
			/>
		);
	}
}

CmsProgramYearsFilter.defaultProps = {
	multi: false,
};

export default CmsProgramYearsFilter;
