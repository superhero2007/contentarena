import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ReactCrop from "react-image-crop";
import Translate from "@components/Translator/Translate";
import CmsPopup from "./CmsPopup";

const CmsUploadImage = ({
	image, onUpload, onRemove, isUploading, minSize = 400, maxSize = 1024,
}) => {
	let fileRef;
	const [open, setOpen] = useState(false);
	const [showSizePopup, setShowSizePopup] = useState(false);
	const [sourceImage, setSourceImage] = useState("");
	const [minWidth, setMinWidth] = useState(0);
	const [minHeight, setMinHeight] = useState(0);
	const [maxWidth, setMaxWidth] = useState(0);
	const [maxHeight, setMaxHeight] = useState(0);
	const [crop, setCrop] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		aspect: 1,
	});
	const [pixelCrop, setPixelCrop] = useState(null);

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
			const image = new Image();
			image.src = reader.result;

			image.onload = () => {
				setCropRegion({
					imageBase64: reader.result,
					imageWidth: image.width,
					imageHeight: image.height,
				});
			};
			isUploading(false);
		};

		isUploading(true);
		reader.readAsDataURL(file);
		e.target.value = "";
	};

	const setCropRegion = (image) => {
		const { imageWidth, imageHeight } = image;
		if (image.imageWidth < minSize || image.imageHeight < minSize) {
			setShowSizePopup(true);
			return;
		}
		let maxWidth;
		let maxHeight;

		if (imageWidth > imageHeight) {
			maxHeight = 100;
			maxWidth = imageHeight * 100 / imageWidth;
		} else {
			maxWidth = 100;
			maxHeight = imageWidth * 100 / imageHeight;
		}

		const minHeight = minSize * 100 / imageHeight;
		const minWidth = minSize * 100 / imageWidth;

		const x = maxWidth === 100 ? 0 : (25 * 100 / maxWidth) / 2;

		setSourceImage(image.imageBase64);
		setMaxHeight(maxHeight);
		setMaxWidth(maxWidth);
		setMinWidth(minWidth);
		setMinHeight(minHeight);
		setCrop({
			x,
			y: 0,
			width: maxWidth,
			height: maxHeight,
			aspect: crop.aspect,
		});
	};

	const handleCrop = () => {
		const newImage = new Image();
		newImage.src = sourceImage;

		const canvas = document.createElement("canvas");

		const resolutionWidth = pixelCrop.width > maxSize ? maxSize : pixelCrop.width;
		const resolutionHeight = pixelCrop.height > maxSize ? maxSize : pixelCrop.height;

		canvas.width = resolutionWidth;
		canvas.height = resolutionHeight;

		const ctx = canvas.getContext("2d");

		ctx.drawImage(
			newImage,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			canvas.width,
			canvas.height,
		);

		const croppedImage = canvas.toDataURL("image/jpeg");

		onUpload(croppedImage);
		setSourceImage(null);
	};

	const closeCropPopup = () => {
		setSourceImage("");
	};

	const onImageLoaded = (crop, pixelCrop) => {
		setPixelCrop(pixelCrop);
	};

	const onCropChange = (crop, pixelCrop) => {
		setCrop(crop);
		setPixelCrop(pixelCrop);
	};

	const closeSizePopup = () => {
		setShowSizePopup(false);
	};

	return (
		<div className="upload-image">
			{open && <div className="upload-image-fullscreen" />}
			{showSizePopup && (
				<CmsPopup
					onApply={closeSizePopup}
					apply={<Translate i18nKey="CMS_UPLOAD_IMAGE_SIZE_POPUP_CANCEL" />}
				>
					<Translate i18nKey="CMS_UPLOAD_IMAGE_SIZE_POPUP_MESSAGE" />
				</CmsPopup>
			)}
			{sourceImage && (
				<CmsPopup
					onClose={closeCropPopup}
					close={<Translate i18nKey="CMS_UPLOAD_IMAGE_CROP_POPUP_CANCEL" />}
					onApply={handleCrop}
					apply={<Translate i18nKey="CMS_UPLOAD_IMAGE_CROP_POPUP_OK" />}
				>
					<div className="upload-image-crop">
						<ReactCrop
							src={sourceImage}
							crop={crop}
							onImageLoaded={onImageLoaded}
							maxWidth={maxWidth}
							maxHeight={maxHeight}
							minWidth={minWidth}
							minHeight={minHeight}
							onChange={onCropChange}
						/>
					</div>
				</CmsPopup>
			)}

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
								<Translate key="modify" i18nKey="CMS_UPLOAD_IMAGE_MODIFY" />
							</div>
						</button>
						<button className="secondary-outline-button remove" onClick={onRemoveImage}>
							<div className="button-content">
								<Translate key="remove" i18nKey="CMS_UPLOAD_IMAGE_REMOVE" />
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
							<Translate key="upload" i18nKey="CMS_UPLOAD_IMAGE_UPLOAD" />
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
