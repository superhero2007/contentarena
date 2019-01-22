import React from 'react';
import { connect } from "react-redux";
import store from '../../main/store';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ListingDetails from './../../buy/containers/ListingDetails';
import ContentListing from "../../main/components/ContentListing";
import { stepChangeReset} from "../actions/contentActions";
import DigitalSignature from "../../main/components/DigitalSignature";
import {goTo, goToListing, parseSeasons} from "../../main/actions/utils";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import {PropTypes} from "prop-types";
import Comments from "../components/Comments";
import RightsLegend from "../../main/components/RightsLegend";
import {disableValidation, enableValidation} from "../../main/actions/validationActions";

class ReviewAndSign extends React.Component {

    constructor(props) {
        super(props);
        this.asBundle = "SELL_AS_BUNDLE";
        this.individually = "SELL_INDIVIDUALLY";
        this.worldwide = "WORLDWIDE";
        this.worldwideExcluding = "WORLDWIDE_EXCLUDING";
        this.selectedTerritories = "SELECTED_TERRITORIES";
        this.fixed = "FIXED";
        this.bidding = "BIDDING";
        this.limit = 3;
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        const { status, step, updateContentValue } = nextProps;

        if((step === 5 && status && (status.name === "APPROVED" || status.name === "EDITED")) && !this.termsAutoSelected) {
            updateContentValue('terms', true);
            updateContentValue('terms_arena', true);
            this.termsAutoSelected = true;
        }
    }

