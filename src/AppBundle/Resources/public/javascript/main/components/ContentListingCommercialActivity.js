import React from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import CommercialSalesBundle from "../../main/components/CommercialSalesBundle";
import ContentListing from "./ContentListing";
import {getCurrencySymbol} from "../actions/utils";
import {addIcon, cancelIcon} from "./Icons";

class ContentListingCommercialActivity extends ContentListing {
    constructor(props){
        super(props);

        this.state = {
            showSalesPackage : props.bundlesOpen || false
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
            onDelete,
            hideWithoutBids,
            bidsOpen,
            rightsPackage,
            salesPackages,
            imageBase64,
            image,
            company,
            id,
            PROGRAM_NAME
        } = this.props;

        const {showSalesPackage} = this.state;

        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;
        let bids = salesPackages.reduce((t, sp)=>t.concat(sp.bids),[]);
        return (
            <div style={{display : 'flex', flexDirection: 'column', marginBottom: 20}}>
                <div className="listing-list-view" style={{padding: 0, marginBottom: 0 }}>
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
                    {/*BID DETAILS*/}
                    <div  className={"bid-listing-details"}>
                        <div className={"item"}>
                            <div>{bids.filter(b=>b.status.name === "APPROVED").length} closed Deals</div>
                        </div>
                        <div className={"item"}>
                            <div>{bids.filter(b=>b.status.name === "PENDING").length} open bids</div>
                        </div>
                        {bids.length > 0 && <div className={"item"} style={{fontWeight:600}}>
                            <div>
                                {"Total: " + bids.map(b=>Number(b.totalFee)).reduce((t,n)=>t+n).toLocaleString("en", { maximumFractionDigits: 2 })
                                + " "}

                                {getCurrencySymbol(salesPackages[0].currency.code)}
                            </div>
                        </div>}

                        <div className="show-bundle" onClick={()=>{this.setState({showSalesPackage: !showSalesPackage})}}>
                            {!showSalesPackage && "Show sales bundle"}
                            {showSalesPackage && "Hide sales bundle"}
                            {!showSalesPackage && <img src={addIcon}/>}
                            {showSalesPackage && <img src={cancelIcon}/>}
                        </div>
                    </div>
                </div>
                {showSalesPackage && salesPackages.map((sb, i )=>{

                    if (hideWithoutBids && sb.bids.length === 0 ) return;

                    return <CommercialSalesBundle
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

export default ContentListingCommercialActivity;
