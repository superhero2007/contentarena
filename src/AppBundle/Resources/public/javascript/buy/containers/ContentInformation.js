import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {
    Description,
} from "../../sell/components/SellFormItems";

class ContentInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const {content}= this.props;
        return (
            <div style={{marginTop: 20}}>
                <div className="full-item-box">
                    <label>EVENT DESCRIPTION</label>
                    <div className="full-item-content">
                        {content.description}
                    </div>
                </div>

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
)(ContentInformation)