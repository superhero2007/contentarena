import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import {getCurrencySymbol, getFullName, goTo, limitText} from "../../main/actions/utils";
import CountrySelector from '../../main/components/CountrySelector'
import Moment from "moment/moment";
import {blueCheckIcon, cancelIcon, editIcon, Spinner} from "../../main/components/Icons";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingCompany : false,
            updatingUser : false,
            updatingPassword : false,
            loadingCompanyUsers : false,
            editPersonalInfo: false,
            editCompanyInfo : false,
            companyUsers : [],
            user : {}
        };
    }

    componentDidMount () {
        this.setState({loading:true, loadingCompanyUsers: true});

        ContentArena.ContentApi.getUserInfo().done(user=>{
            this.setState({loading:false, user : user});
        });

        ContentArena.ContentApi.getCompanyUsers().done(companyUsers=>{
            this.setState({loadingCompanyUsers:false, companyUsers : companyUsers});
        });
    }

    updateCompany = () => {
        this.setState({updatingCompany:true, editCompanyInfo: false});
        ContentArena.ContentApi.updateCompany(this.state.user.company).done(()=>{
            this.setState({updatingCompany:false});
        })
    };

    updateUser = () => {
        this.setState({updatingUser:true, editPersonalInfo: false});
        ContentArena.ContentApi.updateUser(this.state.user).done(()=>{
            this.setState({updatingUser:false});
        })
    };

    updatePassword = () => {
        this.setState({updatingPassword:true});
        ContentArena.ContentApi.updatePassword({
            id : this.state.user.id,
            password : this.state.password
        }).done(()=>{
            this.setState({
                updatingPassword:false,
                password :null,
                passwordCheck : null,
                passwordUpdated : true
            });
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
        const { oldPassword, password, passwordCheck } = this.state;

        if (!oldPassword || !password ||  !passwordCheck ) return true;

        let valid = this.validate(password);

        return  password !== passwordCheck ||
                !valid.length ||
                !valid.digit ||
                !valid.upper ||
                !valid.special;


    };

    render () {

        const { loading, editPersonalInfo, editCompanyInfo, loadingCompanyUsers, companyUsers,
            updatingCompany, updatingUser, updatingPassword, password, passwordCheck, passwordUpdated } = this.state;
        let user = this.state.user;

        let country = (user && user.company && user.company.country) ? {label: user.company.country.name, value: user.company.country.name} : null;

        return (
            <div className={"settings-container"}>
                <div className={"title"}>
                    Company information {!editCompanyInfo && !updatingCompany &&
                    <div className={"edit-button"} onClick={e=>{this.setState({editCompanyInfo : true})}}>
                        <img src={editIcon}/> Edit
                    </div>}
                    {editCompanyInfo && !updatingCompany && <div className={"edit-button"} onClick={this.updateCompany}>
                        <img src={editIcon}/> Save
                    </div>}
                    {updatingCompany && <Spinner/>}
                </div>

                {user.company && <div className={"setting"}>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                Legal Company Name
                            </label>
                            <input value={user.company.legalName} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.legalName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                Company Registration Number
                            </label>
                            <input value={user.company.registrationNumber} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.registrationNumber = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                VAT ID number
                            </label>
                            <input value={user.company.vat} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.vat = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                Address
                            </label>
                            <input value={user.company.address} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.address = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                City
                            </label>
                            <input value={user.company.city} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.city = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                ZIP code
                            </label>
                            <input value={user.company.zip} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.zip = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                Country
                            </label>
                            <CountrySelector multi={false} value={country} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.country.name = e.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div>
                        <label>Company description</label>
                        <textarea value={user.company.description} disabled={!editCompanyInfo} onChange={(e)=>{
                            user.company.description = e.target.value;
                            this.setState({user});
                        }}/>
                    </div>

                    {/*ACTIVE USERS*/}
                    <div style={{margin: '20px 0'}}>
                        <label>Active Users</label>
                        {loadingCompanyUsers && companyUsers.length === 0 && <Spinner/>}
                        {!loadingCompanyUsers && companyUsers.length > 0 && <div>
                            <ReactTable
                                className={"closed-deals-table"}
                                defaultPageSize={30}
                                showPageSizeOptions={false}
                                showPagination={false}
                                minRows={0}
                                resizable={false}
                                data={companyUsers}
                                columns={[{
                                    Header: 'Familiy Name',
                                    headerClassName : 'table-header',
                                    className : 'table-header',
                                    accessor: 'lastName',
                                }, {
                                    accessor: 'firstName', // Required because our accessor is not a string
                                    Header: 'First Name',
                                    headerClassName : 'table-header',
                                    className : 'table-header',
                                }, {
                                    Header: 'Email',
                                    accessor: 'email',
                                    headerClassName : 'table-header',
                                    className : 'table-header',
                                },{
                                    Header: 'Phone Number',
                                    accessor: 'phone',
                                    headerClassName : 'table-header',
                                    className : 'table-header',
                                },{
                                    Header: 'Company Position',
                                    accessor: 'title',
                                    headerClassName : 'table-header',
                                    className : 'table-header',
                                }

                                ]}
                            />
                        </div>}
                    </div>
                </div>}
                <div className={"title"}>
                    Personal information {!editPersonalInfo && !updatingUser &&
                    <div className={"edit-button"} onClick={e=>{this.setState({editPersonalInfo : true})}}>
                        <img src={editIcon}/> Edit
                    </div>}
                    {editPersonalInfo && !updatingUser && <div className={"edit-button"} onClick={this.updateUser}>
                        <img src={editIcon}/> Save
                    </div>}
                    {updatingUser && <Spinner/>}
                </div>
                <div className={"setting"}>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                First Name
                            </label>
                            <input value={user.firstName} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.firstName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                Last Name
                            </label>
                            <input value={user.lastName} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.lastName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                Title
                            </label>
                            <input value={user.title} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.title = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                Email address
                            </label>
                            <input value={user.email} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.email = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                Phone number
                            </label>
                            <input value={user.phone} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.phone = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>

                </div>


                <div className={"title"}>
                    Change Password
                </div>
                <div className={"subtitle"}>
                     Choose a unique password to protect your account
                </div>
                <div className={"setting"} style={{display: 'flex'}}>
                    <div className={"password"}>
                        <label>Type your current password</label>
                        <input type={"password"} onChange={(e)=>{
                            this.setState({
                                oldPassword : e.target.value
                            })
                        }}/>

                        <label>Type your new password</label>
                        <input type={"password"} onChange={(e)=>{
                            this.setState({
                                password : e.target.value
                            })
                        }}/>

                        <label>Retype your new password</label>
                        <input type={"password"} onChange={(e)=>{
                            this.setState({
                                passwordCheck : e.target.value
                            })
                        }}/>

                        {!updatingPassword && !passwordUpdated &&
                        <button onClick={this.updatePassword}
                                disabled={this.invalidPassword()}
                                className={"standard-button"}>Save password</button>}
                        {updatingPassword && <Spinner/>}
                        {passwordUpdated && <div>
                            Password updated successfully
                        </div>}
                    </div>
                    {password && <div className={"password-validation"}>
                        <div>
                            {this.validate(password).length && <img src={blueCheckIcon}/>}
                            {!this.validate(password).length&& <img src={cancelIcon}/>}
                            At least 8 characters long
                        </div>
                        <div>
                            {this.validate(password).upper && <img src={blueCheckIcon}/>}
                            {!this.validate(password).upper&& <img src={cancelIcon}/>}
                            One uppercase character
                        </div>
                        <div>
                            {this.validate(password).digit && <img src={blueCheckIcon}/>}
                            {!this.validate(password).digit&& <img src={cancelIcon}/>}
                            One number
                        </div>
                        <div>
                            {this.validate(password).special && <img src={blueCheckIcon}/>}
                            {!this.validate(password).special&& <img src={cancelIcon}/>}
                            One special character
                        </div>
                        {passwordCheck && <div>
                            {passwordCheck === password && <img src={blueCheckIcon}/>}
                            {passwordCheck !== password && <img src={cancelIcon}/>}
                            Passwords don't match
                        </div>}
                    </div>}

                </div>
            </div>
        )
    }
}

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
)(Settings)