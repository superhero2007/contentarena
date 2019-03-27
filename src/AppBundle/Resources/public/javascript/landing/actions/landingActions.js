import { landingTypes } from "../reducers/landing";

export const showSuccessResetPass = () => ({
	type: landingTypes.RESET_PASSWORD_SUCCESS,
});

export const hideSuccessResetPass = () => ({
	type: landingTypes.CLEAR_RESET_PASSWORD,
});

export const setRefererData = (refererEmail, refererListingId) => ({
	type: landingTypes.SET_REFERER_DATA,
	refererEmail,
	refererListingId,
});

export const showRegistrationEmail = email => ({
	type: landingTypes.SET_REGISTRATION_EMAIL,
	email,
});

export const hideRegistrationEmail = () => ({
	type: landingTypes.CLEAR_REGISTRATION_EMAIL,
});
