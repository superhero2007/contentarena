import React from 'react';
import { connect } from "react-redux";
import cn from "classnames";
import {goToPreviousStep, goToStep} from "../actions/contentActions";
import {PropTypes} from "prop-types";

const SellFormStep = ({step, active, title, onClick, stepVisited, stepFinished}) => (
    <div  className={cn("step", {"step-active" : active, "visited": stepVisited, "finished": stepFinished})} onClick={() => {onClick(step)}}>
        <div className="step-label">
            Step { step }
        </div>
        <div className="step-title">
            {title}
        </div>
        <div className="step-icon">
            <i className="fa fa-check"/>
            <i className="fa fa-ellipsis-h"/>
        </div>
    </div>
);

class SellFormSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                {step: 1, title: "Event selection"},
                {step: 2, title: "Program & Rights Selection"},
                {step: 3, title: "Grant of Rights & Production Details"},
                {step: 4, title: "Commercial Details"}
            ],
            maxStep: this.props.step || 1
        };
    }

    componentWillReceiveProps(nextProps) {
        const { maxStep } = this.state;

        if (maxStep < nextProps.step) {
            this.setState({
                maxStep: nextProps.step
            });
        }
    }

    onClick = (stepSelected) => {
        const { goToStep, customId, history } = this.props;
        const { maxStep } = this.state;
        
        if (stepSelected <= maxStep) {
            goToStep(stepSelected);
            history.push(`/contentlisting/${customId}/${stepSelected}`);
        }
    };

    render() {
        const currentStep = this.props.step;
        const { maxStep } = this.state;
        
        return (
            <div className="box-header">
                { this.state.steps.map((step, i)=>{
                    return <SellFormStep
                        key={i}
                        active={currentStep === step.step}
                        stepVisited={step.step <= maxStep}
                        stepFinished={step.step < maxStep}
                        onClick={this.onClick}
                        step={step.step}
                        title={step.title}
                    />
                })}
            </div>
        );
    }
}

SellFormSteps.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        step : state.content.step,
        customId : state.content.customId,
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