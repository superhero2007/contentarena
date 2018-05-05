import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import Right from "../components/Right";

class SellFormStep5 extends React.Component {

    constructor(props) {
        super(props);

        let packages = JSON.parse(this.props.packages);

        this.state = {
            rightPackages : new Map(packages.map((i) => [i.id, i]))
        };
    }

    componentDidMount () { }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        if ( this.props.step !== 5) return (null);

        return (
            <div className="step-content">

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep5)