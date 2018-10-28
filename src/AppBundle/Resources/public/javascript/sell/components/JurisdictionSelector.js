import React from 'react';
import {connect} from "react-redux";
import CountrySelector from "../../main/components/CountrySelector";
import {PropTypes} from "prop-types";

class JurisdictionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    selectTerritory = (e) => {
        this.props.updateContentValue("jurisdiction", e.target.value);
    };

    render(){
        const { jurisdiction } = this.props;
        return (
            <div className="base-input">
                <label>
                    {this.context.t("CL_STEP4_LABEL_JURISDICTION")}
                </label>
                <input
                    type="text"
                    value={jurisdiction}
                    onChange={this.selectTerritory}
                    placeholder={this.context.t("CL_STEP4_PLACEHOLDER_JURISDICTION")}
                    maxLength={250}
                />

            </div>
        )
    }
}

JurisdictionSelector.contextTypes = {
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
)(JurisdictionSelector)