import React from 'react';

import SellButtons from "../containers/SellButtons";
import SellFormSteps from "../containers/SellFormSteps";
import SellFormStep1 from "../containers/SellFormStep1";
import SellFormStep2 from "../containers/SellFormStep2";
import SellFormStep3 from "../containers/SellFormStep3";
import SellFormStep4 from "../containers/SellFormStep4";
import SellFormStep5 from "../containers/SellFormStep5";
import Selector from "../../main/components/Selector";
import { connect } from "react-redux";
import store from '../store';

class SellForm extends React.Component {
    constructor(props) {
        super(props);

        let content = JSON.parse(props.content);
        //let user = JSON.parse(props.user);
        content.jurisdiction = {
            label: content.company.country.name,
            value: content.company.country.name
        };

        if (props.step) content.step = props.step;
        //content.company = user.company;

        this.state = {
            content : content
        };

        store.subscribe((a) => {
            //console.log(store.getState());
        });
    }

    componentDidMount = () =>{
        this.props.contentListingInit( this.state.content );
    } ;

    render() {
        let _this = this;
        return (
            <div className="main-container">
                <Selector style={{zIndex: 100}}/>
                <SellFormSteps />
                <SellFormStep1/>
                <SellFormStep2 packages={this.props.packages} />
                <SellFormStep3 packages={this.props.packages} />
                <SellFormStep4/>
                <SellButtons />
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellForm)





