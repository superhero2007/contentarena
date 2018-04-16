import React from 'react';
import { connect } from "react-redux";

const SellFormStep = ({step, active, title}) => (
    <div  className={"step " + (active && "step-active") }>
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
                {step: 3, title: "Distribution style"},
                {step: 4, title: "Price, payment and listing details"},
                {step: 5, title: "Confirm"}
            ]
        };
    }

    render() {
        let _this = this;
        return (
            <div className="box-header">
                { this.state.steps.map((step, i)=>{
                    return <SellFormStep key={i} step={step.step} title={step.title} active={_this.props.step === step.step}/>
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        step : state.listingInfo.step,
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormSteps)