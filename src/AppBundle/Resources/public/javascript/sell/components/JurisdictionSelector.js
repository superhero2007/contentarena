import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { TranslatedPlaceholderInput } from "@components/Translator";


class JurisdictionSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	selectTerritory = (e) => {
		this.props.updateContentValue("jurisdiction", e.target.value);
	};

	render() {
		const { jurisdiction, validation } = this.props;
		const isInvalid = !jurisdiction && validation;
		const placeholderKey = isInvalid ? "JURISDICTION_EMPTY" : "CL_STEP4_PLACEHOLDER_JURISDICTION";

		return (
			<div className="base-input">
				<label>
					<Translate i18nKey="CL_STEP4_LABEL_JURISDICTION" />
				</label>

				<Translate i18nKey={placeholderKey}>
					<TranslatedPlaceholderInput
						type="text"
						value={jurisdiction}
						onChange={this.selectTerritory}
						className={isInvalid ? "is-invalid" : ""}
						maxLength={250}
					/>
				</Translate>

			</div>
		);
	}
}

JurisdictionSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(JurisdictionSelector);
