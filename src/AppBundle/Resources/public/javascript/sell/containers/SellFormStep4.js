import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ExpirationDateSelector from "../components/ExpirationDateSelector";
import JurisdictionSelector from "../components/JurisdictionSelector";
import ApplicableLawSelector from "../components/ApplicableLawSelector";
import CompanyInformation from "../components/CompanyInformation";
import ListingName from "../components/ListingName";
import {CountrySelector} from "../../main/components/CountrySelector";
import {stepChangeReset} from "../actions/contentActions";
import {TitleBar} from "../components/SellFormItems";

class SellFormStep4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : "Step 4",
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
        const {currency} = this.props;
        salesPackages.forEach(sp => sp.currency = {code:currency});
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
        const {
            step,
            rightsPackage,
            salesPackages, currency, vat, updateContentValue, image, vatPercentage} = this.props;

        if ( step !== 4) return (null);
        this.scroll();
        return (

            <div className="step-content step-4">
                <div className="step-content-container">
                    <SalesPackageForm
                        currency={currency}
                        exclusivity={this.exclusivity()}
                        salesPackages={salesPackages}
                        onAdd={this.addSalesPackage}
                        onUpdate={this.updateSalesPackage}
                        onRemove={this.removeSalesPackage}
                        onEdit={this.editSalesPackage}
                        onRemoveAll={this.removeAllSalesPackage}
                        selectCurrency={this.selectCurrency}
                    />

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

                    <TitleBar title={"Further information"}/>

                    <CompanyInformation />

                    <JurisdictionSelector />

                    <div className='base-full-input'>
                        <label>do you seek to apply VAT to buyers in company’s palce of jurisdiction?</label>
                        <input type="radio"
                               className="ca-radio package-selector"
                        />
                        YES
                        <input type="radio"
                               className="ca-radio package-selector"
                        />
                        NO
                    </div>

                    <FileSelector
                        label={'Annex'}
                        target={"attachments"}
                        selected={this.props.attachments}
                        onSelect={()=>{console.log('add file')}}
                        onRemove={this.removeFile}
                        accept={["image/png", "image/jpg", ".pdf", ".doc", ".docx", ".cvs", ".ppt", ".xls", ".xlsx"] }
                        acceptType={[
                            "image/jpeg",
                            "image/png",
                            "application/pdf"
                        ]}
                        tmp={true}/>

                    <TitleBar title={"Listing details"}/>

                    <div className="step-item-description" style={{marginTop: 0}} >
                        Please define listing details below. This determines how your listing is shown to potential buyers.
                    </div>

                    <ListingName/>

                    <div className='row'>
                        <ExpirationDateSelector/>

                        <FileSelector
                            label={"Listing image (opt.)"}
                            isImage={true}
                            onSelect={updateContentValue}
                            previousImage={image}
                            target={"imageBase64"}/>

                        <div className='clearfix' />
                    </div>

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
)(SellFormStep4)