import React from "react";
import Modal from "react-modal";
import cloneDeep from "lodash/cloneDeep";
import toNumber from "lodash/toNumber";
import isFinite from "lodash/isFinite";
import isEqual from "lodash/isEqual";
import cn from "classnames";
import { customStyles } from "../../main/styles/custom";
import RightItemsDefinitions from "./RightItemsDefinitions";
import { LanguageSelector } from "../../main/components/LanguageSelector";
import { SuperRightProductionDetailsLabels } from "./SuperRightDefinitions";
import { PropTypes } from "prop-types";
import { commentIcon } from "@icons";

const numberFieldStyle = {
	width: "30px",
	paddingLeft: "10px",
};

const getLanguagesString = (languages) => {
	if (!languages) return null;
	return languages.map(item => item.label)
		.join(", ");
};

const getCustomValueString = (firstPackage, currentRights, rightItemsDefinitions, context, item, predicate) => {
	const rightLabel = nameToCustomValueConfig[item].key;
	const rightLabelCustom = nameToCustomValueConfig[item].value;
	const suffix = "RIGHTS_";


	if (currentRights === rightLabel) {
		return predicate(firstPackage.selectedRights[rightLabelCustom]);
	}
	return context.t(suffix + currentRights);
};

const nameToCustomValueConfig = {
	CAMERA: {
		key: "CAMERA_MINIMUM",
		value: "CAMERAS",
	},
	RUNS: {
		key: "RUNS_LIMITED",
		value: "RUNS_NUMBER",
	},
	ASPECT_RATIO: {
		key: "ASPECT_RATIO_CUSTOM",
		value: "ASPECT_RATIO_TEXT",
	},
	COMMENTARY: {
		key: "COMMENTARY_YES",
		value: "COMMENTARY_LANGUAGES",
	},
	GRAPHICS: {
		key: "GRAPHICS_YES",
		value: "GRAPHICS_LANGUAGES",
	},
};


