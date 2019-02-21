export const commonTypes = {
  GET_DEFAULT_RIGHTS_PACKAGE: "GET_DEFAULT_RIGHTS_PACKAGE",
  SET_TOTAL_COUNTRIES: "SET_TOTAL_COUNTRIES",
  SET_TEST_STAGE_MODE: "SET_TEST_STAGE_MODE",
  SET_ENV_HOST_URL: "SET_ENV_HOST_URL",
};

const commonDefault = {
  totalCountries: 240,
  testStageMode: false,
};

export const common = (state = commonDefault, action) => {
  switch (action.type) {
    case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
      return Object.assign({}, state, { defaultRightsPackage: action.defaultRightsPackage });
    case commonTypes.SET_TOTAL_COUNTRIES:
      return Object.assign({}, state, { totalCountries: action.totalCountries });
    case commonTypes.SET_TEST_STAGE_MODE:
      return Object.assign({}, state, { testStageMode: action.testStageMode });
    case commonTypes.SET_ENV_HOST_URL:
      return Object.assign({}, state, { envHostUrl: action.envHostUrl });
    default:
      return state;
  }
};
