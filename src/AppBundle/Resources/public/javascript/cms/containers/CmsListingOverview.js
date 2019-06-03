import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EmptyListingOverview from "../components/EmptyScreens/EmptyListingOverview";

class CmsListingOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() { }

	render() {
		return (
			<section className="listing-overview-tab">
				<EmptyListingOverview />
			</section>
		);
	}
}

CmsListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsListingOverview);
