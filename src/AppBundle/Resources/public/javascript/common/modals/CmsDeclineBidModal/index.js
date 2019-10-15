import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Modal from "react-modal";
import Translate from "@components/Translator/Translate";
import CmsPopup from "../../../cms/components/CmsPopup";
import Loader from "../../components/Loader";

const CmsDeclineBidModal = ({
	selectedBid,
	postAction,
	onCloseModal,
}, context) => {
	const [message, setMessage] = useState("");
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleMsgChange = event => setMessage(event.target.value);

	const handleDeclineBid = () => {
		setLoading(true);
		let payload = selectedBid;
		payload = { ...payload, message };

		ContentArena.ContentApi.rejectBid(payload)
			.then(
				() => {
					onCloseModal();
					postAction();
				},
				() => {
					setFail(true);
					setLoading(false);
				},
			);
	};

	return (
		<CmsPopup
			title={<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_TITLE_REJECT" />}
			onClose={onCloseModal}
			onApply={handleDeclineBid}
			apply={fail || loading ? "" : <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_REJECT_CONFIRM" />}
			close={<Translate i18nKey="MESSAGE_POPUP_BUTTON_CANCEL" />}
		>
			<Loader loading={loading}>
				{!fail ? (
					<textarea
						placeholder={context.t("COMMERCIAL_ACTIVITY_BID_REJECT_PLACEHOLDER")}
						onChange={handleMsgChange}
						name="messageBox"
						className="input-textarea"
						value={message}
					/>
				) : (
					<div className="body-msg">
						<Translate i18nKey="COMMERCIAL_ACTIVITY_DECLINE_BID_FAILED" />
					</div>
				)}
			</Loader>
		</CmsPopup>
	);
};

CmsDeclineBidModal.propTypes = {
	selectedBid: PropTypes.object.isRequired,
	postAction: PropTypes.func.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

CmsDeclineBidModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsDeclineBidModal;
