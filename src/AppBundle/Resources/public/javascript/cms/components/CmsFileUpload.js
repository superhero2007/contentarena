import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

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
				{attachments.map((item, index) => (
					<div className="file-upload-content-item" key={index}>
						{item.name}...
						<span>({(item.size / 1000).toFixed()}K)</span>
						<i
							className="icon-remove"
							onClick={() => onRemoveFile(index)}
						/>
					</div>
				))}
			</div>
			<button
				className="file-upload-button"
				onClick={onUploadFile}
				onFocus={hideOpen}
			>
				<div className="button-content">
					Upload
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