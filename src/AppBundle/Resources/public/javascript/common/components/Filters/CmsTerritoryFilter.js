import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";

class CmsTerritoryFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			options = [],
			value,
			onChange,
			multi = true,
			label,
		} = this.props;

		options.sort(sortByName);

		return (
			<BaseFilter
				name={label || <Translate i18nKey="TERRITORY_FILTER_NAME" />}
				options={options}
				value={value}
				multi
				placeholder={<Translate i18nKey="TERRITORY_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="TERRITORY_FILTER_MULTIPLE" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsTerritoryFilter;
