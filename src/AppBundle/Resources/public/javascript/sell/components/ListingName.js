import React from 'react';
import { connect } from "react-redux";
import {PropTypes} from "prop-types";

class ListingName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const element = document.querySelectorAll('.step-content.step-4 .listing-summary');

        if (element) {
            const node = element[0];
            if (!this.props.name) {
                setTimeout(() => {
                    this.props.updateContentValue("name", node.textContent);
                }, 1);
            }
        }
    }

    updateName = ( e ) => {
        this.props.updateContentValue("name", e.target.value);
    };

    render() {
        const {name} = this.props;
        return (
            <div className="base-input">
                <label>
                    {this.context.t("Listing name")}
                </label>
                <input
                    type="text"
                    value={name || this.state.name}
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