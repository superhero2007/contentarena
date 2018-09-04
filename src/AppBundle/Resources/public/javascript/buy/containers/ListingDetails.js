import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import ContentInformation from "./ContentInformation";
import TermSheet from "./TermSheet";
import ProgramDetails from "./ProgramDetails";
import Seller from "./Seller";
import Moment from "moment/moment";
import {Link, Route} from 'react-router-dom';
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import DigitalSignature from "../../main/components/DigitalSignature";
import SendMessage from "../../main/components/SendMessage";
import {
    getCurrencySymbol, getFullName, goTo, goToClosedDeals, goToListing,
    goToMarketplace, viewLicense, viewLicenseCustom
} from "../../main/actions/utils";
import {customStyles} from "../../main/styles/custom";
import {companyIsValid} from "../../sell/actions/validationActions";
import Modal from 'react-modal';
import CountrySelector from "../../main/components/CountrySelector";
import ReactTooltip from 'react-tooltip'
import {PropTypes} from "prop-types";
const labelStyle = { height: "30px", fontSize: "12px", width: '400px'};
const inputStyle = { width: '380px', margin: 0, height: "30px"};
const bidButtonStyle = { height: 34, width: 75, padding: 5, marginLeft: 10, fontSize: 14, marginRight: 10 };
const bidTextBoxStyle = {
    backgroundColor: "#fff",
    padding: '5px 10px',
    border: '1px solid lightgrey',
    marginLeft: 5
};

class ListingDetails extends React.Component {

    constructor(props) {
        super(props);

        let listing = ContentArena.Utils.contentParserFromServer(props.listing) || {};

        this.state = {
            content : listing,
            company: props.company,
            spinner : false,
            tab : props.tab || "bundles",
            buyingMode : props.tab && props.tab === "checkout",
            soldOut  : false,
            selectedPackage : ( props.tab && props.tab === "checkout") ? listing.salesPackages.find(sp=>sp.id==props.bundle) : {},
            territoriesList: [],
            editCompanyOpen : false,
            bidUpdated : false
        };
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.checkIcon = assetsBaseDir + "app/images/check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.contactIcon = assetsBaseDir + "app/images/envelope.png";
        this.watchlistIcon = assetsBaseDir + "app/images/watchlist.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.packageIcon = assetsBaseDir + "app/images/bid.png";
        this.infoIcon = assetsBaseDir + "app/images/info.png";
        this.pdfIcon = assetsBaseDir + "app/images/pdf.png";
        this.draftIcon = assetsBaseDir + "app/images/draft.png";
        this.baseDir = assetsBaseDir + "../";
    }

