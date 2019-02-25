import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CountrySelector from "../../main/components/CountrySelector";

class ApplicableLaw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    select = (value) => {
      this.props.updateContentValue("law", value);
    };

    render() {
      const { law, validation } = this.props;
      const isInvalid = !law && validation;

      return (
        <div className="base-input">
          <label>
            {this.context.t("CL_STEP4_LABEL_APPLICABLE_LAW")}
          </label>
          <CountrySelector
            value={law}
            multi={false}
            onChange={this.select}
            placeholder={isInvalid ? this.context.t("LAW_EMPTY") : this.context.t("CL_STEP4_PLACEHOLDER_APPLICABLE_LAW")}
            className={isInvalid ? "is-invalid" : ""}
          />
        </div>
      );
    }
}

ApplicableLaw.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.content,
  validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
  updateContentValue: (key, value) => dispatch({
    type: "UPDATE_CONTENT_VALUE",
    key,
    value,
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicableLaw);
