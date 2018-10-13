import React from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import ContentListing from "./ContentListing";
import SendMessage from "../../main/components/SendMessage";
import {getCurrencySymbol} from "../actions/utils";
import {blueEnvelopeIcon, bucketIcon, infoIcon} from "./Icons";
import {PropTypes} from "prop-types";
import { DATE_FORMAT } from "@constants";
import DigitalSignature from "./DigitalSignature";

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
        this.exclamationIcon = assetsBaseDir + "app/images/Exclamation.png";
        this.envelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
    }

    render(){
        const {
            name,
            expiresAt,
            onDelete,
            rightsPackage,
            imageBase64,
            image,
            declined,
            id,
            company,
            customId,
            bid,
        } = this.props;

        const {showMessage, showEdited} = this.state;

        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

        return (
            <div className="listing-list-view">
                <SendMessage ref={"messagePopup" + id }
                             listingId={id}
                             recipient={company}/>
                <div className={"left"}>
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                </div>
                <div className={"right"}  style={{padding:'25px 0'}}>

                    {/*NAME*/}
                    <div className={"name"} onClick={this.onSelect}>
                        {name}
                    </div>
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <div>Expiry: {Moment(expiresAt).format(DATE_FORMAT)}</div>
                        <div className="custom-id">#{customId}</div>
                    </div>

                    {/*COMPANY*/}
                    <div className={"company"} onClick={(e)=>{
                        this.refs["messagePopup" + id].open();
                        e.stopPropagation();
                    }}>
                        {company.legalName} <img style={{marginLeft: 5}} src={this.envelopeIcon}/>
                    </div>

                    <div style={{display: 'flex'}}>
                        <div className="listing-wrapper" style={{flex:'1 0 0',overflow: 'auto'}}>

                            <ContentListingEventDetails {...this.props} />

                            <ContentListingRightsPackage rightsPackage={rightsPackage}/>
                        </div>
                        {/*BID OPTIONS*/}
                        <div style={{
                            flex: '240px 0 0',
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
                                <div>{Moment(bid.createdAt).format(DATE_FORMAT)}</div>
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
                                <div>{parseFloat(bid.amount).toLocaleString()} {getCurrencySymbol(bid.salesPackage.currency.code)}</div>
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
                                        onMouseOver={() => {
                                            this.setState({showEdited: true})
                                        }}
                                        onMouseLeave={() => {
                                            this.setState({showEdited: false})
                                        }}/>}

                                { ( !declined || (declined && bid.status.name === "REJECTED" && !bid.salesPackage.sold ))
                                && <a className="standard-button" style={{
                                    height: 36,
                                    fontSize: 16,
                                    marginBottom: 10
                                }} href={envhosturl + "listing/" + customId + "/checkout/" + bid.salesPackage.id}>
                                    {this.context.t("Increase bid")}
                                </a>}


                                {bid.message && bid.message !== ""
                                && <img src={blueEnvelopeIcon}
                                        style={{
                                            marginLeft: 5,
                                            cursor: 'pointer'
                                        }}
                                        onMouseOver={() => {
                                            this.setState({showMessage: true})
                                        }}
                                        onMouseLeave={() => {
                                            this.setState({showMessage: false})
                                        }}/>}

                                {/*MESSAGE*/}
                                {showMessage && <div className="status-tooltip">
                                    <div className={"option"}>
                                        {bid.message}
                                    </div>
                                </div>}

                                {/*EDITED TOOLTIP*/}
                                {showEdited && <div className="status-tooltip">
                                    <div className={"option"}>
                                        {this.context.t("PENDING_BIDS_TOOLTIP_LISTING_EDITED")}
                                    </div>
                                </div>}

                            </div>
                            <div style={{
                                fontSize: 12,
                                fontWeight: 600,
                            }}>
                                <div>
                                    <span style={{fontWeight: 400,fontStyle: 'italic'}}>
                                        {this.context.t("Placed by:")}
                                    </span>
                                    {" " +bid.buyerUser.firstName + " " + bid.buyerUser.lastName}</div>
                            </div>
                            {bid.status.name === "REJECTED" && <div style={{
                                position: 'absolute',
                                cursor : 'pointer',
                                top : 20,
                                right : 20
                            }} onClick={(e)=>{
                                this.setState({showRemoveConfirm: true});
                                e.stopPropagation();
                            }}>
                                <img src={bucketIcon}/>
                            </div>}

                            {/*CONFIRM REMOVE*/}
                            {this.state.showRemoveConfirm && <div className="confirmation-tooltip">
                                <div className={"confirmation-text"}>
                                    {this.context.t("PENDING_BIDS_REMOVE_TITLE")}
                                </div>
                                <button className={"button button-confirm"} onClick={(e)=>{
                                    this.setState({showRemoveConfirm: false});
                                    onDelete(bid.id);
                                    e.stopPropagation();
                                }}>
                                    {this.context.t("PENDING_BIDS_REMOVE_BUTTON_CONFIRM")}
                                </button>
                                <button className={"button"} onClick={(e)=>{
                                    this.setState({showRemoveConfirm: false});
                                    e.stopPropagation();
                                }}>
                                    {this.context.t("PENDING_BIDS_REMOVE_BUTTON_CANCEL")}
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

ContentListingPendingBid.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ContentListingPendingBid;
