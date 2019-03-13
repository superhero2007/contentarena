import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { LOGIN_VIEW_TYPE, SIGN_UP_FIELDS } from "@constants";
import Loader from "../../common/components/Loader";
import { hideRegistrationEmail } from "../actions/landingActions";
import { validateEmail } from "../../common/utils/listing";
import { SERVER_ERROR_CODES, SITE_EMAILS, SITE_URLS } from "../../common/constants";

class SignUpForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			[SIGN_UP_FIELDS.NAME]: { value: "", error: "" },
			[SIGN_UP_FIELDS.LAST_NAME]: { value: "", error: "" },
			[SIGN_UP_FIELDS.EMAIL]: { value: props.registrationEmail, error: "" },
			[SIGN_UP_FIELDS.COMPANY]: { value: "", error: "" },
			generalError: "",
			isLoading: false,
		};
	}

	componentDidMount() {
		this.username.focus();
	}

	isFieldsInValid = () => {
		const {
			name, lastName, company, email,
		} = this.state;

		return !name.value || !lastName.value || !email.value || !validateEmail(email.value) || !company.value;
	};

	showError = () => {
		const error = this.context.t("SIGN_UP_FIELD_ERROR");
		const emailErrorText = this.context.t("SIGN_UP_FIELD_EMAIL_ERROR");
		const {
			name, lastName, company, email,
		} = this.state;

		const nameError = name.value ? "" : error;
		const lastNameError = lastName.value ? "" : error;
		const companyError = company.value ? "" : error;
		const emailError = email.value && validateEmail(email.value) ? "" : emailErrorText;

		this.setState(state => ({
			[SIGN_UP_FIELDS.LAST_NAME]: { ...state[SIGN_UP_FIELDS.LAST_NAME], error: lastNameError },
			[SIGN_UP_FIELDS.COMPANY]: { ...state[SIGN_UP_FIELDS.COMPANY], error: companyError },
			[SIGN_UP_FIELDS.NAME]: { ...state[SIGN_UP_FIELDS.NAME], error: nameError },
			[SIGN_UP_FIELDS.EMAIL]: { ...state[SIGN_UP_FIELDS.EMAIL], error: emailError },
		}));
	};

	handleSignUpUser = () => {
		if (this.state.isLoading) return;
		if (this.isFieldsInValid()) {
			this.showError();
			return;
		}
		this.setState({ isLoading: true });
		const {
			name, lastName, email, company,
		} = this.state;

		ContentArena.Api.signUpUser(name.value, lastName.value, email.value, company.value)
			.then(({ data }) => {
				if (data.success) {
					this.props.onViewUpdate(LOGIN_VIEW_TYPE.REGISTERED);
				}
			})
			.catch(({ response }) => {
				const responseData = response.status === 500 ? response.data.error : response.data;
				this.setState({ generalError: responseData.message, errorCode: responseData.code });
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	};

	handleInputChange = (field, value) => {
		if (this.props.registrationEmail) this.props.hideRegistrationEmail();
		this.setState(prevState => ({
			generalError: "",
			[field]: {
				value,
				error: "",
			},
		}));
	};

	handleEnterPress = (event) => {
		if (event.key === "Enter") {
			this.handleSignUpUser();
		}
	};

	render() {
		const { refererEmail } = this.props;
		const {
			errorCode,
			generalError,
		} = this.state;
		return (
			<section className="sign-up-wrapper" onKeyPress={this.handleEnterPress}>
				<h3>
					<Translate i18nKey="SIGN_UP_FOR_ACCOUNT" />
				</h3>

				<span className="sign-message">
					<Translate i18nKey="SIGN_UP_HEADER_MESSAGE" />
				</span>

				{refererEmail && refererEmail !== "" && (
					<p className="sign-in-error-message">
						<Translate i18nKey="SIGN_UP_FROM_PUBLIC_LISTING_MESSAGE" />
					</p>
				)}

				{
					generalError && errorCode !== SERVER_ERROR_CODES.USER_ALREADY_EXISTS
					&& (
						<span className="sign-error-top">
							{this.state.generalError}
						</span>
					)
				}

				{
					generalError && errorCode === SERVER_ERROR_CODES.USER_ALREADY_EXISTS
					&& (
						<span className="sign-error-top">
						This email address is already in use.
						In case you have problems to login to your account, please reset your password via <a href={SITE_URLS.LOGIN_URL}>Reset password</a>.
						Otherwise, please contact <a href={`mailto:${SITE_EMAILS.SUPPORT}`}>Support</a> for help.
						</span>
					)
				}


				<div className="username">
					<label htmlFor="username">
						<Translate i18nKey="SIGN_UP_NAME" />
					</label>
					<input
						ref={name => this.username = name}
						type="text"
						id="username"
						name="_username"
						onChange={e => this.handleInputChange(SIGN_UP_FIELDS.NAME, e.target.value)}
						placeholder={this.context.t("SIGN_UP_NAME_PLACEHOLDER")}
						required="required"
						autoComplete="username"
					/>
					{
						this.state[SIGN_UP_FIELDS.NAME].error
						&& (
							<span className="sign-error">
								{this.state[SIGN_UP_FIELDS.NAME].error}
							</span>
						)
					}
				</div>

				<div className="lastname">
					<label htmlFor="lastname">
						<Translate i18nKey="SIGN_UP_LAST_NAME" />
					</label>
					<input
						onChange={e => this.handleInputChange(SIGN_UP_FIELDS.LAST_NAME, e.target.value)}
						type="text"
						id="lastname"
						placeholder={this.context.t("SIGN_UP_LAST_NAME_PLACEHOLDER")}
						required="required"
						autoComplete="lastname"
					/>
					{
						this.state[SIGN_UP_FIELDS.LAST_NAME].error
						&& (
							<span className="sign-error">
								{this.state[SIGN_UP_FIELDS.LAST_NAME].error}
							</span>
						)
					}
				</div>

				<div className="email">
					<label htmlFor="email">
						<Translate i18nKey="SIGN_UP_EMAIL" />
					</label>
					<input
						value={this.state[SIGN_UP_FIELDS.EMAIL].value}
						onChange={e => this.handleInputChange(SIGN_UP_FIELDS.EMAIL, e.target.value)}
						type="email"
						placeholder={this.context.t("LOGIN_EMAIL_PLACEHOLDER")}
						id="email"
						required="required"
						autoComplete="email"
					/>
					{
						this.state[SIGN_UP_FIELDS.EMAIL].error
						&& (
							<span className="sign-error">
								{this.state[SIGN_UP_FIELDS.EMAIL].error}
							</span>
						)
					}
				</div>

				<div className="company">
					<label htmlFor="company">
						<Translate i18nKey="SIGN_UP_COMPANY" />
					</label>
					<input
						onChange={e => this.handleInputChange(SIGN_UP_FIELDS.COMPANY, e.target.value)}
						type="text"
						placeholder={this.context.t("SIGN_UP_COMPANY_PLACEHOLDER")}
						id="company"
						required="required"
						autoComplete="company"
					/>
					{
						this.state[SIGN_UP_FIELDS.COMPANY].error
						&& (
							<span className="sign-error">
								{this.state[SIGN_UP_FIELDS.COMPANY].error}
							</span>
						)
					}
				</div>

				<button className="yellow-btn" onClick={this.handleSignUpUser}>
					<Translate i18nKey="SIGN_UP_SUBMIT" />
					{this.state.isLoading && <Loader loading xSmall />}
				</button>

			</section>
		);
	}
}

SignUpForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

SignUpForm.propsType = {
	onViewUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ landing }) => landing;

const mapDispatchToProps = dispatch => ({
	hideRegistrationEmail: () => dispatch(hideRegistrationEmail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
