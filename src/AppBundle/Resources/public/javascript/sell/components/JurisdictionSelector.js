import React from 'react';
import {connect} from "react-redux";
import {CountrySelector} from "../../main/components/CountrySelector";

class JurisdictionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    selectTerritory = (value) => {
        this.props.updateContentValue("jurisdiction", value);
    };


    render(){
        const { jurisdiction } = this.props;
        return (
            <div className="base-input">
                <label>Place of jurisdiction</label>
                <CountrySelector
                    className={"base-input-select"} multi={false} value={jurisdiction}
                    onChange={this.selectTerritory} />
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
)(JurisdictionSelector)