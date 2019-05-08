import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { LOGIN_VIEW_TYPE, LANDING_LINKS } from "@constants";
import { contentWhiteLogo } from "../../main/components/Icons";
import PublicHeaderBar from "../../main/components/PulbicHeaderBar";

class LandingHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMobileMenu: false,
		};
	}

	render() {
		const { currentView, history } = this.props;
		const { context } = this;
		const { showMobileMenu } = this.state;

		const loginLinks = [
			{
				title: context.t("LOGIN_BAR_HOME"),
				link: LANDING_LINKS.HOME,
				isNewTab: true,
			}, {
				title: context.t("LOGIN_BAR_PRIVACY_POLICY"),
				link: LANDING_LINKS.PRIVACY,
				isNewTab: true,
			}, {
				title: context.t("LOGIN_BAR_TERMS"),
				link: LANDING_LINKS.TERMS,
				isNewTab: true,
			}, {
				title: context.t("LOGIN_BAR_COOKIE_POLICY"),
				link: LANDING_LINKS.COOKIE,
				isNewTab: true,
			}, {
				title: context.t("LOGIN_BAR_FAQ"),
				link: LANDING_LINKS.FAQ,
				isNewTab: true,
			},
		];
		const landingLinks = [
			{
				title: context.t("LOGIN_BAR_HOME"),
				link: "#home",
			}, {
				title: context.t("LOGIN_BAR_HOW_TO"),
				link: "#how-to",
			}, {
				title: context.t("LOGIN_BAR_TEAM"),
				link: "#team",
			}, {
				title: context.t("LOGIN_BAR_REFERENCES"),
				link: "#references",
			}, {
				title: context.t("LOGIN_BAR_REGISTER"),
				to: "/registration",
			}, {
				title: context.t("LOGIN_BAR_CONTACT"),
				link: "#contact",
			}, {
				title: context.t("LOGIN_BAR_LOGIN"),
				to: "/login",
				button: true,
			},
		];

		if (currentView === LOGIN_VIEW_TYPE.LISTING_PREVIEW) {
			return <PublicHeaderBar />;
		}

		const navLinks = currentView === LOGIN_VIEW_TYPE.LANDING ? [...landingLinks] : [...loginLinks];
		return (
			<header className="landing-header">
				<div className="landing-column">
					<div className="inner">
						<a className="logo" href={LANDING_LINKS.HOME} target="_self">
							{contentWhiteLogo}
						</a>
						<div
							className={cn("mob-trigger", { closeIcon: showMobileMenu })}
							onClick={() => this.setState({ showMobileMenu: !showMobileMenu })}
						>
							{!showMobileMenu && currentView === LOGIN_VIEW_TYPE.LANDING
							&& (
								<a
									onClick={() => history.push("/login")}
									className="ca-btn primary"
								>
									{context.t("LOGIN_BAR_LOGIN")}
								</a>
							)}

							{showMobileMenu ? "✖" : "MENU ☰"}
						</div>
						<div className={cn("nav", { showMenu: showMobileMenu })}>
							{navLinks.map((item, index) => {
								const props = {
									key: `${index}${item.title}`,
									target: item.isNewTab ? "_blank" : "_self",
									onClick: item.to ? () => history.push(item.to) : undefined,
								};
								if (showMobileMenu && item.to === "/login") return undefined;
								return (
									<a
										{...props}
										{...(item.link && { href: item.link })}
										{...(item.button && { className: "ca-btn primary" })}
									>
										{item.title}
									</a>
								);
							})}
						</div>
						<div
							className="nav-bg"
							onClick={() => this.setState({ showMobileMenu: !showMobileMenu })}
							style={{
								position: "absolute",
								background: "transparent",
								width: "100%",
								height: "100%",
								top: 0,
								left: 0,
								display: showMobileMenu ? "block" : "none",
							}}
						/>
					</div>
				</div>
			</header>
		);
	}
}

LandingHeader.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default LandingHeader;
