import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import cloneDeep from "lodash/cloneDeep";
import CountrySelector from '../../main/components/CountrySelector'
import {blueCheckIcon, cancelIcon, Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import PreferredUserProfile from "../components/PreferredUserProfile";
import PreferredSportSeller from "../components/PreferredSportSeller";
import PreferredTerritoriesBuyer from "../components/PreferredTerritoriesBuyer";
import PreferredSportBuyer from "../components/PreferredSportBuyer";
import PrivacyPolicy from "../../main/components/PrivacyPolicy";

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingUser : false,
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
            this.setState({updatingUser: false});
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

    onChangeReceiveNotifications= ( e ) => {
        let user  = this.state.user;
        user.receivePreferenceNotifications = e.target.checked;
        this.setState({user});
    };

    render () {

        const {history, common} = this.props;
        const { updatingUser, loading, user, privacy } = this.state;

        document.title = "Content Arena - Preferences";

        if (loading) return(<Spinner/>);

        return (
            <div className={"settings-container"}>
                <div className={"setting"}>

                    <PreferredUserProfile profile={user.preferredProfile}
                                          onChange={ profile => this.updateUser("preferredProfile", profile) }/>

                    {user.preferredProfile !== "BUYER" &&
                    <PreferredSportSeller sports={user.preferredSellerSports}
                                          parse={true}
                                          allSports={user.preferredSellerAllSports}
                                          onChange={this.handleSellerSports}/>}

                    {user.preferredProfile !== "SELLER" &&
                    <PreferredTerritoriesBuyer territories={user.preferredBuyerCountries}
                                               onChange={ territories => this.updateUser("preferredBuyerCountries", territories) }/>}

                    {user.preferredProfile !== "SELLER" &&
                    <PreferredSportBuyer sports={user.preferredBuyerSports}
                                         parse={true}
                                         allSports={user.preferredBuyerAllSports}
                                         onChange={this.handleBuyerSports}/>}

                    <div style={{display: 'flex', marginBottom: 10, justifyContent: 'center', fontSize: 14}}
                         className="terms-and-condition-wrapper">
                        <input
                            type="checkbox"
                            className="ca-checkbox"
                            defaultChecked={user.receivePreferenceNotifications}
                            onChange={this.onChangeReceiveNotifications}
                            style={{marginRight: 10}}
                        />
                        <div>
                            {this.context.t("PREFERENCES_RECEIVE_NOTIFICATIONS_MESSAGE")}
                        </div>
                    </div>

                    <div className={"buttons"}>
                        <div>
                            <button
                                onClick={this.saveUser}
                                disabled={ updatingUser }
                                className={"standard-button"}>
                                Save
                            </button>
                        </div>
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