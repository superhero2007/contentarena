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
                <div className="spacer-bottom">
                    <div className="ca-title">
                        {company.legalName}
                    </div>
                    {company.website && (
                        <div>
                            <a href={ContentArena.Utils.getWebsiteURl(company.website)} target="_blank">{company.website}</a>
                        </div>
                    )}
                </div>
                <div className="description-info align-items-center">
                    <div className="col">
                        <div className="spacer-bottom">
                            <b>
                                {this.context.t("LISTING_DETAILS_SELLER_TITLE_ADDRESS")}
                            </b>
                        </div>

                        <div className="spacer-bottom">
                            {company.address}
                            {company.address2 && company.address2}
                        </div>

                        {(company.city || company.zip) && (
                            <div className="spacer-bottom">
                                {company.city && company.city}&nbsp;
                                {company.zip && company.zip}
                            </div>
                        )}

                        {company.country.name && <div className="spacer-bottom">{company.country.name}</div>}


                    </div>
                    <div className="col">
                        {company.registrationNumber && (
                            <div className="spacer-bottom">
                                <b>
                                    {this.context.t("LISTING_DETAILS_SELLER_TITLE_REGISTRATION_NUMBER")}
                                </b>
                                <div>
                                    {company.registrationNumber}
                                </div>
                            </div>
                        )}
                        {company.vat && (
                            <div className="spacer-bottom">
                                <b>
                                    {this.context.t("LISTING_DETAILS_SELLER_TITLE_VAT")}
                                </b>
                                <div>
                                    {company.vat}
                                </div>
                            </div>
                        )}
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