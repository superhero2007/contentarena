import { propertyTypes } from "../reducers/property";

export const setConfig = config => ({
	type: propertyTypes.SET_PROPERTY_CONFIG,
	config,
});

export const setCustomSportName = (index, sportName) => ({
	type: propertyTypes.SET_CUSTOM_SPORT_NAME,
	index,
	sportName
});

export const setCustomSportCategoryName = (index, sportCategoryName) => ({
	type: propertyTypes.SET_CUSTOM_SPORT_CATEGORY_NAME,
	index,
	sportCategoryName
});

export const setCustomTournamentName = (index, tournamentName) => ({
	type: propertyTypes.SET_CUSTOM_TOURNAMENT_NAME,
	index,
	tournamentName
});

export const setCustomSeasonName = (index, seasonName) => ({
	type: propertyTypes.SET_CUSTOM_SEASON_NAME,
	index,
	seasonName
});
