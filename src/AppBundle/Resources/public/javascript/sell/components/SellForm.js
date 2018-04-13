import React from 'react';
import PackageSelector from "../containers/PackageSelector";
import SellButtons from "../containers/buttons";
import SellFormSteps from "../containers/SellFormSteps";
import SellFormStep1 from "../containers/SellFormStep1";
import Selector from "../../main/components/Selector";
import { connect } from "react-redux";
import store from '../store';


class SellForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : JSON.parse(props.content)
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
                <Selector />
                <SellFormSteps />
                <SellFormStep1/>
                <PackageSelector {... this.props} />
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





