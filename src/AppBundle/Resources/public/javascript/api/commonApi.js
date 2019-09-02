import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const sortByLabel = (a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

const commonApi = {
	countriesAll: async () => {
		let { data } = await request.post(API_ENDPOINTS.COMMON_COUNTRIES_ALL, {});
		data.sort(sortByLabel);
		data = data.map((c) => {
			c.externalId = c.id;
			return c;
		});
		return { data };
	},
};


export default commonApi;
