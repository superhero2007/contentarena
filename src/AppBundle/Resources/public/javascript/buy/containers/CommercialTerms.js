import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import SalesPackages from "./SalesPackages";

class CommercialTerms extends React.Component {

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
                <SalesPackages
                    countries={this.props.countries}
                    territories={this.props.territories}
                    salesPackages={this.props.content.salesPackages}/>

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
)(CommercialTerms)