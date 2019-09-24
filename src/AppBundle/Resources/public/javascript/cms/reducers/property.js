import { getTerritoriesFromRights } from "@utils/property";
import { getUnifiedRegions } from "../helpers/PropertyHelper";

export const propertyTypes = {
	RESET_PROPERTY: "RESET_PROPERTY",
	SET_PROPERTY_CONFIG: "SET_PROPERTY_CONFIG",

	APPLY_SELECTION: "APPLY_SELECTION",
	ADD_NEW: "ADD_NEW",
	REMOVE_NEW: "REMOVE_NEW",

	SET_CUSTOM_SPORT_NAME: "SET_CUSTOM_SPORT_NAME",
	SET_CUSTOM_SPORT_CATEGORY_NAME: "SET_CUSTOM_SPORT_CATEGORY_NAME",
	SET_CUSTOM_TOURNAMENT_NAME: "SET_CUSTOM_TOURNAMENT_NAME",

	SET_CUSTOM_SEASON_NAME: "SET_CUSTOM_SEASON_NAME",
	ADD_CUSTOM_SEASON: "ADD_CUSTOM_SEASON",
	REMOVE_CUSTOM_SEASON: "REMOVE_CUSTOM_SEASON",
	UPDATE_CUSTOM_SEASON: "UPDATE_CUSTOM_SEASON",

	SELECT_PROPERTY_TOURNAMENT: "SELECT_PROPERTY_TOURNAMENT",
	SET_SEASONS: "SET_SEASONS",
	SET_RIGHTS: "SET_RIGHTS",
	SET_SELECTED_RIGHTS: "SET_SELECTED_RIGHTS",

	GET_COUNTRIES: "GET_COUNTRIES",
	GET_COUNTRIES_SUCCESS: "GET_COUNTRIES_SUCCESS",

	GET_REGIONS: "GET_REGIONS",
	GET_REGIONS_SUCCESS: "GET_REGIONS_SUCCESS",

	GET_TERRITORIES: "GET_TERRITORIES",
	GET_TERRITORIES_SUCCESS: "GET_TERRITORIES_SUCCESS",

	CAN_FOCUS_SEASON: "CAN_FOCUS_SEASON",

	STORE_PROPERTY_DATA: "STORE_PROPERTY_DATA",
};

const DEFAULT_STATE = {
	tournament: [],
	sportCategory: [],
	sports: [],
	seasons: [],
	rights: [],
	selectedRights: [],
	fixtures: [],

	countries: [],
	isCountryFetched: false,
	regions: [],
	isRegionsFetched: false,
	territories: [],
	searchResults: [],
	isTerritoriesFetched: false,
	canFocusSeason: true,
	showCompetitionSelectors: false,
};

export const property = (state = DEFAULT_STATE, action) => {
	let newState = {};
	switch (action.type) {
	case propertyTypes.RESET_PROPERTY:
		return Object.assign({}, state, {
			tournament: [],
			sportCategory: [],
			sports: [],
			seasons: [],
			rights: [],
			selectedRights: [],
			fixtures: [],
		});
	case propertyTypes.GET_COUNTRIES_SUCCESS:
		return Object.assign({}, state, { countries: action.countries, isCountryFetched: true });
	case propertyTypes.GET_REGIONS_SUCCESS:
		return Object.assign({}, state, { regions: action.regions, isRegionsFetched: true });
	case propertyTypes.GET_TERRITORIES_SUCCESS:
		return Object.assign({}, state, { territories: action.territories, isTerritoriesFetched: true });
	case propertyTypes.SET_PROPERTY_CONFIG:
		return Object.assign({}, state, action.config);
	case propertyTypes.SET_RIGHTS:
		return Object.assign({}, state, { rights: action.rights });
	case propertyTypes.SET_SEASONS:
		return Object.assign({}, state, { seasons: action.seasons });
	case propertyTypes.SET_SELECTED_RIGHTS:
		return Object.assign({}, state, { selectedRights: action.selectedRights });
	case propertyTypes.SET_CUSTOM_SPORT_NAME:
		newState = {};
		newState.sports = [...state.sports];
		newState.sports[action.index].name = action.sportName;
		return Object.assign({}, state, newState);
	case propertyTypes.SET_CUSTOM_SPORT_CATEGORY_NAME:
		newState = {};
		newState.sportCategory = [...state.sportCategory];
		newState.sportCategory[action.index].name = action.sportCategoryName;
		return Object.assign({}, state, newState);
	case propertyTypes.SET_CUSTOM_TOURNAMENT_NAME:
		newState = {};
		newState.tournament = [...state.tournament];

		if (newState.tournament[action.index] === undefined) {
			newState.tournament[action.index] = {
				custom: true,
			};
		}

		newState.tournament[action.index].name = action.tournamentName;
		return Object.assign({}, state, newState);

	case propertyTypes.STORE_PROPERTY_DATA:
		newState = {};
		newState[action.key] = action.value;
		return Object.assign({}, state, newState);
	case propertyTypes.SELECT_PROPERTY_TOURNAMENT:

		newState = {};
		newState.tournament = [action.tournament];
		newState.sports = (action.tournament.sport) ? [action.tournament.sport] : [];
		newState.sportCategory = [action.tournament.sportCategory];
		newState.canFocusSeason = false;

		return Object.assign({}, state, newState);
	case propertyTypes.CAN_FOCUS_SEASON:
		return Object.assign({}, state, { canFocusSeason: action.isFocus });
	case propertyTypes.ADD_CUSTOM_SEASON:
		newState = {};
		newState.seasons = [...state.seasons, {
			custom: true,
			name: "",
			year: "",
		}];
		return Object.assign({}, state, newState);
	case propertyTypes.SET_CUSTOM_SEASON_NAME:
		newState = {};
		newState.seasons = [...state.seasons];

		if (newState.seasons[action.index] === undefined) {
			newState.seasons[action.index] = {
				custom: true,
				name: "",
			};
		}

		newState.seasons[action.index].name = action.seasonName;
		return Object.assign({}, state, newState);
	case propertyTypes.APPLY_SELECTION:
		newState = {};

		const selectedItems = Array.from(action.selectedItems.values());

		newState[action.selectorType] = [...state[action.selectorType]];

		if (action.multiple) {
			newState[action.selectorType] = selectedItems;
		} else {
			newState[action.selectorType][action.index] = selectedItems[0];
		}

		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
			});
		}

		return Object.assign({}, state, newState);
	case propertyTypes.REMOVE_NEW:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		newState[action.selectorType].splice(action.index, 1);
		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
			});
		}

		return Object.assign({}, state, newState);
	case propertyTypes.REMOVE_CUSTOM_SEASON:
		newState = {};
		newState.seasons = [...state.seasons];
		newState.seasons.splice(action.index, 1);
		return Object.assign({}, state, newState);

	case propertyTypes.UPDATE_CUSTOM_SEASON:
		newState = {};
		newState.seasons = [...state.seasons];

		if (newState.seasons[action.index] === undefined) {
			newState.seasons[action.index] = {
				custom: true,
				name: "",
			};
		}

		newState.seasons[action.index][action.key] = action.value;
		return Object.assign({}, state, newState);

	case propertyTypes.ADD_NEW:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		newState[action.selectorType][action.index] = {
			custom: true,
			name: "",
		};

		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [{
					custom: true,
					name: "",
				}] : null;
			});
		}

		return Object.assign({}, state, newState);
	default:
		return state;
	}
};

