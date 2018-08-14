import { userTypes } from '../reducers/user';


export const updateProfile = profile => ({
    type: userTypes.PROFILE,
    profile,
});
