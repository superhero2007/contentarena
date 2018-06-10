import React from 'react';
import { connect } from "react-redux";
import Moment from "moment/moment";
import SalesPackageForm from "../components/SalesPackageForm";
import ContentListing from "../../main/components/ContentListing";
import {goToPreviousStep, goToNextStep, stepChangeReset} from "../actions/contentActions";
import {TitleBar} from "../components/SellFormItems";


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
            terms : false,
            terms_arena : false,
        };
    }

    componentDidMount () { }

    componentWillReceiveProps(nextProps) {
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

    render() {
        if ( this.props.step !== 4) return (null);
        this.scroll();
        const {
            salesPackages,
            goToPreviousStep
        } = this.props;

        return (
            <div className="step-content">
                <div className="buttons">
                    <div className={"buttons-container"} style={{ justifyContent: 'flex-start'}}>
                        <button className="light-blue-button" onClick={goToPreviousStep}>
                            <i className="fa fa-chevron-left"/> Edit
                        </button>
                    </div>
                </div>
                <div className="step-title">Review & Sign</div>
                <div className="step-content-container">

                    <ContentListing {...this.props} />

                    <SalesPackageForm
                        hideButtons
                        salesPackages={salesPackages}
                        onAdd={this.addSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage}
                        onRemoveAll={this.removeAllSalesPackage}/>

                    <div className="buttons-container" >
                        <button id="draft-listing" className="standard-button" style={{ width: '250px'}}>
                            View License Agreement
                        </button>
                    </div>

                    <div className={"terms-confirm"}>
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <input
                                type="checkbox"
                                value={this.state.terms}
                                onChange={(e)=>{
                                    this.setState({terms: e.target.checked})
                                }}
                                id="terms"/>
                            <label htmlFor="terms"></label>
                            I confirm that I have verified the terms stated above. They are correct and ready to be
                            published.
                        </div>
                        <div style={{display: 'flex', marginBottom: 10}}>
                            <input
                                type="checkbox"
                                value={this.state.terms_arena}
                                onChange={(e)=>{
                                    this.setState({terms_arena: e.target.checked})
                                }}
                                id="terms_arena"/>
                            <label htmlFor="terms_arena"></label>
                            I confirm that I have verified the terms and conditions that have been outlined by
                            Content Arena Pte. Ltd.
                        </div>
                    </div>

                </div>
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
        updateSalesPackages : (index, salesPackage, name) => dispatch({
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