import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsUploadImage from "./CmsUploadImage";
import { updateProperty } from "../actions/propertyActions";
import CmsFileUpload from "./CmsFileUpload";

class PropertyDetailsDescriptionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: props.image || "",
			imageBase64: "",
			description: props.description || "",
			website: props.website || "",
			attachments: props.attachments ? props.attachments.slice(0) : [],
			uploading: false,
		};
	}

	getImage = () => {
		const { image, imageBase64 } = this.state;

		return imageBase64 || image;
	};

	handleDescriptionChange = (e) => {
		const { value } = e.target;
		this.setState({ description: value });
	};

	handleChangeWebsite = (e) => {
		const { value } = e.target;
		this.setState({ website: value });
	};

	handleReset = () => {
		const {
			image, description, website, attachments,
		} = this.props;
		this.setState({
			image: image || "",
			imageBase64: "",
			description: description || "",
			website: website || "",
			attachments: attachments.slice(0) || [],
			uploading: false,
		});
	};

	handleSave = () => {
		const {
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
		if (imageBase64) {
			updateObj.imageBase64 = imageBase64;
		}
		updateProperty(updateObj);
	};

	addFile = (files) => {
		const { attachments } = this.state;
		this.isUploading(true);
		ContentArena.ContentApi.saveTmpFile(files)
			.then((response) => {
				if (response.success) {
					attachments.push({
						file: response.file,
						name: response.name,
						size: response.size,
					});
					this.setState({ attachments });
				}
				this.isUploading(false);
			});
	};

	removeFile = (index) => {
		const { attachments } = this.state;
		attachments.splice(index, 1);
		this.setState({ attachments });
	};

	isUploading = (uploading) => {
		this.setState({ uploading });
	};

	onUpload = (imageBase64) => {
		this.setState({ imageBase64 });
	};

	onRemove = () => {
		this.setState({ image: "", imageBase64: "" });
	};

	render() {
		const {
			description,
			website,
			attachments,
			uploading,
		} = this.state;
		const { loading } = this.props;

		return (
			<section className="property-description-tab">
				<CmsUploadImage
					image={this.getImage()}
					onUpload={this.onUpload}
					onRemove={this.onRemove}
					isUploading={this.isUploading}
				/>

				<div className="description">
					<div className="description-event">
						<label>
							<Translate i18nKey="PROPERTY_DETAILS_EVENT_DESCRIPTION_TITLE" />
						</label>
						<textarea
							className="input-textarea"
							onChange={this.handleDescriptionChange}
							value={description}
						/>
					</div>
					<div className="description-files">
						<label>
							<Translate i18nKey="PROPERTY_DETAILS_EVENT_FILES_TITLE" />
						</label>
						<CmsFileUpload
							attachments={attachments}
							onUpload={this.addFile}
							onRemove={this.removeFile}
						/>

					</div>
					<div className="description-website">
						<label>
							<Translate i18nKey="PROPERTY_DETAILS_EVENT_WEBSITE_TITLE" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
								value={website}
								onChange={this.handleChangeWebsite}
							/>
						</div>
					</div>
					<div className="description-action">
						<button
							className="secondary-outline-button"
							disabled={loading || uploading}
							onClick={this.handleReset}
						>
							<div className="button-content">
								RESET
							</div>
						</button>
						<button
							className="secondary-button"
							onAnimationEnd={this.handleSave}
							disabled={loading || uploading}
						>
							<div className="button-content">
								<Translate i18nKey="PROPERTY_DETAILS_EVENT_WEBSITE_SAVE" />
							</div>
						</button>
					</div>
				</div>
			</section>
		);
	}
}

PropertyDetailsDescriptionTab.contextTypes = {
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
)(PropertyDetailsDescriptionTab);
