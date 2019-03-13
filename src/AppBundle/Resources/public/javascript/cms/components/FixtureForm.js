import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import DatePicker from "@components/DatePicker";
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
		};
	}

	create = () => {
		const {
			name,
			round,
			date,
		} = this.state;

		this.props.onUpdate({ name, round, date });
	};

	handleStartDate = (value) => {
		this.setState({ date: value });
	};

	applyIsDisabled = () => {
		const {
			name,
			round,
			date,
		} = this.state;

		return name === "" || round === "" || date === null;
	};

	render() {
		const {
			name,
			round,
			date,
		} = this.state;

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
							selected={date}
							onChange={this.handleStartDate}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={5}
							minDate={Moment()}
							dateFormat={TIME_FORMAT}
							placeholderText={TIME_FORMAT.toLowerCase()}
							timeCaption="Select Time"
						/>
					</div>
					<div className="fixture-item-actions">
						{TIME_ZONE}
					</div>
				</section>
				<button
					className="ca-btn primary"
					onClick={this.create}
					disabled={this.applyIsDisabled()}
				>
					{this.context.t("CMS_EMPTY_FIXTURE_CREATE_APPLY")}
				</button>
			</>
		);
	}
}

FixtureForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default FixtureForm;
