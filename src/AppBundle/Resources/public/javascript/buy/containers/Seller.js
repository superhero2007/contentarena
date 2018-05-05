import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

class Seller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        return (
            <div>
                <div></div>
                <div>
                    {this.props.content.company.displayName}
                </div>
                <h4>Company details</h4>

                <h5>Legal company name</h5>
                <p>{this.props.content.company.legalName}</p>

                <h5>Website Url</h5>
                <p>{this.props.content.company.website}</p>

                <h5>Company Registration Number</h5>
                <p>{this.props.content.company.registrationNumber}</p>

                <h5>VAT ID number</h5>
                <p>{this.props.content.company.vat}</p>

                <h5>Address</h5>
                <p>{this.props.content.company.address}</p>

                <h5>Phone</h5>
                <p>{this.props.content.company.phone}</p>

                <h5>ZIP</h5>
                <p>{this.props.content.company.zip}</p>

                <h5>Country</h5>
                <p>{this.props.content.company.country.name}</p>

                <h4>Company information</h4>

            </div>
        );
    }
}

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