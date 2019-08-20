import first from "lodash/first";

const multipleVabel = "Multiple values selected";

const getUniqueSelectedOptions = (rights, key) => {
	let values = [];
	for (const value of rights) {
		const selectedValue = value.details[key];
		values = Array.isArray(selectedValue) ? [...values, ...selectedValue] : [...values, selectedValue];
	}

	return [...new Set(values)];
};

export const getUnique = (arr, comp) => (
	arr
		.map(e => e[comp])

		// store the keys of the unique objects
		.map((e, i, final) => final.indexOf(e) === i && i)

		// eliminate the dead keys & store unique objects
		.filter(e => arr[e]).map(e => arr[e])
);

export const sortSeasons = (a, b) => new Date(b.startDate) - new Date(a.startDate);

const getLanguages = (rights, key) => {
	let values = [];
	const right = first(rights);

	const languageList = right.details[key];
	for (const language of languageList) {
		values = [...values, language.label];
	}

	values = [...new Set(values)];

	return values.map(item => item)
		.join(", ");
};

export const getRightsValue = (config, rights, context) => {
	const { key } = config;

	if (rights.length === 0) return;

	switch (key) {
	case "CAMERA":
		const cameras = getUniqueSelectedOptions(rights, "CAMERAS");
		if (cameras.length === 1) {
			return `Minimum cameras: ${first(cameras)}`;
		}
		return multipleVabel;


	case "LICENSED_LANGUAGES":
		return getLanguages(rights, "LICENSED_LANGUAGE_LIST");

	case "COMMENTARY":
		const commentaries = getUniqueSelectedOptions(rights, "COMMENTARY");
		if (commentaries.length === 1 && first(commentaries) === "COMMENTARY_YES") {
			return getLanguages(rights, "COMMENTARY_LANGUAGES");
		}
		break;

	case "GRAPHICS":
		const graphics = getUniqueSelectedOptions(rights, "GRAPHICS");
		if (graphics.length === 1 && first(graphics) === "GRAPHICS_YES") {
			return getLanguages(rights, "GRAPHICS_LANGUAGES");
		}
		break;

	case "ASPECT_RATIO":
		const aspRatios = getUniqueSelectedOptions(rights, "ASPECT_RATIO");
		if (aspRatios.length === 1 && first(aspRatios) === "ASPECT_RATIO_CUSTOM") {
			return first(rights).details.ASPECT_RATIO_TEXT;
		}
		break;

	default:
	}

	const options = getUniqueSelectedOptions(rights, key);

	return options.length > 1 ? multipleVabel : context.t(`RIGHTS_${options[0]}`);
};

export const hasRightComment = (right, key) => {
	const { details } = right;
	const textareaKey = `${key}_TEXTAREA`;

	return details[textareaKey] || false;
};

export const getDedicatedRigths = (rights) => {
	const dedicatedRights = rights.filter(item => item.details.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED");

	if (dedicatedRights.length === 0) {
		const arrWithOne = first(rights);
		return [arrWithOne];
	}
	return dedicatedRights;
};
