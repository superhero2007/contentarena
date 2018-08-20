import React from 'react';
import Modal from 'react-modal';
import { GenericModalStyle} from "../styles/custom";
import {PropTypes} from "prop-types";

class SendMessage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOpen : props.isOpen
        }
    }

    open = () => {
        this.setState({isOpen : true});
    };

    close = () => {
        this.setState({isOpen : false, showSuccess : false});
    };

    send = () => {
        const { listingId, recipient, role } = this.props;

        let message = {
            content : this.state.message,
            listing : listingId,
            recipient : recipient.id,
            role : role || "BUYER"
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
                        {this.context.t("Contact")} {recipient.legalName}
                    </div>

                    <div className="container">
                        {!saving && !showSuccess &&
                        <textarea onChange={(e)=>{this.setState({message: e.target.value})}} value={message}/>}
                        {saving && <div><i className="fa fa-cog fa-spin" /></div>}
                        {showSuccess && <div>
                            {this.context.t("Message sent!")}
                        </div>}
                    </div>

                    <div className={"buttons"}>

                        {!saving && !showSuccess &&
                        <button className={"confirm"} disabled={!message} onClick={this.send}>
                            {this.context.t("Send")}
                        </button>}

                        {!showSuccess && <button onClick={this.close}>
                            {this.context.t("Cancel")}
                        </button>}
                        {showSuccess && <button  className={"confirm"} onClick={this.close}>
                            {this.context.t("Close")}
                        </button>}
                    </div>
                </div>
            </Modal>
        )
    }
}

SendMessage.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SendMessage;