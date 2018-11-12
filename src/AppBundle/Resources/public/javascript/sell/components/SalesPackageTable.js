import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import ExtraTerritories from "../../main/components/ExtraTerritories";
import LicenseDownloader from '../../main/components/LicenseDownloader'

const SalesPackageTable = ({salesPackages, currency, listingId, hideButtons,editSalesPackage,onRemove}, context) => {

    const isShowFee = (salesPackage) => {
        return salesPackage.salesMethod !== "BIDDING" || (salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0);
    };

    const getFee = (salesPackage) => {
        const feeNumber = parseFloat(salesPackage.fee);
        return feeNumber.toLocaleString() + " " + getCurrencySymbol();
    };

    const getCurrencySymbol = () => {
        return (currency === "EUR" ? "€" : "$");
    };


    return (
        <ReactTable
            className={"ca-table round-0"}
            defaultPageSize={30}
            showPageSizeOptions={false}
            showPagination={false}
            minRows={0}
            resizable={false}
            data={salesPackages}
            columns={[
                {
                    Header: context.t("SALES_PACKAGE_TABLE_TERRITORY_BUNDLE"),
                    headerClassName: 'table-header-big',
                    className: 'table-header-big',
                    Cell: props => {
                        console.log(props);
                        const salesPackage = props.original;
                        if (salesPackage.sold) return null;
                        let extraTerritories = (salesPackage.territoriesMethod === this.worldwideExcluding) ? salesPackage.excludedTerritories : salesPackage.territories;
                        return (
                            <div className="d-flex align-items-center">
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
                    className: 'table-header-big',
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
                    className: 'table-header-big',
                    Cell: props => {
                        const salesPackage = props.original;
                        if (salesPackage.sold) return null;
                        if (isShowFee(salesPackage)) {
                            return (
                                <div title={salesPackage.fee}>
                                    {getFee(salesPackage)}
                                </div>
                            )
                        }
                    }
                },
                {
                    Header: '',
                    headerClassName: 'table-header-big',
                    className: 'table-header-big',
                    maxWidth: hideButtons ? 250 : 100,
                    Cell: props => {
                        const salesPackage = props.original;
                        const i = props.index;
                        if (salesPackage.sold) return null;

                        if (hideButtons) {
                            return (
                                <LicenseDownloader
                                    type={"BUNDLE"}
                                    id={salesPackage.id}
                                    listingId={listingId}
                                    buttonType={true}
                                />
                            )
                        } else {
                            return (
                                <div className={"d-flex justify-content-end align-items-baseline"}>
                                    <img src={assetsBaseDir + "app/images/cancel.png"} onClick={() => {
                                        onRemove(i)
                                    }}/>
                                    <i className="fa fa-edit" style={{position: 'static', padding: 0, margin:'0 15px'}} onClick={() => {
                                        editSalesPackage(salesPackage, i)
                                    }}/>
                                </div>
                            )

                        }
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
