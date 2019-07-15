import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import moment from "moment";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader";
import { getListingImage } from "../../common/utils/listing";
import api from "../../api";

class HeaderNotifications extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataLoading: props.dataLoading,
			notifications: props.notifications,
			unseenNotificationsCount: props.unseenNotificationsCount,
			showList: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.dataLoading !== nextProps.dataLoading) {
			this.setState({
				dataLoading: nextProps.dataLoading,
			});
		}

		if (this.props.notifications !== nextProps.notifications) {
			this.setState({
				notifications: nextProps.notifications,
			});
		}

		if (this.props.unseenNotificationsCount !== nextProps.unseenNotificationsCount) {
			this.setState({
				unseenNotificationsCount: nextProps.unseenNotificationsCount,
			});
		}
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleHideNotificationList);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleHideNotificationList);
	}

	getPassedTime = (createdAt) => {
		if (!createdAt || !this.isDateValid(createdAt)) return "";

		const days = moment.utc().diff(moment(createdAt), "days");
		if (days && days <= 6) return `${days}d`;
		if (days && days > 6 && days <= 28) return `${Math.floor(days / 7)}w`;

		const minutes = moment.utc().diff(moment(createdAt), "minutes");
		if (minutes >= 0 && minutes <= 5) return "Just now";
		if (minutes >= 6 && minutes <= 59) return `${minutes}min`;

		const hours = moment.utc().diff(moment(createdAt), "hours");
		if (hours && hours <= 24) return `${hours}h`;

		const months = moment.utc().diff(moment(createdAt), "month");
		return `${months}m`;
	};

	getRedirectUrl = (type, id = "") => {
		const notifications = {
			SELLER_LISTING_APPROVED: id => `/listing/${id}`,
			SELLER_LISTING_EXPIRING: id => `/contentlisting/${id}/4/`,
			SELLER_LISTING_EXPIRED: () => "/managelistings",
			SELLER_LISTING_DEACTIVATED: () => "/managelistings",
			SELLER_BID_RECEIVED: id => `/commercialoverview/filter/${id}&openbids`,
			SELLER_BID_CLOSED: id => `/commercialoverview/filter/${id}&closeddeals`,
			SELLER_BID_ACCEPTED: id => `/commercialoverview/filter/${id}&closeddeals`,
			SELLER_LISTING_SOLD: id => `/commercialoverview/filter/${id}&closeddeals`,
			MESSAGE: id => `/messages/${id}`,
			BUYER_LISTING_MATCH: id => `/listing/${id}`,
			BUYER_BID_CLOSED: () => "/closeddeals",
			BUYER_BID_DECLINED: () => "/bids/declinedbids",
			BUYER_BID_PLACED: () => "/bids/activebids",
			BUYER_BID_ACCEPTED: () => "/closeddeals",
		};

		return notifications[type](id);
	};

	handleNotificationClick = (item) => {
		const { common: { ghostMode } } = this.props;
		const { name } = item.type;
		const urlTo = this.getRedirectUrl(name, item.referenceId);

		if (urlTo) {
			if (!ghostMode) api.notifications.markNotificationAsVisited({ id: item.id });
			document.location.href = urlTo;
		}

		this.setState({
			showList: false,
			unseenNotificationsCount: 0,
		});
	};

	isClickedOnBellIcon = element => this.bell === element;

	isDateValid = createdAt => moment(createdAt).isValid();

	handleBellIconClick = () => {
		const { showList, notifications, unseenNotificationsCount } = this.state;
		const { common: { ghostMode } } = this.props;

		if (!showList && !!notifications.length && unseenNotificationsCount) {
			if (!ghostMode) api.notifications.markNotificationAsSeen();

			this.setState(state => ({
				showList: !state.showList,
				unseenNotificationsCount: 0,
			}));
		} else {
			this.setState(state => ({
				showList: !state.showList,
			}));
		}
	};

	hasUnvisitedNotifications = () => {
		const { notifications } = this.state;
		return !!notifications.length && notifications.some(item => !item.visited);
	};

	handleAllVisited = () => {
		const { notifications } = this.state;
		const { common: { ghostMode } } = this.props;

		if (!ghostMode) api.notifications.markAllNotificationAsVisited();

		const allVisited = notifications.map((item) => {
			item.visited = true;
			return item;
		});

		this.setState({
			notifications: allVisited,
		});
	};

	handleRemoveNotifications = () => {
		const { common: { ghostMode } } = this.props;

		if (!ghostMode) api.notifications.removeNotifications();

		this.setState({
			notifications: 0,
			unseenNotificationsCount: 0,
		});
	};

	handleHideNotificationList = (e) => {
		const { showList } = this.state;

		if (showList && !this.expandedList.contains(e.target) && !this.isClickedOnBellIcon(e.target.parentElement)) {
			this.setState({
				showList: false,
			});
		}
	};

	render() {
		const {
			notifications, dataLoading, unseenNotificationsCount, showList,
		} = this.state;
		return (
			<div className="notifications">
				<div className="icon-bell-wrapper" onClick={this.handleBellIconClick} ref={bell => this.bell = bell}>
					<i className="fa fa-bell" title="Notifications" />
					{!!unseenNotificationsCount
						&& <div className="counter">{unseenNotificationsCount}</div>
					}
				</div>

				{showList && (
					<section className="expanded-list" ref={list => this.expandedList = list}>
						<header className="notification-header">
							<span className="title"><Translate i18nKey="NOTIFICATIONS_HEADER" /></span>
							{this.hasUnvisitedNotifications() && (
								<span className="mark-all-read" onClick={this.handleAllVisited}>
									<Translate i18nKey="NOTIFICATIONS_MARK_ALL_READ" />
								</span>
							)}
						</header>
						{dataLoading
							&& (
								<div className="loader-wrapper">
									<Loader loading xSmall />
								</div>
							)
						}
						{!dataLoading && !notifications.length && (
							<div className="no-notifications">
								<i className="fa fa-bell-o" />
								<span><Translate i18nKey="NOTIFICATIONS_EMPTY" /></span>
							</div>
						)}
						{!dataLoading && !!notifications.length
							&& (
								<div className="items">
									{notifications.map((item) => {
										const {
											id, text, visited, createdAt,
										} = item;
										const time = this.getPassedTime(createdAt);
										return (
											<div
												key={`notification-${id}`}
												className={cn("item", { unread: !visited })}
												onClick={() => this.handleNotificationClick(item)}
											>
												<div className="notification-img">
													{getListingImage(item)}
												</div>
												<div className="notification-text">
													<span title={text}>{text}</span>
													<span title={time} className="time">{time}</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						{!dataLoading && !!notifications.length
							&& (
								<div className="clear-notification-wrapper">
									<span onClick={this.handleRemoveNotifications}>
										<Translate i18nKey="NOTIFICATIONS_CLEAR_ALL" />
									</span>
								</div>
							)
						}
					</section>
				)}
			</div>
		);
	}
}

HeaderNotifications.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	common: state.common,
});

export default connect(
	mapStateToProps,
	null,
)(HeaderNotifications);
