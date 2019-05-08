import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
	Redirect,
} from "react-router-dom";
import RightsOverview from "./RightsOverview";
import { ROUTE_PATHS } from "@constants";

class ManageProperties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		const _this = this;
	}

	render() {
		const {
			loading,
		} = this.state;

		const { common } = this.props;

		if (common.properties.length === 0) {
			return <Redirect to={ROUTE_PATHS.CREATE_PROPERTY} />;
		}

		return (
			<React.Fragment>
				<RightsOverview />
			</React.Fragment>
		);
	}
}

ManageProperties.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ManageProperties);
