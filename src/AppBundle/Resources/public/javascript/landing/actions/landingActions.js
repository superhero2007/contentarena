import { landingTypes } from "../reducers/landing";
import { commonTypes } from "../../main/reducers/common";

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
