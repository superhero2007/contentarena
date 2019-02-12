import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE, SIGN_UP_FIELDS } from "@constants";
import Loader from "../../common/components/Loader";
import {hideSuccessResetPass} from "../actions/landingActions";
import {connect} from "react-redux";

class SignUpForm extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            [SIGN_UP_FIELDS.NAME]: { value: '', error: '' },
            [SIGN_UP_FIELDS.LAST_NAME]: { value: '', error: '' },
            [SIGN_UP_FIELDS.EMAIL]: { value: '', error: '' },
            [SIGN_UP_FIELDS.COMPANY]: { value: '', error: '' },
            generalError: '',
            isLoading: false
        };
    };

    componentDidMount() {
        this.username.focus();
    }

    isFieldsInValid = () => {
        const { name, lastName, company, email } = this.state;
        return !name.value || !lastName.value || !email.value || !company.value;
    };

    showError = () => {
        const error = this.context.t("SIGN_UP_FIELD_ERROR");
        const { name, lastName, company, email } = this.state;

        const nameError = name.value ? '' : error;
        const lastNameError = lastName.value ? '' : error;
        const companyError = company.value ? '' : error;
        const emailError = email.value ? '' : error;

        this.setState((state) => ({
            [SIGN_UP_FIELDS.LAST_NAME]: { ...state[SIGN_UP_FIELDS.LAST_NAME], error: lastNameError },
            [SIGN_UP_FIELDS.COMPANY]: { ...state[SIGN_UP_FIELDS.COMPANY], error: companyError },
            [SIGN_UP_FIELDS.NAME]: { ...state[SIGN_UP_FIELDS.NAME], error: nameError },
            [SIGN_UP_FIELDS.EMAIL]: { ...state[SIGN_UP_FIELDS.EMAIL], error: emailError },
        }));
    };

    handleSignUpUser = () => {
        if(this.state.isLoading) return;
        if(this.isFieldsInValid()) {
            this.showError();
            return;
        }
        this.setState({ isLoading: true });
        const { name, lastName, email, company } = this.state;

        ContentArena.Api.signUpUser(name.value, lastName.value, email.value, company.value)
            .then(({data}) => {
                if (data.success){
                    this.props.onViewUpdate(LOGIN_VIEW_TYPE.REGISTERED);
                }
            })
            .catch(({response}) => {
                this.setState({ generalError: response.data.message });
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    handleInputChange = (field, value) => {
        this.setState((prevState) => ({
            generalError: '',
            [field]: {
                value: value,
                error: ''
            }
        }));
    };

    handleEnterPress = (event) => {
        if(event.key === 'Enter') {
            this.handleSignUpUser();
        }
    };

    render() {
        const { refererEmail } = this.props;
        return (
            <section className="sign-up-wrapper" onKeyPress={this.handleEnterPress}>
                <h3>{this.context.t("SIGN_UP_FOR_ACCOUNT")}</h3>

                { refererEmail && refererEmail !== "" && (
                    <p className="sign-in-error-message">
                        {this.context.t("SIGN_UP_FROM_PUBLIC_LISTING_MESSAGE")}
                    </p>
                )}

                {this.state.generalError && <span className="sign-error">{this.state.generalError}</span>}
                <div className="username">
                    <label htmlFor="username">{this.context.t("SIGN_UP_NAME")}</label>
                    <input
                        ref={(name) => this.username = name}
                        type="text"
                        id="username"
                        name="_username"
                        onChange={(e) => this.handleInputChange(SIGN_UP_FIELDS.NAME, e.target.value)}
                        placeholder={this.context.t("SIGN_UP_NAME_PLACEHOLDER")}
                        required="required"
                        autoComplete="username" />
                    {this.state[SIGN_UP_FIELDS.NAME].error && <span className="sign-error">{this.state[SIGN_UP_FIELDS.NAME].error}</span>}
                </div>

                <div className="lastname">
                    <label htmlFor="lastname">{this.context.t("SIGN_UP_LAST_NAME")}</label>
                    <input
                        onChange={(e) => this.handleInputChange(SIGN_UP_FIELDS.LAST_NAME, e.target.value)}
                        type="text"
                        id="lastname"
                        placeholder={this.context.t("SIGN_UP_LAST_NAME_PLACEHOLDER")}
                        required="required"
                        autoComplete="lastname" />
                    {this.state[SIGN_UP_FIELDS.LAST_NAME].error && <span className="sign-error">{this.state[SIGN_UP_FIELDS.LAST_NAME].error}</span>}
                </div>

                <div className="email">
                    <label htmlFor="email">{this.context.t("SIGN_UP_EMAIL")}</label>
                    <input
                        onChange={(e) => this.handleInputChange(SIGN_UP_FIELDS.EMAIL, e.target.value)}
                        type="email"
                        placeholder={this.context.t("LOGIN_EMAIL_PLACEHOLDER")}
                        id="email"
                        required="required"
                        autoComplete="email" />
                    {this.state[SIGN_UP_FIELDS.EMAIL].error && <span className="sign-error">{this.state[SIGN_UP_FIELDS.EMAIL].error}</span>}
                </div>

                <div className="company">
                    <label htmlFor="company">{this.context.t("SIGN_UP_COMPANY")}</label>
                    <input
                        onChange={(e) => this.handleInputChange(SIGN_UP_FIELDS.COMPANY, e.target.value)}
                        type="text"
                        placeholder={this.context.t("SIGN_UP_COMPANY_PLACEHOLDER")}
                        id="company"
                        required="required"
                        autoComplete="company" />
                    {this.state[SIGN_UP_FIELDS.COMPANY].error && <span className="sign-error">{this.state[SIGN_UP_FIELDS.COMPANY].error}</span>}
                </div>

                <button className="yellow-btn" onClick={this.handleSignUpUser}>
                    {this.context.t("SIGN_UP_SUBMIT")}
                    {this.state.isLoading && <Loader loading={true} xSmall /> }
                </button>

            </section>
        );
    }
}

SignUpForm.contextTypes = {
    t: PropTypes.func.isRequired
};

SignUpForm.propsType = {
    onViewUpdate: PropTypes.func.isRequired
};

const mapStateToProps = ({landing}) => {
    return landing;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);