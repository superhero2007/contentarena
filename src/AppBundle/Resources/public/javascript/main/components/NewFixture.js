import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "@components/DatePicker";
import moment from "moment/moment";
import { DATE_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "@constants";
import { formatMomentToServerFormat } from "@utils/time";
import Translate from "@components/Translator/Translate";
import { addIcon, cancelIcon } from "./Icons";
import { formatMomentToServerTime } from "../../common/utils/time";

class NewFixture extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDatePickerEnabled: !!props.date,
			isDatePickerWithTimeEnabled: props.date ? isStartOfTheDay(props.date) : false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { isDatePickerEnabled } = this.state;

		if (nextProps.date && !isDatePickerEnabled) {
			this.setState({
				isDatePickerEnabled: true,
				isDatePickerWithTimeEnabled: isStartOfTheDay(nextProps.date),
			});
		}
	}

	enablePicker = (type) => {
		const { id } = this.props;
		this.setState({ [type]: true });
		setTimeout(() => jQuery(`.date-picker.id${id}`)
			.focus(), 100);
	};

	onDateSelected = (e) => {
		const { handleDate, handleTime } = this.props;
		const { isDatePickerWithTimeEnabled } = this.state;
		const formatted = formatMomentToServerFormat(e);
		handleDate(formatted);

		if (isDatePickerWithTimeEnabled) {
			const formattedTime = formatMomentToServerTime(e);
			handleTime(formattedTime);
		}
	};

	handleDateChangeRaw = (e) => {
		e.preventDefault();
	};

	handleBegDateBlur = (e) => {
		if (e === undefined) return;

		const { handleDate } = this.props;
		const date = moment(e.target.value, DATE_TIME_FORMAT);

		if (date.isValid()) {
			handleDate(date);
		}
	};

	render() {
		const {
			onRemove, onAdd, onChange, value, showAdd, id, date, isInvalid, time,
		} = this.props;
		const { isDatePickerEnabled, isDatePickerWithTimeEnabled } = this.state;

		const selectedDate = (date) ? moment(date) : undefined;

		if (time) {
			const timeObj = moment(time, "HH:mm");

			selectedDate.set({
				hour: timeObj.get("hour"),
				minute: timeObj.get("minute"),
			});
		}

		return (
			<div className="fixture-item">
				<div className="fixture-row">
					<label>
						<Translate i18nKey="Fixture" />
					</label>
					<input
						className={`new-fixture ${isInvalid ? "is-invalid" : ""}`}
						type="text"
						placeholder={isInvalid ? this.context.t("FIXTURE_NAME_EMPTY") : this.context.t("Enter Fixture")}
						onChange={onChange}
						value={value}
					/>

					<div className="fixture-actions">
						{showAdd && (
						    <img src={addIcon} onClick={onAdd} alt="" />
						)}
						<img src={cancelIcon} onClick={onRemove} alt="" />
					</div>
				</div>

				<div className="fixture-row select-date-time-wrapper">
					{isDatePickerEnabled ? (
						<div className="datepicker-wrapper">
							{!isDatePickerWithTimeEnabled && (
								<a
									className="ca-link text-nowrap add-time"
									onClick={() => this.enablePicker("isDatePickerWithTimeEnabled")}
								>
									<Translate i18nKey="Add Time" />
								</a>
							)}

							<DatePicker
								className={`date-picker id${id}`}
								selected={selectedDate}
								onChange={this.onDateSelected}
								timeIntervals={15}
								dateFormat={isDatePickerWithTimeEnabled ? `${DATE_TIME_FORMAT} [UTC]` : DATE_FORMAT}
								placeholderText={isDatePickerWithTimeEnabled ? `${DATE_TIME_FORMAT}` : DATE_FORMAT}
								timeFormat={TIME_FORMAT}
								showTimeSelect={isDatePickerWithTimeEnabled}
								onChangeRaw={undefined}
								onBlur={this.handleBegDateBlur}
							/>

							{!isDatePickerWithTimeEnabled && (
								<a
									className="ca-link text-nowrap"
									onClick={() => this.enablePicker("isDatePickerWithTimeEnabled")}
									style={{ marginLeft: 10 }}
								>
									<Translate i18nKey="Add Time" />
								</a>
							)}
						</div>
					) : (
						<a className="ca-link text-nowrap" onClick={() => this.enablePicker("isDatePickerEnabled")}>
							<Translate i18nKey="Add date" />
						</a>
					)}
				</div>
			</div>
		);
	}
}

const isStartOfTheDay = date => moment(date)
	.startOf("day")
	.valueOf() !== moment(date)
	.valueOf();

NewFixture.contextTypes = {
	t: PropTypes.func.isRequired,
};
NewFixture.propTypes = {};
NewFixture.defaultProps = {};

export default NewFixture;
