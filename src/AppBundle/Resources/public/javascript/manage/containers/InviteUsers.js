import React from 'react';
import { connect } from "react-redux";
import {PropTypes} from "prop-types";
import Loader from '../../common/components/Loader';
import InviteUserForm from "../components/InviteUserForm";
import {InviteUsersRequest} from "../../api/company";

class InviteUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false
        };
    }

    inviteUser = async () => {
        const { onInvite, common } = this.props;
        const { user } = this.state;

        let response;

        this.setState({loading:true});

        try {
            response = await InviteUsersRequest(common, [user]);
            if ( onInvite ) onInvite();
        }
        catch(e){
            response = false;
        }

        console.log(!!response)

        this.setState({
            loading: false,
            invitationSent : true,
            success : !!response
        });

        setTimeout(() => {
            this.setState({ invitationSent: false });
        }, 5000);
    };

    onUpdateUsers = ( user ) => {
        this.setState({user});
    };

    isButtonDisabled = ( ) => {
        const { loading, user} = this.state;
        return loading || !user || !user.valid
    };

    render () {

        const { loading, success, invitationSent } = this.state;

        return (
            <div className="settings-invite-users">
                {invitationSent && (
                    <div className="result-message">
                        {(success) ? <i className="fa fa-check-circle" /> : <i className="fa fa-close" />}
                        {(success) ? this.context.t("SETTINGS_SEND_INVITE_SUCCESS") : this.context.t("SETTINGS_SEND_INVITE_FAIL")}
                    </div>
                ) }
                <InviteUserForm onUpdate={this.onUpdateUsers} disabled={loading}/>
                <button onClick={this.inviteUser} className="yellow-button" disabled={this.isButtonDisabled()}>
                    {this.context.t("SETTINGS_BUTTON_SEND_INVITE")} <Loader loading={loading} xSmall={true}/>
                </button>
            </div>
        )
    }
}

InviteUsers.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteUsers)