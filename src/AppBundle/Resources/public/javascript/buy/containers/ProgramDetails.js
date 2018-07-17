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
        const {
            PROGRAM_NAME,
            PROGRAM_YEAR,
            PROGRAM_DESCRIPTION,
            PROGRAM_DURATION,
            PROGRAM_EPISODES,
            PROGRAM_TYPE,
            PROGRAM_LANGUAGE,
            PROGRAM_SCRIPTS,
            PROGRAM_SUBTITLES
        } = this.props;
        return (
            <div style={{ padding:'20px 0'}}>
                <div className="full-item-box" style={{width: '50%'}}>
                    <label>PROGRAM {PROGRAM_NAME}</label>
                    <div >
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Program type
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_TYPE}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Number of episodes
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_EPISODES}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Average episode duration (min)
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_DURATION}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Year of program release
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_YEAR}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Program language
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_LANGUAGE === 0 && "Not available"}
                                {PROGRAM_LANGUAGE.length > 0 && PROGRAM_LANGUAGE.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Subtitles
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_SUBTITLES.length === 0 && "Not available"}
                                {PROGRAM_SUBTITLES.length > 0 && PROGRAM_SUBTITLES.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Script
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_SCRIPTS.length === 0 && "Not available"}
                                {PROGRAM_SCRIPTS.length > 0 && PROGRAM_SCRIPTS.map(l=>l.label).join(', ')}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Description
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_DESCRIPTION && PROGRAM_DESCRIPTION}
                                {!PROGRAM_DESCRIPTION && "Information not available"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgramDetails;