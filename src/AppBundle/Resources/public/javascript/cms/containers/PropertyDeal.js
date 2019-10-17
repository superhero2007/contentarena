import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { DefaultBox, HorizontalButtonBox, SkinContainer } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { getTerritoriesFromRights } from "@utils/property";
import SeasonSelector from "@components/Season";
import RightSelector from "@components/Right";
import {
	BUNDLE_TERRITORIES_METHOD,
	CMS_PROPERTY_TABS,
	PROPERTY_MAIN_TABS,
	ROUTE_PATHS,
} from "@constants";
import TerritorySelector from "@components/Territories/TerritorySelector";
import CmsDealTable from "../components/CmsDealTable";
import { getSeasonsYearString, sortSeasons } from "../helpers/PropertyDetailsHelper";
import { addDealsProperty } from "../actions/propertyActions";
import CmsProgress from "../components/CmsProgress";
import { goTo } from "../../main/actions/utils";


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
			currentStep: props.property.seasons && props.property.seasons.length === 0 ? 2 : 1,
		};
	}

	seasonsAreValid = () => !!this.state.seasons.length;

	rightsAreValid = () => {
		const { rights } = this.state;
		return !!rights.length && !rights.filter(element => element.exclusive === null).length;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	dealsAreValid = () => !this.state.deals.filter(d => (d.buyerCompanyName === "" || d.currency === "" || d.fee === 0)).length;

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

	onSelectTerritories = territories => this.setState({ territories });

	onNext = () => {
		const { property: { customId } } = this.props;
		const currentStep = this.state.currentStep + 1;
		this.setState({ currentStep });

		if (currentStep === 4) {
			const {
				territories, seasons, deals, rights,
			} = this.state;

			deals.push({
				territories,
				buyerCompanyName: "",
				property: { customId },
				seasons,
				rights,
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

	onPrevious = () => this.setState({ currentStep: this.state.currentStep - 1 });

	onFinish = () => {
		const { property: { customId }, history } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.COMMERCIAL}`);
		window.location.reload();
	};

	onAddMore = () => {
		window.location.reload();
	};

	onSave = deals => this.setState({ deals });

	saveDeals = () => {
		const { deals } = this.state;
		const { property: { customId } } = this.props;
		this.props.addDealsProperty({
			deals,
			property: {
				customId,
			},
		})
			.then(() => {
				this.setState({ currentStep: 5 });
			})
			.catch()
			.finally(() => {

			});
	};

	nextButtonIsDisabled = () => {
		const {
			currentStep,
		} = this.state;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();
		const dealsAreValid = this.dealsAreValid();

		return (currentStep === 1 && !seasonsValid) || (currentStep === 2 && !rightsValid)
			|| (currentStep === 3 && !territoriesValid) || (currentStep === 4 && !dealsAreValid);
	};

	render() {
		const {
			seasons,
			rights,
			territories,
			currentStep,
			deals,
			saving,
		} = this.state;
		const { property: { seasons: allSeasons, rights: allRights, countries }, skin } = this.props;
		const rightTerritories = getTerritoriesFromRights(rights, countries);
		const isNextButtonDisabled = this.nextButtonIsDisabled();

		allSeasons.sort(sortSeasons);
		seasons.sort(sortSeasons);

		const progressList = [
			"Choose Season",
			"Define media rights",
			"Add Territories",
			"Additional Info",
			"Done",
		];

		return (
			<SkinContainer skin={skin}>
				<CmsProgress
					title={<Translate i18nKey="CMS_DEALS_TITLE" />}
					currentStep={currentStep}
					progressList={progressList}
				/>
				<DefaultBox>

					<div className="property-deals">

						<div className="property-deals-header">
							<div className="property-deals-header-seasons">
								<h5>
									<Translate i18nKey="CMS_ADD_DEALS_HEADLINE" />
								</h5>
								{currentStep > 1 && (
									<h5 className="property-deals-header-season">
										{getSeasonsYearString(seasons)}
									</h5>
								)}
							</div>

							{currentStep > 2 && (
								<div className="property-deals-header-rights">
									{rights.map(right => (
										<div className={cn("right-value", { "right-value-exclusive": right.exclusive })}>
											{right.code}
										</div>
									))}
								</div>
							)}
						</div>

						{currentStep === 1 && (
							<SeasonSelector
								availableSeasons={allSeasons}
								selectedSeasons={seasons}
								onSelectSeason={this.onChangeSeason}
								onSelectAll={this.onSelectAllSeasons}
								onUnselectAll={this.onUnSelectAllSeasons}
							/>
						)}


						{currentStep === 2 && (
							<RightSelector
								availableRights={allRights}
								selectedRights={rights}
								onSelectRight={this.onSelectRight}
								onExclusive={this.onExclusive}
							/>
						)}

						{currentStep === 3 && (
							<TerritorySelector
								availableCountries={rightTerritories.territories}
								selectedCountries={territories}
								onSelect={this.onSelectTerritories}
							/>
						)}

						{currentStep === 4 && (
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

						{currentStep === 5 && (
							<div className="property-deals-success">
								<h2 style={{ marginBottom: 20 }}>
									<Translate i18nKey="CMS_ADD_DEAL_SUCCESS" />
								</h2>
								<h4 style={{ marginBottom: 20 }}>
									<Translate i18nKey="CMS_ADD_DEAL_SUCCESS_SUBTITLE" />
								</h4>
								<div>
									<button
										className="button primary-outline-button"
										onClick={this.onFinish}
									>
										No Thanks
									</button>
									<button
										className="button primary-button"
										onClick={this.onAddMore}
									>
										Yes Please
									</button>
								</div>
							</div>
						)}

						{currentStep < 5 && (
							<HorizontalButtonBox style={{ marginTop: 20 }}>
								<button
									className="button secondary-button"
									disabled={saving}
									onClick={currentStep === 1 ? this.cancel : this.onPrevious}
									style={{ marginRight: "auto" }}
								>
									{ currentStep === 1 && <Translate i18nKey="CANCEL" /> }
									{ currentStep !== 1 && <Translate i18nKey="BACK" /> }
								</button>
								<button
									className="button primary-button"
									disabled={saving || isNextButtonDisabled}
									onClick={currentStep === 4 ? this.saveDeals : this.onNext}
								>
									{ !saving && currentStep < 4 && <Translate i18nKey="CMS_CREATE_LISTING_NEXT_BUTTON" /> }
									{ !saving && currentStep === 4 && <Translate i18nKey="CMS_CREATE_DEAL_SAVE_BUTTON" /> }
									{ saving && <Loader xSmall loading /> }
								</button>
							</HorizontalButtonBox>
						)}

					</div>
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
