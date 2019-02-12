import React from 'react';

import { connect } from "react-redux";
import store from '../../main/store';
import {updateProfile} from "../../main/actions/userActions";
import RegionCountrySelector from "../components/RegionCountrySelector";
import PopupCountrySelector from "../components/PopupCountrySelector";

class TestPage extends React.Component {
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
                <RegionCountrySelector
                    onSelect={(s)=>{ console.log(s)}}
                />

                <PopupCountrySelector/>
            </div>
        );
    }
}

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





