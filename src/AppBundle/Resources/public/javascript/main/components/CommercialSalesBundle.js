import React from 'react';
import Moment from "moment/moment";
import ReactTable from "react-table";
import Modal from 'react-modal';

import DigitalSignature from "../../main/components/DigitalSignature";
import {getCurrencySymbol, getFee, limitText, viewLicenseBid} from "../actions/utils";
import {
    bidIcon,
    blueCheckIcon,
    blueEnvelopeIcon,
    cancelIcon,
    docIcon,
    fixedIcon,
    plusYellowIcon,
    minusYellowIcon
} from "./Icons";
import {customStyles, GenericModalStyle} from "../styles/custom";
import SendMessage from "../../main/components/SendMessage";
import {PropTypes} from "prop-types";

class CommercialSalesBundle extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            approveModalIsOpen : false,
            rejectModalIsOpen : false,
            removeModalIsOpen : false,
            showBids : props.bidsOpen,
            territoriesList : [],
            showAllTerritories : false

        };

        this.creditIcon = assetsBaseDir + "app/images/credit-card.png";
        this.coinIcon = assetsBaseDir + "app/images/listing/coin.svg";
        this.userIcon = assetsBaseDir + "app/images/user.png";
        this.calendarIcon = assetsBaseDir + "app/images/listing/calendar.svg";
        this.actionIcon = assetsBaseDir + "app/images/download.png";
    }

    componentWillReceiveProps (){
        this.setState({removeModalIsOpen : false, saving : false});
    }

    acceptBid = () => {
        const {signature} = this.state;
        const {contentId} = this.props;
        let selectedBid = this.state.selectedBid;
        selectedBid.content = contentId;
        this.setState({saving : true});
        ContentArena.ContentApi.acceptBid(selectedBid, signature).done(response=>{
            this.setState({approveModalIsOpen : false, saving : false});
            this.props.onUpdate();
        });

    };

    removeBid = () => {
        let selectedBid = this.state.selectedBid;
        this.setState({saving : true});
        ContentArena.ContentApi.removeBid(selectedBid).done(response=>{
            //this.setState({removeModalIsOpen : false, saving : false})
            this.props.onUpdate();
        });

    };

    rejectBid = () => {
        let selectedBid = this.state.selectedBid;
        selectedBid.message = this.state.message;
        this.setState({saving : true});
        ContentArena.ContentApi.rejectBid(selectedBid).always(response=>{
            this.setState({rejectModalIsOpen : false, saving : false});
            this.props.onUpdate();
        });

    };

    closeRemoveModal = () => {
        this.setState({removeModalIsOpen : false})
    };

    closeApproveModal = () => {
        this.setState({approveModalIsOpen : false})
    };

    closeRejectModal = () => {
        this.setState({rejectModalIsOpen : false})
    };

    renderApproveModal = () => {

        const {salesBundle} = this.props;
        const {signature, saving, selectedBid} = this.state;

        return <Modal
            isOpen={this.state.approveModalIsOpen}
            onRequestClose={this.closeApproveModal}
            bodyOpenClassName={"generic-modal"}
            style={GenericModalStyle}
        >
            <div className={"generic-modal-container"}>
                <div className="title">
                    {this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_ACCEPT")}
                </div>

                <div className="container">
                    <DigitalSignature signature={signature} onReady={signature => { this.setState({signature}) }} />
                </div>

                <div className={"buttons"}>
                    <button style={{fontSize: 13}} onClick={()=>{ viewLicenseBid(selectedBid.customId) }}>View License Agreement</button>
                    <button onClick={this.closeApproveModal}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_CANCEL")}
                    </button>
                    {!saving && <button className={"confirm"} disabled={!signature} onClick={this.acceptBid}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_ACCEPT")}
                    </button>}
                    {saving && <i className="fa fa-spin fa-cog"/>}
                </div>
            </div>
        </Modal>
    };

    renderRejectModal = () => {

        const {salesBundle} = this.props;
        const {saving, message} = this.state;

        return <Modal
            isOpen={this.state.rejectModalIsOpen}
            onRequestClose={this.closeRejectModal}
            bodyOpenClassName={"generic-modal"}
            style={GenericModalStyle}
        >
            <div className={"generic-modal-container"}>
                <div className="title">
                    {this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_REJECT")}
                </div>

                <div className="container">
                    {this.context.t("COMMERCIAL_ACTIVITY_BID_REJECT_MESSAGE")}
                    <textarea onChange={(e)=>{this.setState({message: e.target.value})}} value={message}>
                    </textarea>
                </div>

                <div className={"buttons"}>

                    {!saving && <button className={"confirm"} onClick={this.rejectBid}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REJECT_CONFIRM")}
                    </button>}
                    {saving && <i className="fa fa-spin fa-cog"/>}
                    <button onClick={this.closeRejectModal}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REJECT_CANCEL")}
                    </button>
                </div>
            </div>
        </Modal>
    };

    renderRemoveModal = () => {

        const {saving} = this.state;

        return <Modal
            isOpen={this.state.removeModalIsOpen}
            onRequestClose={this.closeRemoveModal}
            bodyOpenClassName={"generic-modal"}
            style={GenericModalStyle}
        >
            <div className={"generic-modal-container"}>
                <div className="title">
                    {this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_REMOVE")}
                </div>

                <div className="container">
                </div>

                <div className={"buttons"}>

                    {!saving && <button onClick={this.removeBid} className={"confirm"}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CONFIRM")}
                    </button>}
                    {saving && <i className="fa fa-spin fa-cog"/>}
                    <button onClick={this.closeRemoveModal}>
                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CANCEL")}
                    </button>
                </div>
            </div>
        </Modal>
    };

    showAllTerritories = (extraTerritories) => {
        this.setState({
            showAllTerritories : true,
            territoriesList : extraTerritories
        })
    };

    closeTerritoriesModal = () => {
        this.setState({ showAllTerritories: false});
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
        const { salesBundle, onDelete, contentId } = this.props;
        const { showBids } = this.state;

        let closedDeals = salesBundle.bids.filter(b=>b.status.name === "APPROVED");
        let totalFee = (closedDeals.length > 0) ? closedDeals.map(b=>Number(b.totalFee)).reduce((t,n)=>t+n) : null;
        let _this = this;
        let extraTerritories = ( salesBundle.territoriesMethod === this.worldwideExcluding) ? salesBundle.excludedTerritories : salesBundle.territories;
        const headers = {
            buyer: () => <span><img src={this.creditIcon} alt="Buyer"/> {this.context.t("BUYER")}</span>,
            fee: () => <span><img src={this.coinIcon} alt="Fee"/> {this.context.t("FEE")}</span>,
            user: () => <span><img src={this.userIcon} alt="User"/> {this.context.t("USER")}</span>,
            lastAction: () => <span><i className="fa fa-arrow-circle-o-right" /> {this.context.t("LAST_ACTION")}</span>,
            date: () => <span><img src={this.calendarIcon} alt="Action Date"/> {this.context.t("ACTION_DATE")}</span>,
            actions: () => <span><img src={this.actionIcon} alt="Action"/> {this.context.t("Actions")}</span>,
        };

        return (
            <div className="commercial-sales-bundles">
                {this.renderApproveModal()}
                {this.renderRejectModal()}
                {this.renderRemoveModal()}
                {this.allTerritories()}
                <div className="commercial-sales-bundles-container" onClick={()=>{this.setState({showBids: !showBids})}}>
                    <div className="sales-bundle-item">
                        <span>
                            {salesBundle.bundleMethod === "SELL_AS_BUNDLE" &&
                            <img style={{width: 26, height: 23, marginRight: 5}} src={fixedIcon}/>}
                            {salesBundle.name}

                            {
                                extraTerritories && extraTerritories.length > 3 && <span
                                    style={{
                                        color: '#2DA7E6',
                                        textDecoration: 'underline',
                                        marginLeft : 5
                                    }}
                                    onClick={(e) => {
                                        this.showAllTerritories(extraTerritories);
                                        e.stopPropagation();
                                    }}>
                                                {"+" + (extraTerritories.length - 3)}
                                            </span>
                            }
                        </span>
                    </div>

                    <div className="sales-bundle-item">
                        <span>
                            {salesBundle.fee > 0 && getFee(salesBundle)}
                            {salesBundle.salesMethod === "BIDDING"
                            &&<img style={{width: 23, height: 23}} src={bidIcon}/>}
                        </span>
                    </div>

                    <div className="sales-bundle-item-right" style={{marginLeft: 'auto'}}>
                        <span>{this.context.t(["closed deal", "closed deals", "n"], {n : closedDeals.length})}</span>
                    </div>

                    <div className="sales-bundle-item-right">
                        <span>{this.context.t(["open bid","open bids", "n"], {n : salesBundle.bids.filter(b=>b.status.name === "PENDING").length})}</span>
                    </div>

                    {totalFee && <div className="sales-bundle-item-right">
                        <span>{totalFee} {getCurrencySymbol(salesBundle.currency.code)}</span>
                    </div>}

                    {salesBundle.bids.length > 0 &&
                    <div className="sales-bundle-show-bids">
                       {showBids ? minusYellowIcon : plusYellowIcon}
                    </div>}
                </div>
                {showBids && salesBundle.bids.length > 0 &&
                <div>
                    {salesBundle.bids.map((b)=>{
                        return <SendMessage role={'SELLER'}
                                            ref={"messagePopup" + b.id }
                                            listingId={contentId} recipient={b.buyerUser.company}/>
                    })}

                    <ReactTable
                        className={"ca-table bid-table"}
                        defaultPageSize={30}
                        showPageSizeOptions={false}
                        showPagination={false}
                        onPageChange={this.onPageChange}
                        minRows={0}
                        resizable={false}
                        data={salesBundle.bids}
                        select={this.props.select}
                        columns={[{
                            accessor: d => {return d.buyerUser.company.legalName},
                            Cell: props => <div>
                                {props.value}
                            </div>,
                            Header: headers.buyer(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            id : "company"
                        },  {
                            Header: headers.fee(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            id: "price",
                            accessor: d => {return {fee: d.totalFee, currency: salesBundle.currency.code}},
                            Cell: props => <div className={"blue"}>
                                {parseFloat(props.value.fee).toLocaleString() + " " + getCurrencySymbol(props.value.currency)}
                            </div>
                        }, {
                            Header: headers.user(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            accessor: 'buyerUser',
                            Cell: props => <div>
                                {props.value.firstName + " " + props.value.lastName}
                            </div>

                        },{
                            Header: headers.lastAction(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            accessor: 'status.name',
                            Cell: props => <div>
                                {props.value === "APPROVED" && "Closed Deal"}
                                {props.value === "PENDING" && "Bid Placed"}
                                {props.value === "REJECTED" && "Bid Declined"}
                            </div>

                        },{
                            Header: headers.date(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            accessor: 'createdAt',
                            Cell: props => <div>
                                {Moment(props.value).format('DD/MM/YYYY')}
                            </div>

                        }, {
                            Header: headers.actions(),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            id : "actions",
                            accessor: b => {return {status: b.status.name, bid: b}},
                            Cell: props => <div className="actions-col">
                                {props.value.status === "REJECTED"
                                    && <i className={"fa fa-trash-o"} style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        this.setState({showRemoveConfirm: true, selectedBidForDeletion : props.value.bid});
                                }} />}
                                {props.value.status === "PENDING"
                                    && <i className="fa fa-check-circle-o green-icon" style={{margin:'0 10px', cursor: 'pointer', color:'#19CB43'}} onClick={()=>{
                                    this.setState({approveModalIsOpen:true, selectedBid : props.value.bid});
                                }} />}
                                {props.value.status === "PENDING"
                                    && <i className="fa fa-times-circle-o red-icon" style={{margin:'0 10px', cursor: 'pointer', color: '#990000'}} onClick={()=>{
                                    this.setState({rejectModalIsOpen:true, selectedBid : props.value.bid});
                                }} />}
                                { (props.value.status === "APPROVED" || props.value.status === "PENDING")
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        viewLicenseBid(props.value.bid.customId)
                                }} src={docIcon}/>}
                                {props.value.status === "APPROVED"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        if (props.value.status === "APPROVED") {
                                            window.location.href = `/redirect-integration/messages-by-bid-seller/${props.value.bid.id}`;
                                        } else {
                                            _this.refs["messagePopup" + props.value.bid.id].open();
                                        }
                                }} src={blueEnvelopeIcon}/>}

                                {this.state.showRemoveConfirm && <div className="confirmation-tooltip">
                                    <div className={"confirmation-text"} style={{ whiteSpace: 'normal'}}>
                                        {this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_REMOVE")}
                                    </div>
                                    <button className={"button button-confirm"} onClick={(e)=>{
                                        onDelete(this.state.selectedBidForDeletion.id);
                                        this.setState({showRemoveConfirm: false, selectedBidForDeletion: null});
                                        e.stopPropagation();
                                    }}>
                                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CONFIRM")}
                                    </button>
                                    <button className={"button"} onClick={(e)=>{
                                        this.setState({showRemoveConfirm: false, selectedBidForDeletion: null});
                                        e.stopPropagation();
                                    }}>
                                        {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CANCEL")}
                                    </button>
                                </div>}
                            </div>
                        }

                        ]}
                    />

                </div>}
            </div>
        )
    }
}

CommercialSalesBundle.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CommercialSalesBundle;