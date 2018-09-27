import React from 'react';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import CountrySelector from "../../main/components/CountrySelector";

class ApplicableLaw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    select = (value) => {
        this.props.updateContentValue("law", value);
    };

    render(){
        const { law } = this.props;
        return (
            <div className="base-input">
                <label>
                    {this.context.t("CL_STEP4_LABEL_APPLICABLE_LAW")}
                </label>
                <CountrySelector
                    value={law}
                    multi={false}
                    placeholder={this.context.t("CL_STEP4_PLACEHOLDER_APPLICABLE_LAW")}
                    onChange={this.select}/>
            </div>
        )
    }
}

ApplicableLaw.contextTypes = {
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
)(ApplicableLaw)