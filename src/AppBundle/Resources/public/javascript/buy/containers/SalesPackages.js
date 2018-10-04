import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import Moment from "moment/moment";
import LicenseDownloader from '../../main/components/LicenseDownloader'
import {PropTypes} from "prop-types";
import ExtraTerritories from '../../main/components/ExtraTerritories';
import Installments from '../components/Installments';

class SalesPackages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            territoriesList: [],
            installments : []
        };
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.packageIcon = assetsBaseDir + "app/images/bid.png";
        this.infoIcon = assetsBaseDir + "app/images/info.png";
    }

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + this.getCurrencySymbol();
    };

    getCurrencySymbol = () => {
        const {currency} = this.props;
        return (currency === "EUR" ? "€" : "$");
    };

    render() {
        const {salesPackages, onSelectPackage, user, listingId, userCanNotBuy, bundlesWithActivity, bundlesSold} = this.props;
        return (
            <div className="sales-packages">
                { salesPackages.map((item) => {
                    const hasOfferFromUser = (bundlesWithActivity !== null) ? bundlesWithActivity.indexOf(item.id) !== -1 : false;

                    return {...item, hasOfferFromUser}
                }).sort((a, b) => {
                    return b.hasOfferFromUser - a.hasOfferFromUser;
                }).map( (salesPackage, i) => {

                    let hasOfferFromUser = (bundlesWithActivity !== null) ? bundlesWithActivity.indexOf(salesPackage.id) !== -1 : false;
                    let hasClosedDeal = (bundlesSold !== null) ? bundlesSold.indexOf(salesPackage.id) !== -1 : false;

                    let extraTerritories = ( salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? salesPackage.excludedTerritories : salesPackage.territories;

                    if (salesPackage.sold) return;

                    return (
                        <div className="sales-package-container" key={"sales-package-"+ i}>
                            <div className="name">
                                {salesPackage.bundleMethod === "SELL_AS_BUNDLE" && salesPackage.territories.length > 1 && (
                                    <div className="icon spacer">
                                        <img style={{ width: 26, height: 23}} src={this.packageIcon}/>
                                    </div>
                                )}

                                {salesPackage.territories.length > 1 && (
                                    <div className="spacer">
                                        <b>
                                            {salesPackage.territories.length}
                                        </b>
                                    </div>
                                )}

                                <div className="spacer">
                                    <span className="spacer">
                                        {salesPackage.name}
                                    </span>

                                    {extraTerritories && extraTerritories.length > 3 && (
                                        <ExtraTerritories
                                            showAll={salesPackage.regionNamed}
                                            extraTerritories={extraTerritories}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="actions">
                                <div className="spacer">
                                    <Installments
                                        installments={salesPackage.installments}
                                    />
                                </div>
                                <div className="spacer">
                                    {this.getFee(salesPackage)}
                                </div>
                                <div className="spacer">
                                    {salesPackage.salesMethod === "BIDDING" && (
                                        <img style={{width: 23, height: 23}} src={this.bidIcon}/>
                                    )}
                                </div>
                                { salesPackage.salesMethod === "FIXED" && (
                                    <button className="ca-btn primary"
                                            disabled={user.profile !== "BUYER" || salesPackage.sold || userCanNotBuy || salesPackage.hasOfferFromUser}
                                            onClick={() => {onSelectPackage(salesPackage, listingId) }}>
                                        {!hasOfferFromUser && this.context.t("Buy now")}
                                        {hasOfferFromUser && this.context.t("Acquired")}
                                    </button>
                                )}

                                { salesPackage.salesMethod === "BIDDING" && (
                                    <button className="ca-btn primary"
                                            disabled={user.profile !== "BUYER" || salesPackage.sold || userCanNotBuy || hasClosedDeal }
                                            onClick={() => {onSelectPackage(salesPackage, listingId) }}>
                                        { hasOfferFromUser && !hasClosedDeal && this.context.t("Raise bid") }
                                        { hasOfferFromUser && hasClosedDeal && this.context.t("Acquired") }
                                        { !hasOfferFromUser && this.context.t("Place bid") }
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

SalesPackages.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesPackages)