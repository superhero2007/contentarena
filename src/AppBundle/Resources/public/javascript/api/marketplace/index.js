import React from "react";
import Fetch from "../Fetch";
import {contentParserFromServer} from "../../common/utils/listing";

export const FetchMarketplaceListings = ({onResponse, filter}) => {

    return <Fetch
        onResponse={response => {
            onResponse({
                listings: response.listings.map( listing => contentParserFromServer(listing) ),
                totalItems: response.totalItems
            })
        }}
        url={"api/marketplace/listings"}
        data={filter}
    />
};