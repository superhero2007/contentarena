import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CreatePropertyEvent from "./CreatePropertyEvent";
import CreatePropertyTerritories from "./CreatePropertyTerritories";
import CreatePropertyWelcome from "./CreatePropertyWelcome";

class CreateProperty extends React.Component {
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

		const { common, history } = this.props;
		const { action, key } = this.props.match.params;

		if (action !== undefined && action === "1") return <CreatePropertyEvent history={history}/>;
		if (action !== undefined && action === "2") return <CreatePropertyTerritories history={history}/>;

		return <CreatePropertyWelcome history={history} />;
	}

}

CreateProperty.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	//updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreateProperty);