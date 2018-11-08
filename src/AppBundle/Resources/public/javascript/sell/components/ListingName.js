import React from 'react';
import { connect } from "react-redux";
import {PropTypes} from "prop-types";

class ListingName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    updateName = ( e ) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange();
        }

        this.props.updateContentValue("name", e.target.value);
    };

    render() {
        const {name} = this.props;
        return (
            <div className="base-input">
                <label>
                    {this.context.t("CL_STEP1_LISTING_NAME")}
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={this.updateName}
                    placeholder=""
                    maxLength={70}
                />
            </div>
        );
    }
}

ListingName.contextTypes = {
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
)(ListingName)