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
            visited : [1],
            finished: []
        };
    }

    componentWillReceiveProps ( props ) {

        if ( this.state.visited.indexOf(props.step) === -1 ){
            this.setState({
                visited : [...this.state.visited, props.step],
                finished: [...this.state.visited, props.step - 1]
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
                    const stepVisited = this.state.visited.indexOf(step.step) !== -1;
                    const stepFinished = this.state.finished.indexOf(step.step) !== -1;

                    return <SellFormStep
                        key={i}
                        stepVisited={stepVisited}
                        stepFinished={stepFinished}
                        onClick={this.onClick}
                        step={step.step}
                        title={step.title} active={_this.props.step === step.step}/>
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