import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector';
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ExpirationDateSelector from "../components/ExpirationDateSelector";
import JurisdictionSelector from "../components/JurisdictionSelector";
import CompanyInformation from "../components/CompanyInformation";
import ListingName from "../components/ListingName";
import {CountrySelector} from "../../main/components/CountrySelector";
import {stepChangeReset} from "../actions/contentActions";
import {TitleBar} from "../components/SellFormItems";
import {PropTypes} from "prop-types";

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

    addFile = (response) => {
        const {annex} = this.props;
        let index = annex.length ;
        this.props.updateAnnex("save", index, {file: response.file, name : response.name } );
    };

    removeFile = ( index ) => {
        this.props.updateAnnex("remove", index, null);
    };

    render() {
        const {
            step,
            annex,
            salesPackages,
            currency,
            updateContentValue,
            image,
        } = this.props;

        if (step !== 4) return (null);
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
                        onClose={() => {
                            this.setState({
                                editOpen: false
                            })
                        }}
                        exclusivity={this.exclusivity()}
                        onUpdate={this.updateSalesPackage}
                        salesPackageId={this.state.salesPackageToEdit}
                        salesPackages={salesPackages}
                    />}

                    <TitleBar title={this.context.t("Further information")}/>

                    <CompanyInformation/>

                    <JurisdictionSelector/>

                    <FileSelector
                        label={this.context.t('Annex')}
                        target={"annex"}
                        selected={annex}
                        onSelect={this.addFile}
                        onRemove={this.removeFile}
                        accept={[ ".pdf"]}
                        acceptType={[
                            "application/pdf"
                        ]}
                        tmp={true}
                        infoText={'All files uploaded here will be merged with the license agreement. You may upload only PDF files.'}
                    />

                    <TitleBar title={this.context.t("Listing details")} infoText={'These details impact how your listing will be presented to buyers in the marketplace: Under which name, with which image and until when it shall be published.'}/>

                    <div className="step-item-description" style={{marginTop: 0}}>
                        {this.context.t("Please define listing details below. This determines how your listing is shown to potential buyers.")}
                    </div>

                    <ListingName/>

                    <div className='row'>
                        <ExpirationDateSelector/>

                        <FileSelector
                            label={this.context.t("Listing image (opt.)")}
                            isImage={true}
                            onSelect={updateContentValue}
                            previousImage={image}
                            target={"imageBase64"}/>

                        <div className='clearfix'/>
                    </div>

                </div>
            </div>
        );
    }
}

SellFormStep4.contextTypes = {
    t: PropTypes.func.isRequired
};

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
        updateAnnex : (name, index, value) => dispatch({
            type: 'UPDATE_ANNEX',
            name: name,
            index: index,
            value: value
        }),
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep4)