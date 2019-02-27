import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {
	IconYellowCircle, pencilIcon, reloadIcon, trashIconWhite,
} from "../../main/components/Icons";
import Loader from "../../common/components/Loader/Loader";

class DefinitionItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: props.editing || false,
			content: props.content || "",
			name: props.name || "",
			restoreValue: props.content || "",
			updating: false,
			edited: props.edited,
			custom: props.custom,
			id: props.id,
			position: props.position || props.index,
		};
	}

	componentDidMount() {
	}

	handleChange = (e) => {
		this.setState({ content: e.target.value });
	};

	handleName = (e) => {
		this.setState({ name: e.target.value });
	};

	onUpdate = () => {
		const {
			content, name, id, custom, position,
		} = this.state;

		const definition = {
			position,
			content,
			name,
			id,
		};

		this.setState({ updating: true, editing: false });

		ContentArena.Api.updateDefinition(definition).done((response) => {
			this.setState({
				updating: false,
				edited: true,
				content: response.success ? response.definition.content : content,
				name: response.success ? response.definition.name : name,
				id: response.success ? response.definition.id : id,
				custom: response.success ? response.definition.custom : custom,
			});
		});
	};

	onRemove = () => {
		const { onRemove } = this.props;
		const { id } = this.state;

		const definition = {
			id,
		};

		this.setState({ updating: true, editing: false });

		ContentArena.Api.removeDefinition(definition).done((response) => {
			if (response.success && onRemove) onRemove();
		});
	};

	restore = () => {
		const { restoreValue } = this.state;
		this.setState({ content: restoreValue });
	};

	render() {
		const { editable, onRemove } = this.props;
		const {
			editing, content, name, showRemoveConfirm, edited, updating, custom,
		} = this.state;

		return (
			<div className="terms-edit-item">
				<div className={cn("terms-edit-item-name", {
					"terms-edit-item-disabled": !editable,
					"terms-edit-item-editing": editing,
				})}
				>
					{(!editing || !custom) && name}
					{editing && custom && <textarea value={name} onChange={this.handleName} />}
				</div>
				<div className={cn("terms-edit-item-content", {
					"terms-edit-item-disabled": !editable,
					"terms-edit-item-editing": editing,
					edited: edited || custom,
				})}
				>
					{!editing && content}
					{editing && <textarea value={content} onChange={this.handleChange} />}
				</div>
				<div className="terms-edit-item-actions">
					{!updating && !editing && editable
					&& <IconYellowCircle icon={pencilIcon} onClick={() => this.setState({ editing: true })} />}
					{!updating && !editing && !custom && editable
					&& <IconYellowCircle icon={reloadIcon} onClick={this.restore} />}
					{!updating && !editing && custom
					&&					<IconYellowCircle icon={trashIconWhite} onClick={() => this.setState({ showRemoveConfirm: true })} />}

					{!updating && editing && editable
					&& <i className="fa fa-check-circle" onClick={this.onUpdate} style={{ color: "green" }} />}
					{!updating && editing && editable
					&& (
						<i
							className="fa fa-times-circle"
							onClick={() => this.setState({ editing: false })}
							style={{ color: "red" }}
						/>
					)}

					{updating && <Loader loading={updating} xSmall />}

				</div>
				{showRemoveConfirm && (
					<div className="confirmation-tooltip">
						<div className="confirmation-text">
							{this.context.t("TERMS_DEFINITIONS_REMOVE_CONFIRMATION")}
						</div>
						<button
							className="button button-confirm"
							onClick={(e) => {
								this.setState({ showRemoveConfirm: false });
								this.onRemove();
								e.stopPropagation();
							}}
						>
							{this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM")}
						</button>
						<button
							className="button"
							onClick={(e) => {
								this.setState({ showRemoveConfirm: false });
								e.stopPropagation();
							}}
						>
							{this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CANCEL")}
						</button>
					</div>
				)}
			</div>
		);
	}
}

DefinitionItem.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default DefinitionItem;
