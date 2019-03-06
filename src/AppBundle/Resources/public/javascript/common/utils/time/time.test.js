import moment from "moment";
import { formatMomentToServerFormat } from ".";

test("formatMomentToServerFormat: Moment is properly formatted", () => {
	const input = "2019-03-03T20:00:00";
	const m = moment(input, "YYYY-MM-DDTHH:mm:ss");
	expect(formatMomentToServerFormat(m)).toBe(input);
});
