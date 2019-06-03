import { VALIDATION_KEYS } from "@constants";

export const CONTENT_DELIVERY = {
	name: "Content Delivery",
	descriptionKey: "RIGHTS_CONTENT_DELIVERY_DESCRIPTION",
	key: "CONTENT_DELIVERY",
	superRights: [],
	headers: [
		"CONTENT_DELIVERY_LIVE",
		"CONTENT_DELIVERY_DEDICATED",
	],
	multiple: false,
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	disabled: {
		CONTENT_DELIVERY_DEDICATED: ["LT", "PR"],
		CONTENT_DELIVERY_LIVE: ["LT", "PR"],
	},
};

export const ASPECT_RATIO = {
	name: "Aspect ratio",
	descriptionKey: "RIGHTS_ASPECT_RATIO_DESCRIPTION",
	key: "ASPECT_RATIO",
	superRights: ["LT", "HL", "LB", "NA", "DT"],
	productionLabel: true,
	checkDelivery: true,
	headers: [
		"ASPECT_RATIO_16_9",
		"ASPECT_RATIO_4_3",
		"ASPECT_RATIO_CUSTOM",
	],
	multiple: false,
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	validations: [
		{
			key: "ASPECT_RATIO",
			value: "ASPECT_RATIO_CUSTOM",
			keyToCheck: "ASPECT_RATIO_TEXT",
			type: VALIDATION_KEYS.NO_EMPTY_STRING,
		},
	],
};

export const GRAPHICS = {
	name: "Graphics",
	descriptionKey: "RIGHTS_GRAPHICS_DESCRIPTION",
	key: "GRAPHICS",
	superRights: ["LT", "HL", "LB", "NA", "DT"],
	productionLabel: true,
	checkDelivery: true,
	headers: [
		"GRAPHICS_NO",
		"GRAPHICS_YES",
	],
	multiple: false,
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	validations: [
		{
			key: "GRAPHICS",
			value: "GRAPHICS_YES",
			keyToCheck: "GRAPHICS_LANGUAGES",
			type: VALIDATION_KEYS.NO_EMPTY_ARR,
		},
	],
};

export const COMMENTARY = {
	name: "Commentary",
	descriptionKey: "RIGHTS_COMMENTARY_DESCRIPTION",
	key: "COMMENTARY",
	productionLabel: true,
	checkDelivery: true,
	superRights: ["LT", "HL", "LB", "NA", "DT"],
	headers: [
		"COMMENTARY_NO",
		"COMMENTARY_YES",
	],
	multiple: false,
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	validations: [
		{
			key: "COMMENTARY",
			value: "COMMENTARY_YES",
			keyToCheck: "COMMENTARY_LANGUAGES",
			type: VALIDATION_KEYS.NO_EMPTY_ARR,
		},
	],
};

export const CAMERA = {
	name: "Camera standards",
	descriptionKey: "RIGHTS_CAMERA_DESCRIPTION",
	minimumDefault: 4,
	key: "CAMERA",
	productionLabel: true,
	checkDelivery: true,
	superRights: ["LT", "HL", "LB", "NA", "DT"],
	headers: [
		"CAMERA_MINIMUM",
	],
	multiple: false,
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	validations: [
		{
			key: "CAMERA",
			value: "CAMERA_MINIMUM",
			keyToCheck: "CAMERAS",
			type: VALIDATION_KEYS.NO_ZERO,
		},
	],
};

export const TECHNICAL_DELIVERY = {
	name: "Delivery Method",
	descriptionKey: "RIGHTS_TECHNICAL_DELIVERY_DESCRIPTION",
	key: "TECHNICAL_DELIVERY",
	productionLabel: true,
	checkDelivery: true,
	superRights: [],
	headers: [
		"TECHNICAL_DELIVERY_SATELLITE",
		"TECHNICAL_DELIVERY_IP",
		"TECHNICAL_DELIVERY_FTP",
		"TECHNICAL_DELIVERY_FIBER",
	],
	multiple: true,
	technicalFee: "TECHNICAL_DELIVERY_SATELLITE",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};


export const SUBLICENSE = {
	name: "Right to sublicense",
	key: "SUBLICENSE",
	superRights: [],
	headers: [
		"SUBLICENSE_YES",
		"SUBLICENSE_YES_APPROVAL",
		"SUBLICENSE_NO",
	],
	multiple: false,
	description: "Means the licensee's right to sublicense the program to a third party.",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const BROADCASTING = {
	name: "Transmission Obligation",
	key: "BROADCASTING",
	superRights: [],
	headers: [
		"BROADCASTING_NO",
		"BROADCASTING_YES",
	],
	textAreaRequired: "BROADCASTING_YES",
	textAreaLabelKey: "CL3_COMMENTS_TRANSMISSION_PLACEHOLDER",
	multiple: false,
	description: "Means the licensee's obligation to transmit the program.",
};

export const TRANSMISSION_MEANS = {
	name: "Transmission means",
	key: "TRANSMISSION_MEANS",
	superRights: [],
	headers: [
		"TRANSMISSION_MEANS_ALL",
		"TRANSMISSION_MEANS_CABLE",
		"TRANSMISSION_MEANS_SATELLITE",
		"TRANSMISSION_MEANS_DIGITAL",
		"TRANSMISSION_MEANS_OTT/INTERNET",
		"TRANSMISSION_MEANS_MOBILE",
	],
	multiple: true,
	description: "Means the technical means on which the licensee may transmit the program to the end-user.",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const EXPLOITATION_FORM = {
	name: "Transmission Form",
	key: "EXPLOITATION_FORM",
	superRights: [],
	headers: [
		"EXPLOITATION_FORM_ALL",
		"EXPLOITATION_FORM_FREE",
		"EXPLOITATION_FORM_PAY",
		"EXPLOITATION_FORM_CLOSED",
	],
	multiple: true,
	description: "Means the commercial form by means of which the licensee may transmit the program to the end-user.",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const LICENSED_LANGUAGES = {
	name: "Licensed languages",
	key: "LICENSED_LANGUAGES",
	superRights: [],
	headers: [],
	global: true,
	language: true,
	description: "Means the language in which the licensee my exploit the granted rights.",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const RESERVED_RIGHTS = {
	name: "Reserved rights",
	key: "RESERVED_RIGHTS",
	superRights: [],
	headers: [
		"RESERVED_RIGHTS_NO",
		"RESERVED_RIGHTS_YES",
	],
	multiple: false,
	description: "Means the audio-visual rights to the program that you, or your sublicensee, may exploit irrespective of any exclusivity granted.",
	textAreaRequired: "RESERVED_RIGHTS_YES",
	textAreaLabelKey: "CL3_COMMENTS_RESERVED_PLACEHOLDER",
};
