import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import RightsOverview from "./RightsOverview";
import {
	Redirect
} from "react-router-dom";
import { ROUTE_PATHS } from "../../main/routes";

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
			return <Redirect to={ROUTE_PATHS.CREATE_PROPERTY}/>;
		}

		return (
			<React.Fragment>
				<RightsOverview/>
			</React.Fragment>
		);
	}

}

ManageProperties.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	//updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ManageProperties);