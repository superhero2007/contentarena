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
import ReactTooltip from "react-tooltip";
import cn from "classnames";

const Steps = ({ steps = []}) => {

    let colors = [
        "#FFC94B",
        "#F7C349",
        "#EFBD47",
        "#E8B745",
        "#E1B143"
    ];

    return(
        <div
            className="steps"
            {...this.props} >
            {steps.map((step, i) => (<div style={{backgroundColor: (step) ? colors[i] : ""}} key={i} className="step" />))}


        </div>
)};

const BackButton = ({onClick}, context) => (
    <button
        onClick={onClick}
        className="standard-button back">
        <i className="fa fa-chevron-left" /> {context.t("SETTINGS_BUTTON_BACK")}
    </button>
);

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingUser : false,
            editCompanyInfo : false,
            user : {},
            step: "welcome"
        };
    }

    componentDidMount () {
        this.setState({loading:true});

        const { history, match } = this.props;

        let activationCode = match.params.activationCode;
        let step = match.params.step;
        let sessionUser = this.getUserObj();

        //Redirect to welcome step if none
        if (!step) {
            history.push( "/register/" + activationCode + "/welcome" );
            return;
        }

        if ( (step === "welcome" && !sessionUser) || sessionUser.activationCode !== activationCode ){
            ContentArena.ContentApi.getUserInfoByActivationCode(activationCode).done(user=>{
                if (user) {
                    user.activationCode = activationCode;
                    if (!user.company) {
                        user.company = {country:{}};
                    }

                    if(user.preferredProfile === undefined){
                        user.preferredProfile = "BOTH"
                    }
                }
                this.storeUserObj(user);
                this.setState({
                    loading:false,
                    user : user,
                    step : step
                });
            });
        } else {
            this.setState({
                loading:false,
                user: sessionUser,
                step : step
            });
        }
    }

    /**
     * Saves user object in session storage. Object must be converted to string
     * @param user
     */
    storeUserObj = (user) => {
        sessionStorage.setItem('registering_user', JSON.stringify(user));
    };

    /**
     * Gets user object from session storage
     * @returns {*}
     */
    getUserObj = () => {

        let user = sessionStorage.getItem('registering_user');
        if (!user) return user;
        return JSON.parse(user);
    };

    updateInfo = () => {

        const {user, password} = this.state;
        this.setState({updatingUser:true});
        ContentArena.ContentApi.activateUser(user, password).done(()=>{
            sessionStorage.setItem('registering_user', null);
            this.setState({updated:true, updatingUser:false});
            location.href = '/marketplace';
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
            user.phone === undefined ||
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
        this.storeUserObj(user);
        this.setState({user});

    };

    updateCompany = (prop, value) => {
        let user  = this.state.user;
        user.company[prop] = value;
        this.storeUserObj(user);
        this.setState({user});

    };

    handleSellerSports = ( selection) => {
        let user  = this.state.user;
        user.preferredSellerSports = selection.sports;
        user.preferredSellerAllSports = selection.all;
        user.preferredSellerOtherSport = selection.other;
        this.storeUserObj(user);
        this.setState({user});
    };

    handleBuyerSports = ( selection) => {
        let user  = this.state.user;
        user.preferredBuyerSports = selection.sports;
        user.preferredBuyerAllSports = selection.all;
        user.preferredBuyerOtherSport = selection.other;
        this.storeUserObj(user);
        this.setState({user});
    };

    completeButtonDisabled = () => {
        const { user } = this.state;
        return (user.preferredProfile !== "SELLER"
            && ( (!user.preferredBuyerOtherSport &&!user.preferredBuyerAllSports && user.preferredBuyerSports.length === 0)
                || user.preferredBuyerCountries.length === 0 ) )
        || (user.preferredProfile !== "BUYER"
                && ( !user.preferredSellerOtherSport && !user.preferredSellerAllSports && user.preferredSellerSports.length === 0) )
    };

    goToNextStep = ( step ) => {
        const {history, match} = this.props;
        let activationCode = match.params.activationCode;
        history.push( "/register/" + activationCode + "/" + step );
    };

    render () {

        const {match, location, common} = this.props;
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


        if ( step === "welcome" ) return <div className="settings-container settings-container-welcome">

            <div className={"big-title"}>
                {this.context.t("SETTINGS_WELCOME")}
            </div>
            <div className="title">
                {this.context.t("SETTINGS_WELCOME_TEXT")}
            </div>

            <div className={"setting"}>
                <Steps steps={[1,0,0,0,0]}/>
                <PreferredUserProfile profile={user.preferredProfile}
                                      style={{
                                          border: '1px solid lightgray',
                                          padding: '30px 20px'
                                      }}
                                      onChange={ profile => this.updateUser("preferredProfile", profile) }/>
            </div>
            <div className={"buttons"}>
                <button
                    onClick={() => {
                        this.goToNextStep("questionnaire")
                    }}
                    disabled={ updatingUser }
                    className={"standard-button"}>
                    {this.context.t("SETTINGS_BUTTON_CONTINUE")}
                </button>
            </div>

        </div>;

        if ( step === "questionnaire" ) return <div className="settings-container settings-container-welcome">

            <div className={"setting"} style={{margin : '60px auto 0'}}>
                <Steps steps={[1,1,0,0,0]}/>
                {user.preferredProfile !== "BUYER" &&
                <PreferredSportSeller sports={user.preferredSellerSports}
                                      style={{
                                          border: '1px solid lightgray',
                                          padding: '30px 20px'
                                      }}
                                      other={user.preferredSellerOtherSport}
                                      all={user.preferredSellerAllSports}
                                      onChange={this.handleSellerSports}/>}

                {user.preferredProfile !== "SELLER" &&
                <PreferredTerritoriesBuyer territories={user.preferredBuyerCountries}
                                           style={{
                                               border: '1px solid lightgray',
                                               padding: '30px 20px'
                                           }}
                                           onChange={ territories => this.updateUser("preferredBuyerCountries", territories) }/>}

                {user.preferredProfile !== "SELLER" &&
                <PreferredSportBuyer sports={user.preferredBuyerSports}
                                     all={user.preferredBuyerAllSports}
                                     other={user.preferredBuyerOtherSport}
                                     style={{
                                         border: '1px solid lightgray',
                                         padding: '30px 20px'
                                     }}
                                     onChange={this.handleBuyerSports}/>}

            </div>
            <div className={"buttons"}>
                <BackButton onClick={() => { this.goToNextStep("welcome") }}/>
                <button
                    onClick={() => {
                        this.goToNextStep("personal")
                    }}
                    disabled={ this.completeButtonDisabled() }
                    className={"standard-button"}>
                    {this.context.t("SETTINGS_BUTTON_CONTINUE")}
                </button>
            </div>
        </div>;

        if ( step === "personal" ) return <div className="settings-container settings-container-welcome">

            <div className={"setting"} style={{margin : '60px auto 0'}}>
                <Steps steps={[1,1,1,0,0]}/>
                <div className={"title"}>
                    {this.context.t("SETTINGS_LABEL_USER_TITLE_INFO")}
                </div>
                <div className={"row"}>
                    <div className={"item"}>
                        <label>
                            {this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")} *
                        </label>
                        <input value={user.firstName} onChange={(e)=>{
                            this.updateUser("firstName", e.target.value)
                        }}/>
                    </div>
                    <div className={"item"}>
                        <label>
                            {this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")} *
                        </label>
                        <input value={user.lastName} onChange={(e)=>{
                            this.updateUser("lastName", e.target.value)
                        }}/>
                    </div>
                    <div className={"item"}>
                        <label>
                            {this.context.t("SETTINGS_LABEL_COMPANY_POSITION")}
                        </label>
                        <input value={user.title} onChange={(e)=>{
                            this.updateUser("title", e.target.value)
                        }}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"item"}>
                        <label>
                            {this.context.t("SETTINGS_LABEL_USER_EMAIL")} *
                        </label>
                        <input value={user.email} onChange={(e)=>{
                            this.updateUser("email", e.target.value)
                        }}/>
                    </div>
                    <div className={"item"}>
                        <label>
                            {this.context.t("SETTINGS_LABEL_USER_PHONE_NUMBER")} *
                        </label>
                        <input value={user.phone} onChange={(e)=>{
                            this.updateUser("phone", e.target.value)
                        }}/>
                    </div>
                </div>
            </div>
            <div className={"buttons"}>
                <BackButton onClick={() => { this.goToNextStep("questionnaire") }}/>
                <button
                    onClick={() => {
                        this.goToNextStep("company")
                    }}
                    disabled={ this.invalidUser() }
                    className={"standard-button"}>
                    {this.context.t("SETTINGS_BUTTON_CONTINUE")}
                </button>
            </div>
        </div>;

        if ( step === "company" ) return <div className="settings-container settings-container-welcome">

            <div className={"setting"} style={{margin : '60px auto 0'}}>
                <Steps steps={[1,1,1,1,0]}/>
                {user.company && <React.Fragment>
                    <div className={"title"} style={{marginTop: 20}}>
                        {this.context.t("SETTINGS_TITLE_COMPANY")}
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_NAME")} *
                            </label>
                            <input value={user.company.legalName}
                                   disabled={common.testStageMode}
                                   onChange={(e)=>{
                                       this.updateCompany("legalName", e.target.value);
                                   }} />
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_REGISTRATION_NUMBER")}
                            </label>
                            <input value={user.company.registrationNumber}
                                   onChange={(e)=>{
                                       this.updateCompany("registrationNumber", e.target.value);
                                   }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_VAT")}
                            </label>
                            <input value={user.company.vat}
                                   onChange={(e)=>{
                                       this.updateCompany("vat", e.target.value);
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
                                       this.updateCompany("address", e.target.value);
                                   }}/>
                        </div>

                        <div className="item">
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")} 2
                            </label>
                            <input value={user.company.address2}
                                   onChange={(e)=>{
                                       this.updateCompany("address2", e.target.value);
                                   }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_CITY")} *
                            </label>
                            <input value={user.company.city}
                                   onChange={(e)=>{
                                       this.updateCompany("city", e.target.value);
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
                                       this.updateCompany("zip", e.target.value);
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
                                    let country = {};
                                    if (e && e.value ) {
                                        if (!user.company.country ) user.company.country = {};
                                        country.name = e.value;
                                    }
                                    if (e === null) country = {};
                                    this.updateCompany("country", country);
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>}
            </div>
            <div className={"buttons"}>
                <BackButton onClick={() => { this.goToNextStep("personal") }}/>
                <button
                    onClick={() => {
                        this.goToNextStep("password")
                    }}
                    disabled={ this.invalidCompany()}
                    className={"standard-button"}>
                    {this.context.t("SETTINGS_BUTTON_CONTINUE")}
                </button>
            </div>
        </div>;

        return (
            <div className={"settings-container settings-container-welcome"}>

                <div className={"setting"} style={{margin : '60px auto 0'}}>

                    <Steps steps={[1,1,1,1,1]}/>
                    <div className="setting-password">
                        <div className={"title"} style={{marginTop: 20}}>
                            {this.context.t("REGISTER_LABEL_SELECT_PASSWORD")}
                        </div>
                        <div className={"subtitle"}>
                            {this.context.t("SETTINGS_LABEL_CHANGE_PASSWORD_2")}
                        </div>
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

                <div className="setting" style={{margin : '20px auto 0'}}>
                    <div className={"terms-confirm"}
                         style={{
                             padding: '20px 0px',
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

                </div>

                <div className="buttons">
                    <BackButton onClick={() => { this.goToNextStep("company") }}/>

                    {!updatingUser && !updated &&
                    <button onClick={this.updateInfo}
                            disabled={this.invalidPassword() || !privacy || !terms}
                            className={"standard-button"}
                            style={{maxWidth: 300, lineHeight: "22px"}}>
                        {this.context.t("REGISTER_SUCCESS_MESSAGE")}
                    </button>}

                    {updatingUser && <Spinner/>}
                </div>
            </div>
        )
    }
}

Register.contextTypes = {
    t: PropTypes.func.isRequired
};

BackButton.contextTypes = {
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





