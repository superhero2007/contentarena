import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import CmsGeneralTerms from "../../../main/components/CmsGeneralTerms";
import CmsDigitalSignature from "../../../main/components/CmsDigitalSignature";
import store from "../../../main/store";
import CmsPopup from "../../../cms/components/CmsPopup";
import { disableValidation, enableValidation } from "../../../main/actions/validationActions";
import Loader from "../../components/Loader";

const CmsAcceptBidModal = ({
	validation,
	enableValidation,
	disableValidation,
	contentId,
	selectedBid,
	postAction,
	listingCustomId,
	onCloseModal,
}) => {
	const { user } = store.getState();
	const [signature, setSignature] = useState("");
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [terms, setTerms] = useState(false);
	const [signatureName, setSignatureName] = useState(`${user.firstName} ${user.lastName}`);
	const [signaturePosition, setSignaturePosition] = useState(user.title);
	const [signatureMessage, setSignatureMessage] = useState("");
	const isAcceptDisabled = !signature || !terms;
	const isTermsInvalid = !terms && validation;

	useEffect(() => () => {
		if (validation) disableValidation();
	}, []);

	const handleTermsAndConditions = () => setTerms(!terms);

	const handleAcceptBid = () => {
		setLoading(true);
		disableValidation();

		const payload = selectedBid;
		payload.content = contentId;

		ContentArena.ContentApi.acceptBid(payload, signature, signatureName, signaturePosition)
			.then(
				() => {
					onCloseModal();
					postAction(listingCustomId);
				},
				() => {
					setFail(true);
					setLoading(false);
				},
			);
	};

	return (
		<CmsPopup
			title={<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_TITLE_ACCEPT" />}
			onClose={onCloseModal}
			onApply={isAcceptDisabled ? enableValidation : handleAcceptBid}
			apply={fail || loading ? "" : <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_ACCEPT" />}
			close={<Translate i18nKey="MESSAGE_POPUP_BUTTON_CANCEL" />}
			disabled={!isAcceptDisabled && (!signature || !terms || !signaturePosition.trim() || !signatureName.trim())}
		>
			<section>
				<Loader loading={loading}>
					{!fail ? (
						<div>
							<CmsDigitalSignature
								customClass="acceptBidModal"
								licenseBidId={selectedBid.customId}
								signature={signature}
								signatureName={signatureName}
								signaturePosition={signaturePosition}
								signatureMessage={signatureMessage}
								onChangeSignatureName={e => setSignatureName(e.target.value)}
								onChangeSignaturePosition={e => setSignaturePosition(e.target.value)}
								onChangeSignatureMessage={e => setSignatureMessage(e.target.value)}
								onReady={setSignature}
							/>
							<CmsGeneralTerms
								value={terms}
								onChange={handleTermsAndConditions}
								isInvalid={isTermsInvalid}
							/>
						</div>
					) : (
						<div className="body-msg">
							<Translate i18nKey="COMMERCIAL_ACTIVITY_ACCEPT_BID_FAILED" />
						</div>
					)}
				</Loader>
			</section>
		</CmsPopup>
	);
};

const mapStateToProps = state => ({
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

CmsAcceptBidModal.propTypes = {
	selectedBid: PropTypes.object.isRequired,
	postAction: PropTypes.func.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

CmsAcceptBidModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsAcceptBidModal);
