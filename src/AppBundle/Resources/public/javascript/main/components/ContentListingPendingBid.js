import React from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListing from "./ContentListing";
import {getCurrencySymbol} from "../actions/utils";
import {blueEnvelopeIcon, bucketIcon, infoIcon} from "./Icons";

class ContentListingPendingBid extends ContentListing {
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
            onDelete,
            rightsPackage,
            onSelectName,
            imageBase64,
            image,
            company,
            customId,
            bid,
            PROGRAM_NAME
        } = this.props;

        const {showMessage, showEdited} = this.state;

        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

        return (
            <div className="listing-list-view" onClick={this.onSelect} style={{padding: 0}}>
                <div className={"left"} style={{padding: 25}} >
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                </div>
                <div className={"right"}  style={{padding:'25px 0'}}>

                    {/*NAME*/}
                    <div className={"name"} onClick={() => { if (onSelectName) onSelectName() }}>{name}</div>

                    {/*COMPANY*/}
                    <div className={"company"}>
                        {company.legalName} <img style={{marginLeft: 5}} src={this.envelopeIcon}/>
                    </div>

                    <div style={{display: "flex"}}>

                        {/*DETAILS*/}
                        <ContentListingEventDetails {...this.props}/>

                        {/*DETAILS 2*/}
                        <div>
                            <div>Expiry: {Moment(expiresAt).format('DD/MM/YYYY')}</div>
                            <div className="custom-id">#{customId}</div>
                        </div>

                        {/*RIGHTS*/}
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
                <div style={{
                    flex: '1.5 1 0%',
                    backgroundColor: '#FAFBFC',
                    borderLeft: '1px solid #E6E6E6',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingRop: 15,
                    justifyContent: 'space-evenly',
                    padding: '20px 0',
                    position : 'relative'
                }}>
                    <div style={{
                        display:'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <div>{Moment(bid.createdAt).format('DD/MM/YYYY')}</div>
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
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: 10
                    }}>
                        <div>{bid.amount} {getCurrencySymbol(bid.salesPackage.currency.code)}</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        {bid.status.name === "EDITED"
                        && <img src={infoIcon}
                                style={{
                                    marginRight: 5,
                                    cursor: 'pointer'
                                }}
                                onMouseOver={() => {this.setState({showEdited : true})}}
                                onMouseLeave={() => {this.setState({showEdited : false})}} />}
                        <a className="standard-button" style={{
                            height: 36,
                            fontSize: 16,
                            width: 150
                        }} href={envhosturl+ "listing/" +customId+"/buy/" + bid.salesPackage.id}>Increase bid</a>
                        {bid.message && bid.message !== ""
                        && <img src={blueEnvelopeIcon}
                                style={{
                                    marginLeft: 5,
                                    cursor: 'pointer'
                                }}
                                onMouseOver={() => {this.setState({showMessage : true})}}
                                onMouseLeave={() => {this.setState({showMessage : false})}}/>}

                        {/*MESSAGE*/}
                        {showMessage && <div className="status-tooltip">
                            <div className={"option"}>
                                {bid.message}
                            </div>
                        </div>}

                        {/*EDITED TOOLTIP*/}
                        {showEdited && <div className="status-tooltip">
                            <div className={"option"}>
                                Listing edited after last bid. Please review term sheet.
                            </div>
                        </div>}



                    </div>
                    <div style={{
                        fontSize: 12,
                        fontWeight: 600,
                    }}>
                        <div>
                            <span style={{fontWeight: 400,fontStyle: 'italic'}}>Placed by:</span>
                            {" " +bid.buyerUser.firstName + " " + bid.buyerUser.lastName}</div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        cursor : 'pointer',
                        top : 20,
                        right : 20
                    }} onClick={(e)=>{
                        this.setState({showRemoveConfirm: true});
                        e.stopPropagation();
                    }}>
                        <img src={bucketIcon}/>
                    </div>

                    {/*CONFIRM REMOVE*/}
                    {this.state.showRemoveConfirm && <div className="confirmation-tooltip">
                        <div className={"confirmation-text"}>
                            Are you sure you want to remove this bid?
                        </div>
                        <button className={"button button-confirm"} onClick={(e)=>{
                            this.setState({showRemoveConfirm: false});
                            onDelete(bid.id);
                            e.stopPropagation();
                        }}>
                            Remove
                        </button>
                        <button className={"button"} onClick={(e)=>{
                            this.setState({showRemoveConfirm: false});
                            e.stopPropagation();
                        }}>
                            Cancel
                        </button>
                    </div>}

                </div>
            </div>
        )
    }
}

export default ContentListingPendingBid;
