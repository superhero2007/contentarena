import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import CountrySelector from "../../main/components/CountrySelector";
import DatePicker from 'react-datepicker';
import {PropTypes} from "prop-types";

const labelStyle = { height: "30px", fontSize: "12px"};
const installmentIconStyle = { margin: "0 10px", position: "relative"};
const smallContainerStyle = {
    display: 'inline-block',
    overflowY: 'overlay',
    maxHeight: '200px'
};
const containerStyle = {
    display: 'inline-block'
};

class SalesPackageEdit extends React.Component {

    constructor(props) {
        super(props);
        let salesPackage = props.salesPackages[props.salesPackageId] || {};

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
            bundleMethod : salesPackage.bundleMethod,
            territoriesMethod : salesPackage.territoriesMethod,
            salesMethod : salesPackage.salesMethod,
            territories : (salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? salesPackage.excludedTerritories : salesPackage.territories,
            filterTerritories : [],
            installments : salesPackage.installments || [],
            fee : salesPackage.fee,
            salesPackageId: salesPackage.id,
            isNew : true
        };
        this.bidIcon = assetsBaseDir + "app/images/auction.svg";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";

    }

    update = (selected) => {
        this.setState({selected: selected});
    };

    setBundleMethod = (bundleMethod) => {
        this.setState({bundleMethod});
        this.fillTerritories(this.state.territoriesMethod, bundleMethod);
    };

    setTerritoriesMethod = (territoriesMethod) => {
        this.setState({territoriesMethod});
        this.fillTerritories(territoriesMethod, this.state.bundleMethod);
    };

