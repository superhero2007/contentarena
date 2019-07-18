import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Select from "react-select";
import Translate from "@components/Translator/Translate";
import EmptyCommercialOverview from "../components/EmptyScreens/EmptyCommercialOverview";
import RightsLegend from "../../main/components/RightsLegend";
import CommercialBidsTable from "../components/CommercialBidsTable";

class CmsCommercialOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			selectedListings: null,
			openBids: true,
			closedBids: true,
			declinedBids: false,
		};
	}

	componentDidMount() {
		const { property: { listings } } = this.props.propertyDetails;
		const { location: { pathname } } = this.props.history;
		const pathList = pathname.split("/");
		const customId = pathList[4];
		if (customId) {
			const selectedItem = listings.find(element => element.customId === customId);
			if (selectedItem) {
				const selectedListings = { value: selectedItem.customId, label: selectedItem.name };
				this.setState({
					selectedListings,
				});
			}
		}
	}

	onChangeSelect = (selectedItem) => {
		const { location: { pathname } } = this.props.history;
		const pathList = pathname.split("/");
		pathList[4] = selectedItem.value;
		this.props.history.push(`${pathList.join("/")}`);
		this.setState({ selectedListings: selectedItem });
	};

	onResetFilter = () => {
		const { location: { pathname } } = this.props.history;
		const pathList = pathname.split("/");
		pathList.splice(4, 1);
		this.props.history.push(`${pathList.join("/")}`);
		this.setState({ selectedListings: null });
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
		const { history, propertyId, propertyDetails: { property: { listings } } } = this.props;
		const {
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

		const allListings = selectedListings ? listings.filter(list => selectedListings.value === list.customId) : listings;

		const openBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "PENDING")
					.map(b => Object.assign({}, { list }, b)),
			)),
		);
		const closedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "APPROVED")
					.map(b => Object.assign({}, { list }, b)),
			)),
		);
		const declinedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "REJECTED")
					.map(b => Object.assign({}, { list }, b)),
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
										clearable={false}
										onChange={this.onChangeSelect}
										multi={false}
										value={selectedListings}
										options={listings.map(b => ({ value: b.customId, label: b.name }))}
									/>
									<div className="reset-listing-filter" onClick={this.onResetFilter}>
										<span><Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_SEARCH_CLEAR" /></span>
									</div>
								</div>
							</div>
						</div>
						<div className="split-filter">
							<div className="region-filter-title">
								{ <Translate i18nKey="CMS_RIGHT_LEGENDS_TITLE" />}
							</div>
							<RightsLegend isNew />
						</div>
					</div>
					<div className="region-filter-bids">
						<div className="region-filter-title toggle" onClick={openBidsList.length ? this.toggleOpenBids : null}>
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
						<div className="region-filter-title toggle" onClick={closedBidsList.length ? this.toggleClosedBids : null}>
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
						<div className="region-filter-title toggle" onClick={declinedBidsList.length ? this.toggleDeclinedBids : null}>
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
