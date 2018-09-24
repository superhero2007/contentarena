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
        name: "Minimum Video Standard",
        key: "VIDEO_STANDARD",
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
        options : [
            "VIDEO_STANDARD_HD",
            "VIDEO_STANDARD_SD",
            "VIDEO_STANDARD_UHD",
            "VIDEO_STANDARD_VR"
        ],
        multiple : false,
        checkDelivery: true
    },
    {
        name: "Aspect ratio",
        key: "ASPECT_RATIO",
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
        options : [
            "ASPECT_RATIO_16_9",
            "ASPECT_RATIO_4_3",
            "ASPECT_RATIO_CUSTOM"
        ],
        multiple : false,
        checkDelivery: true
    },
    {
        name: "Graphics",
        key: "GRAPHICS",
        superRights: ["LT","HL", "LB", "NA","DT"],
        productionLabel : true,
        options : [
            "GRAPHICS_NO",
            "GRAPHICS_YES"
        ],
        multiple : false,
        checkDelivery: true
    },
    {
        name: "Commentary",
        key: "COMMENTARY",
        productionLabel : true,
        superRights: ["LT","HL", "LB", "NA","DT"],
        options : [
            "COMMENTARY_NO",
            "COMMENTARY_YES"
        ],
        multiple : false,
        checkDelivery: true
    },
    {
        name: "Camera standards",
        key: "CAMERA",
        productionLabel : true,
        superRights: ["LT","HL", "LB", "NA","DT"],
        options : [
            "CAMERA_MINIMUM"
        ],
        multiple : false,
        checkDelivery: true
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
        multiple : true,
        showTextArea:"FURTHER_DETAILS",
        technicalFee : "TECHNICAL_DELIVERY_SATELLITE",
        checkDelivery: true
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