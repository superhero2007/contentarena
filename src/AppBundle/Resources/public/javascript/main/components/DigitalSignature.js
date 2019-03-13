import React from "react";
import SignaturePad from "react-signature-pad";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { TranslatedPlaceholderInput } from "@components/Translator";
import { pdfIcon } from "./Icons";
import { viewLicenseBid } from "../actions/utils";
import GeneralTerms from "./GeneralTerms";

class DigitalSignature extends React.Component {
	constructor(props) {
		super(props);

		this.signature = React.createRef();
		this.state = {
			clearIconVisible: true,
		};
	}

	componentDidMount() {
		this.setState({ blank: this.signature.current.toDataURL() });
	}

	clear = (e) => {
		e.stopPropagation();
		const { onReady } = this.props;
		this.signature.current.clear();
		if (onReady) onReady(null);
	};

	saveSignature = () => {
		const { blank, clearIconVisible } = this.state;
		const { onReady } = this.props;

		const data = this.signature.current.toDataURL();
		this.setState({ clearIconVisible: true });

		if (data === blank) return;

		if (onReady) onReady(data);
	};

	hideClearIcon = () => {
		this.setState({ clearIconVisible: false });
	};

	render() {
		const {
			signature,
			licenseBidId,
			title = "DIGITAL_SIGNATURE_TITLE",
			customClass = "",
			signaturePosition,
			signatureName,
			onChangeSignatureName,
			onChangeSignaturePosition,
			showTerms,
			noInfo,
			terms,
			termsArena,
			updateContentValue,
			validation,
		} = this.props;

		const isSignatureNotAdded = !signature && validation;
		const isSignatureNameEmpty = !signatureName && validation;
		const isSignaturePositionEmpty = !signaturePosition && validation;

		return (
			<div className={cn("digital-signature", { [`${customClass}`]: customClass })}>

				{showTerms && (
					<div className="terms-confirm">
						<div className="headlines">
							<label>
								<Translate i18nKey="CL_STEP5_TERMS_HEADLINE" />
							</label>
							<span>
								<Translate i18nKey="CL_STEP5_TERMS_DESCRIPTION" />
							</span>
						</div>
						<div style={{ display: "flex", marginBottom: 10 }}>
							<input
								type="checkbox"
								className="ca-checkbox"
								defaultChecked={terms}
								value={terms}
								onChange={(e) => {
									updateContentValue("terms", e.target.checked);
								}}
								id="terms"
								style={{ marginRight: 10 }}
							/>
							<label htmlFor="terms" />
							<Translate i18nKey="CL_STEP5_TERMS_1" />{!terms && validation && (
								<span
									className="is-invalid"
									style={{ marginLeft: 15 }}
								>
									<Translate i18nKey="LICENSE_NOT_CHECKED" />
								</span>
							)}
						</div>

						<div className="d-flex">
							<GeneralTerms
								defaultChecked={termsArena}
								value={termsArena}
								onChange={(e) => {
									updateContentValue("termsArena", e.target.checked);
								}}
								text={<Translate i18nKey="CL_STEP5_TERMS_2" />}
								text2={<Translate i18nKey="CL_STEP5_TERMS_3" />}
							/>
							{!termsArena && validation && (
								<span
									className="is-invalid"
									style={{ marginLeft: 15 }}
								>
									<Translate i18nKey="TERMS_NOT_CHECKED" />
								</span>
							)}
						</div>
					</div>
				)}

				{!noInfo && (
					<div className="signature-info">
						<div className="headlines">
							<label>
								<Translate i18nKey="CL_STEP5_SIGNATURE_HEADLINE" />
							</label>
							<span>
								<Translate i18nKey={title} />
							</span>
						</div>
						{licenseBidId && (
							<span
								className="license-bid"
								onClick={() => {
									viewLicenseBid(licenseBidId);
								}}
							>
								<img src={pdfIcon} alt="Licence" />
								<Translate i18nKey="LICENSE_AGREEMENT" />
							</span>
						)}
					</div>
				)}
				<div className={`signature-wrap ${isSignatureNotAdded ? "is-invalid" : ""}`}>
					{!signature && (
						<div className="placeholder">
							<div>
								<div className="big-text">
									<Translate i18nKey="DIGITAL_SIGNATURE_PLACEHOLDER_BIG_TEXT" />
								</div>
							</div>
						</div>
					)}

					{signature && this.state.clearIconVisible
						&& <i className="fa fa-refresh clear-signature" onClick={e => this.clear(e)} />
					}

					<SignaturePad ref={this.signature} onEnd={this.saveSignature} onBegin={this.hideClearIcon} />
				</div>

				<div className="signature-name-container">
					<label>
						Signed By
					</label>
					<div>
						<Translate i18nKey="SIGNATURE_NAME_EMPTY">
							<TranslatedPlaceholderInput
								style={{ width: "98%" }}
								value={signatureName}
								onChange={onChangeSignatureName}
								className={`ca-form-control ${isSignatureNameEmpty ? "is-invalid" : ""}`}
							/>
						</Translate>
						<Translate i18nKey="SIGNATURE_POSITION_EMPTY">
							<TranslatedPlaceholderInput
								style={{ width: "100%" }}
								value={signaturePosition}
								onChange={onChangeSignaturePosition}
								className={`ca-form-control ${isSignaturePositionEmpty ? "is-invalid" : ""}`}
							/>
						</Translate>
					</div>
				</div>
			</div>
		);
	}
}

DigitalSignature.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	validation: state.validation,
});

export default connect(
	mapStateToProps,
)(DigitalSignature);
