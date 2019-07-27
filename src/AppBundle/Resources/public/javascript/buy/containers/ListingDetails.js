import React from "react";
import { connect } from "react-redux";
import Moment from "moment/moment";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import test from "../actions";
import CommercialTerms from "./CommercialTerms";
import TermSheet from "./TermSheet";
import ProgramDetails from "./ProgramDetails";
import Seller from "./Seller";
import SendMessage from "../../common/modals/SendMessage/SendMessage";
import ContentListingEventDetails from "../components/ContentListingEventDetails";
import { customStyles } from "../../main/styles/custom";
import ContentListingRightsPackage from "../components/ContentListingRightsPackage";
import { getListingImage } from "../../common/utils/listing";
import { DATE_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import EditButton from "../components/EditButton";
import { scrollTopMainContent } from "../../sell/actions/contentActions";
import { disableValidation, enableValidation } from "../../main/actions/validationActions";
import Checkout from "./Checkout";
import ShareListing from "../../common/components/ShareListing";

class ListingDetails extends React.Component {
	constructor(props) {
		super(props);

		const listing = ContentArena.Utils.contentParserFromServer(props.listing) || {};
		const company = ContentArena.Utils.filterCompanyInfo(props.company);
		const bundles = (props.bundles) ? props.bundles.split("&").map(b => Number(b)) : [];

		let selectedPackages = {};

		if (props.tab && props.tab === "checkout") {
			const listingBundles = listing.salesPackages.filter(sp => bundles.indexOf(sp.id) >= 0);
			const customBundles = (listing.customBundles) ? listing.customBundles.filter(sp => bundles.indexOf(sp.id) >= 0) : [];

			selectedPackages = [...listingBundles, ...customBundles];
		}


		this.state = {
			companyUpdated: false,
			content: listing,
			company,
			spinner: false,
			tab: props.tab || "bundles",
			buyingMode: props.tab && props.tab === "checkout",
			soldOut: false,
			selectedPackages,
			openContactSellerModal: false,
			signatureName: `${props.user.firstName} ${props.user.lastName}`,
			signaturePosition: props.user.title,
		};

		if (this.state.selectedPackage) this.state.minimumBid = this.state.selectedPackage.fee;
		this.checkIcon = `${assetsBaseDir}app/images/check.png`;
		this.contactIcon = `${assetsBaseDir}app/images/envelope.png`;
		this.watchlistIcon = `${assetsBaseDir}app/images/watchlist.png`;
		this.baseDir = `${assetsBaseDir}../`;
	}

	componentDidMount() {
		const { salesPackage } = this.props;
		const { content } = this.state;
		let selectedPackage;

		if (salesPackage) {
			selectedPackage = content.salesPackages.filter(p => Number(p.id) === Number(salesPackage))[0];
			this.selectPackage(selectedPackage);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			content: ContentArena.Utils.contentParserFromServer(nextProps.listing),
		});
	}

	selectPackage = (bundles, customId) => {
		const { history } = this.props;

		history.push(`/listing/${customId}/checkout/${bundles.join("&")}`);
		scrollTopMainContent();
	};

	showTab = (tab) => {
		this.setState({ tab });
	};

	closeSuccessScreen = () => {
		const { history } = this.props;
		history.push("/marketplace");
	};

	successScreen = () => {
		const { selectedPackage } = this.state;
		const { history } = this.props;

		if (!selectedPackage) return undefined;
		return (
			<Modal
				isOpen={this.state.showSuccessScreen}
				onRequestClose={this.closeSuccessScreen}
				bodyOpenClassName="selector"
				style={customStyles}
			>

				<div style={{
					color: "grey",
					padding: 20,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				>
					<div style={{
						fontSize: 30,
						width: 600,
						textAlign: "center",
						fontWeight: 600,
					}}
					>
						<Translate i18nKey="CHECKOUT_CONGRATULATIONS" />
					</div>
					{selectedPackage.salesMethod === "FIXED" && (
						<div style={{
							fontSize: 20,
							width: 600,
							margin: 40,
							textAlign: "center",
						}}
						>
							<Translate i18nKey="CHECKOUT_FIXED_SUCCESS_MESSAGE" />
						</div>
					)}
					{selectedPackage.salesMethod === "BIDDING" && (
						<div style={{
							fontSize: 20,
							width: 600,
							margin: 40,
							textAlign: "center",
						}}
						>
							<Translate i18nKey="CHECKOUT_BID_SUCCESS_MESSAGE" />
						</div>
					)}

					<div style={{ display: "flex" }}>
						{selectedPackage.salesMethod === "FIXED" && (
							<button
								className="standard-button"
								onClick={() => {
									history.push("/closeddeals");
								}}
							>
								<Translate i18nKey="CHECKOUT_FIXED_GO_TO_CLOSED_DEALS" />
							</button>
						)}

						{selectedPackage.salesMethod !== "FIXED" && (
							<button
								className="standard-button"
								onClick={() => {
									history.push("/bids/activebids");
								}}
							>
								<Translate i18nKey="CHECKOUT_FIXED_GO_TO_BIDS" />
							</button>
						)}

						<button className="standard-button" onClick={this.closeSuccessScreen}>
							<Translate i18nKey="CHECKOUT_FIXED_GO_TO_MARKETPLACE" />
						</button>
					</div>
				</div>

			</Modal>
		);
	};

	watchlist = () => {
		const { content } = this.state;
		const _this = this;

		content.watchlist = !content.watchlist;
		_this.setState({ content });

		ContentArena.Api.watchlist(content.customId).then((response) => {
			if (response && response.success === true) {
				content.watchlist = !!response.state;
				_this.setState({ content });
			}
		});
	};

	isActiveTab = (activeTab, tab) => (activeTab === tab ? "active" : "");

	handleOpenContactSellerModal = () => this.setState({ openContactSellerModal: true });

	handleCloseContactSellerModal = () => this.setState({ openContactSellerModal: false });

	render() {
		ReactTooltip.rebuild();
		const { profile, history, listing } = this.props;
		const {
			buyingMode,
			selectedPackages,
			tab,
			content,
			company,
			openContactSellerModal,
		} = this.state;

		const isEditedProgramShown = content.rightsPackage.some(e => e.shortLabel === "PR");
		const isEditedProgramShownInFirstTab = content.rightsPackage.length === 1 && isEditedProgramShown;

		return (
			<div className="listing-details">
				{openContactSellerModal && (
					<SendMessage
						title={content.company.legalName}
						isOpen={openContactSellerModal}
						listing={content.id}
						recipient={content.company.id}
						onCloseModal={this.handleCloseContactSellerModal}
					/>
				)}
				{this.successScreen()}
				{!buyingMode && (
					<div className="listing-details-top-info">
						<ShareListing
							listingId={listing.customId}
						/>
						{profile === "BUYER" && (
							<div className="publisher">
								<i className="fa fa-user-o icon" />
								{content.company.legalName}
							</div>
						)}

						{<EditButton {...content} />}

						{profile === "BUYER" && (
							<a onClick={this.watchlist}>
								<img src={content.watchlist ? this.checkIcon : this.watchlistIcon} className="icon" alt="" />
								<span>
									{content.watchlist ? <Translate i18nKey="LISTING_DETAILS_ADDED_TO_WATCHLIST" /> : <Translate i18nKey="Watchlist" />}
								</span>
							</a>
						)}

						<div className="custom-id">
							#{content.customId}
						</div>
					</div>
				)}
				<div className="listing-details-content">
					<div className="left">

						{content.featured && (
							<div className="featured-badge">
								<div className="featured-badge-text" />
								<Translate i18nKey="FEATURED_LISTING_BADGE_TEXT" />
							</div>
						)}

						{getListingImage(content)}

						<ContentListingEventDetails {...this.props.listing} showSeasonDuration showFullSeasons />

						<ContentListingRightsPackage
							rightsPackage={content.rightsPackage}
						/>

						<div className="legend-wrapper">
							<RightsLegend />
						</div>

						<div className="info">
							<div className="d-flex">
								<div style={{ marginRight: 5 }}>
									<Translate i18nKey="Publishing date" />
								</div>
								<div>
									<b>{Moment().format(DATE_FORMAT)}</b>
								</div>
							</div>
							<div className="d-flex">
								<div style={{ marginRight: 5 }}>
									<Translate i18nKey="Expiry" />
								</div>
								<div>
									<b>{Moment(content.expiresAt).format(DATE_FORMAT)}</b>
								</div>
							</div>
						</div>

					</div>
					{!buyingMode && (
						<div className="right">
							<div className="listings-details-title">
								<div className="ca-title small">
									{content.name}
								</div>
							</div>

							{/* TABS */}
							<div className="ca-tabs">
								<div
									className={`tab ${this.isActiveTab(tab, "bundles")}`}
									onClick={() => {
										history.push(`/listing/${content.customId}/bundles`);
										this.showTab("bundles");
									}}
								>
									<Translate i18nKey="LISTING_DETAILS_TAB_BUNDLES" />
								</div>

								{content.PROGRAM_NAME && !isEditedProgramShownInFirstTab && isEditedProgramShown && (
									<div
										className={`tab ${this.isActiveTab(tab, "editedprogram")}`}
										onClick={() => {
											history.push(`/listing/${content.customId}/editedprogram`);
											this.showTab("editedprogram");
										}}
									>
										<Translate i18nKey="LISTING_DETAILS_EDITED_PROGRAM" />
									</div>
								)}


								<div
									className={`tab ${this.isActiveTab(tab, "grantofrights")}`}
									onClick={() => {
										history.push(`/listing/${content.customId}/grantofrights`);
										this.showTab("grantofrights");
									}}
								>
									<Translate i18nKey="LISTING_DETAILS_TAB_RIGHTS" />
								</div>


								<div
									className={`tab ${this.isActiveTab(tab, "seller")}`}
									onClick={() => {
										history.push(`/listing/${content.customId}/seller`);
										this.showTab("seller");
									}}
								>
									<Translate i18nKey="LISTING_DETAILS_TAB_SELLER" />
								</div>
							</div>

							{/* TAB CONTENT */}
							<div className="listing-details-tab">
								{tab === "bundles" && (
									<CommercialTerms
										profile={profile}
										onSelectPackage={this.selectPackage}
										programDetails={(content.PROGRAM_NAME && isEditedProgramShownInFirstTab && isEditedProgramShown)
											? <ProgramDetails {...content} /> : false}
										{...content}
									/>
								)}
								{tab === "grantofrights"
								&& <TermSheet {...content} />
								}
								{tab === "editedprogram"
								&& <ProgramDetails {...content} />
								}
								{tab === "seller"
								&& <Seller {...content} />
								}
							</div>
						</div>
					)}
					{buyingMode
					&& (
						<Checkout
							listing={listing}
							history={history}
							selectedPackages={selectedPackages}
							company={company}
						/>
					)}
				</div>
			</div>

		);
	}
}

ListingDetails.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
	scrollTopMainContent: () => dispatch(scrollTopMainContent()),
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ListingDetails);
