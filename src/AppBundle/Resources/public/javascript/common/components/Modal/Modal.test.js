import React from "react";
import renderer from "react-test-renderer";
import Modal from "./Modal";
import withContext from "../../../tests/testing-utils/index";

it("Modal renders correctly", () => {
	const tree = renderer
		.create(withContext(<Modal />))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
