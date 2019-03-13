import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const companyApi = {
	inviteUsers: data => request.post(API_ENDPOINTS.COMPANY_INVITE_USERS, data),
};


export default companyApi;
