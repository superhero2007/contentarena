import request from "../common/request";
import { API_ENDPOINTS } from "./endpoints";

const shareApi = {
	shareListing: data => request.post(API_ENDPOINTS.SHARE_LISTING, data),
};


export default shareApi;
