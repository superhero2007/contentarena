import React from 'react';
import Modal from 'react-modal';
import CountrySelector from "../../main/components/CountrySelector";
import DatePicker from '@components/DatePicker';
import {PropTypes} from "prop-types";
import RegionCountrySelector from "../../main/components/RegionCountrySelector";
import SalesPackageTable from "./SalesPackageTable";
import cn from 'classnames';
import moment from "moment";
import {connect} from "react-redux";
import { DATE_FORMAT } from "@constants";
import NumberFormat from 'react-number-format';
import {getCurrencySymbol} from "../../main/actions/utils";
import {disableValidation, enableValidation} from "../../main/actions/validationActions";

const labelStyle = { height: "30px", fontSize: "12px"};
const installmentIconStyle = { margin: "0 10px", position: "relative"};

class SalesPackageForm extends React.Component {
    constructor(props) {
        super(props);

        this.asBundle = "SELL_AS_BUNDLE";
        this.individually = "SELL_INDIVIDUALLY";
        this.worldwide = "WORLDWIDE";
        this.worldwideExcluding = "WORLDWIDE_EXCLUDING";
        this.selectedTerritories = "SELECTED_TERRITORIES";
        this.fixed = "FIXED";
        this.bidding = "BIDDING";
        this.limit = 3;
        this.state = {
            isOpen : props.isOpen,
            bundleMethod : this.asBundle,
            territoriesMethod : this.selectedTerritories,
            salesMethod : this.fixed,
            territories : [],
            excludedTerritories : [],
            filterTerritories : [],
            territoriesList: [],
            installments : [{ value : 100,  type : "DAY", days: 30}],
            fee : 0,
            isNew : true,
            territoriesQuantity: 'single',
            countries: ContentArena.Data.Countries
        };
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.draftIcon = assetsBaseDir + "app/images/draft.png";
        this.cancelIcon = assetsBaseDir + "app/images/cancel.png";
    }

    componentDidMount() {
        ContentArena.Api.getCountries().done( (countries ) => {
            this.setState({countries})
        });
    }

    componentWillUnmount() {
        const {validation, disableValidation} = this.props;

        if (validation) disableValidation()
    }

    editSalesPackage = ( salesPackage, index ) => {
        const {onEdit} = this.props;
        if ( onEdit ) onEdit(index);

    };

    update = (selected) => {
        this.setState({selected: selected});
    };

    setBundleMethod = (bundleMethod) => {
        const {territoriesMethod } =  this.state;
        this.setState({bundleMethod});

        if ( territoriesMethod === this.worldwide ) {
            if (bundleMethod === this.individually) {
                this.fillTerritories(this.worldwide , this.individually);
            } else {
                this.setState({ territories : []})
            }
        }
    };

    setTerritoriesMethod = (territoriesMethod) => {
        this.setState({territoriesMethod: territoriesMethod, territories: []});
        this.fillTerritories(territoriesMethod, this.state.bundleMethod);
    };

