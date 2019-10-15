import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsCheckBox from "../../cms/components/CmsCheckBox";

const CmsGeneralTerms = ({
	value,
	onChange,
	isInvalid,
}) => (
	<CmsCheckBox
		value={value}
		onChange={onChange}
		isInvalid={isInvalid}
		text={
			(
				<div className="d-flex">
					<Translate i18nKey="GENERIC_TERMS_TEXT_1" />
					<a
						href="/CmsGeneralTerms"
						target="_blank"
						rel="noopener noreferrer"
					>
						&nbsp;Terms & Conditions&nbsp;
					</a>
					<Translate i18nKey="GENERIC_TERMS_TEXT_2" />
				</div>
			)
		}
	/>
);

CmsGeneralTerms.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default CmsGeneralTerms;
