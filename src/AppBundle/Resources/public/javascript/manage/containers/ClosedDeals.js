import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import ContentListing from '../../main/components/ContentListing';
import SendMessage from "../../main/components/SendMessage";
import {getCurrencySymbol, goTo, limitText, viewLicenseBid} from "../../main/actions/utils";
import Moment from "moment/moment";
import ReactTooltip from 'react-tooltip';
import {PropTypes} from "prop-types";

const rightImageStyle = {
    width: 17,
    height: 17
};

class ClosedDeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            bids : [],
        };
        this.cancelIcon = assetsBaseDir + "app/images/cancel.png";
        this.checkIcon = assetsBaseDir + "app/images/blue_check.png";
        this.docIcon = assetsBaseDir + "app/images/doc.png";
        this.blueEnvelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
    }

    componentDidMount () {
        let _this = this;
        this.setState({loading:true});
        ContentArena.ContentApi.getClosedDeals().done((bids) => {
            _this.setState({bids: bids, loading : false});
        });

    }

    selectListing = (id) => {
        goTo("listing/" + id);
    };

    render () {
        const { loading, bids } = this.state;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                {
                    bids.length > 0 && bids.map((b,i) => {
                        return <SendMessage key={i}
                                            ref={"messagePopup" + b.id }
                                            listingId={b.content.id}
                                            recipient={b.content.company}/>
                    })
                }
                    {
                    bids.length > 0 &&
                    <div>
                        <ReactTable
                            className={"ca-table"}
                            defaultPageSize={30}
                            showPageSizeOptions={false}
                            showPagination={false}
                            onPageChange={this.onPageChange}
                            minRows={0}
                            resizable={false}
                            data={bids}
                            select={this.props.select}
                            columns={[{
                                Header: 'Deal ID',
                                headerClassName : 'table-header',
                                className : 'table-header table-header-left',
                                accessor: 'customId',
                                Cell: props => <div>
                                    {"#"+props.value}
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                         {this.context.t("Listing name")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header-big',
                                className : 'table-header-big sorting',
                                id: 'name',
                                accessor: d => {return{
                                    name : d.content.name,
                                    customId : d.content.customId,
                                }},
                                Cell: props => <div>
                                    <a href={"listing/" + props.value.customId}>{limitText(props.value.name)}</a>
                                </div>
                            }, {
                                accessor: 'content.company.legalName', // Required because our accessor is not a string
                                Header: () => (
                                    <span>
                                        {this.context.t("Seller")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header-big',
                                className : 'table-header-big',
                            }, {
                                Header: () => (
                                    <span data-tip="Live transmission">
                                        LT
                                    </span>
                                ),
                                //accessor: 'soldListing.rightsPackage',
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'LT',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("LT") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: () => (
                                    <span data-tip="Live betting">
                                        LB
                                    </span>
                                ),
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'LB',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("LB") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: () => (
                                    <span data-tip="Delayed & Archive">
                                        DT
                                    </span>
                                ),
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'DT',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("DT") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: () => (
                                    <span data-tip="Highlights">
                                        HL
                                    </span>
                                ),
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'HL',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("HL") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: () => (
                                    <span data-tip="News access">
                                        NA
                                    </span>
                                ),
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'NA',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("NA") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: () => (
                                    <span data-tip="Program">
                                        PR
                                    </span>
                                ),
                                accessor: d => d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage,
                                id: 'PR',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("PR") !== -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                        {this.context.t("Territories")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "territories",
                                accessor: d => {return{
                                    size : d.salesPackage.territories.length,
                                    territories : d.salesPackage.territories,
                                    excludedCountries : d.salesPackage.excludedCountries,
                                    worldwide : d.salesPackage.territoriesMethod === "WORLDWIDE" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE",
                                    excluding : d.salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE" && d.salesPackage.excludedCountries.length === 1,
                                }},
                                Cell: props => {

                                    const { size, territories, worldwide, excluding, excludedCountries} = props.value;

                                    return <div className={"blue"}>
                                    {!worldwide && !excluding && size > 1 && size + " territories" }
                                    {!worldwide && !excluding && size === 1 && territories[0].name}
                                    {excluding && "Worldwide excluding " + excludedCountries[0].name }
                                    {worldwide && this.context.t("Worldwide") }
                                </div>}
                            }, {
                                Header: () => (
                                    <span>
                                        {this.context.t("Price")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "price",
                                accessor: d => {return {fee: d.totalFee, currency: d.salesPackage.currency.code}},
                                Cell: props => <div className={"blue"}>
                                    {parseFloat(props.value.fee).toLocaleString() + " " + getCurrencySymbol(props.value.currency)}
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                        {this.context.t("Date of sale")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header',
                                className : 'table-header',
                                accessor: 'createdAt',
                                Cell: props => <div>
                                    {Moment(props.value).format('DD/MM/YYYY')}
                                </div>

                            }, {
                                Header: () => (
                                    <span>
                                        {this.context.t("Buyer name")} <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header-big',
                                className : 'table-header-big',
                                accessor: 'buyerUser',
                                Cell: props => <div>
                                    {props.value.firstName + " " + props.value.lastName}
                                </div>

                            },{
                                headerClassName : 'table-header',
                                className : 'table-header',
                                Header: this.context.t("Actions"), // Custom header components!
                                id: 'header',
                                accessor: d => {return{
                                    id : d.id,
                                    customId : d.customId
                                }},
                                Cell: props => <div className={""}>
                                    <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        viewLicenseBid(props.value.customId)
                                    }} src={this.docIcon}/>
                                    <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{
                                        window.location.href = `/redirect-integration/messages-by-bid/${props.value.id}`;
                                    }} src={this.blueEnvelopeIcon}/>
                                </div>
                            }

                            ]}
                        />
                        <ReactTooltip place="top" type="dark" effect="solid"/>
                    </div>
                }

                {
                    bids.length === 0 &&
                    <div className="manager-content-message">
                        {
                            loading && <div className="big-spinner">
                                <i className="fa fa-cog fa-spin"/>
                            </div>
                        }

                        {
                            !loading && <div className="big-spinner" style={{
                                fontSize: 30
                            }}>
                                {this.context.t("CLOSED_DEALS_EMPTY_MESSAGE")}
                            </div>
                        }
                    </div>
                }

            </div>
        )
    }
}

ClosedDeals.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClosedDeals)