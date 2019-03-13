import React from "react";
import cn from "classnames";
import { isTablet, isMobileOnly } from "react-device-detect";
import { goTo } from "../actions/utils";

const PublicHeaderBar = () => (
	<div className={cn("manager-header", { mobile: isMobileOnly })} style={{ marginBottom: 0 }}>
		<div className="logo" onClick={() => goTo("")} style={{ margin: "0 auto" }}>
			<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
		</div>
	</div>
);

export default PublicHeaderBar;
