import React from 'react';
import { connect } from "react-redux";
import PaymentMethod from "../components/PaymentMethod";
import {TitleBar} from "../components/SellFormItems";

class SellFormStep4 extends React.Component {

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

    updatePaymentMethod = ( paymentMethod ) => {
        this.props.updateContentValue('paymentMethod', paymentMethod);
    };

    render() {
        if ( this.props.step !== 4) return (null);

        return (
            <div className="step-content">
                <div className="step-title">Step 4 - Pricing & Listing Details</div>
                <div className="step-content-container">
                    <PaymentMethod paymentMethod={this.props.paymentMethod} onUpdate={this.updatePaymentMethod}/>
                    <TitleBar title={"Sales bundles"} subtitle={"Note that you can create multiiple sales bundles."}/>

                    <TitleBar title={"Listing Details"} subtitle={""}/>

                    <TitleBar title={"Company Details"} subtitle={""}/>

                    <TitleBar title={"Place of Jurisdiction"} subtitle={""}/>

                </div>
            </div>
        );
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
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep4)