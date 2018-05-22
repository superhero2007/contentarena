import React from 'react';
import { connect } from "react-redux";
import CurrencySelector from "../components/CurrencySelector";
import VatSelector from "../components/VatSelector";
import FileSelector from '../../main/components/FileSelector';
import SalesPackageForm from "../components/SalesPackageForm";

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : "Step 3",
            name : "",
            salesPackages : []
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    selectCurrency = ( currency ) => {
        this.props.updateContentValue("currency", currency);
    };

    selectVat = ( vat ) => {
        this.props.updateContentValue("vat", vat);
    };

    updateName = ( e ) => {
        this.props.updateContentValue("name", e.target.value);
    };

    addSalesPackage = ( salesPackage ) => {
        this.props.updateSalesPackages("add", salesPackage);
    };

    updateSalesPackage = ( salesPackage, index ) => {
        this.props.updateSalesPackages("save", salesPackage, index);
    };

    removeSalesPackage = ( index ) => {
        this.props.updateSalesPackages("remove", null, index);
    };

    render() {
        const {step, name, salesPackages, currency, vat} = this.props;

        if ( step !== 3) return (null);

        return (

            <div className="step-content">
                <div className="step-content-container">

                    <CurrencySelector onClick={this.selectCurrency} selected={currency} />

                    <FileSelector label={"Listing image (opt.)"} target={"image"}/>

                    <SalesPackageForm
                        salesPackages={salesPackages}
                        onAdd={this.addSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage} />

                    <VatSelector onClick={this.selectVat} selected={vat}/>

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
        updateSalesPackages : (name, salesPackage, index) => dispatch({
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
)(SellFormStep3)