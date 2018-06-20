import React from 'react';
import SignaturePad from 'react-signature-pad';

class DigitalSignature extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready : false
        }
    }

    componentDidMount () {
        this.setState({blank:this.refs.signature.toDataURL()});
    }

    clear = () => {
        this.refs.signature.clear();
    };

    done = () => {
        const { blank } = this.state;
        const { onReady } = this.props;
        const { signature } = this.refs;

        let data = signature.toDataURL();

        console.log("EQUAL", data === blank);

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
        const { signature } = this.props;
        const { ready } = this.state;

        return (
            <div className="digital-signature">
                <div className={"digital-signature-placeholder"}>
                    Digital Signature
                </div>
                {signature && ready &&
                    <img style={{width: 800, height: 300, margin: '0 auto'}} src={signature} />
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