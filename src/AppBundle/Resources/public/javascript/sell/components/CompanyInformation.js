import React from 'react';
import {connect} from "react-redux";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import CountrySelector from "../../main/components/CountrySelector";
import {companyIsValid} from "../actions/validationActions";
import {PropTypes} from "prop-types";

const labelStyle = { height: "30px", fontSize: "12px", width: '400px'};
const inputStyle = { width: '380px', margin: 0, height: "30px"};

class CompanyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            company : props.company
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({company : nextProps.company});
    }

    closeModal = () => {
        this.setState({
            isOpen: false,
            company: this.props.company
        });
    };

    updateCompanyContent = (e, name) => {
        const company = {...this.state.company};

        company[name] = e.target.value;
        this.onDataChange("company", company)
    };

    updateCountry = (value) => {
        const company = {...this.state.company};

        company.country.name = value.label;
        this.onDataChange("company", company)
    };

    renderModal = () => {
        const { company } = this.state;

        return <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="modal-title">
                {this.context.t("Company Information")}
                <i className="fa fa-times-circle-o close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content custom">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("Legal name")}
                        </label>
                        <input
                            type={"text"}
                            style={inputStyle}
                            onChange={(e) => { this.updateCompanyContent(e, "legalName")}}
                            value={company.legalName}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("Registration number")}
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateCompanyContent(e, "registrationNumber")}}
                            value={company.registrationNumber}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("VAT ID number")}
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateCompanyContent(e, "vat")}}
                            value={company.vat}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("Street Name / Number")}
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateCompanyContent(e, "address")}}
                            defaultValue={company.address}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("City")}
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateCompanyContent(e, "city")}}
                            value={company.city}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("ZIP code")}
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateCompanyContent(e, "zip")}}
                            value={company.zip}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("Country")}
                        </label>
                        <CountrySelector
                            multi={false}
                            onChange={(val) => { this.updateCompanyContent(val)}}
                            value={{value: company.country.name, label: company.country.name}}/>
                    </div>


                </div>
            </div>

            <div className={"buttons"}>
                { companyIsValid(company) &&<button
                    className={"standard-button"}
                    onClick={this.onOKClick}>
                    {this.context.t("Ok")}
                </button>}

                { !companyIsValid(company) &&<button
                    className={"standard-button"}
                    disabled
                    >
                    {this.context.t("Ok")}
                </button>}
            </div>
        </Modal>
    };

    render(){
        const { company } = this.props;
        return (
            <div className="base-input">
                { this.renderModal() }
                <label>
                    {this.context.t("Company address")}
                </label>
                <input
                    type="text"
                    value={company.legalName + ", " + company.address}
                    onClick={()=>{this.setState({isOpen:true})}}
                    placeholder=""/>
                <i className="fa fa-edit" onClick={()=>{this.setState({isOpen:true})}}/>
            </div>
        )
    }

    onOKClick = () => {
        const { updateContentValue, counter } = this.props;
        const { company } = this.state;

        updateContentValue("company", company);
        updateContentValue("counter", counter + 1);

        this.closeModal();
    };

    onDataChange(name, value) {
        this.setState({
            [name]: value
        });
    }
}

CompanyInformation.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyInformation)