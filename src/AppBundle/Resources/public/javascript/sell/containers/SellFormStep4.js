import React from 'react';
import { connect } from "react-redux";
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ListingDetails from './../../buy/containers/ListingDetails';
import ContentListing from "../../main/components/ContentListing";
import {goToPreviousStep, stepChangeReset} from "../actions/contentActions";
import DigitalSignature from "../../main/components/DigitalSignature";

class SellFormStep4 extends React.Component {

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
        if ( this.props.step !== 4) return (null);
        this.scroll();
        const {
            salesPackages,
            goToPreviousStep,
            updateContentValue,
            signature,
            currency,
            company,
            terms_arena,
            terms
        } = this.props;

        const {showDetails} = this.state;

        return (
            <div className="step-content">
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

                    <div className="buttons-container" >
                        <button id="draft-listing" className="standard-button" style={{ width: '250px'}}>
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
                                value={terms}
                                onChange={(e)=>{
                                    updateContentValue('terms',e.target.checked)
                                }}
                                id="terms"/>
                            <label htmlFor="terms"/>
                            I confirm that I have verified the terms stated above. They are correct and ready to be
                            published.
                        </div>
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <input
                                type="checkbox"
                                value={terms_arena}
                                onChange={(e)=>{
                                    updateContentValue('terms_arena',e.target.checked)
                                }}
                                id="terms_arena"/>
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
)(SellFormStep4)