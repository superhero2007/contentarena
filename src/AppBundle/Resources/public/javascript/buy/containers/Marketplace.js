import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import EventFilter from '../components/EventFilter';
import RightsFilter from '../components/RightsFilter';
import ContentListing from '../../main/components/ContentListing';

class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightsPackage : JSON.parse(props.rights),
            loadingListing: false,
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
        _this.setState({
            id : id,
            loadingListing : true
        });

        ContentArena.ContentApi.getByCustomId(id).done((content) => {
            _this.setState({
                content : content,
                loadingListing : false
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
        const {listings, loadingListing} = this.state;
        return (
            <div className="buy-content">
                <div className="buy-container-left">
                    <EventFilter/>
                    <RightsFilter
                        onFilter={this.filter}
                        rightsPackage={this.state.rightsPackage}/>

                </div>
                <div className="buy-container-right">
                    {
                        listings.length > 0 && listings.map((listing) => {
                            return <ContentListing {...listing} key={listing.customId}/>
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
                </div>
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