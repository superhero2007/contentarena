import { propertyTypes } from "../reducers/property";
import { propertyDetailsTypes } from "../reducers/propertyDetails";
import RightDefaults from "../../sell/components/RightDefaults";
import api from "../../api";

export const setConfig = config => ({
	type: propertyTypes.SET_PROPERTY_CONFIG,
	config,
});

export const setCustomSportName = (index, sportName) => ({
	type: propertyTypes.SET_CUSTOM_SPORT_NAME,
	index,
	sportName,
});

export const setCustomSportCategoryName = (index, sportCategoryName) => ({
	type: propertyTypes.SET_CUSTOM_SPORT_CATEGORY_NAME,
	index,
	sportCategoryName,
});

export const setCustomTournamentName = (index, tournamentName) => ({
	type: propertyTypes.SET_CUSTOM_TOURNAMENT_NAME,
	index,
	tournamentName,
});

export const setCustomSeasonName = (index, seasonName) => ({
	type: propertyTypes.SET_CUSTOM_SEASON_NAME,
	index,
	seasonName,
});

export const addCustomSeason = () => ({
	type: propertyTypes.ADD_CUSTOM_SEASON,
});

export const setFocusSeason = isFocus => ({
	type: propertyTypes.CAN_FOCUS_SEASON,
	isFocus,
});

export const setRights = rights => ({
	type: propertyTypes.SET_RIGHTS,
	rights,
});

export const setSelectedRights = selectedRights => ({
	type: propertyTypes.SET_SELECTED_RIGHTS,
	selectedRights,
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

export const fetchTerritoriesSuccess = territories => ({
	type: propertyTypes.GET_TERRITORIES_SUCCESS,
	territories,
});

export const fetchPropertySuccess = propertyDetail => ({
	type: propertyDetailsTypes.GET_PROPERTY_SUCCESS,
	propertyDetail,
});

export const fetchPropertyFail = error => ({
	type: propertyDetailsTypes.GET_PROPERTY_FAIL,
	error,
});

export const updatedPropertyRights = rights => ({
	type: propertyDetailsTypes.UPDATE_PROPERTY_RIGHTS,
	rights,
});

export const startFetchingPropertyDetails = () => ({
	type: propertyDetailsTypes.START_FETCHING,
});

export const fetchTerritories = () => async (dispatch) => {
	if (ContentArena.Data.Territories.length === 0) {
		try {
			const territories = await ContentArena.Api.getTerritories();
			ContentArena.Data.Territories = territories;
			dispatch(fetchTerritoriesSuccess(territories));
			return territories;
		} catch (error) {
			throw error.response;
		}
	} else {
		Promise((resolve) => {
			resolve(
				dispatch(fetchRegionsSuccess(ContentArena.Data.Territories)),
			);
		});
	}
};

export const fetchCountriesSuccess = countries => ({
	type: propertyTypes.GET_COUNTRIES_SUCCESS,
	countries,
});

export const fetchCountries = () => async (dispatch) => {
	try {
		const countries = await ContentArena.Api.getCountries();
		dispatch(fetchCountriesSuccess(countries));
		return countries;
	} catch (error) {
		throw error.response;
	}
};

export const fetchRegionsSuccess = regions => ({
	type: propertyTypes.GET_REGIONS_SUCCESS,
	regions,
});

export const fetchRegions = () => async (dispatch) => {
	if (ContentArena.Data.Regions.length === 0) {
		try {
			const regions = await ContentArena.Api.getRegions();
			ContentArena.Data.Regions = regions;
			dispatch(fetchRegionsSuccess(regions));
			return regions;
		} catch (error) {
			throw error.response;
		}
	} else {
		Promise((resolve) => {
			resolve(
				dispatch(fetchRegionsSuccess(ContentArena.Data.Regions)),
			);
		});
	}
};

export const fetchPropertyDetails = propertyId => async (dispatch) => {
	dispatch(startFetchingPropertyDetails());
	try {
		const { data: { property } } = await api.properties.fetchProperty({ propertyId });
		for (const value of property.rights) {
			value.selectedRights = Object.assign({}, RightDefaults);
		}
		dispatch(fetchPropertySuccess(property));
		return property;
	} catch (error) {
		dispatch(fetchPropertyFail(error));
	}
};
