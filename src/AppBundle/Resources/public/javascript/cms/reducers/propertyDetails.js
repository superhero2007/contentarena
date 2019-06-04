export const propertyDetailsTypes = {
	START_FETCHING: "START_FETCHING",
	GET_PROPERTY_SUCCESS: "GET_PROPERTY_SUCCESS",
	GET_PROPERTY_FAIL: "GET_PROPERTY_FAIL",

	UPDATE_PROPERTY_RIGHTS: "UPDATE_PROPERTY_RIGHTS",
};

const DEFAULT_STATE = {
	property: {
		customId: "",
		rights: [],
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
	case propertyDetailsTypes.UPDATE_PROPERTY_RIGHTS:
		const property = {
			...state.property,
			rights: [...action.rights],
		};
		return Object.assign({}, { ...state }, { property: { ...property } });
	default:
		return state;
	}
};
