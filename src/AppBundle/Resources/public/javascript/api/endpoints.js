
const API_ENDPOINTS = {
	NOTIFICATIONS_MESSAGE_SEEN: "api/notifications/seen?type=MESSAGE",
	NOTIFICATIONS_REMOVE: "api/notifications/remove",
	NOTIFICATIONS_MARK_SEEN: "api/notifications/seen",
	NOTIFICATIONS_MARK_VISITED: "api/notifications/visited",
	NOTIFICATIONS_MARK_ALL_VISITED: "api/notifications/all/visited",
	NOTIFICATIONS_GET_ALL: "api/notifications/",
	MESSAGES_GET_THREADS: "api/messages/threads",
	COMPANY_INVITE_USERS: "api/company/invite",

	PROPERTIES_ALL: "api/properties/all",
	PROPERTIES_DETAIL: "api/properties/detail",
	PROPERTIES_CREATE: "api/properties/create",
	PROPERTIES_UPDATE: "api/properties/update",
	PROPERTIES_ADD_DEALS: "api/properties/deals/add",
	PROPERTY_DEFINITIONS: "api/property/definitions",

	FIXTURES_CREATE: "api/fixture/create",
	FIXTURES_UPDATE: "api/fixture/update",
	FIXTURES_REMOVE: "api/fixture/remove",
	FIXTURES_ALL: "api/fixture/all",
	MARKETPLACE_LISTINGS: "api/marketplace/listings",
	SHARE_LISTING: "api/share/listing",
	AUTHENTICATION_PRE_REGISTER: "api/users/pre/register",

	COMMON_COUNTRIES_ALL: "api/search/countries/all",

	LISTING_SAVE: "api/listing/save",
	LISTING_DETAILS: "api/listing/details",
	PROPERTY_LISTING_DETAILS: "api/listing/property/details",
	CREATE_LISTING_DETAILS: "api/listing/create/details",


};

export default API_ENDPOINTS;
