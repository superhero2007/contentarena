import React, { Component } from 'react';
import {PropTypes} from "prop-types";
import cn from "classnames";
import {getFullName} from "../actions/utils";
import Moment from "moment/moment";
import { DATE_TIME_FORMAT } from "@constants";
import {cancelIcon, Spinner} from "./Icons";
import {humanFileSize} from "../../common/utils/listing";


const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
        </div>
    )
};

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
};

class AttachmentUploader extends Component {

    constructor (props) {
        super(props);

        let form = new FormData();

        this.state = {
            percentage : 60,
            failed: [],
            form : form,
            uploading : false,
            show : false,
            success: false,
            fileName: "",
            fileSize: 0,
            fileExtension: "",
            accept : props.accept || [".png", ".jpg", ".pdf", "xls", "doc", "docx", "xlsx", "ppt"],
            sizeLimit : 1e+7,
            errorMessage : "Error",
            savedFileUri : null
        };

    };

    handleUploadFile = (event) => {

        const {onFinish} = this.props;
        const {sizeLimit} = this.state;
        let fileSize = event.target.files[0].size;
        let fileName = event.target.files[0].name;
        let fileExtension = fileName.split('.').pop();

        this.state.form.append(fileSize, event.target.files[0]);

        if (fileSize > sizeLimit ){
            this.setState({
                errorMessage : "The file size is too large and cannot be uploaded. Maximum file size: 10MB",
                uploading : false,
                show : true,
                success : false,
                fileSize : fileSize,
                fileName: fileName,
                fileExtension: fileExtension
            });
            return
        }

        this.setState({
            form : this.state.form,
            uploading : true,
            show : true,
            fileSize : fileSize,
            fileName: fileName,
            fileExtension: fileExtension
        });

        ContentArena.ContentApi.saveAttachmentFile(event.target.files).then((response)=>{

            if (response.success){
                this.setState({
                    uploading : false,
                    success : true,
                    savedFileUri: response.file
                });
                if (onFinish) onFinish(response.file, fileName, fileSize, fileExtension);
            } else {
                this.setState((prev) => {
                    return {
                        failed : [...prev.failed, response.name],
                        uploading : false,
                        success : false,
                        errorMessage : "Ooops.. There was a problem uploading this file. Please, try again."
                    }
                });
            }
        }).fail(()=>{
            this.setState({
                uploading : false,
                success : false,
                errorMessage : "Ooops.. There was a problem uploading this file. Please, try again."
            });
        });
    };

    openFileSelector = () => {
        $("#input-message-attachment").trigger("click");
    };

    close = () => {
        this.setState({ show : false});
    };

    removeFile = (savedFileUri) => {
        ContentArena.ContentApi.removeAttachmentFile(savedFileUri).then((response)=>{

        });
    };

    cancel = () => {
        const {onCancel} = this.props;
        const {savedFileUri} = this.state;
        this.close();
        if (onCancel) onCancel();
        if (savedFileUri) this.removeFile(savedFileUri);
    };

    render() {

        const {
            uploading,
            success,
            show,
            fileName,
            fileSize,
            fileExtension,
            errorMessage
        } = this.state;

        let target = "message-attachment";

        return (
            <div>
                <input
                    className="is-hidden"
                    onChange={this.handleUploadFile}
                    onClick={e=>e.target.value = null}
                    accept={this.state.accept.join(", ")}
                    id={"input-" + target}
                    type="file"
                    name={target + "[]"} />
                {show && <div className="attachment-uploader">
                    <div className="attachment-uploader-extension">{fileExtension}</div>
                    <div className="attachment-uploader-name">{fileName}</div>
                    <div className="attachment-uploader-name"> . </div>
                    <div className="attachment-uploader-size">{humanFileSize(fileSize, false)}</div>
                    <div className="attachment-uploader-close" onClick={this.cancel}>
                        <img src={cancelIcon} alt="close" />
                    </div>
                    {uploading && <ProgressBar percentage={this.state.percentage} />}
                    {!uploading && success && <div className="attachment-uploader-success">Attached</div>}
                    {!uploading && !success && <div className="attachment-uploader-error">{errorMessage}</div>}
                </div>}
            </div>
        )
    }
}

AttachmentUploader.contextTypes = {
    t: PropTypes.func.isRequired
};


export default AttachmentUploader;
