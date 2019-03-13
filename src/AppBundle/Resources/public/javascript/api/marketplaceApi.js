import request from "../common/request";
import { API_ENDPOINTS } from "./endpoints";

const marketplaceApi = {
	fetchListings: data => request.post(API_ENDPOINTS.MARKETPLACE_LISTINGS, data),
};


export default marketplaceApi;
