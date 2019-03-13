import { cmsTypes } from "../reducers/cms";

export const setConfig = config => ({
	type: cmsTypes.SET_CONFIG,
	config,
});
