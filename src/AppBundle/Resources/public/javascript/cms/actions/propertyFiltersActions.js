import { propertyFiltersTypes } from "../reducers/propertyFilters";


export const setRights = rights => ({
	type: propertyFiltersTypes.SET_RIGHTS,
	rights,
});

export const setSeasons = seasons => ({
	type: propertyFiltersTypes.SET_SEASONS,
	seasons,
});

export const setRegions = regions => ({
	type: propertyFiltersTypes.SET_REGIONS,
	regions,
});
