import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE } from "@constants";
import Loader from "../../common/components/Loader";

class RecoverPassword extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			error: "",
			isLoading: false,
		};
	}

	componentDidMount() {
		this.email.focus();
	}

	isFieldInvalid = () => !this.email.value;

	handleChange = () => this.setState({ error: "" });

	handleRecoverPassword = () => {
		if (this.state.isLoading) return;
		if (this.isFieldInvalid()) {
			this.setState({ error: this.context.t("RECOVER_PASSWORD_ERROR") });
			return;
		}
		this.setState({ isLoading: true });

		ContentArena.Api.recoverPassword(this.email.value)
			.then(({ data }) => {
				if (data.success) {
					this.props.onViewUpdate(LOGIN_VIEW_TYPE.REVIEW);
				}
			})
			.catch(({ response }) => {
				this.setState({ error: response.data.message });
			})
			.finally(() => this.setState({ isLoading: false }));
	};

	handleEnterPress = (event) => {
		if (event.key === "Enter") {
			this.handleRecoverPassword();
		}
	};

	render() {
		return (
			<section className="recover-wrapper" onKeyPress={this.handleEnterPress}>
				<h3>{this.context.t("LOGIN_RECOVER_PASSWORD")}</h3>

				{this.state.error && <span className="sign-error">{this.state.error}</span>}
				<div className="username">
					<label htmlFor="username">{this.context.t("LOGIN_YOUR_EMAIL")}</label>
					<input
						ref={email => this.email = email}
						type="text"
						placeholder={this.context.t("LOGIN_EMAIL_PLACEHOLDER")}
						name="_username"
						id="username"
						required="required"
						onChange={this.handleChange}
						autoComplete="username"
					/>
				</div>
				<button className="yellow-button" onClick={this.handleRecoverPassword}>
					{this.context.t("LOGIN_REQUEST_NEW_PASSWORD")}
					{this.state.isLoading && <Loader loading xSmall />}
				</button>
			</section>
		);
	}
}

RecoverPassword.contextTypes = {
	t: PropTypes.func.isRequired,
};

RecoverPassword.propsType = {
	onViewUpdate: PropTypes.func.isRequired,
};

export default RecoverPassword;
