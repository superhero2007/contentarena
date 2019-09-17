
export const propertyFiltersTypes = {
	SET_FILTER_RIGHTS: "SET_FILTER_RIGHTS",
	SET_FILTER_SEASONS: "SET_FILTER_SEASONS",
	SET_FILTER_REGIONS: "SET_FILTER_REGIONS",
	SET_FILTER_STATUS: "SET_FILTER_STATUS",
	SET_FILTER_LISTINGS: "SET_FILTER_LISTINGS",
	SET_FILTER_COUNTRIES: "SET_FILTER_COUNTRIES",
};

const DEFAULT_STATE = {
	rights: [],
	availableTerritories: [],
	seasons: [],
	regions: [],
	selectedTerritories: [],
	statuses: [],
	listings: [],
	countries: [],
};

export const propertyFilters = (state = DEFAULT_STATE, action) => {
	const newState = {};
	const selectedTerritories = new Map();
	switch (action.type) {
	case propertyFiltersTypes.SET_FILTER_RIGHTS:
		const availableTerritories = new Map();

		action.rights.forEach((r) => {
			r.territories.forEach((t) => {
				if (!availableTerritories.get(t.id)) availableTerritories.set(t.id, t);
			});
		});

		state.regions.forEach((r) => {
			availableTerritories.forEach((t) => {
				if (r.type === "region" && t.regions.map(r => r.id).indexOf(r.id) !== -1) {
					if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
				}
				if (r.type === "territory" && t.territoryId === r.id) {
					if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
				}
			});
		});

		return Object.assign({}, state, {
			rights: action.rights,
		});
	case propertyFiltersTypes.SET_FILTER_SEASONS:
		return Object.assign({}, state, { seasons: action.seasons });
	case propertyFiltersTypes.SET_FILTER_REGIONS:
		return Object.assign({}, state, { regions: action.regions });
	case propertyFiltersTypes.SET_FILTER_STATUS:
		return Object.assign({}, state, { status: action.statuses });
	case propertyFiltersTypes.SET_FILTER_LISTINGS:
		return Object.assign({}, state, { listings: action.listings });
	case propertyFiltersTypes.SET_FILTER_COUNTRIES:
		return Object.assign({}, state, { countries: action.countries });

	default:
		return state;
	}
};
