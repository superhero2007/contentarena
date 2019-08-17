import React from "react";
import { connect } from "react-redux";
import { getCustomSeasonFullYear, getCustomSeasonYear, SeasonYear } from "@utils/listing";
import cn from "classnames";
import { getMonths, getYears } from "@utils/time";
import moment from "moment/moment";
import Translate from "@components/Translator/Translate";
import { setCustomSeasonName, setSeasons, updateCustomSeason } from "../actions/propertyActions";
import { DATE_FORMAT, SERVER_DATE_FORMAT } from "@constants";

class CmsCustomSeason extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			startMonth: "",
			startYear: "",
			endMonth: "",
			endYear: "",
			seasonExists: false,
			selectValueSelected: false,
		};
	}

	componentWillReceiveProps = (props) => {
		this.setState({
			startMonth: (props.season && props.season.startDate) ? moment(props.season.startDate).format("MMM") : "",
			startYear: (props.season && props.season.startDate) ? moment(props.season.startDate).format("YYYY") : "",
			endMonth: (props.season && props.season.endDate) ? moment(props.season.endDate).format("MMM") : "",
			endYear: (props.season && props.season.endDate) ? moment(props.season.endDate).format("YYYY") : "",
		});
	};

	seasonAlreadyExists = year => this.props.existingSeasons.filter(season => season.year === year).length > 0;

	confirm = () => {
		const {
			onConfirm,
			tournament,
			season,
		} = this.props;

		const {
			startMonth,
			startYear,
			endMonth,
			endYear,
		} = this.state;

		const startDate = moment(new Date(`${startYear}-${startMonth}-01`)).utc().format(SERVER_DATE_FORMAT);
		const endDate = moment(new Date(`${endYear}-${endMonth}-01`)).utc().format(SERVER_DATE_FORMAT);
		const year = getCustomSeasonYear(startYear, endYear);
		const fullYear = getCustomSeasonFullYear(startYear, endYear);
		const tournamentName = (tournament) ? tournament[0].name : null;

		if (!season && this.seasonAlreadyExists(year)) {
			this.setState({ seasonExists: true });
			return;
		}

		const newSeason = {
			custom: true,
			startDate,
			endDate,
			year,
			fullYear,
			name: (tournamentName !== null) ? `${tournamentName} ${year}` : year,
			externalId: (season) ? season.externalId : `ca:season:${new Date().getTime()}`,
		};

		this.setState({
			startMonth: "",
			startYear: "",
			endMonth: "",
			endYear: "",
			seasonExists: false,
			selectValueSelected: false,
		});

		onConfirm(newSeason);
	};

	startDateIsValid = () => {
		const {
			startMonth,
			startYear,
		} = this.state;

		return startYear !== "" && startMonth !== "";
	};

	endDateIsValid = () => {
		const {
			endMonth,
			endYear,
			startYear,
		} = this.state;

		return endMonth !== "" && endYear !== "" && endYear >= startYear;
	};

	dateIsValid = () => this.startDateIsValid() && this.endDateIsValid();

	render() {
		const {
			onDelete,
		} = this.props;

		const {
			startMonth,
			startYear,
			endMonth,
			endYear,
			seasonExists,
			selectValueSelected,
		} = this.state;

		const months = getMonths();
		const dateIsValid = this.dateIsValid();
		const startDateIsValid = this.startDateIsValid();
		const fullYear = getCustomSeasonFullYear(startYear, endYear);

		return (
			<>
				<div className="custom-season-container">
					<div className="custom-season-form">
						<label>
							From {" "}
						</label>
						<div className="date-select">
							<select
								value={startMonth}
								className="ca-form-control"
								onChange={e => this.setState({ startMonth: e.target.value })}
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
								onChange={(e) => {
									const value = e.target.value;
									this.setState({
										startYear: value,
										endYear: (endYear !== "" && +endYear < +value) ? value : endYear,
									});
								}}
								className="ca-form-control"
							>
								<option value="" disabled>
									Year
								</option>
								{getYears(null, null, 59, 17).map(year => (
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
								onChange={e => this.setState({ endMonth: e.target.value })}
								className="ca-form-control"
								disabled={!startDateIsValid}
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
								onChange={e => this.setState({ endYear: e.target.value })}
								className="ca-form-control"
								disabled={!startDateIsValid}
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
						{!fullYear && (
							<Translate i18nKey="CMS_CUSTOM_SEASON_YEAR_PLACEHOLDER" style={{ textAlign: "center" }} />
						)}
						{fullYear && fullYear}
					</div>
					<span className="remove-icon-button" onClick={onDelete}>
						<i className="fa fa-times-circle" />
					</span>
					{!dateIsValid && (
						<span className="remove-icon-button disabled">
							<i className="fa fa-check-circle" />
						</span>
					)}
					{dateIsValid && (
						<span className="remove-icon-button" onClick={this.confirm}>
							<i className="fa fa-check-circle" />
						</span>
					)}
				</div>
				{seasonExists && (
					<div className="custom-season-exists">
						<Translate i18nKey="CMS_PROPERTY_SEASON_ALREADY_EXISTS" />
					</div>
				)}
			</>

		);
	}
}

const mapStateToProps = state => ({
	seasons: state.property.seasons,
});

export default connect(
	mapStateToProps,
	null,
)(CmsCustomSeason);
