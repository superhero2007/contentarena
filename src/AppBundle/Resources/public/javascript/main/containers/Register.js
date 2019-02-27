import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { updateProfile } from "../actions/userActions";
import CountrySelector from "../components/CountrySelector";
import PasswordValidationBox from "../components/PasswordValidationBox";
import GeneralTerms from "../components/GeneralTerms";
import PrivacyPolicy from "../components/PrivacyPolicy";
import PreferredUserProfile from "../../manage/components/PreferredUserProfile";
import PreferredSportSeller from "../../manage/components/PreferredSportSeller";
import PreferredTerritoriesBuyer from "../../manage/components/PreferredTerritoriesBuyer";
import PreferredSportBuyer from "../../manage/components/PreferredSportBuyer";
import Loader from "../../common/components/Loader";

const Steps = ({ steps = [] }) => {
	const colors = [
		"#FFC94B",
		"#F7C349",
		"#EFBD47",
		"#E8B745",
		"#E1B143",
	];

	return (
		<div
			className="steps"
			{...this.props}
		>
			{steps.map((step, i) => (
				<div style={{ backgroundColor: (step) ? colors[i] : "" }} key={i} className="step" />))}


		</div>
	);
};

const BackButton = ({ onClick }, context) => (
	<button
		onClick={onClick}
		className="standard-button back"
	>
		<i className="fa fa-chevron-left" />
		{" "}
		{context.t("SETTINGS_BUTTON_BACK")}
	</button>
);

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userLoading: false,
			updatingUser: false,
			editCompanyInfo: false,
			user: {},
			step: "welcome",
			password: "",
			passwordCheck: "",
			isPassValid: false,
			isCompanyValid: true,
			isCompanyLoading: false,
		};
	}

	storeUserObj = (user) => {
		sessionStorage.setItem("registering_user", JSON.stringify(user));
	};

	getUserObj = () => {
		const user = sessionStorage.getItem("registering_user");
		if (!user) return user;
		return JSON.parse(user);
	};

	getUserInfoByActivateKey = async (code, step) => {
		this.setState({ userLoading: true });
		try {
			let user = await ContentArena.ContentApi.getUserInfoByActivationCode(code);
			if (user) {
				user.activationCode = code;
				if (!user.company) {
					user.company = { country: {} };
				}

				if (user.preferredProfile === undefined) {
					user.preferredProfile = "BOTH";
				}
			}
			this.storeUserObj(user);
			this.setState({
				userLoading: false,
				user,
				step,
			});
		} catch (err) {
			throw err;
		}
	};

	componentDidMount() {
		const {
			history,
			match,
			register,
		} = this.props;

		const { activationCode } = match.params;
		const { step } = match.params;
		const sessionUser = this.getUserObj();

		// Redirect to welcome step if none
		if (!step) {
			history.push(`/register/${activationCode}/welcome`);
			return;
		}

		if ((step === "welcome" && !sessionUser) || sessionUser && sessionUser.activationCode !== activationCode) {
			this.getUserInfoByActivateKey(activationCode, step).catch((err) => {
			});
		} else {
			this.setState({
				loading: false,
				user: sessionUser,
				step,
			});
		}
	}

	updateInfo = () => {
		const { user, password } = this.state;
		this.setState({ updatingUser: true });
		ContentArena.ContentApi.activateUser(user, password).done(() => {
			sessionStorage.setItem("registering_user", null);
			this.setState({ updated: true, updatingUser: false });
			location.href = "/marketplace";
		});
	};

	handlePasswordValid = isValid => this.setState({ isPassValid: isValid });

	invalidUser = () => {
		const { user } = this.state;
		return user.firstName === ""
			|| user.firstName === null
			|| user.lastName === ""
			|| user.lastName === null
			|| user.email === ""
			|| user.email === null
			|| user.phone === null
			|| user.phone === undefined
			|| user.phone === "";
	};

	invalidCompany = () => {
		const { user, isCompanyValid } = this.state;
		return user === null
			|| user.company.city === ""
			|| user.company.city === null
			|| user.company.city === undefined
			|| user.company.address === null
			|| user.company.address === ""
			|| user.company.address === undefined
			|| user.company.zip === null
			|| user.company.zip === ""
			|| user.company.zip === undefined
			|| user.company.country === null
			|| user.company.country === undefined
			|| user.company.country.name === undefined
			|| user.company.legalName === undefined
			|| user.company.legalName === null
			|| user.company.legalName === ""
			|| !isCompanyValid;
	};

	updateUser = (prop, value) => {
		const { user } = this.state;
		user[prop] = value;
		this.storeUserObj(user);
		this.setState({ user });
	};

	updateCompany = (prop, value) => {
		const { user } = this.state;
		if (prop === "legalName" && !this.state.isCompanyValid) {
			this.state.isCompanyValid = true;
		}
		user.company[prop] = value;
		this.storeUserObj(user);
		this.setState({ user });
	};

	handleSellerSports = (selection) => {
		const { user } = this.state;
		user.preferredSellerSports = selection.sports;
		user.preferredSellerAllSports = selection.all;
		user.preferredSellerOtherSport = selection.other;
		this.storeUserObj(user);
		this.setState({ user });
	};

	handleBuyerSports = (selection) => {
		const { user } = this.state;
		user.preferredBuyerSports = selection.sports;
		user.preferredBuyerAllSports = selection.all;
		user.preferredBuyerOtherSport = selection.other;
		this.storeUserObj(user);
		this.setState({ user });
	};

	completeButtonDisabled = () => {
		const { user } = this.state;
		return (user.preferredProfile !== "SELLER"
			&& ((!user.preferredBuyerOtherSport
				&& !user.preferredBuyerAllSports
				&& user.preferredBuyerSports
				&& user.preferredBuyerSports.length === 0)
				|| user.preferredBuyerCountries && user.preferredBuyerCountries.length === 0))
			|| (user.preferredProfile !== "BUYER"
				&& (!user.preferredSellerOtherSport && !user.preferredSellerAllSports && user.preferredSellerSports.length === 0));
	};

	goToNextStep = (step) => {
		const { history, match } = this.props;
		const { activationCode } = match.params;
		history.push(`/register/${activationCode}/${step}`);
	};

	handleValidateCompany = () => {
		this.setState({ isCompanyLoading: true });
		const { legalName, id = null } = this.state.user.company;
		ContentArena.Api.isCompanyUnique(legalName, id)
			.then(({ data }) => {
				this.setState({ isCompanyValid: data.isCompanyValid, isCompanyLoading: false });
				if (data.isCompanyValid) {
					this.goToNextStep("password");
				}
			});
	};

	render() {
		const { match, location, common } = this.props;
		const {
			updatingUser,
			password,
			passwordCheck,
			isPassValid,
			updated,
			terms,
			privacy,
			step,
			userLoading,
			isCompanyValid,
			isCompanyLoading,
		} = this.state;

		const { user } = this.state;
		const { activationCode } = match.params;
		const country = (user && user.company && user.company.country) ? {
			label: user.company.country.name,
			value: user.company.country.name,
		} : null;

		if (!activationCode) {
			return (
				<Redirect
					to={{
						pathname: "/landing",
						state: { from: location },
					}}
				/>
			);
		}

		if (userLoading) {
			return (
				<div className="settings-container">
					<Loader loading />
				</div>
			);
		}

		if (!user) {
			return (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: location },
					}}
				/>
			);
		}

		if (step === "welcome") {
			return (
				<div className="settings-container settings-container-welcome">

					<div className="big-title">
						{this.context.t("SETTINGS_WELCOME")}
					</div>
					<div className="title">
						{this.context.t("SETTINGS_WELCOME_TEXT")}
					</div>

					<div className="setting">
						<Steps steps={[1, 0, 0, 0, 0]} />
						<PreferredUserProfile
							profile={user.preferredProfile}
							style={{
								border: "1px solid lightgray",
								padding: "30px 20px",
							}}
							onChange={profile => this.updateUser("preferredProfile", profile)}
						/>
					</div>
					<div className="buttons">
						<button
							onClick={() => {
								this.goToNextStep("questionnaire");
							}}
							disabled={updatingUser}
							className="standard-button"
						>
							{this.context.t("SETTINGS_BUTTON_CONTINUE")}
						</button>
					</div>

				</div>
			);
		}

		if (step === "questionnaire") {
			return (
				<div className="settings-container settings-container-welcome">

					<div className="setting" style={{ margin: "60px auto 0" }}>
						<Steps steps={[1, 1, 0, 0, 0]} />
						{user.preferredProfile !== "BUYER" && (
							<PreferredSportSeller
								sports={user.preferredSellerSports}
								style={{
									border: "1px solid lightgray",
									padding: "30px 20px",
								}}
								other={user.preferredSellerOtherSport}
								all={user.preferredSellerAllSports}
								onChange={this.handleSellerSports}
							/>
						)}

						{user.preferredProfile !== "SELLER" && (
							<PreferredTerritoriesBuyer
								territories={user.preferredBuyerCountries}
								style={{
									border: "1px solid lightgray",
									padding: "30px 20px",
								}}
								onChange={territories => this.updateUser("preferredBuyerCountries", territories)}
							/>
						)}

						{user.preferredProfile !== "SELLER" && (
							<PreferredSportBuyer
								sports={user.preferredBuyerSports}
								all={user.preferredBuyerAllSports}
								other={user.preferredBuyerOtherSport}
								style={{
									border: "1px solid lightgray",
									padding: "30px 20px",
								}}
								onChange={this.handleBuyerSports}
							/>
						)}

					</div>
					<div className="buttons">
						<BackButton onClick={() => {
							this.goToNextStep("welcome");
						}}
						/>
						<button
							onClick={() => {
								this.goToNextStep("personal");
							}}
							disabled={this.completeButtonDisabled()}
							className="standard-button"
						>
							{this.context.t("SETTINGS_BUTTON_CONTINUE")}
						</button>
					</div>
				</div>
			);
		}

		if (step === "personal") {
			return (
				<div className="settings-container settings-container-welcome">

					<div className="setting" style={{ margin: "60px auto 0" }}>
						<Steps steps={[1, 1, 1, 0, 0]} />
						<div className="title">
							{this.context.t("SETTINGS_LABEL_USER_TITLE_INFO")}
						</div>
						<div className="row">
							<div className="item">
								<label>
									{this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")}
									{" "}
									*


								</label>
								<input
									value={user.firstName}
									onChange={(e) => {
										this.updateUser("firstName", e.target.value);
									}}
								/>
							</div>
							<div className="item">
								<label>
									{this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")}
									{" "}
									*


								</label>
								<input
									value={user.lastName}
									onChange={(e) => {
										this.updateUser("lastName", e.target.value);
									}}
								/>
							</div>
							<div className="item">
								<label>
									{this.context.t("SETTINGS_LABEL_COMPANY_POSITION")}
								</label>
								<input
									value={user.title}
									onChange={(e) => {
										this.updateUser("title", e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="item">
								<label>
									{this.context.t("SETTINGS_LABEL_USER_EMAIL")}
									{" "}
									*


								</label>
								<input
									value={user.email}
									onChange={(e) => {
										this.updateUser("email", e.target.value);
									}}
								/>
							</div>
							<div className="item">
								<label>
									{this.context.t("SETTINGS_LABEL_USER_PHONE_NUMBER")}
									{" "}
									*


								</label>
								<input
									value={user.phone}
									onChange={(e) => {
										this.updateUser("phone", e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="buttons">
						<BackButton onClick={() => {
							this.goToNextStep("questionnaire");
						}}
						/>
						<button
							onClick={() => {
								this.goToNextStep("company");
							}}
							disabled={this.invalidUser()}
							className="standard-button"
						>
							{this.context.t("SETTINGS_BUTTON_CONTINUE")}
						</button>
					</div>
				</div>
			);
		}

		if (step === "company") {
			return (
				<div className="settings-container settings-container-welcome">

					<div className="setting" style={{ margin: "60px auto 0" }}>
						<Steps steps={[1, 1, 1, 1, 0]} />
						{user.company && (
							<React.Fragment>
								<div className="title" style={{ marginTop: 20 }}>
									{this.context.t("SETTINGS_TITLE_COMPANY")}
								</div>
								{!isCompanyValid
								&& <div className="is-invalid">{this.context.t("SETTINGS_DUPLICATE_COMPANY")}</div>}
								<div className="row">
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_NAME")}
											{" "}
											*


										</label>
										<input
											value={user.company.legalName}
											disabled={common.testStageMode}
											onChange={(e) => {
												this.updateCompany("legalName", e.target.value);
											}}
										/>
									</div>
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_REGISTRATION_NUMBER")}
										</label>
										<input
											value={user.company.registrationNumber}
											onChange={(e) => {
												this.updateCompany("registrationNumber", e.target.value);
											}}
										/>
									</div>
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_VAT")}
										</label>
										<input
											value={user.company.vat}
											onChange={(e) => {
												this.updateCompany("vat", e.target.value);
											}}
										/>
									</div>
								</div>
								<div className="row">
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")}
											{" "}
											1 *


										</label>
										<input
											value={user.company.address}
											onChange={(e) => {
												this.updateCompany("address", e.target.value);
											}}
										/>
									</div>

									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")}
											{" "}
											2


										</label>
										<input
											value={user.company.address2}
											onChange={(e) => {
												this.updateCompany("address2", e.target.value);
											}}
										/>
									</div>
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_CITY")}
											{" "}
											*


										</label>
										<input
											value={user.company.city}
											onChange={(e) => {
												this.updateCompany("city", e.target.value);
											}}
										/>
									</div>
								</div>
								<div className="row">
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_ZIP")}
											{" "}
											*


										</label>
										<input
											value={user.company.zip}
											onChange={(e) => {
												this.updateCompany("zip", e.target.value);
											}}
										/>
									</div>
									<div className="item">
										<label>
											{this.context.t("SETTINGS_LABEL_COMPANY_COUNTRY")}
											{" "}
											*


										</label>
										<CountrySelector
											multi={false}
											value={country}
											onChange={(e) => {
												let country = {};
												if (e && e.value) {
													if (!user.company.country) user.company.country = {};
													country.name = e.value;
												}
												if (e === null) country = {};
												this.updateCompany("country", country);
											}}
										/>
									</div>
								</div>
							</React.Fragment>
						)}
					</div>
					<div className="buttons">
						<BackButton onClick={() => {
							this.goToNextStep("personal");
						}}
						/>
						<button
							onClick={this.handleValidateCompany}
							disabled={isCompanyLoading || this.invalidCompany()}
							className="standard-button"
						>
							{this.context.t("SETTINGS_BUTTON_CONTINUE")}
							{isCompanyLoading && <Loader loading xSmall />}
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className="settings-container settings-container-welcome">

				<div className="setting" style={{ margin: "60px auto 0" }}>

					<Steps steps={[1, 1, 1, 1, 1]} />
					<div className="setting-password">
						<div className="title" style={{ marginTop: 20 }}>
							{this.context.t("REGISTER_LABEL_SELECT_PASSWORD")}
						</div>
						<div className="subtitle">
							{this.context.t("SETTINGS_LABEL_CHANGE_PASSWORD_2")}
						</div>
						<div className="password">

							<label>
								{this.context.t("SETTINGS_LABEL_TYPE_NEW_PASSWORD")}
							</label>
							<input
								type="password"
								onChange={(e) => {
									this.setState({
										password: e.target.value,
									});
								}}
							/>

							<label>
								{this.context.t("SETTINGS_LABEL_RETYPE_NEW_PASSWORD")}
							</label>
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

					{password
					&& (
						<PasswordValidationBox
							password={password}
							passwordCheck={passwordCheck}
							onPasswordValid={this.handlePasswordValid}
						/>
					)}
				</div>

				<div className="setting" style={{ margin: "20px auto 0" }}>
					<div
						className="terms-confirm"
						style={{
							padding: "20px 0px",
							margin: "0 auto",
						}}
					>
						<GeneralTerms
							activationCode={activationCode}
							defaultChecked={terms}
							value={terms}
							onChange={(e) => {
								this.setState({ terms: e.target.checked });
							}}
						/>

						<PrivacyPolicy
							defaultChecked={privacy}
							value={privacy}
							onChange={(e) => {
								this.setState({ privacy: e.target.checked });
							}}
						/>
					</div>

				</div>

				<div className="buttons">
					<BackButton onClick={() => {
						this.goToNextStep("company");
					}}
					/>

					<Loader loading={updatingUser} small>
						{!updatingUser && !updated && (
							<button
								onClick={this.updateInfo}
								disabled={!isPassValid || !privacy || !terms}
								className="standard-button"
								style={{ maxWidth: 300, lineHeight: "22px" }}
							>
								{this.context.t("REGISTER_SUCCESS_MESSAGE")}
							</button>
						)}
					</Loader>
				</div>
			</div>
		);
	}
}

Register.contextTypes = {
	t: PropTypes.func.isRequired,
};

BackButton.contextTypes = {
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
