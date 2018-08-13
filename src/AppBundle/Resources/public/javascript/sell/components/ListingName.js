import React from 'react';
import { connect } from "react-redux";

class ListingName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    updateName = ( e ) => {
        this.props.updateContentValue("name", e.target.value);
    };

    render() {
        const {name} = this.props;
        return (
            <div className="base-input">
                <label>Listing name</label>
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