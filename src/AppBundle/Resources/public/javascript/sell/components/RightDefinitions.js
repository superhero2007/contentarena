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
        multiple : false,
        description: 'Means the right to sublicense the granted Audio-visual Rights to a third party subject to (i) Licensee being liable for the acts or omissions of each sub-licensee regarding the exploitation of Audio-visual Rights as if such acts or omissions were the acts or omissions of Licensee and (ii) Licensee remaining fully liable for all their obligations set out in this Agreement towards Licensor.'
    },
    {
        name : "Transmission Obligation",
        key: "BROADCASTING",
        superRights: [],
        options : [
            "BROADCASTING_NO",
            "BROADCASTING_YES"
        ],
        showTextArea:"BROADCASTING_YES",
        multiple : false,
        description: 'Means the obligation to a specific Transmission of the Program.'
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
        multiple : true,
        description: 'Means the technical means on which Licensee may Transmit Program as per Rights Specification.'
    },
    {
        name: "Transmission Form",
        key : "EXPLOITATION_FORM",
        superRights : [],
        options: [
            "EXPLOITATION_FORM_ALL",
            "EXPLOITATION_FORM_FREE",
            "EXPLOITATION_FORM_PAY",
            "EXPLOITATION_FORM_IN-SHIP",
            "EXPLOITATION_FORM_CLOSED"
        ],
        multiple: true,
        description: 'Means the form of exploitation for which the Audio-visual Rights to the Program is granted.'
    },
    {
        name : "Licensed languages",
        key : "LICENSED_LANGUAGES",
        superRights : [],
        options : [],
        global : true,
        language : true,
        description: 'Means the language in which Licensee my exploit the Granted Rights.'
    },
    {
        name : "Number of runs",
        key: "RUNS",
        superRights: ["CL","NA","PR", "DT", "HL"],
        options : [
            "RUNS_UNLIMITED",
            "RUNS_LIMITED",
        ],
        multiple : false,
        description: 'Means the number of Transmission of the Program.'
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
        description: 'Means the specific time frame within the License Period in which the specific right may be exploited.',
        showTextArea:"EXPLOITATION_WINDOW_LIMITED"
    },
    {
        name : "Reserved rights",
        key: "RESERVED_RIGHTS",
        superRights: [],
        options : [
            "RESERVED_RIGHTS_NO",
            "RESERVED_RIGHTS_YES",
        ],
        multiple : false,
        description: 'Means the Audio-visual Rights to the Program that may be exploited by Licensor and its sublicensee irrespective of any exclusivity granted.',
        showTextArea:"RESERVED_RIGHTS_YES"

    },
];