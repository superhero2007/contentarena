import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PropertyDetailsEditedProgramTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="property-edited-program-tab">
				edited program
			</section>
		);
	}
}

PropertyDetailsEditedProgramTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsEditedProgramTab);
