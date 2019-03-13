export const cmsTypes = {
	SET_CMS_CONFIG: "SET_CMS_CONFIG",
};

const DEFAULT_STATE = {
};

export const cms = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
	case cmsTypes.SET_CMS_CONFIG:
		return Object.assign({}, state, action.config);

	default:
		return state;
	}
};
