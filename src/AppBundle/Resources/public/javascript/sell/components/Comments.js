import React from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    updateContent = (e) => {

        this.props.updateContentValue("comments", e.target.value);
    };

    addComments = () =>{
        this.setState({isOpen:true});
    };

    renderModal = () => {

        const { comments } = this.props;

        return <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div className="modal-title">
                Add further comments
                <i className="fa fa-times-circle-o" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <textarea
                            className={"big-textarea"}
                            onChange={this.updateContent}
                            value={comments}/>
                    </div>
                </div>
            </div>

            <div className={"buttons"}>
                <button
                    className={"standard-button"}
                    onClick={this.closeModal}>Ok</button>
            </div>
        </Modal>
    };

    render(){
        return (
            <div >
                { this.renderModal() }
                <button className={"link-button"} onClick={this.addComments}>Add further comments</button>
            </div>
        )
    }
}

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