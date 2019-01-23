import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TIME_FORMAT } from "@constants";

class HeaderNotifications extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            dataLoading: true,
            notifications: [],
            showList: false
        }
    }

    componentDidMount(){
        this.loadNotifications();
    }

    getPassedTime = (createdAt) => {
        const days = moment.utc().diff(moment(createdAt), "days");

        if (days && days <= 30) {
            return `${days}d`;
        } else if (!days){
            const times = moment.utc().diff(moment(createdAt), "hours");
            return `${times}h`
        } else {
            const months = moment.utc().diff(moment(createdAt), "month");
            return `${months}m`;
        }
    };

    getRedirectUrl = (type, id) => {
        const notifications = {
            SELLER_LISTING_APPROVED: (id) => `/listing/${id}`,
            SELLER_LISTING_EXPIRING: (id) => `/contentlisting/${id}/4/`,
            SELLER_LISTING_EXPIRED: () => `/managelistings`,
            SELLER_LISTING_DEACTIVATED: () => `/managelistings`,
            SELLER_BID_RECEIVED: (id) => `/commercialoverview/filter/${id}&openbids`,
            SELLER_BID_CLOSED: (id) => `/commercialoverview/filter/${id}&closeddeals`,
            SELLER_BID_ACCEPTED: (id) => `/commercialoverview/filter/${id}&closeddeals`,
            SELLER_LISTING_SOLD: (id) => `/commercialoverview/filter/${id}&closeddeals`,
            MESSAGE: (id) => `/messages/${id}`,
            BUYER_LISTING_MATCH: () => (id) => `/listing/${id}`,
            BUYER_BID_CLOSED: () => `closeddeals`,
            BUYER_BID_DECLINED: () => `/bids/declinedbids`,
            BUYER_BID_PLACED: () => `/bids/activebids`
        };

        return notifications[type]();
    };

    handleNotificationClick = (item) => {
        const { name } = item.type;
        const urlTo = this.getRedirectUrl(name, item.referenceId);

        if (urlTo) {
            ContentArena.Api.markNotificationAsSeen(item.id);
            document.location.href = urlTo;
        }
    };

    getCreatedTime = (createdAt) =>  moment(createdAt).format(TIME_FORMAT);
    isDateValid = (createdAt) => moment(createdAt).isValid();
    handleShowNotificationList = () => this.setState({showList: true});
    handleHideNotificationList = () => this.setState({showList: false});

    render(){
        const { notifications, dataLoading, unseenNotificationsCount, showList } = this.state;
        return(
            <div className='notifications'
                 onMouseOver={this.handleShowNotificationList}
                 onMouseLeave={this.handleHideNotificationList}>

                <i className="fa fa-bell" title='Notifications' />
                {!!unseenNotificationsCount && <div className='counter'>{unseenNotificationsCount}</div>}
                {showList && <div className='expanded-list'>
                    <div className='items'>
                        {dataLoading && <div className='item loading'>{this.context.t("NOTIFICATIONS_LOADING")}</div>}
                        {!dataLoading && notifications.map((item) => {
                            const { id, text, createdAt } = item;
                            return (
                                <div
                                    key={`notification-${id}`}
                                    className='item'
                                    onClick={() => this.handleNotificationClick(item)}>
                                        <span>{text}</span>

                                        {createdAt && this.isDateValid(createdAt) &&
                                            (<span className="notification-time">{`${this.getPassedTime(createdAt)} - ${this.getCreatedTime(createdAt)}`}</span>)
                                        }
                                </div>
                            );
                        })}
                    </div>
                    {!dataLoading && !notifications.length && (
                        <div className='no-notifications'>
                            {this.context.t("NOTIFICATIONS_EMPTY")}
                        </div>
                    )}
                </div>}
            </div>
        )
    }

    loadNotifications() {
        ContentArena.Api.getNotifications().then(({data}) => {
            if ( data === undefined ) return;

            data.sort((a, b) => b.id - a.id);
            const unseenNotificationsCount = data.filter(item => !item.seen).length;

            this.setState({
                dataLoading: false,
                unseenNotificationsCount,
                notifications: data
            });
        });
    }
}

HeaderNotifications.contextTypes = {
    t: PropTypes.func.isRequired
};

export default HeaderNotifications;

