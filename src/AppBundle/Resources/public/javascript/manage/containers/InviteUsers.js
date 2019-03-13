import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Loader from "../../common/components/Loader";
import InviteUserForm from "../components/InviteUserForm";
import api from "../../api";

class InviteUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			invitedUsers: [],
			skippedUsers: [],
		};
	}

	inviteUser = () => {
		const { onInvite } = this.props;
		const { user } = this.state;

		this.setState({ loading: true });

		api.company.inviteUsers({users: [user]})
			.then(({data}) => {
				this.setState({
					invitationSent: true,
					skippedUsers: (data) ? data.skippedUsers : [],
					invitedUsers: (data) ? data.invitedUsers : [],
					success: true,
				});
				if (onInvite) onInvite();
				setTimeout(() => {
					this.setState({ invitationSent: false });
				}, 5000);
			})
			.catch(() => {
				this.setState({ success: false });
			})
			.finally(()=>{
				this.setState({ loading: false });
			});
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
