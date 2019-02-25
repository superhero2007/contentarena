import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Modal from "react-modal";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import { bucketIcon } from "./Icons";

const FileItem = ({ item, onClick }) => (
  <div style={{
    border: "1px solid lightgray",
    padding: 10,
    marginTop: 5,
    cursor: "normal",
  }}
  >
    {item.name}
    {" "}
    <img style={{ right: 10, position: "absolute", cursor: "pointer" }} src={`${assetsBaseDir}app/images/cancel.png`} onClick={onClick} />
  </div>
);

const InvalidFileItem = ({ item, onClick }) => (
  <div style={{
    border: "1px solid red",
    padding: 10,
    marginTop: 5,
    cursor: "normal",
    color: "red",
  }}
  >
    {item}
    {" "}
has an invalid format
    <img style={{ right: 10, position: "absolute", cursor: "pointer" }} src={`${assetsBaseDir}app/images/cancel.png`} onClick={onClick} />
  </div>
);

const imageStyle = {
  maxHeight: 250,
  marginBottom: 5,
  marginTop: 10,
};

class FileSelector extends Component {
  constructor(props) {
    super(props);

    const form = new FormData();

    this.state = {
      failed: [],
      form,
      uploading: false,
      image: null,
      accept: props.accept || [".png", ".jpg"],
      croppedImage: (props.imageBase64) ? props.imageBase64 : null,
      pixelCrop: null,
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        aspect: 1 / 1,
      },
    };

