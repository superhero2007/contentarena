import React from 'react';
import {connect} from "react-redux";

class CompanyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    render(){
        const { company } = this.props;
        return (
            <div className="base-input">
                <label>Company address</label>
                <input
                    type="text"
                    value={company.address}
                    placeholder=""/>
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
)(CompanyInformation)