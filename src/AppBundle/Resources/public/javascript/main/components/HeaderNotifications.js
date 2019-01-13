import React from 'react';
import cn from 'classnames';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TIME_FORMAT } from "@constants";

class HeaderNotifications extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            dataLoading: true,
            notifications: [],
            isMoreThanFive: false,
            seeAll: false,
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
        return '';
    };

    getCreatedTime = (createdAt) =>  moment(createdAt).format(TIME_FORMAT);
    handleShowAllNotifications = () => this.setState({seeAll: true});
    handleShowNotificationList = () => this.setState({showList: true});
    handleHideNotificationList = () => this.setState({showList: false, seeAll: false});

    render(){
        const { notifications, dataLoading, unseenNotificationsCount, isMoreThanFive, seeAll, showList } = this.state;

        let notificationList = [...notifications];
        if (isMoreThanFive && !seeAll) {
            notificationList.length = 5;
        }

        return(
            <div className='notifications'
                 onMouseOver={this.handleShowNotificationList}
                 onMouseLeave={this.handleHideNotificationList}>

                <i className="fa fa-bell" title='Notifications' />
                {!!unseenNotificationsCount && <div className='counter'>{unseenNotificationsCount}</div>}
                {showList && <div className='expanded-list'>
                    <div className='items'>
                        {dataLoading && <div className='item loading'>{this.context.t("NOTIFICATIONS_LOADING")}</div>}
                        {!dataLoading && notificationList.map((item) => {
                            const { id, seen, text, createdAt } = item;
                            return (
                                <div key={`notification-${id}`}
                                     className={cn('item', {'unread': !seen })}
                                     onClick={() => this.onNotificationClicked(item)}>
                                        <span>{text}</span>
                                        {createdAt && <span className="notification-time">{`${this.getPassedTime(createdAt)} - ${this.getCreatedTime(createdAt)}`}</span>}
                                </div>
                            );
                        })}
                        {isMoreThanFive && !seeAll &&
                            (<div className='item see-all-notifications'
                                 onClick={this.handleShowAllNotifications}>
                                {this.context.t("NOTIFICATIONS_SEE_ALL")}
                            </div>)
                        }
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

    onNotificationClicked = (item) => {
        const typeName = item.type.name;
        if (typeName === 'MESSAGE') {
            ContentArena.Api.markNotificationAsSeen(item.id);
            document.location.href = `/messages/${item.referenceId}`
        }
    };

    loadNotifications() {
        ContentArena.Api.getNotifications().then(({data}) => {
            if ( data === undefined ) return;

            data.sort((a, b) => b.id - a.id);
            // should be sort by createdAt after add this props
            // suppose that each notification has createdAt property

            const uniqNotifications = uniqBy(data, 'referenceId');
            const unseenNotificationsCount = uniqNotifications.filter(item => !item.seen).length;
            const isMoreThanFive = uniqNotifications.length > 5;

            this.setState({
                dataLoading: false,
                unseenNotificationsCount,
                isMoreThanFive,
                notifications: uniqNotifications
            });
        });
    }
}

HeaderNotifications.contextTypes = {
    t: PropTypes.func.isRequired
};

export default HeaderNotifications;

