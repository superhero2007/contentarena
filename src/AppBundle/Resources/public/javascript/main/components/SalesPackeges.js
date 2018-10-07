import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import ExtraTerritories from '../../main/components/ExtraTerritories';
import { bidIcon, fixedIcon } from "./Icons";
import { getCurrencySymbol } from "../actions/utils";

class SalesPackages extends PureComponent{

    getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + getCurrencySymbol();
    };

    render() {
        const { salesPackages } = this.props;
        let salesPackagesArray = Array.isArray(salesPackages) ? salesPackages : [salesPackages];
        return (
            <React.Fragment>
                {salesPackagesArray.slice(0, 3).map((salesPackage, i) => {
                    let extraTerritories = (salesPackage.territoriesMethod === 'WORLDWIDE_EXCLUDING') ? salesPackage.excludedTerritories : salesPackage.territories;

                    if (salesPackage.sold) return;
                    return (
                        <div className="sales-package" key={"sp-"+ i}>

                            {salesPackage.bundleMethod === "SELL_AS_BUNDLE" && (
                                <div className="icon">
                                    <img src={fixedIcon}/>
                                </div>
                            )}

                            <div className="name">
                                {salesPackage.name}
                            </div>

                            {extraTerritories && extraTerritories.length > 3 && (
                                <div style={{marginRight: 5}}>
                                    <ExtraTerritories
                                        showAll={salesPackage.regionNamed}
                                        extraTerritories={extraTerritories}
                                    />
                                </div>
                            )}

                            {(salesPackage.salesMethod !== "BIDDING" ||  (salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0)) && (
                                <div className="fee">
                                    {this.getFee(salesPackage)}
                                </div>
                            )}

                            {salesPackage.salesMethod === "BIDDING" && (
                                <div className="icon">
                                    <img src={bidIcon}/>
                                </div>
                            )}

                        </div>
                    )
                })}
                {salesPackages.length > 3 && (
                    <div className="sales-package show-all">
                        <b> + {salesPackages.length - 3} </b>
                    </div>
                )}
            </React.Fragment>
        )
    };
}

SalesPackages.propTypes = {
    salesPackages: PropTypes.array.isRequired
};


export default SalesPackages;

