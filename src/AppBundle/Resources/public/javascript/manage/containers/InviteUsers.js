import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Loader from "../../common/components/Loader";
import InviteUserForm from "../components/InviteUserForm";
import { InviteUsersRequest } from "../../api/company";

class InviteUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			invitedUsers: [],
			skippedUsers: [],
		};
	}

	inviteUser = async () => {
		const { onInvite, common } = this.props;
		const { user } = this.state;

		let response;

		this.setState({ loading: true });

		try {
			response = await InviteUsersRequest(common, [user]);
			if (onInvite) onInvite();
		} catch (e) {
			response = false;
		}

		this.setState({
			loading: false,
			invitationSent: true,
			skippedUsers: (response) ? response.skippedUsers : [],
			invitedUsers: (response) ? response.invitedUsers : [],
			success: !!response,
		});

		setTimeout(() => {
			this.setState({ invitationSent: false });
		}, 5000);
	};

	onUpdateUsers = (user) => {
		this.setState({ user });
	};

	isButtonDisabled = () => {
		const { loading, user } = this.state;
		return loading || !user || !user.valid;
	};

	render() {
		const {
			loading, success, invitationSent, skippedUsers, invitedUsers,
		} = this.state;

		return (
			<div className="settings-invite-users">

				{invitationSent && success && invitedUsers.length > 0 && (
					<div className="result-message">
						<i className="fa fa-check-circle" />
						{" "}
						{this.context.t("SETTINGS_SEND_INVITE_SUCCESS")}
					</div>
				)}

				{invitationSent && success && skippedUsers.length > 0 && (
					skippedUsers.map(skippedUser => (
						<div className="result-message">
							<i className="fa fa-close" />
							{" "}
							{skippedUser.email}
							{" "}
							{this.context.t("SETTINGS_SEND_INVITE_EMAIL_ALREADY_INVITED")}
						</div>
					))
				)}

				{invitationSent && !success && (
					<div className="result-message">
						<i className="fa fa-close" />
						{" "}
						{this.context.t("SETTINGS_SEND_INVITE_FAIL")}
					</div>
				)}

				<InviteUserForm
					onUpdate={this.onUpdateUsers}
					disabled={loading}
					key={0}
				/>
				<div className="text-center">
					<button
						onClick={this.inviteUser}
						className="ca-btn primary large"
						disabled={this.isButtonDisabled()}
					>
						{this.context.t("SETTINGS_BUTTON_SEND_INVITE")}
						{" "}
						<Loader loading={loading} xSmall />
					</button>
				</div>
			</div>
		);
	}
}

InviteUsers.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(InviteUsers);
