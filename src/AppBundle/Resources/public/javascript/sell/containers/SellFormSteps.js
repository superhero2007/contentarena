import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { PropTypes } from "prop-types";
import { goToPreviousStep, goToStep } from "../actions/contentActions";

const SellFormStep = ({
  step, active, title, onClick, stepVisited, stepFinished,
}) => (
  <div className={cn("step", { "step-active": active, visited: stepVisited, finished: stepFinished })} onClick={() => { onClick(step); }}>
    <div className="step-title">
      <b>
Step
        { step }
      </b>
      {" "}
-
      {title}
    </div>
  </div>
);

class SellFormSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
    };
  }

  componentDidMount() {
    this.setState({
      steps: [
        { step: 1, title: this.context.t("CL_STEP_EVENT_SECTION") },
        { step: 2, title: this.context.t("CL_STEP_PROGRAM_RIGHT_SELECTION") },
        { step: 3, title: this.context.t("CL_STEP_GRANT_OF_RIGHT") },
        { step: 4, title: this.context.t("CL_STEP_COMMERCIAL_DETAILS") },
        { step: 5, title: this.context.t("CL_STEP_REVIEW_AND_SIGN") },
      ],
    });
  }

    onClick = (stepSelected) => {
      const {
        goToStep, customId, history, maxStep,
      } = this.props;

      if (stepSelected <= maxStep) {
        goToStep(stepSelected);
        history.push(`/contentlisting/${customId}/${stepSelected}`);
      }
    };

    render() {
      const { maxStep, step } = this.props;

      return (
        <div className="box-header">
          { this.state.steps.map((stepItem, i) => (
            <SellFormStep
              key={i}
              active={step === stepItem.step}
              stepVisited={stepItem.step <= maxStep}
              stepFinished={stepItem.step < maxStep}
              onClick={this.onClick}
              step={stepItem.step}
              title={stepItem.title}
            />
          ))}
        </div>
      );
    }
}

SellFormSteps.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  step: state.content.step,
  maxStep: state.content.maxStep,
  customId: state.content.customId,
});

const mapDispatchToProps = dispatch => ({
  goToStep: step => dispatch(goToStep(step)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellFormSteps);
