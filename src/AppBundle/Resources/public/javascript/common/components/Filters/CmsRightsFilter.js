import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { components } from "react-select-last";

const MultiValueContainer = props => (
	<components.MultiValueContainer {...props}>
		<div className="right-value">
			{props.data.code}
		</div>
	</components.MultiValueContainer>
);

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
				MultiValueComponent={MultiValueContainer}
			/>
		);
	}
}

export default CmsRightsFilter;
