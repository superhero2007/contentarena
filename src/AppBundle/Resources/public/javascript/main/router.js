import React from "react";
import {routes} from "./routes";
import {PropTypes} from 'prop-types';
import store  from './store';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {connect} from "react-redux";
import {updateProfile, loadUserData} from "./actions/userActions";
import {getDefaultRightsPackage} from "./actions/commonActions";
import {setLanguage} from "redux-i18n";

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

        this.state = {
        };
    }

    updateProfile() {
        const {profile, routeProfile} = this.props;

        if ( routeProfile && profile !== routeProfile ){
            store.dispatch(updateProfile(routeProfile));
            ContentArena.ContentApi.updateUserProfile(routeProfile)
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
                            pathname: profile === "SELLER" ? "/managelistings" : "/marketplace",
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


class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (hosturl === "https://app.contentarena.com/") window.location = 'https://contentarena.com';

        if (redirectToReferrer) {
            console.log("Redirecting to ", from);
            return <Redirect to={from} />;
        }

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
        const {loggedUserData} = this.props;
        this.props.loadUserData(loggedUserData);
        this.props.getDefaultRightsPackage();
        this.props.setLanguage("en");
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user){
            this.setState({user: nextProps.user})
        }
    }

    render() {

        const {user} = this.state;

        return (
            <Router>
                <div className="manager-container">

                    <Route path="/landing" component={Login} />
                    <Route path="/logout" component={Logout} />

                    {routes.map((route, index) => (
                        <HeaderRoute
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.header}
                            profile={user.profile}
                        />
                    ))}

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
        getDefaultRightsPackage : () => dispatch(getDefaultRightsPackage()),
        setLanguage: lang => dispatch(setLanguage(lang))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthRouter)