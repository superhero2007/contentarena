import React, { Component } from "react";
import PropTypes from "prop-types";
import LandingHeader from "../components/LandingHeader";
import { LOGIN_VIEW_TYPE, LANDING_LINKS } from "@constants";
import { contentWhiteLogo } from "../../main/components/Icons";

class LandingWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	getInTouch = () => console.warn("get in touch not ready");

	handleRegisterClick = () => this.props.history.push("/registration");

	render() {
		return (
			<div className="landing-page">
				<LandingHeader currentView={LOGIN_VIEW_TYPE.LANDING} history={this.props.history} />

				<section className="banner">
					<div className="banner-content">
						<div className="title">
							{this.context.t("LANDING_SELL_BUY")}
						</div>
						<div className="subtitle">
							{this.context.t("LANDING_SPORTS_RIGHTS")}
						</div>
						<div className="registration">
							<input
								type="text"
								placeholder={this.context.t("LANDING_EMAIL_ADDRESS")}
								className="ca-form-control"
							/>
							<button
								className="yellow-button"
								onClick={this.handleRegisterClick}
							>
								{this.context.t("LANDING_REGISTER")}
							</button>
						</div>
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
									<img src="https://contentarena.com/site/assets/layout/web_globe.png" alt="global market place" />
								</div>
								<div className="content">
									<div className="cap">Global</div>
									<div className="txt">market place</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/layout/web_dollar.png" alt="maximize revenues" />
								</div>
								<div className="content">
									<div className="cap">maximize</div>
									<div className="txt">revenues</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/layout/web_sales-process.png" alt="seamless sales process" />
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
									<img src="https://contentarena.com/site/assets/layout/web_search.png" alt="find relevant content" />
								</div>
								<div className="content">
									<div className="cap">Find</div>
									<div className="txt">relevant content</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/layout/web_growth-.png" alt="optimize content portfolio" />
								</div>
								<div className="content">
									<div className="cap">optimize</div>
									<div className="txt">content portfolio</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/layout/web_security.png" alt="Fast &amp; Safe transaction" />
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
								{this.context.t("LENDING_GET_IN_TOUCH")}
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section className="benefits">
					<div className="landing-column">
						<div>
							<div className="benefit-row">
								<div className="content">
									<div className="cap">offer your content globally</div>
									<div className="txt">
										Leverage&nbsp;direct and easy access to a global network of verified
										buyers. Enjoy the flexibility to package and sell your rights in
										your preferred way across different territories and all distribution
										channels.&nbsp;
									</div>
								</div>
								<div className="icon">
									<a href="https://contentarena.com/site/assets/files/4128/globe-icon_content_arena.png">
										<img
											src="https://contentarena.com/site/assets/files/4128/globe-icon_content_arena.png"
											className="uk-responsive-width uk-width-medium@m uk-width-small"
										/>
									</a>
								</div>
							</div>
							<div className="benefit-row">
								<div className="icon">
									<a href="https://contentarena.com/site/assets/files/4129/screen-icon_content_arena.png">
										<img
											src="https://contentarena.com/site/assets/files/4129/screen-icon_content_arena.png"
											className="uk-responsive-width uk-width-medium@m uk-width-small"
										/>
									</a>
								</div>
								<div className="content">
									<div className="cap">find effortlessly and buy hassle-free</div>
									<div className="txt">
										Browse intuitively through available content and explore new
										opportunities to enrich your portfolio. Easily&nbsp;access all
										relevant information, contact the seller and&nbsp;make a bid or
										purchase directly.
									</div>
								</div>
							</div>
							<div className="benefit-row">
								<div className="content">
									<div className="cap">fast and safe deal closure</div>
									<div className="txt">
										Automated generation of legal agreements and an integrated escrow
										payment system,&nbsp;providing a&nbsp;fast, confidential and secure
										&nbsp;environment for a hassle-free&nbsp;deal
										transaction.&nbsp;Content is made accessible as soon as both parties
										have confirmed the deal.
									</div>
								</div>
								<div className="icon">
									<a href="https://contentarena.com/site/assets/files/4130/handshake-icon_content_arena.png">
										<img
											src="https://contentarena.com/site/assets/files/4130/handshake-icon_content_arena.png"
											className="uk-responsive-width uk-width-medium@m uk-width-small"
										/>
									</a>
								</div>
							</div>

						</div>
					</div>
					<div className="bottom-triangle bg-white">
						<div className="text">
							<span onClick={this.getInTouch}>
								{this.context.t("LENDING_TEAM")}
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section className="team">
					<div className="landing-column">
						<div className="inner">
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4523/sascha_rund.400x400.png" alt="Sascha Kojic" />
								</div>
								<div className="content">
									<div>Sascha<br />Kojic</div>
									<div>Co-Founder</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4524/erik_rund.400x400.png" alt="Erik Lorenz" />
								</div>
								<div className="content">
									<div>Erik<br />Lorenz</div>
									<div>Co-Founder</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4525/bernie_rund.400x400.png" alt="Bernhard Riedlsperger" />
								</div>
								<div className="content">
									<div>Bernhard<br />Riedlsperger</div>
									<div>Product<br />
										Development</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4526/alex_rund_neu.400x400.png" alt="Alexander Abts" />
								</div>
								<div className="content">
									<div>Alexander<br />Abts</div>
									<div>Business<br />
										Development</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4527/klemens_rund.400x400.png" alt="Klemens Kögl" />
								</div>
								<div className="content">
									<div>Klemens<br />Kögl</div>
									<div>Product<br />
										Development</div>
								</div>
							</div>
							<div className="item">
								<div className="icon">
									<img src="https://contentarena.com/site/assets/files/4528/juan_rund.400x400.png" alt="Juan Cruz" />
								</div>
								<div className="content">
									<div>Juan<br />Cruz</div>
									<div>Technical<br />
										Development</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom-triangle">
						<div className="text">
							<span onClick={this.getInTouch}>
								{this.context.t("LENDING_OUR_REFERENCES")}
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section className="references">
					<div className="landing-column">
						<div className="inner">
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4538/mpsilva.400x400.png" alt="MP Silva" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4542/pitch_international.400x400.png" alt="Pitch International" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4541/perform.400x400.png" alt="Perform" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4534/dazn.400x400.png" alt="DAZN" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4546/sportradar.400x400.png" alt="Sportradar" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4547/sportsman.400x400.png" alt="Sportsman" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4532/bvb.400x400.png" alt="BVB" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4533/crystal.400x400.png" alt="Crystal" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4536/everton.400x400.png" alt="Everton" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4555/malaga.400x400.png" alt="Malaga CF" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4556/cze.400x400.png" alt="CZE" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4535/dcl.400x400.png" alt="DCL" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4543/sky.400x400.png" alt="Sky" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4544/sport1.400x400.png" alt="Sport 1" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4537/matchtv_grey.400x400.png" alt="Match TV" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4540/orf.400x400.png" alt="ORF" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4539/oefb.400x400.png" alt="OEFB" />
							</div>
							<div className="icon">
								<img src="https://contentarena.com/site/assets/files/4545/sportklub.400x400.png" alt="SportKlub" />
							</div>
						</div>
					</div>
					<div className="bottom-triangle bg-white">
						<div className="text">
							<span onClick={this.getInTouch}>
								{this.context.t("LENDING_GET_IN_TOUCH")}
							</span>
						</div>
						<div className="outer" />
					</div>
				</section>

				<section className="get-in-touch">
					<a href="mailto:info@contentarena.com">
						<i className="fa fa-4x fa-envelope-o" />
						<div className="email">info@contentarena.com</div>
					</a>
				</section>

				<footer className="landing-footer">
					<div className="footer-wrapper">
						<a className="footer-logo" href={LANDING_LINKS.HOME} target="_self">
							{contentWhiteLogo}
						</a>
						<div className="footer-links">
							<div>
								<span className="footer-company-name">{this.context.t("LANDING_COMPANY")}</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.PRIVACY}>{this.context.t("LOGIN_BAR_PRIVACY_POLICY")}</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.TERMS}>{this.context.t("LOGIN_BAR_TERMS")}</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.COOKIE}>{this.context.t("LOGIN_BAR_COOKIE_POLICY")}</a>
								</span>
								<span>
									{" "}
									<a href={LANDING_LINKS.FAQ}>{this.context.t("LOGIN_BAR_FAQ")}</a>
								</span>
							</div>
						</div>
						<div className="footer-contact">
							<a
								href="https://www.linkedin.com/company/11294986/"
								className="linkedin-icon"
								target="_blank"
							>
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
	t: PropTypes.func.isRequired,
};

export default LandingWrapper;
