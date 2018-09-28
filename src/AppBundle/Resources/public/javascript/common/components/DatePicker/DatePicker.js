import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const CaDatePicker = (props) => {
    return (<DatePicker {...props} className={`ca-date-picker ${props.className}`} />);
};

CaDatePicker.defaultProps = {
    className: '',
    showYearDropdown: true,
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 50
};

CaDatePicker.propTypes = {
    className: PropTypes.string
};

export default CaDatePicker;