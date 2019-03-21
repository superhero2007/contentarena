import React from "react";
import renderer from "react-test-renderer";
import DatePicker from "./DatePicker";

it("DatePicker renders correctly", () => {
	const tree = renderer
		.create(testingUtils.withContext(<DatePicker />))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
