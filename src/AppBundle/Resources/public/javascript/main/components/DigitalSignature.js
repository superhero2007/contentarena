import React from 'react';
import SignaturePad from 'react-signature-pad';

class DigitalSignature extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready : false
        }
    }

    clear = () => {
        this.refs.signature.clear();
    };

    done = () => {
        const { onReady } = this.props;
        const { signature } = this.refs;
        this.setState({ready:true});
        if (onReady) onReady(signature.toDataURL());
    };

    edit = () => {
        const { onReady } = this.props;
        this.setState({ready:false});
        if (onReady) onReady(null);
    };

    render(){
        const { signature } = this.props;
        const { ready } = this.state;

        return (
            <div className={"digital-signature"}>
                <div className={"digital-signature-placeholder"}>
                    Digital Signature
                </div>
                {signature && ready &&
                    <img style={{width: 400, height: 150}} src={signature} />
                }

                {!ready && <SignaturePad ref="signature" />}

                <div className={"buttons"}>
                    {!ready && <button onClick={this.clear} >
                        Clear
                    </button>}
                    {!ready && <button onClick={this.done} >
                        Done
                    </button>}
                    {ready && <button onClick={this.edit} >
                        New
                    </button>}
                </div>

            </div>
        )
    }
}

export default DigitalSignature;