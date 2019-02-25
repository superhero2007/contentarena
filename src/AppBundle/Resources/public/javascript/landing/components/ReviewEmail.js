import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ReviewEmail extends PureComponent {
  render() {
    return (
      <section className="review-wrapper">
        <h3>{this.context.t("LOGIN_REVIEW_EMAIL")}</h3>
        <b>{this.context.t("LOGIN_REVIEW_EMAIL_SUB_TITLE")}</b>
        <span className="note">
          <b>**Note: </b>
          {this.context.t("LOGIN_REVIEW_EMAIL_NOTE")}
        </span>
      </section>
    );
  }
}

ReviewEmail.contextTypes = {
  t: PropTypes.func.isRequired,
};

ReviewEmail.propsType = {
  onViewUpdate: PropTypes.func.isRequired,
};

export default ReviewEmail;
