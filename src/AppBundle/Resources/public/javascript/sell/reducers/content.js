import max from "lodash/max";
import { allValue } from "../../main/components/LanguageSelector";

export const contentType = {
	CONTENT_INIT: "CONTENT_INIT",
	UPDATE_STEP: "UPDATE_STEP",
	ADD_NEW: "ADD_NEW",
	REMOVE_NEW: "REMOVE_NEW",
	SUPER_RIGHTS_UPDATED: "SUPER_RIGHTS_UPDATED",
	UPDATE_CONTENT_VALUE: "UPDATE_CONTENT_VALUE",
	SELECT_TOURNAMENT: "SELECT_TOURNAMENT",
	REMOVE_FROM_MULTIPLE: "REMOVE_FROM_MULTIPLE",
	UPDATE_FROM_MULTIPLE: "UPDATE_FROM_MULTIPLE",
	APPLY_SELECTION: "APPLY_SELECTION",
	UPDATE_SALES_PACKAGES: "UPDATE_SALES_PACKAGES",
	UPDATE_ATTACHMENTS: "UPDATE_ATTACHMENTS",
	UPDATE_ANNEX: "UPDATE_ANNEX",
	ADD_SALES_PACKAGES: "ADD_SALES_PACKAGES",
	RESET: "RESET",
	LISTING_EDITED: "LISTING_EDITED",
	LISTING_SAVED: "LISTING_SAVED",
};

export const EmptyListing = {
	step: 1,
	maxStep: 1,
	rightsPackage: [],
	tournament: [],
	sportCategory: [],
	sports: [],
	seasons: [],
	customSeasons: [],
	salesPackages: [],
	customTournament: null,
	customCategory: null,
	description: "",
	programDescription: null,
	attachments: [],
	annex: [],
	endDateLimit: 30,
	counter: 0,
	currency: "EUR",
	startDateMode: "LICENSE",
	stepChange: false,
	vat: "no",
	NA_INPUT: 90,
	HL_INPUT: 5,
	LICENSED_LANGUAGES: [allValue],
	PROGRAM_LANGUAGE: [],
	PROGRAM_SUBTITLES: [],
	PROGRAM_SCRIPT: [],
	EDIT_PROGRAM_DESCRIPTION_OPTIONAL: true,
	website: null,
	law: "English",
	image: null,
	imageBase64: null,
	tempData: {},
	edited: false,
};

export const content = (state = EmptyListing, action) => {
	let newState = {};

	switch (action.type) {
	case contentType.RESET:
		return Object.assign({}, state, EmptyListing);
	case contentType.CONTENT_INIT:
		action.content.initialized = true;
		return Object.assign({}, state, action.content,
			{ maxStep: max([action.content.maxStep, state.maxStep]) });
	case contentType.UPDATE_STEP:
		return Object.assign({}, state, {
			step: action.step,
			stepChange: true,
			edited: false,
			maxStep: max([action.step, state.maxStep]),
		});
	case contentType.REMOVE_NEW:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		newState[action.selectorType].splice(action.index, 1);

		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
			});
		}

		return Object.assign({}, state, newState);
	case contentType.ADD_NEW:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		newState[action.selectorType][action.index] = {
			custom: true,
			name: action.name || "",
		};

		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
			});
		}

		return Object.assign({}, state, newState);
	case contentType.UPDATE_CONTENT_VALUE:
		newState = {};
		newState[action.key] = action.value;

		return Object.assign({}, state, newState);
	case contentType.LISTING_EDITED:
		return Object.assign({}, state, { edited: true });
	case contentType.LISTING_SAVED:
		return Object.assign({}, state, { edited: false });
	case contentType.SELECT_TOURNAMENT:
		newState = {};
		newState.tournament = [action.tournament];
		newState.sports = (action.tournament.sport) ? [action.tournament.sport] : [];
		newState.sportCategory = [action.tournament.sportCategory];

		return Object.assign({}, state, newState);
	case contentType.APPLY_SELECTION:

		newState = {};

		const selectedItems = Array.from(action.selectedItems.values());

		newState[action.selectorType] = [...state[action.selectorType]];

		if (action.multiple) {
			newState[action.selectorType] = selectedItems;
		} else {
			newState[action.selectorType][action.index] = selectedItems[0];
		}

		if (action.clean) {
			action.clean.forEach((selectorType) => {
				newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
			});
		}

		return Object.assign({}, state, newState);
	case contentType.REMOVE_FROM_MULTIPLE:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		newState[action.selectorType].splice(action.index, 1);
		return Object.assign({}, state, newState);
	case contentType.UPDATE_FROM_MULTIPLE:
		newState = {};
		newState[action.selectorType] = [...state[action.selectorType]];
		if (action.selectorType === "seasons" && !newState[action.selectorType][action.index]) { newState[action.selectorType].push({}); }
		newState[action.selectorType][action.index][action.key] = action.value;
		return Object.assign({}, state, newState);
	case contentType.SUPER_RIGHTS_UPDATED:
		return Object.assign({}, state, {
			rightsPackage: Array.from(action.rightsPackage.values()),
		});
	case contentType.UPDATE_SALES_PACKAGES:

		let salesPackages = [...state.salesPackages];

		if (action.name === "remove") {
			if (salesPackages.length >= 1) {
				salesPackages.splice(action.index, 1);
			}
		}

		if (action.name === "removeAll") {
			salesPackages = [];
		}

		if (action.name === "save") salesPackages[action.index] = action.salesPackage;

		return Object.assign({}, state, {
			salesPackages,
		});

	case contentType.UPDATE_ATTACHMENTS:

		let attachments = [...state.attachments];

		if (action.name === "remove") {
			if (attachments.length >= 1) {
				attachments.splice(action.index, 1);
			}
		}

		if (action.name === "removeAll") {
			attachments = [];
		}

		if (action.name === "save") attachments[action.index] = action.value;

		return Object.assign({}, state, {
			attachments,
		});

	case contentType.UPDATE_ANNEX:

		let annex = [...state.annex];

		if (action.name === "remove") {
			if (annex.length >= 1) {
				annex.splice(action.index, 1);
			}
		}

		if (action.name === "removeAll") {
			annex = [];
		}

		if (action.name === "save") annex[action.index] = action.value;

		return Object.assign({}, state, {
			annex,
		});

	case contentType.ADD_SALES_PACKAGES:
		return Object.assign({}, state, {
			salesPackages: [...state.salesPackages, ...action.salesPackages],
		});

	default:
		return state;
	}
};
