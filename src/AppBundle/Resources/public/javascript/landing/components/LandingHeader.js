import React from "react";
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE, LANDING_LINKS } from "@constants";
import { contentWhiteLogo } from "../../main/components/Icons";

const LandingHeader = ({ currentView, history }, context) => {
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

	const navLinks = currentView === LOGIN_VIEW_TYPE.LANDING ? [...landingLinks] : [...loginLinks];
	return (
		<div className="header">
			<a className="logo" href={LANDING_LINKS.HOME} target="_self">
				{contentWhiteLogo}
			</a>
			<div className="content">
				<p className="uk-margin">
					{navLinks.map((item, index) => {
						const props = {
							key: `${index}${item.title}`,
							target: item.isNewTab ? "_blank" : "_self",
							onClick: item.to ? () => history.push(item.to) : undefined,
						};
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
				</p>
			</div>
		</div>
	);
};

LandingHeader.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default LandingHeader;