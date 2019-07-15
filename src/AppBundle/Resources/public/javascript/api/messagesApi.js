import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const messagesApi = {
	getThreads: data => request.post(API_ENDPOINTS.MESSAGES_GET_THREADS, data),
};


export default messagesApi;
