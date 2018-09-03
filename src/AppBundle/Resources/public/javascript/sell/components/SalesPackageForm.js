import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import CountrySelector from "../../main/components/CountrySelector";
import CurrencySelector from "../components/CurrencySelector";
import DatePicker from 'react-datepicker';
import Tooltip from '../../main/components/Tooltip';
import LicenseDownloader from '../../main/components/LicenseDownloader'
import {PropTypes} from "prop-types";
import RegionCountrySelector from "../../main/components/RegionCountrySelector";

const labelStyle = { height: "30px", fontSize: "12px"};
const installmentIconStyle = { margin: "0 10px", position: "relative"};
const smallContainerStyle = {
    display: 'inline-block',
    overflowY: 'overlay',
    maxHeight: '200px',
    paddingRight: 20
};
const containerStyle = {
    display: 'inline-block',
    paddingTop: 5
};

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
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.draftIcon = assetsBaseDir + "app/images/draft.png";
        this.cancelIcon = assetsBaseDir + "app/images/cancel.png";
    }

    componentDidMount() {
        ContentArena.Api.getCountries().done( (countries ) => {
            this.setState({countries})
        });
    }

    editSalesPackage = ( salesPackage, index ) => {
        const {onEdit} = this.props;
        if ( onEdit ) onEdit(index);

    };

    update = (selected) => {
        this.setState({selected: selected});
    };

    setBundleMethod = (bundleMethod) => {
        this.setState({bundleMethod});
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

    closeTerritoiesModal = () => {
        this.setState({ showAllTerritories: false});
    };

    applySelection  = () => {
        this.setState({ isOpen: false});

        const { bundleMethod, territoriesMethod, fee, salesMethod, installments } = this.state;
        const {exclusivity} = this.props;

        const territoriesAsArray = Array.isArray(this.state.territories) ? this.state.territories : [this.state.territories];
        let salesPackagesList = [], name= "";
        let excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : territoriesAsArray;
        let territories = territoriesAsArray;
        let allTerritories = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));
        let territoriesByLabel = (exclusivity) ? this.getExcludedTerritories().map(t => t.label) : territories.map(t => t.label);
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
                    salesPackagesList = allTerritories.map((territory)=>{
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
                    name = territories.slice(0, 3).map( ( territory, i )=>{
                        return territory.label
                    }).join(", ");

                } else if ( territoriesMethod === this.worldwideExcluding ) {
                    territories = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1);
                    name = "Worldwide excluding " + excludedTerritories.slice(0, 3).map( ( territory, i )=>{
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
                    installments : installments
                }]

            }

            this.props.onAdd(salesPackagesList);

        } else {
            this.props.onUpdate(this.state, this.state.index);
        }

        this.setState({
            fee: 0,
            territories: [],
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

    renderModal = () => {

        const {onClose, exclusivity, salesPackages} = this.props;
        const {territoriesQuantity, territoriesMethod, territories} = this.state;

        const isFilterEnabled = territoriesMethod === this.selectedTerritories;
        const isMultipleEnabled = territoriesQuantity === 'multiple';
        const isExcludedTerritoriesEnabled = territoriesMethod === this.worldwideExcluding;
        const isWorldwideEnabled = territoriesMethod === this.worldwide;

        return <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="modal-title">
                Sales bundle
                <i className="fa fa-times-circle-o close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            How would you like to sell your content?
                        </label>
                        <div className={"content"}>
                            <div className={"item"} onClick={()=>this.handleTerritories('single')}>
                                {territoriesQuantity === 'single' ?
                                    <i className="fa fa-check-circle-o"/> :
                                    <i className="fa fa-circle-thin" />
                                }
                                <div className={"title"}>
                                    Add single territory
                                </div>
                            </div>
                            <div className={"item"} onClick={()=>this.handleTerritories('multiple')}>
                                {territoriesQuantity === 'multiple' ?
                                    <i className="fa fa-check-circle-o"/> :
                                    <i className="fa fa-circle-thin" />
                                }
                                <div className={"title"}>
                                    Add multiple territory
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
                                        Selected territories only
                                    </div>
                                </div>
                                {(!exclusivity || (exclusivity && salesPackages.length === 0)) && (
                                    <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwide) } }>
                                        {territoriesMethod !== this.worldwide && <i className="fa fa-circle-thin"/>}
                                        {territoriesMethod === this.worldwide && <i className="fa fa-check-circle-o"/>}
                                        <div className={"title"}>
                                            Worldwide
                                        </div>
                                    </div>
                                )}
                                {this.worldwideAvailable() && <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwideExcluding) } }>
                                    {territoriesMethod !== this.worldwideExcluding && <i className="fa fa-circle-thin"/>}
                                    {territoriesMethod === this.worldwideExcluding && <i className="fa fa-check-circle-o"/>}
                                    <div className={"title"}>
                                        Worldwide excluding
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

                            />}
                            {isMultipleEnabled && <RegionCountrySelector
                                className={"small-select"}
                                onChange={this.selectTerritories}
                                value={isExcludedTerritoriesEnabled ? this.getExcludedTerritories() : territories}
                                filter={isFilterEnabled ? this.getFilterTerritories() : []}
                                disabled={isWorldwideEnabled}
                            />}
                            {territoriesQuantity === 'multiple' && (
                                <div>
                                    <input type="checkbox"
                                           className="ca-checkbox"
                                           style={{width:'inherit', height: '20px'}}
                                           defaultChecked={this.state.bundleMethod === this.asBundle}
                                           onChange={(e)=>{this.setBundleMethod(e.target.checked ? this.asBundle: this.individually)}}
                                    />
                                    <span style={{verticalAlign:'middle', marginLeft: '5px', fontSize: '14px'}}>
                                        Offer selected territories together as one territory package
                                    </span>
                                    <Tooltip
                                        id="offer_info"
                                        text="Test text"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="base-full-input">
                        <label style={labelStyle}>Sales method</label>
                        <div className={"content"}>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.fixed) } }>
                                {this.state.salesMethod !== this.fixed && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.fixed && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Fixed fee
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.bidding) } }>
                                {this.state.salesMethod !== this.bidding && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.bidding && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Bidding
                                </div>
                            </div>
                            <div className={"item"} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <span>
                                    {this.state.salesMethod === this.fixed && "Fixed fee"}
                                    {this.state.salesMethod !== this.fixed && "Minimum bid (optional)"}
                                </span>
                                <input
                                    type="number"
                                    min={0}
                                    onChange={this.updateFee}
                                    value={this.state.fee}
                                    style={{ height: "26px", width: "80px" }}/>
                                <span style={{width: 'auto', padding: '0 10px'}}>{ this.getCurrencySymbol() }</span>
                            </div>
                        </div>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle}>Payment details</label>

                        { this.state.installments.map( (installment, i, list) => {
                            return <div className={"content"}>
                                <div className={"item"} style={{ paddingLeft: 0 }}>
                                    <div className={"title"} >
                                        {i+1} Instalment <input onChange={(e) => {this.setInstallmentValue(e.target.value,i)}} style={{ height: "26px", width: "70px" }} type="number" max={100} value={installment.value}/> % of payment
                                    </div>
                                    {installment.type !== "DATE" && <i style={installmentIconStyle} className="fa fa-circle-thin" onClick={() => { this.setInstallmentType("DATE",i)}}  />}
                                    { installment.type === "DATE" && <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
                                    <div className={"title"}>
                                        <DatePicker
                                            disabled={installment.type !== "DATE"}
                                            selected={installment.date}
                                            placeholderText={"dd/mm/yyyy"}
                                            onChange={(date) => {this.setInstallmentDate(date,i)}}
                                            className="small-datepicker"/>
                                    </div>
                                    { installment.type !== "DAY" && <i style={installmentIconStyle} className="fa fa-circle-thin" onClick={() => { this.setInstallmentType("DAY",i)} }/>}
                                    { installment.type === "DAY" && <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
                                    <div className={"title"} >
                                    <input
                                        type="number"
                                        min={0}
                                        onChange={(e) => {this.setInstallmentDays(e.target.value,i)}}
                                        disabled={installment.type !== "DAY"}
                                        value={installment.days}
                                        style={{ height: "26px", width: "70px" }}/> days after contract conclusion
                                    </div>
                                    { i !== 0 && <i style={{margin: 0, position: "relative"}} className="fa fa-minus-circle" onClick={() => { this.removeInstallment(i) }}/>}
                                    { i === list.length - 1 && <i style={{margin: 0, position: "relative"}} className="fa fa-plus-circle" onClick={this.addInstallment}/>}
                                </div>
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
                { this.installmentsIncomplete() && "the total instalment percentage must accumulate to 100%"}
            </div>

            <div className={"buttons"}>
                <button
                    className="standard-button"
                    disabled={
                        ( this.state.salesMethod === this.fixed && Number( this.state.fee ) === 0 ) ||
                        this.territoriesIncomplete() ||
                        this.installmentsIncomplete()
                    }
                    onClick={this.applySelection}>Ok</button>
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

    allTerritories = () => {

        return <Modal
            isOpen={this.state.showAllTerritories}
            onRequestClose={this.closeTerritoiesModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div style={{
                color: 'grey',
                padding: 20,
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {
                    this.state.territoriesList.map(territory =>{
                        return <div className="country-modal">
                            {territory.label}
                        </div>
                    })
                }
            </div>

        </Modal>
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

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + this.getCurrencySymbol();
    };

    getCurrencySymbol = () => {
        const {currency} = this.props;
        return (currency === "EUR" ? "€" : "$");
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

    render(){
        const { onRemove, hideButtons, currency, fullSize, sort, listingId, selectCurrency } = this.props;
        let inputStyle = (fullSize) ? { maxWidth: 'none'} : null ;
        let salesPackages = this.props.salesPackages;

        if (sort) salesPackages.sort(this.sortSalesPackages);
        return (
            <div className="sales-package-form">
                { this.renderModal() }
                { this.allTerritories() }
                <div className="base-full-input" style={inputStyle}>
                    <label>
                        <div className='label-text'>
                            {this.context.t("Sales bundles")}
                        </div>
                        <CurrencySelector onClick={selectCurrency} selected={currency} />
                        <div className='clearfix'/>
                    </label>

                    {!salesPackages.length && this.addBundlesAvailable() && (
                        <div className='sales-bundles-placeholder'>
                            {this.renderAddSalesBundleButton()}
                        </div>
                    )}

                    <div className="content" style={(hideButtons) ? containerStyle: smallContainerStyle}>
                        { salesPackages.map( (salesPackage, i) => {

                            let extraTerritories = ( salesPackage.territoriesMethod === this.worldwideExcluding) ? salesPackage.excludedTerritories : salesPackage.territories;

                            return <div className="sales-package-container" key={i}>
                                <div className="sales-package" key={"sales-package-"+ i}>
                                    <div style={{flex : 5, cursor: 'default'}}>
                                        {salesPackage.name}
                                        {
                                            extraTerritories && extraTerritories.length > 3 && <span
                                                style={{
                                                    color: '#2DA7E6',
                                                    textDecoration: 'underline',
                                                    marginLeft : 5
                                                }}
                                                onClick={() => {this.showAllTerritories(extraTerritories)}}>
                                                {"+" + (extraTerritories.length - 3)}
                                            </span>
                                        }
                                    </div>

                                    {hideButtons && <LicenseDownloader
                                        type={"BUNDLE"}
                                        id={salesPackage.id}
                                        listingId={listingId}
                                        style={{flex : 1, display: 'flex', justifyContent: 'center'}} />}


                                    {salesPackage.territories.length !== 1 &&<div style={{ marginLeft: 20, justifyContent: "flex-end", display: "flex"}}>
                                        <img style={{    marginTop: '2px',width: 26, height: 23}} src={this.fixedIcon}/>
                                    </div>}

                                    {salesPackage.salesMethod === "BIDDING" &&<div style={{ marginLeft: 20, justifyContent: "flex-end", display: "flex"}}>
                                        <img style={{width: 23, height: 23}} src={this.bidIcon}/>
                                    </div>}

                                    {
                                        ( salesPackage.salesMethod !== "BIDDING" ||  ( salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0 ) )
                                        &&<div style={{ marginLeft: 20, justifyContent: "flex-end", display: "flex", cursor: 'default'}}>
                                            {this.getFee(salesPackage)}
                                        </div>
                                    }
                                </div>
                                {!hideButtons && <img style={{width: 23, height: 23, cursor: 'pointer', margin: '15px 5px 0'}}
                                                      src={this.cancelIcon}
                                                      onClick={() => { onRemove(i) }}/>}
                                {!hideButtons && <img style={{width: 23, height: 23, cursor: 'pointer', margin: '15px 5px 0', color: 'grey'}}
                                                      src={this.draftIcon}
                                                      onClick={() => { this.editSalesPackage(salesPackage, i) }}/>}

                            </div>
                        })}

                    </div>
                </div>

                {!hideButtons && <div style={{display : "flex", justifyContent: "flex-end"}}>
                    {this.addBundlesAvailable() && this.renderAddSalesBundleButton() }
                    {salesPackages.length > 0 && <div className={"add-item"} onClick={this.props.onRemoveAll}>
                        <i className="fa fa-minus-circle"/>
                        {this.context.t("Remove all")}
                    </div>}
                </div>}

            </div>
        )

    }

    renderAddSalesBundleButton() {
        return (
            <div className={"add-item"} onClick={()=>{this.setState({isOpen:true, isNew : true})}}>
                <i className="fa fa-plus-circle"/>
                {this.context.t("Add sales bundle")}
            </div>
        );
    }
}

SalesPackageForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SalesPackageForm;