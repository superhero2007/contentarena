import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

const rowStyle = {
    borderBottom: '1px solid #EEF3F6',
    borderRight: '1px solid #EEF3F6',
    display: 'flex'
};

const titleStyle = {
    backgroundColor: '#F4F6F9',
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

const valueStyle = {
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

class ProgramDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {programs} = this.props;
        let program = programs[0];
        return (
            <div style={{ padding:'20px 0'}}>
                <div className="full-item-box" style={{width: '50%'}}>
                    <label>PROGRAM {program.name}</label>
                    <div >
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Program type
                            </div>
                            <div style={valueStyle}>
                                {program.type}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Number of episodes
                            </div>
                            <div style={valueStyle}>
                                {program.episodes}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Average episode duration (min)
                            </div>
                            <div style={valueStyle}>
                                {program.duration}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Year of program release
                            </div>
                            <div style={valueStyle}>
                                {program.releaseYear}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Program language
                            </div>
                            <div style={valueStyle}>
                                {program.language.length === 0 && "Not available"}
                                {program.language.length > 0 && program.language.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Subtitles
                            </div>
                            <div style={valueStyle}>
                                {program.subtitles.length === 0 && "Not available"}
                                {program.subtitles.length > 0 && program.subtitles.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Script
                            </div>
                            <div style={valueStyle}>
                                {program.script.length === 0 && "Not available"}
                                {program.script.length > 0 && program.script.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgramDetails;