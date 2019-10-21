import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsPopup from "../../cms/components/CmsPopup";
import { RIGHTS_TAB } from "../constants";

const tabs = [{
	title: "SUBLICENSE_TITLE",
	type: RIGHTS_TAB.SUBLICENSE,
}, {
	title: "BROADCASTING_TITLE",
	type: RIGHTS_TAB.BROADCASTING,
}, {
	title: "EXPLOITATION_FORM_TITLE",
	type: RIGHTS_TAB.EXPLOITATION_FORM,
	multiple: true,
}, {
	title: "TRANSMISSION_MEANS_TITLE",
	type: RIGHTS_TAB.TRANSMISSION_MEANS,
	multiple: true,
}, {
	title: "LICENSED_LANGUAGES_TITLE",
	type: RIGHTS_TAB.LICENSED_LANGUAGES,
	language: true,
}, {
	title: "RESERVED_RIGHTS_TITLE",
	type: RIGHTS_TAB.RESERVED_RIGHTS,
}];

const RightDetailsModal = ({
	onCloseModal, deal,
}) => (
	<CmsPopup
		title={<Translate i18nKey="COMMERCIAL_ACTIVITY_RIGHT_DETAILS_TITLE" />}
		onClose={onCloseModal}
		close={<Translate i18nKey="MESSAGE_POPUP_BUTTON_CLOSE" />}
	>
		<section>
			<div className="modal-table">
				<div className="modal-table-row">
					<div className="modal-table-cell" />
					{deal.rights.map(right => (
						<div className="modal-table-cell modal-table-header justify-content-center">
							{right.name}
						</div>
					))}
				</div>
				{tabs.map(tab => (
					<div className="modal-table-row">
						<div className="modal-table-cell modal-table-header">
							<Translate i18nKey={tab.title} />
						</div>
						{deal.rights.map(right => (
							<div className="modal-table-cell justify-content-center">
								{right.details && !tab.multiple && !tab.language && (
									<Translate i18nKey={right.details[tab.type]} />
								)}
								{right.details && tab.multiple && right.details[tab.type].map(detail => <span><Translate i18nKey={detail} /></span>)}
								{right.details && tab.language && right.details.LICENSED_LANGUAGE_LIST.map(language => <span>{language.label}</span>)}
							</div>
						))}
					</div>
				))}
			</div>

		</section>
	</CmsPopup>
);

RightDetailsModal.propTypes = {
	onCloseModal: PropTypes.func.isRequired,
};

RightDetailsModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default RightDetailsModal;
