import React from "react";
import { connect } from "react-redux";
import { SeasonYear } from "@utils/listing";
import { setCustomSeasonName, setSeasons, updateCustomSeason } from "../actions/propertyActions";
import cn from "classnames";
import { getMonths, getYears } from "@utils/time";
import moment from "moment/moment";
import Translate from "@components/Translator/Translate";
import { DATE_FORMAT, SERVER_DATE_FORMAT } from "@constants";

const RemoveSeason = ({ onClick }) => (
	<span className="remove-season" onClick={onClick}>
		<i className="fa fa-minus-circle" />
		<Translate i18nKey="CMS_FORM_REMOVE_SEASON" />
	</span>
);

const AddSeason = ({ onClick }) => (
	<span className="add-season" onClick={onClick}>
		<i className="fa fa-plus-circle" />
		<Translate i18nKey="CMS_FORM_ADD_SEASON" />
	</span>
);

class CmsCustomSeason extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	handleSeasonDateChange = (index, e, dateType, type, season) => {
		const { tournament } = this.props;
		let year;
		let month;
		const tournamentName = (tournament && tournament.length > 0) ? tournament[0].name : null;

		if (dateType === "YEAR") {
			year = e.target.value;
		} else {
			month = e.target.value;
		}

		if (!year) {
			year = ((season[type]) ? moment(season[type]) : moment.utc()).format("YYYY");
		}

		if (!month) {
			month = (season[type]) ? moment(season[type]).format("MMM") : "Jan";
		}

		const theDate = moment(new Date(`${year}-${month}-01`)).utc().format(SERVER_DATE_FORMAT);
		this.props.updateCustomSeason(index, type, theDate);
		const finalYear = this.getCustomSeasonYear(season, year, type);
		this.props.updateCustomSeason(index, "year", finalYear);
		const seasonName = this.getCustomSeasonName(season, year, month, type, tournamentName);
		this.props.setCustomSeasonName(index, seasonName);
	};

	getCustomSeasonYear = (season, year, type) => {
		const startY = type === "startDate" && year
			? year
			: season.startDate
				? moment(season.startDate).format("YYYY")
				: "";
		const endY = type === "endDate" && year
			? year
			: season.endDate
				? moment(season.endDate).format("YYYY")
				: "";

		return startY && endY
			? startY === endY ? startY : `${startY.substr(2)}/${endY.substr(2)}`
			: `${startY || endY}`;
	};

	getCustomSeasonName = (season, year, month, type, tournamentName) => {
		const startM = type === "startDate" && month
			? `${month}${season.startDate ? ` ${moment(season.startDate).format("YYYY")}` : ""}`
			: season.startDate
				? moment(season.startDate).format("MMM YYYY")
				: "";
		const endM = type === "endDate" && month
			? `${month}${season.startDate ? ` ${moment(season.endDate).format("YYYY")}` : ""}`
			: season.endDate
				? moment(season.endDate).format("MMM YYYY")
				: "";

		const finalYear = this.getCustomSeasonYear(season, year, type);
		const finalMonth = startM && endM
			? `${startM} - ${endM}`
			: `${startM || endM}`;

		// return `${finalYear} (${finalMonth})`;
		return (tournamentName !== null) ? `${tournamentName} ${finalYear}` : finalYear;
	};

	render() {
		const {
			index,
			season,
			onDelete,
			onAdd,
		} = this.props;

		const months = getMonths();
		const startMonth = (season.startDate) ? moment(season.startDate).format("MMM") : "";
		const startYear = (season.startDate) ? moment(season.startDate).format("YYYY") : "";
		const endMonth = (season.endDate) ? moment(season.endDate).format("MMM") : "";
		const endYear = (season.endDate) ? moment(season.endDate).format("YYYY") : "";


		return (
			<div className="custom-season-container">
				<div className="custom-season-form">
					<label>
						From {" "}
					</label>
					<div className="date-select">
						<select
							value={startMonth}
							className="ca-form-control"
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "startDate", season)}
						>
							<option value="" disabled>
								Month
							</option>
							{months.map(month => (
								<option value={month} key={month}>
									{month}
								</option>
							))}
						</select>
						<select
							value={startYear}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "startDate", season)}
							className="ca-form-control"
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(null, null, 69, 17).map(year => (
								<option value={year} key={year}>
									{year}
								</option>
							))}
						</select>
					</div>

				</div>
				<div className="custom-season-form">
					<label>
						To {" "}
					</label>
					<div className="date-select">
						<select
							value={endMonth}
							onChange={e => this.handleSeasonDateChange(index, e, "MONTH", "endDate", season)}
							className="ca-form-control"
						>
							<option value="" disabled>
								Month
							</option>
							{months.map(month => (
								<option value={month} key={month}>
									{month}
								</option>
							))}
						</select>
						<select
							value={endYear}
							onChange={e => this.handleSeasonDateChange(index, e, "YEAR", "endDate", season)}
							className="ca-form-control"
						>
							<option value="" disabled>
								Year
							</option>
							{getYears(startYear, null, 69, 25).map(year => (
								<option value={year} key={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="custom-season-result">
					<SeasonYear {...season} showPlaceholder />
				</div>
				<RemoveSeason onClick={() => onDelete(index)} />
				{/* <AddSeason onClick={onAdd} /> */}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	seasons: state.property.seasons,
	tournament: state.property.tournament,
});

const mapDispatchToProps = dispatch => ({
	setCustomSeasonName: (index, seasonName) => dispatch(setCustomSeasonName(index, seasonName)),
	updateCustomSeason: (index, key, value) => dispatch(updateCustomSeason(index, key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsCustomSeason);
