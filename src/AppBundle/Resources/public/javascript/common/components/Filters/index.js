import React from "react";
import cn from "classnames";
import { isMobileOnly } from "react-device-detect";
import Select, { components } from "react-select-last";

const CustomOption = props => (
	!props.isDisabled ? (
		<components.Option {...props}>
			<div className="checkbox-container">
				<input type="checkbox" checked={props.isSelected} />
				<span className="checkbox-label">
					{props.children}
				</span>
				<span className="check-mark" />
			</div>
		</components.Option>
	) : null
);

const MultiValue = ({
	children, data, selectProps: { value, multiText }, ...innerProps
}) => ((value.length && data.id === value[0].id) ? (
	<components.MultiValueContainer {...innerProps}>
		{value.length === 1
			? value[0].name
			: <span>{value.length}{" "}{multiText}</span> }
	</components.MultiValueContainer>
) : null);

export const BaseFilter = ({
	name, options, value, multi, onChange, placeholder, multiText, getOptionLabel, getOptionValue, MultiValueComponent,
}) => (
	<div className={cn("default-filter", { mobile: isMobileOnly })}>
		<label>
			{name}
		</label>
		<Select
			components={{
				MultiValue: MultiValueComponent,
				Option: CustomOption,
				DropdownIndicator: () => <i className="fa fa-sort" />,
				IndicatorSeparator: () => null,
			}}
			placeholder={placeholder}
			clearable
			onChange={onChange}
			multiText={multiText}
			isMulti={multi}
			value={value}
			options={options}
			getOptionLabel={getOptionLabel}
			getOptionValue={getOptionValue}
			closeMenuOnSelect={false}
			hideSelectedOptions={false}
			isSearchable
			className="dropdown-container"
			classNamePrefix="dropdown"
			// menuIsOpen={true}
		/>
	</div>
);

BaseFilter.defaultProps = {
	getOptionLabel: option => option.name,
	getOptionValue: option => option.id,
	multi: true,
	MultiValueComponent: MultiValue,
};
