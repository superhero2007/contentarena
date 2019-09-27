import React from "react";
import Translate from "@components/Translator/Translate";
import CmsRadioBox from "./CmsRadioBox";
import CmsCheckBox from "./CmsCheckBox";
import { getDedicatedRigths } from "../helpers/PropertyDetailsHelper";
import { SuperRightProductionDetailsLabels } from "../../sell/components/SuperRightDefinitions";

const CmsPropertyDetailTable = ({
	columns, type, rights, disabled, onUpdate, header = true, selectAllCheckbox, checkDelivery,
}) => {
	const isInputBtnChecked = (details, value) => {
		const property = details[type];
		const isArray = Array.isArray(property);

		if (isArray) {
			return property.includes(value);
		}

		return property === value;
	};

	const isInputDisabled = (right, value) => disabled && disabled[value] && disabled[value].includes(right.code);

	const handleRadioChange = (value, index) => {
		if (selectAllCheckbox) {
			rights[index].details[type] = [value];
		} else {
			rights[index].details[type] = value;
		}
		onUpdate(rights);
	};

	const handleCheckBoxChange = (value, index) => {
		let arr = rights[index].details[type];
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

		rights[index].details[type] = arr;
		onUpdate(rights);
	};

	const getLeftLabel = (right) => {
		if (!checkDelivery) return right.name;

		const dedicatedRights = rights
			.filter(item => item.details.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED");

		return dedicatedRights.length ? SuperRightProductionDetailsLabels[right.code] : SuperRightProductionDetailsLabels.LT;
	};

	const getRightsByConditions = () => {
		if (!checkDelivery) return rights;

		const dedicatedRights = getDedicatedRigths(rights);
		if (type === "TECHNICAL_DELIVERY") {
			const hasEditedProgram = rights.find(right => right.id === 18); // PR
			if (hasEditedProgram && rights.length === 1) return rights;
			return hasEditedProgram ? [...dedicatedRights, hasEditedProgram] : dedicatedRights;
		}
		return dedicatedRights;
	};

	const renderComponent = (item, right, row, column) => {
		if (item.type === "radio") {
			return (
				<CmsRadioBox
					text={typeof item.text === "string" ? <Translate i18nKey={item.text} /> : item.text}
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
					value={isInputBtnChecked(right.details, columns[column].value)}
					onChange={() => handleCheckBoxChange(columns[column].value, row)}
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
								{ renderComponent(value, right, row, column) }
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default CmsPropertyDetailTable;
