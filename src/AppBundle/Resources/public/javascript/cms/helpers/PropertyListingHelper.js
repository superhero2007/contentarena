import React from "react";
import { ExclusiveRightAvailableIcon, NonExclusiveRightAvailableIcon, yellowCheckIcon } from "@icons";
import { PROPERTY_MAIN_TABS, ROUTE_PATHS } from "../../common/constants";

export const getListingName = (property, listingSeasons) => {
	const {
		sports,
		sportCategory,
		tournament,
	} = property;

	let name = "";

	if (sports && sports.length > 0) name += `${sports[0].name}`;

	if (sportCategory && sportCategory.length > 0) name += ` - ${sportCategory[0].name}`;

	if (tournament && tournament.length > 0) name += ` - ${tournament[0].name}`;

	if (listingSeasons && listingSeasons.length > 0) {
		listingSeasons.forEach((season) => {
			name += ` - ${season.year}`;
		});
	}

	return name;
};

export const propertyRightsToListingRights = rights => rights.map(right => ({
	id: right.id,
	selectedRights: right.details,
	exclusive: right.exclusive,
}));

export const getListingStepRoute = (propertyId, ListingId, step) => {
	const route = `${ROUTE_PATHS.PROPERTIES}/${propertyId}/${PROPERTY_MAIN_TABS.CREATE_LISTING}/${ListingId}`;
	return `${route}?step=${step}`;
};
