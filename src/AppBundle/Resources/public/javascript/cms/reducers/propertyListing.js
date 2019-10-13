export const propertyListingTypes = {
	SET_PROPERTY_LISTING_RIGHTS: "SET_PROPERTY_LISTING_RIGHTS",
	SET_PROPERTY_LISTING_SEASONS: "SET_PROPERTY_LISTING_SEASONS",
	SET_PROPERTY_LISTING_TERRITORIES: "SET_PROPERTY_LISTING_TERRITORIES",
	SET_PROPERTY_LISTING_PROGRAMS: "SET_PROPERTY_LISTING_PROGRAMS",

	UPDATE_PROPERTY_LISTING: "UPDATE_PROPERTY_LISTING",
	RESET_PROPERTY_LISTING: "RESET_PROPERTY_LISTING",
	PROPERTY_LISTING_EDITED: "PROPERTY_LISTING_EDITED",
	PROPERTY_LISTING_SAVED: "PROPERTY_LISTING_SAVED",
	SAVE_PROPERTY_LISTING: "SAVE_PROPERTY_LISTING",
	PROPERTY_LISTING_REQUEST: "PROPERTY_LISTING_REQUEST",
	PROPERTY_LISTING_REQUEST_SUCCESS: "PROPERTY_LISTING_REQUEST_SUCCESS",
	PROPERTY_LISTING_REQUEST_FAIL: "PROPERTY_LISTING_REQUEST_FAIL",
};

const DEFAULT_STATE = {
	step: 1,
	maxStep: 1,
	rights: [],
	seasons: [],
	regions: [],
	programs: [],
	bundles: [],
	website: "",
	attachments: [],
	annex: [],
	image: "",
	description: "",
	company: {},
};

export const propertyListing = (state = DEFAULT_STATE, action) => {
	const newState = {};

	switch (action.type) {
	case propertyListingTypes.PROPERTY_LISTING_EDITED:
		return Object.assign({}, state, { edited: true });
	case propertyListingTypes.PROPERTY_LISTING_SAVED:
		return Object.assign({}, state, { edited: false });
	case propertyListingTypes.SAVE_PROPERTY_LISTING:
		return Object.assign({}, state, { saving: true });
	case propertyListingTypes.PROPERTY_LISTING_REQUEST:
		return Object.assign({}, state, { loading: true });
	case propertyListingTypes.PROPERTY_LISTING_REQUEST_SUCCESS:
		return Object.assign({}, state, { loading: false, saving: false, ...action.data });
	case propertyListingTypes.PROPERTY_LISTING_REQUEST_FAIL:
		return Object.assign({}, state, { error: action.error }, { loading: false, saving: false });
	case propertyListingTypes.RESET_PROPERTY_LISTING:
		return Object.assign({}, state, DEFAULT_STATE);
	case propertyListingTypes.UPDATE_PROPERTY_LISTING:
		return Object.assign({}, state, { ...action.data });
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
