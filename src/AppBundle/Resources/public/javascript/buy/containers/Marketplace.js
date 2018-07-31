import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import EventFilter from '../components/EventFilter';
import RightsFilter from '../components/RightsFilter';
import ContentListing from '../../main/components/ContentListing';
import HeaderBar from '../../main/components/HeaderBar';
import ListingDetails from './ListingDetails';
import {clearUpdateFilter} from "../actions/filterActions";
import {goToListing} from "../../main/actions/utils";

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightsPackage : JSON.parse(props.rights),
            company : JSON.parse(props.company),
            loadingListing: false,
            loadingListingDetails : false,
            showDetails : false,
            listings : [],
            countries : [],
            territories: [],
            profile : props.profile,
        };
    }

    componentDidMount () {
        const {customId, clearUpdateFilter} = this.props;

        //window.onpopstate = this.onBackButtonEvent;
        if ( customId ) {
            this.selectListing(customId);
            return;
        }

        this.filter();
        clearUpdateFilter();
    }

    componentWillReceiveProps ( props ) {
        const {filter,clearUpdateFilter} = props;

        this.setState({sortSalesPackages : false});
        if ( filter.forceUpdate ) {
            this.getContent(this.parseFilter(filter));
            clearUpdateFilter();
        }
    }

    /*onBackButtonEvent = (e) => {
        e.preventDefault()
        this.setState({showDetails: false});
    };*/

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

        //window.history.pushState("test", "Content Arena", envhosturl + "listing/" + id);

        ContentArena.ContentApi.getByCustomId(id).done((content) => {
            console.log(content);

            _this.setState({
                content : content,
                loadingListingDetails : false
            })
        });
    };

    parseFilter = (filter) =>{
        return {
            rights: filter.rights,
            countries: filter.countries.map(country => country.label),
            sports : (filter.sport && filter.sport.value) ? [{name: filter.sport.label}] : [],
            event : filter.event,
            exclusive : (filter.exclusive) ? true : null
        };
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
            console.log(listings)
        });
    };

    filter = () => {

        const { filter } = this.props;
        let parsedFilter = this.parseFilter(filter);
        this.getContent(parsedFilter);

    };

    render () {
        const { filter, salesPackage } = this.props;
        const {listings, loadingListing, loadingListingDetails, showDetails, content, company, sortSalesPackages, profile} = this.state;
        return (
            <div className="manager-container">
                <HeaderBar tab={"MARKETPLACE"} profile={profile}/>

                <div className="manager-content" style={{flexDirection: 'row'}}>
                    {!showDetails && <div className="buy-container-left">
                        <EventFilter
                            onFilter={this.filter}/>
                        <RightsFilter
                            onFilter={this.filter}
                            rightsPackage={this.state.rightsPackage}/>

                    </div>}

                    {!showDetails && <div className="buy-container-right">
                        {
                            listings.length > 0 && listings.map((listing) => {
                                return <ContentListing
                                            onSelect={()=>goToListing(listing.customId, true)}
                                            key={listing.customId}
                                            filter={filter}
                                            sortSalesPackages={sortSalesPackages}
                                            {...listing} />
                            })
                        }

                        {
                            listings.length === 0 && loadingListing && <div className={"big-spinner"}>
                                <i className="fa fa-cog fa-spin"/>
                            </div>
                        }

                        {
                            listings.length === 0 && !loadingListing && <span className={"no-results"}>Sorry, no results. Try changing the filter settings!</span>
                        }
                    </div>}

                    {
                        loadingListingDetails && <div className={"big-spinner"}>
                            <i className="fa fa-cog fa-spin"/>
                        </div>
                    }

                    {
                        showDetails && !loadingListingDetails && <ListingDetails
                            onBack={() => {
                                this.setState({showDetails: false})
                            }}
                            salesPackage={salesPackage}
                            company={company}
                            profile={profile}
                            content={content}/>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id)),
        clearUpdateFilter : () => dispatch(clearUpdateFilter())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketplace)
