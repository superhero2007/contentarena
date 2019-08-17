import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import moment from "moment/moment";
import uniqBy from "lodash/uniqBy";
import { getSeasonMonthString, getSeasonStartYear, SeasonYear } from "@utils/listing";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import CmsStepSelector from "../components/CmsStepSelector";
import RadioSelector from "../../main/components/RadioSelector";
import { EDIT_TYPE } from "@constants";
import { updateProperty } from "../actions/propertyActions";
import CmsCustomSeason from "../components/CmsCustomSeason";

class EditProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			editSeason: "",
			loadingSeasons: false,
			availableSeasons: [],
			selectedSeasons: [],
			selectedSeason: null,
			customSeasonsAdded: false,
			showCustomSeason: false,
			showAll: false,
		};
	}

	componentDidMount() {
		this.loadSeasons();
	}

	onNext = (step) => {
		this.setState({
			currentStep: step,
		});
	};

	handleSeasonType = (editSeason) => {
		this.setState({
			editSeason,
		});
		if (editSeason === EDIT_TYPE.create) {
			this.onNext(2);
		} else {
			this.onNext(1);
		}
	};

	loadSeasons() {
		const { property: { tournament } } = this.props;
		const tournamentId = tournament[0].externalId;

		this.setState({
			loadingSeasons: true,
		});
		ContentArena.Api.getSeasons(tournamentId)
			.done((availableSeasons) => {
				availableSeasons = availableSeasons.filter(season => season.startDate && season.endDate);
				ContentArena.Data.Seasons = availableSeasons;

				this.setState({
					availableSeasons,
					selectedSeasons: [],
				});
			})
			.always(() => {
				this.setState({
					loadingSeasons: false,
				});
			});
	}

	addCustomSeason = (season) => {
		const { availableSeasons } = this.state;
		const index = availableSeasons.findIndex(s => s.externalId === season.externalId);

		if (index !== -1) {
			availableSeasons[index] = season;
		} else {
			availableSeasons.push(season);
		}

		availableSeasons.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

		this.setState({ availableSeasons, selectedSeason: null, customSeasonsAdded: true }, () => {
			this.addSeason(season);
		});
	};

	removeCustomSeason = (index) => {
		const { availableSeasons } = this.state;
		availableSeasons.splice(index, 1);
		this.setState({ availableSeasons });
	};

	editSeason = (season) => {
		this.setState({ showCustomSeason: true, selectedSeason: season });
	};

	addSeason = (season) => {
		const { selectedSeasons } = this.state;

		if (!selectedSeasons.find(element => season.externalId === element.externalId)) {
			selectedSeasons.push(season);
			this.setState({
				selectedSeasons,
			});
			this.onNext(3);
		}
	};

	removeSeason = (season) => {
		let { selectedSeasons } = this.state;

		if (selectedSeasons.find(element => season.externalId === element.externalId)) {
			selectedSeasons = selectedSeasons.filter(element => element.externalId !== season.externalId);
			this.setState({
				selectedSeasons,
			});
			if (!selectedSeasons.length) {
				this.onNext(2);
			}
		}
	};

	isCheckBoxChecked = (externalId) => {
		const { selectedSeasons } = this.state;
		return selectedSeasons.find(season => season.externalId === externalId);
	};

	handleSave = () => {
		const {
			selectedSeasons,
		} = this.state;
		const { property: { customId, seasons } } = this.props;
		const { updateProperty } = this.props;
		const allSeasons = [].concat(
			selectedSeasons.map(element => ({
				endDate: element.endDate,
				externalId: element.externalId,
				name: element.name,
				startDate: element.startDate,
				year: element.year,
			})),
			seasons.map(element => ({
				endDate: element.endDate,
				externalId: element.externalId,
				name: element.name,
				startDate: element.startDate,
				year: element.year,
			})),
		);
		const updateObj = {
			customId,
			seasons: allSeasons,
		};
		updateProperty(updateObj);
	};

	getFutureSeasons = () => {
		const {
			availableSeasons,
			customSeasonsAdded,
		} = this.state;

		if (customSeasonsAdded) return availableSeasons;

		return availableSeasons.filter((season) => {
			const seasonStartYear = +getSeasonStartYear(season);
			const currentYear = +moment().format("YYYY");
			return currentYear <= +seasonStartYear;
		});
	};

	render() {
		const {
			currentStep,
			editSeason,
			availableSeasons,
			showAll,
			customSeasonsAdded,
			selectedSeason,
			showCustomSeason,
		} = this.state;
		const { property: { seasons, tournament }, loading } = this.props;
		const seasonTypes = [
			{
				value: EDIT_TYPE.create,
				label: <Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_CREATE" />,
			},
			{
				value: EDIT_TYPE.edit,
				label: <Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_EDIT" />,
			},
		];

		const futureSeasons = this.getFutureSeasons();
		let allSeasons = (showAll || futureSeasons.length === 0) ? availableSeasons : futureSeasons;
		allSeasons = uniqBy(allSeasons.concat(seasons), "externalId");

		return (
			<div className="default-container no-title property edit-property">
				<DefaultBox>
					<CmsStepSelector
						title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP1_TITLE" />}
						enableNextStep
					>
						<div className="season-selector">
							<RadioSelector
								value={editSeason}
								onChange={this.handleSeasonType}
								className="season-selector-item"
								items={seasonTypes}
							/>
						</div>
					</CmsStepSelector>

					{(currentStep > 1) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_EDIT_PROPERTY_STEP2_TITLE" />}
							enableNextStep
						>
							<div className="season-selector">
								{allSeasons.map((season, index) => {
									const {
										externalId,
										custom,
									} = season;
									const selected = seasons.find(element => element.externalId === externalId);

									const idAttr = `checkbox-${externalId}`;
									return (
										<div className="season-selector-item" key={idAttr}>
											<input
												type="checkbox"
												className="ca-checkbox blue"
												value={externalId}
												checked={selected || this.isCheckBoxChecked(externalId)}
												disabled={selected}
												onChange={(e) => {
													e.target.checked
														? this.addSeason(season)
														: this.removeSeason(season);
												}}
												id={idAttr}
											/>
											<label
												className={cn({ selected: this.isCheckBoxChecked(externalId) })}
												htmlFor={idAttr}
												title={getSeasonMonthString(season)}
											>
												<SeasonYear {...season} />
											</label>
											{custom && (
												<span className="remove-icon-button" onClick={() => { this.removeCustomSeason(index); }}>
													<i className="fa fa-times-circle" />
												</span>
											)}
											{custom && (
												<span className="edit-season" onClick={() => { this.editSeason(season); }}>
													<i className="fa fa-pencil" />
												</span>
											)}
										</div>
									);
								})}
							</div>

							<div className="season-buttons" style={{ marginBottom: 20 }}>
								{!showAll && futureSeasons.length >= 1 && !customSeasonsAdded && (
									<span
										className="add-season"
										onClick={() => {
											this.setState({ showAll: true });
										}}
									>
										<i className="fa fa-arrow-circle-down small-icon" />
										<Translate i18nKey="CMS_SEASONS_SHOW_ALL" />
									</span>
								)}
								{!showCustomSeason && (
									<span
										className="add-season"
										onClick={() => {
											this.setState({ showCustomSeason: true });
										}}
									>
										<i className="fa fa-plus-circle small-icon" />
										<Translate i18nKey="CMS_FORM_ADD_SEASON" />
									</span>
								)}
							</div>

							{ showCustomSeason && (
								<>
									<h4 style={{ marginTop: 20 }}>
										<Translate i18nKey="CMS_CREATE_PROPERTY_ADD_SEASON_TITLE" />
									</h4>
									<h6>
										<Translate i18nKey="CMS_CREATE_PROPERTY_ADD_SEASON_SUBTITLE" />
									</h6>
									<CmsCustomSeason
										onDelete={() => {
											this.setState({ showCustomSeason: false });
										}}
										season={selectedSeason}
										existingSeasons={allSeasons}
										onConfirm={this.addCustomSeason}
										tournament={tournament}
									/>
								</>
							)}
						</CmsStepSelector>
					)}

					<HorizontalButtonBox>
						<button
							className="yellow-button"
							disabled={currentStep < 3 || loading}
							onClick={this.handleSave}
						>
							<Translate i18nKey="CMS_EDIT_PROPERTY_BUTTON" />
						</button>
					</HorizontalButtonBox>
				</DefaultBox>
			</div>
		);
	}
}

EditProperty.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	loading: state.propertyDetails.loading,
	property: state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({
	updateProperty: value => dispatch(updateProperty(value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditProperty);
