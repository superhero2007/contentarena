import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import ContentListing from '../../main/components/ContentListing';
import {getCurrencySymbol, goTo, limitText} from "../../main/actions/utils";
import Moment from "moment/moment";

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
        const { loading } = this.state;
        let { bids } = this.state;
        bids = bids.reverse();

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>

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
                                        Listing name <i className="fa fa-sort" />
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
                                        Seller <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header-big',
                                className : 'table-header-big',
                            }, {
                                Header: 'LT',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("LT") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: 'LB',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("HL") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: 'DT',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("DT") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: 'HL',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("HL") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: 'NA',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("NA") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            },{
                                Header: 'PR',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("PR") === -1 &&
                                    <img style={rightImageStyle} src={this.checkIcon}/>}
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                        Territories <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "territories",
                                accessor: d => {return{
                                    size : d.salesPackage.territories.length,
                                    worldwide : d.salesPackage.territoriesMethod === "WORLDWIDE",
                                    asBundle : d.salesPackage.bundleMethod === "SELL_AS_BUNDLE"
                                }},
                                Cell: props => <div className={"blue"}>
                                    { (!props.value.worldwide || !props.value.asBundle) && props.value.size + " "}
                                    {(!props.value.worldwide || !props.value.asBundle) && props.value.size > 1 && "territories" }
                                    {(!props.value.worldwide || !props.value.asBundle) && props.value.size === 1 && "territory" }
                                    {props.value.worldwide && props.value.asBundle && "Worldwide" }
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                        Price <i className="fa fa-sort" />
                                    </span>
                                ),
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "price",
                                accessor: d => {return {fee: d.totalFee, currency: d.salesPackage.currency.code}},
                                Cell: props => <div className={"blue"}>
                                    {props.value.fee + " " + getCurrencySymbol(props.value.currency)}
                                </div>
                            }, {
                                Header: () => (
                                    <span>
                                        Date of sale <i className="fa fa-sort" />
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
                                        Buyer name <i className="fa fa-sort" />
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
                                Header: 'Actions', // Custom header components!
                                Cell: props => <div className={""}>
                                    <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{}} src={this.docIcon}/>
                                    <img style={{margin:'0 10px', cursor: 'pointer'}} onClick={()=>{}} src={this.blueEnvelopeIcon}/>
                                </div>
                            }

                            ]}
                        />
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
                                You don't have closed deal yet
                            </div>
                        }
                    </div>
                }

            </div>
        )
    }
}

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