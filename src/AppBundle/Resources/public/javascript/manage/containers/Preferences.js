import React from 'react';
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import {PropTypes} from "prop-types";
import PreferredUserProfile from "../components/PreferredUserProfile";
import PreferredSportSeller from "../components/PreferredSportSeller";
import PreferredTerritoriesBuyer from "../components/PreferredTerritoriesBuyer";
import PreferredSportBuyer from "../components/PreferredSportBuyer";
import Loader from "../../common/components/Loader";

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingUser : false,
            userUpdated : false,
            companyUsers : [],
            user : {}
        };

    }

    componentDidMount () {
        this.setState({loading:true, loadingCompanyUsers: true});

        ContentArena.ContentApi.getUserInfo().done(user=>{
            this.originalUser = cloneDeep(user);
            this.setState({
                loading:false,
                user : user,
                profile : user.preferredProfile
            });
        });

    }

    saveUser = () => {
        const { user } = this.state;

        this.setState({updatingUser:true});

        this.originalUser = cloneDeep(user);
        ContentArena.ContentApi.updateUser(user).done(()=>{
            this.setState({updatingUser: false, userUpdated : true});
        })
    };

    updateUser = (prop, value) => {
        let user  = this.state.user;
        user[prop] = value;
        this.setState({user});

    };

    handleSellerSports = ( response ) => {
        let user  = this.state.user;
        user.preferredSellerSports = response.sports;
        user.preferredSellerAllSports = response.all;
        this.setState({user});
    };

    handleBuyerSports = ( response) => {
        let user  = this.state.user;
        user.preferredBuyerSports = response.sports;
        user.preferredBuyerAllSports = response.all;
        this.setState({user});
    };

    completeButtonDisabled = () => {
        const { user } = this.state;

        if (!user.preferredProfile && !user.preferredBuyerCountries && !user.preferredSellerSports) return false;

        return (user.preferredProfile !== "SELLER"
            && ( (!user.preferredBuyerOtherSport &&!user.preferredBuyerAllSports && user.preferredBuyerSports.length === 0)
                || user.preferredBuyerCountries.length === 0 ) )
            || (user.preferredProfile !== "BUYER"
                && ( !user.preferredSellerOtherSport && !user.preferredSellerAllSports && user.preferredSellerSports.length === 0) )
    };

    render () {

        const {history, common} = this.props;
        const { updatingUser, loading, user, privacy, userUpdated } = this.state;

        document.title = "Content Arena - Preferences";

        if (loading) return <Loader loading={true}/>;

        return (
            <div className={"settings-container preferences"}>
                <div className={"setting"}>

                    <div className="title">
                        {this.context.t("PREFERENCES_HEADLINE")}
                    </div>

                    <div className="subtitle">
                        {this.context.t("PREFERENCES_HEADLINE_EXPLANATION_TEXT")}
                    </div>

                    <PreferredUserProfile profile={user.preferredProfile}
                                          onChange={ profile => this.updateUser("preferredProfile", profile) }/>

                    {user.preferredProfile !== "BUYER" &&
                    <PreferredSportSeller sports={user.preferredSellerSports}
                                          parse={true}
                                          showSubtitle={false}
                                          allSports={user.preferredSellerAllSports}
                                          onChange={this.handleSellerSports}/>}

                    {user.preferredProfile !== "SELLER" &&
                    <PreferredTerritoriesBuyer territories={user.preferredBuyerCountries}
                                               onChange={ territories => this.updateUser("preferredBuyerCountries", territories) }/>}

                    {user.preferredProfile !== "SELLER" &&
                    <PreferredSportBuyer sports={user.preferredBuyerSports}
                                         parse={true}
                                         showSubtitle={false}
                                         allSports={user.preferredBuyerAllSports}
                                         onChange={this.handleBuyerSports}/>}

                    <div className={"buttons"}>
                        <div>
                            <button
                                onClick={this.saveUser}
                                disabled={ updatingUser || this.completeButtonDisabled() }
                                className={"standard-button"}>
                                Save
                            </button>
                        </div>
                        {userUpdated && <div>
                            {this.context.t("PREFERENCES_USER_UPDATED_MESSAGE")}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

Preferences.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preferences)