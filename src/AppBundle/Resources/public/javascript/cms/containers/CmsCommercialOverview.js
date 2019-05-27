import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import EmptyCommercialOverview from "../components/EmptyScreens/EmptyCommercialOverview";

class CmsCommercialOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {}

	render() {
		return (
			<section className="commercial-overview-tab">
				<EmptyCommercialOverview />
			</section>
		);
	}
}

CmsCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsCommercialOverview);
