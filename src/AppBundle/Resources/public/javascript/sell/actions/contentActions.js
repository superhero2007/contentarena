import { contentType } from "../reducers/content";
import { scrollMainContainer } from "../../common/utils/listing";

export const scrollTopMainContent = () => {
	const mainContent = document.querySelectorAll("body > .main-content")[0];

	if (mainContent) {
		mainContent.scrollIntoView();
	}
};

export const updateStep = (step) => {
	scrollTopMainContent();
	scrollMainContainer();
	return {
		type: contentType.UPDATE_STEP,
		step,
	};
};

export const updateContentValue = (key, value) => ({
	type: "UPDATE_CONTENT_VALUE",
	key,
	value,
});

export const listingEdited = () => ({ type: contentType.LISTING_EDITED });
export const listingSaved = () => ({ type: contentType.LISTING_SAVED });
