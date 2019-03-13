export const propertyTypes = {
	SET_PROPERTY_CONFIG: "SET_PROPERTY_CONFIG",
	APPLY_SELECTION: "APPLY_SELECTION",
	ADD_NEW: "ADD_NEW",
	REMOVE_NEW: "REMOVE_NEW",
	SET_CUSTOM_SPORT_NAME: "SET_CUSTOM_SPORT_NAME",
	SET_CUSTOM_SPORT_CATEGORY_NAME: "SET_CUSTOM_SPORT_CATEGORY_NAME",
	SET_CUSTOM_TOURNAMENT_NAME: "SET_CUSTOM_TOURNAMENT_NAME",
	SET_CUSTOM_SEASON_NAME: "SET_CUSTOM_SEASON_NAME"
};

const DEFAULT_STATE = {
	tournament: [],
	sportCategory: [],
	sports: [],
	seasons: [],
};

export const property = (state = DEFAULT_STATE, action) => {
	let newState = {};
	switch (action.type) {
		case propertyTypes.SET_PROPERTY_CONFIG:
			return Object.assign({}, state, action.config);
		case propertyTypes.SET_CUSTOM_SPORT_NAME:
			newState = {};
			newState.sports = [...state.sports];
			newState.sports[action.index]["name"] = action.sportName;
			return Object.assign({}, state, newState);
		case propertyTypes.SET_CUSTOM_SPORT_CATEGORY_NAME:
			newState = {};
			newState.sportCategory = [...state.sportCategory];
			newState.sportCategory[action.index]["name"] = action.sportCategoryName;
			return Object.assign({}, state, newState);
		case propertyTypes.SET_CUSTOM_TOURNAMENT_NAME:
			newState = {};
			newState.tournament = [...state.tournament];
			newState.tournament[action.index]["name"] = action.tournamentName;
			return Object.assign({}, state, newState);
		case propertyTypes.SET_CUSTOM_SEASON_NAME:
			newState = {};
			newState.seasons = [...state.seasons];
			newState.seasons[action.index]["name"] = action.seasonName;
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

export const getSeasonName = (state) => {
	const { seasons } = state.property;
	return (seasons.length > 0 && seasons[0].name) ? seasons[0].name : "";
};

export const hasCustomSport = (state) => state.property.sports.filter(sport => sport.custom).length > 0;
export const hasCustomSportCategory = (state) => state.property.sportCategory.filter(sportCategory => sportCategory.custom).length > 0;
export const hasCustomTournament = (state) => state.property.tournament.filter(tournament => tournament.custom).length > 0;
export const hasCustomSeason = (state) => state.property.seasons.filter(season => season.custom).length > 0;
