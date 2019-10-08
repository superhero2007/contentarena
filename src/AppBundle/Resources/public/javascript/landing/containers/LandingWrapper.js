import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import LandingHeader from "../components/LandingHeader";
import {
	LANDING_LINKS, LOGIN_VIEW_TYPE, ROUTE_PATHS, USER_STATUS,
} from "@constants";
import { contentWhiteLogo } from "../../main/components/Icons";
import {
	hideRegistrationEmail,
	showRegistrationEmail,
} from "../actions/landingActions";
import request from "../../common/request";
import api from "../../api";

class LandingWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emailError: "",
		};
		this.registerEmail = React.createRef();
		this.props.hideRegistrationEmail();
	}

	getInTouch = () => console.warn("get in touch not ready");

	handleRegisterClick = () => {
		this.props.showRegistrationEmail(this.registerEmail.current.value);
		if (this.registerEmail.current.value !== "") {
			api.authentication.preRegisterUser({
				firstName: "n/a",
				lastName: "n/a",
				status: USER_STATUS.ABORTED,
				email: this.registerEmail.current.value,
			})
				.then(
					(json) => {
						if (json.data.success === true) {
							this.props.history.push("/registration");
						}
					},
				)
				.catch(({ response }) => {
					const responseData = response.status === 500
						? response.data.error
						: response.data;
					this.setState({ emailError: responseData.message });
				});
		} else {
			this.props.history.push("/registration");
		}
	};

	render() {
		return (
			<div className="landing-page">
				<LandingHeader
					currentView={LOGIN_VIEW_TYPE.LANDING}
					history={this.props.history}
				/>
				<section className="banner">
					<div className="banner-content">
						<div className="title">
							<Translate i18nKey="LANDING_SELL_BUY" />
						</div>
						<div className="subtitle">
							<Translate i18nKey="LANDING_SPORTS_RIGHTS" />
						</div>
						<div className="registration">
							<input
								type="text"
								placeholder={this.context.t("LANDING_EMAIL_ADDRESS")}
								className="ca-form-control"
								ref={this.registerEmail}
							/>
							<button
								className="yellow-button"
								onClick={this.handleRegisterClick}
							>
								<Translate i18nKey="LANDING_REGISTER" />
							</button>
						</div>
						<span className="sign-error">{this.state.emailError}</span>
					</div>
				</section>

				<section className="features">
					<div className="inner landing-column">
						<div className="feature-row">
							<div className="title">
								Sell
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_globe.png`}
										alt="global market place"
									/>
								</div>
								<div className="content">
									<div className="cap">Global</div>
									<div className="txt">market place</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_dollar.png`}
										alt="maximize revenues"
									/>
								</div>
								<div className="content">
									<div className="cap">maximize</div>
									<div className="txt">revenues</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_sales-process.png`}
										alt="seamless sales process"
									/>
								</div>
								<div className="content">
									<div className="cap">seamless</div>
									<div className="txt">sales process</div>
								</div>
							</div>

						</div>
						<div className="feature-row">
							<div className="title">
								Buy
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_search.png`}
										alt="find relevant content"
									/>
								</div>
								<div className="content">
									<div className="cap">Find</div>
									<div className="txt">relevant content</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_growth-.png`}
										alt="optimize content portfolio"
									/>
								</div>
								<div className="content">
									<div className="cap">optimize</div>
									<div className="txt">content portfolio</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/web_security.png`}
										alt="Fast &amp; Safe transaction"
									/>
								</div>
								<div className="content">
									<div className="cap">Fast&amp;Safe</div>
									<div className="txt">transaction</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom-triangle">
						<div className="text">
							<span onClick={this.getInTouch}>
								<Translate i18nKey="LANDING_GET_IN_TOUCH" />
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section
					className="benefits"
					id="how-to"
				>
					<div className="landing-column">
						<div>
							<div className="benefit-row">
								<div className="content">
									<div className="cap">
										<Translate i18nKey="LANDING_HOW_TO_TITLE_1" />
									</div>
									<div className="txt">
										<Translate i18nKey="LANDING_HOW_TO_TEXT_1" />
									</div>
								</div>
								<div className="icon">
									<a
										href={`${assetsBaseDir}app/images/landing/globe-icon_content_arena.png`}
									>
										<img
											src={`${assetsBaseDir}app/images/landing/globe-icon_content_arena.png`}
											className="uk-responsive-width uk-width-medium@m uk-width-small"
											alt=""
										/>
									</a>
								</div>
							</div>
							<div className="benefit-row">
								<div className="icon">
									<a
										href={`${assetsBaseDir}app/images/landing/screen-icon_content_arena.png`}
									>
										<img
											src={`${assetsBaseDir}app/images/landing/screen-icon_content_arena.png`}
											className="uk-responsive-width uk-width-medium@m uk-width-small"
											alt=""
										/>
									</a>
								</div>
								<div className="content">
									<div className="cap">
										<Translate i18nKey="LANDING_HOW_TO_TITLE_2" />
									</div>
									<div className="txt">
										<Translate i18nKey="LANDING_HOW_TO_TEXT_2" />
									</div>
								</div>
							</div>
							<div className="benefit-row">
								<div className="content">
									<div className="cap">
										<Translate i18nKey="LANDING_HOW_TO_TITLE_3" />
									</div>
									<div className="txt">
										<Translate i18nKey="LANDING_HOW_TO_TEXT_3" />
									</div>
								</div>
								<div className="icon">
									<a
										href={`${assetsBaseDir}app/images/landing/handshake-icon_content_arena.png`}
									>
										<img
											src={`${assetsBaseDir}app/images/landing/handshake-icon_content_arena.png`}
											className="uk-responsive-width uk-width-medium@m uk-width-small"
											alt=""
										/>
									</a>
								</div>
							</div>

						</div>
					</div>
					<div className="bottom-triangle bg-white">
						<div className="text">
							<span onClick={this.getInTouch}>
								<Translate i18nKey="LANDING_TEAM" />
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section
					className="team"
					id="team"
				>
					<div className="landing-column">
						<div className="inner">
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/sascha_rund.400x400.png`}
										alt="Sascha Kojic"
									/>
								</div>
								<div className="content">
									<div>Sascha<br />Kojic</div>
									<div>Co-Founder</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/erik_rund.400x400.png`}
										alt="Erik Lorenz"
									/>
								</div>
								<div className="content">
									<div>Erik<br />Lorenz</div>
									<div>Co-Founder</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/bernie_rund.400x400.png`}
										alt="Bernhard Riedlsperger"
									/>
								</div>
								<div className="content">
									<div>Bernhard<br />Riedlsperger</div>
									<div>Product<br />
										Development
									</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/alex_rund_neu.400x400.png`}
										alt="Alexander Abts"
									/>
								</div>
								<div className="content">
									<div>Alexander<br />Abts</div>
									<div>Business<br />
										Development
									</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/klemens_rund.400x400.png`}
										alt="Klemens Kögl"
									/>
								</div>
								<div className="content">
									<div>Klemens<br />Kögl</div>
									<div>Product<br />
										Development
									</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img
										src={`${assetsBaseDir}app/images/landing/juan_rund.400x400.png`}
										alt="Juan Cruz"
									/>
								</div>
								<div className="content">
									<div>Juan<br />Cruz</div>
									<div>Technical<br />
										Development
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom-triangle">
						<div className="text">
							<span onClick={this.getInTouch}>
								<Translate i18nKey="LANDING_OUR_REFERENCES" />
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section
					className="references"
					id="references"
				>
					<div className="landing-column">
						<div className="inner">
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/pitch_international.400x400.png`}
									alt="Pitch International"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/perform.400x400.png`}
									alt="Perform"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/dazn.400x400.png`}
									alt="DAZN"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/sportradar.400x400.png`}
									alt="Sportradar"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/sportsman.400x400.png`}
									alt="Sportsman"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/bvb.400x400.png`}
									alt="BVB"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/crystal.400x400.png`}
									alt="Crystal"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/everton.400x400.png`}
									alt="Everton"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/malaga.400x400.png`}
									alt="Malaga CF"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/cze.400x400.png`}
									alt="CZE"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/dcl.400x400.png`}
									alt="DCL"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/sky.400x400.png`}
									alt="Sky"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/sport1.400x400.png`}
									alt="Sport 1"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/matchtv_grey.400x400.png`}
									alt="Match TV"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/orf.400x400.png`}
									alt="ORF"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/oefb.400x400.png`}
									alt="OEFB"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/landing/sportklub.400x400.png`}
									alt="SportKlub"
								/>
							</div>
							<div className="icon">
								<img
									src={`${assetsBaseDir}app/images/ATP.png`}
									alt="ATP"
								/>
							</div>
							{/*	<div className="icon">
								<img src={`${assetsBaseDir}app/images/FIBA.png`} alt="FIBA" />
							</div> */}
						</div>
					</div>
					<div className="bottom-triangle bg-white">
						<div className="text">
							<span onClick={this.getInTouch}>
								<Translate i18nKey="LANDING_CONTACT_US" />
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section
					className="get-in-touch"
					id="contact"
				>
					<a href="mailto:info@contentarena.com">
						<i className="fa fa-4x fa-envelope-o" />
						<div className="email">info@contentarena.com</div>
					</a>
				</section>

				<footer className="landing-footer">
					<div className="footer-wrapper">
						<a
							className="footer-logo"
							href={LANDING_LINKS.HOME}
							target="_self"
						>
							{contentWhiteLogo}
						</a>
						<div className="footer-links">
							<div>
								<span className="footer-company-name"><Translate
									i18nKey="LANDING_COMPANY"
								/>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.PRIVACY}><Translate
										i18nKey="LOGIN_BAR_PRIVACY_POLICY"
									/>
									</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.TERMS}><Translate
										i18nKey="LOGIN_BAR_TERMS"
									/>
									</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.COOKIE}><Translate
										i18nKey="LOGIN_BAR_COOKIE_POLICY"
									/>
									</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.FAQ}><Translate
										i18nKey="LOGIN_BAR_FAQ"
									/>
									</a>
								</span>
							</div>
						</div>
						<div className="footer-contact">
							<a
								href="https://www.linkedin.com/company/11294986/"
								className="linkedin-icon"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fa fa-linkedin" />
							</a>
							<a
								href="mailto:info@contentarena.com"
								className="email-icon"
								target="_blank"
								rel="noopener noreferrer"
							>
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
	t: PropTypes.func.isRequired,
};

const mapStateToProps = ({ landing }) => landing;

const mapDispatchToProps = dispatch => ({
	hideRegistrationEmail: () => dispatch(hideRegistrationEmail()),
	showRegistrationEmail: email => dispatch(showRegistrationEmail(email)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LandingWrapper);
