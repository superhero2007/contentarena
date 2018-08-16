import React from "react";
import {routes} from "./routes";
import {PropTypes} from 'prop-types';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {connect} from "react-redux";
import {updateProfile} from "./actions/userActions";
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

const PrivateRoute = ({ component: Component, updateByPath, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} {...rest} key={(updateByPath) ? props.location.pathname : props.location.search} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/landing",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => <Component {...props} {...rest} />}
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

        if (redirectToReferrer) {
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
        };
    }

    componentWillMount() {
        this.props.setLanguage("en");
    }

    render() {

        const {user} = this.props;

        return (
            <Router>
                <div className="manager-container">

                    <Route path="/landing" component={Login} />
                    <Route path="/logout" component={Logout} />

                    {routes.map((route, index) => (
                        <PublicRoute
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
        setLanguage: lang => dispatch(setLanguage(lang))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthRouter)