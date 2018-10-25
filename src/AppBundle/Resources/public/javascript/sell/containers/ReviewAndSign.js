import React from 'react';
import { connect } from "react-redux";
import store from '../../main/store';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ListingDetails from './../../buy/containers/ListingDetails';
import ContentListing from "../../main/components/ContentListing";
import {goToPreviousStep, scrollTopMainContent, stepChangeReset} from "../actions/contentActions";
import DigitalSignature from "../../main/components/DigitalSignature";
import {goTo, goToListing, parseSeasons, viewLicense} from "../../main/actions/utils";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import {PropTypes} from "prop-types";
import Comments from "../components/Comments";
import RightsLegend from "../../main/components/RightsLegend";
import GeneralTerms from "../../main/components/GeneralTerms";

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
        const {updateContentValue} = this.props;
        let content = store.getState().content;
        let _this = this;
        content = parseSeasons(content);
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

    render() {
        if ( this.props.step !== 5) return (null);
        this.scroll();
        const {
            salesPackages,
            updateContentValue,
            signature,
            currency,
            company,
            terms_arena,
            terms,
            history,
            customId,
            status,
            COMMENTS_RIGHTS
        } = this.props;

        const {showDetails, showSubmitting} = this.state;

        let signatureReady = (signature && status !== undefined && (status.name === "INACTIVE" || status.name === "EDITED" || status.name === "APPROVED")) ? true : false ;

        return (
            <div className="step-content">
                <div style={{width: '100%', textAlign: 'right'}}>
                    <RightsLegend />
                </div>
                { this.successScreen() }
                <div className="buttons">
                    <div className={"buttons-container"} style={{ justifyContent: 'flex-start'}}>
                        <button className="light-blue-button" onClick={()=>{
                            history.push("/contentlisting/"+ customId + "/4");
                        }}>
                            <i className="fa fa-chevron-left"/> {this.context.t("Edit")}
                        </button>
                    </div>
                </div>
                {!showDetails && <div className="step-title">
                    {this.context.t("CL_STEP5_TITLE_REVIEW")}
                </div>}
                {showDetails && <div className="step-title">
                    {this.context.t("CL_STEP5_TITLE_PREVIEW")}
                </div>}

                {
                    showDetails &&
                    <div>
                        <ListingDetails
                        onBack={this.toggleDetails}
                        company={company}
                        listing={this.props}
                        history={history}
                        content={this.props}/>
                    </div>
                }

                {!showDetails && <div className="step-content-container">

                    <div onClick={(e) => {
                        goToListing(customId, true);
                        e.preventDefault()
                    }}>
                        <div style={{marginBottom:5}}>
                            {this.context.t('CL_STEP5_PREVIEW_INFO')}
                        </div>
                        <ContentListing {...this.props} />
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
                        onRemove={this.removeSalesPackage} />

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

                    <div style={{margin: '20px auto'}}>
                        <Comments comments={COMMENTS_RIGHTS} propName={"COMMENTS_RIGHTS"} onClose={this.save}/>
                    </div>

                    <div className={"terms-confirm"}
                         style={{
                             padding: '40px 0px',
                             width: '50%',
                             margin: '0 auto'
                         }}>
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <input
                                type="checkbox"
                                className="ca-checkbox"
                                defaultChecked={terms}
                                value={terms}
                                onChange={(e)=>{
                                    updateContentValue('terms', e.target.checked)
                                }}
                                id="terms"
                                style={{marginRight: 10}}
                            />
                            <label htmlFor="terms"/>
                            {this.context.t("CL_STEP5_TERMS_1")}
                        </div>

                        <GeneralTerms
                            defaultChecked={terms_arena}
                            value={terms_arena}
                            onChange={(e)=>{
                                updateContentValue('terms_arena', e.target.checked)
                            }}
                            text={this.context.t("CL_STEP5_TERMS_2")}
                            text2={this.context.t("CL_STEP5_TERMS_3")}
                        />
                    </div>

                    <DigitalSignature
                        onReady={(signature) => {
                            updateContentValue("signature", signature);
                        }}
                        ready={signatureReady}
                        signature={signature}
                    />

                    {<div className="buttons" style={{marginTop: 20}}>
                        <div className="buttons-container"  >
                            {!showSubmitting && <button disabled={!(terms && terms_arena && signature)} id="draft-listing" className="standard-button-big steps" onClick={this.submit}>
                                {(!status || status.name === "DRAFT" || status.name === "INACTIVE" || status.name === "AUTO_INACTIVE" ) && this.context.t("CL_STEP5_BUTTON_SUBMIT") }
                                {status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED") && this.context.t("CL_STEP5_BUTTON_SAVE")}
                            </button>}
                            {showSubmitting && <i className="fa fa-cog fa-spin" />}
                        </div>
                    </div>}
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
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewAndSign)