import React, { Component } from 'react';
import Moment from "moment/moment";

class ContentListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
    }

    getFee = (salesPackage) => {

        const {currency} = this.props;
        let currencySymbol = (currency === "EUR" ? "€" : "$");
        return salesPackage.fee + " " + currencySymbol ;
    };

    onSelect = () => {
      const {onSelect, customId} = this.props;

      if ( onSelect ) onSelect(customId);

    };

    render(){
        const {
            name,
            expiresAt,
            rightsPackage,
            sportCategory,
            tournament,
            seasons,
            salesPackages,
            imageBase64,
            image
        } = this.props;

        let seasonName =  seasons.map(season => (season.name)).join(", ");
        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

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
                        <div style={{flex: 1, fontWeight: 600, lineHeight: "30px"}}>
                            {sportCategory && sportCategory.length > 0 && <div>{sportCategory[0].name}</div>}
                            {tournament && tournament.length > 0 && <div>{tournament[0].name}</div>}
                            {
                                seasons && seasons.length > 0 && <div>{seasonName}</div>
                            }
                        </div>
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
                                            {sr.name}
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
                                    <div style={{}}>
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

                                    {salesPackage.salesMethod === "FIXED"
                                    &&<div style={{ margin: '0 10px 0 5px'}}>
                                        <img style={{width: 26, height: 23}} src={this.fixedIcon}/>
                                    </div>}

                                </div>
                            })
                        }
                        {
                            salesPackages.length > 4 && <div className="sales-package">
                                <div style={{color: '#2DA7E6'}}>
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
