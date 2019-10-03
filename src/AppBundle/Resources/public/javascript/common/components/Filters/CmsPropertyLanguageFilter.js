import React from "react";
import { components } from "react-select-last";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { languages } from "../../../../data/languages";

const allValue = {
	value: "all",
	label: "All local languages",
};

const realLanguages = Object.values(languages).map(i => ({ value: i.name, label: i.name }));
const options = [allValue, ...realLanguages];

const MultiValueComponent = ({
	children, data, selectProps: { value, placeholder }, ...innerProps
}) => ((value && value.length && data.value === value[0].value) ? (
	<components.MultiValueContainer {...innerProps}>
		{placeholder}
	</components.MultiValueContainer>
) : null);

const CmsPropertyLanguageFilter = ({ value, onChange }) => {
	const handleRemove = (selected) => {
		const updatedValue = value.filter(element => element.value !== selected.value);
		onChange(updatedValue);
	};

	const handleChange = (value) => {
		onChange(value);
	};

	const handleClear = () => {
		onChange([]);
	};

	return (
		<div className="language-filter">
			<div className="language-filter-input">
				<BaseFilter
					options={options}
					value={value}
					placeholder={<Translate i18nKey="LANGUAGE_FILTER_PLACEHOLDER" />}
					onChange={handleChange}
					getOptionLabel={option => option.label}
					getOptionValue={option => option.value}
					isClearable={false}
					MultiValueComponent={MultiValueComponent}
				/>
			</div>
			<div className="language-filter-content">
				{value && value.map((item, index) => (
					<div className="language-filter-item" key={index}>
						<div className="language-filter-item-text">
							{item.label}
						</div>
						<i
							className="icon-remove"
							onClick={() => handleRemove(item)}
						/>
					</div>
				))}
			</div>
			<div className="language-filter-clear">
				<div
					onClick={handleClear}
					className="secondary-link"
				>
					<span className="restore-text">
						<Translate i18nKey="LANGUAGE_FILTER_CLEAR" />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CmsPropertyLanguageFilter;
