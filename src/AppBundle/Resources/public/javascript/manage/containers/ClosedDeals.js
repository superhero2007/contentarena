import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import ContentListing from '../../main/components/ContentListing';
import {getCurrencySymbol, goTo} from "../../main/actions/utils";
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
                    bids.length > 0 && <div>
                        <ReactTable
                            className={"closed-deals-table"}
                            defaultPageSize={30}
                            showPageSizeOptions={false}
                            showPagination={false}
                            onPageChange={this.onPageChange}
                            minRows={0}
                            resizable={false}
                            data={bids}
                            select={this.props.select}
                            columns={[{
                                Header: 'ID',
                                headerClassName : 'table-header',
                                className : 'table-header table-header-left',
                                accessor: 'customId',
                                Cell: props => <div>
                                    {"#"+props.value}
                                </div>
                            }, {
                                Header: 'Listing name',
                                headerClassName : 'table-header-big',
                                className : 'table-header-big',
                                accessor: 'content.name',
                            }, {
                                accessor: 'content.company.legalName', // Required because our accessor is not a string
                                Header: 'Seller',
                                headerClassName : 'table-header-big',
                                className : 'table-header-big',
                            }, {
                                Header: 'LT',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("LT") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'LB',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("HL") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'DT',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("DT") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'HL',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("HL") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'CL',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("CL") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'NA',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("NA") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'AR',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("AR") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            },{
                                Header: 'PR',
                                accessor: 'content.rightsPackage',
                                headerClassName : 'table-header-small',
                                className : 'table-header-small',
                                Cell: props => <div
                                    className={"blue"}>
                                    {props.value.map(r=>r.shortLabel).indexOf("PR") !== -1 &&
                                    <img style={rightImageStyle} src={this.cancelIcon}/>}
                                </div>
                            }, {
                                Header: 'Territories',
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "territories",
                                accessor: d => {return{
                                    size : d.salesPackage.territories.length,
                                    worldwide : d.salesPackage.territoriesMethod === "WORLDWIDE"
                                }},
                                Cell: props => <div className={"blue"}>
                                    {!props.value.worldwide && props.value.size + " "}
                                    {!props.value.worldwide && props.value.size > 1 && "territories" }
                                    {!props.value.worldwide && props.value.size === 1 && "territory" }
                                    {props.value.worldwide && "Worldwide" }
                                </div>
                            }, {
                                Header: 'Price',
                                headerClassName : 'table-header',
                                className : 'table-header',
                                id: "price",
                                accessor: d => {return {fee: d.totalFee, currency: d.salesPackage.currency.code}},
                                Cell: props => <div className={"blue"}>
                                    {props.value.fee + " " + getCurrencySymbol(props.value.currency)}
                                </div>
                            }, {
                                Header: 'Date of sale',
                                headerClassName : 'table-header',
                                className : 'table-header',
                                accessor: 'createdAt',
                                Cell: props => <div>
                                    {Moment(props.value).format('DD/MM/YYYY')}
                                </div>

                            }, {
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