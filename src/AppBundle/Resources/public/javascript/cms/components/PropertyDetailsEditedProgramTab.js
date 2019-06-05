import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EmptyEditProgram from "./EmptyScreens/EmptyEditProgram";

class PropertyDetailsEditedProgramTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { history } = this.props;
		return (
			<section className="property-edited-program-tab">
				<EmptyEditProgram history={history} />
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
