import React from 'react';
import { connect } from "react-redux";
import {getFullName, goToListing, limitText} from "../../main/actions/utils";
import Moment from "moment/moment";
import {PropTypes} from "prop-types";
import cn from "classnames";

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

            let selectedThread;

            r.sort((a, b) => {
                let aDate = Moment(a.lastMessageDate);
                let bDate = Moment(b.lastMessageDate);
                return (aDate > bDate) ? 1 : ((bDate > a.bDate) ? -1 : 0)
            }).reverse();

            if (this.props.match.params.customId){
                selectedThread = r.filter(t=>t.customId === this.props.match.params.customId)[0];
            } else if (r.length > 0) {
                selectedThread =  r[0] ;
            }


            this.setState({
                threads : r,
                selectedThread : selectedThread,
                loadingThreads :false
            });
            this.updateMessages();
        });
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
                        {this.context.t("MESSAGES_NO_THREADS_YET")}
                    </div> }
                    {!loadingThreads && threads.map((t,i)=>{
                        return <div className={(selectedThread && selectedThread.id === t.id) ? "thread thread-selected" : "thread"}
                                    key={"thread-" + i}
                                    onClick={()=>{this.selectThread(t)}}>
                            <div className={"date"}>
                                {t.lastMessageDate && Moment(t.lastMessageDate).format('YYYY/MM/DD')}
                            </div>
                            <div className={"listing-name"}>
                                {t.listing.name}
                            </div>
                            <div className={"company"}>
                                {t.oppositeParty.legalName}
                            </div>
                            <div className={"user"}>
                                {getFullName(t.lastMessageUser) }
                            </div>
                            <div className={"last-message"}>
                                {t.lastMessageContent && limitText(t.lastMessageContent)}
                            </div>
                        </div>
                    })}
                </div>

                {selectedThread && <div className="thread-content">
                    <div className={"thread-title"}>
                        <div className={"listing-name"} onClick={()=>{goToListing(selectedThread.listing.customId, true)}}>
                            {selectedThread.listing.name}
                        </div>
                        <div className="company-name">
                            {selectedThread.oppositeParty.legalName}
                        </div>
                    </div>
                    <div className={"messages"}>
                        {loadingMessages && messages.length ===0 && <div>
                            <i className="fa fa-cog fa-spin" />
                        </div> }
                        {!loadingMessages && messages.map((m, i)=>{
                            const ownCompanyMessage = user.company.id === m.sender.company.id;
                            const ownMessage = user.id === m.sender.id;
                            
                            return <div key={i} className={cn("message", { "own-message": ownMessage, 'own-company': ownCompanyMessage })}>
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
                            {this.context.t("MESSAGES_TITLE")}
                        </div>
                        <textarea
                            value={inputMessage}
                            onChange={(e)=>{this.setState({inputMessage : e.target.value})}}
                            className={"message-content"}
                            placeholder={this.context.t("MESSAGES_PLACEHOLDER_WRITE")}/>
                        <button className={"standard-button"}
                                onClick={this.send}
                                disabled={!inputMessage|| inputMessage === "" || saving}>
                            {!saving && this.context.t("MESSAGES_SEND_BUTTON")}
                            {saving && <i className="fa fa-cog fa-spin"/>}
                        </button>
                    </div>
                </div>}

                {!selectedThread && <div>
                    {this.context.t("MESSAGES_NO_THREAD_SELECTED")}
                </div> }
            </div>
        )
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