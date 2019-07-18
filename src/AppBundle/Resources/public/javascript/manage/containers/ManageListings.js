import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Modal from "react-modal";
import Translate from "@components/Translator/Translate";
import { goTo } from "../../main/actions/utils";
import BoardListing from "../components/BoardListing";
import { updateProfile } from "../../main/actions/userActions";
import RightsLegend from "../../main/components/RightsLegend";
import { customStyles } from "../../main/styles/custom";
import Loader from "../../common/components/Loader";

class ManageListings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			loadingDraft: false,
			loadingInactive: false,
			loadingActive: false,
			loadingExpired: false,
			draft: [],
			active: [],
			inactive: [],
			expired: [],
		};
	}

	componentDidMount() {
		const _this = this;
		this.setState({
			loadingDraft: true,
			loadingInactive: true,
			loadingActive: true,
			loadingExpired: true,
		});

		ContentArena.ContentApi.getDraftListings()
			.done((listings) => {
				listings = listings.map(listing => ContentArena.Utils.contentParserFromServer(listing));
				_this.setState({
					draft: listings,
					loadingDraft: false,
				});
			});

		ContentArena.ContentApi.getInactiveListings()
			.done((listings) => {
				listings = listings.map(listing => ContentArena.Utils.contentParserFromServer(listing));
				_this.setState({
					inactive: listings,
					loadingInactive: false,
				});
			});

		ContentArena.ContentApi.getActiveListings()
			.done((listings) => {
				listings = listings.map(listing => ContentArena.Utils.contentParserFromServer(listing));
				_this.setState({
					active: listings,
					loadingActive: false,
				});
			});

		ContentArena.ContentApi.getExpiredListings()
			.done((listings) => {
				listings = listings.map(listing => ContentArena.Utils.contentParserFromServer(listing));
				_this.setState({
					expired: listings,
					loadingExpired: false,
				});
			});
	}

	selectListing = (id) => {
		goTo(`listing/${id}`);
	};

	duplicate = (customId) => {
		const { draft } = this.state;
		this.setState({ loadingDraft: true });
		ContentArena.ContentApi.duplicateListing(customId)
			.done((response) => {
				if (response.success) {
					draft.unshift(response.listing);
					this.setState({
						draft,
						loadingDraft: false,
					});
					goTo(`contentlisting/${response.listing.customId}/1`);
				}
			});
	};

	republish = (customId) => {
		const { active } = this.state;
		this.setState({ loadingActive: true });
		ContentArena.ContentApi.republishListing(customId)
			.done((response) => {
				if (response.success) {
					active.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
					this.setState({
						active,
						loadingActive: false,
					});
				}
			});
	};

	deactivate = (customId) => {
		const { inactive } = this.state;
		this.setState({ loadingInactive: true });
		ContentArena.ContentApi.deactivateListing(customId)
			.done((response) => {
				if (response.success) {
					inactive.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
					this.setState({
						inactive,
						loadingInactive: false,
					});
				}
			});
	};

	render() {
		const {
			loadingDraft,
			loadingActive,
			loadingExpired,
			loadingInactive,
			draft, active, inactive, expired,
		} = this.state;

		return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
			>
				<div className="top-row">
					<RightsLegend />
					<button className="ca-btn primary" onClick={this.showHelpModal}>
						<Translate i18nKey="MANAGE_LISTINGS_HELP" />
					</button>
				</div>

				<div className="board">
					{/* DRAFT */}
					<div className="column">
						<div className="column-title">
							<div>
								<Translate i18nKey="MANAGE_LISTINGS_TITLE_DRAFT" />
							</div>
							{" "}
							(


							{draft.length}
							)


							<div>
								<a className="ca-btn primary" href="/contentlisting/new">
									<Translate i18nKey="MANAGE_LISTINGS_CREATE_LISTING" />
								</a>
							</div>
						</div>

						<Loader loading={loadingDraft} small>
							{draft.length > 0 && draft.map((listing, i, list) => (
								<BoardListing
									key={`draft-${i}`}
									className="listing"
									style={{
										zIndex: list.length - i,
									}}
									defaultAction="EDIT"
									showEdit
									showRemove
									showDuplicate
									showView={false}
									onRemove={() => {
										list.splice(i, 1);
										this.setState({ draft: list });
										ContentArena.ContentApi.removeListing(listing.customId);
									}}
									onDuplicate={this.duplicate}
									{...listing}
								/>
							))}
						</Loader>

					</div>
					{/* INACTIVE */}
					<div className="column">
						<div className="column-title">
							<div><Translate i18nKey="MANAGE_LISTINGS_TITLE_INACTIVE" /></div>
							{" "}
							(


							{inactive.length}
							)


						</div>

						<Loader loading={loadingInactive} small>
							{inactive.length > 0 && inactive.map((listing, i, list) => (
								<BoardListing
									key={`inactive-${i}`}
									className="listing"
									style={{
										zIndex: list.length - i,
									}}
									defaultAction="SUBMIT"
									showEdit
									showArchive
									showDuplicate
									showSubmit
									showView
									onRepublish={() => {
										list.splice(i, 1);
										this.setState({ inactive: list });
										this.republish(listing.customId);
									}}
									onArchive={() => {
										list.splice(i, 1);
										this.setState({ inactive: list });
										ContentArena.ContentApi.archiveListing(listing.customId);
									}}
									onDuplicate={this.duplicate}
									{...listing}
								/>
							))}
						</Loader>
					</div>
					{/* ACTIVE */}
					<div className="column">
						<div className="column-title">
							<div><Translate i18nKey="MANAGE_LISTINGS_TITLE_ACTIVE" /></div>
							{" "}
							(


							{active.length}
							)


						</div>
						<Loader loading={loadingActive} small>
							{active.length > 0 && active.map((listing, i, list) => (
								<BoardListing
									key={`active-${i}`}
									className="listing"
									style={{
										zIndex: list.length - i,
									}}
									showEdit={!listing.hasPendingBids}
									showDeactivate={!listing.hasPendingBids}
									showDuplicate
									showArchive={!listing.hasPendingBids}
									showView
									defaultAction="VIEW"
									onDeactivate={() => {
										list.splice(i, 1);
										this.setState({ active: list });
										this.deactivate(listing.customId);
									}}
									onArchive={() => {
										list.splice(i, 1);
										this.setState({ active: list });
										ContentArena.ContentApi.archiveListing(listing.customId);
									}}
									onDuplicate={this.duplicate}
									canShare
									{...listing}
								/>
							))}
							{" "}
						</Loader>
					</div>
					{/* EXPIRED */}
					<div className="column">
						<div className="column-title">
							<div><Translate i18nKey="MANAGE_LISTINGS_TITLE_EXPIRED" /></div>
							{" "}
							(


							{expired.length}
							)


						</div>
						<Loader loading={loadingExpired} small>
							{expired.length > 0 && expired.map((listing, i, list) => (
								<BoardListing
									key={`expired-${i}`}
									className="listing"
									style={{
										zIndex: list.length - i,
									}}
									showDuplicate
									showArchive
									showView
									onArchive={() => {
										list.splice(i, 1);
										this.setState({ expired: list });
										ContentArena.ContentApi.archiveListing(listing.customId);
									}}
									onDuplicate={this.duplicate}
									{...listing}
								/>
							))}
						</Loader>
					</div>
				</div>
				{this.renderModal()}
			</div>
		);
	}

	renderModal() {
		const { showHelpModal } = this.state;

		return (
			<Modal
				isOpen={showHelpModal}
				onRequestClose={this.hideHelpModal}
				bodyOpenClassName="selector"
				style={customStyles}
				contentLabel=""
			>
				<div className="manage-listing-modal">
					<div className="modal-title">
						<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_TITLE" />
						<i className="fa fa-times-circle-o close-icon" onClick={this.hideHelpModal} />
					</div>
					<div className="modal-content">
						<div className="help-item">
							<div className="title">
								1.


								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_DRAFTS_TITLE" />
							</div>
							<div
								className="description"
							>
								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_DRAFTS_DESCRIPTION" />
							</div>
						</div>
						<div className="help-item">
							<div className="title">
								2.


								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_INACTIVE_TITLE" />
							</div>
							<div
								className="description"
							>
								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_INACTIVE_DESCRIPTION" />
							</div>
						</div>
						<div className="help-item">
							<div className="title">
								3.


								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_ACTIVE_TITLE" />
							</div>
							<div
								className="description"
							>
								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_ACTIVE_DESCRIPTION" />
							</div>
						</div>
						<div className="help-item">
							<div className="title">
								4.


								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_EXPIRED_TITLE" />
							</div>
							<div
								className="description"
							>
								<Translate i18nKey="MANAGE_LISTINGS_HELP_MODAL_EXPIRED_DESCRIPTION" />
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}

	showHelpModal = () => {
		this.setState({
			showHelpModal: true,
		});
	};

	hideHelpModal = () => {
		this.setState({
			showHelpModal: false,
		});
	};
}

ManageListings.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ManageListings);
