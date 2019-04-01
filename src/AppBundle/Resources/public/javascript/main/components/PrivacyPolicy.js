import React, { Component } from "react";
import { PropTypes } from "prop-types";

class PrivacyPolicy extends Component {
	render() {
		const {
			text = this.context.t("GENERIC_TERMS_TEXT_1"),
			text2 = this.context.t("GENERIC_TERMS_TEXT_2"),
			defaultChecked,
			value,
			onChange,
		} = this.props;

		return (
			<div
				style={{ display: "flex", marginBottom: 10, justifyContent: "center" }}
				className="terms-and-condition-wrapper"
			>
				<input
					type="checkbox"
					className="ca-checkbox"
					defaultChecked={defaultChecked}
					value={value}
					onChange={onChange}
					style={{ marginRight: 10 }}
				/>
				<label htmlFor="terms_arena" />
				<div>
					{text}
					<a href="https://contentarena.com/web/privacy-policy/" target="_blank" rel="noopener noreferrer"> Privacy Policy </a>
					{text2}
				</div>
			</div>
		);
	}
}

PrivacyPolicy.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default PrivacyPolicy;
