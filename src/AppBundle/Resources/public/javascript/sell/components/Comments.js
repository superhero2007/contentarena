import React from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {PropTypes} from "prop-types";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            typedComment:''
        };

        this.commentField = React.createRef();
    }

    addComment = () => {
        this.setState({isAddComment: true});

        setTimeout(()=>{
            this.commentField.current.focus();
        },100)
    }

    cancelComment = () => {
        this.setState({isAddComment: false})
    }

    saveComment = () => {
        const {onClose, propName} = this.props;
        const {typedComment} = this.state;

        this.props.updateContentValue(propName, typedComment);

        this.setState({ isAddComment: false});
        if ( onClose) onClose()
    }

    changeComment = (e) => {
        this.setState({typedComment: e.target.value})
    }


    render(){
        const {comments} = this.props;
        const {isAddComment} = this.state;

        const isCommentsExisted = (comments && comments !== '');

        const commentsView = isCommentsExisted && !isAddComment;
        const addCommentButton = !isCommentsExisted && !isAddComment;


        return (
            <div className="amendment-view">

                {addCommentButton && (
                    <div className="d-flex align-items-center justify-content-between">
                        <div style={{marginLeft: 'auto'}}>
                            {this.context.t("CL_STEP5_ADD_AMENDMENT_INFO")}
                        </div>
                        <button className="ca-btn primary" onClick={this.addComment} style={{marginLeft: 20}}>
                            {this.context.t("CL_STEP5_ADD_AMENDMENT")}
                        </button>
                    </div>
                )}

                {commentsView && (
                    <div>
                        <div className="cap">
                            {this.context.t("CL_STEP5_ADD_AMENDMENT_INFO")}
                        </div>
                        <div className="d-flex">
                            <textarea value={comments} readOnly disabled/>
                            <div onClick={this.addComment}>
                                <i className="fa fa-pencil-square edit-icon" />
                            </div>
                        </div>
                    </div>
                )}

                {isAddComment && (
                    <div>
                        <div className="cap">
                            {this.context.t("CL_STEP5_ADD_AMENDMENT_INFO")}
                        </div>
                        <textarea
                            defaultValue={isCommentsExisted ? comments : ''}
                            onChange={this.changeComment}
                            ref={this.commentField}
                        />

                        <div className="d-flex justify-content-end">
                            <div className="ca-btn" onClick={this.cancelComment}>
                                {this.context.t("Cancel")}
                            </div>
                            <button className="ca-btn primary" onClick={this.saveComment}>
                                {this.context.t("Save")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

Comments.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)