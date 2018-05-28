import React from 'react';
import { connect } from "react-redux";
import PaymentMethod from "../components/PaymentMethod";
import SalesPackageForm from "../components/SalesPackageForm";
import {TitleBar} from "../components/SellFormItems";
import Moment from "moment/moment";

class SellFormStep4 extends React.Component {

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
        };
    }

    componentDidMount () { }

    componentWillReceiveProps(nextProps) {
    }

    showTerritories = (salesPackage) => {
        return ( salesPackage.bundleMethod === this.individually &&
            salesPackage.territoriesMethod === this.worldwide ) ||
            salesPackage.territoriesMethod !== this.worldwide;
    };


    render() {
        if ( this.props.step !== 4) return (null);
        const { salesPackages, name, expirationDate, rightsPackage,sportCategory, tournament } = this.props;
        return (
            <div className="step-content">
                <div className="step-title">Review & Sign</div>
                <div className="step-content-container">

                    <div className={"listing-list-view"} >
                        <div className={"left"}  >
                            <div className={"image"}></div>
                            <div className={"date"}>Published <span>{Moment().format('DD/MM/YYYY')}</span></div>
                            <div className={"date"}>Expires <span>{Moment(expirationDate).format('DD/MM/YYYY')}</span></div>
                        </div>
                        <div className={"right"} >
                            <div className={"name"}>{name}</div>
                            <div style={{display: "flex"}}>
                                <div style={{flex: 1}}>
                                    {sportCategory.length > 0 && <div>{sportCategory[0].name}</div>}
                                    {tournament.length > 0 && <div>{tournament[0].name}</div>}
                                </div>
                                <div style={{flex: 2, flexDirection: "column"}}>
                                    {
                                        rightsPackage.map(( sr )=>{
                                            return <div><i className="fa fa-check-circle-o"/> {sr.name}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                    <TitleBar title={"Sales bundles"} />

                    <div className={"sales-package-form"}>
                        <div className="base-full-input">
                            <div className={"content"} style={{flexDirection: "column"}}>
                                { salesPackages.map( (salesPackage, i) => {
                                    return <div className="sales-package-container">
                                        <div className="sales-package" key={"sales-package-"+ i}>
                                            <div style={{flex : 5}}>
                                                {salesPackage.bundleMethod === this.asBundle &&
                                                salesPackage.territoriesMethod === this.worldwide && "Worldwide"}

                                                {this.showTerritories(salesPackage) &&
                                                salesPackage.territories.slice(0, this.limit).map( ( territory, i )=>{
                                                    return <span key={i}>{!!i && ", "} {territory.label}</span>
                                                })}

                                                { this.showTerritories(salesPackage) && salesPackage.territories.length > this.limit &&
                                                <span> +{salesPackage.territories.length - this.limit}</span>}
                                            </div>
                                            <div style={{flex : 1, justifyContent: "flex-end", display: "flex"}}>
                                                $ {salesPackage.fee}
                                            </div>
                                        </div>
                                    </div>
                                })}

                            </div>
                        </div>
                    </div>

                    <div className="buttons-container" >
                        <button id="draft-listing" className="standard-button" style={{ width: '250px'}}>
                            View License Agreement
                        </button>
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