import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    addRight, clearUpdateFilter, removeRight, updateCountries, updateEvent, updateExclusive,
    updateMany, updateSport
} from "../buy/actions/filterActions";
import {test} from "../buy/actions";
import {connect} from "react-redux";

class Fetch extends Component {
    static propTypes = {
        onResponse: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired,
    };

    state = {
        data: {},
        isLoading: false,
    };

    _fetch = async () => {
        const {
            common,
            url,
            onResponse,
            data = {},
            method = 'POST',
            headers = {
                'Content-Type': 'application/json'
            }
        } = this.props;
        const res = await fetch(common.envHostUrl + url,{
            method: method, // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: headers
        });
        const json = await res.json();

        this.setState({
            isLoading: false,
        });

        onResponse(json);
    };

    componentDidMount() {
        this.setState({ isLoading: true }, this._fetch);
    }

    render() {
        return (null);
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Fetch);