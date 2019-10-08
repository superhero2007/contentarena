import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import HeaderNotifications from "./HeaderNotifications";
import InviteUsersModal from "../../common/modals/InviteUsersModal";
import { inviteIcon } from "./Icons";
import { ROUTE_PATHS } from "@constants";
import { userIsAdmin } from "../reducers/user";
import api from "../../api";

const HeaderBarTab = ({
	match, children, route,
}) => (
	<div className={`header-bar-tab ${match ? "active" : ""}`}>
		<Link to={route}>
			{children}
		</Link>
	</div>
);

const HeaderBarSellerCms = ({ match }) => (
	<HeaderBarTab
		match={match.url === ROUTE_PATHS.PROPERTIES}
		route={ROUTE_PATHS.PROPERTIES}
	>
		<Translate i18nKey="HEADER_LINK_PROPERTIES" />
	</HeaderBarTab>
);

const HeaderBarBuyer = ({ match }) => (
	<Fragment>
		<HeaderBarTab
			match={match.url === "/marketplace" || match.url === "/marketplace/filter/multi"}
			route="/marketplace"
		>
			<Translate i18nKey="HEADER_LINK_MARKETPLACE" />
		</HeaderBarTab>

		<HeaderBarTab match={match.url === "/watchlist"} route="/watchlist">
			<Translate i18nKey="HEADER_LINK_WATCHLIST" />
		</HeaderBarTab>

		<HeaderBarTab
			match={
				match.url === "/bids/activebids"
				|| match.url === "/bids/declinedbids"
			}
			route="/bids/activebids"
		>
			<Translate i18nKey="HEADER_LINK_BIDS" />
		</HeaderBarTab>

		<HeaderBarTab
			match={match.url === "/closeddeals"}
			route="/closeddeals"
		>
			<Translate i18nKey="HEADER_LINK_CLOSED_DEALS" />
		</HeaderBarTab>
	</Fragment>
);

const HeaderBar = ({
	profile, common: { testStageMode, ghostMode }, user, userIsAdmin, match,
}) => {
	const [inviteModalOpen, setInviteModalOpen] = useState(false);
	const [dataLoading, setDataLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0);
	const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);

	useEffect(() => {
		api.notifications.getNotifications()
			.then(({ data }) => {
				if (!data) {
					return;
				}

				data.sort((a, b) => b.id - a.id);
				const notifications = data.filter(item => item.type.name !== "MESSAGE");
				const unseenNotificationsCount = notifications.filter(item => !item.seen).length;
				const unseenMessagesCount = data.filter(item => item.type.name === "MESSAGE").length;

				setDataLoading(false);
				setUnseenMessagesCount(unseenMessagesCount);
				setUnseenNotificationsCount(unseenNotificationsCount);
				setNotifications(notifications);
			});
	}, []);

	const toggleInviteModalOpen = () => setInviteModalOpen(!inviteModalOpen);

	const markMessagesAsSeen = () => {
		setUnseenMessagesCount(0);
		if (unseenMessagesCount && !ghostMode) {
			api.notifications.markMessagesAsSeen();
		}
	};

	return (
		<div className="v1 skin">
			{testStageMode && (
				<div className="header-bar-test-mode">
					<Translate i18nKey="HEADER_TEST_STAGE_MODE" />
				</div>
			)}

			{ghostMode && (
				<div className="header-bar-ghost-mode">
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

			<div className="header-bar">
				<a href="/marketplace" className="header-bar-logo">
					<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
				</a>

				{profile === "BUYER" && <HeaderBarBuyer match={match} />}

				{profile === "SELLER" && <HeaderBarSellerCms match={match} />}

				<div className="header-bar-spacer" />

				<div className="header-bar-invite" onClick={toggleInviteModalOpen}>
					<div className="header-bar-invite-icon">+</div>
					<div className="header-bar-invite-text">
						<Translate i18nKey="HEADER_INVITE_USERS" />
					</div>
				</div>

				<div className="header-bar-toggle">
					<Link
						className={`header-bar-toggle-button ${profile === "SELLER" ? "active" : ""}`}
						to={ROUTE_PATHS.PROPERTIES}
					>
						<Translate i18nKey="HEADER_LINK_BUYING_MODE" />
					</Link>
					<Link
						className={`header-bar-toggle-button ${profile === "BUYER" ? "active" : ""}`}
						to="/marketplace"
					>
						<Translate i18nKey="HEADER_LINK_SELLING_MODE" />
					</Link>
				</div>

				<HeaderNotifications
					dataLoading={dataLoading}
					notifications={notifications}
					unseenNotificationsCount={unseenNotificationsCount}
					newHeader
				/>

				<Link
					className="header-bar-common"
					to="/messages"
					onClick={markMessagesAsSeen}
				>
					<i className="icon-inbox" />
					{!!unseenMessagesCount && (
						<div className="counter message-counter">
							{unseenMessagesCount}
						</div>
					)}
				</Link>

				<div className="header-bar-common">
					<i className="fa fa-user" />

					<div className="popup">
						<Link to="/preferences" className="popup-item">
							<i className="fa fa-sliders" />
							<Translate i18nKey="HEADER_LINK_PREFERENCES" />
						</Link>
						<Link to="/settings" className="popup-item">
							<i className="fa fa-cog" />
							<Translate i18nKey="HEADER_LINK_SETTINGS" />
						</Link>
						<a href="https://landing.contentarena.com/web/faq/" className="popup-item">
							<i className="fa fa-question-circle-o" />
							<Translate i18nKey="HEADER_LINK_FAQ" />
						</a>
						<a href="/logout" className="popup-item">
							<i className="fa fa-sign-out" />
							<Translate i18nKey="HEADER_LINK_LOGOUT" />
						</a>
						{userIsAdmin && (
							<a href="/admin" className="popup-item">
								<i className="fa fa-cog" />
								Admin
							</a>
						)}
					</div>
				</div>
			</div>
			<InviteUsersModal
				isOpen={inviteModalOpen}
				onCloseModal={toggleInviteModalOpen}
			/>
		</div>
	);
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
