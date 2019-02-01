import React from "react";
import Fetch from "../Fetch";
import {contentParserFromServer} from "../../common/utils/listing";

export const FetchMarketplaceListings = ({onResponse, filter}) => {

    return <Fetch
        onResponse={listings => {
            onResponse(listings.map( listing => contentParserFromServer(listing) ))
        }}
        url={"api/marketplace/listings"}
        data={filter}
    />
};