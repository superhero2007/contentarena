import React from 'react';

import { connect } from "react-redux";
import {updateProfile} from "../../main/actions/userActions";
import CountrySelector from "../components/CountrySelector";
import {Redirect} from "react-router-dom";
import {blueCheckIcon, cancelIcon, editIcon, Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import GeneralTerms from "../components/GeneralTerms";
import PrivacyPolicy from "../components/PrivacyPolicy";
import PreferredUserProfile from "../../manage/components/PreferredUserProfile";
import PreferredSportSeller from "../../manage/components/PreferredSportSeller";
import PreferredTerritoriesBuyer from "../../manage/components/PreferredTerritoriesBuyer";
import PreferredSportBuyer from "../../manage/components/PreferredSportBuyer";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingUser : false,
            editCompanyInfo : false,
            user : {},
            step: 1
        };
    }

    componentDidMount () {
        this.setState({loading:true});

        const { match } = this.props;

        let activationCode = match.params.activationCode;

        ContentArena.ContentApi.getUserInfoByActivationCode(activationCode).done(user=>{
            if (user) {
                user.activationCode = activationCode;
                if (!user.company) {
                    user.company = {country:{}};
                }
            }
            this.setState({
                loading:false,
                user : user,
            });
        });

    }

    updateInfo = () => {

        const {user, password} = this.state;
        this.setState({updatingUser:true});
        ContentArena.ContentApi.activateUser(user, password).done(()=>{
            this.setState({updated:true, updatingUser:false});
        })
    };

    validate = (pass) => {
        return {
            length : ( pass.length >= 8 ),
            digit : /\d/.test(pass),
            upper : /[A-Z]/.test(pass),
            special : /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
        };
    };

    invalidPassword = () => {
        const { password, passwordCheck } = this.state;

        if (!password ||  !passwordCheck ) return true;

        let valid = this.validate(password);

        return  password !== passwordCheck ||
            !valid.length ||
            !valid.digit ||
            !valid.upper ||
            !valid.special;
    };

    invalidUser = () => {
        let user = this.state.user;
        return user.firstName === "" ||
            user.firstName === null ||
            user.lastName === "" ||
            user.lastName === null ||
            user.email === "" ||
            user.email === null ||
            user.phone === null ||
            user.phone === "";

    };

    invalidCompany = () => {
        let user = this.state.user;
        return user === null ||
            user.company.city === "" ||
            user.company.city === null ||
            user.company.city === undefined ||
            user.company.address === null ||
            user.company.address === "" ||
            user.company.address === undefined ||
            user.company.zip === null ||
            user.company.zip === "" ||
            user.company.zip === undefined ||
            user.company.country === null ||
            user.company.country === undefined ||
            user.company.country.name === undefined ||
            user.company.legalName === undefined ||
            user.company.legalName === null ||
            user.company.legalName === "" ;

    };

    updateUser = (prop, value) => {
        let user  = this.state.user;
        user[prop] = value;
        this.setState({user});

    };

    handleSellerSports = ( sports, allSports) => {
        let user  = this.state.user;
        user.preferredSellerSports = sports;
        user.preferredSellerAllSports = allSports;
        this.setState({user});
    };

    handleBuyerSports = ( sports, allSports) => {
        let user  = this.state.user;
        user.preferredBuyerSports = sports;
        user.preferredBuyerAllSports = allSports;
        this.setState({user});
    };

    completeButtonDisabled = () => {
        const { user } = this.state;
        return (user.preferredProfile !== "SELLER"
            && ( (!user.preferredBuyerAllSports && user.preferredBuyerSports.length === 0)
                || user.preferredBuyerCountries.length === 0 ) )
        || (user.preferredProfile !== "BUYER"
                && ( !user.preferredSellerAllSports && user.preferredSellerSports.length === 0) )
    };

    render () {

        const {history, match, location, common} = this.props;


        const { loading, updatingUser, password, updated, terms, privacy, passwordCheck, step } = this.state;
        let user = this.state.user;
        let activationCode = match.params.activationCode;
        let country = (user && user.company && user.company.country) ? {label: user.company.country.name, value: user.company.country.name} : null;

        if (!activationCode) return <Redirect
            to={{
                pathname: "/landing",
                state: {from: location}
            }}
        />;

        if (loading) return <div className={"settings-container"}>
            <Spinner/>
        </div>;

        if (!user) return <div className={"settings-container"}>
            {this.context.t("REGISTER_ACTIVATION_CODE_NOT_FOUND")}
        </div>;


        if ( step === 1 ) return <div className="settings-container settings-container-welcome">

            <div className={"big-title"}>
                {this.context.t("SETTINGS_WELCOME")}
            </div>
            <div className="title justify-content-center">
                {this.context.t("SETTINGS_WELCOME_TEXT")}
            </div>

            <div className={"setting"}>
                <PreferredUserProfile profile={user.preferredProfile}
                                      centered={true}
                                      onChange={ profile => this.updateUser("preferredProfile", profile) }/>
                <div className={"buttons"}>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({step: 2})
                            }}
                            disabled={ updatingUser }
                            className={"standard-button"}>
                            {this.context.t("SETTINGS_BUTTON_CONTINUE")}
                        </button>
                    </div>
                </div>
            </div>

        </div>;

        if ( step === 2 ) return <div className="settings-container">

            <div className={"setting"}>
                {user.preferredProfile !== "BUYER" &&
                <PreferredSportSeller sports={user.preferredSellerSports}
                                      allSports={user.preferredSellerAllSports}
                                      onChange={this.handleSellerSports}/>}

                {user.preferredProfile !== "SELLER" &&
                <PreferredTerritoriesBuyer territories={user.preferredBuyerCountries}
                                           onChange={ territories => this.updateUser("preferredBuyerCountries", territories) }/>}

                {user.preferredProfile !== "SELLER" &&
                <PreferredSportBuyer sports={user.preferredBuyerSports}
                                     allSports={user.preferredBuyerAllSports}
                                     onChange={this.handleBuyerSports}/>}

                <div className={"buttons"}>
                    <div>
                        <button
                            onClick={() => {
                                this.setState({step: 3})
                            }}
                            disabled={ this.completeButtonDisabled() }
                            className={"standard-button"}>
                            {this.context.t("SETTINGS_BUTTON_COMPLETE")}
                        </button>
                    </div>
                </div>
            </div>

        </div>;

        return (
            <div className={"settings-container"}>

                <div className={"title"}>
                    {this.context.t("SETTINGS_LABEL_USER_TITLE_INFO")}
                </div>

                <div className={"setting"}>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")} *
                            </label>
                            <input value={user.firstName} onChange={(e)=>{
                                user.firstName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")} *
                            </label>
                            <input value={user.lastName} onChange={(e)=>{
                                user.lastName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_POSITION")}
                            </label>
                            <input value={user.title} onChange={(e)=>{
                                user.title = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_EMAIL")} *
                            </label>
                            <input value={user.email} onChange={(e)=>{
                                user.email = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_PHONE_NUMBER")} *
                            </label>
                            <input value={user.phone} onChange={(e)=>{
                                user.phone = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>

                </div>

                <div className={"title"}>
                    {this.context.t("SETTINGS_TITLE_COMPANY")}
                </div>

                {user.company && <div className={"setting"}>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_NAME")} *
                            </label>
                            <input value={user.company.legalName}
                                   disabled={common.testStageMode}
                                   onChange={(e)=>{
                                user.company.legalName = e.target.value;
                                this.setState({user});
                            }} />
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_REGISTRATION_NUMBER")}
                            </label>
                            <input value={user.company.registrationNumber}
                                   onChange={(e)=>{
                                user.company.registrationNumber = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_VAT")}
                            </label>
                            <input value={user.company.vat}
                                   onChange={(e)=>{
                                user.company.vat = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="item">
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")} 1 *
                            </label>
                            <input value={user.company.address}
                                   onChange={(e)=>{
                                user.company.address = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>

                        <div className="item">
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")} 2
                            </label>
                            <input value={user.company.address2}
                                   onChange={(e)=>{
                                user.company.address2 = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_CITY")} *
                            </label>
                            <input value={user.company.city}
                                   onChange={(e)=>{
                                user.company.city = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ZIP")} *
                            </label>
                            <input value={user.company.zip}
                                   onChange={(e)=>{
                                user.company.zip = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_COUNTRY")} *
                            </label>
                            <CountrySelector
                                multi={false}
                                value={country}
                                onChange={(e)=>{
                                    user.company.country = {};
                                    if (e && e.value ) {
                                        if (!user.company.country ) user.company.country = {};
                                        user.company.country.name = e.value;
                                    }
                                    if (e === null) user.company.country = {};
                                    this.setState({user});
                                }}
                            />
                        </div>
                    </div>
                </div>}

                <div className={"title"}>
                    {this.context.t("REGISTER_LABEL_SELECT_PASSWORD")}
                </div>
                <div className={"subtitle"}>
                    {this.context.t("SETTINGS_LABEL_CHANGE_PASSWORD_2")}
                </div>
                <div className={"setting"} style={{display: 'flex'}}>
                    <div className={"password"}>

                        <label>
                            {this.context.t("SETTINGS_LABEL_TYPE_NEW_PASSWORD")}
                        </label>
                        <input type={"password"} onChange={(e)=>{
                            this.setState({
                                password : e.target.value
                            })
                        }}/>

                        <label>
                            {this.context.t("SETTINGS_LABEL_RETYPE_NEW_PASSWORD")}
                        </label>
                        <input type={"password"} onChange={(e)=>{
                            this.setState({
                                passwordCheck : e.target.value
                            })
                        }}/>

                    </div>
                    {password && <div className={"password-validation"}>
                        <div>
                            {this.validate(password).length && <img src={blueCheckIcon}/>}
                            {!this.validate(password).length&& <img src={cancelIcon}/>}
                            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_1")}
                        </div>
                        <div>
                            {this.validate(password).upper && <img src={blueCheckIcon}/>}
                            {!this.validate(password).upper&& <img src={cancelIcon}/>}
                            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_2")}
                        </div>
                        <div>
                            {this.validate(password).digit && <img src={blueCheckIcon}/>}
                            {!this.validate(password).digit&& <img src={cancelIcon}/>}
                            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_3")}
                        </div>
                        <div>
                            {this.validate(password).special && <img src={blueCheckIcon}/>}
                            {!this.validate(password).special&& <img src={cancelIcon}/>}
                            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_4")}
                        </div>
                        {passwordCheck && <div>
                            {passwordCheck === password && <img src={blueCheckIcon}/>}
                            {passwordCheck !== password && <img src={cancelIcon}/>}
                            {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_5")}
                        </div>}

                    </div>}

                </div>

                <div className="setting save-button-container">

                    <div className={"terms-confirm"}
                         style={{
                             padding: '20px 0px',
                             width: '50%',
                             margin: '0 auto'
                         }}>
                        <GeneralTerms
                            activationCode={activationCode}
                            defaultChecked={terms}
                            value={terms}
                            onChange={(e)=>{
                                this.setState({ 'terms' : e.target.checked})
                            }}/>

                        <PrivacyPolicy
                            defaultChecked={privacy}
                            value={privacy}
                            onChange={(e)=>{
                                this.setState({ 'privacy' : e.target.checked})
                            }}/>
                    </div>



                    {!updatingUser && !updated && <button onClick={this.updateInfo}
                            disabled={this.invalidPassword() || this.invalidUser() || this.invalidCompany() || !privacy || !terms}
                            className={"standard-button"}
                            style={{maxWidth: 300}}>
                        {this.context.t("REGISTER_BUTTON_SAVE")}
                    </button>}

                    {updatingUser && <Spinner/>}

                    {updated && <a
                        className={"standard-button"}
                        style={{maxWidth: 300}}
                        href="/marketplace">
                        {this.context.t("REGISTER_SUCCESS_MESSAGE")}
                    </a>}
                </div>
            </div>
        )
    }
}

Register.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return ownProps;
};

const mapDispatchToProps = dispatch => {
    return {
        contentListingInit : (content) => dispatch({
            type : 'CONTENT_INIT',
            content: content
        }),
        updateProfile : profile =>dispatch(updateProfile(profile)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)





