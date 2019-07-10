import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Select from "react-select";
import Translate from "@components/Translator/Translate";
import EmptyCommercialOverview from "../components/EmptyScreens/EmptyCommercialOverview";
import {
	exclusiveRightAvailable,
	nonExclusiveRightAvailable,
	exclusiveRightOffered,
	nonExclusiveRightOffered,
	exclusiveRightSold,
	nonExclusiveRightSold,
} from "../../main/components/Icons";
import CommercialBidsTable from "../components/CommercialBidsTable";

class CmsCommercialOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listings: [],
			selectedListings: [],
			openBids: true,
			closedBids: true,
			declinedBids: false,
		};
		this.reloadIcon = `${assetsBaseDir}app/images/reload.png`;
	}

	componentDidMount() {
		this.update();
	}

	update = () => {
		const { history, propertyId } = this.props;
		this.setState({ loading: true });

		ContentArena.ContentApi.getAllDealsByPropertyId(propertyId).done((listings) => {
			listings.forEach(l => ContentArena.Utils.contentParserFromServer(l));

			this.setState({
				listings,
				selectedListings: listings.map(b => b.customId),
				loading: false,
			});
		});
	};

	onChangeSelect = (selectedItem) => {
		// const { history, propertyId } = this.props;
		// const { filter } = this.state;
		// const filterString = (filter !== "ALL") ? (selectedItem) ? `&${filter}` : filter : "";
		// const idString = selectedItem ? selectedItem.value : "";
		// const prefix = (!selectedItem && filter === "ALL") ? "" : "/filter/";
		// history.push(`/properties/${propertyId}/commercialoverview${prefix}${idString}${filterString}`);
		this.setState({ selectedListings: [selectedItem.value] });
	};

	toggleOpenBids = () => {
		this.setState(prevState => ({ openBids: !prevState.openBids }));
	};

	toggleClosedBids = () => {
		this.setState(prevState => ({ closedBids: !prevState.closedBids }));
	};

	toggleDeclinedBids = () => {
		this.setState(prevState => ({ declinedBids: !prevState.declinedBids }));
	};

	render() {
	  const { history, propertyId } = this.props;
	  const {
	  	listings,
		  selectedListings,
		  openBids,
		  closedBids,
		  declinedBids,
	  } = this.state;

	  if (!listings.length) {
	  	return (
		    <section className="commercial-overview-tab">
			    <EmptyCommercialOverview history={history} propertyId={propertyId} />
		    </section>
			);
		}

		const allListings = selectedListings.length ? listings.filter(list => selectedListings.indexOf(list.customId) !== -1) : listings;

		const openBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.salesPackages.map(sp => sp.bids.filter(b => b.status.name === "PENDING")
					.map(b => Object.assign({}, { list, sp }, b))),
			)),
		);
		const closedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.salesPackages.map(sp => sp.bids.filter(b => b.status.name === "APPROVED")
					.map(b => Object.assign({}, { list, sp }, b))),
			)),
		);
		const declinedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.salesPackages.map(sp => sp.bids.filter(b => b.status.name === "REJECTED")
					.map(b => Object.assign({}, { list, sp }, b))),
			)),
		);

	  return (
		  <section className="commercial-overview-tab">
			  <div className="region-filter">
				  <div className="d-flex">
					  <div className="split-filter">
						  <div className="region-filter-title">
							  <div className="title-wrapper">
								  { <Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />}
								  <div className="subtitle">
									  { <Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_SUBTITLE" />}
								  </div>
							  </div>
						  </div>
						  <div className="manager-filter-container">
							  <div className="listing-filter">
								  <Select
									  name="form-field-name"
									  placeholder={this.context.t("COMMERCIAL_ACTIVITY_FILTER_SEARCH_PLACEHOLDER")}
									  isClearable
									  onChange={this.onChangeSelect}
									  multi={false}
									  value={selectedListings[0]}
									  options={listings.map(b => ({ value: b.customId, label: b.name }))}
								  />
								  <div className="reset-listing-filter" onClick={this.onResetFilter}>
									  <img src={this.reloadIcon} alt="" />
									  <span><Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_SEARCH_CLEAR" /></span>
								  </div>
							  </div>
						  </div>
					  </div>
					  <div className="split-filter">
						  <div className="region-filter-title">
							  { <Translate i18nKey="CMS_RIGHT_LEGENDS_TITLE" />}
						  </div>
						  <div className="right-legends">
							  <div className="right-legends-item">
								  <img src={nonExclusiveRightAvailable} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_AVAILABLE" />}
							  </div>
							  <div className="right-legends-item">
								  <img src={nonExclusiveRightOffered} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_OFFERED" />}
							  </div>
							  <div className="right-legends-item">
								  <img src={nonExclusiveRightSold} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_NON_EXCLUSIVE_SOLD" />}
							  </div>
							  <div className="right-legends-item">
								  <img src={exclusiveRightAvailable} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_AVAILABLE" />}
							  </div>
							  <div className="right-legends-item">
								  <img src={exclusiveRightOffered} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_OFFERED" />}
							  </div>
							  <div className="right-legends-item">
								  <img src={exclusiveRightSold} alt="" />
								  { <Translate i18nKey="CMS_RIGHT_LEGENDS_EXCLUSIVE_SOLD" />}
							  </div>
						  </div>
					  </div>
				  </div>
				  <div className="region-filter-bids">
					  <div className="region-filter-title toggle" onClick={this.toggleOpenBids}>
						  <div className="region-filter-title-text">
							  <Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_OPEN_BIDS" />{ ` (${openBidsList.length})`}
						  </div>
						  <div className="region-filter-title-dropdown">
							  <i className={`fa fa-angle-${openBids ? "down" : "up"}`} />
						  </div>
					  </div>
					  <div className="region-filter-content">
						  {openBidsList.length > 0 && openBids && <CommercialBidsTable listings={openBidsList} type="openBids" />}
					  </div>
				  </div>
				  <div className="region-filter-bids">
					  <div className="region-filter-title toggle" onClick={this.toggleClosedBids}>
						  <div className="region-filter-title-text">
							  <Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_CLOSED_DEALS" />{ ` (${closedBidsList.length})`}
						  </div>
						  <div className="region-filter-title-dropdown">
							  <i className={`fa fa-angle-${closedBids ? "down" : "up"}`} />
						  </div>
					  </div>
					  <div className="region-filter-content">
						  {closedBidsList.length > 0 && closedBids && <CommercialBidsTable listings={closedBidsList} type="closedBids" />}
					  </div>
				  </div>
				  <div className="region-filter-bids">
					  <div className="region-filter-title toggle" onClick={this.toggleDeclinedBids}>
						  <div className="region-filter-title-text">
							  <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_REJECTED" />{ ` (${declinedBidsList.length})`}
						  </div>
						  <div className="region-filter-title-dropdown">
							  <i className={`fa fa-angle-${declinedBids ? "down" : "up"}`} />
						  </div>
					  </div>
					  <div className="region-filter-content">
						  {declinedBidsList.length > 0 && declinedBids && <CommercialBidsTable listings={declinedBidsList} type="declinedBids" />}
					  </div>
				  </div>
			  </div>
		  </section>
		);
	}
}

CmsCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(CmsCommercialOverview);
