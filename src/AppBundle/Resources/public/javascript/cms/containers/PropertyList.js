import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { ROUTE_PATHS } from "../../common/constants";

class PropertyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render() {
		const { properties } = this.props;

		return (
			<div>
			{
		 		properties.map(property => {
					return (
						<div>
							<a href={`${ROUTE_PATHS.PROPERTIES}/${property.customId}`}>
								{property.name}
							</a>
						</div>
					)
				})
			}
			</div>
		);
	}
}

PropertyList.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyList);
