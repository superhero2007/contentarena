import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

class CaDatePicker extends React.Component {
	componentDidMount() {
		$("body").on("click", ".react-datepicker-popper .react-datepicker__year-read-view", this.onYearViewClick);
	}

	componentWillUnmount() {
		$("body").off("click", ".react-datepicker-popper .react-datepicker__year-read-view", this.onYearViewClick);
	}

	render() {
		return (<DatePicker {...this.props} className={`ca-date-picker ${this.props.className}`} utcOffset={0} />);
	}

	onYearViewClick = () => {
		setTimeout(() => {
			const selected = $(".react-datepicker__year-option.--selected_year")[0];
			if (selected) {
				selected.scrollIntoView();
			}
		}, 0);
	};
}

CaDatePicker.defaultProps = {
	className: "",
	showYearDropdown: true,
	scrollableYearDropdown: true,
	yearDropdownItemNumber: 50,
	fixedHeight: true,
};

CaDatePicker.propTypes = {
	className: PropTypes.string,
};

export default CaDatePicker;
