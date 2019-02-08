import React from "react";
import {routes} from "./routes";
import PropTypes from "prop-types";
import { LOGIN_VIEW_TYPE } from "@constants";
import store  from "./store";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {connect} from "react-redux";
import {updateProfile, loadUserData} from "./actions/userActions";
import {getDefaultRightsPackage, setEnvHostUrl, setTestStageMode, setTotalCountries} from "./actions/commonActions";
import {setLanguage} from "redux-i18n";
import LandingWrapper from './../landing/containers/LandingWrapper';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    updateProfile() {
        const {profile, routeProfile} = this.props;

        if ( routeProfile && profile !== routeProfile ){
            store.dispatch(updateProfile(routeProfile));
            ContentArena.ContentApi.updateUserProfile(routeProfile);
        }
    }

    render(){
        const { component: Component, updateByPath, profile, isPublic, title, ...rest } = this.props;

        return <Route
            {...rest}
            render={props => {

                this.updateProfile();

                if ( !fakeAuth.isAuthenticated && !isPublic ) return <Redirect
                    to={{
                        pathname: "/landing",
                        state: {from: props.location}
                    }}
                />;

                return props.match.path === "/" ? (
                    <Redirect
                        to={{
                            pathname: "/marketplace",
                            state: {from: props.location}
                        }}
                    />
                ) : (
                    Component &&
                    <Component {...props} {...rest} key={(updateByPath) ? props.location.pathname : props.location.search}/>
                )
            }
            }
        />
    }
}

const HeaderRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!Component) return null;
            return <Component {...props} {...rest}/>
        }}
    />
);


class Landing extends React.Component {
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if (hosturl === "https://app.contentarena.com/") window.location = 'https://contentarena.com';

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                {/*<button onClick={this.login}>Log in</button>*/}
                <a href={"/login"}>Log in</a>
            </div>
        );
    }
}

class Logout extends React.Component {

    logout = () => {
        fakeAuth.signout(() => history.push("/"));
    };

    render() {
        return (
            <div>
                <p>Are you sure you want to sign out?</p>
                <button onClick={this.logout}>Yes, sign out</button>
            </div>
        );
    }
}

class AuthRouter extends React.Component {

    constructor(props) {
        super(props);

        if (props.loggedUser) fakeAuth.authenticate(()=>{});

        this.state = {
            user : props.loggedUserData !== "" ? JSON.parse(props.loggedUserData) : {}
        };
    }

    componentWillMount() {
        const {loggedUserData, totalCountries, testStageMode, envHostUrl} = this.props;

        this.props.loadUserData(loggedUserData);
        this.props.getDefaultRightsPackage();
        this.props.setLanguage("en");
        this.props.setTotalCountries(Number(totalCountries));
        this.props.setTestStageMode(!!+testStageMode);
        this.props.setEnvHostUrl(envHostUrl);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user){
            this.setState({user: nextProps.user})
        }
    }

    render() {
        const {user} = this.state;

        const SignUp = withRouter(({history}) =>
            <LandingWrapper currentView={LOGIN_VIEW_TYPE.REGISTER} history={history} />);
        const SignIn = withRouter(({history}) =>
            <LandingWrapper currentView={LOGIN_VIEW_TYPE.LOGIN} history={history} fakeAuth={fakeAuth} />);
        const ResetPassword = withRouter(({history, match}) =>
            <LandingWrapper currentView={LOGIN_VIEW_TYPE.RESET_PASSWORD} history={history} match={match} />);

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
                                isPublic={route.isPublic}
                                updateProfile={this.props.updateProfile}
                                {...this.props}
                            />
                        ))}
                    </div>
                    <Route path="/landing" component={Landing} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/reset-password/:resetToken" component={ResetPassword} />
                    <Route path="/login" component={SignIn} />
                    <Route path="/registration" component={SignUp} />
                </React.Fragment>
            </Router>
        );
    }
}

AuthRouter.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email) => dispatch({
            type : 'LOGIN',
            email: email
        }),
        updateProfile : profile =>dispatch(updateProfile(profile)),
        loadUserData : data => dispatch(loadUserData(data)),
        setTotalCountries : totalCountries => dispatch(setTotalCountries(totalCountries)),
        setTestStageMode : testStageMode => dispatch(setTestStageMode(testStageMode)),
        getDefaultRightsPackage : () => dispatch(getDefaultRightsPackage()),
        setLanguage: lang => dispatch(setLanguage(lang)),
        setEnvHostUrl : envHostUrl => dispatch(setEnvHostUrl(envHostUrl))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthRouter);