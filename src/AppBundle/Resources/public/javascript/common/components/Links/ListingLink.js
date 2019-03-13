import React from "react";
import { getListingUrl } from "@utils/routing";

const ListingLink = ({ customId, name, children }) => (
	<a href={getListingUrl(customId)} title={name} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);

export default ListingLink;
