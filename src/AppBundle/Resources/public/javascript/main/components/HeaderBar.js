import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { goTo } from "../actions/utils";
import HeaderNotifications from "./HeaderNotifications";
import InviteUsersModal from "../../common/modals/InviteUsersModal";
import { inviteIcon } from "./Icons";
import { ROUTE_PATHS } from "@constants";
import { userIsAdmin } from "../reducers/user";
import api from "../../api";

const HeaderBarTab = ({
	match, children, route, className = "", linkClass = "", onClick,
}) => (
	<div className={(match) ? "tab active-tab" : `tab ${className}`} onClick={onClick}>
		<Link to={route} className={linkClass}>
			{children}
		</Link>
	</div>
);

const CustomLink = ({ match, children, route }) => (
	<div className={(match) ? "tab active-tab" : "tab"}>
		<a href={route}>
			{children}
		</a>
	</div>
);

const HeaderBarSeller = ({ match }, context) => (
	<React.Fragment>
		<HeaderBarTab
			match={match.url === ROUTE_PATHS.MANAGE_LISTINGS}
			route={ROUTE_PATHS.MANAGE_LISTINGS}
		>
			<Translate i18nKey="HEADER_LINK_MANAGE_LISTINGS" />
		</HeaderBarTab>
		<HeaderBarTab
			match={
				match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_WITH_ACTIVITY
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_OPEN_BIDS
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_CLOSED_DEALS
			}
			route={ROUTE_PATHS.COMMERCIAL_OVERVIEW}
		>
			<Translate i18nKey="HEADER_LINK_COMMERCIAL_ACTIVITY" />
		</HeaderBarTab>
		<CustomLink
			match={match.path === "/contentlisting/:customId?/:step?"}
			route="/contentlisting/new"
		>
			<Translate i18nKey="HEADER_LINK_CREATE_LISTING" />
		</CustomLink>
	</React.Fragment>
);

HeaderBarSeller.contextTypes = {
	t: PropTypes.func.isRequired,
};

const HeaderBarSellerCms = ({ match }) => (
	<React.Fragment>
		<HeaderBarTab
			match={match.url === ROUTE_PATHS.PROPERTIES}
			route={ROUTE_PATHS.PROPERTIES}
		>
			<Translate i18nKey="HEADER_LINK_PROPERTIES" />
		</HeaderBarTab>

		<HeaderBarTab
			match={match.url === ROUTE_PATHS.MANAGE_LISTINGS}
			route={ROUTE_PATHS.MANAGE_LISTINGS}
		>
			<Translate i18nKey="HEADER_LINK_MANAGE_LISTINGS" />
		</HeaderBarTab>

		<HeaderBarTab
			match={
				match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_WITH_ACTIVITY
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_OPEN_BIDS
				|| match.url === ROUTE_PATHS.COMMERCIAL_OVERVIEW_CLOSED_DEALS
			}
			route={ROUTE_PATHS.COMMERCIAL_OVERVIEW}
		>
			<Translate i18nKey="HEADER_LINK_COMMERCIAL_ACTIVITY" />
		</HeaderBarTab>

	</React.Fragment>
);

HeaderBarSellerCms.contextTypes = {
	t: PropTypes.func.isRequired,
};


class HeaderBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inviteModalOpen: false,
			dataLoading: true,
			notifications: [],
			unseenNotificationsCount: 0,
			unseenMessagesCount: 0,
			isDownArrowShown: true,
		};
	}

	componentDidMount() {
		this.loadNotifications();
	}

	loadNotifications() {
		api.notifications.getNotifications()
			.then(({ data }) => {
				if (!data) {
					return;
				}

				data.sort((a, b) => b.id - a.id);
				const notifications = data.filter(item => item.type.name !== "MESSAGE");
				const unseenNotificationsCount = notifications.filter(item => !item.seen).length;
				const unseenMessagesCount = data.filter(item => item.type.name === "MESSAGE").length;

				this.setState({
					dataLoading: false,
					unseenNotificationsCount,
					unseenMessagesCount,
					notifications,
				});
			});
	}

	isMarketplaceMatch = url => url === "/marketplace" || url === "/marketplace/filter/multi";

	setDownArrow = isDownSet => this.setState({ isDownArrowShown: isDownSet });

	render() {
		const {
			tab, profile, match, common, user, userIsAdmin,
		} = this.props;
		const {
			inviteModalOpen, dataLoading, notifications, unseenNotificationsCount, unseenMessagesCount, isDownArrowShown,
		} = this.state;
		const logoUrl = this.getLogoUrl(tab);
		const { testStageMode, cmsEnabled, ghostMode } = common;

		return (
			<React.Fragment>
				{testStageMode && (
					<div className="manager-header-test-mode">
						<Translate i18nKey="HEADER_TEST_STAGE_MODE" />
					</div>
				)}

				{ghostMode && (
					<div className="manager-header-ghost-mode">
						<div className="d-flex">
							You are logged in as superuser into the account of: <b>{user.email}</b>
						</div>
						<div className="d-flex">
							Do you want to leave superuser mode?
							<a href={`${ROUTE_PATHS.MARKETPLACE}?_ghost_mode=_exit`}>
								Return to MarketPlace
							</a>
							<a href={`${ROUTE_PATHS.ADMIN}?_ghost_mode=_exit`}>
								Return to BackOffice
							</a>
						</div>
					</div>
				)}

				<div className="manager-header">
					<div className="header-wrapper">
						<div className="logo" onClick={() => goTo(logoUrl)}>
							<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
						</div>

						{profile === "BUYER" && (
							<HeaderBarTab
								match={this.isMarketplaceMatch(match.url)}
								route="/marketplace"
							>
								<Translate i18nKey="HEADER_LINK_MARKETPLACE" />
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab match={match.url === "/watchlist"} route="/watchlist">
								<Translate i18nKey="HEADER_LINK_WATCHLIST" />
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab
								match={
									match.url === "/bids/activebids"
									|| match.url === "/bids/declinedbids"
								}
								route="/bids/activebids"
							>
								<Translate i18nKey="HEADER_LINK_BIDS" />
							</HeaderBarTab>
						)}

						{profile === "BUYER" && (
							<HeaderBarTab
								match={match.url === "/closeddeals"}
								route="/closeddeals"
							>
								<Translate i18nKey="HEADER_LINK_CLOSED_DEALS" />
							</HeaderBarTab>
						)}

						{profile === "SELLER" && !cmsEnabled && <HeaderBarSeller {...this.props} />}

						{profile === "SELLER" && cmsEnabled && <HeaderBarSellerCms {...this.props} />}

						<div className="spacer" />

						<div className="tab">
							<a onClick={(e) => {
								this.setState({ inviteModalOpen: true });
								e.preventDefault();
							}}
							>
								<img src={inviteIcon} alt="Invite users" style={{ height: 24, marginRight: 5 }} />
								<Translate i18nKey="HEADER_INVITE_USERS" />
							</a>
						</div>

						{profile === "BUYER" && (
							<HeaderBarTab
								className="tab baseline switch-mode"
								linkClass="ca-btn primary"
								route={cmsEnabled ? ROUTE_PATHS.PROPERTIES : ROUTE_PATHS.MANAGE_LISTINGS}
							>
								<Translate i18nKey="HEADER_LINK_SELLING_MODE" />
							</HeaderBarTab>
						)}

						{profile === "SELLER" && (
							<HeaderBarTab
								className="tab baseline switch-mode"
								linkClass="ca-btn primary"
								route="/marketplace"
							>
								<Translate i18nKey="HEADER_LINK_BUYING_MODE" />
							</HeaderBarTab>
						)}

						<HeaderNotifications
							dataLoading={dataLoading}
							notifications={notifications}
							unseenNotificationsCount={unseenNotificationsCount}
						/>

						<HeaderBarTab className="tab baseline messages" route="/messages" onClick={this.markMessagesAsSeen}>
							<i className="fa fa-envelope" />
							{!!unseenMessagesCount && (
								<div className="counter">
									{unseenMessagesCount}
								</div>
							)}
						</HeaderBarTab>

						<div
							className="settings"
							 onMouseEnter={() => this.setDownArrow(false)}
							 onMouseLeave={() => this.setDownArrow(true)}
						>

							<Translate i18nKey="HEADER_LINK_MY_CONTENT_ARENA" /><i className={`fa ${isDownArrowShown ? "fa-angle-down" : "fa-angle-up"}`} />

							<div className="popup">
								<div className="wrap">
									<HeaderBarTab
										route="/terms"
										className="popup-item"
									>
										<i className="fa fa-file-pdf-o" />
										<Translate i18nKey="HEADER_LINK_TERMS" />
									</HeaderBarTab>
									<HeaderBarTab
										route="/preferences"
										className="popup-item"
									>
										<i className="fa fa-sliders" />
										<Translate i18nKey="HEADER_LINK_PREFERENCES" />
									</HeaderBarTab>
									<HeaderBarTab
										route="/settings"
										className="popup-item"
									>
										<i className="fa fa-cog" />
										<Translate i18nKey="HEADER_LINK_SETTINGS" />
									</HeaderBarTab>
									<a href="https://landing.contentarena.com/web/faq/" className="tab popup-item">
										<i className="fa fa-question-circle-o" />
										<Translate i18nKey="HEADER_LINK_FAQ" />
									</a>
									<a href="/logout" className="tab popup-item">
										<i className="fa fa-sign-out" />
										<Translate i18nKey="HEADER_LINK_LOGOUT" />
									</a>
									{userIsAdmin && (
										<a href="/admin" className="tab popup-item">
											<i className="fa fa-cog" />
											Admin
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<InviteUsersModal
					common={common}
					isOpen={inviteModalOpen}
					onCloseModal={() => {
						this.setState({ inviteModalOpen: false });
					}}
				/>
			</React.Fragment>
		);
	}

	getLogoUrl = () => {
		const { profile } = this.props;

		if (profile === "SELLER") {
			return "marketplace";
		}
		return "marketplace";
	};

	markMessagesAsSeen = () => {
		const { unseenMessagesCount } = this.state;
		const { common } = this.props;
		const { ghostMode } = common;

		this.setState({
			unseenMessagesCount: 0,
		});

		if (unseenMessagesCount && !ghostMode) {
			api.notifications.markMessagesAsSeen();
		}
	};
}

HeaderBar.contextTypes = {
	t: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	common: state.common,
	user: state.user,
	userIsAdmin: userIsAdmin(state),
});

export default connect(
	mapStateToProps,
	null,
)(HeaderBar);
