import React from "react";
import { BUNDLE_TERRITORIES_METHOD } from "../../constants";
import { getUnique } from "../../../cms/helpers/PropertyDetailsHelper";

export const getTerritoriesFromRights = (rights, countries) => {
	const territory = {
		territories: [],
		territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
	};
	const worldwideRights = rights.filter(right => right.territoriesMode === BUNDLE_TERRITORIES_METHOD.WORLDWIDE);
	if (worldwideRights.length) {
		territory.territories = countries;
		territory.territoriesMode = BUNDLE_TERRITORIES_METHOD.WORLDWIDE;
	} else {
		territory.territories = getUnique([].concat(...rights.map(right => right.territories)), "id");
	}
	return territory;
};
