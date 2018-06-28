import React from 'react';
import { connect } from "react-redux";
import CurrencySelector from "../components/CurrencySelector";
import VatSelector from "../components/VatSelector";
import FileSelector from '../../main/components/FileSelector';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ExpirationDateSelector from "../components/ExpirationDateSelector";
import JurisdictionSelector from "../components/JurisdictionSelector";
import CompanyInformation from "../components/CompanyInformation";
import {CountrySelector} from "../../main/components/CountrySelector";
import {stepChangeReset} from "../actions/contentActions";

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : "Step 3",
            name : "",
            salesPackages : []
        };
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

    editSalesPackage = ( index ) => {
        this.setState({
            salesPackageToEdit : index,
            editOpen: true
        });
    };

    addSalesPackage = ( salesPackages ) => {
        this.props.addSalesPackages(salesPackages);
    };

    updateSalesPackage = ( salesPackage, index ) => {
        this.props.updateSalesPackages("save", salesPackage, index);
    };

    removeSalesPackage = ( index ) => {
        this.props.updateSalesPackages("remove", null, index);
    };

    removeAllSalesPackage= () => {
        this.props.updateSalesPackages("removeAll");
    };

    /**
     *
     * @returns {boolean}
     */
    exclusivity = () => {
        const {rightsPackage} = this.props;
        return rightsPackage.filter(rp => rp.exclusive).length > 0;
    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };

    render() {
        const {step, rightsPackage, salesPackages, currency, vat, updateContentValue, image, vatPercentage} = this.props;

        if ( step !== 3) return (null);
        this.scroll();
        return (

            <div className="step-content">
                <div className="step-content-container">

                    <CurrencySelector onClick={this.selectCurrency} selected={currency} />

                    <FileSelector
                        label={"Listing image (opt.)"}
                        isImage={true}
                        onSelect={updateContentValue}
                        previousImage={image}
                        target={"imageBase64"}/>

                    <ExpirationDateSelector/>

                    <SalesPackageForm
                        currency={currency}
                        exclusivity={this.exclusivity()}
                        salesPackages={salesPackages}
                        onAdd={this.addSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage}
                        onEdit={this.editSalesPackage}
                        onRemoveAll={this.removeAllSalesPackage}/>

                    {this.state.editOpen && <SalesPackageEdit
                        isOpen={this.state.editOpen}
                        onClose={()=>{
                            this.setState({
                                editOpen : false
                            })
                        }}
                        exclusivity={this.exclusivity()}
                        onUpdate={this.updateSalesPackage}
                        salesPackageId={this.state.salesPackageToEdit}
                        salesPackages={salesPackages}
                        />}

                    <CompanyInformation/>

                    <JurisdictionSelector/>

                    <VatSelector
                        vatPercentage={vatPercentage}
                        onUpdate={updateContentValue}
                        onClick={this.selectVat}
                        selected={vat}/>

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
        addSalesPackages : (salesPackages) => dispatch({
            type: 'ADD_SALES_PACKAGES',
            salesPackages : salesPackages,
        }),
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)