import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";

const EmptyEditProgram = ({ history, onCreate }, context) => (
	<div className="empty-property-tab left-aligned">
		<h3><Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_TITLE" /> </h3>
		<h6><Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_TEXT" /> </h6>

		<button
			className="ca-btn primary"
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
