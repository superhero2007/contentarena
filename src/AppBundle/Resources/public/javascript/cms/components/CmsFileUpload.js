import React, { useState } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";

const CmsFileUpload = ({
	attachments, onUpload, onRemove,
}) => {
	const [open, setOpen] = useState(false);
	let fileRef;

	const hideOpen = () => {
		setOpen(false);
	};

	const onUploadFile = () => {
		setOpen(true);
		fileRef.click();
	};

	const onRemoveFile = (index) => {
		onRemove(index);
	};

	const onLoadingFile = (e) => {
		const { files } = e.target;

		if (!files.length) {
			return;
		}
		onUpload(files);
		e.target.value = "";
	};

	return (
		<div className="file-upload">
			{open && <div className="file-upload-fullscreen" />}
			<div className="file-upload-content">
				{attachments && attachments.length
					? (
						attachments.map((item, index) => (
							<div className="file-upload-content-item" key={index}>
								<div>
									{item.name}...
									<span>({(item.size / 1000).toFixed()}K)</span>
								</div>
								<i
									className="icon-remove"
									onClick={() => onRemoveFile(index)}
								/>
							</div>
						))
					) : (
						<div className="file-upload-content-max">
							<Translate i18nKey="CMS_FILE_UPLOAD_MAX" />
						</div>
					)
				}
			</div>
			<button
				className="file-upload-button"
				onClick={onUploadFile}
				onFocus={hideOpen}
			>
				<div className="button-content">
					<Translate i18nKey="CMS_FILE_UPLOAD_BUTTON" />
				</div>
			</button>

			<input
				type="file"
				accept={["image/png", "image/jpg", ".pdf", ".doc", ".docx", ".cvs", ".ppt", ".xls", ".xlsx"]}
				ref={input => fileRef = input}
				onChange={onLoadingFile}
			/>
		</div>
	);
};

CmsFileUpload.propTypes = {
	attachments: PropTypes.array.isRequired,
};

export default CmsFileUpload;
