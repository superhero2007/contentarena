import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import CountrySelector from "../../main/components/CountrySelector";
import DatePicker from 'react-datepicker';

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
            territoriesMethod : this.worldwide,
            salesMethod : this.fixed,
            territories : [],
            filterTerritories : [],
            installments : [{ value : 100,  type : "DAY", days: 30}],
            fee : 0,
            isNew : true
        };
        this.bidIcon = assetsBaseDir + "app/images/auction.svg";
    }

    editSalesPackage = ( salesPackage, index ) => {
        salesPackage.isOpen = true;
        salesPackage.isNew = false;
        salesPackage.index = index;
        this.setState(salesPackage);
    };

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

        const {salesPackages} = this.props;
        let filter = [];

        salesPackages.forEach((salesPackage) => {
            if ( salesPackage.bundleMethod === this.individually){
                filter = [...filter, ...salesPackage.territories.map(t => t.value)]
            }
        });

        return filter
    };

    setSalesMethod = (salesMethod) => {
        this.setState({salesMethod});
    };

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    applySelection  = () => {
        this.setState({ isOpen: false});

        const { bundleMethod, territoriesMethod, territories, fee, salesMethod } = this.state;
        let salesPackagesList = [], name= "";

        let allTerritories = Object.values(ContentArena.Data.Countries).map((i,k)=>({value : i.name , label : i.name }));
        let territoriesByLabel = territories.map(t => t.label);

        if ( this.state.isNew ) {

            if ( bundleMethod === this.individually ){

                if ( territoriesMethod === this.worldwideExcluding ){
                    salesPackagesList = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1).map((territory)=>{
                        return {
                            name : territory.label,
                            territories : [territory],
                            fee : fee,
                            salesMethod : salesMethod,
                            bundleMethod : bundleMethod
                        }
                    });
                } else {
                    salesPackagesList = territories.map((territory)=>{
                        return {
                            name : territory.label,
                            territories : [territory],
                            fee : fee,
                            salesMethod : salesMethod,
                            bundleMethod : bundleMethod
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
                    if (territories.length > 3 ) name += " +" + (territories.length - 3);
                } else if ( territoriesMethod === this.worldwideExcluding ) {
                    name = "Worldwide excluding " + territories.slice(0, 3).map( ( territory, i )=>{
                        return territory.label
                    }).join(", ");

                    if (territories.length > 3 ) name += " +" + (territories.length - 3);

                }


                salesPackagesList = [{
                    name : name,
                    territories : territories,
                    fee : fee,
                    salesMethod : salesMethod
                }]

            }

            this.props.onAdd(salesPackagesList);

        } else {
            this.props.onUpdate(this.state, this.state.index);
        }

        this.setState({territories: []});
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

    renderModal = () => {

        const {onClose} = this.props;

        return <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <div className="modal-title">
                Sales bundle
                <i className="fa fa-times-circle-o" onClick={this.closeModal}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">

                    <div className="base-full-input">
                        <label style={labelStyle} >
                            How would you like to sell your content?
                        </label>
                        <div className={"content"}>
                            <div className={"item"} onClick={() => { this.setBundleMethod(this.asBundle) } }>
                                {this.state.bundleMethod !== this.asBundle && <i className="fa fa-circle-thin"/>}
                                {this.state.bundleMethod === this.asBundle && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Sell all/selected territories as bundle
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setBundleMethod(this.individually) } }>
                                {this.state.bundleMethod !== this.individually && <i className="fa fa-circle-thin"/>}
                                {this.state.bundleMethod === this.individually && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Sell territories individually
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle}>Select territories</label>
                        <div className={"content"}>
                            <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwide) } }>
                                {this.state.territoriesMethod !== this.worldwide && <i className="fa fa-circle-thin"/>}
                                {this.state.territoriesMethod === this.worldwide && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Worldwide
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.selectedTerritories) } }>
                                {this.state.territoriesMethod !== this.selectedTerritories && <i className="fa fa-circle-thin"/>}
                                {this.state.territoriesMethod === this.selectedTerritories && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Selected territories only
                                </div>
                            </div>
                            <div className={"item"} onClick={() => { this.setTerritoriesMethod(this.worldwideExcluding) } }>
                                {this.state.territoriesMethod !== this.worldwideExcluding && <i className="fa fa-circle-thin"/>}
                                {this.state.territoriesMethod === this.worldwideExcluding && <i className="fa fa-check-circle-o"/>}
                                <div className={"title"}>
                                    Worldwide excluding
                                </div>
                            </div>
                        </div>
                    </div>

                    {   this.state.territoriesMethod !== this.worldwide &&
                        <CountrySelector
                            className={"small-select"}
                            value={this.state.territories}
                            onChange={this.selectTerritories}
                            filter={this.getFilterTerritories()} />
                    }


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
                            </div>
                        </div>
                    </div>

                    <div className="base-full-input">
                        <label style={labelStyle}>Payment details</label>

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
                                        style={{ height: "26px", width: "40px" }}/> days after contract conclusion
                                    </div>
                                    { i !== 0 && <i style={{margin: 0, position: "relative"}} className="fa fa-minus-circle" onClick={() => { this.removeInstallment(i) }}/>}
                                    { i === list.length - 1 && <i style={{margin: 0, position: "relative"}} className="fa fa-plus-circle" onClick={this.addInstallment}/>}
                                </div>
                            </div>
                        }) }


                    </div>

                </div>
            </div>

            <div className={"buttons"}>
                <button
                    className={"standard-button"}
                    onClick={this.applySelection}>Ok</button>
            </div>
        </Modal>
    };

    showTerritories = (salesPackage) => {
        return ( salesPackage.bundleMethod === this.individually &&
        salesPackage.territoriesMethod === this.worldwide ) ||
            salesPackage.territoriesMethod !== this.worldwide;
    };

    render(){
        const { salesPackages, onRemove, hideButtons } = this.props;
        return (
            <div className={"sales-package-form"}>
                { this.renderModal() }
                <div className="base-full-input">
                    <label>Sales bundles</label>
                    <div className={"content"} style={(hideButtons) ? containerStyle: smallContainerStyle}>
                        { salesPackages.map( (salesPackage, i) => {
                            return <div className="sales-package-container">
                                        <div className="sales-package" key={"sales-package-"+ i}>
                                            <div style={{flex : 5}}>
                                                {salesPackage.name}
                                            </div>
                                            {salesPackage.salesMethod === "BIDDING" &&<div style={{flex : 1, justifyContent: "flex-end", display: "flex"}}>
                                                <img style={{width: 30}} src={this.bidIcon}/>
                                            </div>}

                                            {
                                                ( salesPackage.salesMethod !== "BIDDING" ||  ( salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0 ) )
                                                &&<div style={{flex : 1, justifyContent: "flex-end", display: "flex"}}>
                                                    $ {salesPackage.fee}
                                                </div>
                                            }
                                        </div>
                                        <i className="fa fa-remove" onClick={() => { onRemove(i) }} />
                                        <i className="fa fa-edit" onClick={() => { this.editSalesPackage(salesPackage, i) }} />
                                    </div>
                        })}

                    </div>
                </div>

                {!hideButtons && <div style={{display : "flex"}}>
                    <div className={"add-item"} onClick={()=>{this.setState({isOpen:true, isNew : true})}}>
                        <i className="fa fa-plus-circle"/> Add sales bundle
                    </div>
                    {salesPackages.length > 0 && <div className={"add-item"} onClick={this.props.onRemoveAll} style={{marginLeft: 20}}>
                        <i className="fa fa-minus-circle"/> Remove all
                    </div>}
                </div>}

            </div>
        )
    }
}

export default SalesPackageForm;