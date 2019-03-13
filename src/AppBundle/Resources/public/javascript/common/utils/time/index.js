import moment from "moment/moment";
import { SERVER_DATE_TIME_FORMAT, TIME_FORMAT } from "../../constants";

export const formatMomentToServerFormat = m => m.format(SERVER_DATE_TIME_FORMAT);

export const formatMomentToServerTime = m => m.format(TIME_FORMAT);

export const getYears = (startYear = null, endYear = null, startOffset = 5, endOffset = 5) => {
	const currentYear = moment().year();
	const years = [];

	if (!startYear) startYear = currentYear - startOffset;
	if (!endYear) endYear = currentYear + endOffset;

	for (let i = startYear; i < endYear; i++) {
		years.push(i);
	}
	return years;
};

export const getMonths = () => Array.apply(0, Array(12)).map((_, i) => moment().month(i).format("MMM"));
