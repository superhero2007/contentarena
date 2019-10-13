import React from "react";
import cn from "classnames";
import { getCurrencySymbol } from "../../main/actions/utils";

const CmsBundleMinimumBid = ({
	 minimumBid, currency,
}) => (
	<>
		{minimumBid} {getCurrencySymbol(currency)}
	</>
);

export default CmsBundleMinimumBid;
