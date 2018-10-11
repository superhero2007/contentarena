import React from 'react';
import SignaturePad from 'react-signature-pad';
import {PropTypes} from "prop-types";
import cn from "classnames";

class DigitalSignature extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready : (props.ready) ? props.ready :  false
        }
    }

    componentDidMount () {
        if (!this.state.ready) this.setState({blank:this.refs.signature.toDataURL()});
    }

    clear = () => {
        this.refs.signature.clear();
    };

    done = () => {
        const { blank } = this.state;
        const { onReady } = this.props;
        const { signature } = this.refs;

        let data = signature.toDataURL();

        if ( data === blank ) return;

        this.setState({ready:true});
        if (onReady) onReady(data);
    };

    edit = () => {
        const { onReady } = this.props;
        this.setState({ready:false});
        if (onReady) onReady(null);
    };

    render(){
        const {
            signature,
            title = this.context.t("DIGITAL_SIGNATURE_TITLE"),
            clearBtnText = this.context.t("DIGITAL_SIGNATURE_BUTTON_CLEAR"),
            customClass = ''
        } = this.props;

        const { ready } = this.state;

        return (
            <div className={cn('digital-signature', {[`${customClass}`]: customClass})}>
                <div className={"digital-signature-placeholder"}>{title}</div>
                {signature && ready &&
                    <img style={{width: 800, height: 300, margin: '0 auto'}} src={signature} />
                }

                {!ready && <SignaturePad ref="signature" />}

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