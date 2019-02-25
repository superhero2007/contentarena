import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class ListingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    updateName = (e) => {
      const { onChange } = this.props;

      if (onChange) {
        onChange();
      }

      this.props.updateContentValue("name", e.target.value);
    };

    render() {
      const { name, validation } = this.props;
      const isInvalid = !name && validation;
      return (
        <div className="base-input">
          <label>
            {this.context.t("CL_STEP1_LISTING_NAME")}
          </label>
          <input
            type="text"
            value={name}
            onChange={this.updateName}
            placeholder={isInvalid ? this.context.t("LISTING_NAME_EMPTY") : ""}
            className={isInvalid ? "is-invalid" : ""}
            maxLength={70}
          />
        </div>
      );
    }
}

ListingName.contextTypes = {
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
)(ListingName);