class PopupRight extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rightsPackage: new Map(props.rightsPackage.map(i => [i.id, i])),
			isOpen: false,
			selected: props.selected,
			custom: false,
			productionLabels: SuperRightProductionDetailsLabels,
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			rightsPackage: new Map(props.rightsPackage.map(i => [i.id, i])),
		});
	}

	toggleAll = (rightItem) => {
		const { selection } = this.state;

		if (selection.get(rightItem)
			.has(0)) {
			selection.get(rightItem)
				.clear();
		} else {
			this.state.activePackages.forEach((rightPackage) => {
				selection.get(rightItem)
					.set(rightPackage.id, true);
			});

			selection.get(rightItem)
				.set(0, true);
		}

		this.setState({ selection });
	};

	select = (rightItem, rightPackage) => {
		const { selection } = this.state;

		if (!this.state.activePackages.has(rightPackage)) return false;

		if (!this.props.data.multiple) {
			selection.forEach((item, key) => {
				if (key !== rightItem) item.clear();
			});
		}
		selection.get(rightItem)
			.set(rightPackage, true);
		this.setState({ selection });
	};

	unselect = (rightItem, rightPackage) => {
		const { selection } = this.state;
		selection.get(rightItem)
			.delete(rightPackage);
		selection.get(rightItem)
			.delete(0);
		this.setState({ selection });
	};

	toggle = (rightItem, rightPackage) => {
		const { selection } = this.state;
		if (selection.get(rightItem)
			.has(rightPackage)) {
			this.unselect(rightItem, rightPackage);
		} else {
			this.select(rightItem, rightPackage);
		}
	};

	isSelected = (rightItem, rightPackage) => {
		const { selection } = this.state;
		return selection.get(rightItem)
			.has(rightPackage);
	};

	packageIsActive = id => this.state.activePackages.has(id) && this.state.availablePackages.has(id);

	setDate = (date, rightItem, rightPackage) => {
		const { selection } = this.state;

		if (!this.state.activePackages.has(rightPackage)) return false;

		selection.get(rightItem)
			.set(rightPackage, date);
		this.setState({ selection });
	};

	togglePopup = () => {
		const { onProgram, id } = this.props;

		if (id === "PROGRAM") {
			onProgram();
			return;
		}

		this.setState(({ isOpen, rightsPackage }) => {
			if (!isOpen) {
				this.prevRightsPackage = new Map();
				rightsPackage.forEach((item) => {
					this.prevRightsPackage.set(item.id, cloneDeep(item));
				});
			}

			return {
				isOpen: !isOpen,
			};
		});
	};

	closePopupAndRestoreData = () => {
		const { onUpdate } = this.props;

		onUpdate(this.prevRightsPackage);
		this.prevRightsPackage = null;
		this.togglePopup();
	};

	onOKClicked = () => {
		const { id, onOKClicked } = this.props;

		if (onOKClicked) {
			onOKClicked(id);
		}

		this.togglePopup();
	};

	updateSelection = (val, id, rightPackage) => {
		const { rightsPackage } = this.state;
		rightPackage.selectedRights[id] = val;
		rightsPackage.set(rightPackage.id, rightPackage);

		this.props.onUpdate(rightsPackage);
	};

	updateMultipleSelection = (val, id, rightPackage) => {
		const { rightsPackage } = this.state;
		const index = rightPackage.selectedRights[id].indexOf(val);
		const { all } = RightItemsDefinitions[val];

		if (index === -1) {
			if (all) {
				rightPackage.selectedRights[id] = [val];
			} else {
				rightPackage.selectedRights[id] = [...rightPackage.selectedRights[id], val];

				rightPackage.selectedRights[id].forEach((item, index, object) => {
					const m = item.match(/_ALL/g);
					if (m) {
						object.splice(index, 1);
					}
				});
			}
		} else if (rightPackage.selectedRights[id].length > 1) rightPackage.selectedRights[id].splice(index, 1);

		rightsPackage.set(rightPackage.id, rightPackage);

		this.props.onUpdate(rightsPackage);
	};

	updateSelectionInAllPackages = (val, id) => {
		const { rightsPackage } = this.state;
		rightsPackage.forEach((rightPackage) => {
			rightPackage.selectedRights[id] = val;
		});
		this.props.onUpdate(rightsPackage);
	};

	filterRightsPackage(id, rightsPackages) {
		const { checkContentDelivery, superRights } = this.props;

		const packagesAvailable = rightsPackages.map(rp => rp.shortLabel);
		const liveFeedPackages = rightsPackages.filter(rp => rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");
		const deliveryViaLiveFeed = liveFeedPackages.length > 0 && packagesAvailable.indexOf("LT") === -1;
		const highlightRight = rightsPackages.filter(rp => rp.shortLabel === "HL");
		const highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";
		let liveIncluded = false;

		return rightsPackages.filter((rightPackage) => {
			if (superRights.length > 0 && superRights.indexOf(rightPackage.shortLabel) === -1) {
				return false;
			}

			if (checkContentDelivery
				&& id !== "CONTENT_DELIVERY"
				&& rightPackage.shortLabel !== "LT"
				&& rightPackage.shortLabel !== "PR"
			) {
				if (rightPackage.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE") {
					if (deliveryViaLiveFeed) {
						if (!liveIncluded) {
							liveIncluded = true;
							return true;
						}
					}
					return false;
				}

				if (highlightIsDedicated && rightPackage.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT") {
					return false;
				}
			}

			return true;
		});
	}

	isMultipleValuesSelected = (id, rightsPackages) => {
		let custom = false;
		let selected;

		rightsPackages.forEach((rightsPackage) => {
			if (!rightsPackage.selectedRights) {
				return false;
			}

			let current = rightsPackage.selectedRights[id];

			switch (id) {
			case "RUNS":
				const rightLabel = nameToCustomValueConfig[id].key;
				const rightLabelCustom = nameToCustomValueConfig[id].value;

				if (current === rightLabel) {
					current = rightsPackage.selectedRights[rightLabelCustom];
				}
				break;
			default:
				break;
			}

			if (selected === undefined) {
				selected = current;
				return false;
			}

			if (Array.isArray(current) && Array.isArray(selected)) {
				current = [...current];
				current.sort();
				selected.sort();

				if (!isEqual(current, selected)) {
					custom = true;
					return true;
				}
			} else if (current !== selected) {
				custom = true;
				return true;
			}
		});

		return custom;
	};

	hasSelection = (id, value, superRights) => {
		const { checkContentDelivery } = this.props;

		let has = false;

		superRights.forEach((superRight) => {
			if (checkContentDelivery
				&& superRight.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE") {
				return false;
			}

			const selected = superRight.selectedRights[id];
			if (Array.isArray(selected)) {
				if (selected.indexOf(value) !== -1) has = true;
			} else if (selected === value) has = true;
		});

		return has;
	};

	renderModalRow = (rightPackage, name) => {
		const {
			multiple,
			options,
			id,
			productionLabel,
			rightsPackage,
		} = this.props;
		const { productionLabels } = this.state;
		const packagesAvailable = rightsPackage.map(rp => rp.shortLabel);

		return (
			<div className="row">
				<div
					className="column"
					style={{
						justifyContent: "flex-start",
						flex: 3,
					}}
				>
					{!productionLabel && rightPackage.name}
					{!name && productionLabel && productionLabels[(rightPackage.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT") ? "HL" : rightPackage.shortLabel]}
					{name && name}
				</div>
				{options.map((option, i, list) => {
					let flex = (list.length > 2) ? 2 : 3;
					let disabled = false;
					const definition = RightItemsDefinitions[option];
					if (RightItemsDefinitions[option].language) flex += 2;
					if (definition.hideIf && definition.hideIf.filter(sl => packagesAvailable.indexOf(sl) !== -1).length > 0) return null;
					if (definition.disabledIf && definition.disabledIf.indexOf(rightPackage.shortLabel) !== -1) disabled = true;

					return (
						<div className="column" style={{ flex }}>
							{multiple
							&& (
								<input
									checked={rightPackage.selectedRights[id].indexOf(option) !== -1}
									onChange={() => {
										this.updateMultipleSelection(option, id, rightPackage);
									}}
									type="checkbox"
									id={`${rightPackage.shortLabel}_${option}`}
								/>
							)}
							{multiple
							&& <label htmlFor={`${rightPackage.shortLabel}_${option}`} />}
							{!multiple
							&& (
								<input
									checked={rightPackage.selectedRights[id] === option}
									type="radio"
									className="ca-radio"
									disabled={disabled}
									onChange={(e) => {
										this.updateSelection(e.target.value, id, rightPackage);
									}}
									name={`${rightPackage.shortLabel}_${id}`}
									value={option}
								/>
							)}

							{option === "CONTENT_DELIVERY_DEDICATED" && rightPackage.shortLabel === "NA" && (
								<select
									value={rightPackage.selectedRights.CONTENT_DELIVERY_NA}
									style={{ marginLeft: 5 }}
									onChange={(e) => {
										this.updateSelection(e.target.value, "CONTENT_DELIVERY_NA", rightPackage);
									}}
								>
									<option disabled>Select</option>
									<option value="CONTENT_DELIVERY_NA_DEDICATED">dedicated delivery</option>
									<option value="CONTENT_DELIVERY_NA_HIGHLIGHT">
										delivered via highlight & clip
										footage


									</option>
								</select>
							)}

							{RightItemsDefinitions[option].language
							&& (
								<LanguageSelector
									placeholder={this.context.t("CL3_LANGUAGE_SELECTOR_PLACEHOLDER")}
									onChange={(value) => {
										this.updateSelection(value, `${id}_LANGUAGES`, rightPackage);
										this.updateSelection(option, id, rightPackage);
									}}
									value={rightPackage.selectedRights[`${id}_LANGUAGES`]}
								/>
							)}
							{RightItemsDefinitions[option].textField
							&& (
								<input
									onChange={(e) => {
										this.updateSelection(e.target.value, `${id}_TEXT`, rightPackage);
									}}
									value={rightPackage.selectedRights[`${id}_TEXT`]}
									className="text-field"
									type="text"
								/>
							)
							}
							{
								RightItemsDefinitions[option].numberField
								&& (
									<input
										className="text-field"
										style={numberFieldStyle}
										type="number"
										onChange={(e) => {
											this.updateSelection(e.target.value, this.getNumberFieldKey(RightItemsDefinitions[option], id), rightPackage);
										}}
										value={rightPackage.selectedRights[this.getNumberFieldKey(RightItemsDefinitions[option], id)]}
										min={0}
									/>
								)
							}
							{RightItemsDefinitions[option].bigTextField
							&& (
								<textarea style={{
									minHeight: "50px",
									margin: "5px 0px",
								}}
								/>
							)}
						</div>
					);
				})}
			</div>
		);
	};

	getNumberFieldKey(rightItemDefinition, id) {
		return rightItemDefinition.numberFieldValue || (`${id}_NUMBER`);
	}

	getPlaceholderMsg = () => {
		const { id, textAreaRequired, rightsPackage } = this.props;
		if (this.hasSelection(id, textAreaRequired, rightsPackage)) {
			let placeholder = "";
			switch (id) {
			case "BROADCASTING":
				placeholder = this.context.t("CL3_COMMENTS_TRANSMISSION_PLACEHOLDER");
				break;
			case "RESERVED_RIGHTS":
				placeholder = this.context.t("CL3_COMMENTS_RESERVED_PLACEHOLDER");
				break;
			case "EXPLOITATION_WINDOW":
				placeholder = this.context.t("CL3_COMMENTS_EXPLOITATION_WINDOW_PLACEHOLDER");
				break;
			default:
				placeholder = this.context.t("CL3_COMMENTS_PLACEHOLDER");
			}

			return placeholder;
		}

		return this.context.t("CL3_COMMENTS_PLACEHOLDER");
	};

	renderModal = () => {
		const {
			name,
			description,
			options, id, superRights, showTextArea, textAreaRequired, rightsPackage, technicalFee,
			checkContentDelivery,
			global,
			language,
			languages,
			onUpdateListing,
		} = this.props;

		const packagesAvailable = rightsPackage.map(rp => rp.shortLabel);
		const liveFeedPackages = rightsPackage.filter(rp => rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");
		const deliveryViaLiveFeed = liveFeedPackages.length > 0 && packagesAvailable.indexOf("LT") === -1;
		const highlightRight = rightsPackage.filter(rp => rp.shortLabel === "HL");
		const highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";

		return (
			<Modal
				isOpen={this.state.isOpen}
				bodyOpenClassName="selector"
				style={customStyles}
				onRequestClose={this.closePopupAndRestoreData}
			>

				<div className="modal-title">
					<i className="fa fa-edit" />
					{name}
					<i className="fa fa-times close-icon" onClick={this.closePopupAndRestoreData} />
				</div>

				{description && (
					<div style={{ padding: "0 20px 15px" }}>
						{description}
					</div>
				)}

				<div className="step-content">
					<div className="step-content-container">
						<div className="modal-table">
							<div className="row row-header">
								{!global && (
									<div
										className="column"
										style={{
											justifyContent: "flex-start",
											flex: 3,
										}}
									/>
								)}
								{global && language
								&& <div className="column" style={{ flex: 3 }}>Licensed languages</div>}
								{options.map((option, i, list) => {
									let flex = (list.length > 2) ? 2 : 3;

									const definition = RightItemsDefinitions[option];
									if (definition.language) flex += 2;
									const rightKeyPreffix = "RIGHTS_";
									const label = this.context.t(rightKeyPreffix + option);

									if (definition.hideIf && definition.hideIf.filter(sl => packagesAvailable.indexOf(sl) !== -1).length > 0) return null;

									return (
										<div className="column" style={{ flex }}>
											{label && label}
										</div>
									);
								})}
							</div>
							{global && language
							&& (
								<LanguageSelector
									placeholder={this.context.t("CL3_LICENSED_LANGUAGE_SELECTOR_PLACEHOLDER")}
									onChange={(value) => {
										onUpdateListing("LICENSED_LANGUAGES", value);
									}}
									value={languages}
								/>
							)}

							{deliveryViaLiveFeed
							&& checkContentDelivery
							&& id !== "CONTENT_DELIVERY"
							&& this.renderModalRow(liveFeedPackages[0], "Live Feed")
							}

							{!global && rightsPackage.map((rightPackage) => {
								if (superRights.length > 0 && superRights.indexOf(rightPackage.shortLabel) === -1) return;

								if (checkContentDelivery
									&& id !== "CONTENT_DELIVERY"
									&& (rightPackage.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
										|| (highlightIsDedicated && rightPackage.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"))
									&& rightPackage.shortLabel !== "LT"
									&& rightPackage.shortLabel !== "PR"
								) {
									return;
								}
								return this.renderModalRow(rightPackage);
							})}
							{showTextArea && (showTextArea === "ALL" || this.hasSelection(id, showTextArea, rightsPackage))
							&& (
								<textarea
									className={cn("popup-rights-text-area", {
										required: this.hasSelection(id, textAreaRequired, rightsPackage) && !rightsPackage[0].selectedRights[`${id}_TEXTAREA`],
									})}
									placeholder={this.getPlaceholderMsg()}
									onChange={(e) => {
										this.updateSelectionInAllPackages(e.target.value, `${id}_TEXTAREA`);
									}}
									value={rightsPackage[0].selectedRights[`${id}_TEXTAREA`]}
								/>
							)}

							{showTextArea && showTextArea === "FURTHER_DETAILS" && rightsPackage && rightsPackage.length > 0
							&& (
								<div style={{ padding: "0 15px" }}>
									<div style={{
										fontWeight: 600,
										padding: "15px 0 5px",
									}}
									>Further details
									</div>
									<textarea

										onChange={(e) => {
											this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE_DETAILS");
										}}
										value={rightsPackage[0].selectedRights.TECHNICAL_FEE_DETAILS}
									/>
								</div>
							)
							}

							{technicalFee && (
								<div style={{ padding: "0 15px" }}>
									<div style={{
										fontWeight: 600,
										padding: "15px 0 5px",
									}}
									>Technical fee
									</div>
									<div>
										<input
											style={{ width: "20px" }}
											defaultChecked={rightsPackage[0].selectedRights.TECHNICAL_FEE === "INCLUDED"}
											type="radio"
											className="ca-radio"
											value="INCLUDED"
											onChange={(e) => {
												this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE");
											}}
											name="TECHNICAL_FEE"
										/>
										{" "}
										{this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_1")}
									</div>
									<div>
										<input
											style={{ width: "20px" }}
											checked={rightsPackage[0].selectedRights.TECHNICAL_FEE === "ON_TOP"}
											type="radio"
											className="ca-radio"
											value="ON_TOP"
											onChange={(e) => {
												this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE");
											}}
											name="TECHNICAL_FEE"
										/>
										{" "}
										{this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_2")}
										<input
											style={{
												width: "70px",
												margin: "1px 10px",
											}}
											onChange={(e) => {
												this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE_PERCENTAGE");
											}}
											value={rightsPackage[0].selectedRights.TECHNICAL_FEE_PERCENTAGE}
											type="number"
											max={100}
											min={0}
											onFocus={() => {
												this.updateSelectionInAllPackages("ON_TOP", "TECHNICAL_FEE");
											}}
										/>
										{this.context.t("CL_STEP3_POPUP_TECHNICAL_FEE_3")}

									</div>
								</div>
							)}


						</div>
					</div>
				</div>

				<div className="buttons popup-buttons">
					<button
						className="cancel-button"
						onClick={this.closePopupAndRestoreData}
					>
						Cancel


					</button>
					<button
						disabled={!this.showOkButton()}
						className="standard-button"
						onClick={this.onOKClicked}
					>
						{this.context.t("MODAL_APPLY")}
					</button>
				</div>

			</Modal>
		);
	};

	showOkButton = () => {
		const {
			id, showTextArea, textAreaRequired, rightsPackage, global,
			language,
			languages,
		} = this.props;

		let response = true;

		if (global && language) {
			return languages.length > 0;
		}

		if (showTextArea) {
			if (showTextArea === "ALL" && this.hasSelection(id, textAreaRequired, rightsPackage)) {
				if (!rightsPackage[0].selectedRights[`${id}_TEXTAREA`] || rightsPackage[0].selectedRights[`${id}_TEXTAREA`] === "") return false;
			}
		}

		if (rightsPackage && rightsPackage[0] && rightsPackage[0].selectedRights) {
			rightsPackage.forEach((right) => {
				if (RightItemsDefinitions[right.selectedRights[id]]
					&& RightItemsDefinitions[right.selectedRights[id]].language) {
					if (!right.selectedRights[`${id}_LANGUAGES`]
						|| right.selectedRights[`${id}_LANGUAGES`].length === 0) {
						response = false;
					}
				}
			});

			rightsPackage.forEach((right) => {
				if (RightItemsDefinitions[right.selectedRights[id]]
					&& RightItemsDefinitions[right.selectedRights[id]].textField) {
					if (!right.selectedRights[`${id}_TEXT`]
						|| right.selectedRights[`${id}_TEXT`].length === 0) {
						response = false;
					}
				}
			});

			rightsPackage.forEach((right) => {
				if (RightItemsDefinitions[right.selectedRights[id]]
					&& RightItemsDefinitions[right.selectedRights[id]].numberField) {
					const numberKey = this.getNumberFieldKey(RightItemsDefinitions[right.selectedRights[id]], id);
					const numberString = right.selectedRights[numberKey];
					const number = numberString ? toNumber(numberString) : null;

					if (!number || !isFinite(number) || number < 0) {
						response = false;
					}
				}
			});
		}
		return response;
	};

	render() {
		const {
			name,
			rightsPackage,
			programName,
			languages,
			disabled,
			contentDeliveryConfigured,
			validation,
		} = this.props;
		const { id } = this.props;

		const rightsPackageFiltered = this.filterRightsPackage(id, rightsPackage);

		const isMultipleValuesSelected = this.isMultipleValuesSelected(id, rightsPackageFiltered);
		let displayedValue = "";


		if (rightsPackageFiltered.length > 0) {
			const firstPackage = rightsPackageFiltered[0];
			const currentRights = firstPackage.selectedRights[id];
			const getCurrentCustomValueString = getCustomValueString.bind(null, firstPackage, currentRights, RightItemsDefinitions, this.context);

			switch (id) {
			case "PROGRAM":
				displayedValue = programName;
				break;
			case "LICENSED_LANGUAGES":
				displayedValue = getLanguagesString(languages);
				break;
			case "CAMERA":
				displayedValue = getCurrentCustomValueString(id, value => `Minimum cameras: ${value}`);
				break;
			case "RUNS":
				displayedValue = getCurrentCustomValueString(id, value => `${value} Runs`);
				break;
			case "ASPECT_RATIO":
				displayedValue = getCurrentCustomValueString(id, value => `${value}`);
				break;
			case "COMMENTARY":
				displayedValue = getCurrentCustomValueString(id, value => getLanguagesString(value));
				break;
			case "GRAPHICS":
				displayedValue = getCurrentCustomValueString(id, value => getLanguagesString(value));
				break;
			default:
				if (firstPackage.selectedRights) {
					const isSingleLabel = !Array.isArray(currentRights);
					const suffix = "RIGHTS_";
					if (isSingleLabel) {
						displayedValue = this.context.t(suffix + currentRights);
					} else {
						displayedValue = currentRights.map(item => this.context.t(suffix + item))
							.join(", ");
					}
				}
			}
		}

		const value = (isMultipleValuesSelected) ? "Multiple values selected" : displayedValue;
		const isCommentAdded = rightsPackage[0].selectedRights[`${id}_TEXTAREA`];
		const isContentDeliveryInvalid = id === "CONTENT_DELIVERY" && !contentDeliveryConfigured && !disabled && validation;

		return (
			<div className={cn("base-input", { disabled })} style={{ width: "49%" }}>
				<label>{name}</label>
				<div
					className={`display-label ${isContentDeliveryInvalid ? "is-invalid" : ""} `}
					onClick={this.togglePopup}
				>
					{isContentDeliveryInvalid ? (
						this.context.t("CONTENT_DELIVERY_EMPTY")
					) : (
						value || "Select"
					)}
				</div>
				{isCommentAdded && (
					<img src={commentIcon} alt="" className="comment-icon" />
				)}
				<i className="fa fa-edit" onClick={this.togglePopup} />
				{this.renderModal()}
			</div>
		);
	}
}

PopupRight.contextTypes = {
	t: PropTypes.func.isRequired,
};
export default PopupRight;
