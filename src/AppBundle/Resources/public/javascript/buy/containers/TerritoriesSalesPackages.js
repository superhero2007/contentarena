import React, { PureComponent } from 'react';
import {PropTypes} from "prop-types";
import ExtraTerritories from '../../main/components/ExtraTerritories';
import NumberFormat from 'react-number-format';
import {getCurrencySymbol} from "../../main/actions/utils";
import RadioSelector from "../../main/components/RadioSelector";
import { packageIcon} from "../../main/components/Icons";
import RegionFilter from "../../main/components/RegionFilter";
import cn from "classnames";
import ReactTable from "react-table";

class TerritoriesSalesPackages extends PureComponent {

    constructor(props) {
        super(props);
        this.filtered = "filtered";
        this.all = "all";
        this.available = "available";
        this.notAvailable = "notAvailable";
        this.state = {
            territoriesList: [],
            installments : [],
            selected : [],
            availabilitySelector : this.all,
            filteredIndividualBundles : [],
            filteredTerritorialBundles : [],
            selectedName : "All",
            sorted : false,
            checkedItems: new Map(),
            territories : (props.filter && props.filter.countries.length > 0 ) ? this.filtered : this.all
        };
    }

    componentDidMount (){
        const {
            selected,
            territories
        } = this.state;
        this.filterBundles(territories, selected, false);
    }

    getFee = (salesPackage) => {
        let feeNumber = parseFloat(salesPackage.fee);

        if (feeNumber === 0) feeNumber = 1;

        return <NumberFormat
            thousandSeparator={true}
            value={feeNumber}
            displayType={'text'}
            prefix={getCurrencySymbol(salesPackage.currency.code)+ " "} />
    };

    onFilter = ( response ) => {
        const {
            territories
        } = this.state;
        let selected = ( response.all ) ? [] : response.selected,
            selectedName = response.name;
        this.setState({selected, selectedName});
        console.log("ON FILTER");
        this.filterBundles(territories, selected,true);
    };

    filterBundles = (territories,selected,clear) => {
        const {
            salesPackages = [],
            bundlesWithActivity,
            bundlesSold,
            filter
        } = this.props;

        const {
            availabilitySelector,
            sorted
        } = this.state;

        let filteredBundles = salesPackages.filter( sp => {
            if ( selected.length === 0 ) return true;
            return selected.indexOf(sp.id) !== -1
        }).map( bundle => {

            bundle.hasOfferFromUser = (bundlesWithActivity !== null) ? bundlesWithActivity.indexOf(bundle.id) !== -1 : false;
            bundle.hasClosedDeal = (bundlesSold !== null) ? bundlesSold.indexOf(bundle.id) !== -1 : false;
            bundle.extraTerritories = (bundle.territoriesMethod === "WORLDWIDE_EXCLUDING") ? bundle.excludedTerritories : bundle.territories;
            return bundle;
        });

        filteredBundles = filteredBundles.filter( bundle => !bundle.sold );

        if ( territories === this.filtered ){
            filteredBundles = filteredBundles.filter( bundle => {
                return bundle.territories.filter( territory => filter.countries.indexOf(territory.label) !== -1 ).length > 0
            });
        }

        if ( availabilitySelector === this.available ){
            filteredBundles = filteredBundles.filter( bundle => !bundle.hasOfferFromUser && !bundle.hasClosedDeal  );
        }

        if ( availabilitySelector === this.notAvailable ){
            filteredBundles = filteredBundles.filter( bundle => bundle.hasOfferFromUser && bundle.hasClosedDeal  );
        }

        if ( !sorted ){
            filteredBundles = filteredBundles.sort( (a, b) => b.hasOfferFromUser - a.hasOfferFromUser );
            this.setState({sorted: true});
        }

        let filteredIndividualBundles =  filteredBundles.filter( bundle => bundle.bundleMethod !== "SELL_AS_BUNDLE");
        let filteredTerritorialBundles =  filteredBundles.filter( bundle => bundle.bundleMethod === "SELL_AS_BUNDLE");

        this.setDefaultSelection(territories, filteredIndividualBundles, filteredTerritorialBundles, clear);

    };
s
    selectTerritory = (e, bundle) => {
        const isChecked = e.target.checked;
        let checkedItems = this.state.checkedItems;

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

    setDefaultSelection = (territories, filteredIndividualBundles, filteredTerritorialBundles, clear) => {

        const {
            salesPackages
        } = this.props;

        let checkedItems = this.state.checkedItems;
        let total = filteredTerritorialBundles.length + filteredIndividualBundles.length;

        if( clear ) checkedItems.clear();

        if ( salesPackages.length === 1 ){
            checkedItems.set(salesPackages[0].id, salesPackages[0]);

        } else if (total === 1){
            if (filteredIndividualBundles.length === 1) checkedItems.set(filteredIndividualBundles[0].id, filteredIndividualBundles[0]);
            if (filteredTerritorialBundles.length === 1) checkedItems.set(filteredTerritorialBundles[0].id, filteredTerritorialBundles[0]);
        }

        this.setState({territories, checkedItems, filteredIndividualBundles, filteredTerritorialBundles});
    };

    selectAllTerritories = (e, bundles) => {
        const isChecked = e.target.checked;
        let checkedItems = this.state.checkedItems;

        if (isChecked) {
            bundles.forEach(bundle => {
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
            customId
        } = this.props;

        const {
            checkedItems
        } = this.state;

        if (onSelectPackage) onSelectPackage([...checkedItems.keys()], customId);
    };

    getCheckedTerritoriesSize = () => {

        const {
            checkedItems
        } = this.state;

        return Array.from(checkedItems.values()).map(item=>{return item.territories.length}).reduce((a, b) => a + b, 0);

    };

    renderCheckoutButton = () => {
        const {
            userCanNotBuy
        } = this.props;

        const {
            checkedItems
        } = this.state;

        return (
            <button className="ca-btn primary"
                    disabled={checkedItems.size === 0 || userCanNotBuy}
                    onClick={this.goToCheckout}
                    title={this.context.t("MARKETPLACE_CHECKOUT_BUTTON")}
            >
                {this.context.t("MARKETPLACE_CHECKOUT_BUTTON")} ({this.getCheckedTerritoriesSize()}) <i className="fa fa-chevron-right" />
            </button>
        );
    };

    render() {
        const {
            salesPackages,
            userCanNotBuy
        } = this.props;

        const {
            territories,
            filteredIndividualBundles,
            filteredTerritorialBundles,
            selectedName,
            checkedItems
        } = this.state;

        let total = filteredTerritorialBundles.length + filteredIndividualBundles.length;
        return (
            <React.Fragment>

                {/* TITLE */}
                <div className="spacer-bottom title">
                    {this.context.t("MARKETPLACE_LABEL_FILTER_TERRITORIES")}
                </div>

                {/* TERRITORY MODE SELECTOR */}
                {salesPackages.length > 1 && <RadioSelector
                    value={territories}
                    onChange={this.handleTerritorySelector}
                    className="sales-packages-filters"
                    items={[
                        {value: this.filtered, label: "Show Filter Territories" },
                        {value: this.all, label: "Show All Territories" }
                    ]}
                />}

                {/* SELECTOR DESCRIPTION */}
                {salesPackages.length > 1 && <div className="spacer-bottom filter-description">
                    {territories === this.filtered && <span>
                        <strong>{this.context.t("LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_FILTERED")}: </strong>
                        {this.context.t("LISTING_DETAILS_FILTER_DESC_TERRITORIES_FILTERED")}
                    </span>}
                    {territories === this.all && <span>
                        <strong>{this.context.t("LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_ALL")}: </strong>
                        {this.context.t("LISTING_DETAILS_FILTER_DESC_TERRITORIES_ALL")}
                    </span>}
                </div>}

                {/* REGION FILTER */}
                {territories === this.all && salesPackages.length > 1 && <RegionFilter
                        bundles={salesPackages}
                        onChange={ this.onFilter }
                    />
                }

                {/* BUNDLE AVAILABILITY SELECTOR */}
                {salesPackages.length > 1 && total > 1 && <div className="bundles-countries">
                    <div className="bundles-countries-title">
                        {selectedName} Countries
                    </div>

                    {total > 3 && this.renderCheckoutButton()}

                    {/*<RadioSelector
                        value={availabilitySelector}
                        onChange={availabilitySelector=>this.setState({availabilitySelector})}
                        className="sales-packages-filters"
                        items={[
                            {value: this.all, label: "All" },
                            {value: this.available, label: "Available for sale" },
                            {value: this.notAvailable, label: "Not Available for sale" }
                        ]}
                    />*/}
                </div>}

                {filteredTerritorialBundles.length > 0 && <div className="sales-packages">

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
                                Header: () => {
                                    return (
                                        <div>
                                            {filteredTerritorialBundles.length > 1 && !userCanNotBuy && <input
                                                className={"ca-checkbox"}
                                                onChange={e => this.selectAllTerritories(e, filteredTerritorialBundles)}
                                                type="checkbox"/>}
                                            {this.context.t("SALES_PACKAGE_TABLE_TERRITORY_BUNDLE")}
                                        </div>

                                    )
                                },
                                headerClassName: filteredTerritorialBundles.length > 15 ? 'table-header-big scroll' : 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    return (
                                        <div className="d-flex align-items-center">
                                            { total > 1 && !userCanNotBuy && <input
                                                checked={checkedItems.get(bundle.id)}
                                                className={"ca-checkbox"}
                                                type="checkbox"
                                                onChange={e => this.selectTerritory(e, bundle)}
                                            />}

                                            {bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
                                                <img src={packageIcon} style={{marginRight: 5}}/>
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
                                    )
                                }
                            },
                            {
                                Header: this.context.t("SALES_PACKAGE_TABLE_SALES_METHOD"),
                                headerClassName: 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    let key = "CHECKOUT_METHOD_" + bundle.salesMethod;
                                    return (
                                        this.context.t(key)
                                    )
                                }
                            },
                            {
                                Header: this.context.t("SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID"),
                                headerClassName: 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    return (
                                        <div className="price-action-wrapper">
                                            <div title={bundle.fee}>
                                                {this.getFee(bundle)}
                                            </div>
                                        </div>
                                    )
                                }
                            },
                        ]}
                    />
                </div>}

