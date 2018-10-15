import React from 'react';

import { connect } from "react-redux";
import store from '../../main/store';
import {updateProfile} from "../../main/actions/userActions";
import RegionCountrySelector from "../components/RegionCountrySelector";
import PopupCountrySelector from "../components/PopupCountrySelector";
import {PropTypes} from "prop-types";

class HiddenKeys extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        store.subscribe((a) => {
            //console.log(store.getState());
        });
    }

    componentDidMount = () =>{
    } ;

    render() {
        const {history} = this.props;
        return (
            <div className="manager-content">
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_LT")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_LB")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_DT")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_NA")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_NA_2")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_HL")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_HL_2")}
                {this.context.t("CL_STEP2_RIGHT_DEFINITIONS_PR")}

            </div>
        );
    }
}

HiddenKeys.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return ownProps;
};

const mapDispatchToProps = dispatch => {
    return {
        contentListingInit : (content) => dispatch({
            type : 'CONTENT_INIT',
            content: content
        }),
        updateProfile : profile =>dispatch(updateProfile(profile)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPage)





