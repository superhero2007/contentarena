import React from 'react';
import { connect } from "react-redux";
import {goTo} from "../../main/actions/utils";
import BoardListing from '../components/BoardListing';

class ManageListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            loadingDraft:false,
            loadingInactive: false,
            loadingActive: false,
            loadingExpired: false,
            draft : [],
            active : [],
            inactive : [],
            expired : [],

        };
    }

    componentDidMount () {
        let _this = this;
        this.setState({
            loadingDraft:true,
            loadingInactive: true,
            loadingActive: true,
            loadingExpired: true
        });

        ContentArena.ContentApi.getDraftListings().done((listings) => {
            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({draft: listings, loadingDraft : false});
        });

        ContentArena.ContentApi.getInactiveListings().done((listings) => {
            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({inactive: listings, loadingInactive : false});
        });

        ContentArena.ContentApi.getActiveListings().done((listings) => {
            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({active: listings, loadingActive : false});
        });

        ContentArena.ContentApi.getExpiredListings().done((listings) => {
            listings = listings.map( listing => ContentArena.Utils.contentParserFromServer(listing) );
            _this.setState({expired: listings, loadingExpired : false});
        });
    }

    selectListing = (id) => {
        goTo("listing/" + id);
    };

    duplicate = (customId) => {
        let draft = this.state.draft;
        this.setState({loadingDraft : true});
        ContentArena.ContentApi.duplicateListing(customId).done(response => {
            if ( response.success ) {
                draft.unshift(response.listing);
                this.setState({draft : draft, loadingDraft : false});
            }
        });
    };

    deactivate = (customId) => {
        let inactive = this.state.inactive;
        this.setState({loadingInactive : true});
        ContentArena.ContentApi.deactivateListing(customId).done(response => {
            if ( response.success ) {
                //inactive.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
                inactive.unshift(response.listing);
                this.setState({inactive : inactive, loadingInactive : false});
            }
        });
    };

    render () {
        const {
            loadingDraft,
            loadingActive,
            loadingExpired,
            loadingInactive,
            draft, active, inactive, expired } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0 0 5px',
                    color: '#4F4F4F',
                    fontSize: 16,
                    fontWeight: 600,
                    alignItems: 'center',
                    marginTop : '-15px'

                }}>
                    <div style={{margin:'0 20px' , flex: 1,display: 'flex', alignItems: 'center'}}>
                        Draft ({draft.length})
                    </div>
                    <div style={{margin:'0 20px', flex: 1}}>
                        Inactive listings ({inactive.length})
                    </div>
                    <div style={{margin:'0 20px', flex: 1}}>
                        Active listings ({active.length})
                    </div>
                    <div style={{margin:'0 20px', flex: 1}}>
                        Expired & sold listings ({expired.length})
                    </div>
                </div>

                <div className={"board"}>
                    {/*DRAFT*/}
                    <div className={"column"}>
                        {loadingDraft &&
                        <div className="medium-spinner">
                            <i className="fa fa-cog fa-spin"/>
                        </div>}
                        {
                            draft.length > 0 && draft.map((listing, i, list) => {
                                return <BoardListing
                                    key={"draft-" + i}
                                    className="listing"
                                    style={{
                                        zIndex : list.length - i
                                    }}
                                    defaultAction={"EDIT"}
                                    showEdit={true}
                                    showRemove={true}
                                    showDuplicate={true}
                                    showView={false}
                                    onRemove={()=>{
                                        list.splice(i,1);
                                        this.setState({draft: list});
                                        ContentArena.ContentApi.removeListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                    {/*INACTIVE*/}
                    <div className={"column"}>
                        {loadingInactive &&
                        <div className="medium-spinner">
                            <i className="fa fa-cog fa-spin"/>
                        </div>}
                        {
                            inactive.length > 0 && inactive.map((listing, i, list) => {
                                return <BoardListing
                                    key={"inactive-" + i}
                                    className="listing"
                                    style={{
                                        zIndex : list.length - i
                                    }}
                                    defaultAction={"SUBMIT"}
                                    showEdit={true}
                                    showRemove={true}
                                    showDuplicate={true}
                                    showSubmit={true}
                                    showView={true}
                                    onRemove={()=>{
                                        list.splice(i,1);
                                        this.setState({inactive: list});
                                        ContentArena.ContentApi.removeListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                    {/*ACTIVE*/}
                    <div className={"column"}>
                        {active.length === 0 && loadingActive &&
                        <div className="medium-spinner">
                            <i className="fa fa-cog fa-spin"/>
                        </div>}
                        {
                            active.length > 0 && active.map((listing, i, list) => {
                                return <BoardListing
                                    key={"active-" + i}
                                    className="listing"
                                    style={{
                                        zIndex : list.length - i
                                    }}
                                    showEdit={listing.editable}
                                    showRemove={listing.editable}
                                    showDeactivate={listing.editable}
                                    showDuplicate={true}
                                    showView={true}
                                    defaultAction={"VIEW"}
                                    onDeactivate={()=>{
                                        list.splice(i,1);
                                        this.setState({active: list});
                                        this.deactivate(listing.customId);
                                    }}
                                    onRemove={()=>{
                                        list.splice(i,1);
                                        this.setState({active: list});
                                        ContentArena.ContentApi.removeListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                    {/*EXPIRED*/}
                    <div className={"column"}>
                        {expired.length === 0 && loadingExpired &&
                        <div className="medium-spinner">
                            <i className="fa fa-cog fa-spin"/>
                        </div>}
                        {
                            expired.length > 0 && expired.map((listing, i, list) => {
                                return <BoardListing
                                    key={"expired-" + i}
                                    className="listing"
                                    style={{
                                        zIndex : list.length - i
                                    }}
                                    showRemove={listing.editable}
                                    showDuplicate={true}
                                    showView={true}
                                    onRemove={()=>{
                                        list.splice(i,1);
                                        this.setState({expired: list});
                                        ContentArena.ContentApi.removeListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
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
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageListings)