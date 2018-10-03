import React, { Component } from 'react';
import {PropTypes} from "prop-types";
import Moment from "moment/moment";
import cn from "classnames";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import SalesPackages from './SalesPackeges';
import {
    blueCheckIcon,
    yellowCheckIcon,
    hammerIcon,
    bucketIcon,
    fixedIcon
} from "./Icons";
import { getCurrencySymbol } from "../actions/utils";
import Tooltip from '../../main/components/Tooltip';

class ContentListing extends Component{
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

        let temp = [];
        let territories = filter.countries.map(c => c);

        salesPackages.forEach((e)=>{
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
        return (a > b) ? 1 : ((b > a) ? -1 : 0);
    };

    render(){
        const {
            name,
            expiresAt,
            PROGRAM_NAME,
            onSelectName,
            filter,
            sortSalesPackages,
            watchlistRemove,
            company,
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

        const listingHref = checkExpired && status && status.name !== "EDITED" && status.name !== "APPROVED" ? '#' : `/listing/${customId}`;

        let salesPackages = this.props.salesPackages;

        if ( filter && filter.countries.length > 0 && sortSalesPackages) {
            salesPackages = this.sortByFilter(salesPackages);
            salesPackages.sort(this.sortAfterFilter);
        } else {
            salesPackages.sort(this.sortSalesPackages).reverse();
        }

        return (
            <a href={listingHref} className="listing-list-view">
                <div className={"left"}  >
                    {this.getListingImage()}
                </div>
                <div className={"right"} >
                    <div className="name-wrapper">
                        { (!checkExpired || status.name === "EDITED" || status.name === "APPROVED"  ) && <div className={"ca-title text-truncate small"} style={{cursor: "pointer"}} onClick={() => { if (onSelectName) onSelectName() }}>
                            {name}
                        </div>}

                        { checkExpired && status.name !== "EDITED" && status.name !== "APPROVED" && <div className={"ca-title text-truncate small"} >
                            {name}
                        </div>}

                        {company && (
                            <div className="company-name">
                                <i className="fa fa-user-o icon" />{company.legalName}</div>
                        )}
                    </div>

                    <div className="listing-wrapper">
                        <ContentListingEventDetails {...this.props} />

                        <ContentListingRightsPackage
                            rightsPackage={rightsPackage}
                            programName={PROGRAM_NAME}
                        />
                    </div>

                    <div className="sales-bundles-wrapper">
                        <SalesPackages
                            salesPackages={salesPackages}
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
                                <button type="button" className="ca-btn primary small" onClick={this.removeFromWatchlist}>
                                    {this.context.t("Yes")}
                                 </button>
                                <button type="button" className="ca-btn danger small" onClick={this.cancelRemoveFromWatchlist}>
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
                                        className="ca-btn primary"
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
            </a>
        )
    }

    getListingImage() {
        const { imageBase64, image, sports } = this.props;
        let listingImageUrl = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : null;
        let isSportPlaceholder = false;
        let caLogo = false;

        if (!listingImageUrl) {
            const sportId = sports && sports.length ? (sports[0].id || sports[0].externalId): null;
            const imagesBaseDir = assetsBaseDir + "app/images/listing/default-sports/";
            let imageName = "";
            isSportPlaceholder = true;
                    
            switch (sportId) {
                case 1:
                case "sr:sport:1":
                    imageName = "soccer.svg"; // Soccer
                    break;
                case 15:
                case "sr:sport:16":
                    imageName = "america-futbol.svg"; // American Football
                    break;
                case 7:
                case "sr:sport:3":
                    imageName = "basketball.svg"; // Baseball
                    break;
                case 3:
                case "sr:sport:2":
                    imageName = "basketball.svg"; // Basketball
                    break;
                case 10:
                case "sr:sport:21":
                    imageName = "cricket.svg"; // Cricket
                    break;
                case 11:
                case "sr:sport:24":
                    imageName = "hockey.svg"; // Field Hockey
                    break;
                case 4:
                case "sr:sport:20":
                    imageName = "table-tennis.svg"; // Table Tennis
                    break;
                case 5:
                case "sr:sport:5":
                    imageName = "tennis.svg"; // Tennis
                    break;
                case 16:
                case "sr:sport:23":
                    imageName = "volleyball.svg"; // Volleyball
                    break;
                case 9:
                case "sr:sport:9":
                    imageName = "golf.svg"; // Golf
                    break;
                default:
                    imageName = "logo-content-arena.svg";
                    caLogo = true;
                    break;
            }

            listingImageUrl = imagesBaseDir + imageName;
        }

        return (
            <div className={cn("image", { 'sport-placeholder': isSportPlaceholder, 'ca-logo': caLogo })}>
                <img src={listingImageUrl} />
            </div>
        );
    }
}

ContentListing.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ContentListing;

