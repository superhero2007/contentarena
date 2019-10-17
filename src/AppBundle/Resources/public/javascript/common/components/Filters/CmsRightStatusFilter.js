import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { components } from "react-select-last";
import { RIGHTS_STATUS_FILTERS } from "../../constants";

const MultiValueComponent = ({
	children, data, selectProps: { value, multiText }, ...innerProps
}) => ((value.length && data.id === value[0].id) ? (
	<components.MultiValueContainer {...innerProps}>
		{value.length === 1
			? <Translate i18nKey={value[0].key} />
			: <span>{value.length}{" "}{multiText}</span> }
	</components.MultiValueContainer>
) : null);

class CmsRightStatusFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			value,
			onChange,
		} = this.props;

		return (
			<BaseFilter
				name={<Translate i18nKey="RIGHTS_STATUS_FILTER_NAME" />}
				options={RIGHTS_STATUS_FILTERS}
				value={value}
				placeholder={<Translate i18nKey="RIGHTS_STATUS_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="RIGHTS_STATUS_FILTER_MULTIPLE" />}
				onChange={onChange}
				getOptionLabel={option => <Translate i18nKey={option.key} />}
				getOptionValue={option => option.id}
				MultiValueComponent={MultiValueComponent}
			/>
		);
	}
}

export default CmsRightStatusFilter;
