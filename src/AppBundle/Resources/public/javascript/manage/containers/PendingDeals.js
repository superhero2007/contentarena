import React from 'react';
import { connect } from "react-redux";
import ContentListingPendingBid from '../../main/components/ContentListingPendingBid';
import {goTo} from "../../main/actions/utils";
import {PropTypes} from "prop-types";

class PendingDeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            loadingDeclined : false,
            bids : [],
            declinedBids: [],
            tab : props.match.params.tab || "activebids"

        };
        this.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        this.activeBulletIcon = assetsBaseDir + "app/images/active_bullet.png";
    }

    componentDidMount () {
        this.update();
    }

    selectListing = (id) => {
        goTo("listing/" + id, true);
    };

    update = () => {
        let _this = this;
        this.setState({loading:true, loadingDeclined : true});
        ContentArena.ContentApi.getPendingDeals().done((bids) => {
            _this.setState({bids: bids, loading : false});
        });

        ContentArena.ContentApi.getRejectedDeals().done((declinedBids) => {
            _this.setState({declinedBids: declinedBids, loadingDeclined : false});
        });
    };

    deleteBid = (id) => {
        ContentArena.ContentApi.removeBid({id:id}).done((r)=>{
            this.update();
        });
    };

    remove = ( customId) => {
        this.setState({
            bids : this.state.bids.filter(l => l.customId !== customId)
        });
    };

    render () {
        const { loading, bids, tab, declinedBids, loadingDeclined } = this.state;
        const { history } = this.props;
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
                         onClick={()=>{
                             history.push('/bids/activebids')
                         }}>
                        {tab === "activebids" && <img  style={{margin:'0px 10px 3px'}} src={this.activeBulletIcon} />}
                        {tab !== "activebids" && <img  style={{margin:'0px 10px 3px'}} src={this.bulletIcon} />}
                        {this.context.t("PENDING_BIDS_FILTER_ACTIVE")}
                    </div>
                    <div style={{margin:'0 20px', cursor: 'pointer'}}
                         onClick={()=>{
                             history.push('/bids/declinedbids')
                         }}>
                        {tab === "declinedbids" && <img  style={{margin:'0px 10px 3px'}} src={this.activeBulletIcon} />}
                        {tab !== "declinedbids" && <img  style={{margin:'0px 10px 3px'}} src={this.bulletIcon} />}
                        {this.context.t("PENDING_BIDS_FILTER_DECLINED")}
                    </div>
                </div>

                {
                    tab === "activebids" && bids.length > 0 && bids.map((bid, i) => {
                        return <ContentListingPendingBid
                            onSelect={this.selectListing}
                            onDelete={this.deleteBid}
                            key={i + "-" + bid.content.customId}
                            bid={bid}
                            {...bid.content}
                        />
                    })
                }

                {
                    tab === "declinedbids" && declinedBids.length > 0 && declinedBids.map((bid, i) => {
                        return <ContentListingPendingBid
                            onSelect={this.selectListing}
                            declined={true}
                            onDelete={this.deleteBid}
                            key={i + "-" + bid.content.customId}
                            bid={bid}
                            {...bid.content}
                        />
                    })
                }

                {
                    tab === "activebids" && bids.length === 0 &&
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
                                {this.context.t("PENDING_BIDS_MADE_EMPTY_MESSAGE")}
                            </div>
                        }
                    </div>
                }

                {
                    tab === "declinedbids" && declinedBids.length === 0 &&
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
                                {this.context.t("PENDING_BIDS_MADE_DECLINED_EMPTY_MESSAGE")}
                            </div>
                        }
                    </div>
                }

            </div>
        )
    }
}

PendingDeals.contextTypes = {
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
)(PendingDeals)