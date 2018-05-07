import React from 'react';
import { connect } from "react-redux";
import PaymentMethod from "../components/PaymentMethod";
import SalesPackageForm from "../components/SalesPackageForm";
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
        if (this.props.salesPackages.length === 0) this.props.updateSalesPackages(0, {},"add");
    };

    render() {
        if ( this.props.step !== 4) return (null);

        return (
            <div className="step-content">
                <div className="step-title">Step 4 - Pricing & Listing Details</div>
                <div className="step-content-container">
                    <PaymentMethod paymentMethod={this.props.paymentMethod} onUpdate={this.updatePaymentMethod}/>

                    {this.props.paymentMethod &&
                        <TitleBar title={"Sales bundles"} subtitle={"Note that you can create multiiple sales bundles."}/>
                    }

                    {this.props.paymentMethod && this.props.salesPackages.map((salesPackage) => {
                        return <SalesPackageForm data={salesPackage} />
                    })}

                    {this.props.paymentMethod &&
                        <TitleBar title={"Listing Details"} subtitle={""}/>
                    }

                    {this.props.paymentMethod &&
                        <TitleBar title={"Company Details"} subtitle={""}/>
                    }

                    {this.props.paymentMethod &&
                        <TitleBar title={"Place of Jurisdiction"} subtitle={""}/>
                    }

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
        updateSalesPackages : (index, salesPackage, name) => dispatch({
            type: 'UPDATE_SALES_PACKAGES',
            index: index,
            salesPackage : salesPackage,
            name: name
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep4)