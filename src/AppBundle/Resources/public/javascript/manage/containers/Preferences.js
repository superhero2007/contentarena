import React from "react";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { PropTypes } from "prop-types";
import PreferredSportSeller from "../components/PreferredSportSeller";
import PreferredTerritoriesBuyer from "../components/PreferredTerritoriesBuyer";
import PreferredSportBuyer from "../components/PreferredSportBuyer";
import Loader from "../../common/components/Loader";
import { USER_PROFILES } from "../../common/constants";

class Preferences extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			updatingUser: false,
			userUpdated: false,
			companyUsers: [],
			user: {},
			activeTab: USER_PROFILES.BUYER,
		};
	}

	componentDidMount() {
		this.setState({ loading: true, loadingCompanyUsers: true });

		ContentArena.ContentApi.getUserInfo().done((user) => {
			this.originalUser = cloneDeep(user);

			this.setState({
				loading: false,
				user,
			});
		});
	}

	saveUser = () => {
		const { user } = this.state;

		this.setState({ updatingUser: true });

		this.originalUser = cloneDeep(user);
		ContentArena.ContentApi.updateUser(user).done(() => {
			this.setState({ updatingUser: false, userUpdated: true });
		});
	};

	updateUser = (prop, value) => {
		const { user } = this.state;
		user[prop] = value;
		this.setState({ user });
	};

	handleSellerSports = (response) => {
		const { user } = this.state;
		user.preferredSellerSports = response.sports;
		user.preferredSellerAllSports = response.all;
		this.setState({ user });
	};

	handleBuyerSports = (response) => {
		const { user } = this.state;
		user.preferredBuyerSports = response.sports;
		user.preferredBuyerAllSports = response.all;
		this.setState({ user });
	};

	completeButtonDisabled = () => {
		const { user, activeTab } = this.state;

		if (activeTab === USER_PROFILES.SELLER && (
			!user.preferredSellerOtherSport && !user.preferredSellerAllSports && (
				!user.preferredSellerSports || user.preferredSellerSports.length === 0)
		)
		) return true;


		if (activeTab === USER_PROFILES.BUYER && (
			(!user.preferredBuyerOtherSport && !user.preferredBuyerAllSports && (
				!user.preferredBuyerSports || user.preferredBuyerSports.length === 0)
			) || user.preferredBuyerCountries.length === 0)
		) return true;
	};

	render() {
		const {
			updatingUser, loading, user, userUpdated, activeTab,
		} = this.state;

		if (loading) return <Loader loading />;

		return (
			<div className="settings-container preferences">
				<div className="setting">

					<div className="title">
						{this.context.t("PREFERENCES_HEADLINE")}
					</div>

					<div className="subtitle">
						{this.context.t("PREFERENCES_HEADLINE_EXPLANATION_TEXT")}
					</div>

					<div className="ca-tabs">
						<div
							className={`tab lg ${activeTab === USER_PROFILES.SELLER ? "active" : ""}`}
							onClick={() => {
								this.setState({ activeTab: USER_PROFILES.SELLER });
								this.updateUser("preferredProfile", "SELLER");
							}}
						>
							{this.context.t("PREFERENCES_TERRITORIES_PROFILE_SELLER")}
						</div>
						<div
							className={`tab lg ${activeTab === USER_PROFILES.BUYER ? "active" : ""}`}
							onClick={() => {
								this.setState({ activeTab: USER_PROFILES.BUYER });
								this.updateUser("preferredProfile", "BUYER");
							}}
						>
							{this.context.t("PREFERENCES_TERRITORIES_PROFILE_BUYER")}
						</div>
					</div>
					{activeTab === USER_PROFILES.SELLER && (
						<PreferredSportSeller
							sports={user.preferredSellerSports}
							parse
							showSubtitle={false}
							allSports={user.preferredSellerAllSports}
							onChange={this.handleSellerSports}
						/>
					)}
					{activeTab === USER_PROFILES.BUYER && (
						<>
							<PreferredTerritoriesBuyer
								territories={user.preferredBuyerCountries}
								onChange={territories => this.updateUser("preferredBuyerCountries", territories)}
							/>
							<PreferredSportBuyer
								sports={user.preferredBuyerSports}
								parse
								showSubtitle={false}
								allSports={user.preferredBuyerAllSports}
								onChange={this.handleBuyerSports}
							/>
							<div
								style={{
									display: "flex", marginBottom: 10, justifyContent: "center", fontSize: 14,
								}}
							>
								<input
									type="checkbox"
									className="ca-checkbox"
									defaultChecked={user.receivePreferenceNotifications}
									onChange={e => this.updateUser("receivePreferenceNotifications", e.target.checked)}
									style={{ marginRight: 10 }}
								/>
								<div>
									{this.context.t("PREFERENCES_RECEIVE_NOTIFICATIONS_MESSAGE")}
								</div>
							</div>
						</>
					)}
					<div className="buttons">
						{userUpdated && (
							<div>
								{this.context.t("PREFERENCES_USER_UPDATED_MESSAGE")}
							</div>
						)}
						<div>
							<button
								onClick={this.saveUser}
								disabled={updatingUser || this.completeButtonDisabled()}
								className="standard-button"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Preferences.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Preferences);
