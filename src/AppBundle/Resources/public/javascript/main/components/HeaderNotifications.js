import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import moment from "moment";
import { TIME_FORMAT } from "@constants";

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

	componentWillReceiveProps(nextProps, nextContext) {
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
		const days = moment.utc().diff(moment(createdAt), "days");

		if (days && days <= 30) {
			return `${days}d`;
		}
		if (!days) {
			const times = moment.utc().diff(moment(createdAt), "hours");
			return `${times}h`;
		}
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
		const { name } = item.type;
		const urlTo = this.getRedirectUrl(name, item.referenceId);

		if (urlTo) {
			ContentArena.Api.markNotificationAsVisited(item.id);
			document.location.href = urlTo;
		}

		if (this.state.unseenNotificationsCount) {
			ContentArena.Api.markNotificationAsSeen();
		}

		this.setState({
			showList: false,
			unseenNotificationsCount: 0,
		});
	};

	isClickedOnBellIcon = element => this.bell === element;

	getCreatedTime = createdAt => moment(createdAt).format(TIME_FORMAT);

	isDateValid = createdAt => moment(createdAt).isValid();

	handleBellIconClick = () => this.setState(state => ({ showList: !state.showList }));

	handleHideNotificationList = (e) => {
		const { showList, unseenNotificationsCount } = this.state;

		if (showList && this.list && !this.list.contains(e.target) && !this.isClickedOnBellIcon(e.target.parentElement)) {
			if (unseenNotificationsCount) {
				ContentArena.Api.markNotificationAsSeen();
			}
			this.setState({
				showList: false,
				unseenNotificationsCount: 0,
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
					<div className="expanded-list">
						<div className="items" ref={list => this.list = list}>
							{dataLoading
							&& <div className="item loading">{this.context.t("NOTIFICATIONS_LOADING")}</div>}
							{!dataLoading && notifications.map((item) => {
								const {
									id, text, visited, createdAt,
								} = item;
								return (
									<div
										key={`notification-${id}`}
										className={cn("item", { unread: !visited })}
										onClick={() => this.handleNotificationClick(item)}
									>
										<span>{text}</span>

										{createdAt && this.isDateValid(createdAt)
										&& (
											<span
												className="notification-time"
											>
												{`${this.getPassedTime(createdAt)} - ${this.getCreatedTime(createdAt)}`}
											</span>
										)
										}
									</div>
								);
							})}
						</div>
						{!dataLoading && !notifications.length && (
							<div className="no-notifications">
								{this.context.t("NOTIFICATIONS_EMPTY")}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

HeaderNotifications.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default HeaderNotifications;
