import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const CaDatePicker = (props) => {
    return (<DatePicker {...props} className={`ca-date-picker ${props.className}`} utcOffset={0}/>);
};

CaDatePicker.defaultProps = {
    className: '',
    showYearDropdown: true,
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 50,
    fixedHeight: true
};

CaDatePicker.propTypes = {
    className: PropTypes.string
};

export default CaDatePicker;