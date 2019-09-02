import { contentType } from "../reducers/content";
import { scrollMainContainer } from "../../common/utils/listing";
import { propertyDetailsTypes } from "../../cms/reducers/propertyDetails";
import api from "../../api";

export const scrollTopMainContent = () => {
	const mainContent = document.querySelectorAll("body > .main-content")[0];

	if (mainContent) {
		mainContent.scrollIntoView();
	}
};

export const updateStep = (step) => {
	scrollTopMainContent();
	scrollMainContainer();
	return {
		type: contentType.UPDATE_STEP,
		step,
	};
};

export const updateContentValue = (key, value) => ({
	type: "UPDATE_CONTENT_VALUE",
	key,
	value,
});

export const listingEdited = () => ({ type: contentType.LISTING_EDITED });
export const listingSaved = () => ({ type: contentType.LISTING_SAVED });

export const updateListing = data => ({
	type: contentType.UPDATE_LISTING,
	data,
});

export const saveListingRequest = () => ({
	type: contentType.SAVE_LISTING,
});

export const listingRequest = () => ({
	type: contentType.LISTING_REQUEST,
});

export const listingRequestSuccess = data => ({
	type: contentType.LISTING_REQUEST_SUCCESS,
	data,
});

export const listingRequestFail = error => ({
	type: contentType.LISTING_REQUEST_FAIL,
	error,
});

export const saveListing = listing => async (dispatch) => {
	dispatch(saveListingRequest());
	try {
		const { data } = await api.listing.saveListing(listing);
		dispatch(listingRequestSuccess(data));
		return data;
	} catch (error) {
		dispatch(listingRequestFail(error));
	}
};

export const getListingDetails = customId => async (dispatch) => {
	dispatch(saveListingRequest());
	try {
		const { data } = await api.listing.getListingDetails(customId);
		dispatch(listingRequestSuccess(data));
		return data;
	} catch (error) {
		dispatch(listingRequestFail(error));
	}
};
