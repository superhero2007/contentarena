import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SITE_URLS } from "../../common/constants";

class SignUpSuccessfully extends PureComponent {
	constructor(props) {
		super(props);
	}

	handleLoginClick = () => window.location = SITE_URLS.HOME_URL;

	render() {
		return (
			<section className="sign-up-successfully-wrapper">
				<p className="done-icon-wrapper"><i className="fa fa-check-circle fa-5x" /></p>
				<h3>{this.context.t("SIGN_UP_SUCCESSFULLY_HEADER")}</h3>
				<p className="sign-up-text">{this.context.t("SIGN_UP_SUCCESSFULLY_TEXT")}</p>
				<button
					className="yellow-btn"
					onClick={this.handleLoginClick}
				>
					{this.context.t("LOGIN_SIGN_UP_BUTTON")}
				</button>
			</section>
		);
	}
}

SignUpSuccessfully.contextTypes = {
	t: PropTypes.func.isRequired,
};

SignUpSuccessfully.propsType = {
	onViewUpdate: PropTypes.func.isRequired,
};

export default SignUpSuccessfully;
