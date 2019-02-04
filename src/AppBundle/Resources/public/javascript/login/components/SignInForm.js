import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE } from "@constants";
import Loader from "../../common/components/Loader";

class SignInForm extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            error: '',
            token: '',
            isLoading: false
        };
    };

    isFieldsInvalid = () => {
        return !this.name.value || !this.pass.value;
    };

    handleSignUpClick = () => {
        if(this.state.isLoading) return;
        this.props.history.push("/registration");
    };
    handleForgotPassClick = () => {
        if(this.state.isLoading) return;
        this.props.onViewUpdate(LOGIN_VIEW_TYPE.RECOVER);
    };
    handleInputChange = () => this.setState({error: ''});
    handleSignIn = () => {
        if(this.state.isLoading) return;
        if (this.isFieldsInvalid()) {
            this.setState({error: this.context.t("SIGN_IN_ERROR")});
            return;
        }
        this.setState({ isLoading: true });

        ContentArena.Api.signInUser(this.name.value, this.pass.value)
            .then(({data}) => {
                if(data.success) {
                    this.props.fakeAuth.authenticate(() => {});
                    window.location.href = 'marketplace';
                }
            })
            .catch(({response}) => {
                this.setState({
                    error: response.data.message,
                    isLoading: false
                });
            });
    };

    render() {
        return (
            <section className="login-wrapper">
                <h3>{this.context.t("SIGN_IN_TO_CONTENT_ARENT")}</h3>

                {this.state.error && <span className="sign-error">{this.state.error}</span>}
                <div className="username">
                    <label htmlFor="username">{this.context.t("SIGN_IN_EMAIL")}</label>
                    <input
                        autoFocus
                        ref={(name) => this.name = name}
                        type="text"
                        id="username"
                        name="_username"
                        placeholder={this.context.t("SIGN_IN_EMAIL_PLACEHOLDER")}
                        required="required"
                        onChange={this.handleInputChange}
                        autoComplete="username" />
                </div>

                <div className="password">
                    <label htmlFor="password">{this.context.t("SIGN_IN_PASSWORD")}</label>
                    <input
                        ref={(password) => this.pass = password}
                        type="password"
                        id="password"
                        onChange={this.handleInputChange}
                        required="required"
                        autoComplete="current-password" />
                </div>

                <button className="yellow-btn" onClick={this.handleSignIn}>
                    {this.context.t("SIGN_IN_SUBMIT")}
                    {this.state.isLoading && <Loader loading={true} xSmall /> }
                </button>

                <p className="forgot-password-wrapper">
                    <span className="forgot-password" onClick={this.handleForgotPassClick}>
                        {this.context.t("SIGN_IN_FORGOT_PASSWORD")}
                    </span>
                </p>

                <div className="create-account">
                    <h3>{this.context.t("SIGN_IN_NOT_ACCOUNT_YET")}</h3>
                </div>

                <button className="yellow-btn" onClick={this.handleSignUpClick}>{this.context.t("SIGN_IN_SIGN_UP_LABEL")}</button>
            </section>
        );
    }
}

SignInForm.contextTypes = {
    t: PropTypes.func.isRequired
};

SignInForm.propsType = {
    onViewUpdate: PropTypes.func.isRequired
};

export default SignInForm;