    componentDidMount (){
        const {salesPackage} = this.props;
        const {content} = this.state;
        let selectedPackage;

        if (salesPackage){
            selectedPackage = content.salesPackages.filter(p=>{return Number(p.id)===Number(salesPackage)})[0];
            this.selectPackage(selectedPackage);
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            content : ContentArena.Utils.contentParserFromServer(nextProps.listing)
        });
    }

    toggleBuyingMode = () => {
        this.setState({buyingMode: !this.state.buyingMode});
    };

    selectPackage = ( selectedPackage, customId ) => {
        const { history } = this.props;

        history.push('/listing/'+customId+'/checkout/'+selectedPackage.id);
        this.setState({
            selectedPackage: selectedPackage,
            buyingMode : true,
            bid: selectedPackage.fee,
            minimumBid : selectedPackage.fee
        })
    };

    ordinal_suffix_of = (i) => {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    isTabHasData = (content, tab) => {
        const {description, website, attachments} = content;

        if (tab === "event") {
            return !!(description || website || (attachments && attachments.length > 0));
        }

    }

    closeModal = () => {
        this.setState({ editCompanyOpen: false});
    };

    closeTerritoriesModal = () => {
        this.setState({ showAllTerritories: false});
    };

    closeSuccessScreen = () => {

        const {history} = this.props;
        history.push("/marketplace");
    };

    editCompany = () => {

        const { company } = this.state;

        return <Modal
            isOpen={this.state.editCompanyOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="modal-title">
                Company Information
                <i className="fa fa-times-circle-o close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Legal name
                        </label>
                        <input
                            type={"text"}
                            style={inputStyle}
                            value={company.legalName}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Registration number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.registrationNumber = e.target.value;
                                this.setState({company});
                            }}
                            value={company.registrationNumber}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            VAT ID number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.vat = e.target.value;
                                this.setState({company});
                            }}
                            value={company.vat}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Street Name / Number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.address = e.target.value;
                                this.setState({company});
                            }}
                            value={company.address}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            City
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.city = e.target.value;
                                this.setState({company});
                            }}
                            value={company.city}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            ZIP code
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.zip = e.target.value;
                                this.setState({company});
                            }}
                            value={company.zip}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Country
                        </label>
                        <CountrySelector
                            multi={false}
                            onChange={(value) => {
                                company.country.name = value.label;
                                this.setState({company});
                            }}
                            value={{value: company.country.name, label: company.country.name}}/>
                    </div>


                </div>
            </div>

            <div className={"buttons"}>
                { companyIsValid(company) &&<button
                    className={"standard-button"}
                    onClick={this.closeModal}>Ok</button>}

                { !companyIsValid(company) &&<button
                    className={"standard-button"}
                    disabled
                >Ok</button>}
            </div>
        </Modal>
    };

    showAllTerritories = (extraTerritories) => {
        this.setState({
            showAllTerritories : true,
            territoriesList : extraTerritories
        })
    };

    allTerritories = () => {

        return <Modal
            isOpen={this.state.showAllTerritories}
            onRequestClose={this.closeTerritoriesModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div style={{
                color: 'grey',
                padding: 20,
                display: 'flex',
                flexWrap: 'wrap',
            }}>
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

    successScreen = () => {
        const { selectedPackage } = this.state;
        const { history } = this.props;
        return <Modal
            isOpen={this.state.showSuccessScreen}
            onRequestClose={this.closeSuccessScreen}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div style={{
                color: 'grey',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: 30,
                    width : 600,
                    textAlign : 'center',
                    fontWeight: 600
                }}>
                    {this.context.t("Congratulations!")}
                </div>
                {selectedPackage.salesMethod === "FIXED" && <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>
                    {this.context.t("You have successfully acquired the package!")}
                </div>}
                {selectedPackage.salesMethod === "BIDDING" && <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>
                    {this.context.t("Your bid was placed successfully!")}
                </div>}

                <div style={{display: 'flex'}}>
                    {selectedPackage.salesMethod === "FIXED" &&
                        <button className="standard-button" onClick={() => {
                            history.push("/closeddeals");
                        }} >
                            {this.context.t("View Closed Deals")}
                        </button>
                    }

                    {selectedPackage.salesMethod !== "FIXED" &&
                    <button className="standard-button" onClick={() => {
                        history.push("/bids/activebids");
                    }} >
                        {this.context.t("View Bids")}
                    </button>
                    }

                    <button className="standard-button" onClick={this.closeSuccessScreen} >
                        {this.context.t("Return to Marketplace")}
                    </button>
                </div>
            </div>

        </Modal>
    };

    getTechnicalFee = () => {
        const {content} = this.state;

        let response = {
            TECHNICAL_FEE :"",
            TECHNICAL_FEE_PERCENTAGE : 0
        };

        let selected = (content.rightsPackage && content.rightsPackage[0] && content.rightsPackage[0].selectedRights) ? content.rightsPackage[0].selectedRights : null;

        if ( selected ){
            response["TECHNICAL_FEE"] = selected["TECHNICAL_FEE"];
            response["TECHNICAL_FEE_PERCENTAGE"] = selected["TECHNICAL_FEE_PERCENTAGE"];
        }

        return selected;

    };

    getTotalFee = () => {
        const {selectedPackage } = this.state;
        let technicalFee = this.getTechnicalFee();
        let total = Number(selectedPackage.fee);

        if ( technicalFee.TECHNICAL_FEE === "ON_TOP" ){
            total  = total + (total/100)*Number(technicalFee.TECHNICAL_FEE_PERCENTAGE)
        }
        return total;
    };

    setBid = () => {
        const {selectedPackage, bid } = this.state;

        selectedPackage.fee = bid;

        this.setState({
            selectedPackage,
            bidUpdated : true
        })
    };

    editBid = () => {
        this.setState({
            bidUpdated : false
        });
    };

    placeBid = () => {
        const {bid, selectedPackage, signature, content } = this.state;
        this.setState({spinner : true});
        let bidObj = {
            amount : bid,
            salesPackage : selectedPackage.id,
            signature : signature,
            totalFee : this.getTotalFee(),
            content : content.id,
            salesMethod : selectedPackage.salesMethod
        };

        ContentArena.ContentApi.placeBid(bidObj).then(r =>{
            this.setState({showSuccessScreen : true, soldOut : r.soldOut, spinner : false});
        });

    };

    invalidPackage = () => {
        const {signature, selectedPackage, bidUpdated, terms} = this.state;
        return !signature || (selectedPackage.salesMethod === 'BIDDING' && !bidUpdated ) || !terms;
    };

    watchlist = () => {
        let content = this.state.content;
        let _this = this;

        content.watchlist = !content.watchlist;
        _this.setState({content});

        ContentArena.Api.watchlist(content.customId).then(response => {
            if ( response && response.success === true ) {
                content.watchlist = !!response.state;
                _this.setState({content});
            }
        });

    };

    render() {
        ReactTooltip.rebuild();
        const {onBack, profile,history } = this.props;
        const {buyingMode, selectedPackage,tab, content, signature, bid, company, bidUpdated, spinner, minimumBid} = this.state;
        let listingImage = (content.image) ? assetsBaseDir + "../" + content.image : this.noImage;
        let technicalFee = this.getTechnicalFee();
        let extraTerritories = ( selectedPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? selectedPackage.excludedTerritories : selectedPackage.territories;
        return (
            <div className="listing-details">
                <SendMessage ref="messagePopup" listingId={content.id} recipient={content.company}/>
                { this.editCompany() }
                { this.allTerritories() }
                { this.successScreen() }
                <div className="listing-details-content">
                    <div className={"left"}  >
                        {/*IMAGE*/}
                        <div className={"image"}>
                            <img src={listingImage}/>
                        </div>

                        <ContentListingEventDetails {...this.props.listing}/>

                        {/* RIGHTS*/}
                        <div style={{flex: 2, flexDirection: "column", margin: '20px 0' }}>
                            {
                                content.rightsPackage.map(( sr,i )=>{
                                    return <div key={i}  style={{
                                        minHeight: 46,
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {!sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>}

                                        {sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.yellowCheck}/>}

                                        <div style={{display: 'flex', flexDirection: "row"  }}>
                                            { sr.shortLabel !== "PR" && sr.name }
                                            { sr.shortLabel === "PR" && content.PROGRAM_NAME &&
                                            "Program: " + content.PROGRAM_NAME
                                            }
                                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                        <div className={"date"}>
                            {this.context.t("Start of license period")}
                            <span>
                                { content.startDateMode !== "DATE"  && this.context.t(" With contract conclusion")}
                                { content.startDateMode === "DATE"  && " " + Moment(content.startDate).format('DD/MM/YYYY')}
                            </span>
                        </div>
                        <div className={"date"}>
                            {this.context.t("End of license period")}
                            <span>
                            { content.endDateMode === "LIMITED"  && " " + content.endDateLimit + this.context.t(" days from contract conclusion")}
                            { content.endDateMode === "DATE"  && " " +Moment(content.endDate).format('DD/MM/YYYY')}
                            { content.endDateMode === "UNLIMITED"  && this.context.t(" Unlimited")}
                            </span>
                        </div>
                        <div className={"date"}>
                            {this.context.t("Publishing date")}
                            <span>{Moment().format('DD/MM/YYYY')}</span></div>
                        <div className={"date"}>
                            {this.context.t("Expiry")}
                            <span>{Moment(content.expiresAt).format('DD/MM/YYYY')}</span></div>
                    </div>
                    {!buyingMode && <div className={"right"} >
                        <div className={"header"}>
                            <div className={"content"}>
                                <div className="name">{content.name}</div>
                                {profile === "BUYER" && <div className="publisher" style={{
                                    flex:1,
                                    fontSize: 18,
                                    fontWeight: 600
                                }}>{content.company.legalName}</div>}

                                {profile === "BUYER" && <div style={{margin: '0 10px', display: 'flex', cursor: 'pointer'}}
                                     onClick={()=>{
                                         this.refs.messagePopup.open()
                                     }}>
                                    <img style={{width: 22, height: 18, marginBottom: 5}} src={this.contactIcon}/>
                                    <div style={{
                                        flex:1,
                                        color: '#4F4F4F',
                                        fontSize: 16,
                                        margin: '0 10px'
                                    }}>
                                        {this.context.t("Contact Seller")}
                                    </div>
                                </div>}

                                {profile === "BUYER" && <div style={{margin: '0 10px', display: 'flex', cursor : 'pointer'}}
                                     onClick={this.watchlist}>
                                    <img style={{width: 18, height: 18, marginTop: 2}}
                                         src={content.watchlist ? this.checkIcon : this.watchlistIcon}
                                    />
                                    <div style={{
                                        flex:1,
                                        color: '#2DA7E6',
                                        fontSize: 16,
                                        textDecoration: (content.watchlist) ? '' : 'underline',
                                        margin: '0 10px 0 5px'

                                    }}>
                                        {content.watchlist ? this.context.t('Added to watchlist') : this.context.t('Watchlist')}
                                    </div>
                                </div>}

                                {/*CUSTOM ID*/}
                                <div className="custom-id">#{content.customId}</div>
                            </div>
                        </div>

                        {/*TABS*/}
                        <div className={"listing-details-buttons"}>
                            <button className={(tab ==="bundles")?"active": ""} onClick={()=>{
                                history.push('/listing/'+content.customId+'/bundles');
                                this.showTab("bundles")
                            }}>
                                {this.context.t("Program & Sales Bundles")}
                            </button>

                            {this.isTabHasData(content, "event") &&
                                <button className={(tab ==="event")?"active": ""} onClick={()=>{
                                    history.push('/listing/'+content.customId+'/event');
                                    this.showTab("event");
                                }}>
                                    {this.context.t("Event")}
                                </button>
                            }
                            <button className={(tab ==="grantofrights")?"active": ""} onClick={()=>{
                                history.push('/listing/'+content.customId+'/grantofrights');
                                this.showTab("grantofrights")
                            }}>
                                {this.context.t("Grant of Rights & Production")}
                            </button>
                            {content.PROGRAM_NAME &&
                                <button className={(tab ==="editedprogram")?"active": ""} onClick={()=>{
                                    history.push('/listing/'+content.customId+'/editedprogram');
                                    this.showTab("editedprogram")
                                }}>
                                    {this.context.t("Edited Program")}
                                </button>
                            }
                            <button className={(tab ==="seller")?"active": ""} onClick={()=>{
                                history.push('/listing/'+content.customId+'/seller');
                                this.showTab("seller")
                            }}>
                                {this.context.t("Seller Information")}
                            </button>
                        </div>

                        {/*TAB CONTENT*/}
                        <div className={"listing-details-tab"}>

                            { this.state.tab === "bundles" &&
                                <CommercialTerms
                                    profile={profile}
                                    onSelectPackage={this.selectPackage}
                                    {...content}
                                />
                            }
                            {this.state.tab === "event" && this.isTabHasData(content, "event") &&
                                <ContentInformation {...content}/>
                            }
                            { this.state.tab === "grantofrights" &&
                                <TermSheet{...content}/>
                            }
                            { this.state.tab === "editedprogram" &&
                                <ProgramDetails {...content}/>
                            }
                            {this.state.tab === "seller" &&
                                <Seller {...content}/>
                            }


                        </div>
                    </div>}

                    {buyingMode && <div className={"right"} style={{padding:'0 20px'}} >

                        {/*NAME*/}
                        <div className={"header"}>
                            <div className={"content"}>
                                <div className="name">
                                    {selectedPackage && selectedPackage.salesMethod === "FIXED" && "Buy now"}
                                    {selectedPackage && selectedPackage.salesMethod === "BIDDING" && "Bid"}
                                </div>
                            </div>
                        </div>

                        {/*TERRITORIES*/}
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <div style={{
                                flex: 1,
                                paddingLeft: 30,
                                paddingTop: 5,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center'

                            }}>
                                {this.context.t("Sales bundle")}
                            </div>
                            <div style={{
                                flex: '2.5 1 0%',
                            }}>
                                <div style={{
                                    padding: 12,
                                    border: '1px solid #DDE1E7',
                                    backgroundColor: '#FAFBFC',
                                    margin: 5,
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'grey',
                                    maxWidth: 750
                                }}>

                                    {selectedPackage.bundleMethod === "SELL_AS_BUNDLE"
                                    && selectedPackage.territories.length > 1
                                    && <div style={{  }}>
                                        <img style={{ width: 26, height: 23}} src={this.packageIcon}/>
                                    </div>
                                    }

                                    {selectedPackage.territories.length > 1 && <div style={{margin: '0 15px', fontWeight: 600}}>
                                        {selectedPackage.territories.length}
                                    </div>}

                                    <div>
                                        {selectedPackage.name}
                                        {
                                            extraTerritories && extraTerritories.length > 3 && <span
                                                style={{
                                                    color: '#2DA7E6',
                                                    textDecoration: 'underline',
                                                    marginLeft : 5,
                                                    cursor : 'pointer'
                                                }}
                                                onClick={() => {this.showAllTerritories(extraTerritories)}}>
                                                {"+" + (extraTerritories.length - 3)}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*FEE*/}
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <div style={{
                                flex: 1,
                                paddingLeft: 30,
                                paddingTop: 5,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center'

                            }}>
                                {this.context.t("Commercial information")}
                            </div>
                            <div style={{
                                flex: '2.5 1 0%',
                            }}>
                                <div style={{
                                    padding: '8px 12px',
                                    border: '1px solid #DDE1E7',
                                    backgroundColor: '#FAFBFC',
                                    margin: 5,
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'grey',
                                    maxWidth: 750
                                }}>
                                    {selectedPackage.salesMethod === "FIXED" &&
                                    <div style={{ display : 'flex', alignItems: 'center'}}>
                                        {this.context.t("License fee:")}
                                        <span style={bidTextBoxStyle}>{selectedPackage.fee} {getCurrencySymbol(selectedPackage.currency.code)}</span>
                                    </div>}

                                    {selectedPackage.salesMethod === "BIDDING" &&
                                    <div style={{ display : 'flex', alignItems: 'center'}}>

                                        {this.context.t("Bid:")}
                                        {!bidUpdated &&
                                        <input
                                            style={{
                                                padding: '6px 10px',
                                                width: 100,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                textAlign: 'right'
                                            }}
                                            type="number"
                                            value={bid}
                                            onChange={e=>{
                                                let value = e.target.value;
                                                this.setState({bid:value})
                                            }}
                                            min={selectedPackage.fee}/>}
                                        {bidUpdated && <span style={bidTextBoxStyle}>{selectedPackage.fee} {getCurrencySymbol(selectedPackage.currency.code)}</span>}
                                        {!bidUpdated && getCurrencySymbol(selectedPackage.currency.code)}

                                        {!bidUpdated &&
                                            <div
                                                data-tip
                                                data-for='apply-bid'
                                                data-tip-disable={parseFloat(bid)>=parseFloat(minimumBid)}>
                                                <button className="standard-button"
                                                        style={bidButtonStyle}
                                                        disabled={!bid || parseFloat(bid) === 0 || parseFloat(bid)<parseFloat(minimumBid)}
                                                        onClick={this.setBid}>Apply</button>
                                            </div>}
                                        <ReactTooltip id='apply-bid'>
                                            <span>
                                                {this.context.t("The bid must exceed current minimum")}
                                            </span>
                                        </ReactTooltip>
                                        {bidUpdated && <button className="link-button" onClick={this.editBid}>
                                            {this.context.t("Raise")}
                                        </button>}
                                    </div>}

                                    <div style={{
                                        margin: '5px 10px'
                                    }}>
                                        {this.context.t("Technical fee:")}
                                        <span style={bidTextBoxStyle}>
                                            {technicalFee.TECHNICAL_FEE === "ON_TOP" && technicalFee.TECHNICAL_FEE_PERCENTAGE + "%"}
                                            {technicalFee.TECHNICAL_FEE !== "ON_TOP" && "Included"}
                                        </span>
                                    </div>

                                    <div style={{
                                        margin: '5px 10px'
                                    }}>
                                        {this.context.t("Total:")}
                                        <span style={bidTextBoxStyle}>
                                            {this.getTotalFee() + getCurrencySymbol(selectedPackage.currency.code)}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*PAYMENT DETAILS*/}
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <div style={{
                                flex: 1,
                                paddingLeft: 30,
                                paddingTop: 5,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center'

                            }}>
                                {this.context.t("Payment details")}
                            </div>
                            <div style={{
                                flex: '2.5 1 0%',
                            }}>
                                {
                                    selectedPackage.installments && selectedPackage.installments.map((installment, index) => {
                                        return <div key={"installment-"+ index} style={{
                                            padding: 12,
                                            border: '1px solid #DDE1E7',
                                            backgroundColor: '#FAFBFC',
                                            margin: 5,
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            color: 'grey',
                                            maxWidth: 750
                                        }}>
                                            <div style={{
                                                margin: '0 10px 0 0',
                                                fontWeight: 600
                                            }}>{this.ordinal_suffix_of(index + 1)} {this.context.t("installment")}
                                            </div>
                                            <div style={{margin: '0 30px'}}>{installment.value}%</div>
                                            <div style={{margin: '0 10px'}}>
                                                {installment.type === "DAY" && installment.days + this.context.t(" days after contract closure")}
                                                {installment.type === "DATE" && " " + Moment(installment.date).format('DD/MM/YYYY')}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        {/*COMPANY*/}
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <div style={{
                                flex: 1,
                                paddingLeft: 30,
                                paddingTop: 5,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center'

                            }}>
                                {this.context.t("Company address")}
                            </div>
                            <div style={{
                                flex: '2.5 1 0%',
                            }}>
                                <div style={{
                                    padding: 12,
                                    border: '1px solid #DDE1E7',
                                    backgroundColor: '#FAFBFC',
                                    margin: 5,
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'grey',
                                    maxWidth: 750
                                }}>
                                    {
                                        [company.legalName, company.address, company.zip, company.country.name].join(", ")
                                    }
                                    <img src={this.draftIcon}
                                         onClick={e => {this.setState({editCompanyOpen: true})}}
                                         style={{cursor: 'pointer', margin: '-2px 10px'}} />
                                </div>
                            </div>
                        </div>

                        {/*LICENSE*/}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textDecoration: 'underline',
                            cursor : 'pointer',
                            color: '#48C0FE',
                            fontSize: 16,
                            margin: 10
                        }} onClick={()=>{
                            viewLicenseCustom(content.customId, selectedPackage.id, bid);
                        }}>
                            <img style={{marginRight: 10}} src={this.pdfIcon}/>
                            {this.context.t("License agreement")}
                        </div>

                        {/*SIGNATURE*/}
                        <div>
                            <DigitalSignature signature={signature} onReady={signature => { this.setState({signature}) }} />
                            <div style={{textAlign:'center',padding:'20px 0 0'}}>
                                <input type="checkbox"
                                       id="terms-buy"
                                       className="ca-checkbox"
                                       style={{marginRight:"5px"}}
                                       onChange={e =>{ this.setState({terms: e.target.checked}) }}
                                       checked={this.state.terms}
                                />
                                <label htmlFor={"terms-buy"}>
                                    {this.context.t("Accept terms conditions")}
                                </label>

                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginBottom: 40
                        }}>
                            { !spinner && selectedPackage.salesMethod === "FIXED" &&
                            <button className="standard-button"
                                    onClick={this.placeBid}
                                    disabled={this.invalidPackage()}>
                                {this.context.t("Buy")}
                            </button>}

                            { !spinner && selectedPackage.salesMethod !== "FIXED" &&
                            <button className="standard-button"
                                    onClick={this.placeBid}
                                    disabled={this.invalidPackage()}>
                                {this.context.t("Place Bid")}
                            </button>}



                            { spinner && <i className="fa fa-cog fa-spin"/>}
                        </div>
                    </div>}
                </div>
            </div>

        );
    }
}

ListingDetails.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingDetails)