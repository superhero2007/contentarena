import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { TranslatedPlaceholderInput } from "@components/Translator";
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
						<Translate i18nKey="SETTINGS_LABEL_USER_EMAIL" />
					</label>

					<Translate i18nKey="SETTINGS_INVITE_PLACEHOLDER_EMAIL">
						<TranslatedPlaceholderInput
							name={`email-${key}`}
							className="ca-form-control"
							id={`email-${key}`}
							value={user.email}
							disabled={disabled}
							autoComplete="off"
							onChange={(e) => {
								user.email = e.target.value.trim();
								this.handleChange(user);
							}}
						/>
					</Translate>
				</div>
				<div className="item">
					<label>
						<Translate i18nKey="SETTINGS_LABEL_USER_FIRST_NAME" />
					</label>
					<Translate i18nKey="SETTINGS_INVITE_PLACEHOLDER_FIRST_NAME">
						<TranslatedPlaceholderInput
							id={`first-name-${key}`}
							className="ca-form-control"
							value={user.firstName}
							disabled={disabled}
							onChange={(e) => {
								user.firstName = e.target.value;
								this.handleChange(user);
							}}
						/>
					</Translate>
				</div>
				<div className="item">
					<label>
						<Translate i18nKey="SETTINGS_LABEL_USER_FAMILY_NAME" />
					</label>
					<Translate i18nKey="SETTINGS_INVITE_PLACEHOLDER_FAMILY_NAME">
						<TranslatedPlaceholderInput
							id={`last-name-${key}`}
							className="ca-form-control"
							value={user.lastName}
							disabled={disabled}
							onChange={(e) => {
								user.lastName = e.target.value;
								this.handleChange(user);
							}}
						/>
					</Translate>
				</div>
			</div>
		);
	}
}

InviteUserForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default InviteUserForm;
