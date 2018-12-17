import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import cn from "classnames";
import ContentInformation from "./ContentInformation";
import { pdfIcon } from "./../../main/components/Icons";
import TermSheet from "./TermSheet";
import ProgramDetails from "./ProgramDetails";
import Seller from "./Seller";
import Moment from "moment/moment";
import {Link, Route} from 'react-router-dom';
import SendMessage from "./../../common/modals/SendMessage/SendMessage";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import DigitalSignature from "../../main/components/DigitalSignature";
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
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import { getListingImage } from "./../../common/utils/listing";
import { DATE_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import GeneralTerms from "../../main/components/GeneralTerms";
import NumberFormat from 'react-number-format';
import EditButton from "../components/EditButton";
import {goToStep, scrollTopMainContent} from "../../sell/actions/contentActions";

const labelStyle = { height: "30px", fontSize: "12px", width: '400px'};
const inputStyle = { width: '380px', margin: 0, height: "30px"};

class ListingDetails extends React.Component {

    constructor(props) {
        super(props);

        let listing = ContentArena.Utils.contentParserFromServer(props.listing) || {};
        let company = ContentArena.Utils.filterCompanyInfo(props.company);

        console.log("PROPS", props)

        this.state = {
            companyUpdated : false,
            content : listing,
            company: company,
            spinner : false,
            tab : props.tab || "bundles",
            buyingMode : props.tab && props.tab === "checkout",
            soldOut  : false,
            selectedPackage : ( props.tab && props.tab === "checkout") ? listing.salesPackages.find(sp=>sp.id==props.bundle) : {},
            territoriesList: [],
            editCompanyOpen : false,
            bidApplied : false,
            openContactSellerModal: false,
            signatureName: props.user.firstName + " " + props.user.lastName,
            signaturePosition: props.user.title
        };

        if ( this.state.selectedPackage ) this.state.minimumBid =  this.state.selectedPackage.fee;
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.checkIcon = assetsBaseDir + "app/images/check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.contactIcon = assetsBaseDir + "app/images/envelope.png";
        this.watchlistIcon = assetsBaseDir + "app/images/watchlist.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.packageIcon = assetsBaseDir + "app/images/bid.png";
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

        jQuery('body,.manager-container,.marketplace-container').css('background-color', '#eee') //todo: remove this when other page redesign ready
    }

    componentWillUnmount(){
        jQuery('body,.manager-container,.marketplace-container').removeAttr('style') //todo: remove this when other page redesign ready
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
        const { history, scrollTopMainContent } = this.props;

        history.push('/listing/'+customId+'/checkout/'+selectedPackage.id);
        this.setState({
            selectedPackage: selectedPackage,
            buyingMode : true,
            bid: selectedPackage.fee,
            minimumBid : selectedPackage.fee
        })

        scrollTopMainContent();
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

    };

    closeModal = () => {
        this.setState({ editCompanyOpen: false, companyUpdated : true});
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
                            onChange={(e) => {
                                company.legalName = e.target.value;
                                this.setState({company});
                            }}
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
                            Address 1
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
                            Address 2
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => {
                                company.address2 = e.target.value;
                                this.setState({company});
                            }}
                            value={company.address2}/>
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
                    {this.context.t("CHECKOUT_CONGRATULATIONS")}
                </div>
                {selectedPackage.salesMethod === "FIXED" && <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>
                    {this.context.t("CHECKOUT_FIXED_SUCCESS_MESSAGE")}
                </div>}
                {selectedPackage.salesMethod === "BIDDING" && <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>
                    {this.context.t("CHECKOUT_BID_SUCCESS_MESSAGE")}
                </div>}

                <div style={{display: 'flex'}}>
                    {selectedPackage.salesMethod === "FIXED" &&
                        <button className="standard-button" onClick={() => {
                            history.push("/closeddeals");
                        }} >
                            {this.context.t("CHECKOUT_FIXED_GO_TO_CLOSED_DEALS")}
                        </button>
                    }

                    {selectedPackage.salesMethod !== "FIXED" &&
                    <button className="standard-button" onClick={() => {
                        history.push("/bids/activebids");
                    }} >
                        {this.context.t("CHECKOUT_FIXED_GO_TO_BIDS")}
                    </button>
                    }

                    <button className="standard-button" onClick={this.closeSuccessScreen} >
                        {this.context.t("CHECKOUT_FIXED_GO_TO_MARKETPLACE")}
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
        const { selectedPackage, bidApplied } = this.state;
        let technicalFee = this.getTechnicalFee();
        let total = Number(selectedPackage.fee);

        if (selectedPackage.salesMethod === 'BIDDING' && !bidApplied) {
            return 0;
        }

        if ( technicalFee.TECHNICAL_FEE === "ON_TOP" ){
            return total + (total/100)*Number(technicalFee.TECHNICAL_FEE_PERCENTAGE)
        }

        return total;
    };

    setBid = () => {
        const {selectedPackage, bid } = this.state;

        selectedPackage.fee = bid;

        this.setState({
            selectedPackage,
            bidApplied: true
        })
    };

    placeBid = () => {
        const {selectedPackage, signature, content, companyUpdated, company , signatureName, signaturePosition} = this.state;
        this.setState({spinner : true});
        let bidObj = {
            amount : parseFloat(selectedPackage.fee),
            salesPackage : selectedPackage.id,
            signature : signature,
            signatureName: signatureName,
            signaturePosition: signaturePosition,
            totalFee : this.getTotalFee(),
            content : content.id,
            salesMethod : selectedPackage.salesMethod
        };

        if ( companyUpdated ){
            bidObj.company = company
        }

        ContentArena.ContentApi.placeBid(bidObj).then(r =>{
            this.setState({showSuccessScreen : true, soldOut : r.soldOut, spinner : false});
        });

    };

    isPackageValid = () => {
        const {signature, terms, selectedPackage, bidApplied} = this.state;
        const isBidValueValid = selectedPackage.salesMethod === 'BIDDING' ? this.getTotalFee() && bidApplied : true;

        return signature && terms && isBidValueValid;
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

    isActiveTab = (activeTab, tab) =>{
        return activeTab === tab ? 'active': '';
    };

    onBidChange = (value) => {
        this.setState({bid: value});
    };

    getTechnicalFeeLabel = () => {
        const technicalFee = this.getTechnicalFee();

        return technicalFee && technicalFee.TECHNICAL_FEE === "ON_TOP"
            ? ` ${technicalFee.TECHNICAL_FEE_PERCENTAGE}%`
            : ' Included';
    };

    getTechnicalFeeValue = () => {
        const technicalFee = this.getTechnicalFee();
        const { bid, selectedPackage } = this.state;
        const currency = getCurrencySymbol(selectedPackage.currency.code);

        if (!bid) return '';

        return technicalFee && technicalFee.TECHNICAL_FEE === "ON_TOP"
            ? (<React.Fragment><span>{bid*technicalFee.TECHNICAL_FEE_PERCENTAGE/100}</span> {currency}</React.Fragment>)
            : '-';
    };

    getCheckoutType = () => {
        const { salesMethod, id } = this.state.selectedPackage;
        const { bundlesWithActivity, bundlesSold } = this.props.listing;

        const hasOfferFromUser = bundlesWithActivity && bundlesWithActivity.length && bundlesWithActivity.includes(id);
        const hasClosedDeal = bundlesSold && bundlesSold.length && bundlesSold.includes(id);

        if (salesMethod === 'FIXED' && !hasOfferFromUser) {
            return 'BUY_NOW';
        }
        if (salesMethod === 'BIDDING' && hasOfferFromUser && !hasClosedDeal){
            return 'RAISE_BID';
        }
        if(salesMethod === 'BIDDING' && !hasOfferFromUser) {
            return 'PLACE_BID';
        }
        return '';
    };

    getTitlePrefix = (type) => {
        if (!type) return '';

        const titleMap = {
            'BUY_NOW': 'Buy Now',
            'PLACE_BID': 'Place Bid',
            'RAISE_BID': 'Raise Bid'
        };

        return titleMap[type] || '';
    };

    getButtonTooltip = (type) => {
        if (!type) return '';

        const titleMap = {
            'BUY_NOW': this.context.t("CHECKOUT_BUY_NOW"),
            'PLACE_BID': this.context.t("CHECKOUT_PLACE_BID"),
            'RAISE_BID': this.context.t("CHECKOUT_RAISE_BID")
        };

        return titleMap[type] || '';
    };

    isBidValid = () => {
        const { bid, minimumBid} = this.state;
        const validateMinimumBid = this.getCheckoutType() === 'RAISE_BID' ? parseFloat(bid) > parseFloat(minimumBid) : parseFloat(bid) >= parseFloat(minimumBid);
        return bid && parseFloat(bid) !== 0 && validateMinimumBid;
    };

    getCompanyAddress = () => {
        const { company } = this.state;
        return [company.legalName, company.address, company.zip, company.country.name].join(", ");
    };

    openEditCompany = () => {
        this.setState({editCompanyOpen: true});
    };

    setTermsAndConditions = (e) => {
        this.setState({terms: e.target.checked})
    };

    getMinBid = () => {
        const { minimumBid, selectedPackage } = this.state;
        if (!parseFloat(minimumBid)) return;

        let bidValue = this.getCheckoutType() === 'RAISE_BID' ? parseFloat(minimumBid) + 1 : parseFloat(minimumBid);

        return <i>({this.context.t("MIN_BID")} <NumberFormat
            thousandSeparator={true}
            value={bidValue}
            displayType={'text'}
            prefix={getCurrencySymbol(selectedPackage.currency.code)+ " "} />)</i>;
    };

    handleOpenContactSellerModal = () => this.setState({ openContactSellerModal: true });
    handleCloseContactSellerModal = () => this.setState({ openContactSellerModal: false });

    render() {
        ReactTooltip.rebuild();
        const { profile,history, listing } = this.props;
        const {
            buyingMode,
            selectedPackage,
            tab,
            content,
            signature,
            signatureName,
            signaturePosition,
            bid,
            company,
            spinner,
            minimumBid,
            terms,
            openContactSellerModal
        } = this.state;
        const checkoutType = this.getCheckoutType();

        let extraTerritories = ( selectedPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? selectedPackage.excludedTerritories : selectedPackage.territories;
        const isEditedProgramShownInFirstTab = content.rightsPackage.length === 1 && content.rightsPackage.some(e => e.shortLabel === 'PR');

        return (
            <div className="listing-details">
                {openContactSellerModal && <SendMessage
                    title={content.company.legalName}
                    isOpen={openContactSellerModal}
                    listing={content.id}
                    recipient={content.company.id}
                    onCloseModal={this.handleCloseContactSellerModal}
                />}
                { this.editCompany() }
                { this.allTerritories() }
                { this.successScreen() }
                {!buyingMode && (
                    <div className="listing-details-top-info">
                        {profile === "BUYER" && (
                            <div className="publisher">
                                <i className="fa fa-user-o icon" />
                                {content.company.legalName}
                            </div>
                        )}

                        {profile === "BUYER" && !content.userCanNotBuy && (
                            <a onClick={this.handleOpenContactSellerModal} >
                                <img src={this.contactIcon} className="icon"/>
                                <span>
                                    {this.context.t("Contact Seller")}
                                </span>
                            </a>
                        )}

                        {<EditButton {...content}/>}

                        {profile === "BUYER" && (
                            <a onClick={this.watchlist}>
                                <img src={content.watchlist ? this.checkIcon : this.watchlistIcon} className="icon"/>
                                <span>
                                    {content.watchlist ? this.context.t('LISTING_DETAILS_ADDED_TO_WATCHLIST') : this.context.t('Watchlist')}
                                </span>
                            </a>
                        )}

                        <div className="custom-id">#{content.customId}</div>
                    </div>
                )}
                <div className="listing-details-content">
                    <div className={"left"}  >
                        {getListingImage(content)}

                        <ContentListingEventDetails {...this.props.listing} showSeasonDuration={true} showFullSeasons={true}/>

                        <ContentListingRightsPackage
                            rightsPackage={content.rightsPackage}
                        />

                        <div className="legend-wrapper">
                            <RightsLegend />
                        </div>

                        <div className="info">
                            <div className="d-flex">
                                <div style={{marginRight: 5}}>
                                    {this.context.t("Publishing date")}
                                </div>
                                <div>
                                    <b>{Moment().format(DATE_FORMAT)}</b>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div style={{marginRight: 5}}>
                                    {this.context.t("Expiry")}
                                </div>
                                <div>
                                    <b>{Moment(content.expiresAt).format(DATE_FORMAT)}</b>
                                </div>
                            </div>
                        </div>

                    </div>
                    {!buyingMode && (
                        <div className={"right"} >
                            <div className="listings-details-title">
                                <div className="ca-title">
                                    {content.name}
                                </div>
                            </div>

                            {/*TABS*/}
                            <div className={"ca-tabs"}>
                                <div className={'tab '+ this.isActiveTab(tab, 'bundles')} onClick={()=>{
                                    history.push('/listing/'+content.customId+'/bundles');
                                    this.showTab("bundles")
                                }}>
                                    {this.context.t("LISTING_DETAILS_TAB_BUNDLES")}
                                </div>

                                {content.PROGRAM_NAME && !isEditedProgramShownInFirstTab &&(
                                    <div className={'tab '+ this.isActiveTab(tab, 'editedprogram')} onClick={()=>{
                                        history.push('/listing/'+content.customId+'/editedprogram');
                                        this.showTab("editedprogram")
                                    }}>
                                        {this.context.t("LISTING_DETAILS_EDITED_PROGRAM")}
                                    </div>
                                )}


                                <div className={'tab '+ this.isActiveTab(tab, 'grantofrights')} onClick={()=>{
                                    history.push('/listing/'+content.customId+'/grantofrights');
                                    this.showTab("grantofrights")
                                }}>
                                    {this.context.t("LISTING_DETAILS_TAB_RIGHTS")}
                                </div>


                                <div className={'tab '+ this.isActiveTab(tab, 'seller')} onClick={()=>{
                                    history.push('/listing/'+content.customId+'/seller');
                                    this.showTab("seller")
                                }}>
                                    {this.context.t("LISTING_DETAILS_TAB_SELLER")}
                                </div>
                            </div>

                            {/*TAB CONTENT*/}
                            <div className={"listing-details-tab"}>
                                {tab === "bundles" &&
                                <CommercialTerms
                                    profile={profile}
                                    onSelectPackage={this.selectPackage}
                                    programDetails={(content.PROGRAM_NAME && isEditedProgramShownInFirstTab) ? <ProgramDetails {...content}/> : false}
                                    {...content}
                                />
                                }
                                {tab === "grantofrights" &&
                                <TermSheet{...content}/>
                                }
                                {tab === "editedprogram" &&
                                <ProgramDetails {...content}/>
                                }
                                {tab === "seller" &&
                                <Seller {...content}/>
                                }
                            </div>
                        </div>
                    )}

                    {buyingMode && <div className="bid-wrapper">
                        <div className="bid-header">
                            <div className="name">
                                {checkoutType && `${this.getTitlePrefix(checkoutType)} -`} {listing.name}
                            </div>
                        </div>

                        <div className="bid-info-wrapper">
                            <div className="bid-location">
                                <img className="bid-location-icon" src={this.packageIcon} />
                                {selectedPackage.territories.length > 1 && <div className="bid-location-number">{selectedPackage.territories.length}</div>}
                                <span className="bid-location-name">{selectedPackage.name}</span>
                                {extraTerritories && extraTerritories.length > 3 &&
                                    <span className="bid-extra-territories"
                                        onClick={() => this.showAllTerritories(extraTerritories)}> +{extraTerritories.length - 3}</span>
                                }
                            </div>
                            <div className="bid-fee">

                                {checkoutType === 'BUY_NOW' && <div className="bid-license">
                                    <span className="bid-label">{this.context.t("License fee")}</span>
                                    <span className="bid-value">{selectedPackage.fee} {getCurrencySymbol(selectedPackage.currency.code)}</span>
                                </div>}

                                {checkoutType !== 'BUY_NOW' && <div className="bid-technical">
                                    <span className="bid-label">
                                        {this.context.t("Bid")}
                                        {this.getMinBid()}
                                    </span>
                                    <span className="bid-value right-section">
                                        <div className="bid-change-value">
                                            <NumberFormat
                                                thousandSeparator={true}
                                                ref={bidInput => {this.bidInput = bidInput}}
                                                value={bid}
                                                onValueChange={(values) => {
                                                    const {value} = values;
                                                    this.onBidChange(value)
                                                }}
                                                min={selectedPackage.fee}
                                                prefix={getCurrencySymbol(selectedPackage.currency.code)+ " "} />
                                        </div>
                                        <div className="bid-apply-changes"
                                             data-tip
                                             data-for='apply-bid'
                                             data-tip-disable={parseFloat(bid) >= parseFloat(minimumBid)}>
                                            <button
                                                onClick={this.setBid}
                                                className="ca-btn primary"
                                                disabled={!this.isBidValid()}>{this.context.t("MARKETPLACE_BUTTON_APPLY")}</button>
                                        </div>
                                    </span>
                                </div>}

                                <div className="bid-technical">
                                    <span className="bid-label">
                                        {this.context.t("Technical fee:")}
                                        <span className="bid-value">{this.getTechnicalFeeLabel()}</span>
                                    </span>
                                    <span className={cn('bid-value', {'padding-right': checkoutType !== 'BUY_NOW'})}>{this.getTechnicalFeeValue()}</span>
                                </div>

                                <div className="bid-total">
                                    <span className="bid-label">{this.context.t("Total")}</span>
                                    <span className={cn('bid-value', {'padding-right': checkoutType !== 'BUY_NOW'})}>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={this.getTotalFee()}
                                            displayType={'text'}
                                            prefix={getCurrencySymbol(selectedPackage.currency.code)+ " "} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bid-payment-details">
                            <header>{this.context.t("Payment details")}</header>
                            <div className="bid-payment-table">
                                {selectedPackage.installments.length && selectedPackage.installments.map((installment, index) => {
                                    return <div key={`installment-${index}`} className="payment-row">
                                        <div className="payment-installment">{this.ordinal_suffix_of(++index)} {this.context.t("installment")}</div>
                                        <div className="payment-percentage"><i className="fa fa-angle-right" />{` ${installment.value}%`}</div>
                                        <div className="payment-date">
                                            {installment.type === "DAY" && installment.days + this.context.t("INSTALLMENT_CLOSURE_DAYS")}
                                            {installment.type === "DATE" && ` ${Moment(installment.date).format(DATE_FORMAT)}`}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="bid-address-license">
                            <div className="bid-address">
                                <span>{this.getCompanyAddress()}</span>
                                <i className="fa fa-pencil-square-o" onClick={() => this.openEditCompany()} />
                            </div>
                            <div className="bid-license" onClick={()=> viewLicenseCustom(content.customId, selectedPackage.id, bid, company)} title={this.context.t("CHECKOUT_LICENSE_AGREEMENT")}>
                                <span>{this.context.t("License agreement")}</span>
                                <img src={pdfIcon} alt="Licence"/>
                            </div>
                        </div>

                        <div className="bid-signature">
                            <DigitalSignature
                                customClass='for-listing'
                                title={this.context.t("PLEASE_SIGN_WITH_YOUR_CURSOR")}
                                signature={signature}
                                signatureName={signatureName}
                                signaturePosition={signaturePosition}
                                onChangeSignatureName={e=>{
                                    this.setState({"signatureName": e.target.value});
                                }}
                                onChangeSignaturePosition={e=>{
                                    this.setState({"signaturePosition": e.target.value});
                                }}
                                onReady={signature => { this.setState({signature}) }} />
                        </div>

                        <div className="bid-signature-btns">
                            <GeneralTerms
                                defaultChecked={terms}
                                value={terms}
                                onChange={e => this.setTermsAndConditions(e) }
                            />

                            {!spinner
                                ? (<button className="standard-button" onClick={this.placeBid} disabled={!this.isPackageValid()} title={this.getButtonTooltip(checkoutType)}>
                                    {this.getTitlePrefix(checkoutType)}</button>)
                                : <i className="fa fa-cog fa-spin" />}
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
        onClick: id => dispatch(test(id)),
        scrollTopMainContent : () => dispatch(scrollTopMainContent()),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingDetails)