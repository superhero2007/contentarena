import React from "react";
import cn from "classnames";
import { isMobileOnly } from "react-device-detect";
import Select, { components } from "react-select-last";
import CmsProgramYearsFilter from "@components/Filters/CmsProgramYearsFilter";
import CmsSeasonsFilter from "./CmsSeasonsFilter";
import CmsRightsFilter from "./CmsRightsFilter";
import CmsRightStatusFilter from "./CmsRightStatusFilter";
import CmsRegionFilter from "./CmsRegionFilter";
import CmsListingFilter from "./CmsListingFilter";
import CmsTerritoryFilter from "./CmsTerritoryFilter";
import CmsProgramFilter from "./CmsProgramFilter";
import CmsCurrencyFilter from "./CmsCurrencyFilter";

const CustomOption = props => (
	!props.isDisabled ? (
		<components.Option {...props}>
			<div className="checkbox-container">
				<input type="checkbox" checked={props.isSelected} onChange={() => {}} />
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
	name, options, value, multi, onChange, placeholder, multiText, getOptionLabel, getOptionValue, MultiValueComponent, className, containerClassName, isClearable,
}) => (
	<div className={cn("default-filter", { mobile: isMobileOnly }, containerClassName)}>
		{name && <label>{name}</label>}
		<Select
			components={{
				MultiValue: MultiValueComponent,
				Option: CustomOption,
				DropdownIndicator: () => <i className="fa fa-sort" />,
				IndicatorSeparator: () => null,
			}}
			placeholder={placeholder}
			isClearable={isClearable}
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
			className={className}
			classNamePrefix="dropdown"
			// menuIsOpen={true}
		/>
	</div>
);

BaseFilter.defaultProps = {
	getOptionLabel: option => option.name,
	getOptionValue: option => option.id,
	multi: true,
	className: "dropdown-container",
	MultiValueComponent: MultiValue,
	isClearable: true,
};

export const SeasonFilter = CmsSeasonsFilter;

export const RegionFilter = CmsRegionFilter;

export const RightStatusFilter = CmsRightStatusFilter;

export const RightFilter = CmsRightsFilter;

export const ListingFilter = CmsListingFilter;

export const TerritoryFilter = CmsTerritoryFilter;

export const ProgramFilter = CmsProgramFilter;

export const ProgramYearsFilter = CmsProgramYearsFilter;

export const CurrencyFilter = CmsCurrencyFilter;
