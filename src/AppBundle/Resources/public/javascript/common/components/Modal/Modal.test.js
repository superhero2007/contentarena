import React from "react";
import renderer from "react-test-renderer";
import Modal from "./Modal";

it("Modal renders correctly", () => {
	const tree = renderer
		.create(testingUtils.withContext(<Modal />))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
