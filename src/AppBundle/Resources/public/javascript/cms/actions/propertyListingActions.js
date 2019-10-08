import { propertyListingTypes } from "../reducers/propertyListing";

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
