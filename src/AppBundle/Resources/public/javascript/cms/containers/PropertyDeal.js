import React from "react";
import { connect } from "react-redux";
import { DefaultBox, HorizontalButtonBox, SkinContainer } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { getTerritoriesFromRights } from "@utils/property";
import SeasonSelector from "@components/Season";
import RightSelector from "@components/Right";
import CmsStepSelector from "../components/CmsStepSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";
import { BUNDLE_TERRITORIES_METHOD, CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import CmsDealTable from "../components/CmsDealTable";
import { sortSeasons } from "../helpers/PropertyDetailsHelper";
import { addDealsProperty } from "../actions/propertyActions";
import PropertyHeader from "../components/PropertyHeader";
import CmsProgress from "../components/CmsProgress";


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
		return !!rights.length && !rights.filter(element => element.exclusive === null).length;
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

	onSelectAllRights = () => {
		const { property: { rights } } = this.props;
		const newRights = rights.map(element => Object.assign({}, element, { exclusive: null }));
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

	onExclusive = (right, exclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.id !== right.id);
		const newValue = Object.assign({}, right, { exclusive });
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
			const newValue = Object.assign({}, value, { exclusive: null });
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
		const { property: { seasons: allSeasons, rights: allRights, countries }, loading, skin } = this.props;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();
		const territory = getTerritoriesFromRights(rights, countries);
		allSeasons.sort(sortSeasons);
		const progressList = [
			"Choose Season",
			"Define media rights",
			"Add Territories",
			"Additional Info",
			"Review & Confirm",
		];

		return (
			<SkinContainer skin={skin}>
				<CmsProgress
					title={<Translate i18nKey="CMS_DEALS_TITLE" />}
					currentStep={currentStep}
					progressList={progressList}
				/>
				<DefaultBox>
					<CmsStepSelector
						style={{ marginTop: 20 }}
						title={<Translate i18nKey="CMS_DEALS_STEP1_TITLE" />}
						button={<Translate i18nKey="CMS_DEALS_STEP1_BUTTON" />}
						disabled={!allSeasons.length}
						enableNextStep={seasonsValid || !allSeasons.length}
						onNext={() => this.onNext(2)}
					>
						<SeasonSelector
							availableSeasons={allSeasons}
							selectedSeasons={seasons}
							onSelectSeason={this.onChangeSeason}
							onSelectAll={this.onSelectAllSeasons}
							onUnselectAll={this.onUnSelectAllSeasons}
						/>
					</CmsStepSelector>

					{(currentStep > 1) && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP2_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP2_BUTTON" />}
							enableNextStep={rightsValid}
							onNext={() => this.onNext(3)}
						>
							<RightSelector
								availableRights={allRights}
								selectedRights={rights}
								onSelectAll={this.onSelectAllRights}
								onUnselectAll={this.onUnSelectAllRights}
								onSelectRight={this.onSelectRight}
								onExclusive={this.onExclusive}
							/>
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
			</SkinContainer>
		);
	}
}

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
