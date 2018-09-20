export const commonTypes= {
    GET_DEFAULT_RIGHTS_PACKAGE:'GET_DEFAULT_RIGHTS_PACKAGE'
};

export const common = (state = {}, action) => {

    switch (action.type) {
        case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
            return Object.assign({}, state, {defaultRightsPackage: action.defaultRightsPackage});
        default:
            return state;
    }
};