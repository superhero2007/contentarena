import React from "react";
import { connect } from "react-redux";
import test from "../actions";

class TerritorySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	showTab = (tab) => {
		this.setState({ tab });
	};

	render() {
		return (
			<div className="">
				{this.props.salesPackage.id}

			</div>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TerritorySelector);
