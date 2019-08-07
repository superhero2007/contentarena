import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import CmsStepSelector from "../components/CmsStepSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";

class PropertyDeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: [],
			rights: [],
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
			territories: props.countries,
			territoriesMode: BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
			currentStep: 1,
		};
	}

	seasonsAreValid = () => {
		const { seasons } = this.state;
		return !!seasons.length;
	};

	rightsAreValid = () => {
		const { rights } = this.state;
		return !!rights.length && !rights.filter(element => element.dealExclusive === null).length;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	onChangeSeason = (value) => {
		let { seasons } = this.state;
		const selectedSeason = seasons.find(season => season.id === value.id);
		if (selectedSeason) {
			seasons = seasons.filter(season => season.id !== value.id);
		} else {
			seasons.push(value);
		}
		this.setState({ seasons, currentStep: 1, rights: [] });
	};

	onSelectAllSeasons = () => {
		const { property: { seasons } } = this.props;
		this.setState({ seasons, currentStep: 1, rights: [] });
	};

	onUnSelectAllSeasons = () => {
		this.setState({ seasons: [], currentStep: 1, rights: [] });
	};

	onSelectAllRights = () => {
		const { property: { rights }, countries } = this.props;
		const newRights = rights.map(element => Object.assign({}, element, { dealExclusive: null }));
		this.setState({ rights: newRights, currentStep: 2, territories: countries });
	};

	onUnSelectAllRights = () => {
		this.setState({ rights: [], currentStep: 2, territories: countries });
	};

	onExclusive = (right, dealExclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.id !== right.id);
		const newValue = Object.assign({}, right, { dealExclusive });
		rights.push(newValue);
		this.setState({ rights, currentStep: 2, territoriesMode: BUNDLE_TERRITORIES_METHOD.WORLDWIDE });
	};

	onSelectRight = (value) => {
		let { rights } = this.state;
		const selectedRight = rights.find(element => element.id === value.id);
		if (selectedRight) {
			rights = rights.filter(element => element.id !== value.id);
		} else {
			const newValue = Object.assign({}, value, { dealExclusive: null });
			rights.push(newValue);
		}
		this.setState({ rights, currentStep: 2, territoriesMode: BUNDLE_TERRITORIES_METHOD.WORLDWIDE });
	};

	onSelectTerritories = (territories, territoriesMode) => {
		this.setState({ territories, territoriesMode, currentStep: 3 });
	};

	onNext = (step) => {
		this.setState({ currentStep: step });
	};

	render() {
		const {
			seasons,
			rights,
			territories,
			territoriesMode,
			currentStep,
		} = this.state;
		const { property: { seasons: allSeasons, rights: allRights } } = this.props;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();

		return (
			<div className="default-container no-title property property-deal">
				<DefaultBox>
					<div className="details-tab">
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP1_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP1_BUTTON" />}
							enableNextStep={seasonsValid}
							onNext={() => this.onNext(2)}
						>
							<div className="select-item">
								<button
									type="button"
									onClick={this.onSelectAllSeasons}
									className="ca-btn link-button"
								>
									Select All
								</button>
								<button
									type="button"
									onClick={this.onUnSelectAllSeasons}
									className="ca-btn link-button"
								>
									UnSelect All
								</button>
							</div>
							<div className="d-flex">
								{allSeasons.map((season) => {
									const { endDate, startDate } = season;
									let { year } = season;
									if (!year) {
										const startY = moment(startDate).format("YY");
										const endY = moment(endDate).format("YY");
										year = startY === endY ? `${endY}` : `${startY}/${endY}`;
									}
									const selectedSeason = seasons.find(element => element.id === season.id);
									return (
										<div key={season.id} className="season-item">
											<input
												type="checkbox"
												value={!!selectedSeason}
												checked={!!selectedSeason}
												onChange={() => this.onChangeSeason(season)}
												className="ca-checkbox blue"
											/>
											<label>
												{`${year.split("/")[0].length === 2 ? "20" : ""}${year}`}
											</label>
										</div>
									);
								})}
							</div>
						</CmsStepSelector>
					</div>

					{(seasonsValid && currentStep > 1) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP2_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP2_BUTTON" />}
							enableNextStep={rightsValid}
							onNext={() => this.onNext(3)}
						>
							<div className="select-item">
								<button
									type="button"
									onClick={this.onSelectAllRights}
									className="ca-btn link-button"
								>
									Select All
								</button>
								<button
									type="button"
									onClick={this.onUnSelectAllRights}
									className="ca-btn link-button"
								>
									UnSelect All
								</button>
							</div>
							<div className="right-selector">
								{allRights.map((right) => {
									const {
										name, code,
									} = right;
									const { offers } = this.state;
									const idAttr = `checkbox-${code}`;
									const exclusiveIdAttr = `exc-id-${code}`;
									const nonExclusiveIdAttr = `non-exc-id-${code}`;
									const selectedRight = rights.find(element => element.id === right.id);
									const dealExclusive = selectedRight && selectedRight.dealExclusive !== null ? selectedRight.dealExclusive : null;
									const offerValue = dealExclusive === null ? null : (dealExclusive ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE);
									return (
										<div className="right-selector-item" key={right.id}>
											<div className="right-name">
												<input
													type="checkbox"
													checked={selectedRight}
													className="ca-checkbox blue"
													onChange={() => this.onSelectRight(right)}
													id={idAttr}
												/>
												<label className={cn({ selected: !!selectedRight })} htmlFor={idAttr}>
													{name}
												</label>
												<div className="tooltip-container">
													<span className="" data-tip data-for={code}>
														<i className="fa fa-question-circle-o" />
													</span>
													<ReactTooltip id={right.code} effect="solid" className="CaTooltip " delayHide={400}>
														<div className="body">
															<Translate i18nKey={`CL_STEP2_RIGHT_DEFINITIONS_${code}`} />
														</div>
													</ReactTooltip>
												</div>
											</div>
											<div className="right-exclusivity">
												<input
													disabled={!selectedRight}
													type="radio"
													checked={offerValue === offers.EXCLUSIVE}
													onChange={() => {
														this.onExclusive(right, true);
													}}
													id={exclusiveIdAttr}
													className="ca-radio ca-radio-exclusive"
												/>
												<label
													className={cn({ selected: !!selectedRight && offerValue === offers.EXCLUSIVE })}
													htmlFor={exclusiveIdAttr}
												>
													<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
												</label>
												<input
													type="radio"
													disabled={!selectedRight}
													checked={offerValue === offers.NON_EXCLUSIVE}
													onChange={() => {
														this.onExclusive(right, false);
													}}
													id={nonExclusiveIdAttr}
													className="ca-radio"
												/>
												<label
													htmlFor={nonExclusiveIdAttr}
													className={cn({ selected: !!selectedRight && offerValue === offers.NON_EXCLUSIVE })}
												>
													<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
												</label>
											</div>
										</div>
									);
								})}
							</div>
						</CmsStepSelector>
					)}

					{(rightsValid && currentStep > 2) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP3_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP3_BUTTON" />}
							enableNextStep={territoriesValid}
							onNext={() => this.onNext(4)}
						>
							<CmsTerritorySelector
								className="small-select"
								onChange={this.onSelectTerritories}
								value={territories}
								territoriesMode={territoriesMode}
								multiple
							/>
						</CmsStepSelector>
					)}

					{(territoriesValid && currentStep > 3) && (
						<div>Table</div>
					)}

					<HorizontalButtonBox>
						<button
							className="yellow-button"
							disabled={currentStep < 4}
						>
							<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
						</button>
					</HorizontalButtonBox>
				</DefaultBox>
			</div>
		);
	}
}

PropertyDeal.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	countries: state.property.countries,
});

export default connect(
	mapStateToProps,
	null,
)(PropertyDeal);
