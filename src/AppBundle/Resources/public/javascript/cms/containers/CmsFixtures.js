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

	componentDidMount() {
		const _this = this;
	}

	render() {
		const {
			loading,
		} = this.state;

		const { property, common: { totalCountries } } = this.props;

		return (
			<div className="region-filter">
				<CmsSeasonsFilter property={property}/>
			</div>
		);
	}
}

CmsFixtures.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		common: state.common,
		propertyFilters: state.propertyFilters,
	}
};

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsFixtures);
