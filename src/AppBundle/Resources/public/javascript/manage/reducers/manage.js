export const manageTypes = {
	TEST: "TEST",
};

export const manage = (state = {
	testItem: "manageReducer",

}, action) => {
	switch (action.type) {
	case manageTypes.TEST:
		return Object.assign({}, state, {
			test: action.text,
			id: action.id,
		});
	default:
		return state;
	}
};
