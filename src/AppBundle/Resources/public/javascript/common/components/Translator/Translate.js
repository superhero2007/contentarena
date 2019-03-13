import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import Portal from "@portal";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../Loader";

const inputStyle = {
	margin: "0 0 10px",
};

const editTranslationStyle = {
	position: "relative",
	cursor: "pointer",
};

const fixedFormStyle = {
	position: "fixed",
	width: 300,
	minHeight: 100,
	display: "flex",
	zIndex: 10000,
	top: "50%",
	left: "50%",
	padding: 10,
	backgroundColor: "#ccc",
	flexDirection: "column",
};

class Translate extends Component {
	constructor(props) {
		super(props);

		const { editTranslation } = props.common;

		this.state = {
			isOpen: false,
			isEditEnabled: editTranslation,
			saving: false,
			value: "",
			newValue: "",
		};
	}

	componentDidMount() {
		const {
			i18nKey,
		} = this.props;

		this.setState({
			value: this.context.t(i18nKey),
		});
	}

	openEdit = (e) => {
		const {
			value,
		} = this.state;
		e.stopPropagation();
		this.setState({ isOpen: true, newValue: value });
		e.preventDefault();
	};

	closeEdit = (e) => {
		e.stopPropagation();
		this.setState({ isOpen: false, success: false });
	};

	handleInput = (e) => {
		this.setState({ newValue: e.target.value });
	};

	saveTranslation = (e) => {
		const {
			newValue,
		} = this.state;
		const {
			i18nKey,
		} = this.props;

		e.stopPropagation();
		this.setState({ saving: true, error: false });

		axios.post("/translations/update", {
			i18nKey,
			value: newValue,
			languageCode: "en",
		}).then((response) => {
			// handle success
			this.setState({ value: newValue, success: true });
		})
			.catch((response) => {
			// handle error
				this.setState({ error: true });
			})
			.finally(() => {
			// always executed
				this.setState({ saving: false });
			});

		this.forceUpdate();
	};

	render() {
		const {
			isOpen,
			isEditEnabled,
			value,
			newValue,
			saving,
			error,
			success,
		} = this.state;

		const {
			i18nKey,
		} = this.props;

		if (!isEditEnabled) {
			return (
				<>
					{value}
				</>
			);
		}

		const rnd = Math.random();

		return (
			<>
				<span style={editTranslationStyle} data-tip data-for={`${rnd}-${i18nKey}`}>
					{value}
				</span>
				{
					isOpen
					&& (
						<Portal>
							<div
								style={fixedFormStyle}
								onClick={e => e.stopPropagation()}
							>
								{"KEY: "}{i18nKey}
								{
									!success && !saving
								&& <input value={newValue} onChange={this.handleInput} style={inputStyle} />
								}

								{
									saving
								&& <Loader xSmall loading />
								}
								{
									error
								&& (
									<span>
									Something failed, please try again.
									</span>
								)
								}
								{
									success
								&& (
									<button onClick={this.closeEdit}>
									Ok
									</button>
								)
								}
								{
									!saving && !success
								&& (
									<button onClick={this.saveTranslation} disabled={newValue === ""}>
									Save
									</button>
								)
								}
								{
									!saving && !success
								&& (
									<button onClick={this.closeEdit}>
									Cancel
									</button>
								)
								}

							</div>
						</Portal>
					)
				}
				<ReactTooltip
					id={`${rnd}-${i18nKey}`}
					effect="solid"
					className="TranslationTooltip "
					delayHide={200}
					eventOff="click"
					isCapture
				>
					<div className="body" onClick={e => e.stopPropagation()}>
						<span onClick={this.openEdit} style={{ cursor: "pointer" }}>
							Edit translation
						</span>
					</div>
				</ReactTooltip>
			</>
		);
	}
}

Translate.contextTypes = {
	t: PropTypes.func.isRequired,
};

Translate.propTypes = {
	i18nKey: PropTypes.string.isRequired,
};

Translate.defaultProps = {};

const mapStateToProps = state => ({
	common: state.common,
});

export default connect(
	mapStateToProps,
	null,
)(Translate);
