import React, { Component } from 'react';
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import LanugageSelector, {LanguageSelector} from "../../main/components/LanguageSelector";

class Program extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen : props.isOpen,
            name: props.name || '',
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

    componentWillReceiveProps(nextProps) {
        this.setState({isOpen: nextProps.isOpen});
    }

    afterOpenModal = () => {};

    closeModal = () => {
        this.setState({ isOpen: false});
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
                                value={this.state.name}
                                onChange={this.handleChangeType}
                                placeholder="Program type"/>
                        </div>

                        <div className="modal-input">
                            <label>Number of episodes</label>
                            <input
                                type="number"
                                onChange={this.handleChangeEpisodes}
                                />
                        </div>

                        <div className="modal-input">
                            <label>Average episode duration in minutes</label>
                            <input
                                type="number"
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

export default Program;
