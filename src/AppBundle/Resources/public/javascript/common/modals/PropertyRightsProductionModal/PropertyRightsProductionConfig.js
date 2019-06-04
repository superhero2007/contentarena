import { VALIDATION_KEYS } from "@constants";

export const CONTENT_DELIVERY = {
	name: "Content Delivery",
	descriptionKey: "RIGHTS_CONTENT_DELIVERY_DESCRIPTION",
	key: "CONTENT_DELIVERY",
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
	headers: [
		"SUBLICENSE_YES",
		"SUBLICENSE_YES_APPROVAL",
		"SUBLICENSE_NO",
	],
	multiple: false,
	descriptionKey: "RIGHTS_SUBLICENSE_DESCRIPTION",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const BROADCASTING = {
	name: "Transmission Obligation",
	key: "BROADCASTING",
	headers: [
		"BROADCASTING_NO",
		"BROADCASTING_YES",
	],
	textAreaLabelKey: "CL3_COMMENTS_TRANSMISSION_PLACEHOLDER",
	multiple: false,
	descriptionKey: "RIGHTS_BROADCASTING_DESCRIPTION",
	validateTextarea: true,
	validations: [
		{
			key: "BROADCASTING",
			value: "BROADCASTING_YES",
			keyToCheck: "BROADCASTING_TEXTAREA",
			type: VALIDATION_KEYS.NO_EMPTY_STRING,
		},
	],
};

export const TRANSMISSION_MEANS = {
	name: "Transmission means",
	key: "TRANSMISSION_MEANS",
	headers: [
		"TRANSMISSION_MEANS_ALL",
		"TRANSMISSION_MEANS_CABLE",
		"TRANSMISSION_MEANS_SATELLITE",
		"TRANSMISSION_MEANS_DIGITAL",
		"TRANSMISSION_MEANS_OTT/INTERNET",
		"TRANSMISSION_MEANS_MOBILE",
	],
	multiple: true,
	descriptionKey: "RIGHTS_TRANSMISSION_MEANS_DESCRIPTION",
	selectAllCheckbox: "TRANSMISSION_MEANS_ALL",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const EXPLOITATION_FORM = {
	name: "Transmission Form",
	key: "EXPLOITATION_FORM",
	headers: [
		"EXPLOITATION_FORM_ALL",
		"EXPLOITATION_FORM_FREE",
		"EXPLOITATION_FORM_PAY",
		"EXPLOITATION_FORM_CLOSED",
	],
	multiple: true,
	descriptionKey: "RIGHTS_EXPLOITATION_FORM_DESCRIPTION",
	selectAllCheckbox: "EXPLOITATION_FORM_ALL",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
};

export const LICENSED_LANGUAGES = {
	name: "Licensed languages",
	key: "LICENSED_LANGUAGES",
	headers: [],
	languageSelector: true,
	descriptionKey: "RIGHTS_LICENSED_LANGUAGES_DESCRIPTION",
	textAreaLabelKey: "CL3_COMMENTS_PLACEHOLDER",
	validations: [
		{
			key: "LICENSED_LANGUAGES",
			value: "LICENSED_LANGUAGES_YES",
			keyToCheck: "LICENSED_LANGUAGE_LIST",
			type: VALIDATION_KEYS.NO_EMPTY_ARR,
		},
	],
};

export const RESERVED_RIGHTS = {
	name: "Reserved rights",
	key: "RESERVED_RIGHTS",
	headers: [
		"RESERVED_RIGHTS_NO",
		"RESERVED_RIGHTS_YES",
	],
	multiple: false,
	descriptionKey: "RIGHTS_RESERVED_RIGHTS_DESCRIPTION",
	textAreaLabelKey: "CL3_COMMENTS_RESERVED_PLACEHOLDER",
	validateTextarea: true,
	validations: [
		{
			key: "RESERVED_RIGHTS",
			value: "RESERVED_RIGHTS_YES",
			keyToCheck: "RESERVED_RIGHTS_TEXTAREA",
			type: VALIDATION_KEYS.NO_EMPTY_STRING,
		},
	],
};
