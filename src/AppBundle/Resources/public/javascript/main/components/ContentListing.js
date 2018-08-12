import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";

class ContentListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buyingMode : false
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.bucketicon = assetsBaseDir + "app/images/bucket.png";
    }

    getFee = (salesPackage) => {

        const {currency} = this.props;
        let currencyCode = currency || salesPackage.currency.code;
        let currencySymbol = (currencyCode === "EUR" ? "€" : "$");
        return salesPackage.fee + " " + currencySymbol ;
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
        let territories = filter.countries.map(c => c.value);

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
            watchlistRemove
        } = this.props;

        let {rightsPackage} = this.props;
        rightsPackage = rightsPackage.slice(-6);

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
                    <div className={"name"} onClick={() => { if (onSelectName) onSelectName() }}>{name}</div>


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
                        <span>Remove from Watchlist?</span>
                        <span onClick={this.removeFromWatchlist} style={{
                            cursor : 'pointer',
                            margin: '0 15px',
                            color : 'red'
                        }}>
                                Yes
                            </span>
                        <span onClick={this.cancelRemoveFromWatchlist} style={{
                            cursor : 'pointer',
                            color : 'green'
                        }}>
                                Cancel
                            </span>
                    </div>}

                    <div className="listing-wrapper">
                        <ContentListingEventDetails {...this.props} isFragment={true}/>

                        <ContentListingRightsPackage rightsPackage={rightsPackage} programName={PROGRAM_NAME}/>
                    </div>

                    <div className={"sales-bundles"}>
                        {
                            salesPackages.slice(0, 4).map( ( salesPackage, i) => {
                                return  <div className="sales-package" key={"sales-package-"+ i}>
                                    {salesPackage.bundleMethod === "SELL_AS_BUNDLE"
                                    &&<div style={{ margin: '0 10px 0 5px'}}>
                                        <img style={{width: 26, height: 23}} src={this.fixedIcon}/>
                                    </div>}

                                    <div style={{cursor: 'default'}}>
                                        {salesPackage.name}
                                    </div>
                                    {
                                        ( salesPackage.salesMethod !== "BIDDING" ||  ( salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0 ) )
                                        &&<div style={{margin: '0 10px', display: "flex", flex: '1 0 auto'}}>
                                            {this.getFee(salesPackage)}
                                        </div>
                                    }

                                    {salesPackage.salesMethod === "BIDDING"
                                    &&<div style={{ margin: '0 10px 0 5px'}}>
                                        <img style={{width: 23, height: 23}} src={this.bidIcon}/>
                                    </div>}



                                </div>
                            })
                        }
                        {
                            salesPackages.length > 4 && <div className="sales-package">
                                <div style={{color: '#2DA7E6', padding: '0 15px 0 0px'}}>
                                   + {salesPackages.length - 4}
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default ContentListing;

