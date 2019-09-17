import React, { Fragment, useState, useEffect } from "react";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import CmsPopup from "./CmsPopup";

const CmsLicenseDefinitionItem = ({
	item, onUpdate, onRestore, onRemove, onSave,
}) => {
	const [editing, setEditing] = useState(item.editing || false);
	const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

	const [content, setContent] = useState("");
	const [name, setName] = useState("");
	const [invalid, setInvalid] = useState(false);
	const [custom, setCustom] = useState(false);

	useEffect(() => {
		setContent(item.content);
		setName(item.name);
		setCustom(item.custom);
	});

	const { editable } = item;

	const handleChange = (e) => {
		setInvalid(false);
		onUpdate({ content: e.target.value });
	};

	const handleName = (e) => {
		setInvalid(false);
		onUpdate({ name: e.target.value });
	};

	const onSaveItem = () => {
		if (name !== "" && content !== "") {
			setEditing(false);
			onSave();
		} else {
			setInvalid(true);
		}
	};

	const onToggleItem = () => {
		setInvalid(false);
		setEditing(!editing);
	};

	const onToggleConfirm = () => {
		setInvalid(false);
		setShowRemoveConfirm(!showRemoveConfirm);
	};

	return (
		<div className="license-item">
			<div className={cn("license-item-name w-25", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
				"license-item-invalid": invalid && !name,
			})}
			>
				{(!editing || !custom) && <div>{name}</div>}
				{editing && custom && <textarea value={name} onChange={handleName} />}
			</div>
			<div className={cn("license-item-content w-50", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
				"license-item-invalid": invalid && !content,
			})}
			>
				{!editing && <div>{content}</div>}
				{editing && <textarea value={content} onChange={handleChange} />}
			</div>
			<div className={cn("license-item-actions", {
				"license-item-disabled": !editable,
				"license-item-editing": editing,
			})}
			>
				{editable ? (
					editing ? (
						<Fragment>
							<i className="icon-check" onClick={onSaveItem} />
							<i className="icon-remove" onClick={onToggleItem} />
						</Fragment>
					) : (
						<Fragment>
							<i className="icon-edit" onClick={onToggleItem} />
							{!custom && <i className="icon-reset" onClick={onRestore} />}
							{custom && <i className="icon-trash" onClick={onToggleConfirm} />}
						</Fragment>
					)
				) : (
					<span>
						<Translate i18nKey="CMS_LICENSE_ITEM_DISABLE" />
					</span>
				)}
			</div>
			{showRemoveConfirm && (
				<CmsPopup
					title={<Translate i18nKey="TERMS_DEFINITIONS_REMOVE_CONFIRMATION" />}
					onClose={onToggleConfirm}
					onApply={onRemove}
					apply={<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM" />}
					close={<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CANCEL" />}
				/>
			)}
		</div>
	);
};

export default CmsLicenseDefinitionItem;
