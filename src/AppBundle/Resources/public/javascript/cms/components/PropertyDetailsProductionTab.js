import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PropertyDetailsProductionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="property-production-tab">
				Production tab!
			</section>
		);
	}
}

PropertyDetailsProductionTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsProductionTab);
