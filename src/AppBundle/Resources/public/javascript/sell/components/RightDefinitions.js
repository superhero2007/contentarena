export const RightDefinitions = [
    {
        name: "Right to sublicense",
        key: "SUBLICENSE",
        superRights: [],
        options : [
            "SUBLICENSE_YES",
            "SUBLICENSE_YES_APPROVAL",
            "SUBLICENSE_NO"
        ],
        multiple : false
    },
    {
        name : "Cut available",
        key: "CUTS",
        superRights: ["HL","CL","NA"],
        options : [
            "CUT_AVAILABLE_YES",
            "CUT_AVAILABLE_NO",
        ],
        multiple : false,
        showTextArea : "CUT_AVAILABLE_YES"
    },
    {
        name : "Broadcasting obligation",
        key: "BROADCASTING",
        superRights: [],
        options : [
            "BROADCASTING_YES",
            "BROADCASTING_NO",
        ],
        multiple : false
    },
    {
        name : "Transmission means",
        key: "TRANSMISSION_MEANS",
        superRights: [],
        options : [
            "TRANSMISSION_MEANS_ALL",
            "TRANSMISSION_MEANS_CABLE",
            "TRANSMISSION_MEANS_SATELLITE",
            "TRANSMISSION_MEANS_DIGITAL",
            "TRANSMISSION_MEANS_OTT",
            "TRANSMISSION_MEANS_INTERNET",
            "TRANSMISSION_MEANS_MOBILE"
        ],
        multiple : true
    },
    {
        name: "Exploitation form",
        key : "EXPLOITATION_FORM",
        superRights : [],
        options: [
            "EXPLOITATION_FORM_ALL",
            "EXPLOITATION_FORM_FREE",
            "EXPLOITATION_FORM_PAY",
            "EXPLOITATION_FORM_IN-SHIP",
            "EXPLOITATION_FORM_CLOSED"
        ],
        multiple: true
    },
    {
        name : "Number of runs",
        key: "RUNS",
        superRights: ["CL","NA","PR", "DT", "HL"],
        options : [
            "RUNS_UNLIMITED",
            "RUNS_LIMITED",
        ],
        multiple : false
    },
    {
        name : "Exploitation window",
        key: "EXPLOITATION_WINDOW",
        superRights: ["CL","NA","PR", "DT", "HL"],
        options : [
            "EXPLOITATION_WINDOW_UNLIMITED",
            "EXPLOITATION_WINDOW_LIMITED",
        ],
        multiple : false,
        showTextArea:"EXPLOITATION_WINDOW_LIMITED"
    },
    {
        name : "Reserved rights",
        key: "RESERVED_RIGHTS",
        superRights: [],
        options : [
            "RESERVED_RIGHTS_NO",
            "RESERVED_RIGHTS_TEXT",
        ],
        multiple : false
    },
];