import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../common/components/Loader";
import { showSuccessResetPass } from "./../actions/landingActions";
import { LOGIN_VIEW_TYPE } from "@constants";

class ResetPassword extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            error: '',
            resetToken: props.match.params.resetToken,
            isLoading: false
        };
    };

    componentDidMount() {
        if (!this.state.resetToken) {
            this.props.history.push('/login');
        }
        this.newPass.focus();
    };

    handleChangePassword = () => {
        if(this.state.isLoading) return;
        if(this.newPass.value !== this.repeatPass.value || !this.newPass.value) {
            this.setState({ error: this.context.t("RESET_PASSWORD_ERROR") });
            return;
        }

        this.setState({ isLoading: true});
        ContentArena.Api.resetPassword(this.newPass.value, this.state.resetToken)
            .then(({data}) => {
                if(data.success) {
                    this.props.showSuccessResetPass();
                    this.props.history.push('/login');
                }
            })
            .catch(({response}) => {
                this.setState({error: response.data.message});
            })
            .finally(() => this.setState({isLoading: false}));
    };

    handleEnterPress = (event) => {
        if(event.key === 'Enter') {
            this.handleChangePassword();
        }
    };

    handleChange = () => this.setState({error: ''});

    render() {
        return (
            <section className="reset-wrapper" onKeyPress={this.handleEnterPress}>
                <h3>{this.context.t("RESET_PASSWORD_TITLE")}</h3>

                {this.state.error && <span className="sign-error">{this.state.error}</span>}
                <div className="password">
                    <label htmlFor="password">{this.context.t("RESET_NEW_PASSWORD")}</label>
                    <input
                        ref={(password) => this.newPass = password}
                        type="password"
                        id="password"
                        onChange={this.handleChange}
                        required="required" />
                </div>
                <div className="repeat-password">
                    <label htmlFor="repeat-password">{this.context.t("RESET_REPEAT_PASSWORD")}</label>
                    <input
                        ref={(password) => this.repeatPass = password}
                        type="password"
                        id="repeat-password"
                        onChange={this.handleChange}
                        required="required" />
                </div>

                <span className="note">
                    <b>**Note: </b>{this.context.t("RESET_PASSWORD_NOTE")}
                </span>

                <button className="yellow-btn" onClick={this.handleChangePassword}>
                    {this.context.t("RESET_PASSWORD_BUTTON")}
                    {this.state.isLoading && <Loader loading={true} xSmall /> }
                </button>
            </section>
        );
    }
}

ResetPassword.contextTypes = {
    t: PropTypes.func.isRequired
};

ResetPassword.propsType = {
    onViewUpdate: PropTypes.func.isRequired
};

const mapStateToProps = ({landing}) => {
    return landing;
};

const mapDispatchToProps = dispatch => {
    return {
        showSuccessResetPass: () => dispatch(showSuccessResetPass()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);