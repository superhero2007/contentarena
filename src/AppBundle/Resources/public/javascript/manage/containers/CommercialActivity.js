import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import ContentListingCommercialActivity from '../../main/components/ContentListingCommercialActivity';
import { goToListing } from "../../main/actions/utils";
import { PropTypes } from "prop-types";
import cn from "classnames";

class CommercialActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            listings : [],
            selectedListings: [],
            filter: 'ALL',
            bundlesOpen: false,
            bidsOpen : false,
        };
        this.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        this.activeBulletIcon = assetsBaseDir + "app/images/radio-active.png";
        this.reloadIcon = assetsBaseDir + "app/images/reload.png";
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
        const { filter , selectedListings } = this.state;

        let { listings = [] } = this.state;
        if ( selectedListings.length > 0 ){
            return this.state.listings.filter(b => selectedListings.includes(b.customId));
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

    onResetFilter = () => {
        const { history } = this.props;
        history.push("/commercialactivity");
    };

    onChangeSelect = (selectedItem) => {
        const { history } = this.props;
        const { filter } = this.state;
        let filterString = (filter!=="ALL") ? (selectedItem) ? "&" +filter : filter : "" ;
        let idString = selectedItem ? selectedItem.value : "";
        let prefix = ( !selectedItem && filter === "ALL") ? "" : "/filter/";
        history.push("/commercialactivity"+ prefix + idString + filterString);
    };

    allBundlesCallback = () => {
        const { selectedListings } = this.state;
        let filterString = (selectedListings.length > 0) ? "/filter/" + selectedListings[0]  : "" ;
        this.props.history.push("/commercialactivity"+filterString)
    };
    withActivityCallback = () => {
        const { selectedListings } = this.state;
        let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
        this.props.history.push("/commercialactivity/filter/"+filterString+"withactivity")
    };
    openBidsCallback = () => {
        const { selectedListings } = this.state;
        let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
        this.props.history.push("/commercialactivity/filter/"+filterString+"openbids")
    };
    closedBidsCallback = () => {
        const { selectedListings } = this.state;
        let filterString = (selectedListings.length > 0) ? selectedListings[0] + "&" : "" ;
        this.props.history.push("/commercialactivity/filter/"+filterString+"closeddeals")
    };

    statusFilterItem(callBack, text, filterType) {
        const { filter } = this.state;

        return (
            <div
                key={filterType}
                className={cn("status-filter-item", {active: filter === filterType})}
                onClick={callBack}>

                <img src={filter === filterType ? this.activeBulletIcon : this.bulletIcon} />
                {text}
            </div>
        );
    }

    getFiltersText = () => ({
        all: this.context.t('COMMERCIAL_ACTIVITY_FILTER_ALL'),
        withActivity: this.context.t('COMMERCIAL_ACTIVITY_FILTER_WITH_ACTIVITY'),
        openBids: this.context.t('COMMERCIAL_ACTIVITY_FILTER_OPEN_BIDS'),
        closedDeals: this.context.t('COMMERCIAL_ACTIVITY_FILTER_CLOSED_DEALS')
    });

    render () {
        const { loading, selectedListings } = this.state;
        let listings = this.filtered();
        const allListings = this.state.listings;
        const filters = this.getFiltersText();

        document.title = "Content Arena - Commercial Activity";

        return (
            <div style={{height : '100%'}}>

                <div className={"manager-filter-container"}>
                    <div className={"listing-filter"}>
                        <Select
                            name="form-field-name"
                            placeholder={this.context.t('COMMERCIAL_ACTIVITY_FILTER_SEARCH_PLACEHOLDER')}
                            isClearable={true}
                            onChange={this.onChangeSelect}
                            multi={false}
                            value={selectedListings[0]}
                            options={allListings.map((b)=>({value : b.customId , label : b.name }))}
                        />
                        <div className="reset-listing-filter" onClick={this.onResetFilter}>
                            <img src={this.reloadIcon} />
                            <span>{this.context.t('COMMERCIAL_ACTIVITY_FILTER_SEARCH_CLEAR')}</span>
                        </div>
                    </div>

                    <div className={"status-filter"}>
                        {this.statusFilterItem(this.allBundlesCallback, filters.all, 'ALL')}
                        {this.statusFilterItem(this.withActivityCallback, filters.withActivity, 'withactivity')}
                        {this.statusFilterItem(this.openBidsCallback, filters.openBids, 'openbids')}
                        {this.statusFilterItem(this.closedBidsCallback, filters.closedDeals, 'closeddeals')}
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
                                {this.context.t("COMMERCIAL_ACTIVITY_EMPTY_MESSAGE")}
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