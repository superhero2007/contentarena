import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const notificationsApi = {
	getNotifications: data => request.post(API_ENDPOINTS.NOTIFICATIONS_GET_ALL, data),
	markNotificationAsVisited: data => request.post(API_ENDPOINTS.NOTIFICATIONS_MARK_VISITED, data),
	markAllNotificationAsVisited: data => request.post(API_ENDPOINTS.NOTIFICATIONS_MARK_ALL_VISITED, data),
	removeNotifications: data => request.post(API_ENDPOINTS.NOTIFICATIONS_REMOVE, data),
	markNotificationAsSeen: data => request.post(API_ENDPOINTS.NOTIFICATIONS_MARK_SEEN, data),
	markMessagesAsSeen: data => request.post(API_ENDPOINTS.NOTIFICATIONS_MESSAGE_SEEN, data),
};

export default notificationsApi;
