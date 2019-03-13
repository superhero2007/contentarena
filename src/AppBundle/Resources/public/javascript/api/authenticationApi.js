import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const authenticationApi = {
	preRegisterUser: data => request.post(API_ENDPOINTS.AUTHENTICATION_PRE_REGISTER, data),
};

export default authenticationApi;
