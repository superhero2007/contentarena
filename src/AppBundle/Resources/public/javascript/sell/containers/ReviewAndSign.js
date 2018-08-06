import React from 'react';
import { connect } from "react-redux";
import store from '../store';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ListingDetails from './../../buy/containers/ListingDetails';
import ContentListing from "../../main/components/ContentListing";
import {goToPreviousStep, stepChangeReset} from "../actions/contentActions";
import DigitalSignature from "../../main/components/DigitalSignature";
import {goTo, parseSeasons, viewLicense} from "../../main/actions/utils";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';

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
        this.state = {
        };
    }

    componentDidMount (){
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
        this.setState({showSubmitting: true})
        ContentArena.ContentApi.saveContentAsActive(content).done(function ( response ) {

            if ( response.success && response.contentId ){
                updateContentValue("id", response.contentId);
                _this.setState({showSuccessScreen: true,showSubmitting: false})
            }
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
                    Congratulations!
                </div>
                <div style={{
                    fontSize: 20,
                    width : 600,
                    margin : 40,
                    textAlign : 'center'
                }}>
                    The listing was submitted successfully!
                </div>
                <div>
                    <button className="standard-button" onClick={this.closeSuccessScreen} >Continue</button>
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
            goToPreviousStep,
            updateContentValue,
            signature,
            currency,
            company,
            terms_arena,
            terms,
            customId,
            status,
            listingEdited
        } = this.props;

        if (!listingEdited) {
            updateContentValue('terms_arena', true)
        }

        const {showDetails, showSubmitting} = this.state;

        return (
            <div className="step-content">
                { this.successScreen() }
                <div className="buttons">
                    <div className={"buttons-container"} style={{ justifyContent: 'flex-start'}}>
                        <button className="light-blue-button" onClick={goToPreviousStep}>
                            <i className="fa fa-chevron-left"/> Edit
                        </button>
                    </div>
                </div>
                {!showDetails && <div className="step-title">Review & Sign</div>}
                {showDetails && <div className="step-title">Marketplace Preview</div>}

                {
                    showDetails &&
                    <div>
                        <ListingDetails
                        onBack={this.toggleDetails}
                        company={company}
                        content={this.props}/>
                    </div>
                }

                {!showDetails && <div className="step-content-container">

                    <ContentListing {...this.props} onSelectName={this.toggleDetails} />

                    <SalesPackageForm
                        hideButtons
                        sort={true}
                        fullSize={true}
                        salesPackages={salesPackages}
                        currency={currency}
                        onEdit={this.editSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage}/>

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

                    <div className="buttons-container"  >
                        <button id="draft-listing"
                                onClick={()=>{
                                    viewLicense(customId);
                                }}
                                className="standard-button" style={{ width: '250px'}}>
                            View License Agreement
                        </button>
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
                                value={terms}
                                onChange={(e)=>{
                                    updateContentValue('terms',e.target.checked)
                                }}
                                id="terms"
                                style={{marginRight: 10}}
                            />
                            <label htmlFor="terms"/>
                            I confirm that I have verified the terms stated above. They are correct and ready to be
                            published.
                        </div>
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <input
                                type="checkbox"
                                className="ca-checkbox"
                                defaultChecked={terms_arena}
                                value={terms_arena}
                                onChange={(e)=>{
                                    updateContentValue('terms_arena',e.target.checked)
                                }}
                                id="terms_arena"
                                style={{marginRight: 10}}
                            />
                            <label htmlFor="terms_arena"></label>
                            I confirm that I have verified the terms and conditions that have been outlined by
                            Content Arena Pte. Ltd.
                        </div>
                    </div>

                    <DigitalSignature
                        onReady={(signature) => {
                            updateContentValue("signature", signature);
                        }}
                        signature={signature}
                    />

                    {<div className="buttons" style={{marginTop: 20}}>
                        <div className="buttons-container"  >
                            {!showSubmitting && <button disabled={!(terms && terms_arena && signature)} id="draft-listing" className="standard-button-big steps" onClick={this.submit}>
                                {(!status || status.name === "DRAFT" || status.name === "INACTIVE" ) && "Submit Listing"}
                                {status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED") && "Save"}
                            </button>}
                            {showSubmitting && <i className="fa fa-cog fa-spin" />}
                        </div>
                    </div>}
                </div>}
            </div>
        );
    }
}

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
        goToPreviousStep : () => dispatch(goToPreviousStep()),
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewAndSign)