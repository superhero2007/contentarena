import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const propertiesApi = {
	fetchProperties: data => request.post(API_ENDPOINTS.PROPERTIES_ALL, data),
	fetchProperty: data => request.post(API_ENDPOINTS.PROPERTIES_DETAIL, data),
	createProperty: data => request.post(API_ENDPOINTS.PROPERTIES_CREATE, data),
	updateProperty: data => request.post(API_ENDPOINTS.PROPERTIES_UPDATE, data),
	addDeals: data => request.post(API_ENDPOINTS.PROPERTIES_ADD_DEALS, data),
	getDefinitions: data => request.post(API_ENDPOINTS.PROPERTY_DEFINITIONS, data),
};

export default propertiesApi;
