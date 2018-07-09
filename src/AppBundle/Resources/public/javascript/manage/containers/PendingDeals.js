import React from 'react';
import { connect } from "react-redux";
import ContentListingPendingBid from '../../main/components/ContentListingPendingBid';
import {goTo} from "../../main/actions/utils";

class PendingDeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            loadingDeclined : false,
            bids : [],
            declinedBids: [],
            active : true

        };
        this.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        this.activeBulletIcon = assetsBaseDir + "app/images/active_bullet.png";
    }

    componentDidMount () {
        let _this = this;
        this.setState({loading:true, loadingDeclined : true});
        ContentArena.ContentApi.getPendingDeals().done((bids) => {
            _this.setState({bids: bids, loading : false});
        });

        ContentArena.ContentApi.getRejectedDeals().done((declinedBids) => {
            _this.setState({declinedBids: declinedBids, loadingDeclined : false});
        });
    }

    selectListing = (id) => {
        goTo("listing/" + id);
    };

    remove = ( customId) => {
        this.setState({
            bids : this.state.bids.filter(l => l.customId !== customId)
        });
    };

    render () {
        const { loading, bids, active, declinedBids, loadingDeclined } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <div style={{
                    display: 'flex',
                    padding: '0 0 20px',
                    color: '#4F4F4F',
                    fontSize: 18,
                    fontWeight: 600
                }}>
                    <div style={{margin:'0 20px'}}>Bids</div>
                    <div style={{margin:'0 20px' , cursor: 'pointer'}}
                         onClick={()=>{this.setState({active: true})}}>
                        {active && <img  style={{margin:'0px 10px 3px'}} src={this.activeBulletIcon} />}
                        {!active && <img  style={{margin:'0px 10px 3px'}} src={this.bulletIcon} />}
                        Active
                    </div>
                    <div style={{margin:'0 20px', cursor: 'pointer'}}
                         onClick={()=>{this.setState({active: false})}}>
                        {!active && <img  style={{margin:'0px 10px 3px'}} src={this.activeBulletIcon} />}
                        {active && <img  style={{margin:'0px 10px 3px'}} src={this.bulletIcon} />}
                        Declined
                    </div>
                </div>

                {
                    active && bids.length > 0 && bids.map((bid, i) => {
                        return <ContentListingPendingBid
                            onSelect={this.selectListing}
                            key={i + "-" + bid.content.customId}
                            bid={bid}
                            {...bid.content}
                        />
                    })
                }

                {
                    !active && declinedBids.length > 0 && declinedBids.map((bid, i) => {
                        return <ContentListingPendingBid
                            onSelect={this.selectListing}
                            key={i + "-" + bid.content.customId}
                            bid={bid}
                            {...bid.content}
                        />
                    })
                }

                {
                    active && bids.length === 0 &&
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
                                You haven't made any bids yet!
                            </div>
                        }
                    </div>
                }

                {
                    !active && declinedBids.length === 0 &&
                    <div className="manager-content-message">
                        {
                            loadingDeclined && <div className="big-spinner">
                                <i className="fa fa-cog fa-spin"/>
                            </div>
                        }

                        {
                            !loadingDeclined && <div className="big-spinner" style={{
                                fontSize: 30
                            }}>
                                You haven't any declined bids yet!
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
)(PendingDeals)