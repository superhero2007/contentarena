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
		const { history, propertyId } = this.props;
		return (
			<section className="commercial-overview-tab">
				<EmptyCommercialOverview history={history} propertyId={propertyId} />
			</section>
		);
	}
}

CmsCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsCommercialOverview);
