import { validationTypes } from "../reducers/validation";

const scrollToError = () => {
	setTimeout(() => {
		const error = document.querySelectorAll(".is-invalid")[0];
		if (error) error.scrollIntoView({ behavior: "smooth", block: "start" });
	}, 1);
};


export const enableValidation = () => {
	scrollToError();

	return {
		type: validationTypes.ENABLE_VALIDATION,
	};
};

export const disableValidation = () => ({
	type: validationTypes.DISABLE_VALIDATION,
});
