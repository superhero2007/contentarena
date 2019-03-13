import request from "../common/request";
import API_ENDPOINTS from "./endpoints";

const fixturesApi = {
	createFixture: data => request.post(API_ENDPOINTS.FIXTURES_CREATE, data),
	removeFixture: data => request.post(API_ENDPOINTS.FIXTURES_REMOVE, data),
	updateFixture: data => request.post(API_ENDPOINTS.FIXTURES_UPDATE, data),
};


export default fixturesApi;
