export const RightItemsDefinitions = {
	BROADCASTING_YES: {
		parent: "Transmission Obligation",
		label: "Yes",
	},
	BROADCASTING_NO: {
		parent: "Transmission Obligation",
		label: "No",
	},
	SUBLICENSE_YES: {
		parent: "Right to sublicense",
		label: "Yes",
	},
	SUBLICENSE_YES_APPROVAL: {
		parent: "Right to sublicense",
		label: "Yes, but remains subject to seller's approval",
	},
	SUBLICENSE_NO: {
		parent: "Right to sublicense",
		label: "No",
	},
	CUT_AVAILABLE_YES: {
		parent: "Cut available",
		label: "Yes",
	},
	CUT_AVAILABLE_NO: {
		parent: "Cut available",
		label: "No",
	},
	TRANSMISSION_MEANS_ALL: {
		parent: "Transmission means",
		label: "All",
		all: true,
	},
	TRANSMISSION_MEANS_CABLE: {
		parent: "Transmission means",
		label: "Cable & IPTV",
	},
	TRANSMISSION_MEANS_SATELLITE: {
		parent: "Transmission means",
		label: "Satellite",
	},
	TRANSMISSION_MEANS_DIGITAL: {
		parent: "Transmission means",
		label: "Digital Terrestrial",
	},
	"TRANSMISSION_MEANS_OTT/INTERNET": {
		parent: "Transmission means",
		label: "OTT",
	},
	TRANSMISSION_MEANS_OTT: {
		parent: "Transmission means",
		label: "OTT",
	},
	TRANSMISSION_MEANS_INTERNET: {
		parent: "Transmission means",
		label: "Internet",
	},
	TRANSMISSION_MEANS_MOBILE: {
		parent: "Transmission means",
		label: "Mobile",
	},
	EXPLOITATION_FORM_ALL: {
		parent: "Transmission Form",
		label: "All",
		all: true,
	},
	EXPLOITATION_FORM_FREE: {
		parent: "Exploitation form",
		label: "Free Only",
	},
	EXPLOITATION_FORM_PAY: {
		parent: "Exploitation form",
		label: "Pay Only",
	},
	"EXPLOITATION_FORM_IN-SHIP": {
		parent: "Exploitation form",
		label: "In-Ship & In-Flight",
	},
	EXPLOITATION_FORM_CLOSED: {
		parent: "Exploitation form",
		label: "Closed Circuit",
	},
	RUNS_UNLIMITED: {
		parent: "Number of runs",
		label: "Unlimited",
	},
	RUNS_LIMITED: {
		parent: "Number of runs",
		label: "Limited",
		numberField: true,
	},
	EXPLOITATION_WINDOW_UNLIMITED: {
		parent: "Exploitation window",
		label: "Unlimited",
	},
	EXPLOITATION_WINDOW_LIMITED: {
		parent: "Exploitation window",
		label: "Limited",
	},

	VIDEO_STANDARD_HD: {
		parent: "Video standard",
		label: "HD",
	},
	VIDEO_STANDARD_SD: {
		parent: "Video standard",
		label: "SD",
	},
	VIDEO_STANDARD_UHD: {
		parent: "Video standard",
		label: "UHD",
	},
	VIDEO_STANDARD_VR: {
		parent: "Video standard",
		label: "VR",
	},
	VIDEO_STANDARD_NOT_AVAILABLE: {
		parent: "Video standard",
		label: "Info not available yet",
	},
	RESERVED_RIGHTS_NO: {
		parent: "Reserved rights",
		label: "No",
	},
	RESERVED_RIGHTS_YES: {
		parent: "Reserved rights",
		label: "Yes",

	},
	ASPECT_RATIO_16_9: {
		parent: "Aspect ratio",
		label: "16:9",
	},
	ASPECT_RATIO_4_3: {
		parent: "Aspect ratio",
		label: "4:3",
	},
	ASPECT_RATIO_CUSTOM: {
		parent: "Aspect ratio",
		label: "Other",
		textField: true,
	},
	ASPECT_RATIO_NOT_AVAILABLE: {
		parent: "Aspect ratio",
		label: "Info not available yet",
	},
	GRAPHICS_NO: {
		parent: "Graphics",
		label: "No",
	},
	GRAPHICS_YES: {
		parent: "Graphics",
		label: "Yes",
		language: true,
		languages: [],
	},
	GRAPHICS_NOT_AVAILABLE: {
		parent: "Graphics",
		label: "Info not available yet",
	},
	COMMENTARY_NO: {
		parent: "Commentary",
		label: "No",
	},
	COMMENTARY_YES: {
		parent: "Commentary",
		label: "Yes",
		language: true,
		languages: [],
		validate: true,
	},
	COMMENTARY_NOT_AVAILABLE: {
		parent: "Commentary",
		label: "Info not available yet",
	},
	LICENSED_LANGUAGES_YES: {
		label: "",
		language: true,
		languages: [],
	},
	CAMERA_MINIMUM: {
		parent: "Camera standards",
		label: "Minimum cameras",
		numberField: true,
		numberFieldValue: "CAMERAS",
	},
	CAMERA_TEXT: {
		parent: "Camera standards",
		label: "",
		textField: true,
	},
	CAMERA_NOT_AVAILABLE: {
		parent: "Camera standards",
		label: "Info not available yet",
	},
	CONTENT_ALL: {
		parent: "Content production",
		label: "All content produced",
	},
	CONTENT_TEXT: {
		parent: "Content production",
		label: "Content partially produced",
	},

	TECHNICAL_DELIVERY_SATELLITE: {
		parent: "Technical delivery",
		label: "Satellite",
	},

	TECHNICAL_DELIVERY_IP: {
		parent: "Technical delivery",
		label: "IP",
	},

	TECHNICAL_DELIVERY_FTP: {
		parent: "Technical delivery",
		label: "FTP-server",
	},

	TECHNICAL_DELIVERY_FIBER: {
		parent: "Technical delivery",
		label: "Fiber",
	},

	CONTENT_DELIVERY_LIVE: {
		parent: "Content Delivery",
		label: "Delivered via live feed",
		disabledIf: ["LT", "PR"],

	},

	CONTENT_DELIVERY_DEDICATED: {
		parent: "Content Delivery",
		label: "Dedicated content delivery",
		disabledIf: ["LT", "PR"],
	},

	CONTENT_DELIVERY_NON_DEDICATED: {
		parent: "Content Delivery",
		label: "No dedicated content delivery",
		disabledIf: ["LT", "PR"],
	},


};
