import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { SITE_URLS } from "@constants";

class SignUpSuccessfully extends PureComponent {
	handleLoginClick = () => window.location = SITE_URLS.HOME_URL;

	render() {
		return (
			<section className="sign-up-successfully-wrapper">
				<p className="done-icon-wrapper"><i className="fa fa-check-circle fa-5x" /></p>
				<h3><Translate i18nKey="SIGN_UP_SUCCESSFULLY_HEADER" /></h3>
				<p className="sign-up-text"><Translate i18nKey="SIGN_UP_SUCCESSFULLY_TEXT" /></p>
				<button
					className="yellow-btn"
					onClick={this.handleLoginClick}
				>
					<Translate i18nKey="LOGIN_SIGN_UP_BUTTON" />
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
