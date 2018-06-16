import React from 'react';
import {connect} from 'react-redux';
import store from '../store';
import {goToPreviousStep, goToNextStep, updateContentValue} from "../actions/contentActions";

class SellButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lastStep : props.lastStep || 4,
            saving : false,
            savingSuccess: false
        };
    }

    saveAsDraft = () => {
        let _this = this;
        _this.setState({ saving : true });

        let content = store.getState().content;

        content.seasons.forEach((season)=>{
            season.selectedSchedules = {};
            Object.entries( season.schedules).filter((round) =>{  return round[1].selected} ).map((round)=>{
                if (!season.selectedSchedules[round[0]]) season.selectedSchedules[round[0]] = {matches:[]};
                if(round[1].selected){
                    Array.from(round[1].matches.values()).filter(match => match.selected).forEach((match)=>{
                        season.selectedSchedules[round[0]].matches.push(match)

                    })
                }
            })
        });

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

        const {expiresAt, vat, vatPercentage, salesPackages} = this.props;

        return expiresAt
            && ( vat === "no" || (vatPercentage && vatPercentage != 0 && vatPercentage !== "") )
            && salesPackages.length > 0;

    };

    step2Enabled = () => {
        const {endDateMode} = this.props;
        return endDateMode !== undefined;
    };

    step1Enabled = () => {
        const {sports, name} = this.props;
        return sports.length > 0 && name !== undefined && name !== "";
    };

    render() {

        let saveAsDraftText = (this.state.saving) ? "Saving.." : (this.state.savingSuccess) ? "Saved as Draft" : "Save as Draft";

        const {terms, terms_arena} = this.props;

        return (
            <div className="buttons">
                <div className="buttons-container" >

                    { this.props.sports.length > 0 &&
                    <button className="light-blue-button" onClick={ this.saveAsDraft } disabled={this.state.saving}>
                        { saveAsDraftText }{ this.state.saving && <i className="fa fa-cog fa-spin"/>}
                    </button> }

                    { this.props.step === 3 && this.reviewAndSignEnabled() &&
                    <button id="draft-listing" className="standard-button" onClick={this.props.goToNextStep }>
                        Review and sign
                    </button> }

                    { this.props.step === 3 && !this.reviewAndSignEnabled() &&
                    <button id="draft-listing" className="standard-button" disabled>
                        Review and sign
                    </button> }

                    { this.props.step === this.state.lastStep && terms && terms_arena &&
                    <button id="draft-listing" className="standard-button">
                        Submit Listing
                    </button> }

                </div>
                { this.props.step < 4 && <div className="buttons-container" >
                    { this.props.step !== 1 &&
                    <button className="standard-button"
                            onClick={ this.props.goToPreviousStep }>
                        <i className="fa fa-arrow-left"/> Back
                    </button> }
                    {
                        [1,2,3].map((v,k)=>(
                            <div className={"step " + ((this.props.step === v) ? "step-active" : "")} key={k}>{v}</div>
                        ))
                    }
                    { this.props.step !== this.state.lastStep -1 &&
                    <button
                        id="next-step"
                        className="standard-button"
                        disabled={
                            ( this.props.step===1 && !this.step1Enabled()) ||
                            ( this.props.step===2 && !this.step2Enabled())
                        }
                        onClick={ () => this.props.goToNextStep() }>
                            Next <i className="fa fa-arrow-right"/>
                    </button> }
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
        updateContentValue : (key,value) => dispatch(updateContentValue(key,value))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellButtons)
