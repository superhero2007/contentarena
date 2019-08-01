import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { isMobileOnly } from "react-device-detect";
import SignInForm from "../components/SignInForm";
import RecoverPassword from "../components/RecoverPassword";
import ReviewEmail from "../components/ReviewEmail";
import SignUpForm from "../components/SignUpForm";
import ResetPassword from "../components/ResetPassword";
import ListingPreview from "../components/ListingPreview";
import SignUpSuccessfully from "../components/SignUpSuccessfully";
import LandingHeader from "../components/LandingHeader";
import { LOGIN_VIEW_TYPE } from "@constants";

class LandingWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentView: this.props.currentView || LOGIN_VIEW_TYPE.LOGIN,
		};
	}

	getMinHeight = () => this.props.minHeight[this.state.currentView];

	handleUpdateView = viewType => this.setState({ currentView: viewType });

	render() {
		const { currentView } = this.state;
		const Component = this.props.views[currentView];
		return (
			<div className="login-page" style={{ minHeight: this.getMinHeight() }}>
				<LandingHeader currentView={currentView} history={this.props.history} />

				<section
					className={cn("action-form", {
						mobile: isMobileOnly,
						preview: currentView === LOGIN_VIEW_TYPE.LISTING_PREVIEW,
					})}
				>
					<Component
						onViewUpdate={this.handleUpdateView}
						history={this.props.history}
						match={this.props.match}
					/>
				</section>
			</div>
		);
	}
}

LandingWrapper.contextTypes = {
	t: PropTypes.func.isRequired,
};

LandingWrapper.defaultProps = {
	views: {
		[LOGIN_VIEW_TYPE.LOGIN]: SignInForm,
		[LOGIN_VIEW_TYPE.RECOVER]: RecoverPassword,
		[LOGIN_VIEW_TYPE.REVIEW]: ReviewEmail,
		[LOGIN_VIEW_TYPE.REGISTRATION]: SignUpForm,
		[LOGIN_VIEW_TYPE.REGISTERED]: SignUpSuccessfully,
		[LOGIN_VIEW_TYPE.RESET_PASSWORD]: ResetPassword,
		[LOGIN_VIEW_TYPE.LISTING_PREVIEW]: ListingPreview,
	},
	minHeight: {
		[LOGIN_VIEW_TYPE.LOGIN]: 800,
		[LOGIN_VIEW_TYPE.RECOVER]: 800,
		[LOGIN_VIEW_TYPE.REVIEW]: 800,
		[LOGIN_VIEW_TYPE.REGISTRATION]: 900,
		[LOGIN_VIEW_TYPE.REGISTERED]: 800,
		[LOGIN_VIEW_TYPE.RESET_PASSWORD]: 800,
		[LOGIN_VIEW_TYPE.LISTING_PREVIEW]: 1025,
	},
};

export default LandingWrapper;
