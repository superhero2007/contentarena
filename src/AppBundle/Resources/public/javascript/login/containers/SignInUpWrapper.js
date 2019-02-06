import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignInForm from './../components/SignInForm';
import RecoverPassword from './../components/RecoverPassword';
import ReviewEmail from './../components/ReviewEmail';
import SignUpForm from './../components/SignUpForm';
import ResetPassword from './../components/ResetPassword';
import SignUpSuccessfully from './../components/SignUpSuccessfully';
import { LOGIN_VIEW_TYPE } from "@constants";
import { contentWhiteLogo } from "./../../main/components/Icons";

class SignInUpWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: this.props.currentView || LOGIN_VIEW_TYPE.LOGIN
        };
    };

    getMinHeight = () => this.props.minHeight[this.state.currentView]; //prevent overlapping when reduce height of browser
    handleUpdateView = (viewType) => this.setState({currentView: viewType});

    render() {
        const Component = this.props.views[this.state.currentView];
        return (
            <div className="login-page" style={{minHeight: this.getMinHeight()}}>
                <div className="header">
                    <div className="logo">
                        {contentWhiteLogo}
                    </div>
                    <div className="content">
                        <p className="uk-margin">
                            <span> <a href="https://contentarena.com/" target="_blank">{this.context.t("LOGIN_BAR_HOME")}</a></span>
                            <span> <a href="https://contentarena.com/web/privacy-policy/" target="_blank">{this.context.t("LOGIN_BAR_PRIVACY_POLICY")}</a></span>
                            <span> <a href="https://contentarena.com/web/terms-of-use/" target="_blank">{this.context.t("LOGIN_BAR_TERMS")}</a></span>
                            <span> <a href="https://contentarena.com/web/privacy-policy/" target="_blank">{this.context.t("LOGIN_BAR_COOKIE_POLICY")}</a></span>
                            <span> <a href="https://contentarena.com/web/faq/" target="_blank">{this.context.t("LOGIN_BAR_FAQ")}</a></span>
                        </p>
                    </div>
                </div>
    
                <section className="login-form">
                    <Component fakeAuth={this.props.fakeAuth} onViewUpdate={this.handleUpdateView} history={this.props.history}/>
                </section>
            </div>
        );
    }
}

SignInUpWrapper.contextTypes = {
    t: PropTypes.func.isRequired
};

SignInUpWrapper.defaultProps = {
    views: {
        [LOGIN_VIEW_TYPE.LOGIN]: SignInForm,
        [LOGIN_VIEW_TYPE.RECOVER]: RecoverPassword,
        [LOGIN_VIEW_TYPE.REVIEW]: ReviewEmail,
        [LOGIN_VIEW_TYPE.REGISTER]: SignUpForm,
        [LOGIN_VIEW_TYPE.REGISTERED]: SignUpSuccessfully,
        [LOGIN_VIEW_TYPE.RESET_PASSWORD]: ResetPassword
    },
    minHeight: {
        [LOGIN_VIEW_TYPE.LOGIN]: 770,
        [LOGIN_VIEW_TYPE.RECOVER]: 500,
        [LOGIN_VIEW_TYPE.REVIEW]: 500,
        [LOGIN_VIEW_TYPE.REGISTER]: 900,
        [LOGIN_VIEW_TYPE.REGISTERED]: 500,
        [LOGIN_VIEW_TYPE.RESET_PASSWORD]: 550
    }
};

export default SignInUpWrapper;
