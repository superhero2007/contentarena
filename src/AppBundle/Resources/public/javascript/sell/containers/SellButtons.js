import React from 'react';
import {connect} from 'react-redux';
import store from '../store';
import {goToPreviousStep, goToNextStep, updateContentValue, goToStep} from "../actions/contentActions";
import {companyIsValid, programIsValid, programsEnabled} from "../actions/validationActions";
import ReactTooltip from 'react-tooltip'
import {parseSeasons} from "../../main/actions/utils";

class SellButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lastStep : props.lastStep || 4,
            saving : false,
            savingSuccess: false,
            visited : [1]
        };
    }

    componentWillReceiveProps ( props ) {

        if ( this.state.visited.indexOf(props.step) === -1 ){
            this.setState({
                visited : [...this.state.visited, props.step]
            })
        }
        ReactTooltip.rebuild()
    }

    saveAsDraft = () => {
        let _this = this;
        _this.setState({ saving : true });

        let content = store.getState().content;
        content = parseSeasons(content);
        ContentArena.ContentApi.saveContentAsDraft(content).done(function ( response ) {

            if ( response.success && response.contentId ){
                _this.props.updateContentValue("id", response.contentId);
            }

            _this.setState({ saving : false, savingSuccess: true });
        }).fail(function () {
            _this.setState({ saving : false, savingSuccess: false });
        });
    };

    /**
     * if currency selected, listing image inserted, expiry date selected, sales bundles added,
     * company address complete, place of jurisdiction selected and if vat = yes, percentage is inserted
     * @returns {boolean}
     */
    reviewAndSignEnabled = () =>{

        const {expiresAt, vat, vatPercentage, salesPackages, company} = this.props;

        return expiresAt
            && ( vat === "no" || (vatPercentage && vatPercentage != 0 && vatPercentage !== "") )
            && salesPackages.length > 0
            && companyIsValid(company);

    };

    reviewAndSignGetMessages = () => {
        const {expiresAt, vat, vatPercentage, salesPackages, company} = this.props;
        let message = "Please complete missing information\n";

        if ( salesPackages.length === 0 ) message += "<br/>- Select at least one sales bundle.\n";
        if ( !expiresAt ) message += "<br/>- Select listing expiry.";
        if ( !companyIsValid(company) ) message += "<br/>- Enter company information.";

        if ( vat === "yes" && (!vatPercentage || vatPercentage === 0 || vatPercentage === "") ) message += "<br/>- Enter VAT percentage.";

        return message;
    };

    step2Enabled = () => {
        const {endDateMode, rightsPackage, programs} = this.props;

        let program = true;
        if ( programsEnabled(rightsPackage) ) program = programIsValid(programs[0]);

        return endDateMode !== undefined && rightsPackage.length > 0 && program;

    };

    step1Enabled = () => {
        const {sports, name} = this.props;
        return sports.length > 0 && name !== undefined && name !== "";
    };

    step1GetMessages = () => {
        const {sports, name} = this.props;
        let message = "Please complete missing information\n";

        if ( sports.length === 0 ) message += "<br/>- Select a sport.\n";
        if ( name === undefined || name === "" ) message += "<br/>- Enter a name for the listing.";

        return message;
    };

    step2GetMessages = () => {
        const {endDateMode, rightsPackage, programs} = this.props;
        let message = "Please complete missing information\n";
        let program = true;
        if ( programsEnabled(rightsPackage) ) program = programIsValid(programs[0]);

        if ( rightsPackage.length === 0 ) message += "<br/>- Select at least one right.\n";
        if ( endDateMode === undefined ) message += "<br/>- Select when the license period ends.";
        if ( !program ) message += "<br/>- Enter program information.";

        return message;
    };

    getTooltipMessages = () => {
        const {step} = this.props;

        if ( step === 1 && !this.step1Enabled()) return this.step1GetMessages();
        if ( step === 2 && !this.step2Enabled()) return this.step2GetMessages();
        if ( step === 3 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
    };

    getReviewButtonTooltipMessages = () => {
        const {step} = this.props;

        if ( step === 3 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
    };

    onClickStep = (stepSelected) => {
        const {goToStep, step} = this.props;
        if ( this.state.visited.indexOf(stepSelected) !== -1 && step !== stepSelected ) goToStep(stepSelected);

    };

    goToReviewAndSign = () => {
        const {updateContentValue} = this.props;
        let content = store.getState().content;
        content = parseSeasons(content);
        ContentArena.ContentApi.saveContentAsInactive(content).done(function ( response ) {

            if ( response.success && response.contentId ){
                updateContentValue("id", response.contentId);
            }
        });
        this.props.goToNextStep();
    };

    render() {

        let saveAsDraftText = (this.state.saving) ? "Saving.." : (this.state.savingSuccess) ? "Saved as Draft" : "Save as Draft";

        const {terms, terms_arena, signature, step} = this.props;

        return (
            <div className="buttons">
                <div className="buttons-container"  >

                    { this.props.sports.length > 0 && step !== 4 &&
                    <button className="light-blue-button" onClick={ this.saveAsDraft } disabled={this.state.saving}>
                        { saveAsDraftText }{ this.state.saving && <i className="fa fa-cog fa-spin"/>}
                    </button> }

                    { step === 3 && this.reviewAndSignEnabled() &&
                    <button id="draft-listing" className="standard-button" onClick={this.goToReviewAndSign  }>
                        Review and sign
                    </button> }

                    { this.props.step === 3 && !this.reviewAndSignEnabled() &&
                        <div data-tip={this.getReviewButtonTooltipMessages()}>
                            <button id="draft-listing" className="standard-button" disabled>
                                Review and sign
                            </button>
                        </div>}

                </div>
                { this.props.step < 4 && <div className="buttons-container" >
                    { this.props.step !== 1 &&
                    <button className="standard-button"
                            onClick={ this.props.goToPreviousStep }>
                        <i className="fa fa-arrow-left"/> Back
                    </button> }
                    {
                        [1,2,3].map((v,k)=>(
                            <div className={"step " + ((this.props.step === v) ? "step-active" : "")}
                                 onClick={() => {this.onClickStep(v)}}
                                 key={k}>{v}</div>
                        ))
                    }
                    { this.props.step !== this.state.lastStep -1 &&
                        <div data-tip={this.getTooltipMessages()}>
                            <button
                                id="next-step"
                                className="standard-button"
                                disabled={
                                    ( step===1 && !this.step1Enabled()) ||
                                    ( step===2 && !this.step2Enabled())
                                }
                                onClick={ () => this.props.goToNextStep() }>
                                    Next <i className="fa fa-arrow-right"/>
                            </button>
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
        goToPreviousStep : () => dispatch(goToPreviousStep()),
        goToNextStep : () => dispatch(goToNextStep()),
        goToStep : (step) => dispatch(goToStep(step)),
        updateContentValue : (key,value) => dispatch(updateContentValue(key,value))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellButtons)
