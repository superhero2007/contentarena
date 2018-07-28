export const ProductionStandardsDefinitions = [
    {
        name: "Content Delivery",
        key: "CONTENT_DELIVERY",
        superRights: [],
        options : [
            "CONTENT_DELIVERY_LIVE",
            "CONTENT_DELIVERY_DEDICATED",
            "CONTENT_DELIVERY_NON_DEDICATED"
        ],
        multiple : false
    },
    {
        name: "Video Standard",
        key: "VIDEO_STANDARD",
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
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
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
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
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
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
        productionLabel : true,
        superRights: ["LT","HL", "LB", "NA","DT"],
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
        productionLabel : true,
        superRights: ["LT","HL", "LB", "NA","DT"],
        options : [
            "CAMERA_MINIMUM",
            "CAMERA_NOT_AVAILABLE"
        ],
        multiple : false
    },
    {
        name: "Delivery Method",
        key: "TECHNICAL_DELIVERY",
        productionLabel : true,
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
        name: "Program Details",
        key: "PROGRAM",
        superRights: ['PR'],
        options : [
        ],
        multiple : false
    }

];