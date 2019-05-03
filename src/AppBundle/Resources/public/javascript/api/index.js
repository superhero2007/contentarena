import request from "../common/request";

const api = {
	fetchMarketplaceListings: (data = {}, method = "POST") => request({
		data,
		method,
		url: "api/marketplace/listings",
	}),
	postShareListing: data => request({
		data,
		method: "POST",
		url: "api/share/listing",
	}),
};

export default api;
