import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";

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

    sortSalesPackages = (a, b) => {
        return this.compareProperty(a.territories.length, b.territories.length) || this.compareProperty(b.name, a.name);
    };

    compareProperty = (a, b) =>  {
        return (a > b) ? 1 : ((b > a) ? -1 : 0)
    };

    render(){
        const {
            name,
            expiresAt,
            salesPackages,
            programs,
            rightsPackage,
            imageBase64,
            image
        } = this.props;

        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;
        salesPackages.sort(this.sortSalesPackages).reverse();
        return (
            <div className="listing-list-view" onClick={this.onSelect}>
                <div className={"left"}  >
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                    <div className={"date"}>Published <span>{Moment().format('DD/MM/YYYY')}</span></div>
                    <div className={"date"}>Expires <span>{Moment(expiresAt).format('DD/MM/YYYY')}</span></div>
                </div>
                <div className={"right"} >
                    <div className={"name"}>{name}</div>

                    <div style={{display: "flex"}}>
                        <ContentListingEventDetails {...this.props}/>
                        <div style={{flex: 2, flexDirection: "column" }}>
                            {
                                rightsPackage.map(( sr,i )=>{
                                    return <div key={i}  style={{
                                        minHeight: 46,
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>
                                        <div style={{display: 'flex', flexDirection: "column"  }}>
                                            {sr.exclusive && <span style={{fontSize: 10}}>EXCLUSIVE</span>}
                                            {sr.shortLabel !== "PR" && sr.name}
                                            {sr.shortLabel === "PR" && programs[0] && programs[0].name &&
                                            "Program: " + programs[0].name
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
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
