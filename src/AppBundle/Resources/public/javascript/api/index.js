import propertiesApi from "./propertiesApi";
import companyApi from "./companyApi";
import shareApi from "./shareApi";
import marketplaceApi from "./marketplaceApi";
import messagesApi from "./messagesApi";
import notificationsApi from "./notificationsApi";
import authenticationApi from "./authenticationApi";

const api = {
	properties: propertiesApi,
	company: companyApi,
	share: shareApi,
	marketplace: marketplaceApi,
	messages: messagesApi,
	notifications: notificationsApi,
	authentication: authenticationApi,
};

export default api;
