import React from 'react';
import DatePicker from 'components/DatePicker';
import moment from 'moment';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

class ExpirationDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleStartDate = (date) => {
        this.props.updateContentValue("expiresAt", date);
    };

    render(){
        const { expiresAt } = this.props;

        return (
            <div className="base-input">
                <label>
                    {this.context.t("CL_STEP4_TITLE_EXPIRY")}
                </label>
                <DatePicker
                    className={"date-picker"}
                    selected={(expiresAt)? moment(expiresAt): undefined}
                    onChange={this.handleStartDate}
                    minDate={moment()}
                    fixedHeight={true}
                    dateFormat={"DD/MM/YYYY"}
                    placeholderText={"dd/mm/yyyy"}
                />
            </div>
        )
    }
}

ExpirationDateSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.content
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