    showTerritories = (salesPackage) => {
        return ( salesPackage.bundleMethod === this.individually &&
            salesPackage.territoriesMethod === this.worldwide ) ||
            salesPackage.territoriesMethod !== this.worldwide;
    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }
    };

    submit = () => {
        const {updateContentValue, disableValidation} = this.props;

        let content = store.getState().content;
        let _this = this;
        content = parseSeasons(content);

        disableValidation()
        this.setState({showSubmitting: true});
        ContentArena.ContentApi.saveContentAsActive(content).done(function ( response ) {

            if ( response.success && response.contentId ){
                updateContentValue("id", response.contentId);
                _this.setState({showSuccessScreen: true,showSubmitting: false})
            }
        });
    };

    save = () => {
        this.setState({ showSubmitting : true });

        let content = store.getState().content;
        content = parseSeasons(content);
        ContentArena.ContentApi.saveContentAsDraft(content).done(()=>{
            this.setState({ showSubmitting : false });
        }).fail(() =>{
            this.setState({ showSubmitting: false });
        });
    };

    closeSuccessScreen = () => {
        this.setState({showSuccessScreen: false});
        goTo("managelistings")
    };

    successScreen = () => {
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
                    {this.context.t("CL_STEP5_MODAL_SUCCESS_MESSAGE_1")}
                </div>
                <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>

                    {this.context.t("CL_STEP5_MODAL_SUCCESS_MESSAGE_2")}
                </div>
                <div>
                    <button className="standard-button" onClick={this.closeSuccessScreen} >
                        {this.context.t("CL_STEP5_MODAL_BUTTON")}
                    </button>
                </div>
            </div>

        </Modal>
    };

    updateSalesPackage = ( salesPackage, index ) => {
        this.props.updateSalesPackages("save", salesPackage, index);
    };

    removeSalesPackage = ( index ) => {
        this.props.updateSalesPackages("remove", null, index);
    };

    editSalesPackage = ( index ) => {
        this.setState({
            salesPackageToEdit : index,
            editOpen: true
        });
    };

    toggleDetails = () => {
        this.setState({showDetails: !this.state.showDetails});
    };

    getStatus = () => {
        const {status} = this.props;

        if ((!status || status.name === "DRAFT" || status.name === "INACTIVE" || status.name === "AUTO_INACTIVE")) {
            return this.context.t("CL_STEP5_BUTTON_SUBMIT")
        }

        if (status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED")) {
            return this.context.t("CL_STEP5_BUTTON_SAVE")
        }
    }

    render() {
        if ( this.props.step !== 5) return (null);
        this.scroll();
        const {
            salesPackages,
            updateContentValue,
            signature,
            signatureName,
            signaturePosition,
            currency,
            company,
            terms_arena,
            terms,
            history,
            customId,
            status,
            COMMENTS_RIGHTS,
        } = this.props;

        const {showDetails, showSubmitting} = this.state;

        let signatureReady = (signature && status !== undefined && (status.name === "INACTIVE" || status.name === "EDITED" || status.name === "APPROVED")) ;
        const isButtonDisabled = !(terms && terms_arena && signature && signatureName && signaturePosition);

        return (
            <div className="step-content review-sign-container">
                { this.successScreen() }
                <div className="buttons">
                    <div className={"buttons-container"} style={{ 'display': 'flex',
                        'flexDirection': 'row',
                        'justifyContent': 'space-between'}}>
                        <button className="light-blue-button" onClick={()=>{
                            history.push("/contentlisting/"+ customId + "/4");
                        }}>
                            <i className="fa fa-chevron-left"/> {this.context.t("Edit")}
                        </button>
                        <div>
                            <RightsLegend />
                        </div>
                    </div>
                </div>

                {showDetails && (
                    <div>
                        <div className="step-title">
                            {this.context.t("CL_STEP5_TITLE_PREVIEW")}
                        </div>
                        <ListingDetails
                            onBack={this.toggleDetails}
                            company={company}
                            listing={this.props}
                            history={history}
                            content={this.props}
                        />
                    </div>
                )}

                {!showDetails && <div className="step-content-container">

                    <div className="step-title" style={{marginBottom: 10}}>
                        {this.context.t('CL_STEP5_TITLE_REVIEW')}
                    </div>

                    <div className="base-full-input" style={{maxWidth: 'none', borderBottom: 'none'}}>
                        <label>
                            {this.context.t("CL_STEP5_PREVIEW_LISTING")}
                        </label>
                    </div>

                    <div className="step-item-description" style={{marginTop: 0}}>
                        {this.context.t('CL_STEP5_PREVIEW_INFO')}
                    </div>

                    <div onClick={(e) => {e.preventDefault()}}>
                        <ContentListing {...this.props} nameCursor={"normal"} />
                    </div>

                    <div className="d-flex justify-content-between align-items-center"  style={{marginBottom: 20}}>
                        <div style={{marginLeft: 'auto'}}>
                            {this.context.t('CL_STEP5_PREVIEW_LISTING_DETAILS')}
                        </div>
                        <div onClick={e => {goToListing(customId, true)}} className="ca-btn primary" style={{marginLeft: 20}}>
                            {this.context.t('CL_STEP5_PREVIEW_LISTING_BUTTON_TEXT')}
                        </div>
                    </div>

                    <SalesPackageForm
                        hideButtons
                        sort={true}
                        listingId={customId}
                        fullSize={true}
                        salesPackages={salesPackages}
                        currency={currency}
                        onEdit={this.editSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage}
                    />

                    {this.state.editOpen && <SalesPackageEdit
                        isOpen={this.state.editOpen}
                        onClose={()=>{
                            this.setState({
                                editOpen : false
                            })
                        }}
                        onUpdate={this.updateSalesPackage}
                        salesPackageId={this.state.salesPackageToEdit}
                        salesPackages={salesPackages}
                    />}

                    <div style={{padding: '20px 0 20px'}}>
                        <Comments
                            comments={COMMENTS_RIGHTS}
                            propName={"COMMENTS_RIGHTS"}
                            onClose={this.save}
                        />
                    </div>



                    <DigitalSignature
                        onReady={(signature) => {
                            updateContentValue("signature", signature);
                        }}
                        onChangeSignatureName={e=>{
                            updateContentValue("signatureName", e.target.value);
                        }}
                        onChangeSignaturePosition={e=>{
                            updateContentValue("signaturePosition", e.target.value);
                        }}
                        showTerms={true}
                        terms={terms}
                        terms_arena={terms_arena}
                        updateContentValue={updateContentValue}
                        customClass={'review-and-sign'}
                        ready={signatureReady}
                        signature={signature}
                        signatureName={signatureName}
                        signaturePosition={signaturePosition}
                    />

                    <div className="buttons" style={{marginTop: 20}}>
                        <div className="buttons-container" >
                            {isButtonDisabled ? (
                                <button id="draft-listing" className="standard-button-big steps disabled" onClick={this.props.enableValidation}>
                                    {this.getStatus()}
                                </button>
                            ) : (
                                showSubmitting ? (
                                    <i className="fa fa-cog fa-spin"/>
                                ) : (
                                    <button  id="draft-listing" className="standard-button-big steps" onClick={this.submit}>
                                        {this.getStatus()}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

ReviewAndSign.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        updateSalesPackages : (name, salesPackage, index) => dispatch({
            type: 'UPDATE_SALES_PACKAGES',
            index: index,
            salesPackage : salesPackage,
            name: name
        }),
        stepChangeReset : () => dispatch(stepChangeReset()),
        enableValidation: () => dispatch(enableValidation()),
        disableValidation: () => dispatch(disableValidation()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewAndSign)