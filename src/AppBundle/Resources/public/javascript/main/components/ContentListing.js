import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import {PropTypes} from "prop-types";
import {
    blueCheckIcon,
    yellowCheckIcon,
    coinIcon,
    hammerIcon,
    bucketIcon,
    bidIcon,
    fixedIcon
} from "./Icons";
import {getCurrencySymbol} from "../actions/utils";
import Tooltip from '../../main/components/Tooltip';
import ExtraTerritories from '../../main/components/ExtraTerritories';

const SalesPackages = ({salesPackages, getFee}) => {
    let salesPackagesArray = Array.isArray(salesPackages) ? salesPackages : [salesPackages];
    return (
        <React.Fragment>
            {salesPackagesArray.slice(0, 3).map( ( salesPackage, i) => {
                let extraTerritories = ( salesPackage.territoriesMethod === 'WORLDWIDE_EXCLUDING') ? salesPackage.excludedTerritories : salesPackage.territories;
                return (
                    <div className="sales-package" key={"sp-"+ i}>

                        {salesPackage.bundleMethod === "SELL_AS_BUNDLE" && (
                            <div className="icon">
                                <img src={fixedIcon}/>
                            </div>
                        )}

                        <div className="name">
                            {salesPackage.name}
                        </div>

                        {extraTerritories && extraTerritories.length > 3 && (
                            <div style={{marginRight: 5}}>
                                <ExtraTerritories
                                    extraTerritories={extraTerritories}
                                />
                            </div>
                        )}

                        {(salesPackage.salesMethod !== "BIDDING" ||  (salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0)) && (
                            <div className="fee">
                                {getFee(salesPackage)}
                            </div>
                        )}

                        {salesPackage.salesMethod === "BIDDING" && (
                            <div className="icon">
                                <img src={bidIcon}/>
                            </div>
                        )}

                    </div>
                )
            })}
            {salesPackages.length > 3 && (
                <div className="sales-package show-all">
                    <b> + {salesPackages.length - 3} </b>
                </div>
            ) }
        </React.Fragment>
    )
}

class ContentListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buyingMode : false,
            territoriesList: []
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = hammerIcon;
        this.fixedIcon = fixedIcon;
        this.blueCheck = blueCheckIcon;
        this.yellowCheck = yellowCheckIcon;
        this.bucketicon = assetsBaseDir + "app/images/bucket.png";
    }

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + this.getCurrencySymbol();
    };

    getCurrencySymbol = () => {
        const {currency} = this.props;
        return (currency === "EUR" ? "€" : "$");
    };

    onSelect = () => {
      const {onSelect, customId, status, checkExpired} = this.props;

      if (checkExpired && status && status.name !== "EDITED" && status.name !== "APPROVED" ) return;

      if ( onSelect ) onSelect(customId);

    };

    confirmRemoveFromWatchlist = (e) =>{
        this.setState({confirmWatchlistRemove : true});
        e.stopPropagation();
    };

    cancelRemoveFromWatchlist = (e) =>{
        this.setState({confirmWatchlistRemove : false});
        e.stopPropagation();
    };

    removeFromWatchlist = (e) => {
        const {customId, onWatchlistRemove} = this.props;
        ContentArena.Api.watchlist(customId);

        if ( onWatchlistRemove ) onWatchlistRemove(customId);
        e.stopPropagation();
    };

    sortSalesPackages = (a, b) => {
        if (b.territoriesMethod ==="WORLDWIDE") return -1;
        return this.compareProperty(a.territories.length, b.territories.length)
            || this.compareProperty(b.name, a.name);
    };

    sortAfterFilter = (a, b) => {

        if (b.territoriesMethod ==="WORLDWIDE") {
            return this.compareProperty(b.territories.length, a.territories.length)
                || this.compareProperty(a.name, b.name);
        }

        return this.compareProperty(a.territories.length, b.territories.length)
            || this.compareProperty(a.name, b.name);
    };

    sortByFilter = (salesPackages) => {

        const { filter } = this.props;

        let temp = [] ;
        let territories = filter.countries.map(c => c);

        salesPackages.forEach((e,i,l)=>{

            let t = e.territories.map(t=>t.value);
            let et = (e.territoriesMethod === "WORLDWIDE_EXCLUDING") ? e.excludedTerritories.map(t=>t.value) : [];
            let all = [...t,...et];
            let include = false;

            territories.forEach(t =>{
                if ( all.indexOf(t) !== -1 ) include = true;
            });

            if ( e.bundleMethod === "SELL_AS_BUNDLE" && e.territoriesMethod === "WORLDWIDE") {
                include = true;
            }

            if ( include) {
                temp.push(e);
            }
        });

        return [...temp];
    };

    compareProperty = (a, b) =>  {
        return (a > b) ? 1 : ((b > a) ? -1 : 0)
    };

    render(){
        const {
            name,
            expiresAt,
            PROGRAM_NAME,
            onSelectName,
            imageBase64,
            image,
            filter,
            sortSalesPackages,
            watchlistRemove,
            company,
            defaultRightsPackage,
            rightsPackage,
            owner,
            bid,
            checkExpired,
            status,
            declined,
            onDelete,
            customId
        } = this.props;
        const {confirmWatchlistRemove} = this.state;

        let salesPackages = this.props.salesPackages;
        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

        if ( filter && filter.countries.length > 0 && sortSalesPackages) {
            salesPackages = this.sortByFilter(salesPackages);
            salesPackages.sort(this.sortAfterFilter);
        } else {
            salesPackages.sort(this.sortSalesPackages).reverse();
        }

        return (
            <div className="listing-list-view" onClick={this.onSelect}>
                <div className={"left"}  >
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                </div>
                <div className={"right"} >
                    <div className="name-wrapper">
                        { (!checkExpired || status.name === "EDITED" || status.name === "APPROVED"  ) && <div className={"name"} onClick={() => { if (onSelectName) onSelectName() }}>
                            {name}
                        </div>}

                        { checkExpired && status.name !== "EDITED" && status.name !== "APPROVED" && <div className={"name"} style={{cursor: "default"}}>
                            {name}
                        </div>}

                        {company && (
                            <div className="company-name">{coinIcon} {company.legalName}</div>
                        )}
                    </div>

                    <div className="listing-wrapper">
                        <ContentListingEventDetails {...this.props} />

                        <ContentListingRightsPackage
                            rightsPackage={rightsPackage}
                            defaultRightsPackage={defaultRightsPackage}
                            programName={PROGRAM_NAME}
                        />
                    </div>

                    <div className="sales-bundles-wrapper">
                        <SalesPackages
                            salesPackages={salesPackages}
                            getFee={this.getFee}
                        />
                        {expiresAt && (
                            <div className="expires">
                                Expiry: <b>{Moment(expiresAt).format('MM/DD/YYYY')}</b>
                            </div>
                        )}
                    </div>

                </div>
                {watchlistRemove && (
                    <div className="watchlist-options additional">
                        {confirmWatchlistRemove ? (
                            <div className="wrapper">
                                <div>
                                    {this.context.t("WATCHLIST_REMOVE_CONFIRMATION")}
                                </div>
                                <button type="button" className="ca-btn ca-btn-primary ca-btn-small" onClick={this.removeFromWatchlist}>
                                    {this.context.t("Yes")}
                                 </button>
                                <button type="button" className="ca-btn ca-btn-danger ca-btn-small" onClick={this.cancelRemoveFromWatchlist}>
                                    {this.context.t("Cancel")}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <i className="fa fa-trash-o icon" aria-hidden="true"
                                   onClick={this.confirmRemoveFromWatchlist}
                                />
                                {owner && (
                                    <div className="owner">
                                        {this.context.t("Placed by")} <b>{owner.firstName} {owner.lastName}</b>
                                    </div>
                                )}
                            </div>

                        )}
                    </div>
                )}

                {/*BID OPTIONS*/}
                {bid && (
                    <div className="bids-options additional">
                        <div className="wrapper">
                            <div className="bid-sales-wrap">
                                <SalesPackages
                                    salesPackages={bid.salesPackage}
                                    getFee={this.getFee}
                                />
                            </div>

                            <div className="bid-price">
                                {parseFloat(bid.amount).toLocaleString()} {getCurrencySymbol(bid.salesPackage.currency.code)}
                            </div>

                            <div className="bid-actions">
                                {bid.status.name === "EDITED" && (
                                    <Tooltip
                                        id="StatusTooltip"
                                        icon={"bid-icon status fa fa-info-circle"}
                                        text={this.context.t("PENDING_BIDS_TOOLTIP_LISTING_EDITED")}
                                    />
                                )}

                                {( !declined || (declined && bid.status.name === "REJECTED" && !bid.salesPackage.sold) ) && (
                                    <a
                                        className="ca-btn ca-btn-primary"
                                        href='#'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            location.href = `/listing/${customId}/checkout/${bid.salesPackage.id}`;
                                        }}
                                    >
                                        {this.context.t("Increase bid")}
                                    </a>
                                )}

                                {bid.message && bid.message !== "" && (
                                    <Tooltip
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            location.href = `/redirect-integration/messages-by-bid/${bid.id}`;
                                        }}
                                        id="MessageTooltip"
                                        icon={"bid-icon message fa fa-envelope"}
                                        text={bid.message}
                                    />
                                )}
                            </div>

                            <div className="bid-author">
                                <div>{Moment(bid.createdAt).format('DD/MM/YYYY')}</div>
                                {this.context.t("Placed by:")} <b>{bid.buyerUser.firstName + " " + bid.buyerUser.lastName}</b>
                            </div>

                            {declined && (
                                <div className="bid-remove"
                                     onClick={(e)=>{this.setState({showRemoveConfirm: true});e.stopPropagation();}}
                                >
                                    <img src={bucketIcon}/>
                                </div>
                            )}
                            {/*CONFIRM REMOVE*/}
                            {this.state.showRemoveConfirm && (
                                <div className="confirmation-tooltip">
                                    <div className={"confirmation-text"}>
                                        {this.context.t("PENDING_BIDS_REMOVE_TITLE")}
                                    </div>
                                    <button className={"button button-confirm"} onClick={(e)=>{
                                        e.stopPropagation()
                                        this.setState({showRemoveConfirm: false});
                                        onDelete(bid.id);
                                    }}>
                                        {this.context.t("PENDING_BIDS_REMOVE_BUTTON_CONFIRM")}
                                    </button>
                                    <button className={"button"} onClick={(e)=>{
                                        e.stopPropagation()
                                        this.setState({showRemoveConfirm: false});
                                    }}>
                                        {this.context.t("PENDING_BIDS_REMOVE_BUTTON_CANCEL")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

ContentListing.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ContentListing;

