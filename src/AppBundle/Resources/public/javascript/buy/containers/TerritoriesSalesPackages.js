import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import NumberFormat from "react-number-format";
import cn from "classnames";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import ExtraTerritories from "../../main/components/ExtraTerritories";
import { getCurrencySymbol } from "../../main/actions/utils";
import RadioSelector from "../../main/components/RadioSelector";
import { packageIcon } from "../../main/components/Icons";
import RegionFilter from "../../main/components/RegionFilter";
import LocalStorageHelper from "../../main/utiles/localStorageHelper";

class TerritoriesSalesPackages extends PureComponent {
	constructor(props) {
		super(props);

		const countriesFromStorage = LocalStorageHelper.getCountriesSelected();

		this.filtered = "filtered";
		this.all = "all";
		this.available = "available";
		this.notAvailable = "notAvailable";
		this.state = {
			territoriesList: [],
			installments: [],
			selected: [],
			filteredIndividualBundles: [],
			filteredTerritorialBundles: [],
			selectedName: "All",
			checkedItems: new Map(),
			territories: (countriesFromStorage && countriesFromStorage.length > 0) ? this.filtered : this.all,
			bundles: [],
			filter: {
				countries: countriesFromStorage,
			},
		};
	}

	componentDidMount() {
		const {
			selected,
			territories,
		} = this.state;
		this.filterBundles(territories, selected, false);
	}

	getFee = (salesPackage) => {
		let feeNumber = parseFloat(salesPackage.fee);

		if (feeNumber === 0) feeNumber = 1;
		if (feeNumber === 1) return this.context.t("SALES_PACKAGE_TABLE_MINIMUM_BID_ONE");

		return (
			<NumberFormat
				thousandSeparator
				value={feeNumber}
				displayType="text"
				prefix={`${getCurrencySymbol(salesPackage.currency.code)} `}
			/>
		);
	};

	onFilter = (response) => {
		const {
			territories,
		} = this.state;
		const selected = (response.all) ? [] : response.selected;
		const selectedName = response.name;
		this.setState({
			selected,
			selectedName,
		});
		this.filterBundles(territories, selected, true);
	};

	filterBundles = (territories, selected, clear) => {
		const {
			salesPackages,
			bundlesWithActivity,
			bundlesSold,
		} = this.props;

		const {
			filter,
		} = this.state;

		// Filter sold out bundles
		let bundles = (salesPackages === null || salesPackages === undefined) ? [] : salesPackages.filter(bundle => !bundle.sold);

		// Filter bundles bought by the user
		bundles = bundles.map((bundle) => {
			bundle.hasOfferFromUser = (bundlesWithActivity !== null) ? bundlesWithActivity.indexOf(bundle.id) !== -1 : false;
			bundle.hasClosedDeal = (bundlesSold !== null) ? bundlesSold.indexOf(bundle.id) !== -1 : false;
			return bundle;
		})
			.filter(bundle => !(bundle.hasOfferFromUser && bundle.hasClosedDeal));

		// Filter bundles by marketplace territory filter
		if (territories === this.filtered) {
			bundles = bundles.filter(bundle => bundle.territories.filter(territory => filter.countries.indexOf(territory.label) !== -1).length > 0);
		}

		// Filter bundles by territory selector
		const filteredBundles = bundles.filter((sp) => {
			if (selected.length === 0) return true;
			return selected.indexOf(sp.id) !== -1;
		})
			.map((bundle) => {
				bundle.extraTerritories = (bundle.territoriesMethod === "WORLDWIDE_EXCLUDING") ? bundle.excludedTerritories : bundle.territories;
				return bundle;
			});

		const filteredIndividualBundles = filteredBundles.filter(bundle => bundle.bundleMethod !== "SELL_AS_BUNDLE");
		const filteredTerritorialBundles = filteredBundles.filter(bundle => bundle.bundleMethod === "SELL_AS_BUNDLE");

		this.setDefaultSelection(bundles, territories, filteredIndividualBundles, filteredTerritorialBundles, clear);
	};

	selectTerritory = (e, bundle) => {
		const isChecked = e.target.checked;
		const { checkedItems } = this.state;

		if (isChecked) {
			checkedItems.set(bundle.id, bundle);
		} else {
			checkedItems.delete(bundle.id);
		}

		this.setState({ checkedItems });
		this.forceUpdate();
	};

	handleTerritorySelector = (territories) => {
		const {
			selected,
		} = this.state;
		this.filterBundles(territories, selected, true);
	};

	setDefaultSelection = (bundles, territories, filteredIndividualBundles, filteredTerritorialBundles, clear) => {
		const {
			checkedItems,
		} = this.state;
		const total = filteredTerritorialBundles.length + filteredIndividualBundles.length;

		if (clear) checkedItems.clear();

		if (bundles.length === 1) {
			checkedItems.set(bundles[0].id, bundles[0]);
		} else if (total === 1) {
			if (filteredIndividualBundles.length === 1) checkedItems.set(filteredIndividualBundles[0].id, filteredIndividualBundles[0]);
			if (filteredTerritorialBundles.length === 1) checkedItems.set(filteredTerritorialBundles[0].id, filteredTerritorialBundles[0]);
		}

		this.setState({
			bundles,
			territories,
			checkedItems,
			filteredIndividualBundles,
			filteredTerritorialBundles,
		});
	};

	selectAllTerritories = (e, bundles) => {
		const isChecked = e.target.checked;
		const { checkedItems } = this.state;

		if (isChecked) {
			bundles.forEach((bundle) => {
				checkedItems.set(bundle.id, bundle);
			});
		} else {
			checkedItems.clear();
		}

		this.setState({ checkedItems });
		this.forceUpdate();
	};

	goToCheckout = () => {
		const {
			onSelectPackage,
			customId,
		} = this.props;

		const {
			checkedItems,
		} = this.state;

		if (onSelectPackage) onSelectPackage([...checkedItems.keys()], customId);
	};

	getCheckedTerritoriesSize = () => {
		const {
			checkedItems,
		} = this.state;

		return Array.from(checkedItems.values())
			.map(item => item.territories.length)
			.reduce((a, b) => a + b, 0);
	};

	renderCheckoutButton = (large) => {
		const { checkedItems } = this.state;

		return (
			<button
				className={`ca-btn primary ${large}`}
				disabled={checkedItems.size === 0}
				onClick={this.goToCheckout}
				title={this.context.t("MARKETPLACE_CHECKOUT_BUTTON")}
			>
				<Translate i18nKey="MARKETPLACE_CHECKOUT_BUTTON" />
				{" "}
				{this.getCheckedTerritoriesSize()}
				<i className="fa fa-chevron-right" />
			</button>
		);
	};

	render() {
		const {
			userCanNotBuy,
		} = this.props;

		const {
			territories,
			filteredIndividualBundles,
			filteredTerritorialBundles,
			selectedName,
			checkedItems,
			bundles,
			filter,
		} = this.state;

		const total = filteredTerritorialBundles.length + filteredIndividualBundles.length;
		const showFloatingCheckout = total > 3 && !userCanNotBuy;
		const showFixedCheckout = total <= 3 && !userCanNotBuy;

		return (
			<React.Fragment>

				{/* TITLE */}
				<div className="spacer-bottom title">
					<Translate i18nKey="MARKETPLACE_LABEL_FILTER_TERRITORIES" />
				</div>

				{/* TERRITORY MODE SELECTOR */}
				{(territories === this.filtered || bundles.length > 1) && (
					<RadioSelector
						value={territories}
						onChange={this.handleTerritorySelector}
						className="sales-packages-filters"
						items={[
							{
								value: this.filtered,
								label: <Translate i18nKey="LISTING_DETAILS_RADIO_LABEL_TERRITORIES_FILTERED" />,
								disabled: !filter.countries || filter.countries.length === 0,
							},
							{
								value: this.all,
								label: <Translate i18nKey="LISTING_DETAILS_RADIO_LABEL_ALL_TERRITORIES" />,
							},
						]}
					/>
				)}

				{/* SELECTOR DESCRIPTION */}
				{
					<div className="spacer-bottom filter-description">
						{territories === this.filtered && bundles.length > 1 && (
							<span>
								<strong>
									<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_FILTERED" />:{" "}
								</strong>
								<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TERRITORIES_FILTERED" />
							</span>
						)}
						{territories === this.filtered && bundles.length === 0 && (
							<span>
								<strong>
									<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_FILTERED_EMPTY" />
								:


									{" "}
								</strong>
								<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TERRITORIES_FILTERED_EMPTY" />
							</span>
						)}
						{territories === this.all && (
							<span>
								<strong>
									<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_ALL" />
								:
									{" "}
								</strong>
								<Translate i18nKey="LISTING_DETAILS_FILTER_DESC_TERRITORIES_ALL" />
							</span>
						)}
					</div>
				}

				{/* REGION FILTER */}
				{territories === this.all && bundles.length > 1 && (
					<RegionFilter
						bundles={bundles}
						onChange={this.onFilter}
					/>
				)
				}

				{/* BUNDLE AVAILABILITY SELECTOR */}
				<div className="bundles-countries text-right">
					<div className="bundles-countries-title">
						{filteredTerritorialBundles.length > 0 && <Translate i18nKey="SALES_PACKAGE_HEADER_TERRITORIAL_BUNDLES" /> }
						{filteredTerritorialBundles.length === 0 && <Translate i18nKey="SALES_PACKAGE_HEADER_INDIVIDUAL_TERRITORIES" /> }
					</div>
					{total > 3 && !userCanNotBuy && this.renderCheckoutButton()}
				</div>

				{filteredTerritorialBundles.length > 0 && (
					<div
						className={cn("sales-packages", { "has-checkout": showFloatingCheckout })}
					>
						<ReactTable
							className={cn("ca-table round-0 bundles-table")}
							defaultPageSize={242} // max number of possible Territorial Bundles
							showPageSizeOptions={false}
							noDataText={null}
							showPagination={false}
							minRows={0}
							resizable={false}
							data={filteredTerritorialBundles}
							columns={[
								{
									Header: () => (
										<div>
											{filteredTerritorialBundles.length > 1 && !userCanNotBuy && (
												<input
													className="ca-checkbox"
													onChange={e => this.selectAllTerritories(e, filteredTerritorialBundles)}
													type="checkbox"
												/>
											)}
											<Translate i18nKey="SALES_PACKAGE_TABLE_TERRITORY_BUNDLE" />
										</div>

									),
									headerClassName: filteredTerritorialBundles.length > 15 ? "table-header-big scroll" : "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										return (
											<div className="d-flex align-items-center">
												{total > 1 && !userCanNotBuy && (
													<input
														checked={checkedItems.get(bundle.id)}
														className="ca-checkbox"
														type="checkbox"
														onChange={e => this.selectTerritory(e, bundle)}
													/>
												)}

												{bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
													<img src={packageIcon} style={{ marginRight: 5 }} alt="" />
												)}

												<span>
													{bundle.name}
												</span>

												{bundle.extraTerritories && bundle.extraTerritories.length > 3 && (
													<ExtraTerritories
														excluded={bundle.territoriesMethod === "WORLDWIDE_EXCLUDING"}
														showAll={bundle.regionNamed}
														extraTerritories={bundle.extraTerritories}
													/>
												)}
											</div>
										);
									},
								},
								{
									Header: <Translate i18nKey="SALES_PACKAGE_TABLE_SALES_METHOD" />,
									headerClassName: "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										const key = `CHECKOUT_METHOD_${bundle.salesMethod}`;
										return (
											<Translate i18nKey={key} />
										);
									},
								},
								{
									Header: <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID" />,
									headerClassName: "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										return (
											<div className="price-action-wrapper">
												<div title={bundle.fee}>
													{this.getFee(bundle)}
												</div>
											</div>
										);
									},
								},
							]}
						/>
					</div>
				)}


				{filteredTerritorialBundles.length > 0 && filteredIndividualBundles.length > 0 && (
					<div className="bundles-countries">
						<div className="bundles-countries-title">
							<Translate i18nKey="SALES_PACKAGE_HEADER_INDIVIDUAL_TERRITORIES" />
						</div>
					</div>
				)}

				{/* INDIVIDUAL BUNDLES */}
				{filteredIndividualBundles.length > 0 && (
					<div
						className={cn("sales-packages", { "has-checkout": showFloatingCheckout })}
					>

						<ReactTable
							className={cn("ca-table round-0 bundles-table", { showScroll: filteredIndividualBundles.length > 15 })}
							defaultPageSize={242} // max number of possible Territorial Bundles
							showPageSizeOptions={false}
							noDataText={null}
							showPagination={false}
							minRows={0}
							resizable={false}
							data={filteredIndividualBundles}
							columns={[
								{
									Header: () => (
										<div>
											{filteredIndividualBundles.length > 1 && !userCanNotBuy
											&& (
												<input
													className="ca-checkbox"
													onChange={e => this.selectAllTerritories(e, filteredIndividualBundles)}
													type="checkbox"
												/>
											)}
											<Translate i18nKey="SALES_PACKAGE_TABLE_TERRITORY_BUNDLE" />
										</div>

									),
									headerClassName: filteredIndividualBundles.length > 15 ? "table-header-big scroll" : "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										return (
											<div className="d-flex align-items-center">
												{total > 1
												&& !userCanNotBuy
												&& (
													<input
														checked={checkedItems.get(bundle.id)}
														className="ca-checkbox"
														type="checkbox"
														onChange={e => this.selectTerritory(e, bundle)}
													/>
												)}

												{bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
													<img src={packageIcon} style={{ marginRight: 5 }} alt="" />
												)}

												<span>
													{bundle.name}
												</span>

												{bundle.extraTerritories && bundle.extraTerritories.length > 3 && (
													<ExtraTerritories
														excluded={bundle.territoriesMethod === "WORLDWIDE_EXCLUDING"}
														showAll={bundle.regionNamed}
														extraTerritories={bundle.extraTerritories}
													/>
												)}
											</div>
										);
									},
								},
								{
									Header: <Translate i18nKey="SALES_PACKAGE_TABLE_SALES_METHOD" />,
									headerClassName: "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										const key = `CHECKOUT_METHOD_${bundle.salesMethod}`;
										return (
											<Translate i18nKey={key} />
										);
									},
								},
								{
									Header: <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID" />,
									headerClassName: "table-header-big",
									Cell: (props) => {
										const bundle = props.original;
										return (
											<div className="price-action-wrapper">
												<div title={bundle.fee}>
													{this.getFee(bundle)}
												</div>
											</div>
										);
									},
								},
							]}
						/>

					</div>
				)}

				{/* SECOND CHECKOUT BUTTON */}
				{showFloatingCheckout && (
					<div className="checkout-button">
						{this.renderCheckoutButton("large")}
					</div>
				)}

				{
					showFixedCheckout
					&& (
						<div className="buttons-container">
							{this.renderCheckoutButton("large")}
						</div>
					)
				}
			</React.Fragment>
		);
	}
}

TerritoriesSalesPackages.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default TerritoriesSalesPackages;
