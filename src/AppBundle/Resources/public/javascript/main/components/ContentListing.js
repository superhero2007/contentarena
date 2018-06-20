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

    getFixtures = () => {
        const {seasons} = this.props;

        let fixtures = [];

        seasons.forEach( s => {
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures]
        });

        return fixtures;

    };

    getRounds = () => {

        const { seasons , schedulesBySeason} = this.props;
        let schedules = [];
        seasons.forEach(s => {
            if (s.schedules) Object.entries(s.schedules).forEach((sh) =>{
                if (sh[1].selected ) schedules.push(sh[0])
            })
        });

        if ( schedulesBySeason ){
            schedulesBySeason.forEach(s => {
                if (s && Object.entries(s)) Object.entries(s).forEach((sh) =>{
                    schedules.push(sh[0])
                })
            });
        }

        return schedules
    };

    showProgramInfo = () => {

        const {rightsPackage, programs} = this.props;

        let show = false;

        if (rightsPackage.length > 1) return show;

        rightsPackage.forEach(rp => {
            if ( rp.shortLabel === "PR" ) show = true;
        });


        return show && programs && programs.length > 0;

    };

    render(){
        const {
            name,
            expiresAt,
            rightsPackage,
            sports,
            sportCategory,
            tournament,
            seasons,
            programs,
            salesPackages,
            imageBase64,
            image
        } = this.props;

        let rounds = this.getRounds();
        let seasonTitle = ( seasons.length > 1 ) ? "Seasons: " : "Season: ";
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");

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



                            <div>
                                {sports && sports.length === 1 && <span>{sports[0].name}</span>}
                                {sports && sports.length > 1 && <span>Multiple Sports</span>}
                                {sportCategory && sportCategory.length > 0 && <span> {sportCategory[0].name}</span> }
                            </div>


                            {tournament && tournament.length > 0 && <div>{tournament[0].name}</div>}
                            {tournament && tournament.length === 0 && <div>General content</div>}
                            {seasons && seasons.length > 0 && <div>{seasonName}</div>}
                            {this.showProgramInfo() && programs[0].name &&
                                <div>Program: {programs[0].name}</div>}
                            {this.showProgramInfo() && programs[0].releaseYear &&
                                <div>Release year: {programs[0].releaseYear}</div>}

                            {this.showProgramInfo() && programs[0].episodes &&
                                <div>Episodes: {programs[0].episodes}</div>}

                            {this.getFixtures().length > 1 &&
                                <div>{this.getFixtures().length} fixtures</div>}
                            {this.getFixtures().length === 1 &&
                                <div>{this.getFixtures()[0].name}</div>}

                            {this.getRounds().length > 0 && <div>{roundsName}</div>}

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
