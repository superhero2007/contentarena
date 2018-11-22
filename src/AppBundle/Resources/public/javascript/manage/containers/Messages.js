import React from 'react';
import { connect } from "react-redux";
import {getFullName, goToListing, limitText} from "../../main/actions/utils";
import Moment from "moment/moment";
import {PropTypes} from "prop-types";
import cn from "classnames";
import { DATE_TIME_FORMAT } from "@constants";
import ChatMessage from "../../main/components/ChatMessage";
import AttachmentUploader from "../../main/components/AttachmentUploader";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threads : [],
            loadingThreads : false,
            loadingMessages : false,
            selectedThread : null,
            inputMessage : null,
            messages : []
        };
        this.attachmentUploader = React.createRef();
    }

    componentDidMount () {

        this.setState({
            loadingThreads :true
        });


        ContentArena.ContentApi.getThreads().done(threads=>{

            let selectedThread, customId = this.props.match.params.customId;

            threads = threads.filter(t=>t.lastMessageContent !== undefined || (customId && t.customId === customId));

            if (customId){
                selectedThread = threads.filter(t=>t.customId === this.props.match.params.customId)[0];
            } else if (threads.length > 0) {
                selectedThread =  threads[0] ;
            }

            this.setState({
                threads : threads,
                selectedThread : selectedThread,
                loadingThreads :false
            });
            this.updateMessages();
        });

        document.title = "Content Arena - Messages";
    }

    selectThread = (selectedThread) => {
        const {history} = this.props;

        history.push("/messages/" + selectedThread.customId);

    };

    updateMessages = (thread) => {
        let selectedThread = thread || this.state.selectedThread;

        if (!selectedThread) return;

        this.setState({
            loadingMessages :true,
            messages: []
        });

        ContentArena.ContentApi.getThread(selectedThread.customId).done(r=>{
            this.setState({
                loadingMessages :false,
                messages : r
            });
        });
    };

    send = () => {
        const {
            selectedThread,
            inputMessage,
            messages
        } = this.state;

        let message = {
            content : inputMessage,
            thread : selectedThread.id,
            listing : selectedThread.listing.id
        };

        this.setState({inputMessage : "", saving : true});

        ContentArena.ContentApi.sendMessage(message).done(r=>{
            this.setState({saving : false, showSuccess : true,  messages: [...messages, r]})
        });
    };

    sendAttachment = (fileUrl,fileName, fileSize, fileExtension ) => {
        const {
            selectedThread,
            messages
        } = this.state;

        let message = {
            attachment : true,
            fileName: fileName,
            fileSize: fileSize,
            fileExtension : fileExtension,
            content : fileUrl,
            thread : selectedThread.id,
            listing : selectedThread.listing.id
        };

        this.setState({saving : true});

        ContentArena.ContentApi.sendMessage(message).done(r=>{
            this.setState({saving : false, showSuccess : true,  messages: [...messages, r]})
        });
    };

    render () {
        const {
            loadingThreads,
            threads
        } = this.state;

        return (
            <div className={"messages-container"}>
                {!loadingThreads && threads.length === 0 ? this.renderNoMessages() : this.renderMessages()}
            </div>
        )
    }

    openAttachmentUploader = () => {
        this.attachmentUploader.current.openFileSelector();
    };

    renderNoMessages() {
        return (
            <div className='no-messages'>{this.context.t("MESSAGES_NO_MESSAGES_YET")}</div>
        );
    }

    renderMessages() {
        const {
            loadingThreads,
            loadingMessages,
            selectedThread,
            threads,
            inputMessage,
            messages,
            saving,
        } = this.state;

        const {user} = this.props;

        return (
            <React.Fragment>
                <div className={"threads"}>
                    <div className={'thread-title'}>
                        {this.context.t("Messages")}
                    </div>

                    <div className="thread-wrapper ca-overflow">
                        {loadingThreads && threads.length === 0 && <i className="fa fa-cog fa-spin"/>}
                        {!loadingThreads && threads.length === 0 && <div>{this.context.t("MESSAGES_NO_THREADS_YET")}</div>}
                        {!loadingThreads && threads.map((t, i) => {
                            return <div
                                className={(selectedThread && selectedThread.id === t.id) ? "thread thread-selected" : "thread"}
                                key={"thread-" + i}
                                onClick={() => {
                                    this.selectThread(t)
                                }}>
                                <div className={"date"}>
                                    {Moment(t.lastMessageDate).format(`${DATE_TIME_FORMAT}`)}
                                </div>
                                <div className={"listing-name"}>
                                    {t.listing.name}
                                </div>
                                <div className={"company"}>
                                    {t.oppositeParty.legalName}
                                </div>
                                <div className={"user"}>
                                    {t.lastMessageUser ? getFullName(t.lastMessageUser) : ''}
                                </div>
                                <div className={"last-message"}>
                                    {t.lastMessageContent && limitText(t.lastMessageContent)}
                                </div>
                            </div>
                        })}
                    </div>

                </div>

                {selectedThread && (
                    <div className="thread-content">
                        <div className={"thread-title"}>
                            <div className={"listing-name ca-title"} onClick={() => {
                                goToListing(selectedThread.listing.customId, true)
                            }}>
                                {selectedThread.listing.name}
                            </div>
                            <div className="company-name">
                                <i className="fa fa-user-o icon"/>
                                {selectedThread.oppositeParty.legalName}
                            </div>
                        </div>
                        <div className={"messages ca-overflow"}>
                            {loadingMessages && messages.length === 0 && <div>
                                <i className="fa fa-cog fa-spin"/>
                            </div>}
                            {!loadingMessages && messages.map((m, i) => {
                                const ownCompanyMessage = user.company.id === m.sender.company.id;
                                const ownMessage = user.id === m.sender.id;
                                return <ChatMessage
                                    key={i}
                                    ownMessage={ownMessage}
                                    ownCompanyMessage={ownCompanyMessage}
                                    message={m} />
                            }).reverse()}

                        </div>
                        <AttachmentUploader
                            ref={this.attachmentUploader}
                            onFinish={this.sendAttachment}
                        />
                        <div className={"message-input"}>
                            <div className={"message-input-title"}>
                                {this.context.t("MESSAGES_TITLE")}
                            </div>
                            <div className="d-flex align-items-center">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => {
                                      this.setState({inputMessage: e.target.value})
                                    }}
                                    className={"message-content"}
                                />
                                <button className={"standard-button"} onClick={this.send}
                                        disabled={!inputMessage || inputMessage === "" || saving}>
                                    {!saving && this.context.t("MESSAGES_SEND_BUTTON")}
                                    {saving && <i className="fa fa-cog fa-spin"/>}
                                </button>
                            </div>
                            <div className="attachment-icon"
                                 onClick={()=>{
                                     this.openAttachmentUploader();
                                 }}
                            >
                                <i className="fa fa-paperclip icon"/>
                            </div>
                        </div>
                    </div>
                )}

                {!selectedThread && (
                    <div style={{padding:'0 15px'}}>
                        {this.context.t("MESSAGES_NO_THREAD_SELECTED")}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

Messages.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages)