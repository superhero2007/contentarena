import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import DatePicker from "@components/DatePicker";
import TimezonePicker from "react-timezone";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { DATE_FORMAT, TIME_FORMAT, TIME_ZONE } from "../../common/constants";

class FixtureForm extends React.Component {
	constructor(props) {
		super(props);

		const {
			fixture = {},
		} = props;

		this.state = {
			id: fixture.id || null,
			name: fixture.name || "",
			round: fixture.round || "",
			date: fixture.date || null,
			time: fixture.time || null,
			timezone: fixture.timezone || null,
			saving: props.saving,
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			saving: props.saving,
		});

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
			this.setState({ saving: true });
		} else {
			this.props.onCreate({
				name, round, date, time, timezone,
			});
		}

		if (!this.props.editMode) this.reset();
	};

	reset = () => this.setState({
		name: "", round: "", date: null, time: null, timezone: null, id: null,
	});

	handleStartDate = value => this.setState({ date: value });

	handleStartTime = value => this.setState({ time: value.format(TIME_FORMAT) });

	applyIsDisabled = () => this.state.name === "";

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
			saving,
		} = this.state;

		const { editMode } = this.props;

		const dateObj = (date) ? Moment(date) : null;
		const timeObj = (time) ? Moment(time, TIME_FORMAT) : null;

		return (
			<>
				<section className="fixture-item-wrapper no-border">
					<div className="fixture-item-round" style={{ width: "calc(30% + 40px)" }}>
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
							selected={dateObj}
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

						{saving && <Loader xSmall loading />}

						{this.removeIsDisabled() && !saving && !editMode && (
							<span className="remove-icon disabled">
								<i className="icon-remove" />
							</span>
						)}

						{!this.removeIsDisabled() && !saving && !editMode && (
							<span className="remove-icon" onClick={this.reset}>
								<i className="icon-remove" />
							</span>
						)}

						{!saving && editMode && (
							<span className="remove-icon" onClick={this.props.onCancel}>
								<i className="icon-remove" />
							</span>
						)}

						{this.applyIsDisabled() && !saving && (
							<span className="confirm-icon disabled">
								<i className="icon-check" />
							</span>
						)}

						{!this.applyIsDisabled() && !saving && (
							<span className="confirm-icon" onClick={this.create}>
								<i className="icon-check" />
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
