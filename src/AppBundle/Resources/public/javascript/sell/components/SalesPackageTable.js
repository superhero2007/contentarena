import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import cn from 'classnames';
import ExtraTerritories from "../../main/components/ExtraTerritories";
import LicenseDownloader from '../../main/components/LicenseDownloader';
import NumberFormat from 'react-number-format';
import {getCurrencySymbol} from "../../main/actions/utils";

const SalesPackageTable = ({salesPackages, currency, listingId, hideButtons,editSalesPackage,onRemove}, context) => {
    return (
        <ReactTable
            className={cn("ca-table round-0", {showScroll: salesPackages.length > 15})}
            defaultPageSize={242} // max number of possible Territorial Bundles
            showPageSizeOptions={false}
            noDataText={null}
            showPagination={false}
            minRows={0}
            resizable={false}
            data={salesPackages}
            columns={[
                {
                    Header: context.t("SALES_PACKAGE_TABLE_TERRITORY_BUNDLE"),
                    headerClassName: salesPackages.length > 15 ? 'table-header-big scroll' : 'table-header-big',
                    Cell: props => {
                        const salesPackage = props.original;
                        if (salesPackage.sold) return null;
                        let extraTerritories = (salesPackage.territoriesMethod === this.worldwideExcluding) ? salesPackage.excludedTerritories : salesPackage.territories;
                        return (
                            <div className="d-flex align-items-center">
                                <img src={assetsBaseDir + "app/images/package.svg"} style={{marginRight: 5}} />
                                {salesPackage.name}
                                {extraTerritories && extraTerritories.length > 3 && (
                                    <div style={{marginLeft: 5}}>
                                        <ExtraTerritories
                                            showAll={salesPackage.regionNamed} extraTerritories={extraTerritories}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    }
                },
                {
                    Header: context.t("SALES_PACKAGE_TABLE_SALES_METHOD"),
                    headerClassName: 'table-header-big',
                    width: 300,
                    Cell: props => {
                        const salesPackage = props.original;
                        if (salesPackage.sold) return null;
                        return (
                            salesPackage.salesMethod
                        )
                    }
                },
                {
                    Header: context.t("SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID"),
                    headerClassName: 'table-header-big',
                    width: 400,
                    Cell: props => {
                        const salesPackage = props.original;
                        if (salesPackage.sold) return null;

                        const i = props.index;
                        const fee = parseFloat(salesPackage.fee);

                        const showAction = () => {
                            return hideButtons
                                ? (<LicenseDownloader
                                        type={"BUNDLE"}
                                        id={salesPackage.id}
                                        listingId={listingId} />)
                                : (<div className={"d-flex justify-content-end align-items-baseline"}>
                                        <img src={assetsBaseDir + "app/images/cancel.png"} onClick={() => {
                                            onRemove(i)
                                        }}/>
                                        <i className="fa fa-edit" style={{position: 'static', padding: 0, margin:'0 15px'}} onClick={() => {
                                            editSalesPackage(salesPackage, i)
                                        }}/>
                                    </div>
                                );
                        };

                        return (
                            <div className="price-action-wrapper">
                                <div title={fee}>
                                    {fee ? (<NumberFormat
                                            thousandSeparator={true}
                                            value={fee}
                                            displayType={'text'}
                                            prefix={getCurrencySymbol(currency)+ " "} />) : '-'}
                                </div>
                                <div className="actions">
                                    {showAction()}
                                </div>
                            </div>
                        )
                    }
                },
            ]}
        />
    );
};

SalesPackageTable.contextTypes = {
    t: PropTypes.func.isRequired
};

SalesPackageTable.propTypes = {};
SalesPackageTable.defaultProps = {};

export default SalesPackageTable;
