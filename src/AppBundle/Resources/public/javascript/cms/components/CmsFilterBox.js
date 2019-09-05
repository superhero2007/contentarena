import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsCollapsedPopup from "./CmsCollapsedPopup";

const CmsFilterBox = ({ children }, context) => (
	<CmsCollapsedPopup
		title={<Translate i18nKey="CMS_FILTER_BOX_TITLE" />}
		icon={<i className="fa fa-filter" />}
	>
		{children}
	</CmsCollapsedPopup>
);

CmsFilterBox.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsFilterBox.propTypes = {
};

export default CmsFilterBox;
