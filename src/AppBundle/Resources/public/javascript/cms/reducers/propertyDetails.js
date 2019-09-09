export const propertyDetailsTypes = {
	START_FETCHING: "START_FETCHING",
	GET_PROPERTY_SUCCESS: "GET_PROPERTY_SUCCESS",
	GET_PROPERTY_FAIL: "GET_PROPERTY_FAIL",

	UPDATE_PROPERTY: "UPDATE_PROPERTY",
	UPDATE_PROPERTY_SUCCESS: "UPDATE_PROPERTY_SUCCESS",
	UPDATE_PROPERTY_FAIL: "UPDATE_PROPERTY_FAIL",

	UPDATE_SINGLE_PROPERTY: "UPDATE_SINGLE_PROPERTY",

	CREATE_PROGRAM: "CREATE_PROGRAM",
	CREATE_PROGRAM_SUCCESS: "CREATE_PROGRAM_SUCCESS",
	CREATE_PROGRAM_FAIL: "CREATE_PROGRAM_FAIL",

	UPDATE_PROGRAM: "UPDATE_PROGRAM",
	UPDATE_PROGRAM_SUCCESS: "UPDATE_PROGRAM_SUCCESS",
	UPDATE_PROGRAM_FAIL: "UPDATE_PROGRAM_FAIL",

	GET_PROGRAMS: "GET_PROGRAMS",
	GET_PROGRAMS_SUCCESS: "GET_PROGRAMS_SUCCESS",
	GET_PROGRAMS_FAIL: "GET_PROGRAMS_FAIL",

	DELETE_PROGRAM: "GET_PROGRAM",
	DELETE_PROGRAM_SUCCESS: "GET_PROGRAM_SUCCESS",
	DELETE_PROGRAM_FAIL: "GET_PROGRAM_FAIL",

	ADD_DEAL_PROPERTY: "ADD_DEAL_PROPERTY",
	ADD_DEAL_PROPERTY_SUCCESS: "ADD_DEAL_PROPERTY_SUCCESS",
	ADD_DEAL_PROPERTY_FAIL: "ADD_DEAL_PROPERTY_FAIL",
};

const DEFAULT_STATE = {
	property: {
		customId: "",
		rights: [],
		seasons: [],
		website: "",
		attachments: [],
		image: "",
		description: "",
		listings: [],
		openBids: 0,
		closedBids: 0,
		programs: [],
	},
	isPropertyDetailFetched: false,
	errorCode: "",
	loading: false,
	success: false,
};

export const propertyDetails = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
	case propertyDetailsTypes.START_FETCHING:
		return Object.assign({}, DEFAULT_STATE);
	case propertyDetailsTypes.GET_PROPERTY_SUCCESS:
		return Object.assign({}, state, { property: { ...action.propertyDetail } }, { isPropertyDetailFetched: true });
	case propertyDetailsTypes.GET_PROPERTY_FAIL:
		return Object.assign({}, state, { error: action.error });
	case propertyDetailsTypes.UPDATE_PROPERTY:
		return Object.assign({}, state, { loading: true });
	case propertyDetailsTypes.UPDATE_PROPERTY_SUCCESS:
		return Object.assign({}, state, { property: { ...action.propertyDetail } }, { loading: false });
	case propertyDetailsTypes.UPDATE_PROPERTY_FAIL:
		return Object.assign({}, state, { error: action.error }, { loading: false });

	case propertyDetailsTypes.ADD_DEAL_PROPERTY:
		return Object.assign({}, state, { loading: true });
	case propertyDetailsTypes.ADD_DEAL_PROPERTY_SUCCESS:
		return Object.assign({}, state, { loading: false });
	case propertyDetailsTypes.ADD_DEAL_PROPERTY_FAIL:
		return Object.assign({}, state, { error: action.error }, { loading: false });

	case propertyDetailsTypes.UPDATE_SINGLE_PROPERTY:
		const { property } = state;
		property[action.key] = action.value;
		return Object.assign({}, { ...state }, { property });

	case propertyDetailsTypes.GET_PROGRAMS:
		return Object.assign({}, state, { loading: true, errorCode: "" });
	case propertyDetailsTypes.GET_PROGRAMS_SUCCESS:
		return Object.assign({}, state, {
			loading: false,
			errorCode: "",
			property: {
				...state.property,
				programs: action.programs,
			},
		});
	case propertyDetailsTypes.GET_PROGRAMS_FAIL:
		return Object.assign({}, state, { loading: false, errorCode: action.error });

	case propertyDetailsTypes.CREATE_PROGRAM:
		return Object.assign({}, state, { loading: true, errorCode: "" });
	case propertyDetailsTypes.CREATE_PROGRAM_SUCCESS:
		return Object.assign({}, state, {
			loading: false,
			errorCode: "",
			property: {
				...state.property,
				programs: [action.program, ...state.property.programs],
			},
		});
	case propertyDetailsTypes.CREATE_PROGRAM_FAIL:
		return Object.assign({}, state, { loading: false, errorCode: action.error });

	case propertyDetailsTypes.UPDATE_PROGRAM:
		return Object.assign({}, state, { loading: true, errorCode: "", success: false });
	case propertyDetailsTypes.UPDATE_PROGRAM_SUCCESS:
		const programs = state.property.programs.filter(program => program.customId !== action.program.customId);
		return Object.assign({}, state, {
			loading: false,
			errorCode: "",
			property: {
				...state.property,
				programs: [action.program, ...programs],
			},
		});
	case propertyDetailsTypes.UPDATE_PROGRAM_FAIL:
		return Object.assign({}, state, { loading: false, errorCode: action.error });

	case propertyDetailsTypes.DELETE_PROGRAM:
		return Object.assign({}, state, { loading: true, errorCode: "" });
	case propertyDetailsTypes.DELETE_PROGRAM_SUCCESS:
		return Object.assign({}, state, {
			loading: false,
			errorCode: "",
			property: {
				...state.property,
				programs: state.property.programs.filter(program => program.customId !== action.customId),
			},
		});
	case propertyDetailsTypes.DELETE_PROGRAM_FAIL:
		return Object.assign({}, state, { loading: false, errorCode: action.error });
	default:
		return state;
	}
};
