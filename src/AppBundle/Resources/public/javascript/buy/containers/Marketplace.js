import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import EventFilter from '../components/EventFilter';
import RightsFilter from '../components/RightsFilter';
import ContentListing from '../../main/components/ContentListing';
import ListingDetails from './ListingDetails';
import {
    addRight, clearUpdateFilter, removeRight, updateCountries, updateExclusive,
    updateMany
} from "../actions/filterActions";
import {goToListing} from "../../main/actions/utils";
import {updateEvent, updateSport} from "../actions/filterActions";
import {updateProfile} from "../../main/actions/userActions";
import RightsLegend from "../../main/components/RightsLegend";
import {PropTypes} from "prop-types";
const queryString = require('query-string');

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultRightsPackage : JSON.parse(props.rights),
            company : JSON.parse(props.company),
            loadingListing: false,
            loadingListingDetails : false,
            showDetails : false,
            listings : [],
            countries : [],
            territories: [],
            profile : props.user.profile,
            errorMessage: ''
        };
    }

    componentDidMount () {
        const {clearUpdateFilter, match, location} = this.props;

        if ( match && match.params && match.params.customId ){
            this.selectListing(match.params.customId);
            return;
        }

        if ( match && match.params && match.params.filterName ){

            switch (match.params.filterName){
                case "sport":
                    this.props.selectSport({value:match.params.filterValue, label : match.params.filterValue });
                    return;
                case "search":
                    this.props.updateEvent( match.params.filterValue);
                    return;
                case "territory":
                    this.props.updateFilters( {countries: [match.params.filterValue]});
                    return;
                case "multi":
                    let customFilter = queryString.parse( location.search,{arrayFormat: 'index'});
                    this.props.updateFilters(customFilter);
                    return;
            }

        }

        this.filter();
        clearUpdateFilter();
        this.props.updateProfile("BUYER");

        jQuery('body, .marketplace-container').css('background-color', '#eee') //todo: remove this when other page redesign ready
    }

    componentWillUnmount(){
        jQuery('body, .marketplace-container').removeAttr('style') //todo: remove this when other page redesign ready
    }

    componentWillReceiveProps ( props ) {
        const {filter,clearUpdateFilter} = props;

        this.setState({sortSalesPackages : false});
        if ( filter.forceUpdate ) {
            this.getContent(this.parseFilter(filter));
            clearUpdateFilter();
        }
    }

    selectListing = (id) => {

        let _this = this;

        if ( id === _this.state.id ){
            _this.setState({
                showDetails : true
            });

            return;
        }

        _this.setState({
            id : id,
            loadingListingDetails : true,
            showDetails : true
        });

        ContentArena.ContentApi.getByCustomId(id).done((content) => {

            _this.setState({
                content : content,
                loadingListingDetails : false
            })
        }).fail(error => {
            _this.setState({
                errorMessage: error.data.responseJSON.message,
                loadingListingDetails: false
            })

        });
    };

    parseFilter = (filter) =>{
        let response = {
            rights: filter.rights,
            countries: filter.countries,
        };

        if ( filter.sport ) {
            response.sports = (filter.sport.value) ? [{name: filter.sport.label}] : (!filter.sport.label) ? [{name: filter.sport}] : null;
        }
        if ( filter.exclusive ) response.exclusive = filter.exclusive;
        if ( filter.event ) response.event = filter.event;
        if ( filter.includeAllCountries ) response.includeAllCountries = filter.includeAllCountries;

        return response;
    };

    parseFilterForUrl = (filter) =>{

        let response = {
            rights: filter.rights,
            countries: filter.countries,
        };

        if ( filter.sport && filter.sport.value && filter.sport.label !== "All sports" ) {
            response.sport = filter.sport.label
        }

        if ( filter.sport && !filter.sport.value && !filter.sport.label) {
            response.sport = filter.sport
        }

        if ( filter.exclusive ) response.exclusive = filter.exclusive;
        if ( filter.includeAllCountries ) response.includeAllCountries = filter.includeAllCountries;
        if ( filter.event ) response.event = filter.event;

        return response;
    };

    getContent = ( filter ) => {
        let _this = this;

        _this.setState({
            loadingListing : true,
            listings: []
        });

        ContentArena.Api.getJsonContent(filter).done((listings) => {

            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({listings: listings, loadingListing : false, sortSalesPackages : true});
        });
    };

    filter = () => {

        const { filter } = this.props;
        let parsedFilter = this.parseFilter(filter);
        this.getContent(parsedFilter);

    };

    filterByRoute = () => {
        const {history, filter} = this.props;
        const serialize = function(obj, prefix) {
            var str = [],
                p;
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p,
                        v = obj[p];
                    str.push((v !== null && typeof v === "object") ?
                        serialize(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        };
        history.push("/marketplace/filter/multi?"+serialize(this.parseFilterForUrl(filter)));


    };

    render () {
        const { filter, salesPackage ,history, location, match } = this.props;
        const {
            listings,
            loadingListing,
            loadingListingDetails,
            showDetails,
            content,
            company,
            sortSalesPackages,
            profile,
            errorMessage,
            defaultRightsPackage
        } = this.state;

        if (errorMessage) {
            return <h2 className="text-center">{errorMessage}</h2>
        }
        return (
            <div className="manager-content" style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{width: '100%', textAlign: 'right'}}>
                    <RightsLegend />
                </div>
                {!showDetails && <div className="buy-container-left">
                    <EventFilter
                        onFilter={this.filter}/>
                    <RightsFilter
                        onFilter={this.filterByRoute}
                        rightsPackage={this.state.defaultRightsPackage}/>
                </div>}

                {
                    !showDetails && (
                        <div className="buy-container-right">

                            {listings.length > 0 &&
                            listings.map(listing => {
                                return (
                                    <ContentListing
                                        onSelect={() => goToListing(listing.customId, true)}
                                        key={listing.customId}
                                        filter={filter}
                                        sortSalesPackages={sortSalesPackages}
                                        defaultRightsPackage={defaultRightsPackage}
                                        {...listing}
                                    />
                                );
                            })}

                            {listings.length === 0 &&
                            loadingListing && (
                                <div className={"big-spinner"}>
                                    <i className="fa fa-cog fa-spin" />
                                </div>
                            )}

                            {listings.length === 0 &&
                            !loadingListing && (
                                <span className={"no-results"}>
                                    {this.context.t(
                                        "MARKETPLACE_NO_RESULTS"
                                    )}
                                </span>
                            )}
                        </div>
                    )
                }


                {
                    loadingListingDetails && <div className={"big-spinner"}>
                        <i className="fa fa-cog fa-spin"/>
                    </div>
                }

                {
                    showDetails && !loadingListingDetails && <ListingDetails
                        key={location.pathname}
                        tab={match.params.tab}
                        bundle={match.params.bundle}
                        history={history}
                        onBack={() => {
                            this.setState({showDetails: false})
                        }}
                        salesPackage={salesPackage}
                        company={company}
                        profile={profile}
                        listing={content}/>
                }
            </div>
        )
    }
}

Marketplace.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id)),
        selectSport : sport =>dispatch(updateSport(sport)),
        updateEvent : event => dispatch(updateEvent(event)),
        clearUpdateFilter : () => dispatch(clearUpdateFilter()),
        addRight: id => dispatch(addRight(id)),
        removeRight: id => dispatch(removeRight(id)),
        updateCountries: countries => dispatch(updateCountries(countries)),
        updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
        updateFilters: filters => dispatch(updateMany(filters)),
        updateProfile : profile =>dispatch(updateProfile(profile)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketplace)
