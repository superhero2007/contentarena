import React from "react";
import DatePicker from "@components/DatePicker";
import moment from "moment";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { DATE_FORMAT } from "@constants";
import Translate from "@components/Translator/Translate";
import { customStyles } from "../../main/styles/custom";

class LicenseDateSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			startDate: props.startDate,
			endDate: props.endDate,
			endDateLimit: props.endDateLimit,
			startDateMode: props.startDateMode,
			endDateMode: props.endDateMode,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isOpen: nextProps.isOpen,
			startDate: nextProps.startDate,
			endDate: nextProps.endDate,
			endDateLimit: nextProps.endDateLimit,
			startDateMode: nextProps.startDateMode,
			endDateMode: nextProps.endDateMode,
		});
	}

	handleStartDate = (date) => {
		this.onDataChange("startDate", date);
		this.onDataChange("endDate", null);
	};

	handleEndDate = (date) => {
		this.onDataChange("endDate", date);
	};

	handleEndDateLimit = (e) => {
		this.onDataChange("endDateLimit", e.target.value);
	};

	render() {
		const { onClose } = this.props;
		const {
			startDate, endDate, endDateLimit, startDateMode, endDateMode,
		} = this.state;
		const saveButtonTooltip = <Translate i18nKey={this.getSaveButtonTooltip()} />;

		return (
			<Modal
				isOpen={this.state.isOpen}
				bodyOpenClassName="selector"
				style={customStyles}
				onRequestClose={onClose}
			>

				<div className="modal-title">
					<i className="fa fa-edit" />
					<Translate i18nKey="license period" />
					<i className="fa fa-times close-icon" onClick={onClose} />
				</div>
				<div style={{ padding: "0 20px 15px" }}>
					<Translate i18nKey="CL3_EDIT_LICENSE_PERIOD_DESCRIPTION" />
				</div>

				<div className="step-content step-content-custom">
					<div className="step-content-container">
						<div className="modal-input">
							<label>
								<Translate i18nKey="CL_STEP3_LICENSE_POPUP_START" />
							</label>
							<div className="row">
								<div className="column">
									<input
										type="radio"
										checked={startDateMode === "LICENSE"}
										onChange={() => {
											this.onDataChange("startDateMode", "LICENSE");
										}}
										id="license-start-contract"
										className="ca-radio package-selector"
									/>
									<span onClick={() => {
										this.onDataChange("startDateMode", "LICENSE");
									}}
									>
										<Translate i18nKey="CL_STEP3_LICENSE_POPUP_START_CONCLUSION" />
									</span>
								</div>
								<div
									className="column"
									onClick={() => {
										this.onDataChange("startDateMode", "DATE");
									}}
								>
									<input
										type="radio"
										checked={startDateMode === "DATE"}
										onChange={() => {
											this.onDataChange("startDateMode", "DATE");
										}}
										id="license-start"
										className="ca-radio package-selector"
									/>

									<DatePicker
										className="date-picker"
										selected={(startDate) ? moment(startDate) : undefined}
										disabled={startDateMode !== "DATE"}
										onChange={this.handleStartDate}
										placeholderText={DATE_FORMAT.toLowerCase()}
										dateFormat={DATE_FORMAT}
									/>
								</div>
							</div>
						</div>
						<div className="modal-input">
							<label>
								<Translate i18nKey="CL_STEP3_LICENSE_POPUP_END" />
							</label>
							<div className="row">
								<div
									className="column"
									onClick={() => {
										this.onDataChange("endDateMode", "LIMITED");
									}}
								>
									<input
										type="radio"
										checked={endDateMode === "LIMITED"}
										onChange={() => {
											this.onDataChange("endDateMode", "LIMITED");
										}}
										id="license-end-input"
										className="ca-radio package-selector"
									/>
									<input
										type="number"
										disabled={endDateMode !== "LIMITED"}
										value={endDateLimit}
										onChange={this.handleEndDateLimit}
										placeholder="Enter number"
									/>
									<span className="small-label">
										<Translate i18nKey="LISTING_DETAILS_LICENSE_END_DAYS" />
									</span>
								</div>
								<div
									className="column"
									onClick={() => {
										this.onDataChange("endDateMode", "DATE");
									}}
								>
									<input
										type="radio"
										checked={endDateMode === "DATE"}
										onChange={() => {
											this.onDataChange("endDateMode", "DATE");
										}}
										id="license-end"
										className="ca-radio package-selector"
									/>
									<DatePicker
										className="date-picker"
										minDate={startDateMode !== "DATE" ? moment() : moment(startDate)}
										selected={(endDate) ? moment(endDate) : undefined}
										disabled={endDateMode !== "DATE"}
										onChange={this.handleEndDate}
										dateFormat={DATE_FORMAT}
										placeholderText={DATE_FORMAT.toLowerCase()}
									/>
								</div>
								<div className="column">
									<input
										type="radio"
										checked={endDateMode === "UNLIMITED"}
										onChange={() => {
											this.onDataChange("endDateMode", "UNLIMITED");
										}}
										id="license-end-unlimited"
										className="ca-radio package-selector"
									/>
									<span
										style={{ padding: "12px 0" }}
										onClick={() => {
											this.onDataChange("endDateMode", "UNLIMITED");
										}}
									>
										<Translate i18nKey="Unlimited" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="buttons popup-buttons">
					<button
						title={saveButtonTooltip}
						disabled={!!saveButtonTooltip}
						className="standard-button"
						onClick={this.onOKClick}
					>
						<Translate i18nKey="MODAL_APPLY" />
					</button>
				</div>

			</Modal>
		);
	}

	getSaveButtonTooltip() {
		const {
			startDate, endDate, endDateLimit, startDateMode, endDateMode,
		} = this.state;

		if (startDateMode === "DATE" && (!startDate || !moment(startDate).isValid())) {
			return "Please specify correct date for Start of license period";
		}

		if (endDateMode === "DATE" && ((!endDate || !moment(endDate).isValid()) || endDate.isBefore(startDate))) {
			return "Please specify correct date for End of license period";
		}

		if (endDateMode === "LIMITED" && (!endDateLimit || isNaN(endDateLimit) || endDateLimit < 1)) {
			return "Please specify correct days limit for End of license period";
		}

		if (!endDateMode) {
			return "Please specify End of license period";
		}
	}

	onOKClick = () => {
		const { onClose, onUpdate } = this.props;
		const {
			startDate, endDate, endDateLimit, startDateMode, endDateMode,
		} = this.state;

		onUpdate("startDate", startDate);
		onUpdate("endDate", endDate);
		onUpdate("endDateLimit", endDateLimit);
		onUpdate("startDateMode", startDateMode);
		onUpdate("endDateMode", endDateMode);

		onClose();
	};

	onDataChange(name, value) {
		this.setState({
			[name]: value,
		});
	}
}

LicenseDateSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default LicenseDateSelector;