    fillTerritories = (territoriesMethod, bundleMethod) => {
        if ( territoriesMethod === this.worldwide && bundleMethod === this.individually ) {
            this.setState({ territories : Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }))})
        } else {
            this.setState({ territories : []})
        }
    };

    getFilterTerritories = () => {

        const { exclusivity, salesPackages} = this.props;
        let filter = [];

        if ( !exclusivity ) return filter;

        salesPackages.forEach((salesPackage) => {
            filter = [...filter, ...salesPackage.territories.map(t => t.value)]
        });

        return filter
    };

    getExcludedTerritories = () => {

        const {territories} = this.state;
        let territoriesArray = [];

        if (!Array.isArray(territories)) {
            territoriesArray = [territories];
        } else {
            territoriesArray = territories;
        }
        let filter = this.getFilterTerritories();

        let selected = territoriesArray.map(t => t.value);
        filter = [...filter, ...selected];


        return filter.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        }).map(t=>{return {value: t, label: t}})
    };

    worldwideAvailable = () => {
        const { salesPackages, exclusivity} = this.props;

        if (!exclusivity) return true;

        return salesPackages.filter(salesPackage => salesPackage.territoriesMethod === this.worldwideExcluding).length === 0;
    };

    setSalesMethod = (salesMethod) => {
        this.setState({salesMethod});
    };

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    closeTerritoriesModal = () => {
        this.setState({ showAllTerritories: false});
    };

    selectRegion = (region, countries) => {
        this.setState({
            selectedRegion : region,
            selectedRegionCountries : countries
        });
    };

    applySelection  = () => {
        this.setState({ isOpen: false});
        this.props.disableValidation()

        const { bundleMethod, territoriesMethod, fee, salesMethod, installments, selectedRegion, selectedRegionCountries } = this.state;
        const {exclusivity} = this.props;

        const territoriesAsArray = Array.isArray(this.state.territories) ? this.state.territories : [this.state.territories];
        let salesPackagesList = [], name= "";
        let excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : territoriesAsArray;
        let territories = territoriesAsArray;
        let allTerritories = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));
        let territoriesByLabel = (exclusivity) ? this.getExcludedTerritories().map(t => t.label) : territories.map(t => t.label);
        let regionNamed = false;
        if ( this.state.isNew ) {

            if ( bundleMethod === this.individually ){

                if ( territoriesMethod === this.worldwideExcluding ){
                    salesPackagesList = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1).map((territory)=>{
                        return {
                            name : territory.label,
                            territories : [territory],
                            fee : fee,
                            salesMethod : salesMethod,
                            bundleMethod : bundleMethod,
                            territoriesMethod: territoriesMethod,
                            installments : installments
                        }
                    });
                } else {
                    salesPackagesList = territories.map((territory)=>{
                        return {
                            name : territory.label,
                            territories : [territory],
                            fee : fee,
                            salesMethod : salesMethod,
                            bundleMethod : bundleMethod,
                            territoriesMethod: territoriesMethod,
                            installments : installments
                        }
                    });
                }
            } else {

                if ( territoriesMethod === this.worldwide ){
                    name = "Worldwide";
                } else if ( territoriesMethod === this.selectedTerritories ) {

                    if ( selectedRegion && territories.length <= selectedRegionCountries.length && territories.length >= (selectedRegionCountries.length - 3) ){
                        name = selectedRegion.name;

                        if (territories.length < selectedRegionCountries.length){
                            name += " excluding ";
                            let territoriesNames = territories.map(t=>t.label);
                            let excludedFromRegion = selectedRegionCountries.filter(c=>territoriesNames.indexOf(c.label) === -1);
                            name += excludedFromRegion.map( ( territory, i )=>{
                                return territory.label
                            }).join(", ");
                        }
                        regionNamed = true;

                    } else {
                        name = territories.slice(0, 3).map( ( territory, i )=>{
                            return territory.label
                        }).join(", ");
                    }

                } else if ( territoriesMethod === this.worldwideExcluding ) {
                    territories = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1);
                    name = "Worldwide excl. " + excludedTerritories.slice(0, 3).map( ( territory, i )=>{
                        return territory.label
                    }).join(", ");
                }

                salesPackagesList = [{
                    name : name,
                    territories : territories,
                    excludedTerritories : excludedTerritories,
                    fee : fee,
                    salesMethod : salesMethod,
                    bundleMethod : bundleMethod,
                    territoriesMethod: territoriesMethod,
                    installments : installments,
                    regionNamed : regionNamed
                }]

            }

            this.props.onAdd(salesPackagesList);

        } else {
            this.props.onUpdate(this.state, this.state.index);
        }

        this.setState({
            fee: 0,
            territories: [],
            territoriesMethod : this.selectedTerritories,
            // territoriesMethod: (this.worldwideAvailable()) ? this.worldwide : this.selectedTerritories
        });
    };

    selectTerritories = (territories) => {
        this.setState({ territories });
    };

    setInstallmentType = ( type, i ) => {
        let installments = this.state.installments;
        installments[i].type = type;
        this.setState({installments});
    };

    setInstallmentDate = ( date, i ) => {
        let installments = this.state.installments;
        installments[i].date = date;
        this.setState({installments});
    };

    setInstallmentDays = ( days, i ) => {
        let installments = this.state.installments;
        installments[i].days = days;
        this.setState({installments});
    };

    setInstallmentValue = ( value, i ) => {
        let installments = this.state.installments;
        installments[i].value = value;
        this.setState({installments});
    };

    addInstallment = ( ) => {
        let installments = this.state.installments;
        installments.push({ value : 100,  type : "DAY", days: 30});
        this.setState({installments});
    };

    removeInstallment = ( i ) => {
        let installments = this.state.installments;
        installments.splice(i, 1);
        this.setState({installments});
    };

    updateFee = (e) => {
        let fee = e.target.value;
        this.setState({fee})
    };

    addBundlesAvailable = () => {
        const { exclusivity, salesPackages} = this.props;
        const { countries } = this.state;
        let territories = [], worldwide =false;

        if ( exclusivity ){
            salesPackages.map(sp => {
                if ( sp.territoriesMethod === "WORLDWIDE" && sp.bundleMethod === this.asBundle) worldwide = true;
                territories = [...territories, ...sp.territories];
            })
        }

        return !worldwide && territories.length !== Object.values(countries).length;
    };

    handleTerritories = (type) => {
        this.setState({territoriesQuantity: type});
    }

    getSoldPackages = (salesPackages) => {
        let soldPackages = [];
        salesPackages.forEach(p => {
            if (p.sold) soldPackages.push(p);
        })
        return soldPackages;
    };

    getExclusiveSoldTerritories = (soldPackages) => {
        const {territoriesMethod, countries} = this.state;
        const isExcludedTerritoriesEnabled = territoriesMethod === this.worldwideExcluding;
        const isWorldwideEnabled = territoriesMethod === this.worldwide;

        let exclusiveSoldTerritories = [];
        soldPackages.forEach(p => {
            p.territories.forEach(t => {
                exclusiveSoldTerritories.push(t)
            })
        });

        if (isExcludedTerritoriesEnabled && countries) {
            exclusiveSoldTerritories = countries.filter(c => !exclusiveSoldTerritories.some(ht => c.name === ht.label))
        }

        if (isWorldwideEnabled && exclusiveSoldTerritories.length > 0 && countries) {
            exclusiveSoldTerritories = countries
        }

        return exclusiveSoldTerritories
    };

    renderModal = () => {
        const {onClose, exclusivity, salesPackages, currency, validation} = this.props;
        const {territoriesQuantity, territoriesMethod, territories, fee} = this.state;

        const isFilterEnabled = territoriesMethod === this.selectedTerritories;
        const isMultipleEnabled = territoriesQuantity === 'multiple';
        const isExcludedTerritoriesEnabled = territoriesMethod === this.worldwideExcluding && exclusivity;
        const isWorldwideEnabled = territoriesMethod === this.worldwide;

        const soldPackages = this.getSoldPackages(salesPackages);
        const isExclusiveSoldTerritoriesEnabled = (soldPackages.length > 0 && exclusivity);

        const isOkButtonDisabled = (this.state.salesMethod === this.fixed && Number(this.state.fee) === 0) ||
            this.territoriesIncomplete() ||
            this.installmentsIncomplete()

        const isTerritoriesEmpty = territories.length === 0 && validation;

        return <Modal
            isOpen={this.state.isOpen}
            bodyOpenClassName={"selector ca-modal-open"}
            className={"ca-modal"}
            overlayClassName={"ca-modal-overlay"}
            contentLabel="Example Modal"
            onRequestClose={this.closeModal}
        >

            <div className="modal-title">
                {this.context.t("CL_STEP4_SALES_BUNDLE_POPUP_TITLE")}
                <i className="fa fa-times-circle-o close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_TERRITORIES_MODE")}
                        </label>
                        <div className={"content"}>
                            <div className={"item"} onClick={()=>this.handleTerritories('single')}>
                                {territoriesQuantity === 'single' ?
                                    <i className="fa fa-check-circle-o"/> :
                                    <i className="fa fa-circle-thin" />
                                }
                                <div className={"title"}>
                                    {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_SINGLE_TERRITORY")}
                                </div>
                            </div>
                            <div className={"item"} onClick={()=>this.handleTerritories('multiple')}>
                                {territoriesQuantity === 'multiple' ?
                                    <i className="fa fa-check-circle-o"/> :
                                    <i className="fa fa-circle-thin" />
                                }
                                <div className={"title"}>
                                    {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_MULTIPLE_TERRITORIES")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="base-full-input" style={{display: 'block'}}>
                        <label style={labelStyle}>Select territories</label>
                        {territoriesQuantity === 'multiple' && (
                            <div className={"content"}>
                                <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.selectedTerritories) } }>
                                    {territoriesMethod !== this.selectedTerritories && <i className="fa fa-circle-thin"/>}
                                    {territoriesMethod === this.selectedTerritories && <i className="fa fa-check-circle-o"/>}
                                    <div className={"title"}>
                                        {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_SELECTED_TERRITORIES")}
                                    </div>
                                </div>
                                {(!exclusivity || (exclusivity && salesPackages.length === 0)) && (
                                    <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwide) } }>
                                        {territoriesMethod !== this.worldwide && <i className="fa fa-circle-thin"/>}
                                        {territoriesMethod === this.worldwide && <i className="fa fa-check-circle-o"/>}
                                        <div className={"title"}>
                                            {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_WORLDWIDE")}
                                        </div>
                                    </div>
                                )}
                                {this.worldwideAvailable() && <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwideExcluding) } }>
                                    {territoriesMethod !== this.worldwideExcluding && <i className="fa fa-circle-thin"/>}
                                    {territoriesMethod === this.worldwideExcluding && <i className="fa fa-check-circle-o"/>}
                                    <div className={"title"}>
                                        {this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_WORLDWIDE_EXCLUDING")}
                                    </div>
                                </div>}
                            </div>
                        )}
                        <div style={{marginTop: '10px', padding: "0 15px"}}>
                            {!isMultipleEnabled && <CountrySelector
                                className={"small-select"}
                                onChange={(c) =>{this.selectTerritories([c])}}
                                value={territories[0]}
                                filter={isFilterEnabled ? this.getFilterTerritories() : []}
                                multi={false}
                                exclusiveSoldTerritories={isExclusiveSoldTerritoriesEnabled ? this.getExclusiveSoldTerritories(soldPackages) : false}
                                placeholder={isTerritoriesEmpty ? this.context.t("TERRITORIES_EMPTY") : null}
                                isInvalid={isTerritoriesEmpty}
                            />}
                            {isMultipleEnabled && <RegionCountrySelector
                                className={"small-select"}
                                onChange={this.selectTerritories}
                                onSelectRegion={this.selectRegion}
                                value={isExcludedTerritoriesEnabled ? this.getExcludedTerritories() : territories}
                                filter={isFilterEnabled ? this.getFilterTerritories() : []}
                                disabled={isWorldwideEnabled}
                                exclusiveSoldTerritories={isExclusiveSoldTerritoriesEnabled ? this.getExclusiveSoldTerritories(soldPackages) : false}
                                placeholder={isTerritoriesEmpty ? this.context.t("TERRITORIES_EMPTY") : null}
                                isInvalid={isTerritoriesEmpty}
                            />}
                            {territoriesQuantity === 'multiple' && (
                                <div className="d-flex align-items-center" onChange={(e) => {
                                    this.setBundleMethod(e.target.value)
                                }}>
                                    <div style={{margin: '15px 15px 10px 0', fontSize: '14px'}}>
                                        {this.context.t("CL_STEP4_EDIT_BUNDLE_AS_PACKAGE")}
                                    </div>
                                    <div className={cn({ 'font-weight-bold': this.state.bundleMethod === this.asBundle })} style={{marginRight:20}}>
                                        <input className="ca-radio" type="radio" value={this.asBundle}
                                               checked={this.state.bundleMethod === this.asBundle} style={{marginRight:5}}
                                        />
                                        {this.context.t('Yes')}
                                    </div>
                                    <div className={cn({ 'font-weight-bold': this.state.bundleMethod === this.individually })}>
                                        <input className="ca-radio" type="radio" value={this.individually}
                                               checked={this.state.bundleMethod === this.individually} style={{marginRight:5}}
                                        />
                                        {this.context.t('No')}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                    <div className="base-full-input">
                        <label style={labelStyle}>Sales method</label>
                        <div style={{padding: '10px 18px 0px', fontSize: '14px'}}>
                            {this.context.t("CL4_TERRITORIES_BUNDLE_SALES_INFO")}
                        </div>
                        <div className={"content"}>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.fixed) } }>
                                {this.state.salesMethod !== this.fixed && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.fixed && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    {this.context.t("CL_STEP4_EDIT_BUNDLE_TYPE_FIXED")}
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.bidding) } }>
                                {this.state.salesMethod !== this.bidding && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.bidding && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    {this.context.t("CL_STEP4_EDIT_BUNDLE_TYPE_BIDDING")}
                                </div>
                            </div>
                            <div className={"item"} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <span>
                                    {this.state.salesMethod === this.fixed && "Fixed fee"}
                                    {this.state.salesMethod !== this.fixed && "Minimum bid (optional)"}
                                </span>
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={fee}
                                    onValueChange={(values) => {
                                        const {value} = values;
                                        this.setState({fee : value})
                                    }}
                                    min={0}
                                    style={{ height: "26px", width: "100px" }}
                                    prefix={getCurrencySymbol(currency)+ " "}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle}>Payment details</label>
                        <div style={{padding: '10px 18px 0px', fontSize: '14px'}}>
                            {this.context.t("CL4_TERRITORIES_BUNDLE_PAYMENT_INFO")}
                        </div>
                        {this.state.installments.map( (installment, i, list) => {
                            return <div className="content">
                                <div className={"item"} style={{
                                    marginRight: 55,
                                    paddingLeft: 10
                                }}>
                                    <div className={"title"}>
                                        {i + 1} Installment(s)
                                        <input onChange={(e) => {this.setInstallmentValue(e.target.value, i)}}
                                               style={{height: "26px", width: "70px"}} type="number" max={100}
                                               value={installment.value}
                                               placeholder={validation && !installment.value ? this.context.t('INSTALMENTS_EMPTY') : ''}
                                               className={validation && !installment.value ? 'is-invalid' : ''}
                                        />
                                        {" "}
                                        {this.context.t("CL_STEP4_INSTALLMENTS_PERCENTAGE")}
                                    </div>
                                    {installment.type !== "DATE" && <i style={installmentIconStyle} className="fa fa-circle-thin" onClick={() => { this.setInstallmentType("DATE",i)}}  />}
                                    { installment.type === "DATE" && <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
                                    <div className={"title"} onClick={() => { this.setInstallmentType("DATE",i)}}>
                                        <DatePicker
                                            disabled={installment.type !== "DATE"}
                                            selected={installment.date}
                                            placeholderText={DATE_FORMAT.toLowerCase()}
                                            dateFormat={DATE_FORMAT}
                                            minDate={moment()}
                                            onChange={(date) => {this.setInstallmentDate(date,i)}}
                                            className="small-datepicker"/>
                                    </div>
                                    { installment.type !== "DAY" && <i style={installmentIconStyle} className="fa fa-circle-thin" onClick={() => { this.setInstallmentType("DAY",i)} }/>}
                                    { installment.type === "DAY" && <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
                                    <div className={"title"} onClick={() => { this.setInstallmentType("DAY",i)} }>
                                        <input
                                            type="number"
                                            min={0}
                                            onChange={(e) => {this.setInstallmentDays(e.target.value,i)}}
                                            disabled={installment.type !== "DAY"}
                                            value={installment.days}
                                            style={{ height: "26px", width: "70px" }}/>
                                        {" "}
                                        {this.context.t("CL_STEP4_INSTALLMENTS_DAYS_AFTER")}
                                    </div>
                                </div>
                                { i !== 0 && <i style={{
                                    position: 'absolute',
                                    color: 'red',
                                    fontSize: 26,
                                    right: 36,
                                    top: 12
                                }} className="fa fa-minus-circle" onClick={() => { this.removeInstallment(i) }}/>}
                                { i === list.length - 1 && <i style={{
                                    position: 'absolute',
                                    color: 'green',
                                    fontSize: 26,
                                    right: 5,
                                    top: 12
                                }} className="fa fa-plus-circle" onClick={this.addInstallment}/>}
                            </div>
                        }) }


                    </div>

                </div>
            </div>

            <div className="error" style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '12px',
                color: 'red'
            }}>
                { this.installmentsIncomplete() && this.context.t("CL_STEP4_EDIT_BUNDLE_INSTALLMENT_WARNING")}
            </div>

            <div className={"buttons"}>
                {isOkButtonDisabled ? (
                    <button className='standard-button disabled' onClick={this.props.enableValidation}>
                        Ok
                    </button>
                ) : (
                    <button className='standard-button' onClick={this.applySelection}>
                        Ok
                    </button>
                )}
            </div>
        </Modal>
    };

    territoriesIncomplete = () => {
        const {territoriesMethod, territories} = this.state;

        if ( territoriesMethod === this.selectedTerritories && territories.length === 0 ) return true;

        if ( territoriesMethod === this.worldwideExcluding
            && territories.length === 0
            && this.getExcludedTerritories().length === 0 ) return true;

    };

    showAllTerritories = (extraTerritories) => {
        this.setState({
            showAllTerritories : true,
            territoriesList : extraTerritories
        })
    };

    showTerritories = (salesPackage) => {
        return ( salesPackage.bundleMethod === this.individually &&
        salesPackage.territoriesMethod === this.worldwide ) ||
            salesPackage.territoriesMethod !== this.worldwide;
    };

    installmentsIncomplete = () => {
        const { installments } = this.state;
        let total = 0;

        installments.forEach(i=>{
            total += Number(i.value);
        });

        return total !== 100;

    };

    sortSalesPackages = (a, b) => {

        let aWorldwide = a.territoriesMethod ==="WORLDWIDE";
        let bWorldwide = b.territoriesMethod ==="WORLDWIDE";

        let worldwide = ( aWorldwide && !bWorldwide ) ? 1 : ((bWorldwide && !aWorldwide) ? -1 : 0);

        return worldwide ||this.compareProperty(a.territories.length, b.territories.length)
            || this.compareProperty(a.name, b.name);
    };

    compareProperty = (a, b) =>  {
        return (a > b) ? 1 : ((b > a) ? -1 : 0);
    };

    isShowFee = (salesPackage) => {
        return salesPackage.salesMethod !== "BIDDING" || (salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0);
    };

    render(){
        const { onRemove, hideButtons, fullSize, sort, listingId, currency, validation } = this.props;
        let inputStyle = (fullSize) ? { maxWidth: 'none'} : null ;
        let salesPackages = this.props.salesPackages;

        const isBundlesInvalid = salesPackages.length === 0 && validation;

        if (sort) salesPackages.sort(this.sortSalesPackages);
        return (
            <div className={`sales-package-form ${isBundlesInvalid ? 'is-invalid':''}`}>
                { this.renderModal() }
                <div className="base-full-input" style={inputStyle}>
                    <label>
                        {this.context.t("CL_STEP4_SALES_BUNDLES")}
                    </label>
                    <div>
                        {this.context.t("CL_STEP4_TERRITORIAL_BUNDLES_DESCRIPTION")}
                    </div>

                    {!salesPackages.length && this.addBundlesAvailable() && (
                        <div className={`sales-bundles-placeholder`}>
                            {this.renderAddSalesBundleButton()}
                        </div>
                    )}

                    {salesPackages.length > 0 && <SalesPackageTable
                        salesPackages={salesPackages}
                        currency={currency}
                        listingId={listingId}
                        onRemove={onRemove}
                        editSalesPackage={this.editSalesPackage}
                        hideButtons={hideButtons}
                    />}
                </div>

                {!hideButtons && <div style={{display : "flex", justifyContent: "flex-end"}}>
                    {this.addBundlesAvailable() && this.renderAddSalesBundleButton() }
                    {salesPackages.length > 0 && <div className={"add-item"} onClick={this.props.onRemoveAll}>
                        <i className="fa fa-minus-circle"/>
                        {this.context.t("CL_STEP4_REMOVE_ALL_BUNDLES")}
                    </div>}
                </div>}

            </div>
        )

    }

    renderAddSalesBundleButton() {
        return (
            <div className={"add-item"} onClick={()=>{this.setState({isOpen:true, isNew : true})}}>
                <i className="fa fa-plus-circle"/>
                {this.context.t("CL_STEP4_ADD_SALES_BUNDLE")}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        validation: state.validation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        enableValidation: () => dispatch(enableValidation()),
        disableValidation: () => dispatch(disableValidation()),
    }
};

SalesPackageForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesPackageForm)