import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";

const Loader = ({
  loading, children, text, error, small, xSmall,
}, context) => {
  if (loading) {
    return (
      <div className="ca-loader">
        <div className={cn("spinner", { small, "x-small": xSmall })} />
        {(!small && !xSmall) && <b>{text || context.t("LOADER_DEFAULT_TEXT")}</b>}
      </div>
    );
  } if (children) {
    return children;
  }

  return null;
};

Loader.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Loader;
