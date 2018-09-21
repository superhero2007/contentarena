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
            <div style={{ padding:'20px 0'}}>
                <div>
                    <div className="description-info">
                        <div className="col">
                            <div>
                                <b>
                                    {this.context.t("LISTING_DETAILS_PROGRAM_TITLE")}
                                </b>
                                <div>
                                    {PROGRAM_NAME}
                                </div>
                            </div>
                            {PROGRAM_TYPE && (
                                <div>
                                    <b>
                                        {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_TYPE")}
                                    </b>
                                    <div>
                                        {ProgramTypesDefinitions[PROGRAM_TYPE]}
                                    </div>
                                </div>
                            )}
                            {PROGRAM_DESCRIPTION && (
                                <div>
                                    <b>{this.context.t("LISTING_DETAILS_PROGRAM_TITLE_DESCRIPTION")}</b>
                                    <div>
                                        {PROGRAM_DESCRIPTION}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col">
                            <b>
                                {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_DURATION")}
                            </b>
                            <div>
                                {PROGRAM_DURATION}
                            </div>
                            {PROGRAM_YEAR && (
                                <div>
                                    <b>
                                        {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_RELEASE")}
                                    </b>
                                    <div>
                                        {PROGRAM_YEAR}
                                    </div>
                                </div>
                            )}
                            <b>
                                {this.context.t("LISTING_DETAILS_PROGRAM_TITLE_EPISODES")}
                            </b>
                            <div>
                                {PROGRAM_EPISODES}
                            </div>
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