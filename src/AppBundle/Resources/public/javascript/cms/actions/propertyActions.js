import { propertyTypes } from "../reducers/property";
import { propertyDetailsTypes } from "../reducers/propertyDetails";
import RightDetailsDefault from "../../common/RightDetailsDefault";
import api from "../../api";

export const setConfig = config => ({
	type: propertyTypes.SET_PROPERTY_CONFIG,
	config,
});

export const resetProperty = () => ({
	type: propertyTypes.RESET_PROPERTY,
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

export const storePropertyData = (key, value) => ({
	type: propertyTypes.STORE_PROPERTY_DATA,
	key,
	value,
});

export const addCustomSeason = () => ({
	type: propertyTypes.ADD_CUSTOM_SEASON,
});

export const removeCustomSeason = index => ({
	type: propertyTypes.REMOVE_CUSTOM_SEASON,
	index,
});

export const updateCustomSeason = (index, key, value) => ({
	type: propertyTypes.UPDATE_CUSTOM_SEASON,
	index,
	key,
	value,
});

export const setFocusSeason = isFocus => ({
	type: propertyTypes.CAN_FOCUS_SEASON,
	isFocus,
});

export const setRights = rights => ({
	type: propertyTypes.SET_RIGHTS,
	rights,
});

export const setSeasons = seasons => ({
	type: propertyTypes.SET_SEASONS,
	seasons,
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

export const updateRightDetails = (key, value) => (dispatch, getState) => {
	dispatch(updateSinglePropertyByKeyValue(key, value));
	const property = getState().propertyDetails.property;
	dispatch(updateProperty(property));
};

export const updateSinglePropertyByKeyValue = (key, value) => ({
	type: propertyDetailsTypes.UPDATE_SINGLE_PROPERTY,
	key,
	value,
});

export const startFetchingPropertyDetails = () => ({
	type: propertyDetailsTypes.START_FETCHING,
});

export const fetchTerritories = () => async (dispatch, getState) => {
	if (getState().property.territories.length) return;
	try {
		const territories = await ContentArena.Api.getTerritories();
		dispatch(fetchTerritoriesSuccess(territories));
		return territories;
	} catch (error) {
		throw error.response;
	}
};

export const fetchCountriesSuccess = countries => ({
	type: propertyTypes.GET_COUNTRIES_SUCCESS,
	countries,
});

export const fetchCountries = () => async (dispatch, getState) => {
	if (getState().property.countries.length) return;
	try {
		const { data } = await api.common.countriesAll();
		dispatch(fetchCountriesSuccess(data));
		return data;
	} catch (error) {
		throw error.response;
	}
};

export const fetchRegionsSuccess = regions => ({
	type: propertyTypes.GET_REGIONS_SUCCESS,
	regions,
});

export const fetchRegions = () => async (dispatch, getState) => {
	if (getState().property.regions.length) return;
	try {
		const regions = await ContentArena.Api.getRegions();
		dispatch(fetchRegionsSuccess(regions));
		return regions;
	} catch (error) {
		throw error.response;
	}
};

export const fetchPropertyDetails = propertyId => async (dispatch) => {
	dispatch(startFetchingPropertyDetails());
	try {
		const { data: { property } } = await api.properties.fetchProperty({ propertyId });
		for (const value of property.rights) {
			if (!value.details) value.details = Object.assign({}, RightDetailsDefault);
		}
		dispatch(fetchPropertySuccess(property));
		return property;
	} catch (error) {
		dispatch(fetchPropertyFail(error));
	}
};

export const updatePropertyRequest = () => ({
	type: propertyDetailsTypes.UPDATE_PROPERTY,
});

export const updatePropertySuccess = propertyDetail => ({
	type: propertyDetailsTypes.UPDATE_PROPERTY_SUCCESS,
	propertyDetail,
});

export const updatePropertyFail = error => ({
	type: propertyDetailsTypes.UPDATE_PROPERTY_FAIL,
	error,
});

export const updateProperty = updatedProperty => async (dispatch) => {
	dispatch(updatePropertyRequest());
	try {
		const { data: { property } } = await api.properties.updateProperty({ property: updatedProperty });
		dispatch(updatePropertySuccess(property));
		return property;
	} catch (error) {
		dispatch(updatePropertyFail(error));
	}
};


export const addDealsPropertyRequest = () => ({
	type: propertyDetailsTypes.ADD_DEAL_PROPERTY,
});

export const addDealsPropertySuccess = propertyDetail => ({
	type: propertyDetailsTypes.ADD_DEAL_PROPERTY_SUCCESS,
	propertyDetail,
});

export const addDealsPropertyFail = error => ({
	type: propertyDetailsTypes.ADD_DEAL_PROPERTY_FAIL,
	error,
});

export const addDealsProperty = newDeals => async (dispatch) => {
	dispatch(addDealsPropertyRequest());
	try {
		const { data: { deals } } = await api.properties.addDeals({ deals: newDeals });
		dispatch(addDealsPropertySuccess(deals));
		return deals;
	} catch (error) {
		dispatch(addDealsPropertyFail(error));
	}
};


export const createProgramRequest = () => ({
	type: propertyDetailsTypes.CREATE_PROGRAM,
});

export const createProgramSuccess = program => ({
	type: propertyDetailsTypes.CREATE_PROGRAM_SUCCESS,
	program,
});

export const createProgramFail = error => ({
	type: propertyDetailsTypes.CREATE_PROGRAM_FAIL,
	error,
});

export const updateProgramRequest = () => ({
	type: propertyDetailsTypes.UPDATE_PROGRAM,
});

export const updateProgramSuccess = program => ({
	type: propertyDetailsTypes.UPDATE_PROGRAM_SUCCESS,
	program,
});

export const updateProgramFail = error => ({
	type: propertyDetailsTypes.UPDATE_PROGRAM_FAIL,
	error,
});

export const getProgramsRequest = () => ({
	type: propertyDetailsTypes.GET_PROGRAMS,
});

export const getProgramsSuccess = programs => ({
	type: propertyDetailsTypes.GET_PROGRAMS_SUCCESS,
	programs,
});

export const getProgramsFail = error => ({
	type: propertyDetailsTypes.GET_PROGRAMS_FAIL,
	error,
});

export const deleteProgramRequest = () => ({
	type: propertyDetailsTypes.DELETE_PROGRAM,
});

export const deleteProgramSuccess = customId => ({
	type: propertyDetailsTypes.DELETE_PROGRAM_SUCCESS,
	customId,
});

export const deleteProgramFail = error => ({
	type: propertyDetailsTypes.DELETE_PROGRAM_FAIL,
	error,
});

export const createProgram = program => async (dispatch, getState) => {
	dispatch(createProgramRequest());
	try {
		// const { data: { program } } = await api.properties.createProgram({ program });

		dispatch(createProgramSuccess(program));
		const property = getState().propertyDetails.property;
		dispatch(updateProperty(property));
	} catch (error) {
		dispatch(createProgramFail(error));
	}
};

export const updateProgram = program => async (dispatch, getState) => {
	dispatch(updateProgramRequest());
	try {
		// const { data: { program } } = await api.properties.updateProgram({ program });
		dispatch(updateProgramSuccess(program));
		const property = getState().propertyDetails.property;
		dispatch(updateProperty(property));
	} catch (error) {
		dispatch(updateProgramFail(error));
	}
};

export const getPrograms = () => async (dispatch) => {
	dispatch(getProgramsRequest());
	try {
		// const { data: { programs } } = await api.properties.getPrograms();
		const programs = [];
		dispatch(getProgramsSuccess(programs));
	} catch (error) {
		dispatch(getProgramsFail());
	}
};

export const deleteProgram = customId => async (dispatch, getState) => {
	dispatch(deleteProgramRequest());
	try {
		// const { data: { program } } = await api.properties.deleteProgram({ customId });
		dispatch(deleteProgramSuccess(customId));
		const property = getState().propertyDetails.property;
		dispatch(updateProperty(property));
	} catch (error) {
		dispatch(deleteProgramFail(error));
	}
};
