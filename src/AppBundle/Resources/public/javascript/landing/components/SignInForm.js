import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
		};
	}

	componentDidMount() {
		this.name.focus();
	}

	isFieldsInvalid = () => !this.name.value || !this.pass.value;

	handleSignUpClick = () => {
		if (this.state.isLoading) return;
		this.props.history.push("/registration");
	};

	handleForgotPassClick = () => {
		if (this.state.isLoading) return;
		this.props.onViewUpdate(LOGIN_VIEW_TYPE.RECOVER);
	};

	handleInputChange = () => this.setState({ error: "" });

	handleSignIn = () => {
		const { refererEmail, refererListingId } = this.props;

		if (this.props.resetPasswordSuccess) this.props.hideSuccessResetPass();
		if (this.state.isLoading) return;
		if (this.isFieldsInvalid()) {
			this.setState({ error: this.context.t("SIGN_IN_ERROR") });
			return;
		}
		this.setState({ isLoading: true });

		ContentArena.Api.signInUser(this.name.value, this.pass.value)
			.then(({ data }) => {
				if (data.success) {
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

		return (
			<section className="sign-in-wrapper" onKeyPress={this.handleEnterPress}>
				<h3>{this.context.t("SIGN_IN_TO_CONTENT_ARENT")}</h3>

				{refererEmail && refererEmail !== "" && (
					<p className="sign-in-error-message">
						{this.context.t("SIGN_IN_FROM_PUBLIC_LISTING_MESSAGE")}
					</p>
				)}

				{this.props.resetPasswordSuccess && (
					<div className="reset-success-password">
						<p>
							<i className="fa fa-chevron-circle-down" />
							{this.context.t("SIGN_IN_RESET_MESSAGE")}
						</p>
						<p>{this.context.t("SIGN_IN_RESET_LOGIN_MESSAGE")}</p>
					</div>
				)}
				{this.state.error && <span className="sign-error">{this.state.error}</span>}
				<div className="username">
					<label htmlFor="username">{this.context.t("SIGN_IN_EMAIL")}</label>
					<input
						ref={name => this.name = name}
						type="text"
						id="username"
						name="_username"
						placeholder={this.context.t("SIGN_IN_EMAIL_PLACEHOLDER")}
						required="required"
						onChange={this.handleInputChange}
						autoComplete="username"
					/>
				</div>

				<div className="password">
					<label htmlFor="password">{this.context.t("SIGN_IN_PASSWORD")}</label>
					<input
						ref={password => this.pass = password}
						type="password"
						id="password"
						onChange={this.handleInputChange}
						required="required"
						autoComplete="current-password"
					/>
				</div>

				<button className="yellow-btn" onClick={this.handleSignIn}>
					{this.context.t("SIGN_IN_SUBMIT")}
					{this.state.isLoading && <Loader loading xSmall />}
				</button>

				<p className="forgot-password-wrapper">
					<span className="forgot-password" onClick={this.handleForgotPassClick}>
						{this.context.t("SIGN_IN_FORGOT_PASSWORD")}
					</span>
				</p>

				<div className="create-account">
					<h3>{this.context.t("SIGN_IN_NOT_ACCOUNT_YET")}</h3>
				</div>

				<button className="yellow-btn" onClick={this.handleSignUpClick}>
					{this.context.t("SIGN_IN_SIGN_UP_LABEL")}
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
