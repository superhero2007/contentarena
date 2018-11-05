import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addIcon, cancelIcon} from "./Icons";
import DatePicker from '@components/DatePicker';
import moment from "moment/moment";
import { DATE_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "@constants";
import { formatMomentToServerFormat } from "@utils/time";

class NewFixture extends Component {
    constructor(props) {
        super(props);
    }

    onDateSelected = (e) => {
        const { handleDate } = this.props;
        const formatted = formatMomentToServerFormat(e);
        handleDate(formatted);
    };

    getDatePicker = (placeHolder, isTimeOnly) => {
        const { id, date } = this.props;

        return <DatePicker
            className={isTimeOnly ? `date-picker-${id}` : `time-picker-${id}`}
            onChange={this.onDateSelected}
            onChangeRaw={undefined}
            placeholderText={placeHolder}
            selected={date ? moment(date): undefined}
            dateFormat={isTimeOnly ? TIME_FORMAT : DATE_FORMAT}
            timeFormat={TIME_FORMAT}
            showTimeSelect={isTimeOnly}
            showTimeSelectOnly={isTimeOnly}
            timeIntervals={15}
            disabled={isTimeOnly && !date}
            timeCaption={this.context.t("CL_STEP1_FIXTURE_TIME_CAPTION")} />
    };

    render() {
        const {onRemove, onAdd, onChange, value, showAdd } = this.props;
        return (
            <div className="fixture-item">
                <div className="fixture-row">
                    <label>
                        {this.context.t("Fixture")}
                    </label>
                    <input
                        className="new-fixture"
                        type="text"
                        placeholder={this.context.t("Enter fixture")}
                        onChange={onChange}
                        value={value} />

                    <div className="fixture-actions">
                        {showAdd && <img src={addIcon} onClick={onAdd} />}
                        <img src={cancelIcon} onClick={onRemove} />
                    </div>
                </div>

                <div className="fixture-row select-date-time">
                    <div className="select-date">
                        <span>{this.context.t("CL_STEP1_FIXTURE_DATE_LABEL")}</span>
                        {this.getDatePicker(this.context.t("CL_STEP1_FIXTURE_DATE_PLACEHOLDER"), false)}
                    </div>
                    <div className="select-time">
                        <span>{this.context.t("CL_STEP1_FIXTURE_TIME_LABEL")}</span>
                        {this.getDatePicker(this.context.t("CL_STEP1_FIXTURE_TIME_PLACEHOLDER"), true)}
                    </div>

                </div>
            </div>
        )
    }
};

NewFixture.contextTypes = {
    t: PropTypes.func.isRequired
};
NewFixture.propTypes = {};
NewFixture.defaultProps = {};

export default NewFixture;
