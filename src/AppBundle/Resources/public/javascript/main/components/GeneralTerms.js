import React, { Component } from 'react';
import {PropTypes} from "prop-types";
import HeaderBar from "./HeaderBar";


class GeneralTerms extends Component {

    constructor (props) {
        super(props);


        this.state = {
        }
    };

    render() {

        const {
            text = this.context.t("GENERIC_TERMS_TEXT_1"),
            text2 = this.context.t("GENERIC_TERMS_TEXT_2"),
            activationCode,
            defaultChecked,
            value,
            onChange
        } = this.props;

        return (
            <div style={{display: 'flex', marginBottom: 10, justifyContent: 'center'}}>
                <input
                    type="checkbox"
                    className="ca-checkbox"
                    defaultChecked={defaultChecked}
                    value={value}
                    onChange={onChange}
                    style={{marginRight: 10}}
                />
                <label htmlFor="terms_arena" />
                <div>
                    {text}
                    <a href={(activationCode) ? "/generalterms?activationCode=" + activationCode : "/generalterms"} target={"_blank"}> Terms & Conditions </a>
                    {text2}
                </div>

            </div>
        )
    }
}

GeneralTerms.contextTypes = {
    t: PropTypes.func.isRequired
};


export default GeneralTerms;
