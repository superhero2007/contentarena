import React from "react";
import Select from "react-select-last";
import Translate from "@components/Translator/Translate";
import CmsRadioBox from "./CmsRadioBox";
import CmsCheckBox from "./CmsCheckBox";
import CmsInputBox from "./CmsInputBox";
import { getDedicatedRigths } from "../helpers/PropertyDetailsHelper";
import { SuperRightProductionDetailsLabels } from "../../sell/components/SuperRightDefinitions";

const CmsPropertyDetailTable = ({
	columns, type, rights, disabled, onUpdate, header = true, selectAllCheckbox, checkDelivery, showType = false,
}) => {
	const isInputBtnChecked = (details = {}, value) => {
		const property = details[type];
		const isArray = Array.isArray(property);

		if (isArray) {
			return property.includes(value);
		}

		return property === value;
	};

	const isInputDisabled = (right, value) => disabled && disabled[value] && disabled[value].includes(right.code);

	const handleRadioChange = (value, index, key = type) => {
		if (index) {
			const right = rights.find(element => element.id === index);
			if (selectAllCheckbox) {
				right.details[key] = [value];
			} else {
				right.details[key] = value;
			}
		} else {
			for (const right of rights) {
				right.details[key] = value;
			}
		}
		onUpdate(rights);
	};

	const handleCheckBoxChange = (value, index) => {
		const right = rights.find(element => element.id === index);
		const selectedRights = index ? [right] : rights;
		for (const right of selectedRights) {
			let arr = right.details[type];
			if (selectAllCheckbox && value === `${type}_ALL`) {
				arr = [value];
			} else {
				if (selectAllCheckbox) {
					arr = arr.filter(item => item !== `${type}_ALL`);
				}
				if (arr.includes(value)) {
					if (arr.length > 1) {
						arr = arr.filter(item => item !== value);
					}
				} else {
					arr = [...arr, value];
				}
			}

			right.details[type] = arr;
		}
		onUpdate(rights);
	};

	const getLeftLabel = (right) => {
		if (showType) return <Translate i18nKey={right.name} />;
		if (!checkDelivery) return right.name;

		const dedicatedRights = rights
			.filter(item => item.details.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED");

		return dedicatedRights.length ? SuperRightProductionDetailsLabels[right.code] : SuperRightProductionDetailsLabels.LT;
	};

	const getRightsByConditions = () => {
		if (!checkDelivery) return rights;

		const dedicatedRights = getDedicatedRigths(rights);
		if (showType) {
			return [{
				name: `${type}_TITLE`,
				details: rights[0].details,
			}];
		}
		if (type === "TECHNICAL_DELIVERY") {
			const hasEditedProgram = rights.find(right => right.id === 18); // PR
			if (hasEditedProgram && rights.length === 1) return rights;
			return hasEditedProgram ? [...dedicatedRights, hasEditedProgram] : dedicatedRights;
		}
		return dedicatedRights;
	};

	const getRadioText = (right, row, item) => {
		if (item.value === "ASPECT_RATIO_OTHER") {
			return (
				<CmsInputBox
					className="property-details-input"
					value={right.details[item.key] || ""}
					onChange={e => handleRadioChange(e.target.value, row, item.key)}
				/>
			);
		}

		if (item.value === "CONTENT_DELIVERY_DEDICATED" && right.code === "NA") {
			const options = [
				{
					value: "CONTENT_DELIVERY_NA_DEDICATED",
					label: "Dedicated delivery",
				}, {
					value: "CONTENT_DELIVERY_NA_HIGHLIGHT",
					label: "Delivered via highlight & clip footage",
				},
			];
			const value = options.find(item => item.value === right.details[item.key]);
			return (
				<div className="property-details-select">
					<Select
						value={value}
						onChange={value => handleRadioChange(value, row, item.key)}
						placeholder="Select"
						options={options}
					/>
				</div>
			);
		}

		return item.text ? <Translate i18nKey={item.text} /> : "";
	};

	const renderComponent = (item, right, row, column) => {
		if (item.type === "radio") {
			return (
				<CmsRadioBox
					text={getRadioText(right, row, item)}
					disabled={isInputDisabled(right, columns[column].value)}
					value={isInputBtnChecked(right.details, columns[column].value)}
					onChange={() => handleRadioChange(columns[column].value, row)}
				/>
			);
		}

		if (item.type === "checkbox") {
			return (
				<CmsCheckBox
					text={<Translate i18nKey={item.text} />}
					disabled={isInputDisabled(right, columns[column].value)}
					value={isInputBtnChecked(right.details, columns[column].value)}
					onChange={() => handleCheckBoxChange(columns[column].value, row)}
				/>
			);
		}

		if (item.type === "inputBox") {
			return (
				<CmsInputBox
					className="property-details-input"
					value={right.details[item.key] || ""}
					onChange={e => handleRadioChange(e.target.value, row, item.key)}
				/>
			);
		}

		return item.text;
	};

	return (
		<div className="property-details-table">
			{header && (
				<div className="property-details-table-head">
					<div className="property-details-table-tr">
						<div className="property-details-table-th" key="head" />
						{columns.map((item, index) => (
							<div className="property-details-table-th" key={`head-${index}`}>
								<Translate i18nKey={item.value} />
							</div>
						))}
					</div>
				</div>
			)}
			<div className="property-details-table-body">
				{getRightsByConditions().map((right, row) => (
					<div className="property-details-table-tr" key={`row-${row}`}>
						<div className="property-details-table-td" key={`column-${row}`}>
							{getLeftLabel(right)}
						</div>
						{columns.map((value, column) => (
							<div className="property-details-table-td" key={`column-${row}-${column}`}>
								{ renderComponent(value, right, right.id, column) }
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default CmsPropertyDetailTable;
