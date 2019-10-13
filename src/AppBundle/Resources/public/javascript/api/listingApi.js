import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const listingApi = {
	saveListing: data => request.post(API_ENDPOINTS.LISTING_SAVE, data),
	getPropertyListingDetails: customId => request.post(API_ENDPOINTS.PROPERTY_LISTING_DETAILS, { customId }),
	getListingDetails: customId => request.post(API_ENDPOINTS.LISTING_DETAILS, { customId }),
	getCreateListingDetails: customId => request.post(API_ENDPOINTS.CREATE_LISTING_DETAILS, { customId }),
};


export default listingApi;
