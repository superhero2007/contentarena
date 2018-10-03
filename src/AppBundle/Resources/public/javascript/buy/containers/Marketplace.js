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
import {updateEvent, updateSport} from "../actions/filterActions";
import RightsLegend from "../../main/components/RightsLegend";
import LocalStorageHelper from '../../main/utiles/localStorageHelper';
import first from 'lodash/first';
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

        const {history} = this.props;

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

            let data = error.data.responseJSON;

            if (data.code === 101 ) history.push("/marketplace");

            _this.setState({
                errorMessage: data.message,
                loadingListingDetails: false
            })

        });
    };

    parseFilter = (filter) => {
        const sports = LocalStorageHelper.getSportsSelected();
        const sportsFromStorege = sports ? [{name: sports.value}] : null;
        const sportsFromProps = filter.sport ? [{name: filter.sport.value}] : null;
        const exclusiveFromStorege = LocalStorageHelper.getExclusive();
        const countriesFromStorage = LocalStorageHelper.getCountriesSelected();
        const allCountriesFromStorage = LocalStorageHelper.getAllCountries();

        let response = {
            rights: filter.rights,
            countries: countriesFromStorage || filter.countries,
        };

        if ( filter.event ) response.event = filter.event;

        if(exclusiveFromStorege || filter.exclusive) {
            response.exclusive = exclusiveFromStorege || filter.exclusive;
        }
        if (sportsFromStorege || first(sportsFromProps.name)) {
            response.sports = (sportsFromStorege || sportsFromProps).filter(s => s.name || s.value);
        }
        if(allCountriesFromStorage || filter.includeAllCountries) {
            response.includeAllCountries = allCountriesFromStorage || filter.includeAllCountries;
        }

        return response;
    };

    parseFilterForUrl = (filter) =>{

        const sports = LocalStorageHelper.getSportsSelected();
        const sportsFromStorage = sports ? [{name: sports.value}] : null;
        const sportsFromProps = filter.sport ? [{name: filter.sport.value}] : null;
        const exclusiveFromStorage = LocalStorageHelper.getExclusive();
        const countriesFromStorage = LocalStorageHelper.getCountriesSelected();
        const allCountriesFromStorage = LocalStorageHelper.getAllCountries();

        let response = {
            rights: filter.rights,
            countries: countriesFromStorage || filter.countries,
        };

        if ( filter.event ) response.event = filter.event;

        if(exclusiveFromStorage || filter.exclusive) {
            response.exclusive = exclusiveFromStorage || filter.exclusive;
        }
        if (sportsFromStorage || sportsFromProps) {
            response.sports = sportsFromStorage || sportsFromProps;
        }
        if(allCountriesFromStorage || filter.includeAllCountries) {
            response.includeAllCountries = allCountriesFromStorage || filter.includeAllCountries;
        }

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

    goToListing = (customId) => {
        const { history } = this.props;
        history.push('/listing/' + customId );
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
            errorMessage
        } = this.state;

        if (errorMessage) {
            return <h2 className="text-center">{errorMessage}</h2>
        }

        document.title = "Content Arena - Marketplace";

        return (
            <div className="manager-content" style={{flexDirection: 'row', flexWrap: 'wrap'}}>

                {!showDetails && !loadingListingDetails && (
                    <div style={{width: '100%', textAlign: 'right'}}>
                        <RightsLegend />
                    </div>
                )}

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
                                        onSelect={() => this.goToListing(listing.customId)}
                                        key={listing.customId}
                                        filter={filter}
                                        sortSalesPackages={sortSalesPackages}
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
                {loadingListingDetails && <div className={"big-spinner"}>
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
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketplace)
