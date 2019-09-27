import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";
import { EDITED_PROGRAM_TYPES } from "../../constants";

class CmsProgramYearFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			value,
			onChange,
		} = this.props;

		const options = EDITED_PROGRAM_TYPES.sort(sortByName);

		return (
			<BaseFilter
				name={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE" />}
				options={options}
				value={value}
				className="dropdown-container form-group"
				placeholder={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE_PLACEHOLDER" />}
				multi={false}
				onChange={onChange}
			/>
		);
	}
}

export default CmsProgramYearFilter;
