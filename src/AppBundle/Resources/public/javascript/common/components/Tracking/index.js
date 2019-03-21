import ReactGA from "react-ga";

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const TrackingEvent = (category, action, label) => {
	ReactGA.event({
		category,
		action,
		label,
	});
};

export const initGA = (trackingID, testMode = false) => {
	ReactGA.initialize(trackingID, { testMode: testMode });
};

export const PageView = (page) => {
	ReactGA.pageview((page) ? page : window.location.pathname + window.location.search);
};
