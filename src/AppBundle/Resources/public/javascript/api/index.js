import propertiesApi from "./propertiesApi";
import companyApi from "./companyApi";
import shareApi from "./shareApi";
import marketplaceApi from "./marketplaceApi";

const api = {
	properties: propertiesApi,
	company: companyApi,
	share: shareApi,
	marketplace: marketplaceApi,
};

export default api;
