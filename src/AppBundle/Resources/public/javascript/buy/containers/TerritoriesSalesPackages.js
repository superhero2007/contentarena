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
            selectedName : "All",
            sorted : false,
            checkedItems: new Map(),
            territorySelector : (props.filter && props.filter.countries.length > 0 ) ? this.filtered : this.all
        };
    }

    componentDidMount (){
        const {
            salesPackages
        } = this.props;
        let checkedItems = this.state.checkedItems;

        if ( salesPackages.length === 1 ){
            checkedItems.set(salesPackages[0].id, salesPackages[0]);
            this.setState({ checkedItems });
        }
    }

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return <NumberFormat
            thousandSeparator={true}
            value={feeNumber}
            displayType={'text'}
            prefix={getCurrencySymbol(salesPackage.currency.code)+ " "} />
    };

    onFilter = ( response ) => {
        let selected = ( response.all ) ? [] : response.selected,
            selectedName = response.name;
        this.setState({selected, selectedName});
        console.log(response)
    };

    filterBundles = () => {
        const {
            salesPackages = [],
            bundlesWithActivity,
            bundlesSold,
            filter
        } = this.props;

        const {
            selected,
            availabilitySelector,
            territorySelector,
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

        if ( territorySelector === this.filtered ){
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

        return filteredBundles;

    };

    filterIndividualBundles = () => {
        return this.filterBundles().filter( bundle => bundle.bundleMethod !== "SELL_AS_BUNDLE");
    };

    filterTerritorialBundles = () => {
        return this.filterBundles().filter( bundle => bundle.bundleMethod === "SELL_AS_BUNDLE");
    };

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

    render() {
        const {
            salesPackages
        } = this.props;

        const {
            territorySelector,
            availabilitySelector,
            selectedName,
            checkedItems
        } = this.state;

        let filteredIndividualBundles = this.filterIndividualBundles();
        let filteredTerritorialBundles = this.filterTerritorialBundles();

        return (
            <React.Fragment>

                {/* TITLE */}
                <div className="spacer-bottom title">
                    {this.context.t("MARKETPLACE_LABEL_FILTER_TERRITORIES")}
                </div>

                {/* TERRITORY MODE SELECTOR */}
                {salesPackages.length > 1 && <RadioSelector
                    value={territorySelector}
                    onChange={territorySelector=>this.setState({territorySelector})}
                    className="sales-packages-filters"
                    items={[
                        {value: this.filtered, label: "Show Filter Territories" },
                        {value: this.all, label: "Show All Territories" }
                    ]}
                />}

                {/* SELECTOR DESCRIPTION */}
                {salesPackages.length > 1 && <div className="spacer-bottom filter-description">
                    {territorySelector === this.filtered && <span>
                        <strong>{this.context.t("LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_FILTERED")}: </strong>
                        {this.context.t("LISTING_DETAILS_FILTER_DESC_TERRITORIES_FILTERED")}
                    </span>}
                    {territorySelector === this.all && <span>
                        <strong>{this.context.t("LISTING_DETAILS_FILTER_DESC_TITLE_TERRITORIES_ALL")}: </strong>
                        {this.context.t("LISTING_DETAILS_FILTER_DESC_TERRITORIES_ALL")}
                    </span>}
                </div>}

                {/* REGION FILTER */}
                {territorySelector === this.all && salesPackages.length > 1 &&
                <RegionFilter
                        bundles={salesPackages}
                        onChange={ this.onFilter }
                    />
                }

                {/* BUNDLE AVAILABILITY SELECTOR */}
                {salesPackages.length > 1 && <div className="bundles-countries">
                    <div className="bundles-countries-title">
                        {selectedName} Countries
                    </div>

                    <RadioSelector
                        value={availabilitySelector}
                        onChange={availabilitySelector=>this.setState({availabilitySelector})}
                        className="sales-packages-filters"
                        items={[
                            {value: this.all, label: "All" },
                            {value: this.available, label: "Available for sale" },
                            {value: this.notAvailable, label: "Not Available for sale" }
                        ]}
                    />
                </div>}


                {/*{this.context.t("MARKETPLACE_LABEL_PRICE_MINIMUM_BID")}*/}
                {filteredTerritorialBundles.length === 0
                && filteredTerritorialBundles.length === 0
                && territorySelector === this.filtered
                && <div className="sales-packages">
                    {this.context.t("MARKETPLACE_NO_FILTERED_TERRITORIES")}
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
                                            {filteredTerritorialBundles.length > 1 &&<input
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
                                            {filteredTerritorialBundles.length > 1 && <input
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
                                    return (
                                        bundle.salesMethod
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
                                            {filteredIndividualBundles.length > 1 &&
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
                                            {filteredIndividualBundles.length > 1 && !(bundle.hasOfferFromUser && bundle.hasClosedDeal) &&
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
                                    return (
                                        bundle.salesMethod
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

                {/* BUTTON */}
                <div className="d-flex justify-content-end checkout-button">
                    <button className="ca-btn primary"
                            disabled={checkedItems.size === 0}
                            onClick={this.goToCheckout}
                            title={this.context.t("MARKETPLACE_CHECKOUT_BUTTON")}
                    >
                        {this.context.t("MARKETPLACE_CHECKOUT_BUTTON")} <i className="fa fa-chevron-right" />
                    </button>

                </div>
            </React.Fragment>
        );
    }
}

TerritoriesSalesPackages.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TerritoriesSalesPackages;