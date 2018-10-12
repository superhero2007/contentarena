import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addIcon, cancelIcon} from "./Icons";
import DatePicker from '@components/DatePicker';
import moment from "moment/moment";
import { DATE_TIME_FORMAT, DATE_FORMAT } from "./../../common/constants";
import { formatMomentToServerFormat } from "./../../common/utils/time";

const isStartOfTheDay = (date) => {
    return moment(date).startOf('day').valueOf() !== moment(date).valueOf()
};

class NewFixture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDatePickerEnabled: !!props.date,
            isDatePickerWithTimeEnabled: isStartOfTheDay(props.date),
        };
    }

    componentWillReceiveProps(nextProps) {
        const { isDatePickerEnabled } = this.state;

        if (nextProps.date && !isDatePickerEnabled ) {{
            this.setState({
                isDatePickerEnabled: true,
                isDatePickerWithTimeEnabled: isStartOfTheDay(nextProps.date)
            })
        }}
    }



    enablePicker = (type) => {
        const {id} = this.props;
        this.setState({[type]:true});
        setTimeout(()=> jQuery('.date-picker.id'+id).focus(),100)
    };

    onDateSelected = (e) => {
        const { handleDate } = this.props;
        const formatted = formatMomentToServerFormat(e);
        handleDate(formatted);
    };

    render() {
        const {onRemove, onAdd, onChange, value, showAdd, date, id} = this.props;
        const {isDatePickerEnabled, isDatePickerWithTimeEnabled} = this.state;
        return (
            <div className="base-input new-fixture" style={{display: 'flex', alignItems: 'center'}}>
                <label>
                    {this.context.t("Fixture")}
                </label>
                <input
                    className="new-category"
                    type="text"
                    placeholder={this.context.t("Enter fixture")}
                    onChange={onChange}
                    value={value}/>

                <div className="date-wrapper">
                    {isDatePickerEnabled ? (
                        <div className="d-flex align-items-center">
                            <DatePicker
                                className={"date-picker id"+id}
                                selected={(date) ? moment(date) : undefined}
                                onChange={this.onDateSelected}
                                onChangeRaw={undefined}
                                timeIntervals={15}
                                dateFormat={isDatePickerWithTimeEnabled ? `${DATE_TIME_FORMAT} [GMT]` : DATE_FORMAT}
                                placeholderText={isDatePickerWithTimeEnabled ? `${DATE_TIME_FORMAT} GMT` : DATE_FORMAT}
                                timeFormat="HH:mm"
                                showTimeSelect={isDatePickerWithTimeEnabled}
                            />

                            {!isDatePickerWithTimeEnabled && (
                                <a className="ca-link text-nowrap" onClick={() =>this.enablePicker('isDatePickerWithTimeEnabled')} style={{marginLeft:10}}>
                                    {this.context.t("Add Time")}
                                </a>
                            )}
                        </div>
                    ) : (
                        <a className="ca-link text-nowrap" onClick={() => this.enablePicker('isDatePickerEnabled')}>
                            {this.context.t("Add date")}
                        </a>
                    )}

                </div>


                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 100,
                    justifyContent: 'flex-end'
                }}>
                    <i className="fa fa-info-circle icon" title={this.context.t("All fixture times are GMT; please ensure to use this time standard and not the local event time")} />
                    {showAdd && <img src={addIcon} onClick={onAdd} style={{cursor: 'pointer', width: 20, height: 20, marginRight: 5}}/>}
                    <img src={cancelIcon} onClick={onRemove} style={{cursor: 'pointer', width: 20, height: 20}}/>
                </div>

            </div>
        )
    }
}

NewFixture.contextTypes = {
    t: PropTypes.func.isRequired
};
NewFixture.propTypes = {};
NewFixture.defaultProps = {};

export default NewFixture;