    fillTerritories = (territoriesMethod, bundleMethod) => {
        if ( territoriesMethod === this.worldwide &&
            bundleMethod === this.individually ) {
            this.setState({ territories : Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }))})
        } else {
            this.setState({ territories : []})
        }
    };

    getFilterTerritories = () => {

        const { exclusivity, salesPackages, salesPackageId} = this.props;
        let filter = [];

        if ( !exclusivity ) return filter;

        salesPackages.forEach((salesPackage, id) => {
            if (salesPackageId !== id) filter = [...filter, ...salesPackage.territories.map(t => t.value)]
        });

        return filter
    };

    getExcludedTerritories = () => {

        const {territories} = this.state;

        let filter = this.getFilterTerritories();

        let selected = territories.map(t => t.value);
        filter = [...filter, ...selected];


        return filter.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        }).map(t=>{return {value: t, label: t}})
    };

    preselectedExcluded = () => {
        const { salesPackages} = this.props;
        return salesPackages.filter(salesPackage => salesPackage.territoriesMethod === this.selectedTerritories).length === 0;
    };

    setSalesMethod = (salesMethod) => {
        this.setState({salesMethod});
    };

    closeModal = () => {
        const {onClose} = this.props;
        if ( onClose) onClose();
    };

    getName = () => {

        const { exclusivity} = this.props;
        const {territoriesMethod} = this.state;
        let excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : this.state.territories;
        let territories = this.state.territories;

        let name = "";

        if ( territoriesMethod === this.worldwide ){
            name = "Worldwide";
        } else if ( territoriesMethod === this.selectedTerritories ) {
            name = territories.slice(0, 3).map( ( territory, i )=>{
                return territory.label
            }).join(", ");

        } else if ( territoriesMethod === this.worldwideExcluding ) {

            name = "Worldwide excluding " + excludedTerritories.slice(0, 3).map( ( territory, i )=>{
                return territory.label
            }).join(", ");
        }

        return name;

    };

    applySelection  = () => {
        const {  fee, bundleMethod, territoriesMethod, salesMethod, installments } = this.state;
        const { salesPackageId , exclusivity} = this.props;
        let excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : this.state.territories;
        let territories = this.state.territories;
        let allTerritories = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));
        let territoriesByLabel = (exclusivity) ? this.getExcludedTerritories().map(t => t.label) : territories.map(t => t.label);
        if ( territoriesMethod === this.worldwideExcluding ) territories = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1);
        this.props.onUpdate({
            name : this.getName(),
            territories : territories,
            excludedTerritories : (territoriesMethod === this.worldwideExcluding) ? excludedTerritories : [],
            fee : fee,
            salesMethod : salesMethod,
            territoriesMethod : territoriesMethod,
            bundleMethod : bundleMethod,
            installments : installments,
            id: this.state.salesPackageId,
            edited : true
        }, salesPackageId);
        this.closeModal();
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

    render = () => {

        const {salesPackages, salesPackageId} = this.props;
        let salesPackage = salesPackages[salesPackageId] || {};

        return <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="modal-title">
                {this.context.t("Sales bundle")}
                <i className="fa fa-times-circle-o close-icon" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">
                    <div className="base-full-input">
                        <label style={labelStyle}>
                            {this.context.t("Territories")}
                            {this.state.territoriesMethod === this.worldwideExcluding && ": Worldwide exluding"}
                        </label>
                    </div>

                    { (this.state.bundleMethod === this.asBundle ) && ( this.state.territoriesMethod === this.selectedTerritories )
                    && <CountrySelector
                        className={"small-select"}
                        value={this.state.territories}
                        onChange={this.selectTerritories}
                        filter={this.getFilterTerritories()} />}

                    { (this.state.bundleMethod === this.asBundle ) && ( this.state.territoriesMethod === this.worldwideExcluding )
                    &&
                    <CountrySelector
                        className={"small-select"}
                        value={this.getExcludedTerritories()}
                        onChange={this.selectTerritories} />
                    }

                    { (this.state.bundleMethod === this.individually )
                    && <div style={{ padding: '10px 5px 20px'}}>
                        { salesPackage.name}
                    </div> }

                    { (this.state.bundleMethod === this.asBundle )
                    && ( this.state.territoriesMethod === this.worldwide )
                    && <div style={{ padding: '10px 5px 20px'}}>
                        {this.context.t("Worldwide")}
                    </div> }

                    <div className="base-full-input">
                        <label style={labelStyle}>
                            {this.context.t("Sales method")}
                        </label>
                        <div className={"content"}>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.fixed) } }>
                                {this.state.salesMethod !== this.fixed && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.fixed && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    {this.context.t("Fixed fee")}
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setSalesMethod(this.bidding) } }>
                                {this.state.salesMethod !== this.bidding && <i className="fa fa-circle-thin"/>}
                                {this.state.salesMethod === this.bidding && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    {this.context.t("Bidding")}
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
                        <label style={labelStyle}>
                            {this.context.t("Payment details")}
                        </label>

                        { this.state.installments.map( (installment, i, list) => {
                            return <div className={"content"}>
                                <div className={"item"} style={{ paddingLeft: 0 }}>
                                    <div className={"title"} >
                                        {i+1} Instalment <input onChange={(e) => {this.setInstallmentValue(e.target.value,i)}} style={{ height: "26px", width: "50px" }} type="number" max={100} value={installment.value}/> % of payment
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
                                        style={{ height: "26px", width: "40px" }}/>
                                        {this.context.t("days after contract conclusion")}
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
                { this.installmentsIncomplete() && this.context.t("the total instalment percentage must accumulate to 100%")}
            </div>

            <div className={"buttons"}>
                <button
                    className="standard-button"
                    disabled={
                        ( this.state.salesMethod === this.fixed && Number( this.state.fee ) === 0 ) ||
                        ( this.state.territoriesMethod !== this.worldwide && this.state.territories.length === 0 ) ||
                            this.installmentsIncomplete()
                    }
                    onClick={this.applySelection}>Ok</button>
            </div>
        </Modal>
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
        return salesPackage.fee + " " + this.getCurrencySymbol();
    };

    getCurrencySymbol = () => {
        const {currency} = this.props;
        return (currency === "EUR" ? "€" : "$");
    };

}

SalesPackageEdit.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SalesPackageEdit;