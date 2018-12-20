import React from 'react';
import DatePicker from '@components/DatePicker';
import { SERVER_DATE_TIME_FORMAT } from "@constants";
import moment from 'moment';
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