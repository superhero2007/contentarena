import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";

const EmptyEditProgram = ({ history, onCreate }, context) => (
	<div className="empty-property-tab left-aligned">
		<h4><Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_TITLE" /> </h4>
		<h6><Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_TEXT" /> </h6>

		<button
			className="button primary-outline-button"
			onClick={() => {
				if (onCreate) {
					onCreate();
				}
			}}
		>
			<Translate i18nKey="CMS_EMPTY_EDIT_RIGHTS_BUTTON" />
		</button>
	</div>
);

EmptyEditProgram.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default EmptyEditProgram;