// Selector
export const getSportName = (state) => {
	const { sports } = state.property;
	return (sports.length > 0 && sports[0].name) ? sports[0].name : "";
};

export const getSportCategoryName = (state) => {
	const { sportCategory } = state.property;
	return (sportCategory.length > 0 && sportCategory[0].name) ? sportCategory[0].name : "";
};

export const getTournamentName = (state) => {
	const { tournament } = state.property;
	return (tournament.length > 0 && tournament[0].name) ? tournament[0].name : "";
};

export const getSeasonNames = (state) => {
	const { seasons } = state.property;
	return seasons.map(season => season.name || "");
};

export const hasCustomSport = state => state.property.sports.filter(sport => sport.custom).length > 0;
export const hasCustomSportCategory = state => state.property.sportCategory.filter(sportCategory => sportCategory.custom).length > 0;
export const hasExtendedSportCategory = state => state.property.sportCategory.filter(sportCategory => sportCategory.extended).length > 0;
export const hasCustomTournament = state => state.property.tournament.filter(tournament => tournament.custom).length > 0;
export const hasCustomSeason = state => state.property.seasons.filter(season => season.custom).length > 0;

export const getAvailableTerritories = (state) => {
	const property = state.propertyDetails.property;
	return getTerritoriesFromRights(property.rights);
};

const getFilteredTerritoriesByRegion = (regions, availableTerritories) => {
	const selectedTerritories = new Map();

	regions.forEach((r) => {
		availableTerritories.forEach((t) => {
			if (r.type === "region") {
				if (t.regions.map(r => r.id).indexOf(r.id) !== -1) {
					if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
				}
			} else if (t.territories.map(r => r.id).indexOf(r.id) !== -1) {
				if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
			}
		});
	});

	return Array.from(selectedTerritories.values());
};

export const getFilteredTerritories = (state) => {
	const property = state.propertyDetails.property;
	const baseProperty = state.property;
	const filters = state.propertyFilters;
	const seasons = (filters.seasons.length) ? filters.seasons : property.seasons;
	const rights = (filters.rights.length) ? filters.rights : property.rights;
	const regions = (filters.regions.length) ? filters.regions : getUnifiedRegions(baseProperty.regions, baseProperty.territories);
	const availableTerritories = new Map();

	rights.forEach((r) => {
		r.territories.forEach((t) => {
			if (!availableTerritories.get(t.id)) availableTerritories.set(t.id, t);
		});
	});

	return getFilteredTerritoriesByRegion(regions, availableTerritories);
};

export const getFilteredSeasons = (state) => {
	const property = state.propertyDetails.property;
	const filters = state.propertyFilters;
	return (filters.seasons.length) ? filters.seasons : property.seasons;
};

export const getFilteredRights = (state) => {
	const property = state.propertyDetails.property;
	const filters = state.propertyFilters;
	return (filters.rights.length) ? filters.rights : property.rights;
};

export const getFilteredListings = (state) => {
	const property = state.propertyDetails.property;
	const filters = state.propertyFilters;
	const baseProperty = state.property;
	let availableCountries = filters.countries;
	let listings = property.listings;

	if (filters.listings.length) {
		listings = property.listings.filter((listing) => {
			const selectedListings = filters.listings.filter(b => b.id === listing.id);
			return selectedListings.length;
		});
	}

	if (filters.seasons.length) {
		listings = listings.filter((list) => {
			const selectedSeasons = list.seasons.filter(season => filters.seasons.find(b => b.id === season.id));
			return selectedSeasons.length;
		});
	}

	if (filters.regions.length) {
		availableCountries = getFilteredTerritoriesByRegion(filters.regions, baseProperty.countries);
	}

	if (filters.regions.length || filters.countries.length) {
		const countryIds = availableCountries.map(t => t.id);
		listings = listings.filter((list) => {
			const bundles = list.salesPackages.filter(bundle => bundle.territories.find(t => countryIds.indexOf(t.id) !== -1));
			return bundles.length;
		});
	}

	return listings;
};
