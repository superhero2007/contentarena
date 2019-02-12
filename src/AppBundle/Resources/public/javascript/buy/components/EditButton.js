import React from 'react';
import PropTypes from 'prop-types';
import {goTo} from "../../main/actions/utils";

class EditButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
    }

    edit = () => {
        const {customId} = this.props;

        goTo("contentlisting/"+  customId + "/1");
    };

    editableStatus = ( status ) => {
        return status.name === 'DRAFT'
            || status.name === 'INACTIVE'
            || status.name === 'AUTO_INACTIVE'
            || status.name === 'PENDING'
            || status.name === 'APPROVED'
            || status.name === 'EDITED';
    };

    render() {
        const { userCanEdit, status } = this.props;

        if (!userCanEdit ||  !this.editableStatus(status) ) return null;

        return (
            <button
                onClick={this.edit}
                className="ca-btn primary edit-button"
            >
                Edit
            </button>
        );
    }
}

EditButton.contextTypes = {
    t: PropTypes.func.isRequired
};

export default EditButton;