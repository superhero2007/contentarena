import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader/Loader";
import FileSelector from "../../main/components/FileSelector";
import { updateProperty } from "../actions/propertyActions";

class PropertyDetailsEventTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: props.image || "",
			imageBase64: "",
			description: props.description || "",
			website: props.website || "",
			attachments: props.attachments || [],
		};
	}

	getImage = () => {
		const { image, imageBase64 } = this.state;

		if (!image && !imageBase64) {
			return <i className="fa fa-4x fa-camera" />;
		}

		return <img src={imageBase64 || `/${image}`} alt="" />;
	};

	handleRemoveImage = () => {
		this.setState({ image: "", imageBase64: "" });
	};

	handleDescriptionChange = (e) => {
		const { value } = e.target;
		this.setState({ description: value });
	};

	handleChangeWebsite = (e) => {
		const { value } = e.target;
		this.setState({ website: value });
	};

	handleSave = () => {
		const {
			image,
			imageBase64,
			description,
			website,
			attachments,
		} = this.state;
		const { customId, updateProperty } = this.props;
		const updateObj = {
			customId,
			description,
			website,
			attachments,
		};
		if (!image) {
			updateObj.imageBase64 = imageBase64;
		}
		updateProperty(updateObj);
	};

	addFile = (response) => {
		const { attachments } = this.state;
		attachments.push({
			file: response.file,
			name: response.name,
		});
		this.setState({ attachments });
	};

	removeFile = (index) => {
		const { attachments } = this.state;
		attachments.splice(index, 1);
		this.setState({ attachments });
	};

	handleSelectImage = (key, imageBase64) => {
		if (key === "imageBase64") {
			this.setState({ imageBase64 });
		}
	};

	render() {
		const {
			image,
			imageBase64,
			description,
			website,
			attachments,
		} = this.state;
		const { loading } = this.props;

		return (
			<section className="property-event-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title"><Translate i18nKey="PROPERTY_DETAILS_EVENT_TAB_TITLE" /></span>
						<span className="sub-title"><Translate i18nKey="PROPERTY_DETAILS_EVENT_TAB_TEXT" /></span>
					</div>
				</div>

				<section className="property-event-details-wrapper">
					<div className="event-details-image">
						<div className="image-wrapper">
							{this.getImage()}
						</div>
						{!image && !imageBase64 && (
							<div className="image-upload-wrapper">
								<span className="image-upload-wrapper__title"><Translate i18nKey="PROPERTY_DETAILS_EVENT_NO_IMAGE_TEXT" /></span>

								<FileSelector
									label=" "
									isImage
									accept={[".png", ".jpg", ".jpeg"]}
									onSelect={this.handleSelectImage}
									buttonClassName="ca-btn primary image-upload-wrapper__button"
									imageBase64={imageBase64}
									target="imageBase64"
									hideRemoveButton
								/>
							</div>
						)}
						{image && (
							<div className="image-actions">
								<i className="fa fa-pencil-square-o" onClick={() => console.warn("not specify")} />
								<i className="fa fa-trash" onClick={this.handleRemoveImage} />
							</div>
						)}
					</div>
					<div className="event-description">
						<div className="description-block">
							<div className="title"><Translate i18nKey="PROPERTY_DETAILS_EVENT_DESCRIPTION_TITLE" /></div>
							<div className="description-wrapper">
								<textarea
									onChange={e => this.handleDescriptionChange(e)}
									value={description}
								/>
							</div>
							<div className="files-and-website-wrapper">
								<div className="website-wrapper">
									<div className="title">
										<Translate i18nKey="PROPERTY_DETAILS_EVENT_WEBSITE_TITLE" />
									</div>
									<div className="input-wrapper">
										<input
											placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
											value={website}
											type="text"
											onChange={e => this.handleChangeWebsite(e)}
										/>
									</div>
								</div>
								<div className="files-wrapper">
									<div className="title"><Translate i18nKey="PROPERTY_DETAILS_EVENT_FILES_TITLE" /></div>
									<div className="input-wrapper">
										<FileSelector
											label=" "
											target="attachments"
											selected={attachments}
											onSelect={this.addFile}
											onRemove={this.removeFile}
											accept={["image/png", "image/jpg", ".pdf", ".doc", ".docx", ".cvs", ".ppt", ".xls", ".xlsx"]}
											acceptType={[
												"image/jpeg",
												"image/png",
												"application/pdf",
											]}
											tmp
											buttonClassName="ca-btn primary input-wrapper__button"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="buttons">
					<button
						className="yellow-button centered-btn"
						onClick={this.handleSave}
						disabled={loading}
					>
						{loading ? <Loader loading xSmall /> : <Translate i18nKey="Apply" />}
					</button>
				</div>
			</section>
		);
	}
}

PropertyDetailsEventTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	loading: state.propertyDetails.loading,
	...state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({
	updateProperty: value => dispatch(updateProperty(value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsEventTab);
