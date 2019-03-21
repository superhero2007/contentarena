import React from "react";
import renderer from "react-test-renderer";
import ShareListing from "./ShareListing";

it("ShareListing renders correctly", () => {
	const tree = renderer
		.create(testingUtils.withContext(<ShareListing listingId={1} />))
		.toJSON();
	expect(tree).toMatchSnapshot();
});
