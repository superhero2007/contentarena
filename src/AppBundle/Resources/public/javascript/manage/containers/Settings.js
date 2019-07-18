import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import cloneDeep from "lodash/cloneDeep";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import CountrySelector from "../../main/components/CountrySelector";
import PasswordValidationBox from "../../main/components/PasswordValidationBox";
import Loader from "../../common/components/Loader";
import InviteUsers from "./InviteUsers";

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			updatingCompany: false,
			updatingUser: false,
			updatingPassword: false,
			loadingCompanyUsers: false,
			editPersonalInfo: false,
			editCompanyInfo: false,
			companyUsers: [],
			user: {},
			password: "",
			passwordCheck: "",
			isPassValid: false,
			activeTab: 1,
		};
		this.textArea = React.createRef();
	}

	componentDidMount() {
		this.setState({ loading: true });
		ContentArena.ContentApi.getUserInfo().done((user) => {
			this.originalUser = cloneDeep(user);
			this.setState({
				loading: false,
				user,
				activeTab: user.company ? 1 : 2,
			});
		});

		this.loadCompanyUsers();
	}

	componentDidUpdate() {
		this.setTextAreaHeight();
	}

	setTextAreaHeight = () => {
		if (this.textArea.current) {
			this.textArea.current.style.height = `${this.textArea.current.scrollHeight}px`;
		}
	};

	loadCompanyUsers = () => {
		this.setState({ loadingCompanyUsers: true });
		ContentArena.ContentApi.getCompanyUsers().done((companyUsers) => {
			this.setState({ loadingCompanyUsers: false, companyUsers });
		});
	};

	updateCompany = () => {
		this.setState({ updatingCompany: true, editCompanyInfo: false });
		this.originalUser = cloneDeep(this.state.user);
		ContentArena.ContentApi.updateCompany(this.state.user.company).done(() => {
			this.setState({ updatingCompany: false });
		});
	};

	updateUser = () => {
		this.setState({ updatingUser: true, editPersonalInfo: false });
		this.originalUser = cloneDeep(this.state.user);
		ContentArena.ContentApi.updateUser(this.state.user).done(() => {
			this.setState({ updatingUser: false });
		});
	};

	updatePassword = () => {
		this.setState({ updatingPassword: true });
		ContentArena.ContentApi.updatePassword({
			id: this.state.user.id,
			password: this.state.password,
		}).done(() => {
			this.setState({
				updatingPassword: false,
				password: null,
				passwordCheck: null,
				passwordUpdated: true,
			});
		});
	};

	handlePasswordValid = isValid => this.setState({ isPassValid: isValid });

	render() {
		const { common } = this.props;

		const {
			editPersonalInfo, editCompanyInfo, loadingCompanyUsers, companyUsers, isPassValid,
			updatingCompany, updatingUser, updatingPassword, password, passwordCheck, passwordUpdated,
		} = this.state;
		const { user, activeTab, loading } = this.state;

		const country = (user && user.company && user.company.country) ? {
			label: user.company.country.name,
			value: user.company.country.name,
		} : null;

		if (loading) return <Loader loading />;

		return (
			<div className="settings-container">
				<div className="ca-tabs">
					{user.company && (
						<div
							className={`tab ${activeTab === 1 ? "active" : ""}`}
							onClick={() => this.setState({ activeTab: 1 })}
						>
							<Translate i18nKey="SETTINGS_TAB_COMPANY" />
						</div>
					)}
					<div
						className={`tab ${activeTab === 2 ? "active" : ""}`}
						onClick={() => this.setState({ activeTab: 2 })}
					>
						<Translate i18nKey="SETTINGS_TAB_USERS" />
					</div>
					<div
						className={`tab ${activeTab === 3 ? "active" : ""}`}
						onClick={() => this.setState({ activeTab: 3 })}
					>
						<Translate i18nKey="SETTINGS_TAB_ACCOUNT" />
					</div>
					<div
						className={`tab ${activeTab === 4 ? "active" : ""}`}
						onClick={() => this.setState({ activeTab: 4 })}
					>
						<Translate i18nKey="SETTINGS_TAB_PASSWORD" />
					</div>
					<div
						className={`tab ${activeTab === 5 ? "active" : ""}`}
						onClick={() => this.setState({ activeTab: 5 })}
					>
						<Translate i18nKey="SETTINGS_TAB_SUPPORT" />
					</div>
				</div>

				{user.company && activeTab === 1 && (
					<div className="setting">
						<div className="title">
							<Translate i18nKey="SETTINGS_TITLE_COMPANY" />
							{!editCompanyInfo && !updatingCompany && (
								<div
									className="edit-button"
									onClick={() => {
										this.setState({
											editCompanyInfo: true,
										});
									}}
								>
									<i className="fa fa-edit" />
								</div>
							)}
							{updatingCompany && <Loader loading small />}
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_NAME" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.legalName}
									disabled={common.testStageMode || !editCompanyInfo}
									onChange={(e) => {
										user.company.legalName = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_REGISTRATION_NUMBER" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.registrationNumber}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.registrationNumber = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_VAT" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.vat}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.vat = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_ADDRESS" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.address}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.address = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_ADDRESS_2" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.address2}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.address2 = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_CITY" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.city}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.city = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_ZIP" />
								</label>
								<input
									className="ca-form-control"
									value={user.company.zip}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.zip = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_COMPANY_COUNTRY" />
								</label>
								<CountrySelector
									multi={false}
									value={country}
									disabled={!editCompanyInfo}
									onChange={(e) => {
										user.company.country.name = e.value;
										this.setState({ user });
									}}
								/>
							</div>
						</div>
						<div>
							<label>
								<Translate i18nKey="SETTINGS_LABEL_COMPANY_DESCRIPTION" />
							</label>
							<textarea
								readOnly
								ref={this.textArea}
								value={user.company.description}
								disabled={!editCompanyInfo}
								onChange={(e) => {
									user.company.description = e.target.value;
									this.setState({ user });
								}}
							/>
						</div>
						{editCompanyInfo && !updatingCompany && (
							<div className="buttons">
								<div>
									<button
										onClick={() => {
											this.setState({
												user: { ...this.originalUser },
												editCompanyInfo: false,
											});
										}}
										className="cancel-button"
									>
										Cancel
									</button>
									<button
										onClick={this.updateCompany}
										className="ca-btn primary"
									>
										Save
									</button>
								</div>
							</div>
						)}
					</div>
				)}

				{activeTab === 2 && (
					<>
						<div className="setting">
							{/* ACTIVE USERS */}
							<div className="title">
								<Translate i18nKey="SETTINGS_LABEL_ACTIVE_USERS" />
							</div>
							<h4 className="subtitle">
								<Translate i18nKey="SETTINGS_LABEL_ACTIVE_USERS_EXPLANATION" />
							</h4>

							{!loadingCompanyUsers && companyUsers.length > 0 && (
								<div>
									<ReactTable
										className="closed-deals-table"
										defaultPageSize={30}
										showPageSizeOptions={false}
										showPagination={false}
										minRows={0}
										resizable={false}
										data={companyUsers}
										columns={[{
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_FAMILY_NAME" />,
											headerClassName: "table-header",
											className: "table-header",
											accessor: "lastName",
										}, {
											accessor: "firstName", // Required because our accessor is not a string
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_FIRST_NAME" />,
											headerClassName: "table-header",
											className: "table-header",
										}, {
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_EMAIL" />,
											accessor: "email",
											headerClassName: "table-header",
											className: "table-header",
											Cell: row => (
												<span title={row.value}>
													{row.value}
												</span>
											),
											width: 350,
										}, {
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_PHONE_NUMBER" />,
											accessor: "phone",
											headerClassName: "table-header",
											className: "table-header",
										}, {
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_COMPANY_POSITION" />,
											accessor: "title",
											headerClassName: "table-header",
											className: "table-header",
										}, {
											Header: <Translate i18nKey="SETTINGS_LABEL_USER_STATUS" />,
											accessor: "status",
											headerClassName: "table-header",
											className: "table-header d-flex justify-content-center",
											Cell: (props) => {
												const user = props.original;

												if (user.status && user.status.name === "Active") {
													return (
														<i
															className="fa fa-check-circle setting-table-icon"
															style={{ color: "green" }}
														/>
													);
												}

												return (
													<i
														className="fa fa-minus-circle setting-table-icon"
														style={{ color: "orange" }}
													/>
												);
											},
										},

										]}
									/>
								</div>
							)}
							{loadingCompanyUsers && <Loader loading small />}
						</div>
						<div className="setting">
							<div className="title">
								<Translate i18nKey="SETTINGS_LABEL_INVITE_COLLEAGUES" />
							</div>
							<h4 className="subtitle">
								<Translate i18nKey="SETTINGS_LABEL_INVITE_COLLEAGUES_EXPLANATION" />
							</h4>
							<InviteUsers onInvite={this.loadCompanyUsers} />
						</div>
					</>
				)}

				{activeTab === 3 && (
					<div className="setting">
						<div className="title">
							<Translate i18nKey="SETTINGS_LABEL_USER_TITLE_INFO" />
							{!editPersonalInfo && !updatingUser && (
								<div
									className="edit-button"
									onClick={() => {
										this.setState({
											editPersonalInfo: true,
										});
									}}
								>
									<i className="fa fa-edit" />
								</div>
							)}
							{updatingUser && <Loader loading small />}
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_USER_FIRST_NAME" />
								</label>
								<input
									className="ca-form-control"
									value={user.firstName}
									disabled={common.testStageMode || !editPersonalInfo}
									onChange={(e) => {
										user.firstName = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_USER_FAMILY_NAME" />
								</label>
								<input
									className="ca-form-control"
									value={user.lastName}
									disabled={common.testStageMode || !editPersonalInfo}
									onChange={(e) => {
										user.lastName = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_USER_TITLE" />
								</label>
								<input
									className="ca-form-control"
									value={user.title}
									disabled={!editPersonalInfo}
									onChange={(e) => {
										user.title = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_USER_EMAIL" />
								</label>
								<input
									className="ca-form-control"
									value={user.email}
									disabled
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_USER_PHONE_NUMBER" />
								</label>
								<input
									className="ca-form-control"
									value={user.phone}
									disabled={!editPersonalInfo}
									onChange={(e) => {
										user.phone = e.target.value;
										this.setState({ user });
									}}
								/>
							</div>
						</div>
						{editPersonalInfo && !updatingUser && (
							<div className="buttons">
								<div>
									<button
										onClick={() => {
											this.setState({
												user: { ...this.originalUser },
												editPersonalInfo: false,
											});
										}}
										className="cancel-button"
									>
										Cancel


									</button>
									<button
										onClick={this.updateUser}
										className="ca-btn primary"
									>
										Save
									</button>
								</div>
							</div>
						)}
					</div>
				)}

				{activeTab === 4 && (
					<div className="setting">
						<div className="title">
							<Translate i18nKey="SETTINGS_LABEL_CHANGE_PASSWORD" />
						</div>
						<div className="subtitle">
							<Translate i18nKey="SETTINGS_LABEL_CHANGE_PASSWORD_2" />
						</div>
						<div className="row">
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_TYPE_CURRENT_PASSWORD" />
								</label>
								<input
									type="password"
									className="ca-form-control"
									onChange={(e) => {
										this.setState({
											oldPassword: e.target.value,
										});
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_TYPE_NEW_PASSWORD" />
								</label>
								<input
									type="password"
									className="ca-form-control"
									onChange={(e) => {
										this.setState({
											password: e.target.value,
										});
									}}
								/>
							</div>
							<div className="item">
								<label>
									<Translate i18nKey="SETTINGS_LABEL_RETYPE_NEW_PASSWORD" />
								</label>
								<input
									type="password"
									className="ca-form-control"
									onChange={(e) => {
										this.setState({
											passwordCheck: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<Loader loding={updatingPassword} small>
							<div className="text-center">
								{passwordUpdated ? (
									<div>
										<Translate i18nKey="SETTINGS_LABEL_PASSWORD_UPDATED" />
									</div>
								) : (
									<button
										onClick={this.updatePassword}
										disabled={!isPassValid}
										className="ca-btn primary large"
									>
										<Translate i18nKey="SETTINGS_BUTTON_SAVE_PASSWORD" />
									</button>
								)}
							</div>
						</Loader>
						{password && (
							<PasswordValidationBox
								password={password}
								passwordCheck={passwordCheck}
								onPasswordValid={this.handlePasswordValid}
							/>
						)}
					</div>
				)}
				{activeTab === 5 && (
					<div className="setting">
						<div className="row">
							<div style={{ width: "100%" }}>
								<div className="title">
									<Translate i18nKey="SETTINGS_LINKS_HEADER" />
								</div>
								<div className="subtitle">
									<Translate i18nKey="SETTINGS_LINKS_TITLE" />
								</div>
								<div>
									<a
										href="/generalterms"
										target="_blank"
										className="ca-btn primary"
									>
										<Translate i18nKey="SETTINGS_LINKS_BUTTON_TERMS" />
									</a>
									{" "}
									<a
										href="https://contentarena.com/web/privacy-policy/"
										target="_blank"
										rel="noopener noreferrer"
										className="ca-btn primary"
									>
										<Translate i18nKey="SETTINGS_LINKS_BUTTON_PRIVACY" />
									</a>
								</div>
							</div>
							<div style={{ width: "100%" }}>
								<div className="title">
									<Translate i18nKey="SETTINGS_SUPPORT_HEADER" />
								</div>
								<div className="subtitle">
									<Translate i18nKey="SETTINGS_SUPPORT_TITLE" />
								</div>
								<div>
									<a
										href="https://contentarena.com/web/faq/"
										target="_blank"
										rel="noopener noreferrer"
										className="ca-btn primary"
									>
										<Translate i18nKey="SETTINGS_LINKS_BUTTON_FAQ" />
									</a>
									{" "}
									<a
										href="/bundles/app/data/Content_Arena_Manual_1.0.pdf"
										download
										className="ca-btn primary"
									>
										<Translate i18nKey="SETTINGS_LINKS_BUTTON_MANUAL" />
									</a>

								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

Settings.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
)(Settings);
