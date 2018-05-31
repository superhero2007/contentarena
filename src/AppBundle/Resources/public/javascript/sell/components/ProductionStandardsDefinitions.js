export const ProductionStandardsDefinitions = [
    {
        name: "Video Standard",
        key: "VIDEO_STANDARD",
        superRights: [],
        options : [
            "VIDEO_STANDARD_HD",
            "VIDEO_STANDARD_SD",
            "VIDEO_STANDARD_UHD",
            "VIDEO_STANDARD_VR",
            "VIDEO_STANDARD_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Aspect ratio",
        key: "ASPECT_RATIO",
        superRights: [],
        options : [
            "ASPECT_RATIO_16_9",
            "ASPECT_RATIO_4_3",
            "ASPECT_RATIO_CUSTOM",
            "ASPECT_RATIO_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Graphics",
        key: "GRAPHICS",
        superRights: [],
        options : [
            "GRAPHICS_NO",
            "GRAPHICS_YES",
            "GRAPHICS_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Commentary",
        key: "COMMENTARY",
        superRights: [],
        options : [
            "COMMENTARY_NO",
            "COMMENTARY_YES",
            "COMMENTARY_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Camera standards",
        key: "CAMERA",
        superRights: [],
        options : [
            "CAMERA_MINIMUM",
            "CAMERA_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Technical delivery",
        key: "TECHNICAL_DELIVERY",
        superRights: [],
        options : [
            "TECHNICAL_DELIVERY_SATELLITE",
            "TECHNICAL_DELIVERY_IP",
            "TECHNICAL_DELIVERY_FTP",
            "TECHNICAL_DELIVERY_FIBER",
        ],
        multiple : false,
        showTextArea:"FURTHER_DETAILS",
        technicalFee : "TECHNICAL_DELIVERY_SATELLITE"
    },
    {
        name: "Content production",
        key: "CONTENT",
        superRights: [],
        options : [
            "CONTENT_ALL",
            "CONTENT_TEXT",
        ],
        showTextArea:"CONTENT_TEXT",
        multiple : false
    },
    {
        name: "Program Details",
        key: "PROGRAM",
        superRights: ['PR'],
        options : [
        ],
        multiple : false
    }
];