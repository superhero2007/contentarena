export const propertyDetailsTypes = {
	START_FETCHING: "START_FETCHING",
	GET_PROPERTY_SUCCESS: "GET_PROPERTY_SUCCESS",
	GET_PROPERTY_FAIL: "GET_PROPERTY_FAIL",

	UPDATE_SINGLE_PROPERTY: "UPDATE_SINGLE_PROPERTY",
};

const DEFAULT_STATE = {
	property: {
		customId: "",
		rights: [],
		website: "",
		files: [],
		image: "",
		description: "",
		listings: [],
		openBids: 0,
		closedBids: 0,
	},
	isPropertyDetailFetched: false,
	errorCode: "",
};

export const propertyDetails = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
	case propertyDetailsTypes.START_FETCHING:
		return Object.assign({}, DEFAULT_STATE);
	case propertyDetailsTypes.GET_PROPERTY_SUCCESS:
		return Object.assign({}, state, { property: { ...action.propertyDetail } }, { isPropertyDetailFetched: true });
	case propertyDetailsTypes.GET_PROPERTY_FAIL:
		return Object.assign({}, state, { error: action.error });
	case propertyDetailsTypes.UPDATE_SINGLE_PROPERTY:
		const { property } = state;
		property[action.key] = action.value;
		return Object.assign({}, { ...state }, { property });
	default:
		return state;
	}
};
