import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";

class CmsRegionFilter extends React.Component {
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

		options.sort(sortByName);

		return (
			<BaseFilter
				name={<Translate i18nKey="REGION_FILTER_NAME" />}
				options={options}
				value={value}
				placeholder={<Translate i18nKey="REGION_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="REGION_FILTER_MULTIPLE" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsRegionFilter;