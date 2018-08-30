import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {customStyles} from "../../main/styles/custom";
import Modal from 'react-modal';
import Moment from "moment/moment";
import LicenseDownloader from '../../main/components/LicenseDownloader'
import {PropTypes} from "prop-types";

class SalesPackages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            territoriesList: [],
            installments : []
        };
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.packageIcon = assetsBaseDir + "app/images/bid.png";
        this.infoIcon = assetsBaseDir + "app/images/info.png";
    }

    showAllTerritories = (extraTerritories) => {
        this.setState({
            showAllTerritories : true,
            territoriesList : extraTerritories
        })
    };

    showInstallments = (installments) => {
        this.setState({
            showInstallments : true,
            installments : installments
        })
    };

    closeTerritoiesModal = () => {
        this.setState({ showAllTerritories: false});
    };

    closeInstallmentsModal = () => {
        this.setState({ showInstallments: false});
    };

    ordinal_suffix_of = (i) => {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    };

    installmentsModal = () => {
        const {installments} = this.state;
        return <Modal
            isOpen={this.state.showInstallments}
            onRequestClose={this.closeInstallmentsModal}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '12px 20px',
                    backgroundColor: '#32A9E7',
                    color: 'white',
                    fontWeight: 600
                }}>Payment Details</div>
                {
                    installments && installments.map(( installment, index ) =>{
                        return <div style={{
                            padding: 12,
                            border: '1px solid #DDE1E7',
                            backgroundColor: '#FAFBFC',
                            margin: 5,
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'row',
                            color: 'grey'
                        }}>
                            <div style={{margin: '0 10px', fontWeight: 600}}>{ this.ordinal_suffix_of(index+1)} installment</div>
                            <div style={{margin: '0 30px'}}>{installment.value}%</div>
                            <div style={{margin: '0 10px'}}>
                                {installment.type === "DAY" && installment.days + " days after contract closure"}
                                {installment.type === "DATE" && " " + Moment(installment.date).format('DD/MM/YYYY')}
                            </div>
                        </div>
                    })
                }
            </div>

        </Modal>
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

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + this.getCurrencySymbol();
    };

    getCurrencySymbol = () => {
        const {currency} = this.props;
        return (currency === "EUR" ? "€" : "$");
    };



    render() {
        const {salesPackages, onSelectPackage, user, listingId} = this.props;

        return (
            <div className="sales-packages">
                { this.allTerritories() }
                { this.installmentsModal() }
                { salesPackages.map( (salesPackage, i) => {

                    if (salesPackage.sold ) return;

                    let extraTerritories = ( salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? salesPackage.excludedTerritories : salesPackage.territories;
                    return <div className="sales-package-container" key={"sales-package-"+ i}>

                        <div style={{flex : 10, display: 'flex'}}>
                            {salesPackage.bundleMethod === "SELL_AS_BUNDLE"
                                && salesPackage.territories.length > 1
                                && <div style={{ }}>
                                    <img style={{ width: 26, height: 23}} src={this.packageIcon}/>
                                </div>
                            }

                            {salesPackage.territories.length > 1 && <div style={{margin: '0 15px', fontWeight: 600}}>
                                {salesPackage.territories.length}
                            </div>}

                            <div>
                                {salesPackage.name}
                                {
                                    extraTerritories && extraTerritories.length > 3 && <span
                                        style={{
                                            color: '#2DA7E6',
                                            textDecoration: 'underline',
                                            marginLeft : 5,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {this.showAllTerritories(extraTerritories)}}>
                                                {"+" + (extraTerritories.length - 3)}
                                            </span>
                                }
                            </div>
                        </div>

                        <LicenseDownloader
                            type={"BUNDLE"}
                            id={salesPackage.id}
                            listingId={listingId}
                            style={{flex : 1, display: 'flex', justifyContent: 'center'}} />

                        <div style={{flex : 1, display: 'flex', justifyContent: 'center', cursor: 'pointer'}}
                             onClick={() => {this.showInstallments(salesPackage.installments)}}>
                            <img style={{width: 23, height: 23}} src={this.infoIcon}/>
                        </div>

                        <div style={{flex : 1.5, justifyContent: "center", display: "flex"}}>
                            {this.getFee(salesPackage)}
                        </div>

                        <div style={{ flex: 1, justifyContent: "center", display: "flex"}}>
                            {salesPackage.salesMethod === "BIDDING"
                                && <img style={{width: 23, height: 23}} src={this.bidIcon}/>}
                        </div>

                        { salesPackage.salesMethod === "FIXED" && user.profile === "BUYER" &&
                            <button className="standard-button"
                                    style={{width: 130}}
                                    onClick={() => {onSelectPackage(salesPackage, listingId) }}>
                                {this.context.t("Buy now")}
                            </button>
                        }

                        { salesPackage.salesMethod === "BIDDING" && user.profile === "BUYER" &&
                            <button className="standard-button"
                                    style={{width: 130}}
                                    onClick={() => {onSelectPackage(salesPackage, listingId) }}>
                                {this.context.t("Place bid")}
                            </button>
                        }




                    </div>
                })}
            </div>
        );
    }
}

SalesPackages.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesPackages)