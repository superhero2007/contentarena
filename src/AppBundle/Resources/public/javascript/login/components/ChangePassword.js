import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class ChangePassword extends PureComponent {
    constructor (props) {
        super(props);
    };

    render() {
        return (
            <section className="review-wrapper">
                <h3>{this.context.t("LOGIN_REVIEW_EMAIL")}</h3>
                <span>Some text some text</span>
            </section>
        );
    }
}

ChangePassword.contextTypes = {
    t: PropTypes.func.isRequired
};

ChangePassword.propsType = {
    onViewUpdate: PropTypes.func.isRequired
};

export default ChangePassword;
