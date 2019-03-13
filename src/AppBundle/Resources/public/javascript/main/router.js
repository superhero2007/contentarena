import React from "react";
import PropTypes from "prop-types";
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";
import { connect } from "react-redux";
import { setLanguage } from "redux-i18n";
import { routes } from "./routes";
import { Sentry, sentryDsnUrl } from "./constants/sentry";
import store from "./store";
import { updateProfile, loadUserData } from "./actions/userActions";
import {
	getDefaultRightsPackage, setEnvHostUrl, setTotalCountries, setConfig,
} from "./actions/commonActions";
import { setRefererData } from "../landing/actions/landingActions";
import { initGA, PageView } from "../common/components/Tracking";

class PrivateRoute extends React.Component {
	updateProfile() {
		const { profile, routeProfile } = this.props;

		if (routeProfile && profile !== routeProfile) {
			store.dispatch(updateProfile(routeProfile));
			ContentArena.ContentApi.updateUserProfile(routeProfile);
		}
	}

	render() {
		const {
			component: Component, updateByPath, title, ...rest
		} = this.props;

		return (
			<Route
				{...rest}
				render={(props) => {
					this.updateProfile();
					PageView();
					if (title !== null && title !== undefined) document.title = `Content Arena - ${title}`;

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

		if (Sentry) {
			const { email } = this.state.user;

			Sentry.init({ dsn: sentryDsnUrl });

			if (email) {
				Sentry.configureScope((scope) => {
					scope.setUser({ email });
				});
			}
		}
	}

	componentDidCatch(error, errorInfo) {
		if (Sentry) {
			Sentry.withScope((scope) => {
				Object.keys(errorInfo).forEach((key) => {
					scope.setExtra(key, errorInfo[key]);
				});
				Sentry.captureException(error);
			});
		}
	}

	componentWillMount() {
		const {
			loggedUserData,
			totalCountries,
			envHostUrl,
			refererEmail,
			refererListingId,
			config,
		} = this.props;

		this.props.loadUserData(loggedUserData);
		this.props.getDefaultRightsPackage();
		this.props.setLanguage("en");
		this.props.setTotalCountries(Number(totalCountries));
		this.props.setEnvHostUrl(envHostUrl);
		this.props.setRefererData(refererEmail, refererListingId);
		this.props.setConfig(JSON.parse(config, function (k, v) {
			if(v === 1 || v === 0) return !!+v;
			return v;
		}));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({ user: nextProps.user });
		}
	}

	componentDidMount() {
		const {
			gaTrackingId,
		} = this.props;

		initGA(gaTrackingId);
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
								title={route.title}
								updateByPath={route.updateByPath}
								component={route.main}
								profile={user.profile}
								routeProfile={route.profile}
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
	getDefaultRightsPackage: () => dispatch(getDefaultRightsPackage()),
	setLanguage: lang => dispatch(setLanguage(lang)),
	setEnvHostUrl: envHostUrl => dispatch(setEnvHostUrl(envHostUrl)),
	setConfig: config => dispatch(setConfig(config)),
	setRefererData: (refererEmail, refererListingId) => dispatch(setRefererData(refererEmail, refererListingId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthRouter);
