import { SERVER_DATE_TIME_FORMAT } from "../../constants";
import moment from "moment/moment";

export const formatMomentToServerFormat = m => m.format(SERVER_DATE_TIME_FORMAT);

export const getYears = (start = null, end = null) => {
	const currentYear = moment().year();
	const years = [];

	if (!start) start = currentYear - 5;
	if (!end) end = currentYear + 5;

	for (let i = start; i < end; i++) {
		years.push(i);
	}
	return years;
};

export const getMonths = () => Array.apply(0, Array(12)).map((_, i) => moment().month(i).format("MMM"));
