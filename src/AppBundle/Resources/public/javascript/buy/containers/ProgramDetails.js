import React, { Component } from 'react';
import { ProgramTypesDefinitions } from "../../main/components/ProgramTypesDefinitions";
import { PropTypes } from "prop-types";

class ProgramDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            similarLengthCheckbox: true
        };
    }

    handleCheckboxChange = () => {
        this.setState(state => ({similarLengthCheckbox: !state.similarLengthCheckbox}));
    };

    programDescription = (description) => {
        return description && (
            <div className="spacer-bottom txt">
                {description}
            </div>);
    };

    programTitle = (title) => {
        return (
            <div className="row-title">
                <b>{title}</b>
            </div>
        );
    };

    programItem = (text, value) => {
        return (
            <div className="row-item">
                <div className="cap">{text}</div>
                <b>{value}</b>
            </div>
        );
    };


    render() {
        const {
            PROGRAM_NAME,
            PROGRAM_YEAR,
            PROGRAM_DESCRIPTION,
            PROGRAM_DURATION,
            PROGRAM_EPISODES,
            PROGRAM_TYPE
        } = this.props;

        const title = `${this.context.t("LISTING_DETAILS_PROGRAM_TITLE_NAME")} - ${PROGRAM_NAME}`;
        return (
            <div>
                {this.programDescription(PROGRAM_DESCRIPTION)}
                <div className="description-info">
                    {this.programTitle(title)}
                    <div className="col-wrapper">
                        <div className="col">
                            {this.programItem(this.context.t("LISTING_DETAILS_PROGRAM_TITLE_EPISODES"), PROGRAM_EPISODES)}
                            {this.programItem(this.context.t("LISTING_DETAILS_PROGRAM_TITLE_DURATION"), PROGRAM_DURATION)}
                        </div>
                        <div className="col">
                            {PROGRAM_TYPE && this.programItem(this.context.t("LISTING_DETAILS_PROGRAM_TITLE_TYPE"), ProgramTypesDefinitions[PROGRAM_TYPE])}
                            {PROGRAM_YEAR && this.programItem(this.context.t("LISTING_DETAILS_PROGRAM_TITLE_RELEASE"), PROGRAM_YEAR)}
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