import React, { Component } from 'react';
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import LanugageSelector, {LanguageSelector} from "../../main/components/LanguageSelector";
import {connect} from "react-redux";

class Program extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : props.isOpen,
            name: ( props.programs.length > 0 ) ? props.programs[0].name : "" ,
            language : null
        }
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});
    };

    handleChangeType = (event) => {
        this.setState({type: event.target.value});
    };

    handleChangeEpisodes = (event) => {
        this.setState({episodes: event.target.value});
    };

    handleChangeDuration = (event) => {
        this.setState({duration: event.target.value});
    };

    handleLanguageChange = (value) => {
        this.setState({language: value});
    };

    handleScriptChange = (value) => {
        this.setState({script: value});
    };

    handleSubtitlesChange = (value) => {
        this.setState({subtitles: value});
    };

    addProgram = ( program ) => {
        this.props.updateProgram("add", program);
    };

    updateProgram = ( program, index ) => {
        this.props.updateProgram("save", program, index);
    };

    removeProgram = ( index ) => {
        this.props.updateProgram("remove", null, index);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({isOpen: nextProps.isOpen});
    }

    afterOpenModal = () => {};

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    applySelection  = () => {
        const { onClose } = this.props;
        this.setState({ isOpen: false});
        this.addProgram(this.state);
        onClose();
    };

    render(){

        const { onClose } = this.props;
        return (
            <Modal
                isOpen={this.state.isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                bodyOpenClassName={"selector"}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="modal-title">
                    Program details
                    <i className="fa fa-times-circle-o" onClick={onClose}/>
                </div>

                <div className="step-content">
                    <div className="step-content-container">
                        <div className="modal-input">
                            <label>Enter program name</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChangeName}
                                placeholder="Program name"/>
                        </div>
                        <div className="modal-input">
                            <label>Enter program type</label>
                            <input
                                type="text"
                                value={this.state.type}
                                onChange={this.handleChangeType}
                                placeholder="Program type"/>
                        </div>

                        <div className="modal-input">
                            <label>Number of episodes</label>
                            <input
                                type="number"
                                min={0}
                                onChange={this.handleChangeEpisodes}
                                />
                        </div>

                        <div className="modal-input">
                            <label>Average episode duration in minutes</label>
                            <input
                                type="number"
                                min={0}
                                onChange={this.handleChangeDuration}
                            />
                        </div>

                        <div className="modal-input">
                            <label>Program language</label>
                            <LanguageSelector value={this.state.language} onChange={this.handleLanguageChange}/>
                        </div>

                        <div className="modal-input">
                            <label>Subtitles (if available)</label>
                            <LanguageSelector value={this.state.subtitles} onChange={this.handleSubtitlesChange}/>
                        </div>

                        <div className="modal-input">
                            <label>Script (if available)</label>
                            <LanguageSelector value={this.state.script} onChange={this.handleScriptChange}/>
                        </div>

                    </div>
                </div>

                <div className={"buttons"}>
                    <button
                        className={"standard-button"}
                        onClick={this.applySelection}>Ok</button>
                </div>
            </Modal>
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
        }),
        updateProgram : (name, program, index) => dispatch({
            type: 'UPDATE_PROGRAMS',
            index: index,
            program : program,
            name: name
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Program)
