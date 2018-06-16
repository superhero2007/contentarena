import React from 'react';
import { connect } from "react-redux";
import {goToPreviousStep, goToStep} from "../actions/contentActions";

const SellFormStep = ({step, active, title, onClick}) => (
    <div  className={"step " + (active && "step-active") } onClick={() => {onClick(step)}}>
        <div className="step-label">
            Step { step }
        </div>
        <div className="step-title">
            {title}
        </div>
        <div className="step-icon"></div>
    </div>
);

class SellFormSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                {step: 1, title: "Event selection"},
                {step: 2, title: "Configure rights"},
                {step: 3, title: "Pricing & listing details"}
            ],
            visited : [1]
        };
    }

    componentWillReceiveProps ( props ) {

        if ( this.state.visited.indexOf(props.step) === -1 ){
            this.setState({
                visited : [...this.state.visited, props.step]
            })
        }
    }

    onClick = (stepSelected) => {
        const {goToStep} = this.props;
        if ( this.state.visited.indexOf(stepSelected) !== -1 ) goToStep(stepSelected);

    };

    render() {
        let _this = this;
        return (
            <div className="box-header">
                { this.state.steps.map((step, i)=>{
                    return <SellFormStep
                        key={i}
                        onClick={this.onClick}
                        step={step.step}
                        title={step.title} active={_this.props.step === step.step}/>
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        step : state.content.step,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        goToStep : (step) => dispatch(goToStep(step)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormSteps)