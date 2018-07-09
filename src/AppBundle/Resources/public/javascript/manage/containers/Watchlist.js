import React from 'react';
import { connect } from "react-redux";
import ContentListing from '../../main/components/ContentListing';
import {goTo} from "../../main/actions/utils";

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            listings : [],
        };
    }

    componentDidMount () {
        let _this = this;
        this.setState({loading:true});
        ContentArena.ContentApi.getWatchlistListings().done((listings) => {

            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({listings: listings, loading : false});
        });

    }

    selectListing = (id) => {
        goTo("listing/" + id);

    };

    remove = ( customId) => {
        this.setState({
            listings : this.state.listings.filter(l => l.customId !== customId)
        });
    };

    render () {
        const { loading, listings } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>

                {
                    listings.length > 0 && listings.map((listing) => {
                        return <ContentListing
                            onSelect={this.selectListing}
                            key={listing.customId}
                            {...listing}
                            watchlistRemove={true}
                            onWatchlistRemove={this.remove}
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
                                Your watchlist is empty!
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
)(Watchlist)