import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

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

		return (
			<div className="base-input">
				<label>
					{this.context.t("CL_STEP4_LABEL_JURISDICTION")}
				</label>
				<input
					type="text"
					value={jurisdiction}
					onChange={this.selectTerritory}
					placeholder={isInvalid ? this.context.t("JURISDICTION_EMPTY") : this.context.t("CL_STEP4_PLACEHOLDER_JURISDICTION")}
					className={isInvalid ? "is-invalid" : ""}
					maxLength={250}
				/>

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
