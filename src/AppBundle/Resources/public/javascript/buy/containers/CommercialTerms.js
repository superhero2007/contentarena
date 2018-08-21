import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import SalesPackages from "./SalesPackages";
import {PropTypes} from "prop-types";

class CommercialTerms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.noInfoText = "No information available";
    }

    render() {
        const {salesPackages, onSelectPackage, programDescription, profile, customId} = this.props;
        return (
            <div style={{ marginTop: 25 }}>

                <div className="full-item-box">
                    <label>
                        {this.context.t("PROGRAMS DESCRIPTION")}
                    </label>
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

CommercialTerms.contextTypes = {
    t: PropTypes.func.isRequired
};

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