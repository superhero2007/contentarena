import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";
import { EDITED_PROGRAM_TYPES } from "../../constants";

class CmsProgramTypeFilter extends React.Component {
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
		const valueObj = EDITED_PROGRAM_TYPES.find(type => type.id === value);

		return (
			<BaseFilter
				name={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE" />}
				options={options}
				value={valueObj}
				className="dropdown-container"
				placeholder={<Translate i18nKey="CMS_PROPERTY_DETAILS_TAB_EDIT_PROGRAM_TYPE_PLACEHOLDER" />}
				multi={false}
				onChange={onChange}
			/>
		);
	}
}

export default CmsProgramTypeFilter;
