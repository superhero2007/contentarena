import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isTablet, isMobileOnly } from "react-device-detect";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { updateProfile } from "../actions/userActions";
import PasswordValidationBox from "../components/PasswordValidationBox";
import Loader from "../../common/components/Loader";
import { initGA, TrackingEvent } from "../../common/components/Tracking";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			updatingUser: false,
			user: {},
			password: "",
			passwordCheck: "",
			isPassValid: false,
		};

		const { activationCode } = this.props.match.params;
		if (!activationCode) this.props.history.push("/landing");
	}

	storeUserObj = (user) => {
		sessionStorage.setItem("registering_user", JSON.stringify(user));
	};

	getUserObj = () => {
		const user = sessionStorage.getItem("registering_user");
		if (!user) return user;
		return JSON.parse(user);
	};

	getUserInfoByActivateKey = async (code) => {
		try {
			const user = await ContentArena.ContentApi.getUserInfoByActivationCode(code);

			if (!user) {
				this.props.history.push("/login");
			}

			user.activationCode = code;
			if (!user.company) user.company = { country: {} };
			if (user.preferredProfile === undefined) user.preferredProfile = "BOTH";
			if (!user.fullName) user.fullName = `${user.firstName} ${user.lastName}`;

			this.storeUserObj(user);
			this.setState({
				loading: false,
				user,
			});
		} catch (err) {
			throw err;
		}
	};

	componentWillUnmount() {
		jQuery(".main-container, .page-home").removeAttr("style");
	}

	componentDidMount() {
		const {
			match,
			common,
		} = this.props;

		const { activationCode } = match.params;
		const sessionUser = this.getUserObj();

		jQuery(".main-container, .page-home").css("width", "auto");

		if (!sessionUser || sessionUser.activationCode !== activationCode) {
			this.getUserInfoByActivateKey(activationCode).catch((err) => {});
		} else {
			this.setState({
				loading: false,
				user: sessionUser,
			});
		}

		initGA(common.gaTrackingId);
	}

	updateInfo = () => {
		const { user, password } = this.state;
		this.setState({ updatingUser: true });
		ContentArena.ContentApi.activateUser(user, password).done(() => {
			this.setState({ updated: true, updatingUser: false });
			localStorage.clear();
			location.href = "/marketplace";
		});
	};

	handlePasswordValid = isValid => this.setState({ isPassValid: isValid });

	isUserValid = () => this.state.user.firstName.trim() && this.state.user.lastName.trim() && this.state.user.email.trim();

	updateUser = (prop, value) => {
		const { user } = this.state;
		user[prop] = value;
		this.storeUserObj(user);
		this.setState({ user });
	};

	getFirstName = () => {
		const { firstName } = this.state.user;
		return (
			<div className={cn("item", { mobile: isMobileOnly, tablet: isTablet })}>
				<label>
					<Translate i18nKey="SETTINGS_LABEL_USER_FIRST_NAME" /> {" (*)"}
				</label>
				<input
					placeholder={this.context.t("SETTINGS_PLACEHOLDER_USER_FIRST_NAME")}
					value={firstName}
					onChange={(e) => {
						this.updateUser("firstName", e.target.value);
					}}
				/>
			</div>
		);
	};

	getLastName = () => {
		const { lastName } = this.state.user;
		return (
			<div className={cn("item", { mobile: isMobileOnly, tablet: isTablet })}>
				<label>
					<Translate i18nKey="SETTINGS_LABEL_USER_FAMILY_NAME" /> {" (*)"}
				</label>
				<input
					placeholder={this.context.t("SETTINGS_PLACEHOLDER_USER_LAST_NAME")}
					value={lastName}
					onChange={(e) => {
						this.updateUser("lastName", e.target.value);
					}}
				/>
			</div>
		);
	};

	getEmail = () => {
		const { email } = this.state.user;
		return (
			<div className={cn("item", { mobile: isMobileOnly, tablet: isTablet })}>
				<label>
					<Translate i18nKey="SETTINGS_LABEL_USER_EMAIL" /> {"(*)"}
				</label>
				<input
					placeholder={this.context.t("SETTINGS_PLACEHOLDER_USER_EMAIL")}
					value={email}
					readOnly
					disabled
				/>
			</div>
		);
	};

	getPersonalInfoBox = () => {
		if (isTablet) {
			return (
				<Fragment>
					<div className="row">
						{this.getFirstName()}
						{this.getLastName()}
					</div>
					<div className="row">
						{this.getEmail()}
						<div className="item" />
					</div>
				</Fragment>
			);
		}

		if (isMobileOnly) {
			return (
				<Fragment>
					<div className="row">
						{this.getFirstName()}
					</div>
					<div className="row">
						{this.getLastName()}
					</div>
					<div className="row">
						{this.getEmail()}
					</div>
				</Fragment>
			);
		}

		return (
			<div className="row">
				{this.getFirstName()}
				{this.getLastName()}
				{this.getEmail()}
			</div>
		);
	};

	render() {
		const {
			user,
			updatingUser,
			password,
			passwordCheck,
			isPassValid,
			updated,
			loading,
		} = this.state;

		if (loading) {
			return (
				<div className="settings-container">
					<Loader loading />
				</div>
			);
		}

		TrackingEvent(`Register ${user.fullName}`, "Password", user.fullName);
		return (
			<div className={cn("settings-container activate-user-container", { mobile: isMobileOnly })}>
				<div className="settings-header">
					<div className={cn("big-title", { mobile: isMobileOnly, tablet: isTablet })}>
						<Translate i18nKey="SETTINGS_WELCOME" />
					</div>
				</div>

				<div className="settings-wrapper">
					<div className="settings-title">
						<Translate i18nKey="SETTINGS_REGISTER_TITLE" />
					</div>
					<div className={cn("setting", { mobile: isMobileOnly })}>
						<div className="title">
							<Translate i18nKey="SETTINGS_LABEL_USER_TITLE_INFO" />
						</div>
						{this.getPersonalInfoBox()}
					</div>


					<div className={cn("setting-row", { mobile: isMobileOnly })}>
						<div className={cn("setting-password", { mobile: isMobileOnly })}>
							<div className="title">
								<Translate i18nKey="REGISTER_LABEL_SELECT_PASSWORD" />
							</div>
							<div className="subtitle">
								<Translate i18nKey="SETTINGS_LABEL_CHANGE_PASSWORD_2" />
							</div>
							<div className="password">
								<label><Translate i18nKey="SETTINGS_LABEL_TYPE_NEW_PASSWORD" /></label>
								<input
									type="password"
									onChange={(e) => {
										this.setState({
											password: e.target.value,
										});
									}}
								/>

								<label><Translate i18nKey="SETTINGS_LABEL_RETYPE_NEW_PASSWORD" /></label>
								<input
									type="password"
									onChange={(e) => {
										this.setState({
											passwordCheck: e.target.value,
										});
									}}
								/>

							</div>
						</div>

						{password && (
							<div className={cn("setting-validation", { mobile: isMobileOnly })}>
								<PasswordValidationBox
									password={password}
									passwordCheck={passwordCheck}
									onPasswordValid={this.handlePasswordValid}
								/>
							</div>
						)}
					</div>

					<div className="activate-user-button">
						<Loader loading={updatingUser} small>
							{!updatingUser && !updated && (
								<button
									onClick={this.updateInfo}
									disabled={!isPassValid || !this.isUserValid()}
									className="standard-button"
								>
									<Translate i18nKey="REGISTER_SUCCESS_MESSAGE" />
								</button>
							)}
						</Loader>
					</div>
				</div>
			</div>
		);
	}
}

Register.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
	contentListingInit: content => dispatch({
		type: "CONTENT_INIT",
		content,
	}),
	updateProfile: profile => dispatch(updateProfile(profile)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Register);
