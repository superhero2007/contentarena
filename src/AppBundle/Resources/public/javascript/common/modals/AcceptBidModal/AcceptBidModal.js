import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { GenericModalStyle} from "./../../../main/styles/custom";
import GeneralTerms from "./../../../main/components/GeneralTerms";
import DigitalSignature from "./../../../main/components/DigitalSignature";
import store from "../../../main/store";
import {disableValidation, enableValidation} from "../../../main/actions/validationActions";
import {connect} from "react-redux";
import Loader from "../../../common/components/Loader";

class AcceptBidModal extends Component {
    constructor(props) {
        super(props);

        let user = store.getState().user;

        this.state = {
            signature: '',
            isFail: false,
            isLoading: false,
            terms: false,
            signatureName: user.firstName + " " + user.lastName,
            signaturePosition: user.title
        };
    }

    componentWillUnmount() {
        const {validation, disableValidation} = this.props;

        if (validation) disableValidation()
    }

    handleTermsAndConditions = (event) => { this.setState({terms: event.target.checked}) };

    handleAcceptBid = () => {
        this.setState({isLoading: true});
        this.props.disableValidation();

        const {signature,  signatureName, signaturePosition} = this.state;
        const {contentId, selectedBid, postAction, listingCustomId, onCloseModal} = this.props;
        let payload = selectedBid;
        payload.content = contentId;

        ContentArena.ContentApi.acceptBid(payload, signature, signatureName, signaturePosition)
            .then(
                () => {
                    onCloseModal();
                    postAction(listingCustomId);
                },
                () => this.setState({isFail: true, isLoading: false})
            );
    };

    render() {
        const {isOpen, onCloseModal, selectedBid, validation} = this.props;
        const {isFail, isLoading, signature, terms, signatureName, signaturePosition} = this.state;

        const isAcceptDisabled = !signature || !terms;
        const isTermsInvalid = !terms && validation;

        return <Modal isOpen={isOpen} className="modal-wrapper wide" style={GenericModalStyle} onRequestClose={onCloseModal}>
            <header className="modal-header">
                <h3 className="modal-title">{this.context.t("COMMERCIAL_ACTIVITY_BID_TITLE_ACCEPT")}</h3>
                <i className="fa fa-times" onClick={onCloseModal} />
            </header>
            <section className="modal-body">
                <Loader
                    loading={isLoading}
                >
                    {!isFail ? (
                        <div>
                            <DigitalSignature
                                customClass='for-modal'
                                licenseBidId={selectedBid.customId}
                                title={this.context.t("ACCEPT_BID_PLEASE_SIGN_WITH_YOUR_CURSOR")}
                                signature={signature}
                                signatureName={signatureName}
                                signaturePosition={signaturePosition}
                                onChangeSignatureName={e=>{
                                    this.setState({"signatureName": e.target.value});
                                }}
                                onChangeSignaturePosition={e=>{
                                    this.setState({"signaturePosition": e.target.value});
                                }}
                                onReady={signature => { this.setState({signature}) }}
                            />
                            <GeneralTerms
                                defaultChecked={terms}
                                value={terms}
                                onChange={e => this.handleTermsAndConditions(e) }
                                isInvalid={isTermsInvalid}
                            />
                        </div>
                    ) : (
                        <div className="body-msg">{this.context.t("COMMERCIAL_ACTIVITY_ACCEPT_BID_FAILED")}</div>
                    )}
                </Loader>
            </section>
            <footer className="modal-footer">
                {isFail || isLoading ? (
                    <button className="cancel-btn" onClick={onCloseModal}>
                        {this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}
                    </button>
                ) : (
                    <React.Fragment>
                        <button
                            className="cancel-btn"
                            onClick={onCloseModal}
                        >
                            {this.context.t("MESSAGE_POPUP_BUTTON_CANCEL")}>
                        </button>
                        {isAcceptDisabled ? (
                            <button
                                className="standard-button disabled"
                                onClick={this.props.enableValidation}
                            >
                                {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_ACCEPT")}
                            </button>
                        ) : (
                            <button
                                className="standard-button"
                                onClick={this.handleAcceptBid}
                                disabled={!signature || !terms}
                            >
                                {this.context.t("COMMERCIAL_ACTIVITY_BID_BUTTON_ACCEPT")}
                            </button>
                        )}

                    </React.Fragment>
                )}
            </footer>
        </Modal>
    };
}

const mapStateToProps = state => {
    return {
        validation: state.validation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        enableValidation: () => dispatch(enableValidation()),
        disableValidation: () => dispatch(disableValidation()),
    }
};

AcceptBidModal.propTypes = {
    selectedBid: PropTypes.object.isRequired,
    postAction: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired
};

AcceptBidModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcceptBidModal)