import React, { Component } from "react";
import PropTypes from "prop-types";
import { blueCheckIcon, cancelIcon } from "./Icons";

class PasswordValidationBox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { onPasswordValid, password, passwordCheck } = this.props;
    if (nextProps.password !== password || nextProps.passwordCheck !== passwordCheck) {
      const isValid = this.isPasswordValid(nextProps.password, nextProps.passwordCheck);
      onPasswordValid(isValid);
    }
  }

    validate = pass => ({
      passlength: (pass.length >= 8),
      digit: /\d/.test(pass),
      upper: /[A-Z]/.test(pass),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
    });

    isPasswordValid = (password, passwordCheck) => {
      if (!password || !passwordCheck) return false;

      const validate = this.validate(password);
      return password === passwordCheck
            && validate.passlength
            && validate.digit
            && validate.upper
            && validate.special;
    };

    render() {
      const { password, passwordCheck } = this.props;
      return (
        <div className="password-validation">
          <div>
            <img src={this.validate(password).passlength ? blueCheckIcon : cancelIcon} />
            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_1")}
          </div>
          <div>
            <img src={this.validate(password).upper ? blueCheckIcon : cancelIcon} />
            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_2")}
          </div>
          <div>
            <img src={this.validate(password).digit ? blueCheckIcon : cancelIcon} />
            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_3")}
          </div>
          <div>
            <img src={this.validate(password).special ? blueCheckIcon : cancelIcon} />
            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_4")}
          </div>
          {passwordCheck && (
          <div>
            <img src={passwordCheck === password ? blueCheckIcon : cancelIcon} />
            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_5")}
          </div>
          )}
        </div>
      );
    }
}

PasswordValidationBox.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default PasswordValidationBox;
