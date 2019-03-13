import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { cmsFile } from "../../../main/components/Icons";

const EmptyFixture = ({ onCreate }) => (
	<div className="empty-property-tab">
		<img src={cmsFile} alt="" />
		<h3><Translate i18nKey="CMS_EMPTY_SEASON_FIXTURE_TITLE" /> </h3>
		<h4><Translate i18nKey="CMS_EMPTY_SEASON_FIXTURE_TEXT" /> </h4>
		<a className="ca-btn primary" onClick={onCreate}>
			<Translate i18nKey="CMS_EMPTY_FIXTURE_CREATE_SEASON" />
		</a>
	</div>
);

EmptyFixture.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyFixture;
