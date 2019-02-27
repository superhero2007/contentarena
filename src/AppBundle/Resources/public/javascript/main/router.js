import React from "react";
import PropTypes from "prop-types";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { setLanguage } from "redux-i18n";
import { routes } from "./routes";
import store from "./store";
import { updateProfile, loadUserData } from "./actions/userActions";
import {
	getDefaultRightsPackage, setEnvHostUrl, setTestStageMode, setTotalCountries,
} from "./actions/commonActions";
import { setRefererData, setRefererEmail } from "../landing/actions/landingActions";

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	updateProfile() {
		const { profile, routeProfile } = this.props;

		if (routeProfile && profile !== routeProfile) {
			store.dispatch(updateProfile(routeProfile));
			ContentArena.ContentApi.updateUserProfile(routeProfile);
		}
	}

	render() {
		const { component: Component, updateByPath, ...rest } = this.props;

		return (
			<Route
				{...rest}
				render={(props) => {
					this.updateProfile();
					return (
						<Component
							{...props}
							{...rest}
							key={(updateByPath) ? props.location.pathname : props.location.search}
						/>
					);
				}
				}
			/>
		);
	}
}

const HeaderRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (!Component) return null;
			return <Component {...props} {...rest} />;
		}}
	/>
);

class AuthRouter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: props.loggedUserData !== "" ? JSON.parse(props.loggedUserData) : {},
		};
	}

	componentWillMount() {
		const {
			loggedUserData, totalCountries, testStageMode, envHostUrl, refererEmail, refererListingId,
		} = this.props;

		this.props.loadUserData(loggedUserData);
		this.props.getDefaultRightsPackage();
		this.props.setLanguage("en");
		this.props.setTotalCountries(Number(totalCountries));
		this.props.setTestStageMode(!!+testStageMode);
		this.props.setEnvHostUrl(envHostUrl);
		this.props.setRefererData(refererEmail, refererListingId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({ user: nextProps.user });
		}
	}

	render() {
		const { user } = this.state;

		return (
			<Router>
				<React.Fragment>
					{routes.map((route, index) => (
						<React.Fragment key={index}>
							<HeaderRoute
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.header}
								profile={user.profile}
							/>
						</React.Fragment>
					))}
					<div className="manager-container">
						{routes.map((route, index) => (
							<PrivateRoute
								key={index}
								path={route.path}
								exact={route.exact}
								updateByPath={route.updateByPath}
								component={route.main}
								profile={user.profile}
								routeProfile={route.profile}
								title={route.title}
								updateProfile={this.props.updateProfile}
								{...this.props}
							/>
						))}
					</div>
				</React.Fragment>
			</Router>
		);
	}
}

AuthRouter.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	updateProfile: profile => dispatch(updateProfile(profile)),
	loadUserData: data => dispatch(loadUserData(data)),
	setTotalCountries: totalCountries => dispatch(setTotalCountries(totalCountries)),
	setTestStageMode: testStageMode => dispatch(setTestStageMode(testStageMode)),
	getDefaultRightsPackage: () => dispatch(getDefaultRightsPackage()),
	setLanguage: lang => dispatch(setLanguage(lang)),
	setEnvHostUrl: envHostUrl => dispatch(setEnvHostUrl(envHostUrl)),
	setRefererData: (refererEmail, refererListingId) => dispatch(setRefererData(refererEmail, refererListingId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthRouter);
