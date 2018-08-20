import React from 'react';
import Moment from "moment/moment";
import ReactTable from "react-table";
import Modal from 'react-modal';

import DigitalSignature from "../../main/components/DigitalSignature";
import {getCurrencySymbol, getFee, limitText, viewLicenseBid} from "../actions/utils";
import {addIcon, bidIcon, blueCheckIcon, blueEnvelopeIcon, bucketIcon, cancelIcon, docIcon, fixedIcon} from "./Icons";
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
            showBids : props.bidsOpen

        }
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
        const {signature, saving} = this.state;

        return <Modal
            isOpen={this.state.approveModalIsOpen}
            onRequestClose={this.closeApproveModal}
            bodyOpenClassName={"generic-modal"}
            style={GenericModalStyle}
        >
            <div className={"generic-modal-container"}>
                <div className="title">
                    Are you sure you want to accept this bid?
                    {this.context.t("Yes")}
                </div>

                <div className="container">
                    <DigitalSignature signature={signature} onReady={signature => { this.setState({signature}) }} />
                </div>

                <div className={"buttons"}>
                    <button onClick={this.closeApproveModal}>Cancel</button>
                    {!saving && <button className={"confirm"} disabled={!signature} onClick={this.acceptBid}>
                        Accept Bid
                        {this.context.t("Yes")}
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
                    Are you sure you want to decline this bid?
                    {this.context.t("Yes")}
                </div>

                <div className="container">
                    Enter Message (optional)
                    {this.context.t("Yes")}
                    <textarea onChange={(e)=>{this.setState({message: e.target.value})}} value={message}>
                    </textarea>
                </div>

                <div className={"buttons"}>

                    {!saving && <button className={"confirm"} onClick={this.rejectBid}>
                        Confirm
                    </button>}
                    {saving && <i className="fa fa-spin fa-cog"/>}
                    <button onClick={this.closeRejectModal}>
                        Cancel
                        {this.context.t("Yes")}
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
                    Are you sure you want to remove this bid?
                    {this.context.t("Yes")}
                </div>

                <div className="container">
                </div>

                <div className={"buttons"}>

                    {!saving && <button onClick={this.removeBid} className={"confirm"}>
                        Confirm
                        {this.context.t("Yes")}
                    </button>}
                    {saving && <i className="fa fa-spin fa-cog"/>}
                    <button onClick={this.closeRemoveModal}>
                        {this.context.t("Yes")}
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    };

    render(){
        const { salesBundle, company, onDelete, contentId } = this.props;
        const { showBids } = this.state;

        let closedDeals = salesBundle.bids.filter(b=>b.status.name === "APPROVED");
        let totalFee = (closedDeals.length > 0) ? closedDeals.map(b=>Number(b.totalFee)).reduce((t,n)=>t+n) : null;
        let _this = this;

        return (
            <div className="commercial-sales-bundles">
                {this.renderApproveModal()}
                {this.renderRejectModal()}
                {this.renderRemoveModal()}
                <div className="commercial-sales-bundles-container">
                    <div className="sales-bundle-item">
                        {salesBundle.bundleMethod === "SELL_AS_BUNDLE" &&<img style={{width: 26, height: 23}} src={fixedIcon}/>}
                        {salesBundle.name}
                    </div>

                    <div className="sales-bundle-item">
                        {salesBundle.fee > 0 && getFee(salesBundle)}
                        {salesBundle.salesMethod === "BIDDING"
                        &&<img style={{width: 23, height: 23}} src={bidIcon}/>}
                    </div>

                    <div className="sales-bundle-item-right" style={{marginLeft: 'auto'}}>
                        {this.context.t(["closed deal", "closed deals", "n"], {n : closedDeals.length})}
                    </div>

                    <div className="sales-bundle-item-right">
                        {this.context.t(["open bid","open bids", "n"], {n : salesBundle.bids.filter(b=>b.status.name === "PENDING").length})}
                    </div>

                    {totalFee && <div className="sales-bundle-item-right">
                        {totalFee} {getCurrencySymbol(salesBundle.currency.code)}
                    </div>}

                    {salesBundle.bids.length > 0 &&
                    <div className="sales-bundle-show-bids"
                        onClick={()=>{this.setState({showBids: !showBids})}}>
                        {!showBids && <img src={addIcon}/>}
                        {showBids && <img src={cancelIcon}/>}
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
                        className={"ca-table"}
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
                            Header: this.context.t("Buyer"),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            id : "company"
                        },  {
                            Header: this.context.t("Fee"),
                            headerClassName : 'table-header',
                            className : 'table-header',
                            id: "price",
                            accessor: d => {return {fee: d.totalFee, currency: salesBundle.currency.code}},
                            Cell: props => <div className={"blue"}>
                                {props.value.fee + " " + getCurrencySymbol(props.value.currency)}
                            </div>
                        }, {
                            Header: this.context.t("User"),
                            headerClassName : 'table-header-big',
                            className : 'table-header-big',
                            accessor: 'buyerUser',
                            Cell: props => <div>
                                {props.value.firstName + " " + props.value.lastName}
                            </div>

                        },{
                            Header: this.context.t("Action"),
                            headerClassName : 'table-header',
                            className : 'table-header',
                            accessor: 'status.name',
                            Cell: props => <div>
                                {props.value === "APPROVED" && "Closed Deal"}
                                {props.value === "PENDING" && "Bid Placed"}
                                {props.value === "REJECTED" && "Bid Declined"}
                            </div>

                        },{
                            Header: this.context.t("Action date"),
                            headerClassName : 'table-header',
                            className : 'table-header',
                            accessor: 'createdAt',
                            Cell: props => <div>
                                {Moment(props.value).format('DD/MM/YYYY')}
                            </div>

                        }, {
                            headerClassName : 'table-header',
                            className : 'table-header',
                            Header: '',
                            id : "actions",
                            accessor: b => {return {status: b.status.name, bid: b}},
                            Cell: props => <div className={""}>
                                {props.value.status === "REJECTED"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                    //this.setState({removeModalIsOpen:true, selectedBid : props.value.bid});
                                    this.setState({showRemoveConfirm: true});
                                }} src={bucketIcon}/>}
                                {props.value.status === "PENDING"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        this.setState({approveModalIsOpen:true, selectedBid : props.value.bid});
                                }} src={blueCheckIcon}/>}
                                {props.value.status === "PENDING"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                    this.setState({rejectModalIsOpen:true, selectedBid : props.value.bid});
                                }} src={cancelIcon}/>}
                                {props.value.status === "APPROVED"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        viewLicenseBid(props.value.bid.customId)
                                }} src={docIcon}/>}
                                {props.value.status === "APPROVED"
                                    && <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                    _this.refs["messagePopup" + props.value.bid.id].open();
                                }} src={blueEnvelopeIcon}/>}


                                {/*CONFIRM REMOVE*/}
                                {this.state.showRemoveConfirm && <div className="confirmation-tooltip">
                                    <div className={"confirmation-text"} style={{ whiteSpace: 'normal'}}>
                                        {this.context.t("Are you sure you want to remove this bid?")}
                                    </div>
                                    <button className={"button button-confirm"} onClick={(e)=>{
                                        this.setState({showRemoveConfirm: false});
                                        onDelete(props.value.bid.id);
                                        e.stopPropagation();
                                    }}>
                                        {this.context.t("Remove")}
                                    </button>
                                    <button className={"button"} onClick={(e)=>{
                                        this.setState({showRemoveConfirm: false});
                                        e.stopPropagation();
                                    }}>
                                        {this.context.t("Cancel")}
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