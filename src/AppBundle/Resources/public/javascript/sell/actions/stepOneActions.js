export const updateFromMultiple = (type, index, key, value) => ({
	type: "UPDATE_FROM_MULTIPLE",
	selectorType: type,
	index,
	key,
	value,
});

export const updateAttachments = (name, index, value) => ({
	type: "UPDATE_ATTACHMENTS",
	name,
	index,
	value,
});

export const openSportSelector = (index, selectedItems) => ({
	type: "OPEN_SELECTOR",
	selectorItems: ContentArena.Data.FullSports,
	popularItems: ContentArena.Data.TopSports,
	selectorType: "sports",
	activeFilter: "popular",
	clean: ["tournament", "seasons", "sportCategory"],
	selectedItems,
	showNewSport: true,
	index,
});

export const openCategorySelector = selectedItems => ({
	type: "OPEN_SELECTOR",
	selectorItems: ContentArena.Data.Categories,
	selectorType: "sportCategory",
	activeFilter: "ag",
	showAllCountries: true,
	showNewCategory: true,
	selectedItems,
	index: 0,
	clean: ["tournament", "seasons", "customCategory", "customTournament"],
});

export const openTournamentSelector = selectedItems => ({
	type: "OPEN_SELECTOR",
	selectorItems: ContentArena.Data.Tournaments,
	selectorType: "tournament",
	activeFilter: "ag",
	index: 0,
	selectedItems,
	showNewTournament: true,
	clean: ["seasons"],
});

export const openSeasonSelector = (index, selectedItems) => ({
	type: "OPEN_SELECTOR",
	selectorItems: ContentArena.Data.Seasons,
	selectorType: "seasons",
	multiple: true,
	index,
	showNewSeason: true,
	clean: [],
	selectedItems,
});

export const removeFromMultiple = (index, selectorType) => ({
	type: "REMOVE_FROM_MULTIPLE",
	selectorType,
	index,
});

export const updateContentValue = (key, value) => ({
	type: "UPDATE_CONTENT_VALUE",
	key,
	value,
});

export const removeNewSport = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "sports",
	clean: ["tournament", "seasons", "sportCategory", "customCategory", "customTournament"],
});

export const removeNewTournament = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "tournament",
	clean: ["tournament", "seasons", "customTournament"],
});

export const removeNewCategory = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "sportCategory",
});

export const removeNewSeason = index => ({
	type: "REMOVE_NEW",
	index,
	selectorType: "seasons",
});

export const addNewSeason = (index, name) => ({
	type: "ADD_NEW",
	index,
	name,
	selectorType: "seasons",
	clean: [],
});

export const addNewCategory = () => ({
	type: "ADD_NEW",
	index: 0,
	selectorType: "sportCategory",
	clean: ["tournament", "seasons"],
});

export const addNewTournament = () => ({
	type: "ADD_NEW",
	index: 0,
	selectorType: "tournament",
	clean: ["seasons"],
});

export const reset = () => ({
	type: "RESET",
});
