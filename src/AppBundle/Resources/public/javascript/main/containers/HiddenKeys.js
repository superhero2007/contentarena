import React from "react";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import store from "../store";
import { updateProfile } from "../actions/userActions";
import RegionCountrySelector from "../components/RegionCountrySelector";
import PopupCountrySelector from "../components/PopupCountrySelector";

class HiddenKeys extends React.Component {
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
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_LT")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_LB")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_DT")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_NA")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_NA_2")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_HL")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_HL_2")}
				{this.context.t("CL_STEP2_RIGHT_DEFINITIONS_PR")}

				{this.context.t("RIGHTS_SUBLICENSE")}
				{this.context.t("RIGHTS_SUBLICENSE_YES")}
				{this.context.t("RIGHTS_SUBLICENSE_YES_APPROVAL")}
				{this.context.t("RIGHTS_SUBLICENSE_NO")}
				{this.context.t("RIGHTS_SUBLICENSE_DESCRIPTION")}

				{this.context.t("RIGHTS_BROADCASTING")}
				{this.context.t("RIGHTS_BROADCASTING_YES")}
				{this.context.t("RIGHTS_BROADCASTING_NO")}
				{this.context.t("RIGHTS_BROADCASTING_DESCRIPTION")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_DESCRIPTION")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_ALL")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_CABLE")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_SATELLITE")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_DIGITAL")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_OTT/INTERNET")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_OTT")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_INTERNET")}
				{this.context.t("RIGHTS_TRANSMISSION_MEANS_MOBILE")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_DESCRIPTION")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_ALL")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_FREE")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_PAY")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_IN-SHIP")}
				{this.context.t("RIGHTS_EXPLOITATION_FORM_CLOSED")}
				{this.context.t("RIGHTS_LICENSED_LANGUAGES")}
				{this.context.t("RIGHTS_LICENSED_LANGUAGES_DESCRIPTION")}
				{this.context.t("RIGHTS_RUNS")}
				{this.context.t("RIGHTS_RUNS_UNLIMITED")}
				{this.context.t("RIGHTS_RUNS_LIMITED")}
				{this.context.t("RIGHTS_RUNS_DESCRIPTION")}
				{this.context.t("RIGHTS_EXPLOITATION_WINDOW")}
				{this.context.t("RIGHTS_EXPLOITATION_WINDOW_UNLIMITED")}
				{this.context.t("RIGHTS_EXPLOITATION_WINDOW_LIMITED")}
				{this.context.t("RIGHTS_EXPLOITATION_WINDOW_DESCRIPTION")}
				{this.context.t("RIGHTS_RESERVED_RIGHTS")}
				{this.context.t("RIGHTS_RESERVED_RIGHTS_YES")}
				{this.context.t("RIGHTS_RESERVED_RIGHTS_NO")}
				{this.context.t("RIGHTS_RESERVED_RIGHTS_DESCRIPTION")}
				{this.context.t("RIGHTS_CONTENT_DELIVERY")}
				{this.context.t("RIGHTS_CONTENT_DELIVERY_DEDICATED")}
				{this.context.t("RIGHTS_CONTENT_DELIVERY_LIVE")}
				{this.context.t("RIGHTS_CONTENT_DELIVERY_NON_DEDICATED")}
				{this.context.t("RIGHTS_VIDEO_STANDARD")}
				{this.context.t("RIGHTS_VIDEO_STANDARD_HD")}
				{this.context.t("RIGHTS_VIDEO_STANDARD_SD")}
				{this.context.t("RIGHTS_VIDEO_STANDARD_UHD")}
				{this.context.t("RIGHTS_VIDEO_STANDARD_VR")}
				{this.context.t("RIGHTS_ASPECT_RATIO")}
				{this.context.t("RIGHTS_ASPECT_RATIO_16_9")}
				{this.context.t("RIGHTS_ASPECT_RATIO_4_3")}
				{this.context.t("RIGHTS_ASPECT_RATIO_CUSTOM")}
				{this.context.t("RIGHTS_GRAPHICS")}
				{this.context.t("RIGHTS_GRAPHICS_YES")}
				{this.context.t("RIGHTS_GRAPHICS_NO")}
				{this.context.t("RIGHTS_COMMENTARY")}
				{this.context.t("RIGHTS_COMMENTARY_YES")}
				{this.context.t("RIGHTS_COMMENTARY_NO")}
				{this.context.t("RIGHTS_CAMERA")}
				{this.context.t("RIGHTS_CAMERA_MINIMUM")}
				{this.context.t("CAMERA_MINIMUM")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY_SATELLITE")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY_IP")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY_FTP")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY_FIBER")}
				{this.context.t("RIGHTS_PROGRAM")}
				{this.context.t("RIGHTS_VIDEO_STANDARD_DESCRIPTION")}
				{this.context.t("RIGHTS_CONTENT_DELIVERY_DESCRIPTION")}
				{this.context.t("RIGHTS_GRAPHICS_DESCRIPTION")}
				{this.context.t("RIGHTS_CAMERA_DESCRIPTION")}
				{this.context.t("RIGHTS_ASPECT_RATIO_DESCRIPTION")}
				{this.context.t("RIGHTS_COMMENTARY_DESCRIPTION")}
				{this.context.t("RIGHTS_TECHNICAL_DELIVERY_DESCRIPTION")}
				{this.context.t("CHECKOUT_METHOD_FIXED")}
				{this.context.t("CHECKOUT_METHOD_BIDDING")}

			</div>
		);
	}
}

HiddenKeys.contextTypes = {
	t: PropTypes.func.isRequired,
};

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
