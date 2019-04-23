import React, { Component } from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import Moment from "moment/moment";
import { getFullName } from "../actions/utils";
import { DATE_TIME_FORMAT } from "@constants";
import { humanFileSize } from "../../common/utils/listing";

class ChatMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { message, ownMessage, ownCompanyMessage } = this.props;

		return (
			<div className={cn("message", {
				"own-message": ownMessage,
				"own-company": ownCompanyMessage,
			})}
			>
				<div className="message-sender">
					{getFullName(message.sender)}
				</div>
				<div className="message-date">
					{Moment(message.createdAt).format(`${DATE_TIME_FORMAT}`)}
				</div>
				{message.attachment
					&& (
						<a
							className="attachment-uploader attachment-uploader-file"
							href={hosturl + message.filePath}
							download={message.fileName}
						>
							<div className="attachment-uploader-extension">{message.fileExtension}</div>
							<div className="attachment-uploader-name">{message.fileName}</div>
							<div className="attachment-uploader-name"> .</div>
							<div className="attachment-uploader-size">{humanFileSize(message.fileSize, false)}</div>
						</a>
					)}
				{message.content && (
					<div className="message-content">
						{message.content}
					</div>
				)}
			</div>
		);
	}
}

ChatMessage.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default ChatMessage;
