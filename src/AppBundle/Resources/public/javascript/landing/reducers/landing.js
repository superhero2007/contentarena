export const landingTypes = {
	RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
	CLEAR_RESET_PASSWORD: "CLEAR_RESET_PASSWORD",
	SET_REFERER_DATA: "SET_REFERER_DATA",
	SET_REGISTRATION_EMAIL: "SHOW_REGISTRATION_EMAIL",
	CLEAR_REGISTRATION_EMAIL: "CLEAR_REGISTRATION_EMAIL",
};

const DEFAULT_STATE = {
	resetPasswordSuccess: false,
	registrationEmail: "",
};

export const landing = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
	case landingTypes.RESET_PASSWORD_SUCCESS:
		return Object.assign({}, state, { resetPasswordSuccess: true });

	case landingTypes.CLEAR_RESET_PASSWORD:
		return Object.assign({}, state, { resetPasswordSuccess: false });

	case landingTypes.SET_REFERER_DATA:
		return Object.assign({}, state, {
			refererEmail: action.refererEmail,
			refererListingId: action.refererListingId,
		});

	case landingTypes.SET_REGISTRATION_EMAIL:
		return Object.assign({}, state, { registrationEmail: action.email });

	case landingTypes.CLEAR_REGISTRATION_EMAIL:
		return Object.assign({}, state, { registrationEmail: "" });

	default:
		return state;
	}
};
