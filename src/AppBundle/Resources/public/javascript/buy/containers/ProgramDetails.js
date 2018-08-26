import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {ProgramTypesDefinitions} from "../../main/components/ProgramTypesDefinitions";
import {PropTypes} from "prop-types";

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
        } = this.props;
        return (
            <div style={{ padding:'20px 0'}}>
                <div className="full-item-box" style={{width: '50%'}}>
                    <label>PROGRAM {PROGRAM_NAME}</label>
                    <div>
                        {PROGRAM_TYPE && (
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("Program type")}
                                </div>
                                <div style={valueStyle}>
                                    {ProgramTypesDefinitions[PROGRAM_TYPE]}
                                </div>
                            </div>
                        )}
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                {this.context.t("Number of episodes")}
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_EPISODES}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                {this.context.t("Average episode duration (min)")}
                            </div>
                            <div style={valueStyle}>
                                {PROGRAM_DURATION}
                            </div>
                        </div>
                        {PROGRAM_YEAR && (
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("Year of program release")}
                                </div>
                                <div style={valueStyle}>
                                    {PROGRAM_YEAR}
                                </div>
                            </div>
                        )}
                        {PROGRAM_DESCRIPTION && (
                            <div style={rowStyle}>
                                <div style={titleStyle}>
                                    {this.context.t("Description")}
                                </div>
                                <div style={valueStyle}>
                                    {PROGRAM_DESCRIPTION}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

ProgramDetails.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ProgramDetails;