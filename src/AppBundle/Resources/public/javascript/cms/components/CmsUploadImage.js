import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";

const CmsUploadImage = ({
	image, onUpload, onRemove, isUploading,
}) => {
	const [open, setOpen] = useState(false);
	let fileRef;

	const hideOpen = () => {
		setOpen(false);
	};

	const onUploadImage = () => {
		setOpen(true);
		fileRef.click();
	};

	const onRemoveImage = () => {
		onRemove();
	};

	const onLoadingImage = (e) => {
		if (!e.target.files.length) {
			return;
		}

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			onUpload(reader.result);
			isUploading(false);
		};

		isUploading(true);
		reader.readAsDataURL(file);
		e.target.value = "";
	};

	return (
		<div className="upload-image">
			{open && <div className="upload-image-fullscreen" />}

			<input
				type="file"
				accept={[".png", ".jpg", ".jpeg"]}
				ref={input => fileRef = input}
				onChange={onLoadingImage}
			/>

			<div className="upload-image-wrapper">
				{image ? (
					<img src={image} alt="Upload" />
				) : (
					<i className="icon-photo" />
				)}
			</div>

			<div className="upload-image-buttons">
				{image ? (
					<Fragment>
						<button
							className="primary-outline-button modify"
							onClick={onUploadImage}
							onFocus={hideOpen}
						>
							<div className="button-content">
								<Translate i18nKey="CMS_UPLOAD_IMAGE_MODIFY" />
							</div>
						</button>
						<button className="secondary-outline-button remove" onClick={onRemoveImage}>
							<div className="button-content">
								<Translate i18nKey="CMS_UPLOAD_IMAGE_REMOVE" />
							</div>
						</button>
					</Fragment>
				) : (
					<button
						className="primary-outline-button upload"
						onClick={onUploadImage}
						onFocus={hideOpen}
					>
						<div className="button-content">
							<Translate i18nKey="CMS_UPLOAD_IMAGE_UPLOAD" />
						</div>
					</button>
				)}
			</div>

			<div className="upload-image-description">
				<Translate i18nKey="CMS_UPLOAD_IMAGE_DESCRIPTION" />
			</div>
		</div>
	);
};

CmsUploadImage.propTypes = {
	image: PropTypes.string.isRequired,
};

export default CmsUploadImage;
