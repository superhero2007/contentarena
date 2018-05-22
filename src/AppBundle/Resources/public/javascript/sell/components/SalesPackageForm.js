import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {CountrySelector} from "../../main/components/CountrySelector";

const labelStyle = { height: "30px", fontSize: "12px"};

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

        this.state = {
            isOpen : props.isOpen,
            bundleMethod : this.asBundle,
            territoriesMethod : this.worldwide,
            salesMethod : this.fixed,
            territories : [],
            fee : 0,
            isNew : true
        };
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
    };

    setTerritoriesMethod = (territoriesMethod) => {
        this.setState({territoriesMethod});
    };

    setSalesMethod = (salesMethod) => {
        this.setState({salesMethod});
    };

    closeModal = () => {
        this.setState({ isOpen: false});
    };

    applySelection  = () => {
        this.setState({ isOpen: false});

        if ( this.state.isNew ) {
            this.props.onAdd(this.state);
        } else {
            this.props.onUpdate(this.state, this.state.index);
        }
    };

    selectTerritories = (territories) => {
        this.setState({ territories });
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
                        <CountrySelector className={"small-select"} value={this.state.territories} onChange={this.selectTerritories} />
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
                                    {this.state.salesMethod !== this.fixed && "Minimum bid"}
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

                </div>
            </div>

            <div className={"buttons"}>
                <button
                    className={"standard-button"}
                    onClick={this.applySelection}>Ok</button>
            </div>
        </Modal>
    };

    render(){
        const { salesPackages, onRemove } = this.props;
        return (
            <div className={"sales-package-form"}>
                { this.renderModal() }
                <div className="base-full-input">
                    <label>Sales bundles</label>
                    <div className={"content"} style={{flexDirection: "column"}}>
                        { salesPackages.map( (salesPackage, i) => {
                            return <div className="sales-package-container">
                                <div className="sales-package" key={"sales-package-"+ i}>
                                    <div style={{flex : 5}}>
                                        {salesPackage.territoriesMethod === this.worldwide && "Worldwide"}
                                        {salesPackage.territoriesMethod !== this.worldwide
                                            && salesPackage.territories.map( ( territory, i )=>{
                                            return <span key={i}>{!!i && ", "} {territory.label}</span>
                                        })}
                                    </div>
                                    <div style={{flex : 1, justifyContent: "flex-end", display: "flex"}}>
                                        $ {salesPackage.fee}
                                    </div>
                                </div>
                                <i className="fa fa-remove" onClick={() => { onRemove(i) }} />
                                <i className="fa fa-edit" onClick={() => { this.editSalesPackage(salesPackage, i) }} />
                            </div>
                        })}

                    </div>
                </div>
                <div className={"add-item"} onClick={()=>{this.setState({isOpen:true, isNew : true})}}>
                    <i className="fa fa-plus-circle"/> Add sales bundle
                </div>

            </div>
        )
    }
}

export default SalesPackageForm;