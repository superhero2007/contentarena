import { contentType } from "../reducers/content";
import { scrollMainContainer } from "../../common/utils/listing";

export const scrollTopMainContent = () => {
	const mainContent = document.querySelectorAll("body > .main-content")[0];

	if (mainContent) {
		mainContent.scrollIntoView();
	}
};

export const goToStep = (step) => {
	scrollTopMainContent();
	scrollMainContainer();
	return {
		type: contentType.GO_TO_STEP,
		step,
	};
};

export const updateContentValue = (key, value) => ({
	type: "UPDATE_CONTENT_VALUE",
	key,
	value,
});
