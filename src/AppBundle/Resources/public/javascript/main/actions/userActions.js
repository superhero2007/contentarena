import { userTypes } from '../reducers/user';


export const updateProfile = profile => ({
    type: userTypes.PROFILE,
    profile,
});

export const loadUserData = loggedUserData => {
    let user = {};
                
    try {
        user = JSON.parse(loggedUserData);
    } catch (e) {}

    return {
        type: userTypes.LOAD_USER_DATA,
        user
    };
};
