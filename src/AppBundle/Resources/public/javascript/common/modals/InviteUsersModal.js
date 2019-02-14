import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { GenericModalStyle} from "./../../main/styles/custom";
import InviteUserForm from "../../manage/components/InviteUserForm";
import {InviteUsersRequest} from "../../api/company";
import Loader from "../components/Loader";

class InviteUsersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: false,
            isFail: false,
            isSuccess: false,
            users: [],
            items: [1,2,3],
            invitedUsers : [],
            skippedUsers : []
        };

        this.messageStyle = { marginLeft: 15, marginBottom: 10};
    }

    inviteUsers = async () => {
        const { users } = this.state;
        const { common } = this.props;

        let response;
        let filteredUsers = users.filter(user=>user.valid);

        this.setState({loading:true});

        try {
            response = await InviteUsersRequest(common, filteredUsers);
        }
        catch(e){
            response = false;
        }

        console.log(!!response, !response);

        this.setState({
            loading: false,
            isSuccess : !!response,
            isFail : !response,
            skippedUsers : (response) ? response.skippedUsers : [],
            invitedUsers : (response) ? response.invitedUsers : [],
            users: []
        });

    };

    onUpdateUsers = ( user, index ) => {

        let users = this.state.users;
        users[index] = user;
        this.setState({users, isFail: false, isSuccess : false});
    };

    isButtonDisabled = ( ) => {
        const { loading, users} = this.state;
        let validUsers = users.filter(user => user.valid);
        return loading || validUsers.length === 0
    };

    close = () => {
        const {
            onCloseModal
        } = this.props;

        this.setState({
            loading: false,
            isSuccess : false,
            isFail : false,
            users : []
        });

        if (onCloseModal) onCloseModal();
    };


    render() {
        const {
            isOpen
        } = this.props;

        const {loading, isFail, isSuccess, items, invitedUsers, skippedUsers} = this.state;

        return <Modal isOpen={isOpen} className="modal-wrapper-invite" style={GenericModalStyle} onRequestClose={this.close}>
            <header className="modal-header">
                <h3 className="modal-title">{this.context.t("INVITE_USERS_MODAL_TITLE")}</h3>
                <h4 className={"modal-subtitle"}>
                    {this.context.t("INVITE_USERS_MODAL_TITLE_EXPLANATION")}
                </h4>
                <i className="fa fa-times" onClick={this.close} />
            </header>
            <section className="modal-body">

                { isSuccess && invitedUsers.length > 0 && (
                    <div className="result-message" style={this.messageStyle}>
                        <i className="fa fa-check-circle" /> {this.context.t("INVITE_USERS_MODAL_SENT")}
                    </div>
                )}

                { isSuccess && skippedUsers.length > 0 && (
                    skippedUsers.map(skippedUser => (
                        <div className="result-message" style={this.messageStyle}>
                                <i className="fa fa-close" /> {skippedUser.email} {this.context.t("INVITE_USERS_MODAL_EMAIL_ALREADY_INVITED")}
                        </div>
                        )
                    )
                )}

                { isFail && (
                    <div className="result-message" style={this.messageStyle}>
                        <i className="fa fa-close" /> {this.context.t("INVITE_USERS_MODAL_FAILED")}
                    </div>
                )}

                {isOpen && (
                    items.map((item, i)=> <InviteUserForm key={i} onUpdate={(user) => {this.onUpdateUsers(user, i)}} disabled={loading}/>)
                )}
            </section>
            <footer className="modal-footer">
                {(<React.Fragment>
                    <button className="cancel-btn" onClick={this.close}>
                        {this.context.t("INVITE_USERS_MODAL_BUTTON_CANCEL")}</button>
                    <button
                        className="standard-button"
                        disabled={this.isButtonDisabled()}
                        onClick={this.inviteUsers}
                    >

                        {this.context.t("INVITE_USERS_MODAL_SEND_BUTTON")} <Loader loading={loading} xSmall={true}/>

                    </button>
                </React.Fragment>)}
            </footer>
        </Modal>;
    }
};

InviteUsersModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

InviteUsersModal.contextTypes = {
    t: PropTypes.func.isRequired
};

export default InviteUsersModal;