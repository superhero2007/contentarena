import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import CmsStepSelector from "../components/CmsStepSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD, CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import CmsDealTable from "../components/CmsDealTable";
import { getUnique, sortSeasons } from "../helpers/PropertyDetailsHelper";
import { addDealsProperty } from "../actions/propertyActions";
import PropertyHeader from "../components/PropertyHeader";

class PropertyDeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: [],
			rights: [],
			deals: [],
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
			territories: [],
			territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
			currentStep: props.property.seasons && props.property.seasons.length === 0 ? 2 : 1,
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

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onChangeSeason = (value) => {
		let { seasons } = this.state;
		const selectedSeason = seasons.find(season => season.id === value.id);
		if (selectedSeason) {
			seasons = seasons.filter(season => season.id !== value.id);
		} else {
			seasons.push(value);
		}
		this.setState({
			seasons,
			currentStep: 1,
			rights: [],
		});
	};

	onSelectAllSeasons = () => {
		const { property: { seasons } } = this.props;
		this.setState({
			seasons,
			currentStep: 1,
			rights: [],
		});
	};

	onUnSelectAllSeasons = () => {
		this.setState({
			seasons: [],
			currentStep: 1,
			rights: [],
		});
	};

	getTerritoriesFromRights = (rights) => {
		const territory = {
			territories: [],
			territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
		};
		const worldwideRights = rights.filter(right => right.territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE);
		if (worldwideRights.length) {
			territory.territories = this.props.countries;
			territory.territoriesMode = BUNDLE_TERRITORIES_METHOD.WORLDWIDE;
		} else {
			territory.territories = getUnique([].concat(...rights.map(right => right.territories)), "id");
		}
		return territory;
	};

	onSelectAllRights = () => {
		const { property: { rights } } = this.props;
		const newRights = rights.map(element => Object.assign({}, element, { dealExclusive: null }));
		this.setState({
			rights: newRights,
			currentStep: 2,
		});
	};

	onUnSelectAllRights = () => {
		this.setState({
			rights: [],
			currentStep: 2,
		});
	};

	onExclusive = (right, dealExclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.id !== right.id);
		const newValue = Object.assign({}, right, { dealExclusive });
		rights.push(newValue);
		this.setState({
			rights,
			currentStep: 2,
		});
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
		this.setState({
			rights,
			currentStep: 2,
		});
	};

	onSelectTerritories = (territories, territoriesMode) => {
		this.setState({
			territories,
			territoriesMode,
		});
	};

	onNext = (step) => {
		this.setState({
			currentStep: step,
		});

		if (step === 4) {
			const { territories, seasons, deals } = this.state;

			deals.push({
				territory: territories,
				company: "",
				seasons,
				currency: "",
				fee: 0,
				attachments: [],
				type: true,
			});

			this.setState({
				deals,
				territories: [],
			});
		}
	};

	onSave = (deals) => {
		this.setState({
			deals,
		});
	};

	saveDeals = () => {
		const { deals } = this.state;
		const { property: { customId }, history } = this.props;
		this.props.addDealsProperty(deals)
			.then()
			.catch()
			.finally(() => {
				history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.COMMERCIAL}`);
			});
	};

	finishButtonDisabled = () => {
		const { currentStep, deals } = this.state;
		let invalidDeal = false;

		deals.forEach((deal) => {
			if (deal.company === "" || deal.currency === "" || deal.fee === 0) {
				invalidDeal = true;
			}
		});

		return currentStep < 4 || invalidDeal;
	};

	render() {
		const {
			seasons,
			rights,
			territories,
			territoriesMode,
			currentStep,
			deals,
		} = this.state;
		const { property: { seasons: allSeasons, rights: allRights }, loading } = this.props;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();
		const territory = this.getTerritoriesFromRights(rights);
		allSeasons.sort(sortSeasons);

		return (
			<div className="default-container no-title property property-deal">
				<DefaultBox>
					<PropertyHeader deals={false} />
					<CmsStepSelector
						style={{ marginTop: 20 }}
						title={<Translate i18nKey="CMS_DEALS_STEP1_TITLE" />}
						button={<Translate i18nKey="CMS_DEALS_STEP1_BUTTON" />}
						disabled={!allSeasons.length}
						enableNextStep={seasonsValid || !allSeasons.length}
						onNext={() => this.onNext(2)}
					>
						{!allSeasons.length && (
							<div className="select-item">
								<Translate i18nKey="CMS_SEASON_NOT_APPLICABLE" />
							</div>
						)}

						{allSeasons.length > 1 && (
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
						)}
						<div className="d-flex">
							{allSeasons.map((season) => {
								const { endDate, startDate } = season;
								let { year } = season;
								if (year) {
									if (year.split("/")[0].length === 2) {
										year = startDate.substring(0, 2) + year;
									}
								} else {
									const startY = moment(startDate).format("YYYY");
									const endY = moment(endDate).format("YYYY");
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
											{year}
										</label>
									</div>
								);
							})}
						</div>
					</CmsStepSelector>

					{(currentStep > 1) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP2_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP2_BUTTON" />}
							enableNextStep={rightsValid}
							onNext={() => this.onNext(3)}
						>
							{allRights.length > 1 && (
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
							)}
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
													value={!!selectedRight}
													checked={!!selectedRight}
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
															<Translate i18nKey={`CMS_DEALS_RIGHT_DEFINITIONS_${code}`} />
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

					{(currentStep > 2) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP3_TITLE" />}
							button={<Translate key={`add_deal${deals.length}`} i18nKey={deals.length === 0 ? "CMS_DEALS_STEP3_BUTTON" : "CMS_DEALS_STEP3_ANOTHER_BUTTON"} />}
							enableNextStep={territoriesValid}
							onNext={() => this.onNext(4)}
						>
							<CmsTerritorySelector
								className="small-select"
								onChange={this.onSelectTerritories}
								selectedCountries={territory.territories}
								value={territories}
								territoriesMode={territoriesMode}
								multiple
							/>
						</CmsStepSelector>
					)}

					{(deals.length > 0 && currentStep > 2) && (
						<div className="details-tab-element">
							<div className="details-tab-element__content">
								<CmsDealTable
									seasons={seasons}
									rights={rights}
									territories={territories}
									deals={deals}
									onSave={this.onSave}
								/>
							</div>
						</div>
					)}

					<HorizontalButtonBox style={{ marginTop: 20 }}>
						<button
							className="yellow-button"
							onClick={this.cancel}
						>
							<Translate i18nKey="CMS_DEALS_CREATE_CANCEL_BUTTON" />
						</button>
						<button
							className="yellow-button"
							disabled={this.finishButtonDisabled() || loading}
							onClick={this.saveDeals}
						>
							{!loading && <Translate i18nKey="CMS_DEALS_CREATE_BUTTON" />}
							{loading && <Loader xSmall loading />}
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
	...state.propertyDetails,
});

const mapDispatchToProps = dispatch => ({
	addDealsProperty: deals => dispatch(addDealsProperty(deals)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDeal);
