import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";

class CmsRightsFilter extends React.Component {
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

		return (
			<BaseFilter
				name={<Translate i18nKey="CMD_RIGHTS_OVERVIEW_RIGHTS" />}
				options={options}
				value={value}
				placeholder={<Translate i18nKey="RIGHTS_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="RIGHTS_FILTER_MULTIPLE" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsRightsFilter;
