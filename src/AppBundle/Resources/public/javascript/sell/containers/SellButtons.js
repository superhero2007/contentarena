import React from 'react';
import {connect} from 'react-redux';
import store from '../store';

class SellButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            lastStep : props.lastStep || 5,
            saving : false,
            savingSuccess: false
        };
    }

    saveAsDraft = () => {
        let _this = this;
        _this.setState({ saving : true });
        ContentArena.ContentApi.saveContentAsDraft(store.getState().content).done(function ( response ) {
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
                    { this.props.step !== 1 &&
                    <button className="standard-button"
                            onClick={ this.props.goToPreviousStep }>
                        <i className="fa fa-arrow-left"/> Back
                    </button> }

                    <button className="standard-button" onClick={ this.saveAsDraft } disabled={this.state.saving}>
                        { saveAsDraftText }{ this.state.saving && <i className="fa fa-cog fa-spin"/>}
                    </button>

                    { this.props.step === this.state.lastStep &&
                    <button id="draft-listing" className="standard-button">
                        Submit Listing
                    </button> }

                    { this.props.step !== this.state.lastStep &&
                    <button id="next-step" className="standard-button" onClick={ () => this.props.goToNextStep() }>
                        Next <i className="fa fa-arrow-right"/>
                    </button> }
                </div>
                {/*<div className="buttons-container" >
                    {
                        [1,2,3,4,5].map((v,k)=>(
                            <div className={"step " + ((this.props.step === v) ? "step-active" : "")} key={k}>{v}</div>
                        ))
                    }
                </div>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        step : state.content.step
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goToNextStep : () => dispatch({
            type : 'GO_TO_NEXT_STEP'
        }),

        goToPreviousStep : () => dispatch({
            type : 'GO_TO_PREVIOUS_STEP'
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellButtons)
