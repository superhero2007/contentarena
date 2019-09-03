import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const listingApi = {
	saveListing: data => request.post(API_ENDPOINTS.LISTING_SAVE, data),
	getListingDetails: customId => request.post(API_ENDPOINTS.LISTING_DETAILS, { customId }),
};


export default listingApi;
