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
        ContentArena.ContentApi.saveContentAsDraft(store.getState().content).done(function ( response ) {

            if ( response.success && response.contentId ){
                _this.props.updateContentValue("id", response.contentId);
            }

            _this.setState({ saving : false, savingSuccess: true });
        }).fail(function () {
            _this.setState({ saving : false, savingSuccess: false });
        });
    };

    render() {

        let saveAsDraftText = (this.state.saving) ? "Saving.." : (this.state.savingSuccess) ? "Saved as Draft" : "Save as Draft";

        return (
            <div className="buttons">
                <div className="buttons-container" >

                    { this.props.sports.length > 0 &&
                    <button className="light-blue-button" onClick={ this.saveAsDraft } disabled={this.state.saving}>
                        { saveAsDraftText }{ this.state.saving && <i className="fa fa-cog fa-spin"/>}
                    </button> }

                    { this.props.step === 3 &&
                    <button id="draft-listing" className="standard-button" onClick={this.props.goToNextStep }>
                        Review and sign
                    </button> }

                    { this.props.step === this.state.lastStep &&
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
                            ( this.props.step===1 && this.props.sports.length === 0) ||
                            ( this.props.step===2 && this.props.rightsPackage.length === 0)
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
    return {
        step : state.content.step,
        sports : state.content.sports,
        rightsPackage : state.content.rightsPackage
    }
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
