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
            items: [1,2,3]
        };
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
            isFail : !response
        });

    };

    onUpdateUsers = ( user, index ) => {

        let users = this.state.users;

        if ( users.indexOf(index) !== -1){
            users[index] = user;
        } else {
            users.push(user);
        }

        this.setState({users});
    };

    isButtonDisabled = ( ) => {
        const { loading, users} = this.state;
        let validUsers = users.filter(user => user.valid);
        return loading || validUsers.length === 0
    };

    close = () => {
        const {
            isOpen,
            onCloseModal
        } = this.props;

        this.setState({
            loading: false,
            isSuccess : false,
            isFail : false
        });

        if (onCloseModal) onCloseModal();
    };


    render() {
        const {
            isOpen,
            onCloseModal
        } = this.props;

        const {loading, isFail, isSuccess, items} = this.state;

        return <Modal isOpen={isOpen} className="modal-wrapper-invite" style={GenericModalStyle} onRequestClose={this.close}>
            <header className="modal-header">
                <h3 className="modal-title">{this.context.t("INVITE_USERS_MODAL_TITLE")}</h3>
                <i className="fa fa-times" onClick={onCloseModal} />
            </header>
            <section className="modal-body">
                {!loading && !isFail && !isSuccess && (
                    items.map((item, i)=> <InviteUserForm key={i} onUpdate={(user) => {this.onUpdateUsers(user, i)}}/>)
                )}
                {loading && <Loader loading={true} small={true} />}
                {(isFail || isSuccess) && <div className="body-msg">
                    {isFail ? this.context.t("INVITE_USERS_MODAL_FAILED") : this.context.t("INVITE_USERS_MODAL_SENT")}
                </div>}
            </section>
            <footer className="modal-footer">
                {isFail || isSuccess
                    ? <button className="standard-button" onClick={this.close}>
                        {this.context.t("INVITE_USERS_MODAL_BUTTON_CLOSE")}</button>
                    : (<React.Fragment>
                            <button className="cancel-btn" onClick={this.close}>
                                {this.context.t("INVITE_USERS_MODAL_BUTTON_CANCEL")}</button>
                            <button
                                className="standard-button"
                                disabled={this.isButtonDisabled()}
                                onClick={this.inviteUsers}
                            >

                                {this.context.t("INVITE_USERS_MODAL_SEND_BUTTON")}

                            </button>
                        </React.Fragment>)
                }
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