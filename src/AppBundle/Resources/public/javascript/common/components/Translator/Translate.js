import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { connect } from "react-redux";
import { setTranslations } from "redux-i18n";
import Loader from "../Loader";
import Portal from "../Portal/Portal";

const inputStyle = {
	margin: "0 0 10px",
};

const editTranslationStyle = {
	position: "relative",
	cursor: "pointer",
	// width: "100%",
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
			flatValue: "",
			newValue: "",
		};
	}

	getChildContext() {
		const {
			value,
		} = this.state;

		return {
			translation: value,
		};
	}

	componentDidMount() {
		const {
			i18nKey,
			params,
		} = this.props;

		this.setState({
			flatValue: this.context.t(i18nKey),
			value: this.context.t(i18nKey, params),
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params) {
			this.setState({
				flatValue: this.context.t(nextProps.i18nKey),
				value: this.context.t(nextProps.i18nKey, nextProps.params),
			});
		}
	}

	openEdit = (e) => {
		const {
			value,
			flatValue,
		} = this.state;
		e.stopPropagation();
		this.setState({ isOpen: true, newValue: flatValue });
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
			params,
		} = this.props;

		e.stopPropagation();
		this.setState({ saving: true, error: false });

		axios.post("/translations/update", {
			i18nKey,
			value: newValue,
			languageCode: "en",
		}).then((response) => {
			// handle success
			this.setState({ value: this.context.t(newValue, params), flatValue: newValue, success: true });
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
			children,
			style,
		} = this.props;

		if (!isEditEnabled && !children) {
			return (
				<>
					{value}
				</>
			);
		}

		if (!isEditEnabled && children) {
			return (
				<>
					{children}
				</>
			);
		}

		const rnd = Math.random();

		return (
			<>
				{!children && (
					<section style={{ ...editTranslationStyle, ...style }} data-tip data-for={`${rnd}-${i18nKey}`}>
						{value}
					</section>
				)}
				{children && (
					<section style={editTranslationStyle} data-tip data-for={`${rnd}-${i18nKey}`}>
						{children}
					</section>
				)}

				{isOpen && (
					<Portal>
						<div
							style={fixedFormStyle}
							onClick={e => e.stopPropagation()}
						>
							{"KEY: "}{i18nKey}
							{!success && !saving && (
								<input value={newValue} onChange={this.handleInput} style={inputStyle} />
							)}

							{saving && (
								<Loader xSmall loading />
							)}

							{error && (
								<span>
									Something failed, please try again.
								</span>
							)}

							{success && (
								<button onClick={this.closeEdit}>
									Ok
								</button>
							)}

							{!saving && !success && (
								<button onClick={this.saveTranslation} disabled={newValue === ""}>
									Save
								</button>
							)}

							{!saving && !success && (
								<button onClick={this.closeEdit}>
									Cancel
								</button>
							)}
						</div>
					</Portal>
				)}

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

Translate.childContextTypes = {
	translation: PropTypes.string,
};

Translate.propTypes = {
	i18nKey: PropTypes.string.isRequired,
};

Translate.defaultProps = {};

const mapStateToProps = state => ({
	common: state.common,
});

const mapDispatchToProps = dispatch => ({
	setTranslations: translations => dispatch(setTranslations(translations)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Translate);
