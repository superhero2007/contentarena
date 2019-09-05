import React from "react";
import Translate from "@components/Translator/Translate";
import CmsCollapsedPopup from "./CmsCollapsedPopup";

const CmsFilterBox = ({ children }) => (
	<div className="filter-box">
		<CmsCollapsedPopup
			title={<Translate i18nKey="CMS_FILTER_BOX_TITLE" />}
			icon={<i className="fa fa-filter" />}
			toggle={false}
		>
			<div className="filter-box-body">
				{children}
			</div>
		</CmsCollapsedPopup>
	</div>
);

export default CmsFilterBox;
