import request from "../common/request";
import { API_ENDPOINTS } from "./endpoints";

const propertiesApi = {
	fetchProperties: data => request.post(API_ENDPOINTS.PROPERTIES_ALL, data),
	fetchProperty: data => request.post(API_ENDPOINTS.PROPERTIES_DETAIL, data),
	createProperty: data => request.post(API_ENDPOINTS.PROPERTIES_CREATE, data),

};


export default propertiesApi;
