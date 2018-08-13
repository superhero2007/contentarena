import React from 'react';
import {connect} from 'react-redux';
import store from '../store';
import {goToPreviousStep, goToNextStep, updateContentValue, goToStep} from "../actions/contentActions";
import {companyIsValid} from "../actions/validationActions";
import ReactTooltip from 'react-tooltip'
import {editedProgramSelected, historyGoTo, parseSeasons} from "../../main/actions/utils";

const MIN_PROGRAM_DESC_LENGTH = 30;

class SellButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lastStep : props.lastStep || 5,
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

    saveAndGoNext = () => {
        this.setState({ saving : true });

        let content = store.getState().content;
        content = parseSeasons(content);
        ContentArena.ContentApi.saveContentAsDraft(content).done((response)=>{

            if ( response.success && response.contentId ){
                this.props.updateContentValue("id", response.contentId);
            }

            this.setState({ saving : false, savingSuccess: true });
            this.props.goToNextStep();
        }).fail(() =>{
            this.setState({ saving : false, savingSuccess: false });
            this.props.goToNextStep();
        });
    };

    /**
     * if currency selected, listing image inserted, expiry date selected, sales bundles added,
     * company address complete, place of jurisdiction selected and if vat = yes, percentage is inserted
     * @returns {boolean}
     */
    reviewAndSignEnabled = () =>{

        const {expiresAt, vat, vatPercentage, salesPackages, company, name} = this.props;

        return expiresAt
            && ( vat === "no" || (vatPercentage && vatPercentage != 0 && vatPercentage !== "") )
            && salesPackages.length > 0
            && name
            && name !== ""
            && companyIsValid(company);

    };

    reviewAndSignGetMessages = () => {
        const {expiresAt, vat, vatPercentage, salesPackages, company, name} = this.props;
        let message = "Please complete missing information\n";

        if ( salesPackages.length === 0 ) message += "<br/>- Select at least one sales bundle.\n";
        if ( !expiresAt ) message += "<br/>- Select listing expiry.";
        if ( !companyIsValid(company) ) message += "<br/>- Enter company information.";
        if ( !name || name === "") message += "<br/>- Enter a name for the listing.";

        if ( vat === "yes" && (!vatPercentage || vatPercentage === 0 || vatPercentage === "") ) message += "<br/>- Enter VAT percentage.";

        return message;
    };

    programIsValid = () => {
        const {
            rightsPackage,
            PROGRAM_NAME,
            PROGRAM_EPISODES,
            PROGRAM_DURATION,
            PROGRAM_TYPE
        } = this.props;

        let program = editedProgramSelected(rightsPackage);

        if (!program) return true;

        return PROGRAM_NAME && PROGRAM_NAME !== "" &&
            PROGRAM_EPISODES && PROGRAM_EPISODES !== "" &&
            PROGRAM_DURATION && PROGRAM_DURATION !== "" &&
            PROGRAM_TYPE !== "SELECT"

    };

    step2Enabled = () => {
        const {rightsPackage, programDescription} = this.props;

        let program = this.programIsValid();

        return rightsPackage.length > 0 && program && programDescription && programDescription.length >= MIN_PROGRAM_DESC_LENGTH;

    };

    step3Enabled = () => {
        const {endDateMode} = this.props;
        return endDateMode !== undefined;
    };

    step3GetMessages = () => {

        const {endDateMode} = this.props;
        let message = "Please complete missing information\n";
        if ( endDateMode === undefined ) message += "<br/>- Select when the license period ends.";

        return message;
    };

    step1Enabled = () => {
        const {sports} = this.props;
        return sports.length > 0;
    };

    step1GetMessages = () => {
        const {sports, name} = this.props;
        let message = "Please complete missing information\n";

        if ( sports.length === 0 ) message += "<br/>- Select a sport.\n";
        //if ( name === undefined || name === "" ) message += "<br/>- Enter a name for the listing.";

        return message;
    };

    step2GetMessages = () => {
        const {programDescription, rightsPackage} = this.props;
        let message = "Please complete missing information\n";
        let program = this.programIsValid();;
        if ( rightsPackage.length === 0 ) message += "<br/>- Select at least one right.\n";
        if ( !programDescription || programDescription.length < MIN_PROGRAM_DESC_LENGTH ) message += "<br/>- Program description must be at least " + MIN_PROGRAM_DESC_LENGTH + " characters length";
        if ( !program ) message += "<br/>- Enter program information.";

        return message;
    };

    getTooltipMessages = () => {
        const {step} = this.props;

        if ( step === 1 && !this.step1Enabled()) return this.step1GetMessages();
        if ( step === 2 && !this.step2Enabled()) return this.step2GetMessages();
        if ( step === 3 && !this.step3Enabled()) return this.step3GetMessages();
        if ( step === 4 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
    };

    getReviewButtonTooltipMessages = () => {
        const {step} = this.props;

        if ( step === 4 && !this.reviewAndSignEnabled()) return this.reviewAndSignGetMessages();
    };

    onClickStep = (stepSelected) => {
        const {goToStep, step} = this.props;
        if ( this.state.visited.indexOf(stepSelected) !== -1 && step !== stepSelected ) goToStep(stepSelected);

    };

    goToReviewAndSign = () => {
        const {updateContentValue} = this.props;
        let content = store.getState().content;
        content = parseSeasons(content);
        this.setState({ saving : true });

        if (!content.customId) { //if not in edit mode
            ContentArena.ContentApi.saveContentAsInactive(content).done( ( response ) => {
                if ( response.success && response.contentId ){
                    updateContentValue("id", response.contentId);
                    updateContentValue("customId", response.customId);
                }
                this.setState({ saving : false });
                historyGoTo("managelistings/edit/"+response.customId+"/5");
                this.props.goToNextStep();
                // goTo("managelistings/edit/"+response.customId+"/5");
            });
        } else {
            ContentArena.ContentApi.saveContentAsDraft(content).done((response)=>{
                if ( response.success && response.contentId ){
                    this.props.updateContentValue("id", response.contentId);
                }

                this.setState({ saving : false, savingSuccess: true });
                historyGoTo("managelistings/edit/"+response.customId+"/5");
                this.props.goToNextStep();
                // goTo("managelistings/edit/"+response.customId+"/5");
            })
        }
    };

    render() {
        const {step} = this.props;
        const { lastStep, saving } = this.state;
        const cantReviewAndSign = (step === 4 && !this.reviewAndSignEnabled());

        return (
            <div className="buttons">
                { this.props.step < lastStep && <div className="buttons-container step-1 step-2" >
                    { this.props.step !== 1 &&
                    <button className="standard-button prev"
                            onClick={ this.props.goToPreviousStep }>
                        <i className="fa fa-arrow-left"/> Back
                    </button> }
                    {
                        [1,2,3,4].map((v,k)=>(
                            <div className={"step " + ((this.props.step === v) ? "step-active" : "")}
                                 onClick={() => {this.onClickStep(v)}}
                                 key={k}>{v}</div>
                        ))
                    }
                    { <div data-tip={cantReviewAndSign ? this.getReviewButtonTooltipMessages() : this.getTooltipMessages()} >
                            <button
                                id="next-step"
                                className="standard-button"
                                disabled={
                                    ( step === 1 && !this.step1Enabled()) ||
                                    ( step === 2 && !this.step2Enabled()) ||
                                    ( step === 3 && !this.step3Enabled()) ||
                                    ( cantReviewAndSign )
                                }
                                onClick={ () => step === 4 ? this.goToReviewAndSign() : this.saveAndGoNext()}>
                                    Next
                                    {saving ?
                                        <i className="fa fa-cog fa-spin"/> :
                                        <i className="fa fa-arrow-right"/>}
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
