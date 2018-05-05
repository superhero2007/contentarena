import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

class TermSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TermSheet)