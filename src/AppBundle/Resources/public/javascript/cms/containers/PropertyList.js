import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import PropertyListItem from "../components/PropertyListItem";
import { ROUTE_PATHS } from "@constants";

class PropertyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { properties, history } = this.props;

		return (
			<div>
				{
					properties.map(property => <PropertyListItem {...property} key={property.customId} history={history} />)
				}
			</div>
		);
	}
}

PropertyList.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(PropertyList);
