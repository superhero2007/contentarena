import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {ProgramTypesDefinitions} from "../../main/components/ProgramTypesDefinitions";
import {PropTypes} from "prop-types";

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
            <div>
                <div>
                    {PROGRAM_DESCRIPTION && (
                        <div className="spacer-bottom txt">
                            {PROGRAM_DESCRIPTION}
                        </div>
                    )}
                    <div className="description-info">
                        <div className="col">
                            <div className="row-title">
                                <b>
                                    {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_NAME")} - {PROGRAM_NAME}
                                </b>
                            </div>
                            <div className="row-item">
                                <div className="cap">
                                    {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_EPISODES")}
                                </div>
                                <b>
                                    {PROGRAM_EPISODES}
                                </b>
                            </div>
                            <div className="row-item">
                                <div className="cap">
                                    {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_DURATION")}
                                </div>
                                <b>
                                    {PROGRAM_DURATION}
                                </b>
                            </div>
                        </div>
                        <div className="col">
                            {PROGRAM_TYPE && (
                                <div className="row-item">
                                    <div className="cap">
                                        {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_TYPE")}
                                    </div>
                                    <b>
                                        {ProgramTypesDefinitions[PROGRAM_TYPE]}
                                    </b>
                                </div>
                            )}
                            {PROGRAM_YEAR && (
                                <div className="row-item">
                                    <div className="cap">
                                        {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_RELEASE")}
                                    </div>
                                    <b>
                                        {PROGRAM_YEAR}
                                    </b>
                                </div>
                            )}
                        </div>
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