import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { hideSuccessResetPass } from "../actions/landingActions";
import { LOGIN_VIEW_TYPE } from "@constants";
import Loader from "../../common/components/Loader";

class SignInForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: "",
			token: "",
			isLoading: false,
			name: null,
			pass: null,
		};
	}

	componentDidMount() {
		this.name.focus();
	}

	isFieldsInvalid = () => {
		const { name, pass } = this.state;
		return !name || !pass || name === "" || pass === "";
	};

	handleSignUpClick = () => {
		if (this.state.isLoading) return;
		this.props.history.push("/registration");
	};

	handleForgotPassClick = () => {
		if (this.state.isLoading) return;
		this.props.onViewUpdate(LOGIN_VIEW_TYPE.RECOVER);
	};

	handleSignIn = () => {
		const { refererEmail, refererListingId, resetPasswordSuccess } = this.props;
		const { name, pass, isLoading } = this.state;

		if (resetPasswordSuccess) this.props.hideSuccessResetPass();
		if (isLoading) return;
		this.setState({ isLoading: true });

		ContentArena.Api.signInUser(name, pass)
			.then(({ data }) => {
				if (data && data.success) {
					localStorage.clear();
					if (refererEmail !== null && refererEmail !== "" && refererListingId !== null && refererListingId !== "") {
						window.location.href = `listing/${refererListingId}`;
					} else {
						window.location.href = "marketplace";
					}
				}
			})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					isLoading: false,
				});
			});
	};

	handleEnterPress = (event) => {
		if (event.key === "Enter") {
			this.handleSignIn();
		}
	};

	render() {
		const { refererEmail } = this.props;
		const { error, name, pass } = this.state;

		return (
			<section className="sign-in-wrapper" onKeyPress={this.handleEnterPress}>
				<h3><Translate i18nKey="SIGN_IN_TO_CONTENT_ARENT" /></h3>

				{refererEmail && refererEmail !== "" && (
					<p className="sign-in-error-message">
						<Translate i18nKey="SIGN_IN_FROM_PUBLIC_LISTING_MESSAGE" />
					</p>
				)}

				{this.props.resetPasswordSuccess && (
					<div className="reset-success-password">
						<p>
							<i className="fa fa-chevron-circle-down" />
							<Translate i18nKey="SIGN_IN_RESET_MESSAGE" />
						</p>
						<p><Translate i18nKey="SIGN_IN_RESET_LOGIN_MESSAGE" /></p>
					</div>
				)}

				{error && (
					<span className="sign-error login-error">
						{error}
					</span>
				)}

				<div className="username">
					<label htmlFor="username">
						<Translate i18nKey="SIGN_IN_EMAIL" />
					</label>
					<input
						ref={name => this.name = name}
						value={name}
						type="text"
						id="username"
						name="_username"
						placeholder={this.context.t("SIGN_IN_EMAIL_PLACEHOLDER")}
						required="required"
						onChange={(e) => { this.setState({ name: e.target.value }); }}
						autoComplete="username"
					/>
				</div>

				<div className="password">
					<label htmlFor="password"><Translate i18nKey="SIGN_IN_PASSWORD" /></label>
					<input
						value={pass}
						type="password"
						id="password"
						required="required"
						autoComplete="current-password"
						onChange={(e) => { this.setState({ pass: e.target.value }); }}
					/>
				</div>

				<button className="yellow-btn" onClick={this.handleSignIn} disabled={this.isFieldsInvalid()}>
					<Translate i18nKey="SIGN_IN_SUBMIT" />
					{this.state.isLoading && <Loader loading xSmall />}
				</button>

				<p className="forgot-password-wrapper">
					<span className="forgot-password" onClick={this.handleForgotPassClick}>
						<Translate i18nKey="SIGN_IN_FORGOT_PASSWORD" />
					</span>
				</p>

				<div className="create-account">
					<h3><Translate i18nKey="SIGN_IN_NOT_ACCOUNT_YET" /></h3>
				</div>

				<button className="yellow-btn" onClick={this.handleSignUpClick}>
					<Translate i18nKey="SIGN_IN_SIGN_UP_LABEL" />
				</button>
			</section>
		);
	}
}

SignInForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

SignInForm.propsType = {
	onViewUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ landing }) => landing;

const mapDispatchToProps = dispatch => ({
	hideSuccessResetPass: () => dispatch(hideSuccessResetPass()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignInForm);
