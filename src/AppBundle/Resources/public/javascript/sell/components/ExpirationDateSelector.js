import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {connect} from "react-redux";

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
                <label>Listing expiry</label>
                <DatePicker
                    className={"date-picker"}
                    selected={(expiresAt)? moment(expiresAt): undefined}
                    onChange={this.handleStartDate}
                    placeholderText={"dd/mm/yyyy"}
                />
            </div>
        )
    }
}

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