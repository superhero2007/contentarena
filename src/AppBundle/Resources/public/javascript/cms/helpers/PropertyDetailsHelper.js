import first from "lodash/first";
import { BUNDLE_TERRITORIES_METHOD } from "../../common/constants";

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

export const sortSeasonsOldToNew = (a, b) => new Date(a.startDate) - new Date(b.startDate);

export const sortByName = (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

export const getSeasonsYearString = seasons => seasons.map(season => season.year).join(" - ");

export const getRightsString = rights => rights.map(right => right.code).join(" - ");

export const listHas = (array, el) => array.find(e => e.id === el.id);

export const listRemove = (array, el) => array.filter(e => e.id !== el.id);

export const groupListingsByStatus = (listings) => {
	const rejected = []; const submitted = []; const active = []; const draft = []; const deactivated = []; const
		archived = [];

	listings.forEach((listing) => {
		switch (listing.status.name) {
		case "REJECTED":
			rejected.push(listing);
			break;
		case "PENDING":
			submitted.push(listing);
			break;
		case "DRAFT":
			draft.push(listing);
			break;
		case "AUTO_INACTIVE":
			draft.push(listing);
			break;
		case "APPROVED":
			active.push(listing);
			break;
		case "EDITED":
			active.push(listing);
			break;
		case "INACTIVE":
			deactivated.push(listing);
			break;
		case "EXPIRED":
			deactivated.push(listing);
			break;
		case "SOLD_OUT":
			deactivated.push(listing);
			break;
		case "ARCHIVED":
			archived.push(listing);
			break;
		default:
			active.push(listing);
			break;
		}
	});

	return {
		rejected,
		submitted,
		active,
		draft,
		deactivated,
		archived,
	};
};

export const getTerritoriesFromListing = listing => getUnique([].concat(...listing.salesPackages.map(bundle => bundle.territories)), "id");

export const getCountryData = (countries) => {
	const regions = new Map();
	const territories = new Map();

	countries.forEach((country) => {
		country.regions.forEach((region) => {
			if (!regions.has(region.id)) {
				regions.set(region.id, []);
			}
			regions.get(region.id).push(country);
		});

		country.territories.forEach((territory) => {
			if (!territories.has(territory.id)) {
				territories.set(territory.id, []);
			}
			territories.get(territory.id).push(country);
		});
	});

	return {
		regions,
		territories,
	};
};

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
