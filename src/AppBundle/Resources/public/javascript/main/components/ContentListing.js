import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import {PropTypes} from "prop-types";
import {blueCheckIcon, yellowCheckIcon, coinIcon, hammerIcon} from "./Icons";
import Modal from 'react-modal';
import {customStyles} from "../styles/custom";

class ContentListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buyingMode : false,
            territoriesList: []
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = hammerIcon;
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
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
      const {onSelect, customId} = this.props;

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

    closeTerritoriesModal = (e) => {
        e.stopPropagation();
        this.setState({ showAllTerritories: false});
    };

    showAllTerritories = (e,extraTerritories) => {
        e.stopPropagation();
        this.setState({
            showAllTerritories : true,
            territoriesList : extraTerritories
        })
    };

    allTerritories = () => {

        return <Modal
            isOpen={this.state.showAllTerritories}
            onRequestClose={this.closeTerritoriesModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div className="modal-inner">
                {
                    this.state.territoriesList.map(territory =>{
                        return <div className="country-modal">
                            {territory.label}
                        </div>
                    })
                }
            </div>

        </Modal>
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
                        <div className={"name"} onClick={() => { if (onSelectName) onSelectName() }}>
                            {name}
                        </div>

                        {company.legalName && (
                            <div className="company-name">{coinIcon} {company.legalName}</div>
                        )}
                    </div>

                    {watchlistRemove && !confirmWatchlistRemove &&
                    <img style={{
                        cursor : 'pointer',
                        position: 'absolute',
                        right: 0,
                        top : 0,
                        margin: '0 5px'

                    }} src={this.bucketicon} onClick={this.confirmRemoveFromWatchlist}/>}

                    {confirmWatchlistRemove &&
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top : 0,
                        margin: '0 5px',
                        border : '1px solid lightgrey',
                        padding : 5,
                        fontSize: 13
                    }}>
                        <span>
                            {this.context.t("Remove from Watchlist?")}
                        </span>
                        <span onClick={this.removeFromWatchlist} style={{
                            cursor : 'pointer',
                            margin: '0 15px',
                            color : 'red'
                        }}>
                            {this.context.t("Yes")}
                            </span>
                        <span onClick={this.cancelRemoveFromWatchlist} style={{
                            cursor : 'pointer',
                            color : 'green'
                        }}>
                            {this.context.t("Cancel")}
                            </span>
                    </div>}

                    <div className="listing-wrapper">
                        <ContentListingEventDetails {...this.props} />

                        <ContentListingRightsPackage
                            rightsPackage={rightsPackage}
                            defaultRightsPackage={defaultRightsPackage}
                            programName={PROGRAM_NAME}
                        />
                    </div>

                    <div className="sales-bundles-wrapper">
                        <div className={"sales-bundles"}>
                            {salesPackages.slice(0, 3).map( ( salesPackage, i) => {
                                let extraTerritories = ( salesPackage.territoriesMethod === this.worldwideExcluding) ? salesPackage.excludedTerritories : salesPackage.territories;

                                    return  <div className="sales-package" key={"sales-package-"+ i}>

                                        {salesPackage.bundleMethod === "SELL_AS_BUNDLE" && (
                                            <div style={{ margin: '0 10px 0 5px'}}>
                                                <img style={{width: 26, height: 23}} src={this.fixedIcon}/>
                                            </div>
                                        )}

                                        <div style={{cursor: 'default'}}>
                                            {salesPackage.name}

                                            {extraTerritories && extraTerritories.length > 3 && (
                                                <span
                                                    style={{
                                                        color: '#2DA7E6',
                                                        textDecoration: 'underline',
                                                        marginLeft : 5
                                                    }}
                                                    onClick={(e) => {this.showAllTerritories(e,extraTerritories)}}
                                                >
                                                {"+" + (extraTerritories.length - 3)}
                                            </span>
                                            )}
                                        </div>
                                        {
                                            ( salesPackage.salesMethod !== "BIDDING" ||  ( salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0 ) )
                                            &&<b style={{margin: '0 10px', display: "flex", flex: '1 0 auto'}}>
                                                {this.getFee(salesPackage)}
                                            </b>
                                        }

                                        {salesPackage.salesMethod === "BIDDING"
                                        &&<div style={{ margin: '0 10px 0 5px'}}>
                                            <img style={{width: 23, height: 23}} src={this.bidIcon}/>
                                        </div>}



                                    </div>
                                })}
                            {salesPackages.length > 3 && (
                                <div className="sales-package show-all">
                                    <b> + {salesPackages.length - 3} </b>
                                </div>
                            ) }
                        </div>
                        {expiresAt && (
                            <div className="expires">
                                Expiry: <b>{Moment(expiresAt).format('MM/DD/YYYY')}</b>
                            </div>
                        )}
                    </div>

                </div>
                { this.allTerritories() }
            </div>
        )
    }
}

ContentListing.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ContentListing;

