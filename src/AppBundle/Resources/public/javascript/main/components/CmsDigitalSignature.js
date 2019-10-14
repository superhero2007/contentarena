import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import SignaturePad from "react-signature-pad";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { viewLicenseBid } from "../actions/utils";

const CmsDigitalSignature = ({
	onReady,
	signature,
	licenseBidId,
	customClass = "",
	signaturePosition,
	signatureMessage,
	signatureName,
	onChangeSignatureName,
	onChangeSignaturePosition,
	onChangeSignatureMessage,
	validation,
}, context) => {
	const signatureRef = useRef(null);
	const [clearIconVisible, setClearIconVisible] = useState(true);
	const [blank, setBlank] = useState("");

	useEffect(() => {
		setBlank(signatureRef.current.toDataURL());
		const canvas = signatureRef.current._canvas;
		setTimeout(() => {
			canvas.width = canvas.parentElement.offsetWidth;
		}, 1);
	}, []);

	const clear = (e) => {
		e.stopPropagation();
		signatureRef.current.clear();
		if (onReady) onReady(null);
	};

	const saveSignature = () => {
		const data = signatureRef.current.toDataURL();
		setClearIconVisible(true);
		if (data === blank) return;
		if (onReady) onReady(data);
	};

	const hideClearIcon = () => setClearIconVisible(false);

	const isSignatureNotAdded = !signature && validation;
	const isSignatureNameEmpty = !signatureName && validation;
	const isSignaturePositionEmpty = !signaturePosition && validation;

	return (
		<div className={`signature-popup ${customClass}`}>
			<div className="signature-popup-info">
				<div className="signature-popup-info-title">
					<Translate i18nKey="DIGITAL_SIGNATURE_TITLE" />
				</div>
				<div className="signature-popup-info-description">
					<Translate i18nKey="DIGITAL_SIGNATURE_DESCRIPTION" />
				</div>
				{licenseBidId && (
					<div
						className="signature-popup-info-license"
						onClick={() => {
							viewLicenseBid(licenseBidId);
						}}
					>
						<i className="icon-agreement" />
						<span>
							<Translate i18nKey="LICENSE_AGREEMENT" />
						</span>
					</div>
				)}
			</div>

			<div className={`signature-popup-panel ${isSignatureNotAdded ? "is-invalid" : ""}`}>
				{!signature && (
					<div className="placeholder">
						<span className="big-text">
							<Translate i18nKey="DIGITAL_SIGNATURE_PLACEHOLDER_BIG_TEXT" />
						</span>
					</div>
				)}

				{signature && clearIconVisible
					&& <i className="fa fa-refresh clear-signature" onClick={clear} />
				}

				<SignaturePad ref={signatureRef} onEnd={saveSignature} onBegin={hideClearIcon} />
			</div>

			<div className="signature-popup-container">
				<label>
					<Translate i18nKey="DIGITAL_SIGNATURE_SIGNED" />
				</label>
				<div className="d-flex">
					<div className="input-group">
						<input
							type="text"
							className={`input-group-text ${isSignatureNameEmpty ? "is-invalid" : ""}`}
							placeholder={context.t("DIGITAL_SIGNATURE_NAME_EMPTY")}
							value={signatureName}
							onChange={onChangeSignatureName}
						/>
					</div>
					<div className="input-group">
						<input
							type="text"
							className={`input-group-text ${isSignaturePositionEmpty ? "is-invalid" : ""}`}
							placeholder={context.t("DIGITAL_SIGNATURE_POSITION_EMPTY")}
							value={signaturePosition}
							onChange={onChangeSignaturePosition}
						/>
					</div>
				</div>
			</div>
			{/*
			<div className="signature-popup-container">
				<label>
					<Translate i18nKey="DIGITAL_SIGNATURE_MESSAGE" />
				</label>
				<textarea
					className="input-textarea"
					placeholder={context.t("DIGITAL_SIGNATURE_MESSAGE_EMPTY")}
					value={signatureMessage}
					onChange={onChangeSignatureMessage}
				/>
			</div>
			*/}
		</div>
	);
};

CmsDigitalSignature.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	validation: state.validation,
});

export default connect(
	mapStateToProps,
)(CmsDigitalSignature);
