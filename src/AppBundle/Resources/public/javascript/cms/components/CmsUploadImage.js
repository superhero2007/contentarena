import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const CmsUploadImage = ({
	image, onUpload, onRemove, isUploading,
}) => {
	const [open, setOpen] = useState(false);
	let fileRef;

	const onUploadImage = () => {
		setOpen(true);
		fileRef.click();
	};

	const onRemoveImage = () => {
		onRemove();
	};

	const onLoadingImage = (e) => {
		setOpen(false);

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
						<button className="primary-outline-button modify" onClick={onUploadImage}>
							<div className="content">
								Modify
							</div>
						</button>
						<button className="secondary-outline-button remove" onClick={onRemoveImage}>
							<div className="content">
								Remove
							</div>
						</button>
					</Fragment>
				) : (
					<button className="primary-outline-button upload" onClick={onUploadImage}>
						<div className="content">
							Upload Image
						</div>
					</button>
				)}
			</div>
			<div className="upload-image-description">
				400x400px min, PNG or JPEG file less than 250Kbps
			</div>
		</div>
	);
};

CmsUploadImage.propTypes = {
	image: PropTypes.string.isRequired,
};

export default CmsUploadImage;
