import React from "react";
import SignaturePad from "react-signature-pad";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { connect } from "react-redux";
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
			title = this.context.t("DIGITAL_SIGNATURE_TITLE"),
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
								{this.context.t("CL_STEP5_TERMS_HEADLINE")}
							</label>
							<span>
								{this.context.t("CL_STEP5_TERMS_DESCRIPTION")}
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
							{this.context.t("CL_STEP5_TERMS_1")}
							{!terms && validation && (
								<span
									className="is-invalid"
									style={{ marginLeft: 15 }}
								>
									{this.context.t("LICENSE_NOT_CHECKED")}
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
								text={this.context.t("CL_STEP5_TERMS_2")}
								text2={this.context.t("CL_STEP5_TERMS_3")}
							/>
							{!termsArena && validation && (
								<span
									className="is-invalid"
									style={{ marginLeft: 15 }}
								>
									{this.context.t("TERMS_NOT_CHECKED")}
								</span>
							)}
						</div>
					</div>
				)}

				{!noInfo && (
					<div className="signature-info">
						<div className="headlines">
							<label>
								{this.context.t("CL_STEP5_SIGNATURE_HEADLINE")}
							</label>
							<span>
								{title}
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
								{` ${this.context.t("LICENSE_AGREEMENT")}`}
							</span>
						)}
					</div>
				)}
				<div className={`signature-wrap ${isSignatureNotAdded ? "is-invalid" : ""}`}>
					{!signature && (
						<div className="placeholder">
							<div>
								<div className="big-text">
									{this.context.t("DIGITAL_SIGNATURE_PLACEHOLDER_BIG_TEXT")}
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
						<input
							value={signatureName}
							onChange={onChangeSignatureName}
							placeholder={isSignatureNameEmpty ? this.context.t("SIGNATURE_NAME_EMPTY") : "First Name Last Name"}
							className={`ca-form-control ${isSignatureNameEmpty ? "is-invalid" : ""}`}
						/>
						<input
							value={signaturePosition}
							onChange={onChangeSignaturePosition}
							placeholder={isSignatureNameEmpty ? this.context.t("SIGNATURE_POSITION_EMPTY") : "Position"}
							className={`ca-form-control ${isSignaturePositionEmpty ? "is-invalid" : ""}`}
						/>
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
