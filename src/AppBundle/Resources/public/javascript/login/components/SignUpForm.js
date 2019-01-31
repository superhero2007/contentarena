import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE, SIGN_UP_FIELDS } from "@constants";
import { Spinner } from "./../../main/components/Icons";

class SignUpForm extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            [SIGN_UP_FIELDS.NAME]: { value: '', error: '' },
            [SIGN_UP_FIELDS.LAST_NAME]: { value: '', error: '' },
            [SIGN_UP_FIELDS.EMAIL]: { value: '', error: '' },
            [SIGN_UP_FIELDS.PHONE]: { value: '', error: '' },
            [SIGN_UP_FIELDS.COMPANY]: { value: '', error: '' },
            generalError: '',
            isLoading: false
        };
    };

    isFieldsInValid = () => {
        const { name, lastName, company, email, phone } = this.state;
        return !name.value || !lastName.value || !email.value || !phone.value || !company.value;
    };

    showError = () => {
        const error = this.context.t("SIGN_UP_FIELD_ERROR");
        const { name, lastName, company, email, phone } = this.state;

        const nameError = name.value ? '' : error;
        const lastNameError = lastName.value ? '' : error;
        const companyError = company.value ? '' : error;
        const emailError = email.value ? '' : error;
        const phoneError = phone.value ? '' : error;

        this.setState((state) => ({
            [SIGN_UP_FIELDS.LAST_NAME]: { ...state[SIGN_UP_FIELDS.LAST_NAME], error: lastNameError },
            [SIGN_UP_FIELDS.PHONE]: { ...state[SIGN_UP_FIELDS.PHONE], error: phoneError },
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

        ContentArena.Api.signUpUser(this.name.value, this.lastName.value, this.email.value, this.company.value, this.phone.value)
            .then(() => {
                this.props.onViewUpdate(LOGIN_VIEW_TYPE.REGISTERED);
            })
            .catch(error => {
                this.setState({ error });  //check error here
            })
            .always(() => {
                this.setState({ isLoading: false });
            });
    };

    handleInputChange = (field, value) => {
        this.setState((prevState) => ({
            [field]: {
                value: value,
                error: ''
            }
        }));
    };

    render() {
        return (
            <section className="sign-up-wrapper">
                <h3>{this.context.t("SIGN_UP_FOR_ACCOUNT")}</h3>

                {this.state.error && <span className="sign-error">{this.state.error}</span>}
                <div className="username">
                    <label htmlFor="username">{this.context.t("SIGN_UP_NAME")}</label>
                    <input
                        autoFocus
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

                <div className="phone">
                    <label htmlFor="phone">{this.context.t("SIGN_UP_PHONE")}</label>
                    <input
                        onChange={(e) => this.handleInputChange(SIGN_UP_FIELDS.PHONE, e.target.value)}
                        type="text"
                        placeholder={this.context.t("SIGN_UP_PHONE_PLACEHOLDER")}
                        id="phone"
                        required="required"
                        autoComplete="phone" />
                    {this.state[SIGN_UP_FIELDS.PHONE].error && <span className="sign-error">{this.state[SIGN_UP_FIELDS.PHONE].error}</span>}
                </div>

                <button className="yellow-btn" onClick={this.handleSignUpUser}>
                    {this.context.t("SIGN_UP_SUBMIT")}
                    {this.state.isLoading && <Spinner /> }
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

export default SignUpForm;
