import React from 'react';
import PropTypes from "prop-types";
import {validateEmail} from "../../common/utils/listing";

class InviteUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName : "",
                lastName : "",
                email : "",
            }
        };
    }

    componentWillReceiveProps = ( nextProps) => {
        let user = {
            firstName : "",
            lastName : "",
            email : "",
        };

        if (nextProps.disabled) this.setState({user: user});
    };

    handleChange = ( user ) => {
        const { onUpdate } = this.props;
        user.valid = this.validate(user);
        this.setState({user:user});
        if (onUpdate) onUpdate(user);

    };

    validate = ( user ) => {
        return user.firstName !== ""
            && user.email  !== ""
            && validateEmail(user.email)
            && user.lastName !== "";
    };

    render () {
        const { disabled, key } = this.props;
        let user = this.state.user;

        return (
            <div className={"row"}>
                <div className={"item"}>
                    <label>
                        {this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")}
                    </label>
                    <input
                        name={"first-name-" + key}
                        value={user.firstName}
                        disabled={disabled}
                        placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_FIRST_NAME")}
                        onChange={(e)=>{
                            user.firstName = e.target.value;
                            this.handleChange(user);
                        }}
                    />
                </div>
                <div className={"item"}>
                    <label>
                        {this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")}
                    </label>
                    <input
                        value={user.lastName}
                        disabled={disabled}
                        placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_FAMILY_NAME")}
                        onChange={(e)=>{
                            user.lastName = e.target.value;
                            this.handleChange(user);
                        }}
                    />
                </div>
                <div className={"item"}>
                    <label>
                        {this.context.t("SETTINGS_LABEL_USER_EMAIL")}
                    </label>
                    <input
                        value={user.email}
                        disabled={disabled}
                        placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_EMAIL")}
                        onChange={(e)=>{
                            user.email = e.target.value;
                            this.handleChange(user);
                        }}
                    />
                </div>
            </div>
        )
    }
}

InviteUserForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default InviteUserForm;