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

export const removeNewSport = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "sports",
	clean: ["tournament", "sportCategory", "seasons"],
});

export const removeNewTournament = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "tournament",
	clean: ["seasons"],
});

export const removeNewCategory = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "sportCategory",
	clean: ["tournament", "seasons"],
});

export const removeNewSeason = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "seasons",
});

export const selectTournament = tournament => ({
	type: "SELECT_PROPERTY_TOURNAMENT",
	tournament,
});
