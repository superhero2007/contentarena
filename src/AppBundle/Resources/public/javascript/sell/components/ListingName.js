import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class ListingName extends React.PureComponent {
	onBlur = (e) => {
		const { onChange } = this.props;
		e.target.value = e.target.value.trim();
		onChange(e);
	};

	render() {
		const { name, validation, onChange } = this.props;
		const isInvalid = !name && validation;
		return (
			<div className="base-input">
				<label>
					{this.context.t("CL_STEP1_LISTING_NAME")}
				</label>
				<input
					type="text"
					value={name || ""}
					onChange={onChange}
					onBlur={this.onBlur}
					placeholder={isInvalid ? this.context.t("LISTING_NAME_EMPTY") : ""}
					className={isInvalid ? "is-invalid" : ""}
					maxLength={70}
				/>
			</div>
		);
	}
}

ListingName.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	validation: state.validation,
});

export default connect(
	mapStateToProps,
)(ListingName);
