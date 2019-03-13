import axios from "axios";
import showErrorModal from "./modals/ExpiredSessionModal/ExpiredSessionModal";

const instance = axios.create({
	baseURL: `${envhosturl}/`,
	headers: {
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
});

instance.interceptors.response.use(response => response, (error) => {
	if (error.response.status === 401) {
		showErrorModal();
	}
	return error;
});

export default instance;
