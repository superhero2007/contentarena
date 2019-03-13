import React from "react";
import { ROUTE_PATHS } from "@constants";

export const getListingUrl = customId => `${ROUTE_PATHS.LISTING}/${customId}`;

export const getListingBidsUrl = customId => `${ROUTE_PATHS.COMMERCIAL_OVERVIEW}/filter/${customId}&withactivity`;
