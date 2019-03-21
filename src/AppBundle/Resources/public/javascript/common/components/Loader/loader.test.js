import React from "react";
import renderer from "react-test-renderer";
import Loader from "./Loader";

it("Loader renders correctly in loading state", () => {
	const tree = renderer
		.create(testingUtils.withContext(<Loader loading>Test</Loader>))
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("Loader renders correctly in inactive state", () => {
	const tree = renderer
		.create(testingUtils.withContext(<Loader>Test</Loader>))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
