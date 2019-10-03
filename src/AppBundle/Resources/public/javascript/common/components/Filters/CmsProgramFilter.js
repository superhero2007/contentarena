import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";

class CmsProgramFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			options,
			value,
			onChange,
		} = this.props;

		const filtered = options.filter(option => option.name);
		filtered.sort(sortByName);

		return (
			<BaseFilter
				name={<Translate i18nKey="PROGRAM_FILTER_NAME" />}
				options={filtered}
				value={value}
				className="dropdown-container"
				placeholder={<Translate i18nKey="PROGRAM_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="PROGRAM_FILTER_MULTIPLE" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsProgramFilter;
