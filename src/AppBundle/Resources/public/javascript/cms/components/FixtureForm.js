import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import DatePicker from "@components/DatePicker";
import TimezonePicker from "react-timezone";
import Translate from "@components/Translator/Translate";
import { DATE_FORMAT, TIME_FORMAT, TIME_ZONE } from "../../common/constants";

class FixtureForm extends React.Component {
	constructor(props) {
		super(props);

		const {
			fixture = {},
		} = props;

		this.state = {
			name: fixture.name || "",
			round: fixture.round || "",
			date: fixture.date || null,
			time: fixture.time || null,
			timezone: fixture.timezone || null,
		};
	}

	componentWillReceiveProps(props) {
		if (!props.fixture) return;

		const {
			name, round, date, time, timezone, id,
		} = props.fixture;
		this.setState({
			name,
			round,
			date: (date) ? Moment(date) : null,
			time,
			timezone,
			id,
		});
	}

	create = () => {
		const {
			name, round, date, time, timezone, id,
		} = this.state;

		if (id) {
			this.props.onUpdate({
				name, round, date, time, timezone, id,
			});
		} else {
			this.props.onCreate({
				name, round, date, time, timezone,
			});
		}

		this.reset();
	};

	reset = () => {
		this.setState({
			name: "",
			round: "",
			date: null,
			time: null,
			timezone: null,
			id: null,
		});
	};

	handleStartDate = (value) => {
		this.setState({ date: value });
	};

	handleStartTime = (value) => {
		this.setState({ time: value.format(TIME_FORMAT) });
	};

	applyIsDisabled = () => {
		const {
			name,
		} = this.state;

		return name === "";
	};

	removeIsDisabled = () => {
		const {
			name,
			round,
			date,
			time,
			timezone,
		} = this.state;

		return name === ""
			&& round === ""
			&& date === null
			&& time === null
			&& timezone === null;
	};

	render() {
		const {
			name,
			round,
			date,
			time,
			timezone,
		} = this.state;

		const timeObj = (time) ? Moment(time, TIME_FORMAT) : null;

		return (
			<>
				<section className="fixture-item-wrapper no-border">
					<div className="fixture-item-round">
						<input
							value={round}
							placeholder={this.context.t("CMS_FIXTURE_PLACEHOLDER_ROUND")}
							onChange={(e) => {
								this.setState({ round: e.target.value });
							}}
						/>
					</div>
					<div className="fixture-item-name">
						<input
							value={name}
							placeholder={this.context.t("CMS_FIXTURE_PLACEHOLDER_NAME")}
							onChange={(e) => {
								this.setState({ name: e.target.value });
							}}
						/>
					</div>
					<div className="fixture-item-date">
						<DatePicker
							className="date-picker"
							selected={date}
							onChange={this.handleStartDate}
							minDate={Moment()}
							dateFormat={DATE_FORMAT}
							placeholderText={DATE_FORMAT.toLowerCase()}
						/>
					</div>
					<div className="fixture-item-time">
						<DatePicker
							className="date-picker"
							selected={timeObj}
							onChange={this.handleStartTime}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={5}
							minDate={Moment()}
							dateFormat={TIME_FORMAT}
							placeholderText={TIME_FORMAT.toLowerCase()}
							timeCaption="Select Time"
						/>
					</div>
					<div className="fixture-item-timezone">
						<TimezonePicker
							value={timezone}
							onChange={timezone => this.setState({ timezone })}
							inputProps={{
								placeholder: "Select Timezone...",
								name: "timezone",
							}}
						/>
					</div>

					<div className="fixture-item-actions">
						{this.removeIsDisabled() && (
							<span className="remove-icon disabled">
								<i className="fa fa-times-circle" />
							</span>
						)}

						{!this.removeIsDisabled() && (
							<span className="remove-icon" onClick={this.reset}>
								<i className="fa fa-times-circle" />
							</span>
						)}

						{this.applyIsDisabled() && (
							<span className="confirm-icon disabled">
								<i className="fa fa-check-circle" />
							</span>
						)}

						{!this.applyIsDisabled() && (
							<span className="confirm-icon" onClick={this.create}>
								<i className="fa fa-check-circle" />
							</span>
						)}
					</div>


				</section>

			</>
		);
	}
}

FixtureForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default FixtureForm;
