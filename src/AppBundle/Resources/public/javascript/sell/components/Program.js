import React, { Component } from 'react';
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import LanugageSelector, {LanguageSelector} from "../../main/components/LanguageSelector";
import {connect} from "react-redux";
import {programIsValid} from "../actions/validationActions";

class Program extends React.Component{
    constructor(props){
        super(props);

        let startYear = 2030;
        let years = [];

        for (let i =0; i < 81;i++ ){ years.push(startYear-i)}
        let program = props.programs[0] || {};

        this.state = {
            years : years,
            isOpen : props.isOpen,
            name: ( props.programs.length > 0 ) ? props.programs[0].name : "" ,
            duration : program.duration,
            episodes : program.episodes,
            language : program.language,
            releaseYear : program.releaseYear,
            script : program.script,
            subtitles : program.subtitles,
            type : program.type
        }
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});
    };

    handleChangeType = (event) => {
        this.setState({type: event.target.value});
    };

    handleChangeReleaseYear = (event) => {
        this.setState({releaseYear: event.target.value});
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
        this.props.updateProgram("add", {
            duration : program.duration,
            episodes : program.episodes,
            isOpen : false,
            language : program.language,
            name : program.name,
            releaseYear : program.releaseYear,
            script : program.script,
            subtitles : program.subtitles,
            type : program.type
        });
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
        this.applySelection();
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
                            <select onChange={this.handleChangeType} value={this.state.type} style={{ width: '100%' }}>
                                <option value="HIGHLIGHT_SHOW">Highlight show</option>
                                <option value="DOCUMENTARY">Documentary</option>
                                <option value="PREVIEW">Preview</option>
                                <option value="TALK_SHOW">Talk show</option>
                                <option value="OTHER">Other</option>
                            </select>

                        </div>

                        <div className={"modal-input"}>
                            <label>Release year</label>
                            <select onChange={this.handleChangeReleaseYear} value={this.state.releaseYear} style={{ width: '100%' }}>
                                <option/>
                                <option disabled>Year</option>
                                {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                            </select>
                        </div>

                        <div className="modal-input">
                            <label>Number of episodes</label>
                            <input
                                type="number"
                                value={this.state.episodes}
                                min={0}
                                onChange={this.handleChangeEpisodes}
                                />
                        </div>

                        <div className="modal-input">
                            <label>Average episode duration in minutes</label>
                            <input
                                type="number"
                                value={this.state.duration}
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
                        disabled={!programIsValid(this.state)}
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
