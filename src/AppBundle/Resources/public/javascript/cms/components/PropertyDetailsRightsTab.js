import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PropertyDetailsRightsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="property-rights-tab">
				Rights!
			</section>
		);
	}
}

PropertyDetailsRightsTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsRightsTab);
