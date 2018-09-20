export const userTypes= {
    LOGOUT:'LOGOUT',
    LOGIN:'LOGIN',
    PROFILE:'PROFILE',
    LOAD_USER_DATA:'LOAD_USER_DATA',
};

const defaultUser = {
    profile : "SELLER"

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
        case userTypes.LOAD_USER_DATA:
            return Object.assign({}, state, {...action.user});
        default:
            return state;
    }
};