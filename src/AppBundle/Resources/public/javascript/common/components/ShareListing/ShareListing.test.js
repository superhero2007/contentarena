import React from "react";
import renderer from "react-test-renderer";
import ShareListing from "./ShareListing";
import withContext from "../../../tests/testing-utils/index";

it("ShareListing renders correctly", () => {
	const tree = renderer
		.create(withContext(<ShareListing listingId={1} />))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
