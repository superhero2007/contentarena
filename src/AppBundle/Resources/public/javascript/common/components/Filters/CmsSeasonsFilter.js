import React from "react";
import Translate from "@components/Translator/Translate";
import { components } from "react-select-last";
import { BaseFilter } from "@components/Filters/index";
import { sortSeasons } from "../../../cms/helpers/PropertyDetailsHelper";

const MultiValueComponent = ({
	children, data, selectProps: { value, multiText }, ...innerProps
}) => ((value.length && data.id === value[0].id) ? (
	<components.MultiValueContainer {...innerProps}>
		{value.length === 1
			? value[0].year
			: <span>{value.length}{" "}{multiText}</span> }
	</components.MultiValueContainer>
) : null);

class CmsSeasonsFilter extends React.Component {
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

		options.sort(sortSeasons);

		return (
			<BaseFilter
				name={<Translate i18nKey="SEASON_FILTER_NAME" />}
				options={options}
				value={value}
				placeholder={<Translate i18nKey="SEASON_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="SEASON_FILTER_MULTIPLE" />}
				onChange={onChange}
				getOptionLabel={option => option.year}
				MultiValueComponent={MultiValueComponent}
			/>
		);
	}
}

export default CmsSeasonsFilter;
