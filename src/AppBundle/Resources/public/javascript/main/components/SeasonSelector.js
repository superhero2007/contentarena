import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { DATE_FORMAT } from "@constants";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import NewFixture from "./NewFixture";
import { getSeasonDateString } from "../../common/utils/listing";

const RemoveSeasonButton = ({ onRemove }) => (
	<div
		onClick={onRemove}
		style={{
			color: "red",
			marginRight: "-34px",
			width: "50px",
			lineHeight: "35px",
			fontSize: "20px",
			textAlign: "center",
			cursor: "pointer",
		}}
	>
		<i className="fa fa-close" />
	</div>
);

class SeasonSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(props) {
		const {
			updateFromMultiple, index, season, seasons,
		} = props;
		const activeSeason = seasons[season];

		if (!activeSeason) return;

		const {
			realEndDate, realStartDate,
		} = this.getRealDate(activeSeason);

		const newEndDate = moment(realEndDate).utc().format();
		const newStartDate = moment(realStartDate).utc().format();

		if (this.isAdminSeason(activeSeason)) {
			if (!activeSeason.customEndDate) updateFromMultiple("seasons", index, "customEndDate", newEndDate);
			if (!activeSeason.customStartDate) updateFromMultiple("seasons", index, "customStartDate", newStartDate);
		}
	}

	isAdminSeason = activeSeason => activeSeason && activeSeason.externalId && activeSeason.externalId.startsWith("ca:") && !activeSeason.custom;

	getActiveSeason = () => {
		const { season, seasons } = this.props;
		return seasons[season];
	};

	toggle = () => {
		const { updateFromMultiple, seasons, index } = this.props;
		updateFromMultiple("seasons", index, "showSchedule", !seasons[index].showSchedule);
	};

	addFixture = () => {
		const { updateFromMultiple, seasons, index } = this.props;
		const fixtures = seasons[index].fixtures || [];
		updateFromMultiple("seasons", index, "fixtures", [...fixtures, { name: "" }]);
	};

	onChangeFixture = (i, value) => {
		const { updateFromMultiple, seasons, index } = this.props;
		const { fixtures } = seasons[index];

		fixtures[i].name = value;
		updateFromMultiple("seasons", index, "fixtures", fixtures);
	};

	onChangeFixtureDate = (i, value) => {
		const { updateFromMultiple, seasons, index } = this.props;
		const { fixtures } = seasons[index];

		fixtures[i].date = value;
		updateFromMultiple("seasons", index, "fixtures", fixtures);
	};

	removeFixture = (i) => {
		const { updateFromMultiple, seasons, index } = this.props;
		const fixtures = seasons[index].fixtures || [];
		fixtures.splice(i, 1);
		updateFromMultiple("seasons", index, "fixtures", fixtures);
	};

	getYears = (year) => {
		const currentYear = moment().year();
		const years = [];

		const startYear = year || currentYear;

		for (let i = startYear - 5; i < currentYear + 10; i++) {
			years.push(i);
		}
		return years;
	};

	getMonths = () => Array.apply(0, Array(12)).map((_, i) => moment().month(i).utc().format("MMM"));

	handleSeasonStartChange = (e, type) => {
		const {
			index,
		} = this.props;
		const activeSeason = this.getActiveSeason();
		const {
			realStartDate,
		} = this.getRealDate(activeSeason);

		let startMonth = moment(realStartDate).utc().format("MMM");
		let startYear = moment(realStartDate).utc().format("YYYY");

		if (type === "YEAR") {
			startYear = e.target.value;
		}
		if (type === "MONTH") {
			startMonth = e.target.value;
		}

		const newStartDate = moment().year(+startYear).month(startMonth).date(1)
			.utc()
			.format();
		this.props.updateFromMultiple("seasons", index, "customStartDate", newStartDate);
	};

	handleSeasonEndChange = (e, type) => {
		const {
			index, season, seasons,
		} = this.props;
		const activeSeason = seasons[season];
		const {
			realEndDate,
		} = this.getRealDate(activeSeason);

		let endMonth = moment(realEndDate).utc().format("MMM");
		let endYear = moment(realEndDate).utc().format("YYYY");

		if (type === "YEAR") {
			endYear = e.target.value;
		}
		if (type === "MONTH") {
			endMonth = e.target.value;
		}

		const newEndDate = moment().year(+endYear).month(endMonth).date(1)
			.utc()
			.format();
		this.props.updateFromMultiple("seasons", index, "customEndDate", newEndDate);
	};

	getYearsData = (year) => {
		if (year) {
			const yearsData = year.split("/");
			if (yearsData.length > 1) {
				return {
					startYear: `20${yearsData[0]}`,
					endYear: `20${yearsData[1]}`,
				};
			}
			return {
				startYear: yearsData[0],
			};
		}
		return {
			startYear: "",
			endYear: "",
		};
	};

	getRealDate = (activeSeason) => {
		const {
			startDate, endDate, customStartDate, customEndDate, year, custom, externalId,
		} = activeSeason;

		const { tournament } = this.props;

		const { scheduled, scheduledEnd } = tournament.length > 0 && tournament[0];
		const { startYear, endYear } = this.getYearsData(year);

		const realStartDate = customStartDate || startDate || startYear || scheduled;
		const realEndDate = customEndDate || endDate || endYear || scheduledEnd;

		const isDisabledStartYear = ((startDate || startYear) && !custom) || scheduled || externalId && startDate;
		const isDisabledEndYear = ((endDate || endYear) && !custom) || scheduledEnd || externalId && endDate;

		return {
			realStartDate,
			realEndDate,
			isDisabledStartYear,
			isDisabledEndYear,
		};
	};

	getDateString = (activeSeason) => {
		if (!activeSeason) {
			return "";
		}
		const { realStartDate, realEndDate } = this.getRealDate(activeSeason);
		return getSeasonDateString({
			startDate: realStartDate,
			endDate: realEndDate,
		});
	};

	render() {
		const {
			index, season, seasons, validation, removeSeason, showClose,
		} = this.props;
		const activeSeason = seasons[season];
		const dateString = this.getDateString(activeSeason);

		return (
			<div className="base-container">
				{!this.props.isCustom && (
					<div className="base-input">
						<label>
							{this.context.t("CL_STEP1_LABEL_SEASON")}
						</label>
						<input
							type="text"
							value={this.props.value || ""}
							readOnly
							disabled={this.props.loading}
							onClick={this.props.openSelector}
							placeholder={this.context.t("Season")}
						/>
						{dateString && (
							<span style={{
								position: "absolute",
								top: "6px",
								right: "10px",
							}}
							>
								{dateString}
							</span>
						)}

						{showClose && <RemoveSeasonButton onRemove={removeSeason} />}
					</div>
				)}

				{this.props.isCustom && activeSeason && (
					<div className="base-input">
						<label>
							{this.context.t("CL_STEP1_LABEL_SEASON")}
						</label>
						<input
							type="text"
							value={this.props.value || ""}
							placeholder={this.context.t("Season")}
							onChange={(e) => {
								this.props.updateFromMultiple("seasons", index, "name", e.target.value);
							}}
						/>
						{dateString && (
							<span style={{
								position: "absolute",
								top: "6px",
								right: "10px",
							}}
							>
								{dateString}
							</span>
						)}
						<RemoveSeasonButton onRemove={removeSeason} />
					</div>
				)}

				<div className="season-duration">
					{this.renderSeason(activeSeason)}
				</div>

				{activeSeason && (
					<div className="step-item-description d-flex justify-content-end text-right align-items-center">
						<div style={{ marginRight: 15 }}>
							{this.context.t("Would you like to add specific fixture details to your listing? This is especially important if you sell single matches (e.g. friendly matches) or rounds.")}
						</div>
						<button
							className="standard-button link-button"
							onClick={this.addFixture}
							style={{ minWidth: 200 }}
						>
							{this.context.t("CL_STEP1_ADD_FIXTURES")}
						</button>
					</div>
				)}

				{activeSeason && activeSeason.fixtures && activeSeason.fixtures.length > 0 && (
					<div className="base-input fixture-wrapper">
						{activeSeason.fixtures.map((fixture, i, list) => (
							<NewFixture
								key={i}
								id={i}
								onAdd={this.addFixture}
								value={fixture.name}
								date={fixture.date}
								handleDate={e => this.onChangeFixtureDate(i, e)}
								onChange={e => this.onChangeFixture(i, e.target.value)}
								onRemove={() => this.removeFixture(i)}
								showAdd={i === list.length - 1}
								isInvalid={!fixture.name && validation}
							/>
						))}
					</div>
				)}
				{this.props.showAddNew && (
					<div className="step-item-description d-flex justify-content-end text-right align-items-center">
						<div style={{ marginRight: 15 }}>
							{this.context.t("CL_STEP1_ADD_SEASON_BUTTON_DESCRIPTION")}
						</div>
						<button
							className="standard-button link-button"
							onClick={this.props.addSeason}
							style={{ minWidth: 200 }}
						>
							{this.context.t("CL_STEP1_ADD_SEASON")}
						</button>
					</div>
				)}
			</div>
		);
	}

	renderSeason = (activeSeason) => {
		if (!activeSeason) {
			return null;
		}
		const { startDate, endDate, custom } = activeSeason;
		const {
			realStartDate, realEndDate, isDisabledStartYear, isDisabledEndYear,
		} = this.getRealDate(activeSeason);

		const startYear = realStartDate ? moment(realStartDate).utc().format("YYYY") : "";
		const startMonth = realStartDate ? moment(realStartDate).utc().format("MMM") : "";

		const endYear = realEndDate ? moment(realEndDate).utc().format("YYYY") : "";
		const endMonth = realEndDate ? moment(realEndDate).utc().format("MMM") : "";

		return (
			<>
				<label>
					From {" "}
				</label>
				<select
					value={startMonth}
					className="ca-form-control"
					onChange={e => this.handleSeasonStartChange(e, "MONTH")}
					disabled={!!startDate && !custom}
				>
					<option value="" disabled>
						Month
					</option>
					{this.getMonths().map(month => (
						<option value={month} key={month}>
							{month}
						</option>
					))}
				</select>
				<select
					value={startYear}
					onChange={e => this.handleSeasonStartChange(e, "YEAR")}
					className="ca-form-control"
					disabled={isDisabledStartYear}
				>
					<option value="" disabled>
						Year
					</option>
					{this.getYears(startYear).map(year => (
						<option value={year} key={year}>
							{year}
						</option>
					))}
				</select>
				<label>
					To {" "}
				</label>
				<select
					value={endMonth}
					onChange={e => this.handleSeasonEndChange(e, "MONTH")}
					className="ca-form-control"
					disabled={!!endDate && !custom}
				>
					<option value="" disabled>
						Month
					</option>
					{this.getMonths().map(month => (
						<option value={month} key={month}>
							{month}
						</option>
					))}
				</select>
				<select
					value={endYear}
					onChange={e => this.handleSeasonEndChange(e, "YEAR")}
					className="ca-form-control"
					disabled={isDisabledEndYear}
				>
					<option value="" disabled>
						Year
					</option>
					{this.getYears().map(year => (
						<option value={year} key={year}>
							{year}
						</option>
					))}
				</select>

			</>
		);
	}
}

SeasonSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

NewFixture.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	updateFromMultiple: (type, index, key, value) => dispatch({
		type: "UPDATE_FROM_MULTIPLE",
		selectorType: type,
		index,
		key,
		value,
	}),
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),

});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SeasonSelector);
