import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import cn from "classnames";
import first from "lodash/first";
import { getDedicatedRigths } from "../../../cms/helpers/PropertyDetailsHelper";
import { GenericModalStyle } from "../../../main/styles/custom";
import { LanguageSelector } from "../../../main/components/LanguageSelector";
import { SuperRightProductionDetailsLabels } from "../../../sell/components/SuperRightDefinitions";
import { VALIDATION_KEYS } from "@constants";

class PropertyRightsProductionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rights: new Map(props.rights.map(item => [item.id, item])),
		};
	}

	isRequiredTextarea = (applyDisabled) => {
		const { validateTextarea } = this.props.config;
		if (validateTextarea && applyDisabled) return true;
		return false;
	};

	handleUpdate = () => {
		const { rights } = this.state;
		this.props.onUpdate([...rights.values()]);
		this.props.onCloseModal();
	};

	isInputBtnChecked = (selectedRights, key, value) => {
		const property = selectedRights[key];
		const isArray = Array.isArray(property);

		if (isArray) {
			return property.includes(value);
		}

		return property === value;
	};

	isInputDisabled = (right, value) => {
		const { disabled } = this.props.config;
		if (disabled && disabled[value] && disabled[value].includes(right.code)) return true;

		return false;
	};

	isValid = (value, type) => {
		if (!value) return false;

		const validationObj = {
			[VALIDATION_KEYS.NO_EMPTY_STRING]: !Array.isArray(value) && value.toString().trim().length > 0,
			[VALIDATION_KEYS.NO_ZERO]: +value !== 0,
			[VALIDATION_KEYS.NO_EMPTY_ARR]: value.length > 0,
		};

		if (validationObj[type] === undefined) throw new Error("unhandled validation type");

		return validationObj[type];
	};

	isApplyDisabled = () => {
		const { rights } = this.state;
		const { validations } = this.props.config;
		if (!validations) return false;

		for (const [key, right] of rights) {
			for (const validItem of validations) {
				const prop = right.selectedRights[validItem.key];
				const propToCheck = right.selectedRights[validItem.keyToCheck];

				if (prop === validItem.value && (!propToCheck || !this.isValid(propToCheck, validItem.type))) {
					return true;
				}
			}
		}
		return false;
	};

	handleChange = (value, selectedRights, key, id) => {
		const { rights } = this.state;
		rights.get(id).selectedRights[key] = value;

		this.setState({ rights });
	};

	handleChangeInAllRights = (value, key) => {
		const { rights } = this.state;

		for (const [id, right] of rights) {
			right.selectedRights[key] = value;
		}

		this.setState({ rights });
	};

	handleCheckboxBtnChange = (e, selectedRights, key, id) => {
		const { selectAllCheckbox } = this.props.config;
		const { rights } = this.state;
		const { value } = e.target;

		let arr = rights.get(id).selectedRights[key];

		if (selectAllCheckbox && selectAllCheckbox === value) {
			arr = [value];
		} else {
			if (selectAllCheckbox) {
				arr = arr.filter(item => item !== selectAllCheckbox);
			}
			if (arr.includes(e.target.value)) {
				if (arr.length > 1) {
					arr = arr.filter(item => item !== value);
				}
			} else {
				arr = [...arr, value];
			}
		}

		rights.get(id).selectedRights[key] = arr;
		this.setState({ rights });
	};

	getLeftLabel = (right) => {
		const { productionLabel, checkDelivery = false } = this.props.config;
		const label = productionLabel ? SuperRightProductionDetailsLabels[right.code] : right.name;

		if (!checkDelivery) return label;

		const { rights } = this.state;
		const dedicatedRights = [...rights.values()]
			.filter(item => item.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED");

		return dedicatedRights && dedicatedRights.length === 0 ? SuperRightProductionDetailsLabels.LT : label;
	};

	getRightsByConditions = () => {
		const { key, checkDelivery } = this.props.config;
		const { rights } = this.state;
		const availableRights = [...rights.values()];

		if (!checkDelivery) return availableRights;

		if (checkDelivery && key !== "TECHNICAL_DELIVERY") {
			return getDedicatedRigths(availableRights);
		}

		if (checkDelivery && key === "TECHNICAL_DELIVERY") {
			const hasEditedProgram = rights.has(18); // PR
			if (hasEditedProgram && availableRights.length === 1) return availableRights;

			const dedicatedRights = getDedicatedRigths(availableRights);

			return hasEditedProgram ? [...dedicatedRights, rights.get(18)] : dedicatedRights;
		}

		return availableRights;
	};

	hasExtraTag = (index, key, value, right) => {
		const { code } = right;

		if (value === "CONTENT_DELIVERY_DEDICATED" && code === "NA") {
			return this.getDeliverySelector(index, key, value, right);
		}

		if (key === "CAMERA") {
			return this.getInputNumber(index, "CAMERAS", right);
		}

		if (key === "ASPECT_RATIO" && value === "ASPECT_RATIO_CUSTOM") {
			return this.getInputText(index, key, right);
		}

		if ((key === "GRAPHICS" && value === "GRAPHICS_YES") || (key === "COMMENTARY" && value === "COMMENTARY_YES")) {
			return this.getSmallLanguageSelector(index, key, value, right);
		}

		return null;
	};

	renderRowHeader = () => {
		const { config: { headers = [], languageSelector = false, key } } = this.props;

		if (languageSelector) {
			return <div className="row-item-header full-width">{this.context.t(`RIGHTS_${key}`)}</div>;
		}

		return (
			<Fragment>
				<div className="row-item-header" />
				{headers.map(item => (
					<div key={item} className="row-item-header">{this.context.t(`RIGHTS_${item}`)}</div>
				))}
			</Fragment>
		);
	};

	getSmallLanguageSelector = (index, key, value, right) => {
		const { selectedRights } = right;
		const selectorValue = selectedRights[`${key}_LANGUAGES`];
		return (
			<LanguageSelector
				placeholder={this.context.t("CL3_LANGUAGE_SELECTOR_PLACEHOLDER")}
				onChange={(selectedValue) => {
					this.handleChange(selectedValue, selectedRights, `${key}_LANGUAGES`, index);
					this.handleChange(value, selectedRights, key, index);
				}}
				value={selectorValue}
			/>
		);
	};

	getLanguageSelector = () => {
		const listKey = "LICENSED_LANGUAGE_LIST";
		const { rights } = this.state;
		const selectorValue = rights.values().next().value.selectedRights[listKey];
		return (
			<LanguageSelector
				placeholder={this.context.t("CL3_LANGUAGE_SELECTOR_PLACEHOLDER")}
				onChange={(selectedValue) => {
					this.handleChangeInAllRights(selectedValue, listKey);
				}}
				value={selectorValue}
			/>
		);
	};

	getInputText = (index, key, right) => {
		const { selectedRights } = right;
		const inputKey = `${key}_TEXT`;
		const value = selectedRights[inputKey];
		return (
			<input
				className="modal-input-text"
				onChange={e => this.handleChange(e.target.value, selectedRights, inputKey, index)}
				value={value}
				type="text"
			/>
		);
	};

	getInputNumber = (index, key, right) => {
		const { selectedRights } = right;
		const value = selectedRights[key];
		return (
			<input
				className="modal-input-number"
				onChange={e => this.handleChange(e.target.value, selectedRights, key, index)}
				value={value}
				type="number"
				max={100}
				min={0}
			/>
		);
	};

	getCheckboxButton = (key, value, right) => {
		const name = `${right.code}_${key}`;
		const { selectedRights, id } = right;

		return (
			<div key={`${right.code}-${value}-${id}`} className="row-item">
				<input
					type="checkbox"
					className="ca-checkbox"
					name={name}
					checked={this.isInputBtnChecked(selectedRights, key, value)}
					onChange={e => this.handleCheckboxBtnChange(e, selectedRights, key, id)}
					value={value}
				/>
			</div>
		);
	};

	getDeliverySelector = (index, key, value, right) => {
		const selectValue = right.selectedRights.CONTENT_DELIVERY_NA;
		const { selectedRights } = right;
		return (
			<select
				className="modal-select"
				value={selectValue}
				onChange={(e) => { this.handleChange(e.target.value, selectedRights, "CONTENT_DELIVERY_NA", index); }}
			>
				<option disabled>Select</option>
				<option value="CONTENT_DELIVERY_NA_DEDICATED">dedicated delivery</option>
				<option value="CONTENT_DELIVERY_NA_HIGHLIGHT">delivered via highlight & clip footage</option>
			</select>
		);
	};

	getRadioButton = (key, value, right) => {
		const { selectedRights, id } = right;
		const name = `${right.code}_${key}`;

		return (
			<div key={`${right.code}-${value}-${id}`} className="row-item">
				<input
					type="radio"
					className="ca-radio"
					name={name}
					disabled={this.isInputDisabled(right, value)}
					checked={this.isInputBtnChecked(selectedRights, key, value)}
					onChange={e => this.handleChange(e.target.value, selectedRights, key, id)}
					value={value}
				/>

				{this.hasExtraTag(id, key, value, right)}
			</div>
		);
	};

	renderOptionsRow = (right) => {
		const {
			config: {
				headers = [],
				multiple = false,
				key,
			},
		} = this.props;

		return headers.map(header => (multiple
			? this.getCheckboxButton(key, header, right)
			: this.getRadioButton(key, header, right)));
	};

	renderRightsRow = () => {
		const { languageSelector = false } = this.props.config;

		if (languageSelector) {
			return (
				<div className="table-row full-width">
					{this.getLanguageSelector()}
				</div>
			);
		}

		return this.getRightsByConditions().map((right, index) => {
			const itemLabel = this.getLeftLabel(right);

			return (
				<div className="table-row" key={`${right.code}-${index}`}>
					<div className="row-item">{itemLabel}</div>
					{this.renderOptionsRow(right, index)}
				</div>
			);
		});
	};

	render() {
		const {
			isOpen,
			onCloseModal,
			config: {
				textAreaLabelKey,
				name,
				descriptionKey,
				technicalFee,
				key,
			},
		} = this.props;

		const firstRight = this.state.rights.values().next().value;
		const isDisabled = this.isApplyDisabled();

		console.log(this);

		return (
			<Modal isOpen={isOpen} className="modal-wrapper rights-production" style={GenericModalStyle} onRequestClose={onCloseModal}>
				<header className="modal-header">
					<span className="modal-title">
						<i className="fa fa-edit" />
						<h3 className="modal-title">{name}</h3>
						<i className="fa fa-times close-icon" onClick={onCloseModal} />
					</span>
					<div className="modal-sub-title">
						{this.context.t(descriptionKey)}
					</div>
				</header>
				<section className="modal-body">
					<div className="modal-table">
						<div className="table-headline">
							{this.renderRowHeader()}
						</div>
						<div className="table-body">
							{this.renderRightsRow()}
						</div>
					</div>
					<div className="explanation-text">
						<textarea
							className={cn({ required: this.isRequiredTextarea(isDisabled) })}
							placeholder={this.context.t(textAreaLabelKey)}
							onChange={e => this.handleChangeInAllRights(e.target.value, `${key}_TEXTAREA`)}
							value={firstRight.selectedRights[`${key}_TEXTAREA`]}
						/>
					</div>
					{technicalFee && (
						<div className="technical-fee">
							<div>Technical fee</div>
							<p>
								<input
									defaultChecked={firstRight.selectedRights.TECHNICAL_FEE === "INCLUDED"}
									type="radio"
									className="ca-radio"
									value="INCLUDED"
									id="INCLUDED"
									onChange={e => this.handleChangeInAllRights(e.target.value, "TECHNICAL_FEE")}
									name="TECHNICAL_FEE"
								/>
								<label htmlFor="INCLUDED">{` ${this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_1")}`}</label>
							</p>
							<p>
								<input
									checked={firstRight.selectedRights.TECHNICAL_FEE === "ON_TOP"}
									type="radio"
									className="ca-radio"
									value="ON_TOP"
									id="ON_TOP"
									onChange={e => this.handleChangeInAllRights(e.target.value, "TECHNICAL_FEE")}
									name="TECHNICAL_FEE"
								/>
								<label htmlFor="ON_TOP">{` ${this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_2")} `}</label>
								<input
									onChange={e => this.handleChangeInAllRights(e.target.value, "TECHNICAL_FEE_PERCENTAGE")}
									value={firstRight.selectedRights.TECHNICAL_FEE_PERCENTAGE}
									type="number"
									max={100}
									min={0}
									onFocus={() => this.handleChangeInAllRights("ON_TOP", "TECHNICAL_FEE")}
								/>
								{` ${this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_3")}`}
							</p>
						</div>
					)
					}
				</section>
				<footer className="modal-footer">
					<button className="cancel-btn" onClick={onCloseModal}>
						{this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
					</button>
					<button className="standard-button" onClick={this.handleUpdate} disabled={isDisabled}>
						{this.context.t("MODAL_APPLY")}
					</button>
				</footer>
			</Modal>
		);
	}
}

PropertyRightsProductionModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onCloseModal: PropTypes.func.isRequired,
	config: PropTypes.object.isRequired,
};

PropertyRightsProductionModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyRightsProductionModal;
