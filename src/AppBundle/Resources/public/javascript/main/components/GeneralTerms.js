import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";

class GeneralTerms extends Component {
	render() {
		const {
			text = <Translate i18nKey="GENERIC_TERMS_TEXT_1" />,
			text2 = <Translate i18nKey="GENERIC_TERMS_TEXT_2" />,
			activationCode,
			defaultChecked,
			value,
			onChange,
			isInvalid,
		} = this.props;

		return (
			<div style={{ display: "flex", marginBottom: 10 }} className="terms-and-condition-wrapper">
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
					<a
						href={(activationCode) ? `/generalterms?activationCode=${activationCode}` : "/generalterms"}
						target="_blank"
						rel="noopener noreferrer"
					>
						{" "}
						Terms & Conditions


						{" "}
					</a>
					{text2}
				</div>
				{isInvalid
				&& <span className="is-invalid" style={{ marginLeft: 15 }}><Translate i18nKey="TERMS_NOT_CHECKED" /></span>}
			</div>
		);
	}
}

GeneralTerms.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default GeneralTerms;
