import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import ContentListingCommercialActivity from '../../main/components/ContentListingCommercialActivity';
import {goToListing} from "../../main/actions/utils";
import {PropTypes} from "prop-types";

class CommercialActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            listings : [],
            selectedListings: [],
            filter: 'ALL',
            bundlesOpen: false,
            bidsOpen : false

        };
        this.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        this.activeBulletIcon = assetsBaseDir + "app/images/active_bullet.png";


    }

    componentDidMount () {

        const {match} = this.props;

        let params, filter, listings = [];

        if ( match && match.params && match.params.filterName){

            params = match.params.filterName.split("&");

            if ( params.length > 1 ) {
                listings.push(params[0]);
                filter = params[1];
            } else {
                if ( params[0].length === 5){
                    listings.push(params[0]);
                    filter = "ALL";
                } else {
                    filter = params[0]
                }
            }

            this.setState({
                filter : filter,
                selectedListings : listings
            });
        }

        this.update();
    }

    deleteBid = (id) => {
        ContentArena.ContentApi.removeBid({id:id}).done((r)=>{
            this.update();
        });
    };

    update = ()=> {
        let _this = this;
        this.setState({loading:true});

        ContentArena.ContentApi.getAllDeals().done((listings) => {
            listings.forEach(l=>ContentArena.Utils.contentParserFromServer(l));
            _this.setState({listings: listings, loading : false});
        });
    };

    filtered = () => {
        const { filter , selectedListings} = this.state;

        let listings = this.state.listings || [];

        if ( selectedListings.length > 0 ){
            return this.state.listings.filter(b => selectedListings.indexOf(b.customId) !== -1);
        }

        switch (filter) {
            case "closeddeals" :
                return listings.filter(b => {
                    return b.salesPackages.filter((sp)=>{
                        return sp.bids.filter(b=>b.status.name === "APPROVED").length > 0
                        }).length > 0
                    });
            case "openbids" :
                return listings.filter(b => {
                    return b.salesPackages.filter((sp)=>{
                        return sp.bids.filter(b=>b.status.name === "PENDING").length > 0
                    }).length > 0
                });
            case "withactivity" :
                return listings.filter(b => {
                    return b.salesPackages.filter((sp)=>{
                        return sp.bids.length > 0
                    }).length > 0
                });
            case "ALL" :
                return listings;
            default :
                return listings;

        }

    };

    remove = ( customId) => {
        this.setState({
            listings : this.state.listings.filter(l => l.customId !== customId)
        });
    };

    render () {
        const { loading, filter, selectedListings } = this.state;
        const {history } = this.props;
        let listings = this.filtered();
        const allListings = this.state.listings;
        return (
            <div style={{height : '100%'}}>

                <div className={"manager-filter-container"}>
                    <div className={"listing-filter"}>
                        <Select
                            name="form-field-name"
                            placeholder="All listings"
                            isClearable={true}
                            onChange={(selected)=>{
                                let filterString = (filter!=="ALL") ? (selected) ? "&" +filter : filter : "" ;
                                let idString = selected ? selected.value : "";
                                let prefix = ( !selected && filter === "ALL") ? "" : "/filter/";
                                history.push("/commercialactivity"+ prefix + idString + filterString)

                            }}
                            multi={false}
                            value={selectedListings[0]}
                            options={allListings.map((b)=>({value : b.customId , label : b.name }))}
                        />
                    </div>

                    <div className={"status-filter"}>
                        <div className={"status-filter-item"}
                             onClick={()=>{
                                 let filterString = (selectedListings.length > 0) ? "/filter/" + selectedListings[0]  : "" ;
                                 history.push("/commercialactivity"+filterString)
                             }}>
                            {filter==="ALL" && <img src={this.activeBulletIcon} />}
                            {filter!=="ALL" && <img src={this.bulletIcon} />}
                            {this.context.t("All bundles")}
                        </div>
                        <div className={"status-filter-item"}
                             onClick={()=>{
                                 let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
                                 history.push("/commercialactivity/filter/"+filterString+"withactivity")
                             }}>
                            {filter==="withactivity" && <img src={this.activeBulletIcon} />}
                            {filter!=="withactivity" && <img src={this.bulletIcon} />}
                            {this.context.t("With activity")}
                        </div>
                        <div className={"status-filter-item"}
                             onClick={()=>{
                                 let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
                                 history.push("/commercialactivity/filter/"+filterString+"openbids")
                             }}>
                            {filter==="openbids" && <img src={this.activeBulletIcon} />}
                            {filter!=="openbids" && <img src={this.bulletIcon} />}
                            {this.context.t("Open")} {this.context.t("Bids")}
                        </div>
                        <div className={"status-filter-item"}
                             onClick={()=>{
                                 let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
                                 history.push("/commercialactivity/filter/"+filterString+"closeddeals")
                             }}>
                            {filter==="closeddeals" && <img src={this.activeBulletIcon} />}
                            {filter!=="closeddeals" && <img src={this.bulletIcon} />}
                            {this.context.t("Closed deals")}
                        </div>
                    </div>
                </div>

                {
                    listings.length > 0 && listings.map((listing, i, list) => {
                        return <ContentListingCommercialActivity
                            onUpdate={this.update}
                            onDelete={this.deleteBid}
                            bidsOpen={list.length === 1 || this.state.filter !== "ALL"}
                            bundlesOpen={list.length === 1 || this.state.filter !== "ALL"}
                            hideWithoutBids={this.state.filter === "withactivity"}
                            filterByOpenBids={this.state.filter === "openbids"}
                            filterByClosedDeals={this.state.filter === "closeddeals"}
                            onSelect={id => goToListing(id, true)}
                            key={i + "-" + listing.customId}
                            {...listing}
                        />
                    })
                }

                {
                    listings.length === 0 &&
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
                                {this.context.t("You have no offers yet")}
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

CommercialActivity.contextTypes = {
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
)(CommercialActivity)