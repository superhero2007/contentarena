import React from "react";
import PropTypes from "prop-types";
import { validateEmail } from "../../common/utils/listing";

class InviteUserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				firstName: "",
				lastName: "",
				email: "",
			},
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const user = {
			firstName: "",
			lastName: "",
			email: "",
		};

		if (nextProps.disabled) this.setState({ user });
	};

	handleChange = (user) => {
		const { onUpdate } = this.props;
		user.valid = this.validate(user);
		this.setState({ user });
		if (onUpdate) onUpdate(user);
	};

	validate = user => user.firstName !== ""
		&& user.email !== ""
		&& validateEmail(user.email)
		&& user.lastName !== "";

	render() {
		const { disabled, key } = this.props;
		const { user } = this.state;

		return (
			<div className="row">
				<div className="item">
					<label>
						{this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")}
					</label>
					<input
						id={`first-name-${key}`}
						value={user.firstName}
						disabled={disabled}
						placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_FIRST_NAME")}
						onChange={(e) => {
							user.firstName = e.target.value;
							this.handleChange(user);
						}}
					/>
				</div>
				<div className="item">
					<label>
						{this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")}
					</label>
					<input
						id={`last-name-${key}`}
						value={user.lastName}
						disabled={disabled}
						placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_FAMILY_NAME")}
						onChange={(e) => {
							user.lastName = e.target.value;
							this.handleChange(user);
						}}
					/>
				</div>
				<div className="item">
					<label>
						{this.context.t("SETTINGS_LABEL_USER_EMAIL")}
					</label>
					<input
						name={`email-${key}`}
						id={`email-${key}`}
						value={user.email}
						disabled={disabled}
						autoComplete="off"
						placeholder={this.context.t("SETTINGS_INVITE_PLACEHOLDER_EMAIL")}
						onChange={(e) => {
							user.email = e.target.value.trim();
							this.handleChange(user);
						}}
					/>
				</div>
			</div>
		);
	}
}

InviteUserForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default InviteUserForm;
