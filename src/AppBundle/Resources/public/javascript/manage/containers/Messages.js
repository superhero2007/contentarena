import React from 'react';
import { connect } from "react-redux";
import {getFullName, goTo, limitText} from "../../main/actions/utils";
import BoardListing from '../components/BoardListing';
import Moment from "moment/moment";

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
    }

    componentDidMount () {
        this.setState({
            loadingThreads :true
        });
        ContentArena.ContentApi.getThreads().done(r=>{

            r.sort((a, b) => {
                let aDate = Moment(a.lastMessageDate);
                let bDate = Moment(b.lastMessageDate);
                return (aDate > bDate) ? 1 : ((bDate > a.bDate) ? -1 : 0)
            }).reverse();

            this.setState({
                threads : r,
                selectedThread : (this.state.selectedThread) ? this.state.selectedThread : (r.length > 0) ? r[0] : null,
                loadingThreads :false
            });
            this.updateMessages();
        });
    }

    selectThread = (thread) => {
        this.setState({
            selectedThread :thread
        });

        this.updateMessages(thread);
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

    render () {
        const {
            loadingThreads,
            loadingMessages,
            selectedThread,
            threads,
            inputMessage,
            messages,
            saving
        } = this.state;

        const { user } = this.props;

        return (
            <div className={"messages-container"}>
                <div className={"threads"}>
                    {loadingThreads && threads.length ===0 && <i className="fa fa-cog fa-spin" /> }
                    {!loadingThreads && threads.length ===0 && <div>
                        No threads yet
                    </div> }
                    {!loadingThreads && threads.map((t,i)=>{
                        return <div className={(selectedThread.id === t.id) ? "thread thread-selected" : "thread"}
                                    key={"thread-" + i}
                                    onClick={()=>{this.selectThread(t)}}>
                            <div className={"date"}>
                                {t.lastMessageDate && Moment(t.lastMessageDate).format('YYYY/MM/DD')}
                            </div>
                            <div className={"listing-name"}>
                                {t.listing.name}
                            </div>
                            <div className={"company"}>
                                {t.listing.company.legalName}
                            </div>
                            <div className={"user"}>
                                {getFullName(t.user) }
                            </div>
                            <div className={"last-message"}>
                                {t.lastMessageContent && limitText(t.lastMessageContent)}
                            </div>
                        </div>
                    })}
                </div>

                {selectedThread && <div className={"thread-content"}>
                    <div className={"thread-title"}>
                        <div className={"listing-name"}>
                            {selectedThread.listing.name}
                        </div>
                        <div className={"company-name"}>
                            {selectedThread.listing.company.legalName}
                        </div>
                    </div>
                    <div className={"messages"}>
                        {loadingMessages && messages.length ===0 && <div>
                            <i className="fa fa-cog fa-spin" />
                        </div> }
                        {!loadingMessages && messages.map((m,i)=>{
                            return <div className={(user===m.sender.email) ? "message own-message" : "message"}>
                                <div className={"message-sender"}>
                                    {getFullName(m.sender)}
                                </div>
                                <div className={"message-content"}>
                                    {m.content}
                                </div>
                                <div className={"message-date"}>
                                    {Moment(m.createdAt).format('YYYY/MM/DD HH:mm')}
                                </div>
                            </div>
                        })}

                    </div>
                    <div className={"message-input"}>
                        <div className={"message-input-title"}>
                            Write a message
                        </div>
                        <textarea
                            value={inputMessage}
                            onChange={(e)=>{this.setState({inputMessage : e.target.value})}}
                            className={"message-content"}
                            placeholder={"write a message"}/>
                        <button className={"standard-button"}
                                onClick={this.send}
                                disabled={!inputMessage|| inputMessage === "" || saving}>
                            {!saving && "Send"}
                            {saving && <i className="fa fa-cog fa-spin"/>}
                        </button>
                    </div>
                </div>}

                {!selectedThread && <div>No thread selected</div> }
            </div>
        )
    }
}

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