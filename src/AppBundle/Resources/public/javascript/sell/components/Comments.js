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
        };
    }

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    updateContent = (e) => {

        const {propName} = this.props;

        this.props.updateContentValue(propName, e.target.value);
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
                <div style={{ width: "470px"}}>
                    {this.context.t("CL_STEP3_AMENDMENT")}
                </div>
                <i className="fa fa-times close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content" style={{ padding: "0 15px 5px"}}>
                <div className="step-content-container">

                    <div className="base-full-input">
                        <textarea
                            className={"big-textarea"}
                            onChange={this.updateContent}
                            value={comments}/>
                    </div>
                </div>
            </div>

            <div className={"buttons popup-buttons"}>
                <button
                    className={"standard-button"}
                    onClick={this.closeModal}>
                    {this.context.t("Accept")}
                </button>
            </div>
        </Modal>
    };

    render(){
        return (
            <div style={{marginBottom: 20}}>
                { this.renderModal() }
                <button className={"link-button"} onClick={this.addComments}>
                    {this.context.t("CL_STEP3_AMENDMENT")}
                </button>
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