import React from 'react';
import cn from 'classnames';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

class HeaderNotofications extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            dataLoading: true,
            notifications: []
        }
    }

    componentDidMount() {
        this.loadNotifications();
    }

    render(){
        const { notifications, dataLoading, unseenNotificationsCount } = this.state;
        const nCount = notifications.length;

        return(
            <div className='notifications'>
                <i className="fa fa-bell" title='Notifications' />
                {!!unseenNotificationsCount && <div className='counter'>{unseenNotificationsCount}</div>}
                <div className='expanded-list'>
                    <div className='caption'>{dataLoading ? 'Loading notifications...' : 'Notifications'}</div>
                    {!dataLoading && !!nCount && (
                        <div className='items'>
                            {notifications.map((item) => {
                                const { id, seen, text } = item;
                                return (
                                    <div
                                         key={`notification-${id}`}
                                         className={cn('item', {'unread': !seen })}
                                         onClick={this.onNotificationClicked.bind(this, item)}
                                    >
                                        {text}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {!dataLoading && !nCount && (
                        <div className='no-notifications'>
                            {this.context.t("NOTIFICATIONS_EMPTY")}
                        </div>
                    )}
                </div>
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
            data.sort((a, b) => {
                return b.id - a.id;
            });

            const uniqNotifications = uniqBy(data, 'referenceId');
            const unseenNotificationsCount = uniqNotifications.filter(item => !item.seen).length;

            this.setState({
                dataLoading: false,
                unseenNotificationsCount,
                notifications: uniqNotifications
            });
        });
    }
}

export default HeaderNotofications;

