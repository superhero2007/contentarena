import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {PropTypes} from "prop-types";

class Seller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { company } = this.props;
        return (
            <div>
                <div>
                    <div className="ca-title">
                        {company.legalName}
                    </div>
                    {company.website && (
                        <div>
                            <a href={company.website} target="_blank">{company.website}</a>
                        </div>
                    )}
                </div>
                <div className="description-info d-flex">
                    <div className="col">
                        <div>
                            <b>
                                {this.context.t("LISTING_DETAILS_SELLER_TITLE_ADDRESS")}
                            </b>
                        </div>

                        <div>{company.address}</div>
                        {company.country.name && <div>{company.country.name}</div>}
                        {company.city && <div>{company.city}</div>}
                        {company.zip && <div>{company.zip}</div>}

                    </div>
                    <div className="col">
                        {company.registrationNumber && (
                            <div>
                                <div>
                                    <b>
                                        {this.context.t("LISTING_DETAILS_SELLER_TITLE_REGISTRATION_NUMBER")}
                                    </b>
                                </div>

                                <div>
                                    {company.registrationNumber}
                                </div>
                            </div>
                        )}
                        <div>
                            <div>
                                <b>
                                    {this.context.t("LISTING_DETAILS_SELLER_TITLE_VAT")}
                                </b>
                            </div>
                            <div>
                                {company.vat}
                            </div>
                        </div>
                    </div>
                </div>
                {company.description && <div className="txt">{company.description}</div>}
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