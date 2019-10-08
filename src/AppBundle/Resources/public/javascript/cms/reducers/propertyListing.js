
export const propertyListingTypes = {
	SET_PROPERTY_LISTING_RIGHTS: "SET_PROPERTY_LISTING_RIGHTS",
	SET_PROPERTY_LISTING_SEASONS: "SET_PROPERTY_LISTING_SEASONS",
	SET_PROPERTY_LISTING_TERRITORIES: "SET_PROPERTY_LISTING_TERRITORIES",
	SET_PROPERTY_LISTING_PROGRAMS: "SET_PROPERTY_LISTING_PROGRAMS",
};

const DEFAULT_STATE = {
	rights: [],
	seasons: [],
	regions: [],
	territories: [],
	programs: [],
};

export const propertyListing = (state = DEFAULT_STATE, action) => {
	const newState = {};

	switch (action.type) {
	case propertyListingTypes.SET_PROPERTY_LISTING_RIGHTS:
		return Object.assign({}, state, { rights: action.rights });
	case propertyListingTypes.SET_PROPERTY_LISTING_SEASONS:
		return Object.assign({}, state, { seasons: action.seasons });
	case propertyListingTypes.SET_PROPERTY_LISTING_TERRITORIES:
		return Object.assign({}, state, { territories: action.territories });
	case propertyListingTypes.SET_PROPERTY_LISTING_PROGRAMS:
		return Object.assign({}, state, { programs: action.programs });

	default:
		return state;
	}
};
