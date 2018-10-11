import React from 'react';
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import CommercialSalesBundle from "../../main/components/CommercialSalesBundle";
import SalesPackages from './SalesPackeges';
import ContentListing from "./ContentListing";
import {getCurrencySymbol} from "../actions/utils";
import {getListingImage} from "../../common/utils/listing";
import {plusGreyIcon, minusGreyIcon, coinIcon} from "./Icons";
import {PropTypes} from "prop-types";
import Moment from "moment/moment";

class ContentListingCommercialActivity extends ContentListing {
    constructor(props){
        super(props);

        this.state = {
            showSalesPackage : props.bundlesOpen
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.bucketicon = assetsBaseDir + "app/images/bucket.png";
        this.exclamationIcon = assetsBaseDir + "app/images/Exclamation.png";
        this.envelopeIcon = assetsBaseDir + "app/images/envelope_2.png";

        jQuery('body, #home-wrapper').css('background-color', '#eee') //todo: remove this when other page redesign ready
    }

    componentWillUnmount() {
        jQuery('body, #home-wrapper').css('background-color', '') //todo: remove this when other page redesign ready
    }

    sortSalesPackages = (a, b) => {

        let aOpen = a.bids.filter(bid=>bid.status.name=== "PENDING").length > 0;
        let bOpen = b.bids.filter(bid=>bid.status.name=== "PENDING").length > 0;
        let aClosed = a.bids.filter(bid=>bid.status.name=== "APPROVED").length > 0;
        let bClosed = b.bids.filter(bid=>bid.status.name=== "APPROVED").length > 0;
        let aWorldwide = a.territoriesMethod ==="WORLDWIDE";
        let bWorldwide = b.territoriesMethod ==="WORLDWIDE";

        let open = ( !aOpen && bOpen ) ? 1 : ((!bOpen && aOpen) ? -1 : 0);
        let closed = ( !aClosed && bClosed ) ? 1 : ((!bClosed && aClosed) ? -1 : 0);
        let worldwide = ( !aWorldwide && bWorldwide ) ? 1 : ((!bWorldwide && aWorldwide) ? -1 : 0);

        return open || closed || worldwide ||this.compareProperty(b.territories.length, a.territories.length)
            || this.compareProperty(b.name, a.name);
    };

    onSelect = () => {
        const {onSelect, customId, status, checkExpired} = this.props;
        if (checkExpired && status && status.name !== "EDITED" && status.name !== "APPROVED" ) return;
        onSelect(customId);
    };

    compareProperty = (a, b) =>  {
        return (a > b) ? 1 : ((b > a) ? -1 : 0)
    };

    onClickShowBundle = () => this.setState((state) => ({showSalesPackage: !state.showSalesPackage}));

    render(){
        const {
            name,
            onDelete,
            expiresAt,
            onUpdate,
            hideWithoutBids,
            filterByOpenBids,
            filterByClosedDeals,
            bidsOpen,
            salesPackages,
            rightsPackage,
            customId,
            company,
            id,
        } = this.props;

        const {showSalesPackage} = this.state;

        salesPackages.sort(this.sortSalesPackages);

        let bids = salesPackages.reduce((t, sp)=>t.concat(sp.bids),[]);
        let closedBids = bids.filter(b=>b.status.name === "APPROVED");
        let openBids = bids.filter(b=>b.status.name === "PENDING");
        let total = (closedBids.length > 0 ) ? closedBids.map(b=>Number(b.totalFee)).reduce((t,n)=>t+n) : 0;
        
        return (
            <div style={{display : 'flex', flexDirection: 'column', marginBottom: 20}}>
                <div className="listing-list-view commercial-activity">
                    <div className={"left"}>
                        {getListingImage(this.props)}
                    </div>
                    <div className={"right"}>
                        <div className={"name-wrapper"} onClick={this.onSelect}>
                            <span className={"listing-name"}>{name}</span>
                            <span className="custom-id">#{customId}</span>
                        </div>

                        <div className="listing-wrapper">
                            <ContentListingEventDetails {...this.props} />

                            <ContentListingRightsPackage rightsPackage={rightsPackage}/>
                        </div>

                        <div className="sales-and-exp-wrapper">
                            <SalesPackages salesPackages={salesPackages} />
                            {expiresAt && (
                                <div className="expires">
                                    Expiry: <b>{Moment(expiresAt).format('MM/DD/YYYY')}</b>
                                </div>
                            )}
                        </div>
                    </div>
                    <div  className={"bid-listing-details"}>
                        <div className={"item"}>
                            <span>
                                {this.context.t(["closed bid", "closed bids", "n"], {n : closedBids.length})}
                            </span>
                        </div>
                        <div className={"item"}>
                            <span>
                                {this.context.t(["open bid","open bids", "n"], {n : openBids.length})}
                            </span>
                        </div>
                        {bids.length > 0 && <div className={"total-wrapper"}>
                            <span className={"bid-total"}>{this.context.t("Revenue")}</span>
                            <span className={"bid-currency"}>
                                {total.toLocaleString("en", { maximumFractionDigits: 2 })} {getCurrencySymbol(salesPackages[0].currency.code)}
                            </span>
                        </div>}

                        {bids.length > 0 && <div className="show-bundle-wrapper" onClick={this.onClickShowBundle}>
                            <div className={"bundle-text"}>
                                {showSalesPackage ? "Hide sales bundle" : "Show sales bundle"}
                                {showSalesPackage ? minusGreyIcon : plusGreyIcon}
                            </div>
                        </div>}
                    </div>
                </div>
                {showSalesPackage && salesPackages.map((sb, i )=>{

                    let closed= sb.bids.filter(b=>b.status.name === "APPROVED");
                    let open = sb.bids.filter(b=>b.status.name === "PENDING");

                    if (hideWithoutBids && sb.bids.length === 0 ) return;
                    if (filterByOpenBids && open.length === 0 ) return;
                    if (filterByClosedDeals && closed.length === 0 ) return;

                    return <CommercialSalesBundle
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        salesBundle={sb}
                        bidsOpen={bidsOpen}
                        company={company}
                        contentId={id}
                        key={i}/>
                })}
            </div>
        )
    }
}
ContentListingCommercialActivity.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ContentListingCommercialActivity;
