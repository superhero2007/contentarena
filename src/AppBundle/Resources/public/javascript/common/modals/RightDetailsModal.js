import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsPopup from "../../cms/components/CmsPopup";

const RightDetailsModal = ({
	onCloseModal,
}) => (
	<CmsPopup
		title={<Translate i18nKey="COMMERCIAL_ACTIVITY_RIGHT_DETAILS_TITLE" />}
		onClose={onCloseModal}
		close={<Translate i18nKey="MESSAGE_POPUP_BUTTON_CLOSE" />}
	>
		<section />
	</CmsPopup>
);

RightDetailsModal.propTypes = {
	onCloseModal: PropTypes.func.isRequired,
};

RightDetailsModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default RightDetailsModal;
