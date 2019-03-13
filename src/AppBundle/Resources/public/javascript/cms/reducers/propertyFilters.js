
export const propertyFiltersTypes = {
	SET_FILTER_RIGHTS: "SET_FILTER_RIGHTS",
	SET_FILTER_SEASONS: "SET_FILTER_SEASONS",
	SET_FILTER_REGIONS: "SET_FILTER_REGIONS"
};

const DEFAULT_STATE = {
	rights: [],
	availableTerritories: [],
	seasons: [],
	regions: [],
	selectedTerritories: []
};

export const propertyFilters = (state = DEFAULT_STATE, action) => {
	let newState = {};
	let selectedTerritories = new Map();
	switch (action.type) {
		case propertyFiltersTypes.SET_FILTER_RIGHTS:
			let availableTerritories = new Map();

			action.rights.forEach(r=>{
				r.territories.forEach(t=>{
					if (!availableTerritories.get(t.id)) availableTerritories.set(t.id, t);
				})
			});

			state.regions.forEach(r=>{
				availableTerritories.forEach(t=>{
					if (r.type === "region" && t.regions.map(r=>r.id).indexOf(r.id) !== -1 ){
						if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
					}
					if (r.type === "territory" && t.territoryId === r.id){
						if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
					}
				})
			});

			return Object.assign({}, state, {
				rights: action.rights,
				availableTerritories: availableTerritories,
				selectedTerritories: selectedTerritories,
			});
		case propertyFiltersTypes.SET_FILTER_SEASONS:
			return Object.assign({}, state, { seasons: action.seasons });
		case propertyFiltersTypes.SET_FILTER_REGIONS:

			action.regions.forEach(r=>{
				state.availableTerritories.forEach(t=>{
					if (r.type === "region" && t.regions.map(r=>r.id).indexOf(r.id) !== -1 ){
						if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
					}
					if (r.type === "territory" && t.territoryId === r.id){
						if (!selectedTerritories.get(t.id)) selectedTerritories.set(t.id, t);
					}

				})
			});

			return Object.assign({}, state, { regions: action.regions, selectedTerritories: selectedTerritories });

	default:
		return state;
	}
};

export const hasCustomSeason = state => state.property.seasons.filter(season => season.custom).length > 0;
