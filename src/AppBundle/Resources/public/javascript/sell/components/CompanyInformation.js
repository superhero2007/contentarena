import React from 'react';
import {connect} from "react-redux";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import CountrySelector from "../../main/components/CountrySelector";
import {companyIsValid} from "../actions/validationActions";

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
        this.setState({ isOpen: false});
    };

    updateContent = (e, name) => {
        const { company } = this.state;
        const { counter } = this.props;

        company[name] = e.target.value;

        this.props.updateContentValue("company", company);
        this.props.updateContentValue("counter", counter + 1);
    };

    updateCountry = (value) => {
        const { company } = this.state;
        const { counter } = this.props;

        company.country.name = value.label;

        this.props.updateContentValue("company", company);
        this.props.updateContentValue("counter", counter + 1);
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
                Company Information
                <i className="fa fa-times-circle-o" onClick={this.closeModal}/>
            </div>

            <div className="step-content custom">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Legal name
                        </label>
                        <input
                            type={"text"}
                            style={inputStyle}
                            value={company.legalName}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Registration number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateContent(e, "registrationNumber")}}
                            value={company.registrationNumber}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            VAT ID number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateContent(e, "vat")}}
                            value={company.vat}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Street Name / Number
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateContent(e, "address")}}
                            value={company.address}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            City
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateContent(e, "city")}}
                            value={company.city}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            ZIP code
                        </label>
                        <input
                            style={inputStyle}
                            type={"text"}
                            onChange={(e) => { this.updateContent(e, "zip")}}
                            value={company.zip}/>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            Country
                        </label>
                        <CountrySelector
                            multi={false}
                            onChange={(val) => { this.updateCountry(val)}}
                            value={{value: company.country.name, label: company.country.name}}/>
                    </div>


                </div>
            </div>

            <div className={"buttons"}>
                { companyIsValid(company) &&<button
                    className={"standard-button"}
                    onClick={this.closeModal}>Ok</button>}

                { !companyIsValid(company) &&<button
                    className={"standard-button"}
                    disabled
                    >Ok</button>}
            </div>
        </Modal>
    };

    render(){
        const { company } = this.props;
        return (
            <div className="base-input">
                { this.renderModal() }
                <label>Company address</label>
                <input
                    type="text"
                    value={company.legalName + ", " + company.address}
                    onClick={()=>{this.setState({isOpen:true})}}
                    placeholder=""/>
            </div>
        )
    }
}

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