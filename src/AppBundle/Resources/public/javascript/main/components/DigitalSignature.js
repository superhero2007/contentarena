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

    this.state = {
      ready: (props.ready) ? props.ready : false,
    };

    this.signature = React.createRef();
  }

  componentDidMount() {
    if (!this.state.ready) this.setState({ blank: this.signature.current.toDataURL() });
  }

    clear = () => {
      this.signature.current.clear();
    };

    done = () => {
      const { blank } = this.state;
      const { onReady } = this.props;

      const data = this.signature.current.toDataURL();

      if (data === blank) return;

      this.setState({ ready: true });
      if (onReady) onReady(data);
    };

    edit = () => {
      const { onReady } = this.props;
      this.setState({ ready: false });
      if (onReady) onReady(null);
    };

    disablePlaceholder = () => {
      const { isPlaceholderDisabled } = this.state;

      if (!isPlaceholderDisabled) this.setState({ isPlaceholderDisabled: true });
    };

    render() {
      const {
        signature,
        licenseBidId,
        title = this.context.t("DIGITAL_SIGNATURE_TITLE"),
        clearBtnText = this.context.t("DIGITAL_SIGNATURE_BUTTON_CLEAR"),
        customClass = "",
        signaturePosition,
        signatureName,
        onChangeSignatureName,
        onChangeSignaturePosition,
        showTerms,
        noLabel,
        noInfo,
        terms,
        terms_arena,
        updateContentValue,
        validation,
      } = this.props;

      const { ready, isPlaceholderDisabled } = this.state;

      const isSignatureNotAdded = !signature && validation;
      const isSignatureNameEmpty = !signatureName && validation;
      const isSignaturePositionEmpty = !signaturePosition && validation;

      return (
        <div className={cn("digital-signature", { [`${customClass}`]: customClass })}>

          {showTerms && (
            <div className="terms-confirm">
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
                <span className="is-invalid" style={{ marginLeft: 15 }}>{this.context.t("LICENSE_NOT_CHECKED")}</span>
                )}
              </div>

              <div className="d-flex">
                <GeneralTerms
                  defaultChecked={terms_arena}
                  value={terms_arena}
                  onChange={(e) => {
                    updateContentValue("terms_arena", e.target.checked);
                  }}
                  text={this.context.t("CL_STEP5_TERMS_2")}
                  text2={this.context.t("CL_STEP5_TERMS_3")}
                />
                {!terms_arena && validation && (
                <span className="is-invalid" style={{ marginLeft: 15 }}>{this.context.t("TERMS_NOT_CHECKED")}</span>
                )}
              </div>
            </div>
          )}

          {!noInfo && (
          <div className="signature-info">
            <span>{title}</span>

            {licenseBidId && (
            <span className="license-bid" onClick={() => { viewLicenseBid(licenseBidId); }}>
              <img src={pdfIcon} alt="Licence" />
              {" "}
              {this.context.t("LICENSE_AGREEMENT")}
            </span>
            )}
          </div>
          )}
          <div className={`signature-wrap ${isSignatureNotAdded ? "is-invalid" : ""}`} onClick={this.disablePlaceholder}>
            {!signature && !isPlaceholderDisabled && (
            <div className="placeholder">
              <div>
                <div className="small-text">
                  {this.context.t("DIGITAL_SIGNATURE_PLACEHOLDER_SMALL_TEXT")}
                </div>
                <div className="big-text">
                  {this.context.t("DIGITAL_SIGNATURE_PLACEHOLDER_BIG_TEXT")}
                </div>
              </div>
            </div>
            )}

            {signature && ready && (
            <img style={{ width: 800, height: 300, margin: "0 auto" }} src={signature} />
            )}

            {!ready && (
            <SignaturePad ref={this.signature} />
            )}
          </div>

          <div className="signature-name-container">
            <label>
                        Signed By
            </label>
            <div style={{ display: "flex" }}>
              <input
                value={signatureName}
                disabled={ready}
                onChange={onChangeSignatureName}
                placeholder={isSignatureNameEmpty ? this.context.t("SIGNATURE_NAME_EMPTY") : "First Name Last Name"}
                className={`${isSignatureNameEmpty ? "is-invalid" : ""}`}
              />
              <input
                value={signaturePosition}
                disabled={ready}
                onChange={onChangeSignaturePosition}
                placeholder={isSignatureNameEmpty ? this.context.t("SIGNATURE_POSITION_EMPTY") : "Position"}
                className={`${isSignaturePositionEmpty ? "is-invalid" : ""}`}
              />
            </div>

          </div>

          <div className="buttons">
            {!ready && (
              <button onClick={this.clear} className="standard-button-small transparent">
                {clearBtnText}
              </button>
            )}
            {!ready && (
              <button onClick={this.done} className="standard-button-small">
                {this.context.t("DIGITAL_SIGNATURE_BUTTON_DONE")}
              </button>
            )}
            {ready && (
              <button onClick={this.edit} className="standard-button-big">
                {this.context.t("DIGITAL_SIGNATURE_BUTTON_NEW")}
              </button>
            )}
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
