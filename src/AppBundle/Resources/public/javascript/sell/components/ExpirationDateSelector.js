import React from 'react';
import DatePicker from '@components/DatePicker';
import { SERVER_DATE_TIME_FORMAT } from "@constants";
import moment from 'moment';
import max from 'lodash/max';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import { DATE_FORMAT } from "@constants";

class ExpirationDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleStartDate = (date) => {
        this.props.updateContentValue("expiresAt", date.set({hour: 23, minute: 59}).format(SERVER_DATE_TIME_FORMAT));
    };

    render(){
        const { expiresAt, validation } = this.props;
        const isInvalid = !expiresAt && validation;

        return (
            <div className="base-input">
                <label>
                    {this.context.t("CL_STEP4_TITLE_EXPIRY")}
                </label>
                <DatePicker
                    className={`date-picker ${isInvalid ? 'is-invalid':''}`}
                    selected={(expiresAt)? moment(expiresAt): undefined}
                    onChange={this.handleStartDate}
                    minDate={moment()}
                    maxDate={this.getMaxDate()}
                    fixedHeight={true}
                    dateFormat={DATE_FORMAT}
                    placeholderText={DATE_FORMAT.toLowerCase()}
                />
                {isInvalid && (
                    <span className="is-invalid" style={{marginLeft:15}}>
                        {this.context.t('LISTING_EXPIRY_EMPTY')}
                    </span>
                )}
            </div>
        )
    }

    getMaxDate() {
        const { rightsPackage } = this.props;
        const hasLiveTransmission = !!rightsPackage.find(item => item.shortLabel === 'LT');
        let date = null;
        
        if (hasLiveTransmission) {
            const { seasons } = this.props;
            let maxFixtureDate = null;
            let maxSeasonDate = null;

            if (seasons) {
                const fixtureDates = [];
                const dates = seasons.map(season => {
                    if(season.fixtures) {
                        season.fixtures.forEach(fixture => {
                            fixtureDates.push(moment(fixture.date));
                        });
                    }

                    return moment(season.customEndDate);
                });

                maxFixtureDate = max(fixtureDates);
                maxSeasonDate = max(dates);
            }

            date = max([maxFixtureDate, maxSeasonDate]);
        }

        return date;
    }
}

ExpirationDateSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        ...state.content,
        validation: state.validation
    }
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
)(ExpirationDateSelector)