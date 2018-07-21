import React from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListing from "./ContentListing";
import {getCurrencySymbol} from "../actions/utils";

class ContentListingCommercialActivity extends ContentListing {
    constructor(props){
        super(props);

        this.state = {
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.bucketicon = assetsBaseDir + "app/images/bucket.png";
        this.exclamationIcon = assetsBaseDir + "app/images/Exclamation.png";
        this.envelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
    }

    render(){
        const {
            name,
            expiresAt,
            programs,
            rightsPackage,
            onSelectName,
            imageBase64,
            image,
            company,
            customId,
            bid,
            PROGRAM_NAME
        } = this.props;


        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

        return (
            <div className="listing-list-view" style={{padding: 0}}>
                <div className={"left"} style={{padding: 25}} >
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                </div>
                <div className={"right"}  style={{padding:'25px 0'}}>
                    <div className={"name"} onClick={this.onSelect}>{name}</div>

                    <div style={{display: "flex"}}>
                        <ContentListingEventDetails {...this.props}/>
                        <div style={{
                            flex: 2,
                            flexDirection: "column",
                            flexWrap: 'wrap',
                            maxHeight: 200,
                            display: 'flex'
                        }}>
                            {
                                rightsPackage.map(( sr,i )=>{
                                    return <div key={i}  style={{
                                        minHeight: 46,
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flex: '1 1 40px'
                                    }}>
                                        {!sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>}

                                        {sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.yellowCheck}/>}

                                        <div style={{display: 'flex', flexDirection: "row"  }}>
                                            { sr.shortLabel !== "PR" && sr.name }
                                            { sr.shortLabel === "PR" && PROGRAM_NAME &&
                                            "Program: " + PROGRAM_NAME
                                            }
                                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                {/*BID OPTIONS*/}
                {/*<div style={{
                    flex: '1.5 1 0%',
                    backgroundColor: '#FAFBFC',
                    borderLeft: '1px solid #E6E6E6',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingRop: 15
                }}>
                    <div style={{
                        display:'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        margin: 20
                    }}>
                        <div>{Moment(bid.createdAt).format('DD/MM/YYYY')}</div>
                        <div className="custom-id">#{customId}</div>
                    </div>
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid lightgrey',
                        padding: 10,
                        margin: '0 20px'
                    }}>
                        <div>{bid.salesPackage.name}</div>
                    </div>
                    <div style={{
                        color: '#2DA7E6',
                        display: 'flex',
                        margin: '10px 0',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        fontSize: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>
                        {company.legalName} <img style={{marginLeft: 5}} src={this.envelopeIcon}/>
                    </div>
                    <div style={{
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: 10
                    }}>
                        <div>{bid.amount} {getCurrencySymbol(bid.salesPackage.currency.code)}</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <img src={this.exclamationIcon} style={{height: 28}}/>
                        <a className="standard-button" style={{
                            height: 36,
                            fontSize: 16,
                            width: 150
                        }} href={envhosturl+ "listing/" +customId+"/buy/" + bid.salesPackage.id}>Increase bid</a>
                    </div>
                </div>*/}
            </div>
        )
    }
}

export default ContentListingCommercialActivity;
