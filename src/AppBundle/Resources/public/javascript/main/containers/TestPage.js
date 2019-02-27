import React from "react";

import { connect } from "react-redux";
import store from "../store";
import { updateProfile } from "../actions/userActions";
import RegionCountrySelector from "../components/RegionCountrySelector";
import PopupCountrySelector from "../components/PopupCountrySelector";

class TestPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		store.subscribe((a) => {
			// console.log(store.getState());
		});
	}

	componentDidMount = () => {
	};

	render() {
		const { history } = this.props;
		return (
			<div className="manager-content">
				<RegionCountrySelector
					onSelect={(s) => {
						console.log(s);
					}}
				/>

				<PopupCountrySelector />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
	contentListingInit: content => dispatch({
		type: "CONTENT_INIT",
		content,
	}),
	updateProfile: profile => dispatch(updateProfile(profile)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TestPage);
