import React from 'react';
import SignaturePad from 'react-signature-pad';
import {PropTypes} from "prop-types";
import { pdfIcon } from "./Icons";
import {viewLicenseBid} from "../actions/utils";

import cn from "classnames";

class DigitalSignature extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready : (props.ready) ? props.ready :  false
        }

        this.signature = React.createRef();
    }

    componentDidMount () {
        if (!this.state.ready) this.setState({blank: this.signature.current.toDataURL()});
    }

    clear = () => {
        this.signature.current.clear();
    };

    done = () => {
        const { blank } = this.state;
        const { onReady } = this.props;

        let data = this.signature.current.toDataURL();

        if ( data === blank ) return;

        this.setState({ready:true});
        if (onReady) onReady(data);
    };

    edit = () => {
        const { onReady } = this.props;
        this.setState({ready:false});
        if (onReady) onReady(null);
    };

    disablePlaceholder = () => {
        const {isPlaceholderDisabled} = this.state;

        if (!isPlaceholderDisabled) this.setState({isPlaceholderDisabled:true})
    }

    render(){
        const {
            signature,
            licenseBidId,
            title = this.context.t("DIGITAL_SIGNATURE_TITLE"),
            clearBtnText = this.context.t("DIGITAL_SIGNATURE_BUTTON_CLEAR"),
            customClass = ''
        } = this.props;

        const { ready, isPlaceholderDisabled } = this.state;

        return (
            <div className={cn('digital-signature', {[`${customClass}`]: customClass})}>

                <div className="base-full-input" style={{maxWidth: 'none'}}>
                    <label>{this.context.t('DIGITAL_SIGNATURE_INFO')}</label>
                </div>

                <div className={"signature-info"}>
                    <span>{title}</span>

                    {licenseBidId && (
                        <span className="license-bid" onClick={() => {viewLicenseBid(licenseBidId)}}>
                            <img src={pdfIcon} alt="Licence" /> {this.context.t("LICENSE_AGREEMENT")}
                        </span>
                    )}
                </div>
                <div className="signature-wrap" onClick={this.disablePlaceholder}>
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
                        <img style={{width: 800, height: 300, margin: '0 auto'}} src={signature}/>
                    )}

                    {!ready && (
                        <SignaturePad ref={this.signature} />
                    )}
                </div>

                <div className={"buttons"}>
                    {!ready && <button onClick={this.clear} className="standard-button-small transparent">
                        {clearBtnText}
                    </button>}
                    {!ready && <button onClick={this.done} className="standard-button-small">
                        {this.context.t("DIGITAL_SIGNATURE_BUTTON_DONE")}
                    </button>}
                    {ready && <button onClick={this.edit} className="standard-button-big">
                        {this.context.t("DIGITAL_SIGNATURE_BUTTON_NEW")}
                    </button>}
                </div>
            </div>
        )
    }
}
DigitalSignature.contextTypes = {
    t: PropTypes.func.isRequired
};
export default DigitalSignature;