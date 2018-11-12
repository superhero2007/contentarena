import React from 'react';
import { connect } from "react-redux";
import {PropTypes} from "prop-types";
import Modal from 'react-modal';
import {goTo} from "../../main/actions/utils";
import BoardListing from '../components/BoardListing';
import {updateProfile} from "../../main/actions/userActions";
import RightsLegend from "../../main/components/RightsLegend";
import {customStyles} from "../../main/styles/custom";

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
                goTo("contentlisting/" + response.listing.customId + "/1");
            }
        });
    };

    republish = (customId) => {
        let active = this.state.active;
        this.setState({loadingActive : true});
        ContentArena.ContentApi.republishListing(customId).done(response => {
            if ( response.success ) {
                active.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
                this.setState({active : active, loadingActive : false});
            }
        });
    };

    deactivate = (customId) => {
        let inactive = this.state.inactive;
        this.setState({loadingInactive : true});
        ContentArena.ContentApi.deactivateListing(customId).done(response => {
            if ( response.success ) {
                //inactive.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
                inactive.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
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

        document.title = "Content Arena - Manage Listings";

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <div style={{width: '100%', textAlign: 'right'}} className='top-row'>
                    <RightsLegend />
                    <button className="ca-btn primary" onClick={this.showHelpModal}>
                        {this.context.t("MANAGE_LISTINGS_HELP")}
                    </button>
                </div>

                <div className={"board"}>
                    {/*DRAFT*/}
                    <div className={"column"}>
                        <div className={"column-title"}>
                            <div>{this.context.t("MANAGE_LISTINGS_TITLE_DRAFT")}</div> ({draft.length})
                            <div>
                                <a className="ca-btn primary" href="/contentlisting/new">
                                    {this.context.t("MANAGE_LISTINGS_CREATE_LISTING")}
                                </a>
                            </div>
                        </div>
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
                        <div className={"column-title"}>
                            <div>{this.context.t("MANAGE_LISTINGS_TITLE_INACTIVE")}</div> ({inactive.length})
                        </div>
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
                                    showArchive={true}
                                    showDuplicate={true}
                                    showSubmit={true}
                                    showView={true}
                                    onRepublish={()=>{
                                        list.splice(i,1);
                                        this.setState({inactive: list});
                                        this.republish(listing.customId);
                                    }}
                                    onArchive={()=>{
                                        list.splice(i,1);
                                        this.setState({inactive: list});
                                        ContentArena.ContentApi.archiveListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                    {/*ACTIVE*/}
                    <div className={"column"}>
                        <div className={"column-title"}>
                            <div>{this.context.t("MANAGE_LISTINGS_TITLE_ACTIVE")}</div> ({active.length})
                        </div>
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
                                    showEdit={!listing.hasPendingBids}
                                    showDeactivate={!listing.hasPendingBids}
                                    showDuplicate={true}
                                    showArchive={!listing.hasPendingBids}
                                    showView={true}
                                    defaultAction={"VIEW"}
                                    onDeactivate={()=>{
                                        list.splice(i,1);
                                        this.setState({active: list});
                                        this.deactivate(listing.customId);
                                    }}
                                    onArchive={()=>{
                                        list.splice(i,1);
                                        this.setState({active: list});
                                        ContentArena.ContentApi.archiveListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                    {/*EXPIRED*/}
                    <div className={"column"}>
                        <div className={"column-title"}>
                            <div>{this.context.t("MANAGE_LISTINGS_TITLE_EXPIRED")}</div> ({expired.length})
                        </div>
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
                                    showDuplicate={true}
                                    showArchive={true}
                                    showView={true}
                                    onArchive={()=>{
                                        list.splice(i,1);
                                        this.setState({expired: list});
                                        ContentArena.ContentApi.archiveListing(listing.customId)
                                    }}
                                    onDuplicate={this.duplicate}
                                    {...listing}/>
                            })
                        }
                    </div>
                </div>
                {this.renderModal()}
            </div>
        )
    }

    renderModal() {
        const { showHelpModal } = this.state;

        return (
            <Modal
                isOpen={showHelpModal}
                onRequestClose={this.hideHelpModal}
                bodyOpenClassName={"selector"}
                style={customStyles}
                contentLabel=""
            >
                <div className='manage-listing-modal'>
                    <div className="modal-title">
                        {this.context.t("MANAGE_LISTINGS_HELP_MODAL_TITLE")}
                        <i className="fa fa-times-circle-o close-icon" onClick={this.hideHelpModal}/>
                    </div>
                    <div className='modal-content'>
                        <div className='help-item'>
                            <div className='title'>1. {this.context.t("MANAGE_LISTINGS_HELP_MODAL_DRAFTS_TITLE")}</div>
                            <div className='description'>{this.context.t("MANAGE_LISTINGS_HELP_MODAL_DRAFTS_DESCRIPTION")}</div>
                        </div>
                        <div className='help-item'>
                            <div className='title'>2. {this.context.t("MANAGE_LISTINGS_HELP_MODAL_INACTIVE_TITLE")}</div>
                            <div className='description'>{this.context.t("MANAGE_LISTINGS_HELP_MODAL_INACTIVE_DESCRIPTION")}</div>
                        </div>
                        <div className='help-item'>
                            <div className='title'>3. {this.context.t("MANAGE_LISTINGS_HELP_MODAL_ACTIVE_TITLE")}</div>
                            <div className='description'>{this.context.t("MANAGE_LISTINGS_HELP_MODAL_ACTIVE_DESCRIPTION")}</div>
                        </div>
                        <div className='help-item'>
                            <div className='title'>4. {this.context.t("MANAGE_LISTINGS_HELP_MODAL_EXPIRED_TITLE")}</div>
                            <div className='description'>{this.context.t("MANAGE_LISTINGS_HELP_MODAL_EXPIRED_DESCRIPTION")}</div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    showHelpModal = () => {
        this.setState({
            showHelpModal: true
        });
    };

    hideHelpModal = () => {
        this.setState({
            showHelpModal: false
        });
    };
}

ManageListings.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        updateProfile : profile =>dispatch(updateProfile(profile)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageListings)