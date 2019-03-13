import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CmsWelcome from "./CmsWelcome";
import NewProperty from "./NewProperty";

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

		if (action !== undefined && action === "1") return <NewProperty/>;

		return <CmsWelcome history={history} />;
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
