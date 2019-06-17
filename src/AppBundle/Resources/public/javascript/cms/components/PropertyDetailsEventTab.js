import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSinglePropertyByKeyValue } from "../actions/propertyActions";

class PropertyDetailsEventTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: props.image,
			description: props.description,
			newDescription: props.description,
			website: props.website,
			files: props.files,
			isEditMode: false,
		};
	}

	getImage = () => {
		const { image } = this.state;

		if (!image) {
			return <i className="fa fa-4x fa-camera" />;
		}

		return <img src={image} alt="" />;
	};

	handleRemoveImage = () => {
		this.setState({ image: "" });
	};

	handleEditDescription = () => {
		this.setState(prevState => ({ isEditMode: !prevState.isEditMode }));
	};

	handleApplyDescription = () => {
		const { newDescription } = this.state;
		this.setState({
			description: newDescription,
			isEditMode: false,
		});
	};

	handleCancelDescription = () => {
		const { description } = this.state;
		this.setState({
			newDescription: description,
			isEditMode: false,
		});
	};

	handleDescriptionChange = (e) => {
		const { value } = e.target;
		this.setState({
			newDescription: value,
		});
	};

	handleChangeWebsite = (e) => {
		const { value } = e.target;
		this.setState({ website: value });
	};

	handleSaveDescriptionAndImage = () => {
		const { description, image } = this.state;
		this.props.updateSinglePropertyByKeyValue("description", description);
		this.props.updateSinglePropertyByKeyValue("image", image);

		console.warn("we should update property on backend");
	};

	handleSaveWebsite = () => {
		const { website } = this.state;
		this.props.updateSinglePropertyByKeyValue("website", website);
		console.warn("we should update property on backend");
	};

	getSelectedFiles = () => {
		const { files } = this.state;
		if (!files || files.size === 0 || files.length === 0) return "";

		return files.name;
	};

	isDataChanged = () => this.props.description !== this.state.description
			|| this.props.image !== this.state.image;

	handleSelectFiles = (e) => {
		e.preventDefault();

		const fileReader = new FileReader();
		const files = e.target.files[0];

		fileReader.onloadend = () => {
			this.setState({
				files,
			});
			this.props.updateSinglePropertyByKeyValue("files", files);
		};


		fileReader.readAsDataURL(files);
	};

	handleSelectImage = (e) => {
		e.preventDefault();

		const imageReader = new FileReader();
		const imageFile = e.target.files[0];

		imageReader.onloadend = () => {
			this.setState({
				image: imageReader.result,
				imageFile,
			});

			this.props.updateSinglePropertyByKeyValue("image", imageReader.result);
			console.warn("we should update property on backend");
		};
		imageReader.readAsDataURL(imageFile);
	};

	render() {
		const {
			image,
			description,
			newDescription,
			website,
			isEditMode,
		} = this.state;

		return (
			<section className="property-event-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title">{this.context.t("PROPERTY_DETAILS_EVENT_TAB_TITLE")}</span>
						<span className="sub-title">{this.context.t("PROPERTY_DETAILS_EVENT_TAB_TEXT")}</span>
					</div>
				</div>

				<section className="property-event-details-wrapper">
					<div className="event-details-image">
						<div className="image-wrapper">
							{this.getImage()}
						</div>
						{!image && (
							<div className="image-upload-wrapper">
								<span>{this.context.t("PROPERTY_DETAILS_EVENT_NO_IMAGE_TEXT")}</span>

								<label htmlFor="select-image" className="ca-btn primary">
									{this.context.t("PROPERTY_DETAILS_EVENT_UPLOAD")}
									<input
										id="select-image"
										accept=".png, .jpg, .jpeg"
										type="file"
										onChange={this.handleSelectImage}
									/>
								</label>
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
							<div className="title">{this.context.t("PROPERTY_DETAILS_EVENT_DESCRIPTION_TITLE")}</div>
							<div className="description-wrapper">
								<textarea
									readOnly={!isEditMode}
									disabled={!isEditMode}
									onChange={e => this.handleDescriptionChange(e)}
									value={isEditMode ? newDescription : description}
								/>
								<div className="description-actions">
									{isEditMode
										? (
											<Fragment>
												<i className="fa fa-check-circle" onClick={this.handleApplyDescription} />
												<i className="fa fa-times-circle" onClick={this.handleCancelDescription} />
											</Fragment>
										)
										: <i className="fa fa-pencil-square-o" onClick={this.handleEditDescription} />
									}
								</div>
							</div>
							<div className="files-and-website-wrapper">
								<div className="website-wrapper">
									<div className="title">{this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_TITLE")}</div>
									<div className="input-wrapper">
										<input
											placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
											value={website}
											type="text"
											onChange={e => this.handleChangeWebsite(e)}
										/>
										<button className="ca-btn primary" onClick={this.handleSaveWebsite}>
											{this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_SAVE")}
										</button>
									</div>
								</div>
								<div className="files-wrapper">
									<div className="title">{this.context.t("PROPERTY_DETAILS_EVENT_FILES_TITLE")}</div>
									<div className="input-wrapper">
										<input
											placeholder={this.context.t("PROPERTY_DETAILS_EVENT_FILES_PLACEHOLDER")}
											type="text"
											value={this.getSelectedFiles()}
											readOnly
										/>
										<label htmlFor="select-files" className="ca-btn primary">
											{this.context.t("PROPERTY_DETAILS_EVENT_FILES_SAVE")}
											<input
												id="select-files"
												accept="image/png, image/jpg, .pdf, .doc, .docx, .cvs, .ppt, .xls, .xlsx"
												type="file"
												onChange={this.handleSelectFiles}
											/>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{this.isDataChanged() && (
					<div className="buttons">
						<button
							className="yellow-button centered-btn"
							onClick={this.handleSaveDescriptionAndImage}
						>
							{this.context.t("Apply")}
						</button>
					</div>
				)}
			</section>
		);
	}
}

PropertyDetailsEventTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

PropertyDetailsEventTab.propTypes = {
	updateSinglePropertyByKeyValue: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({
	updateSinglePropertyByKeyValue: (key, value) => dispatch(updateSinglePropertyByKeyValue(key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsEventTab);
