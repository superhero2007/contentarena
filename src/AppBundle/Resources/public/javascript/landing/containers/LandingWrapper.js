import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingHeader from './../components/LandingHeader';
import { LOGIN_VIEW_TYPE, LANDING_LINKS } from "@constants";
import { contentWhiteLogo } from "./../../main/components/Icons";

class LandingWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    };

    getInTouch = () => console.warn('get in touch not ready');
    handleRegisterClick = () => this.props.history.push("/registration");

    render() {
        return (
            <div className="landing-page">
                <header className="landing-header-wrapper">
                    <LandingHeader currentView={LOGIN_VIEW_TYPE.LANDING} history={this.props.history} />

                    <main className="landing-main">
                        <div className="main-text-wrapper">
                            <p className="landing-title">{this.context.t("LANDING_SELL_BUY")}</p>
                            <p className="landing-sub-title">{this.context.t("LANDING_SPORTS_RIGHTS")}</p>
                        </div>
                        <div className="main-registration-wrapper">
                            <input type="text" placeholder={this.context.t("LANDING_EMAIL_ADDRESS")}/>
                            <button className="yellow-button" onClick={this.handleRegisterClick}>{this.context.t("LANDING_REGISTER")}</button>
                        </div>
                    </main>
                </header>

                <section className="landing-content"></section>
                <section className="landing-content-with-triangle">
                    <p className="landing-triangle-text">
                        <span onClick={this.getInTouch}>{this.context.t("LENDING_GET_IN_TOUCH")}</span>
                    </p>
                    <div className="outer" />
                </section>

                <section className="landing-get-in-touch">
                    <a href="mailto:info@contentarena.com">
                        <i className="fa fa-4x fa-envelope-o" />
                        <span className="email">info@contentarena.com</span>
                    </a>
                </section>

                <footer className="landing-footer">
                    <div className="footer-wrapper">
                        <a className="footer-logo" href={LANDING_LINKS.HOME} target="_self">
                            {contentWhiteLogo}
                        </a>
                        <div className="footer-links">
                            <p>
                                <span className="footer-company-name">{this.context.t("LANDING_COMPANY")}</span>
                                <span> <a href={LANDING_LINKS.PRIVACY}>{this.context.t("LOGIN_BAR_PRIVACY_POLICY")}</a></span>
                                <span> <a href={LANDING_LINKS.TERMS}>{this.context.t("LOGIN_BAR_TERMS")}</a></span>
                                <span> <a href={LANDING_LINKS.COOKIE}>{this.context.t("LOGIN_BAR_COOKIE_POLICY")}</a></span>
                                <span> <a href={LANDING_LINKS.FAQ}>{this.context.t("LOGIN_BAR_FAQ")}</a></span>
                            </p>
                        </div>
                        <div className="footer-contact">
                            <a href="https://www.linkedin.com/company/11294986/" className="linkedin-icon" target="_blank">
                                <i className="fa fa-linkedin" />
                            </a>
                            <a href="mailto:info@contentarena.com" className="email-icon" target="_blank">
                                <i className="fa fa-envelope-o" />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

LandingWrapper.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LandingWrapper;
