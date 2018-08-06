import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import SalesPackages from "./SalesPackages";

class CommercialTerms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.noInfoText = "No information available";
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {salesPackages, onSelectPackage, programDescription, profile, customId} = this.props;
        return (
            <div style={{ marginTop: 25 }}>

                <div className="full-item-box">
                    <label>PROGRAMS DESCRIPTION</label>
                    <div className="full-item-content">
                        {programDescription && programDescription}
                        {!programDescription && this.noInfoText}
                    </div>
                </div>

                <SalesPackages
                    listingId={customId}
                    profile={profile}
                    onSelectPackage={onSelectPackage}
                    salesPackages={salesPackages}/>
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
)(CommercialTerms)