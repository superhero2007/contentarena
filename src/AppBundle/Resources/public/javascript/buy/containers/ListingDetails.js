import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import TermSheet from "./TermSheet";
import ProgramDetails from "./ProgramDetails";
import Seller from "./Seller";
import Moment from "moment/moment";
import SendMessage from "./../../common/modals/SendMessage/SendMessage";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'
import {PropTypes} from "prop-types";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import { getListingImage } from "./../../common/utils/listing";
import { DATE_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import EditButton from "../components/EditButton";
import {goToStep, scrollTopMainContent} from "../../sell/actions/contentActions";
import {disableValidation, enableValidation} from "../../main/actions/validationActions";
import Checkout from "./Checkout";

class ListingDetails extends React.Component {

    constructor(props) {
        super(props);

        let listing = ContentArena.Utils.contentParserFromServer(props.listing) || {};
        let company = ContentArena.Utils.filterCompanyInfo(props.company);
        let bundles = ( props.bundles )? props.bundles.split("&").map(b=>Number(b)) : [];

        this.state = {
            companyUpdated : false,
            content : listing,
            company: company,
            spinner : false,
            tab : props.tab || "bundles",
            buyingMode : props.tab && props.tab === "checkout",
            soldOut  : false,
            selectedPackages : ( props.tab && props.tab === "checkout") ? listing.salesPackages.filter(sp=>bundles.indexOf(sp.id) >= 0) : {},
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

        const {validation, disableValidation} = this.props;

        if (validation) disableValidation()

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            content : ContentArena.Utils.contentParserFromServer(nextProps.listing)
        });
    }

    toggleBuyingMode = () => {
        this.setState({buyingMode: !this.state.buyingMode});
    };

    selectPackage = ( bundles, customId ) => {
        const { history } = this.props;

        history.push('/listing/'+customId+'/checkout/'+bundles.join("&"));
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

    closeSuccessScreen = () => {
        const {history} = this.props;
        history.push("/marketplace");
    };

    successScreen = () => {
        const { selectedPackage } = this.state;
        const { history } = this.props;

        if (!selectedPackage) return undefined;
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
        this.props.disableValidation();
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

    handleOpenContactSellerModal = () => this.setState({ openContactSellerModal: true });

    handleCloseContactSellerModal = () => this.setState({ openContactSellerModal: false });

    render() {
        ReactTooltip.rebuild();
        const {profile, history, listing} = this.props;
        const {
            buyingMode,
            selectedPackages,
            tab,
            content,
            company,
            openContactSellerModal
        } = this.state;

        const isEditedProgramShown =  content.rightsPackage.some(e => e.shortLabel === 'PR');
        const isEditedProgramShownInFirstTab = content.rightsPackage.length === 1 && isEditedProgramShown;

        return (
            <div className="listing-details">
                {openContactSellerModal && <SendMessage
                    title={content.company.legalName}
                    isOpen={openContactSellerModal}
                    listing={content.id}
                    recipient={content.company.id}
                    onCloseModal={this.handleCloseContactSellerModal}
                />}
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
                                <div className="ca-title small">
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

                                {content.PROGRAM_NAME && !isEditedProgramShownInFirstTab && isEditedProgramShown &&(
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
                                    programDetails={(content.PROGRAM_NAME && isEditedProgramShownInFirstTab && isEditedProgramShown) ? <ProgramDetails {...content}/> : false}
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
                    {buyingMode &&
                    <Checkout
                        listing={listing}
                        history={history}
                        selectedPackages={selectedPackages}
                        company={company}/>}
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
        enableValidation: () => dispatch(enableValidation()),
        disableValidation: () => dispatch(disableValidation()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingDetails)