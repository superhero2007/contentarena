import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CmsSeasonsFilter from "../components/CmsSeasonsFilter";

class CmsFixtures extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {}

	render() {
		const {
			loading,
		} = this.state;

		const { property, common: { totalCountries } } = this.props;

		return (
			<section className="fixture-tab region-filter">
				<CmsSeasonsFilter property={property} />
			</section>
		);
	}
}

CmsFixtures.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsFixtures);
