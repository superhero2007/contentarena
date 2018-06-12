import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import EventFilter from '../components/EventFilter';
import RightsFilter from '../components/RightsFilter';
import ContentListing from '../../main/components/ContentListing';
import ListingDetails from './ListingDetails';

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightsPackage : JSON.parse(props.rights),
            loadingListing: false,
            loadingListingDetails : false,
            showDetails : false,
            listings : [],
            countries : [],
            territories: []
        };
    }

    componentDidMount () {
        let _this = this;
        _this.setState({loadingListing : true});
        ContentArena.Api.getJsonContent().done((listings) => {

            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({listings: listings, loadingListing : false});
            console.log(listings)
        });
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
        });
    };

    filter = (filter) => {

        let _this = this;
        _this.setState({loadingListing : true, listings: []});
        ContentArena.Api.getJsonContent(filter).done((listings) => {

            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({listings: listings, loadingListing : false});
            console.log(listings)
        });
    };

    render () {
        const {listings, loadingListing, loadingListingDetails, showDetails, content} = this.state;
        return (
            <div className="buy-content">
                {!showDetails && <div className="buy-container-left">
                    <EventFilter/>
                    <RightsFilter
                        onFilter={this.filter}
                        rightsPackage={this.state.rightsPackage}/>

                </div>}

                {!showDetails && <div className="buy-container-right">
                    {
                        listings.length > 0 && listings.map((listing) => {
                            return <ContentListing
                                onSelect={this.selectListing}
                                key={listing.customId}
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
                        content={content}/>
                }


            </div>
        )
    }
}

const mapStateToProps = ( state, ownProps) => {
    return ownProps;
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketplace)