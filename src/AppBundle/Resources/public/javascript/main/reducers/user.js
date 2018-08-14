
export const userTypes= {
    LOGOUT:'LOGOUT',
    LOGIN:'LOGIN',
    PROFILE:'PROFILE',
};

const defaultUser = {
    profile : "BUYER"

};

export const user = (state = defaultUser, action) => {

    switch (action.type) {
        case userTypes.LOGOUT:
            return Object.assign({}, state, defaultUser);
        case userTypes.LOGIN:
            return Object.assign({}, state, {
                email: action.email
            });
        case userTypes.PROFILE:
            return Object.assign({}, state, {
                profile: action.profile
            });
        default:
            return state;
    }
};