import { propertyListingTypes } from "../reducers/propertyListing";
import api from "../../api";

export const setListingRights = rights => ({
	type: propertyListingTypes.SET_PROPERTY_LISTING_RIGHTS,
	rights,
});

export const setListingSeasons = seasons => ({
	type: propertyListingTypes.SET_PROPERTY_LISTING_SEASONS,
	seasons,
});

export const setListingTerritories = territories => ({
	type: propertyListingTypes.SET_PROPERTY_LISTING_TERRITORIES,
	territories,
});

export const setListingPrograms = programs => ({
	type: propertyListingTypes.SET_PROPERTY_LISTING_PROGRAMS,
	programs,
});

export const updateListing = data => ({
	type: propertyListingTypes.UPDATE_PROPERTY_LISTING,
	data,
});

export const listingEdited = () => ({ type: propertyListingTypes.PROPERTY_LISTING_EDITED });
export const listingSaved = () => ({ type: propertyListingTypes.PROPERTY_LISTING_SAVED });

export const saveListingRequest = () => ({
	type: propertyListingTypes.SAVE_PROPERTY_LISTING,
});

export const listingRequest = () => ({
	type: propertyListingTypes.PROPERTY_LISTING_REQUEST,
});

export const listingRequestSuccess = data => ({
	type: propertyListingTypes.PROPERTY_LISTING_REQUEST_SUCCESS,
	data,
});

export const listingRequestFail = error => ({
	type: propertyListingTypes.PROPERTY_LISTING_REQUEST_FAIL,
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
	dispatch(listingRequest());
	try {
		const { data } = await api.listing.getPropertyListingDetails(customId);
		dispatch(listingRequestSuccess(data));
		return data;
	} catch (error) {
		dispatch(listingRequestFail(error));
	}
};

export const getCreateListingDetails = customId => async (dispatch) => {
	dispatch(listingRequest());
	try {
		const { data } = await api.listing.getCreateListingDetails(customId);
		dispatch(listingRequestSuccess(data));
		return data;
	} catch (error) {
		dispatch(listingRequestFail(error));
	}
};
