import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {PropTypes} from "prop-types";

const rowStyle = {
    borderBottom: '1px solid #EEF3F6',
    borderRight: '1px solid #EEF3F6',
    display: 'flex'
};

const titleStyle = {
    backgroundColor: '#F4F6F9',
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

const valueStyle = {
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

class Seller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { company } = this.props;
        return (
            <div style={{ padding:'20px 0'}}>
                <div style={{marginBottom: 20}}>
                    <div style={{
                        color: '#1A4B63',
                        fontSize: 20,
                        fontWeight: 600
                    }}>
                        {company.displayName}
                    </div>
                    {company.website && <div style={{
                        color: '#4F4F4F',
                        fontSize: 14,
                    }}>
                        {company.website}
                    </div>}

                </div>
                <div className="full-item-box" style={{width: '75%'}}>
                    <label>{company.displayName}
                        {this.context.t("DETAILS")}
                    </label>
                    <div >
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                {this.context.t("Legal name")}
                            </div>
                            <div style={valueStyle}>
                                {company.legalName}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                {this.context.t("Street Name / Number")}
                            </div>
                            <div style={valueStyle}>
                                {company.address}
                            </div>
                        </div>

                        {company.city &&
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("City")}
                                </div>
                                <div style={valueStyle}>
                                    {company.city}
                                </div>
                            </div>
                        }

                        {company.country.name &&
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("Country")}
                                </div>
                                <div style={valueStyle}>
                                    {company.country.name}
                                </div>
                            </div>
                        }

                        {company.zip &&
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("ZIP")}
                                </div>
                                <div style={valueStyle}>
                                    {company.zip}
                                </div>
                            </div>
                        }

                        {company.registrationNumber &&
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("Company registration number")}
                                </div>
                                <div style={valueStyle}>
                                    {company.registrationNumber}
                                </div>
                            </div>
                        }

                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                {this.context.t("VAT ID number")}
                            </div>
                            <div style={valueStyle}>
                                {company.vat}
                            </div>
                        </div>
                    </div>
                </div>

                {company.description &&
                    <div className="full-item-box">
                        <label>
                            {this.context.t("DESCRIPTION")}
                        </label>
                        <div className="full-item-content">
                            {company.description}
                        </div>
                    </div>
                }

            </div>
        );
    }
}

Seller.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Seller)