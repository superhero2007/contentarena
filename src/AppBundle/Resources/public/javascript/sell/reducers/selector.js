export const selectorType = {
	TEST: "TEST",
	OPEN_SELECTOR: "OPEN_SELECTOR",
	CLOSE_SELECTOR: "CLOSE_SELECTOR",
	APPLY_SELECTION: "APPLY_SELECTION",
};

export const selector = (state = {
	type: "sport",
	open: false,
	selectorItems: [],
	popularItems: [],

}, action) => {
	switch (action.type) {
	case selectorType.TEST:
		return Object.assign({}, state, {
			open: true,
		});
	case selectorType.OPEN_SELECTOR:
		return Object.assign({}, state, {
			selectorType: action.selectorType,
			open: true,
			index: action.index,
			selectorItems: action.selectorItems,
			popularItems: action.popularItems,
			activeFilter: action.activeFilter,
			multiple: action.multiple,
			disabled: action.disabled,
			showNewSport: action.showNewSport,
			showNewTournament: action.showNewTournament,
			showNewCategory: action.showNewCategory,
			showNewSeason: action.showNewSeason,
			showAllCountries: action.showAllCountries,
			clean: action.clean,
			selectedItems: action.selectedItems,
		});
	case selectorType.CLOSE_SELECTOR:
		return Object.assign({}, state, {
			selectorType: "",
			open: false,
			selectorItems: [],
			popularItems: [],
		});
	case selectorType.APPLY_SELECTION:
		return Object.assign({}, state, {
			selectorType: "",
			open: false,
			selectorItems: [],
			popularItems: [],
		});
	default:
		return state;
	}
};
