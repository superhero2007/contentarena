import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	addRight, clearUpdateFilter, removeRight, updateCountries, updateEvent, updateExclusive,
	updateMany, updateSport,
} from "../buy/actions/filterActions";
import { test } from "../buy/actions";

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
			method = "POST",
			headers = {
				"Content-Type": "application/json",
			},
		} = this.props;
		const res = await fetch(common.envHostUrl + url, {
			method, // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers,
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Fetch);