                {/* INDIVIDUAL BUNDLES */}
                {filteredIndividualBundles.length > 0 && <div className="sales-packages">

                    <ReactTable
                        className={cn("ca-table round-0 bundles-table", {showScroll: filteredIndividualBundles.length > 15})}
                        defaultPageSize={242} // max number of possible Territorial Bundles
                        showPageSizeOptions={false}
                        noDataText={null}
                        showPagination={false}
                        minRows={0}
                        resizable={false}
                        data={filteredIndividualBundles}
                        columns={[
                            {
                                Header: () => {
                                    return (
                                        <div>
                                            {filteredIndividualBundles.length > 1 && !userCanNotBuy &&
                                            <input
                                                className={"ca-checkbox"}
                                                onChange={e => this.selectAllTerritories(e, filteredIndividualBundles)}
                                                type="checkbox"/>}
                                            {this.context.t("SALES_PACKAGE_TABLE_TERRITORY_BUNDLE")}
                                        </div>

                                    )
                                },
                                headerClassName: filteredIndividualBundles.length > 15 ? 'table-header-big scroll' : 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    return (
                                        <div className="d-flex align-items-center">
                                            {total > 1 &&
                                            !(bundle.hasOfferFromUser && bundle.hasClosedDeal) &&
                                            !userCanNotBuy &&
                                            <input
                                                checked={checkedItems.get(bundle.id)}
                                                className={"ca-checkbox"}
                                                type="checkbox"
                                                onChange={e => this.selectTerritory(e, bundle)}
                                            />}

                                            {bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
                                                <img src={packageIcon} style={{marginRight: 5}}/>
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
                                    )
                                }
                            },
                            {
                                Header: this.context.t("SALES_PACKAGE_TABLE_SALES_METHOD"),
                                headerClassName: 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    let key = "CHECKOUT_METHOD_" + bundle.salesMethod;
                                    return (
                                        this.context.t(key)
                                    )
                                }
                            },
                            {
                                Header: this.context.t("SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID"),
                                headerClassName: 'table-header-big',
                                Cell: props => {
                                    const bundle = props.original;
                                    return (
                                        <div className="price-action-wrapper">
                                            <div title={bundle.fee}>
                                                {+bundle.fee > 0 && this.getFee(bundle)}
                                            </div>
                                        </div>
                                    )
                                }
                            },
                        ]}
                    />

                </div>}

                {/* SECOND CHECKOUT BUTTON */}
                <div className="d-flex justify-content-end checkout-button">
                    {this.renderCheckoutButton()}
                </div>
            </React.Fragment>
        );
    }
}

TerritoriesSalesPackages.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TerritoriesSalesPackages;