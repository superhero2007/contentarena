import { marketplaceTypes } from "../reducers/marketplace";
import api from "../../api";
import { contentParserFromServer } from "../../common/utils/listing";

const fetchListingRequest = () => ({
	type: marketplaceTypes.FETCH_LISTING_REQUEST,
});

const fetchListingRequestSuccess = ({ listings, totalItems }) => ({
	type: marketplaceTypes.FETCH_LISTING_SUCCESS,
	listings,
	totalItems,
});

const fetchListingRequestFailure = error => ({
	type: marketplaceTypes.FETCH_LISTING_ERROR,
	error,
});

export const fetchListings = (filter, method) => async (dispatch) => {
	try {
		dispatch(fetchListingRequest());
		const res = await api.fetchMarketplaceListings(filter, method);
		dispatch(
			fetchListingRequestSuccess({
				listings: res.data.listings.map(listing => contentParserFromServer(listing)),
				totalItems: res.data.totalItems,
			}),
		);
		return res;
	} catch (error) {
		dispatch(fetchListingRequestFailure(error.response));
		throw error.response;
	}
};
