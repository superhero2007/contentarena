import { userTypes } from '../reducers/user';


export const updateProfile = profile => ({
    type: userTypes.PROFILE,
    profile,
});

export const loadUserData = () => {
    const dataContainer = document.getElementsByClassName('marketplace-container');
    let user = {};
                
    if (dataContainer && dataContainer.length) {
        const userStr = dataContainer[0].dataset.loggedUserData;
        try {
            user = JSON.parse(userStr);
        } catch (e) {}
    }

    return {
        type: userTypes.LOAD_USER_DATA,
        user
    };
};
