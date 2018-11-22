import React, { Component } from 'react';
import {PropTypes} from "prop-types";
import cn from "classnames";
import {getFullName} from "../actions/utils";
import Moment from "moment/moment";
import { DATE_TIME_FORMAT } from "@constants";
import {Spinner} from "./Icons";
import {humanFileSize} from "../../common/utils/listing";


const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

class AttachmentUploader extends Component {

    constructor (props) {
        super(props);

        let form = new FormData();

        this.state = {
            percentage : 60,
            failed: [],
            form : form,
            uploading : false,
            fileName: "",
            fileSize: 0,
            fileExtension: "",
            accept : props.accept || [".png", ".jpg", ".pdf"],
        };

    };

    handleUploadFile = (event) => {

        const {onFinish} = this.props;
        let fileSize = event.target.files[0].size;
        let fileName = event.target.files[0].name;
        let fileExtension = fileName.split('.').pop();

        this.state.form.append(fileSize, event.target.files[0]);

        this.setState({
            form : this.state.form,
            uploading : true,
            fileSize : fileSize,
            fileName: fileName,
            fileExtension: fileExtension
        });

        ContentArena.ContentApi.saveTmpFile(event.target.files).then((response)=>{

            if (response.success){
                this.setState({ uploading : false});
                if (onFinish) onFinish(response.file, fileName, fileSize, fileExtension);
            } else {
                this.setState((prev) => {
                    return {
                        failed : [...prev.failed, response.name],
                        uploading : false
                    }
                });
            }
        });

    };



    openFileSelector = () => {
        $("#input-message-attachment").trigger("click");
    };

    render() {

        const {
            uploading,
            fileName,
            fileSize,
            fileExtension
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
                {uploading && <div className="attachment-uploader">
                    <div className="attachment-uploader-extension">{fileExtension}</div>
                    <div className="attachment-uploader-name">{fileName}</div>
                    <div className="attachment-uploader-name"> . </div>
                    <div className="attachment-uploader-size">{humanFileSize(fileSize, false)}</div>
                    <ProgressBar percentage={this.state.percentage} />
                </div>}
            </div>
        )
    }
}

AttachmentUploader.contextTypes = {
    t: PropTypes.func.isRequired
};


export default AttachmentUploader;
