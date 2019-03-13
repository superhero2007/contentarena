import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class CmsFixtures extends React.Component {
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

		return (
			<div>
				Fixtures
			</div>
		);
	}
}

CmsFixtures.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsFixtures);
