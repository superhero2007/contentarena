import React from "react";
import * as ReactGA from 'react-ga';
import { TrackingEvent, initGA, PageView } from "./index";

it('Tracking initializes GA correctly', () => {
	ReactGA.testModeAPI.calls.length = 0;
	initGA("UA-136237491-1", true);
	expect(ReactGA.testModeAPI.calls).toEqual([['create', 'UA-136237491-1', 'auto']]);
});

it('Tracking initializes GA correctly and tacks page view with page param', () => {
	ReactGA.testModeAPI.calls.length = 0;
	initGA("UA-136237491-1", true);
	PageView("/marketplace");
	expect(ReactGA.testModeAPI.calls).toEqual([
		['create', 'UA-136237491-1', 'auto'],
		['send', { "hitType": "pageview", "page": "/marketplace" } ]
	]);
});

it('Tracking initializes GA correctly and tacks page view without page param', () => {
	ReactGA.testModeAPI.calls.length = 0;
	initGA("UA-136237491-1", true);
	PageView();
	expect(ReactGA.testModeAPI.calls).toEqual([
		['create', 'UA-136237491-1', 'auto'],
		['send', { "hitType": "pageview", "page": "/" } ]
	]);
});

it('Tracking initializes GA correctly and tacks event', () => {
	ReactGA.testModeAPI.calls.length = 0;
	initGA("UA-136237491-1", true);
	TrackingEvent("category", "action", "level");
	expect(ReactGA.testModeAPI.calls).toEqual([
		['create', 'UA-136237491-1', 'auto'],
		['send', { "eventAction": "Action", "eventCategory": "Category", "eventLabel": "Level", "hitType": "event" }]
	]);
});
