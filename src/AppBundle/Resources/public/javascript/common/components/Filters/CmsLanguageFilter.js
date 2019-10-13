import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { languages } from "../../../../data/languages";

export const allValue = {
	id: "all",
	name: "All local languages",
};

class CmsLanguageFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			value,
			onChange,
			label,
		} = this.props;

		const realLanguages = Object.values(languages).map(i => ({ name: i.name, id: i.name }));
		const allLanguages = [allValue, ...realLanguages];

		return (
			<BaseFilter
				name={label}
				options={allLanguages}
				containerClassName="edited-program-filter"
				value={value}
				className="dropdown-container"
				placeholder={<Translate i18nKey="CMS_LANGUAGE_SELECTOR_PLACEHOLDER" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsLanguageFilter;
