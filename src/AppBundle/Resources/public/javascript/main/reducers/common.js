export const commonTypes= {
    GET_DEFAULT_RIGHTS_PACKAGE:'GET_DEFAULT_RIGHTS_PACKAGE',
    SET_TOTAL_COUNTRIES: 'SET_TOTAL_COUNTRIES'
};

const commonDefault = {
    totalCountries : 240
};

export const common = (state = commonDefault, action) => {

    switch (action.type) {
        case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
            return Object.assign({}, state, {defaultRightsPackage: action.defaultRightsPackage});
        case commonTypes.SET_TOTAL_COUNTRIES:
            return Object.assign({}, state, {totalCountries: action.totalCountries});
        default:
            return state;
    }
};