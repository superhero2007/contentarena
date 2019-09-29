import { propertyFiltersTypes } from "../reducers/propertyFilters";


export const setRights = rights => ({
	type: propertyFiltersTypes.SET_FILTER_RIGHTS,
	rights,
});

export const setSeasons = seasons => ({
	type: propertyFiltersTypes.SET_FILTER_SEASONS,
	seasons,
});

export const setRegions = regions => ({
	type: propertyFiltersTypes.SET_FILTER_REGIONS,
	regions,
});

export const setStatus = statuses => ({
	type: propertyFiltersTypes.SET_FILTER_STATUS,
	statuses,
});

export const setListings = listings => ({
	type: propertyFiltersTypes.SET_FILTER_LISTINGS,
	listings,
});

export const setCountries = countries => ({
	type: propertyFiltersTypes.SET_FILTER_COUNTRIES,
	countries,
});

export const setPrograms = programs => ({
	type: propertyFiltersTypes.SET_FILTER_PROGRAMS,
	programs,
});

export const setProgramYears = programYears => ({
	type: propertyFiltersTypes.SET_FILTER_PROGRAM_YEARS,
	programYears,
});
