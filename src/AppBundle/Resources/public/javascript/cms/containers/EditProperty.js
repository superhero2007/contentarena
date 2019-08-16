import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import { getSeasonMonthString, getSeasonStartYear, SeasonYear } from "@utils/listing";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import CmsStepSelector from "../components/CmsStepSelector";
import RadioSelector from "../../main/components/RadioSelector";
import { EDIT_TYPE } from "@constants";
import { updateProperty } from "../actions/propertyActions";

class EditProperty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			editSeason: "",
			loadingSeasons: false,
			availableSeasons: [],
			selectedSeasons: [],
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
		this.setState({ selectedSeasons: [] });
	};

	render() {
		const {
			currentStep,
			editSeason,
		} = this.state;
		let {
			availableSeasons,
		} = this.state;
		const { property: { seasons }, loading } = this.props;
		if (editSeason === EDIT_TYPE.create) {
			availableSeasons = availableSeasons.filter(season => !seasons.find(element => element.externalId === season.externalId));
		} else {
			availableSeasons = availableSeasons.filter(season => seasons.find(element => element.externalId === season.externalId));
		}
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
								{availableSeasons.map((season) => {
									const {
										externalId,
									} = season;

									const idAttr = `checkbox-${externalId}`;
									return (
										<div className="season-selector-item" key={idAttr}>
											<input
												type="checkbox"
												className="ca-checkbox blue"
												value={externalId}
												checked={this.isCheckBoxChecked(externalId)}
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
										</div>
									);
								})}
							</div>
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
