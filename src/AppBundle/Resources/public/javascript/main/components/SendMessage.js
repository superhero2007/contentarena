import React from 'react';
import Modal from 'react-modal';
import {customStyles, GenericModalStyle} from "../styles/custom";
import {companyIsValid} from "../../sell/actions/validationActions";

class SendMessage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOpen : props.isOpen
        }
    }

    componentDidMount () {
    }

    open = () => {
        this.setState({isOpen : true});
    };

    close = () => {
        this.setState({isOpen : false, showSuccess : false});
    };

    send = () => {
        const { listingId, recipient } = this.props;

        let message = {
            content : this.state.message,
            listing : listingId,
            recipient : recipient.id
        };

        this.setState({saving : true});

        ContentArena.ContentApi.sendMessage(message).done(r=>{
            this.setState({saving : false, showSuccess : true, message : null})
        });
    };


    render(){
        const { recipient } = this.props;
        const { showSuccess, saving, message } = this.state;

        return (
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.close}
                bodyOpenClassName={"generic-modal"}
                style={GenericModalStyle}
            >
                <div className={"generic-modal-container"}>
                    <div className="title">
                        Contact {recipient.legalName}
                    </div>

                    <div className="container">
                        {!saving && !showSuccess &&
                        <textarea onChange={(e)=>{this.setState({message: e.target.value})}} value={message}/>}
                        {saving && <div><i className="fa fa-cog fa-spin" /></div>}
                        {showSuccess && <div>
                            Message sent!
                        </div>}
                    </div>

                    <div className={"buttons"}>

                        {!saving && !showSuccess &&
                        <button className={"confirm"} disabled={!message} onClick={this.send}>Send</button>}

                        {!showSuccess && <button onClick={this.close}>Cancel</button>}
                        {showSuccess && <button  className={"confirm"} onClick={this.close}>Close</button>}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default SendMessage;