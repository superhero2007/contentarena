import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import Translate from "@components/Translator/Translate";

const Loader = ({
	loading, children, text, error, small, xSmall,
}) => {
	if (loading) {
		return (
			<div className="ca-loader">
				<div className={cn("spinner", { small, "x-small": xSmall })} />
				{(!small && !xSmall) && <b>{text || <Translate i18nKey="LOADER_DEFAULT_TEXT" /> }</b>}
			</div>
		);
	}
	if (children) {
		return children;
	}

	return null;
};

Loader.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default Loader;