    this.cropSize = {
      max: 1024,
      min: 450,
    };
  }

    handleUploadFile = (event) => {
      const {
        isImage, onSelect, target, tmp,
      } = this.props;
      const _this = this;

      this.state.form.append(event.target.files[0].size, event.target.files[0]);
      this.setState({
        form: this.state.form,
      });

      if (tmp) {
        this.setState({ uploading: true });

        ContentArena.ContentApi.saveTmpFile(event.target.files).then((response) => {
          if (response.success) {
            if (onSelect) onSelect(response);
            this.setState({ uploading: false });
          } else {
            this.setState(prev => ({
              failed: [...prev.failed, response.name],
              uploading: false,
            }));
          }
        });
      }

      if (isImage) {
        this.getBase64(event.target.files[0], (res) => {
          const {
            maxWidth, maxHeight, minHeight, minWidth,
          } = this.getCropSize(res);

          _this.setState(state => ({
            image: res.imageBase64,
            maxWidth,
            maxHeight,
            minHeight,
            minWidth,
            isImageSizeFit: res.imageWidth >= this.cropSize.min && res.imageHeight >= this.cropSize.min,
            crop: {
              ...state.crop,
              x: this.getCropPosition(maxWidth),
              y: 0,
              width: maxWidth,
              height: maxHeight,
            },
            croppedImage: null,
          }));
        });
      }
    };

    getCropSize = (userImage) => {
      const { imageWidth, imageHeight } = userImage;
      let maxWidth;
      let maxHeight;
      let minWidth;
      let minHeight;

      if (imageWidth > imageHeight) {
        maxHeight = 100;
        maxWidth = imageHeight * 100 / imageWidth;
      } else {
        maxWidth = 100;
        maxHeight = imageWidth * 100 / imageHeight;
      }

      minHeight = this.cropSize.min * 100 / imageHeight;
      minWidth = this.cropSize.min * 100 / imageWidth;

      return {
        maxWidth, maxHeight, minWidth, minHeight,
      };
    }

    getCropPosition = (maxWidth) => {
      let pos = (25 * 100 / maxWidth) / 2;
      if (maxWidth === 100) pos = 0;
      return pos;
    }

    getCroppedImg = (image, pixelCrop) => {
      const canvas = document.createElement("canvas");

      const resolutionWidth = pixelCrop.width > this.cropSize.max ? this.cropSize.max : pixelCrop.width;
      const resolutionHeight = pixelCrop.height > this.cropSize.max ? this.cropSize.max : pixelCrop.height;

      canvas.width = resolutionWidth;
      canvas.height = resolutionHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      return canvas.toDataURL("image/jpeg");
    }

    getItems = () => {
      const list = [];
      for (const value of this.state.form.values()) {
        list.push(value);
      }
      return list;
    };

    remove = (name) => {
      this.state.form.delete(name);
      this.setState({ form: this.state.form });
    };

    removeFailed = (index) => {
      this.setState((prev) => {
        prev.failed.splice(index, 1);

        return {
          failed: prev.failed,
        };
      });
    };

    getBase64 = (file, cb) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          cb({
            imageBase64: reader.result,
            imageWidth: image.width,
            imageHeight: image.height,
          });
        };
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };

    closeModal = () => {
      this.setState({ image: null });
    }

    onCropChange = (crop, pixelCrop) => {
      this.setState({ crop, pixelCrop });
    }

    handleCrop = () => {
      const { onSelect, target } = this.props;
      const { image, pixelCrop } = this.state;

      if (onSelect) {
        const newImage = new Image();
        newImage.src = image;

        const croppedImage = this.getCroppedImg(newImage, pixelCrop);

        onSelect(target, croppedImage);
        onSelect("image", null);

        this.setState({ image: null, croppedImage });
      }
    }

    onImageLoaded = (crop, pixelCrop) => {
      this.setState({ pixelCrop });
    }

    handleRemoveFile = () => {
      const { onSelect, target } = this.props;

      if (onSelect) {
        this.setState({
          image: null,
          croppedImage: null,
        });

        onSelect("image", null);
        onSelect(target, null);
      }
    }

    render() {
      const {
        label, isImage, previousImage, selected, onRemove, infoText,
      } = this.props;
      const {
        image, uploading, failed, crop, croppedImage, isImageSizeFit,
      } = this.state;
      const {
        maxWidth, maxHeight, minHeight, minWidth,
      } = this.state;

      const isImageCropEnabled = isImage && image && !croppedImage;

      return (
        <div className="base-input custom-selector" style={{ flexDirection: "column" }}>
          <div className="d-flex">
            <label>
              {(label) || "Files"}
              {infoText && (
                <i className="fa fa-info-circle tooltip-icon" title={infoText} />
              )}
            </label>
            <button
              className="standard-button"
              disabled={uploading}
              onClick={() => { $(`#input-${this.props.target}`).trigger("click"); }}
            >
              {this.context.t("Upload")}
            </button>

            {isImageCropEnabled && !isImageSizeFit && (
            <span style={{ padding: "6px 15px" }} className="text-danger">
              {this.context.t("CL_STEP1_IMAGE_SMALL")}
            </span>
            )}

            {croppedImage && (
            <img src={bucketIcon} style={{ cursor: "pointer", marginLeft: 10, objectFit: "contain" }} onClick={this.handleRemoveFile} />
            )}
            <input
              className="is-hidden"
              onChange={this.handleUploadFile}
              onClick={e => e.target.value = null}
              accept={this.state.accept.join(", ")}
              id={`input-${this.props.target}`}
              type="file"
              name={`${this.props.target}[]`}
            />
            {uploading && <i className="fa fa-cog fa-spin" />}
          </div>
          <div>
            {failed && failed.map((item, i) => <InvalidFileItem key={`failed${i}`} item={item} onClick={() => this.removeFailed(i)} />)}

            {selected && selected.length > 0 && selected.map((s, i) => <FileItem key={`key-${i}`} item={{ name: s.name }} onClick={onRemove} />)}

            {isImageCropEnabled && isImageSizeFit && (
            <Modal
              isOpen
              onRequestClose={this.closeModal}
              bodyOpenClassName="ca-modal-open"
              className="ca-modal"
              overlayClassName="ca-modal-overlay"
            >
              <div style={{ padding: 15 }} className="text-center">
                <ReactCrop
                  src={image}
                  crop={crop}
                  onImageLoaded={this.onImageLoaded}
                  maxWidth={maxWidth}
                  maxHeight={maxHeight}
                  minWidth={minWidth}
                  minHeight={minHeight}
                  onChange={this.onCropChange}
                />

                <div className="text-center" style={{ padding: 15 }}>
                  <div className="ca-btn primary" onClick={this.handleCrop}>
                                            OK
                  </div>
                </div>
              </div>
            </Modal>
            )}

            {croppedImage && <img src={croppedImage} style={imageStyle} alt="" />}

            {previousImage && <img src={`${assetsBaseDir}../${previousImage}`} style={imageStyle} />}

          </div>
        </div>
      );
    }
}

FileSelector.contextTypes = {
  t: PropTypes.func.isRequired,
};


export default FileSelector;
