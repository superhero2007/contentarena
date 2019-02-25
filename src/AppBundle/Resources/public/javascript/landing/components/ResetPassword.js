import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../common/components/Loader";
import PasswordValidationBox from "../../main/components/PasswordValidationBox";
import { showSuccessResetPass } from "../actions/landingActions";
import { LOGIN_VIEW_TYPE } from "@constants";

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      resetToken: "",
      password: "",
      passwordCheck: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;

    if (params && params.resetToken) {
      this.setState({ resetToken: params.resetToken });
      this.newPass.focus();
    } else {
      this.props.history.push("/login");
    }
  }

    handleSubmitChangePassword = () => {
      const { isLoading, password, resetToken } = this.state;
      if (isLoading) return;

      this.setState({ isLoading: true });
      ContentArena.Api.resetPassword(password, resetToken)
        .then(({ data }) => {
          if (data.success) {
            this.props.showSuccessResetPass();
            this.props.history.push("/login");
          }
        })
        .catch(({ response }) => {
          this.setState({ error: response.data.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    };

    handleEnterPress = (event) => {
      if (event.key === "Enter") {
        this.handleSubmitChangePassword();
      }
    };

    handleChangePassword = (e) => {
      this.setState({
        error: "",
        password: e.target.value,
      });
    };

    handleChangePasswordCheck = (e) => {
      this.setState({
        error: "",
        passwordCheck: e.target.value,
      });
    };

    handlePasswordValid = isValid => this.setState({ isPassValid: isValid });

    render() {
      const { password, passwordCheck, isPassValid } = this.state;
      return (
        <section className="reset-wrapper" onKeyPress={this.handleEnterPress}>
          <h3>{this.context.t("RESET_PASSWORD_TITLE")}</h3>

          {this.state.error && <span className="sign-error">{this.state.error}</span>}
          <div className="password">
            <label htmlFor="password">{this.context.t("RESET_NEW_PASSWORD")}</label>
            <input
              ref={password => this.newPass = password}
              type="password"
              id="password"
              onChange={e => this.handleChangePassword(e)}
              required="required"
            />
          </div>
          <div className="repeat-password">
            <label htmlFor="repeat-password">{this.context.t("RESET_REPEAT_PASSWORD")}</label>
            <input
              type="password"
              id="repeat-password"
              onChange={e => this.handleChangePasswordCheck(e)}
              required="required"
            />
          </div>

          <PasswordValidationBox
            password={password}
            passwordCheck={passwordCheck}
            onPasswordValid={this.handlePasswordValid}
          />

          <span className="note">
            <b>**Note: </b>
            {this.context.t("RESET_PASSWORD_NOTE")}
          </span>

          <button className="yellow-btn" onClick={this.handleSubmitChangePassword} disabled={!isPassValid}>
            {this.context.t("RESET_PASSWORD_BUTTON")}
            {this.state.isLoading && <Loader loading xSmall /> }
          </button>
        </section>
      );
    }
}

ResetPassword.contextTypes = {
  t: PropTypes.func.isRequired,
};

ResetPassword.propsType = {
  onViewUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ landing }) => landing;

const mapDispatchToProps = dispatch => ({
  showSuccessResetPass: () => dispatch(showSuccessResetPass()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
