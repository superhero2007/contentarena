import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { LOGIN_VIEW_TYPE, LANDING_LINKS } from "@constants";
import Translate from "@components/Translator/Translate";
import { contentWhiteLogo } from "../../main/components/Icons";

class CmsSportSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { currentView, history } = this.props;
		const { context } = this;
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
									<Translate i18nKey="LOGIN_BAR_LOGIN" />
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
