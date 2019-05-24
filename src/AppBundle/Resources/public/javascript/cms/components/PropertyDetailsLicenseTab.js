import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PropertyDetailsLicenseTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="property-license-tab">
				License tab!
			</section>
		);
	}
}

PropertyDetailsLicenseTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsLicenseTab);
