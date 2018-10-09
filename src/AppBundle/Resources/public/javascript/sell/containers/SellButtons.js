import React from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import store from '../../main/store';
import {updateContentValue, goToStep} from "../actions/contentActions";
import {companyIsValid} from "../actions/validationActions";
import ReactTooltip from 'react-tooltip'
import {editedProgramSelected, parseSeasons} from "../../main/actions/utils";
import {PropTypes} from 'prop-types';

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
        const {history, goToStep} = this.props;
        this.setState({ saving : true });

        let content = store.getState().content;
        content = parseSeasons(content);
        ContentArena.ContentApi.saveContentAsDraft(content).done((response)=>{

            let nextStep = (Number(content.step) + 1);

            if ( response.success && response.contentId ){
                this.props.updateContentValue("id", response.contentId);
                this.props.updateContentValue("customId", response.customId);
            }

            this.setState({ saving : false, savingSuccess: true });

            history.push("/contentlisting/"+ response.customId + "/" + nextStep);
            goToStep(nextStep);

        }).fail(() =>{
            this.setState({ saving : false, savingSuccess: false });
            //history.push("/contentlisting/"+ response.customId + "/" + nextStep);
        });
    };

    /**
     * if currency selected, listing image inserted, expiry date selected, sales bundles added,
     * company address complete, place of jurisdiction selected and if vat = yes, percentage is inserted
     * @returns {boolean}
     */
    reviewAndSignEnabled = () =>{

        const {expiresAt, vat, vatPercentage, salesPackages, company, name, law} = this.props;

        return expiresAt
            && ( vat === "no" || (vatPercentage && vatPercentage != 0 && vatPercentage !== "") )
            && law !== null
            && salesPackages.length > 0
            && companyIsValid(company);

    };

    reviewAndSignGetMessages = () => {
        const {expiresAt, vat, vatPercentage, salesPackages, company, law} = this.props;
        let message = "Please complete missing information\n";

        if ( salesPackages.length === 0 ) message += "<br/>- Select at least one sales bundle.\n";
        if ( !expiresAt ) message += "<br/>- Select listing expiry.";
        if ( !companyIsValid(company) ) message += "<br/>- Enter company information.";
        if ( law === null) message += "<br/>- Select application law";

        if ( vat === "yes" && (!vatPercentage || vatPercentage === 0 || vatPercentage === "") ) message += "<br/>- Enter VAT percentage.";

        return message;
    };

    programIsValid = () => {
        const {
            rightsPackage,
            PROGRAM_NAME,
            PROGRAM_EPISODES,
            PROGRAM_DURATION,
            PROGRAM_TYPE,
            PROGRAM_DESCRIPTION,
            EDIT_PROGRAM_DESCRIPTION_OPTIONAL,
        } = this.props;

        let program = editedProgramSelected(rightsPackage);
        if (!program) return true;

        let editProgramDescriptionValidation = EDIT_PROGRAM_DESCRIPTION_OPTIONAL || PROGRAM_DESCRIPTION;

        return PROGRAM_NAME && PROGRAM_NAME !== "" &&
            PROGRAM_EPISODES && PROGRAM_EPISODES !== "" &&
            PROGRAM_DURATION && PROGRAM_DURATION !== "" &&
            PROGRAM_TYPE !== "SELECT" &&
            editProgramDescriptionValidation;
    };

    step2Enabled = () => {
        const {rightsPackage, programDescription} = this.props;
        let program = this.programIsValid();
        console.log(program);
        return rightsPackage.length > 0 && program && programDescription && programDescription.length >= MIN_PROGRAM_DESC_LENGTH;
    };

    step3Enabled = () => {
        const {endDateMode, contentDeliveryConfigured, tempData} = this.props;

        if (tempData.CONTENT_DELIVERY_SHOULD_BE_CONFIGURED && !contentDeliveryConfigured) {
            return false;
        }

        return endDateMode !== undefined;
    };

    step3GetMessages = () => {
        const {endDateMode, tempData, contentDeliveryConfigured} = this.props;
        let message = "Please complete missing information\n";
        if ( endDateMode === undefined ) message += "<br/>- Select when the license period ends.";

        if (tempData.CONTENT_DELIVERY_SHOULD_BE_CONFIGURED && !contentDeliveryConfigured) {
            message += "<br/>- Content Delivery must be configured first.";
        }

        return message;
    };

    step1Enabled = () => {
        const {sports, name} = this.props;
        return sports.length > 0 && name && name !== "";
    };

    step1GetMessages = () => {
        const {sports, name} = this.props;
        let message = "Please complete missing information\n";

        if ( sports.length === 0 ) message += "<br/>- Select a sport.\n";
        if ( !name || name === "") message += "<br/>- Enter a name for the listing.";

        return message;
    };

    step2GetMessages = () => {
        const {programDescription, rightsPackage} = this.props;
        let message = "Please complete missing information\n";
        let program = this.programIsValid();;
        if ( rightsPackage.length === 0 ) message += "<br/>- Select at least one right.\n";
        if ( !programDescription || programDescription.length < MIN_PROGRAM_DESC_LENGTH ) message += "<br/>- Program description must be at least " + MIN_PROGRAM_DESC_LENGTH + " characters length";
        if ( !program ) message += "<br/>-  Enter program information.";

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
        const { maxStep } = this.props;

        if (stepSelected <= maxStep) {
            this.goToStep(stepSelected);
        }
    };

    goToReviewAndSign = () => {
        const {history, goToStep} = this.props;
        let savePromise = null;
        let content = store.getState().content;
        content = parseSeasons(content);
        this.setState({ saving : true });

        if (!content.status || (content.status.name === 'DRAFT' && content.step === 4)) {
            //we are in new mode or editing draft
            savePromise = ContentArena.ContentApi.saveContentAsInactive({...content, ...{ status: 'AUTO_INACTIVE' }});
        } else {
            savePromise = ContentArena.ContentApi.saveContentAsDraft(content);
        }

        savePromise.done((response)=>{
            if ( response.success && response.contentId ){

                if ( response.salesPackages && Array.isArray(response.salesPackages) ){
                    response.salesPackages.forEach((sp, i)=>{

                        if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
                        if (sp.excludedCountries) sp.excludedTerritories = sp.excludedCountries.map(t=>{return{label:t.name, value:t.name}})
                        if (sp.territories) sp.territories = sp.territories.map(t=>{return{label:t.name, value:t.name}});

                        this.props.updateSalesPackages("save", sp, i);
                    });
                }

                this.props.updateContentValue("id", response.contentId);
                this.setState({ saving : false, savingSuccess: true });
                history.push("/contentlisting/"+ response.customId + "/sign");
                goToStep(5);
            }
        });
    };

    goToPreviousStep = () => {
        const {history, goToStep} = this.props;
        let content = store.getState().content;
        let prevStep = (Number(content.step) - 1);

        history.push("/contentlisting/"+ content.customId + "/" + prevStep);
        goToStep(prevStep);
    };

    goToStep = (step) => {
        const {history, goToStep} = this.props;
        let content = store.getState().content;
        history.push("/contentlisting/"+ content.customId + "/" + step);
        goToStep(step);
    };

    render() {
        const { step, maxStep } = this.props;
        const { lastStep, saving } = this.state;
        const cantReviewAndSign = (step === 4 && !this.reviewAndSignEnabled());

        return (
            <div className="buttons">
                { this.props.step < lastStep && <div className="buttons-container step-1 step-2" >
                    { this.props.step !== 1 &&
                    <button className="standard-button prev"
                            onClick={ this.goToPreviousStep }>
                        <i className="fa fa-arrow-left"/> {this.context.t("Back")}
                    </button> }
                    {
                        [1,2,3,4].map((v,k)=>(
                            <div className={cn("step", { 'step-active': this.props.step === v, 'step-visited': v <= maxStep})}
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
                                {this.context.t("Next")}
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

SellButtons.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        goToStep : (step) => dispatch(goToStep(step)),
        updateContentValue : (key,value) => dispatch(updateContentValue(key,value)),
        updateSalesPackages : (name, salesPackage, index) => dispatch({
            type: 'UPDATE_SALES_PACKAGES',
            index: index,
            salesPackage : salesPackage,
            name: name
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellButtons)
