import { landingTypes } from "../reducers/landing";

export const showSuccessResetPass = () => {
    return {
        type: landingTypes.RESET_PASSWORD_SUCCESS,
    }
};

export const hideSuccessResetPass = () => {
    return {
        type: landingTypes.CLEAR_RESET_PASSWORD,
    }
};