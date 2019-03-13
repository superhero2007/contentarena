export const commonTypes = {
	GET_DEFAULT_RIGHTS_PACKAGE: "GET_DEFAULT_RIGHTS_PACKAGE",
	SET_TOTAL_COUNTRIES: "SET_TOTAL_COUNTRIES",
	SET_ENV_HOST_URL: "SET_ENV_HOST_URL",
	SET_CONFIG: "SET_CONFIG",
};

const commonDefault = {
	totalCountries: 240,
	testStageMode: false,
	ghostMode: false,
};

export const common = (state = commonDefault, action) => {
	switch (action.type) {
	case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
		return Object.assign({}, state, { defaultRightsPackage: action.defaultRightsPackage });
	case commonTypes.SET_TOTAL_COUNTRIES:
		return Object.assign({}, state, { totalCountries: action.totalCountries });
	case commonTypes.SET_ENV_HOST_URL:
		return Object.assign({}, state, { envHostUrl: action.envHostUrl });
	case commonTypes.SET_CONFIG:
		return Object.assign({}, state, action.config);

	default:
		return state;
	}
};
