import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ReactTable from "react-table";
import Select from "react-select";
import Translate from "@components/Translator/Translate";
import EmptyCommercialOverview from "../components/EmptyScreens/EmptyCommercialOverview";
import {
	cancelIcon,
	checkIcon,
	exclusiveRightAvailable,
	nonExclusiveRightAvailable,
	exclusiveRightOffered,
	nonExclusiveRightOffered,
	exclusiveRightSold,
	nonExclusiveRightSold,
} from "../../main/components/Icons";
import CommercialSalesBundle from "../../main/components/CommercialSalesBundle";

class CmsCommercialOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listings: [],
			selectedListings: [],
			filter: "ALL",
		};
		this.bulletIcon = `${assetsBaseDir}app/images/bullet.png`;
		this.activeBulletIcon = `${assetsBaseDir}app/images/radio-active.png`;
		this.reloadIcon = `${assetsBaseDir}app/images/reload.png`;
	}

	componentDidMount() {
		const { match } = this.props;

		let params;
		let filter;
		const
			listings = [];

		if (match && match.params && match.params.filterName) {
			params = match.params.filterName.split("&");

			if (params.length > 1) {
				listings.push(params[0]);
				filter = params[1];
			} else if (params[0].length === 5) {
				listings.push(params[0]);
				filter = "ALL";
			} else {
				filter = params[0];
			}

			this.setState({
				filter,
				selectedListings: listings,
			});
		}

		this.update(true);
	}

	update = () => {
		this.setState({ loading: true });

		ContentArena.ContentApi.getAllDeals().done((listings) => {
			listings.forEach(l => ContentArena.Utils.contentParserFromServer(l));

			const openBids = listings.filter(b => b.salesPackages.filter(sp => sp.bids.filter(b => b.status.name === "PENDING").length > 0).length > 0);

			if (openBids.length > 0) this.openBidsCallback();

			this.setState({ listings, loading: false });
		});
	};

	openBidsCallback = () => {
		const { selectedListings } = this.state;
		const filterString = (selectedListings.length > 0) ? `${selectedListings[0]}&` : "";
		// this.props.history.push(`/commercialoverview/filter/${filterString}openbids`);
	};

	renderRightHeader = right => (
		<div className="d-flex justify-content-center">
			<span>
				{right.shortLabel}
			</span>
		</div>
	);

	renderRightCell = (right) => {
		const rightIcons = {
			exclusive_right_available: exclusiveRightAvailable,
			non_exclusive_right_available: nonExclusiveRightAvailable,
			exclusive_right_offered: exclusiveRightOffered,
			non_exclusive_right_offered: nonExclusiveRightOffered,
			exclusive_right_sold: exclusiveRightSold,
			non_exclusive_right_sold: nonExclusiveRightSold,
		};
		return (
			<div className="d-flex justify-content-center">
				<img src={rightIcons[right.exclusive]} alt="" />
			</div>
		);
	};

	getColumns = () => {
		// const { common: { defaultRightsPackage } } = this.props;
		const rights = [
			{
				id: 1,
				name: "Live Transmission",
				shortLabel: "LT",
				exclusive: "exclusive_right_available",
			},
			{
				id: 2,
				name: "Delayed & Archive",
				shortLabel: "DT",
				exclusive: "non_exclusive_right_available",
			},
			{
				id: 3,
				name: "Live Betting",
				shortLabel: "LB",
				exclusive: "exclusive_right_offered",
			},
			{
				id: 5,
				name: "News Access",
				shortLabel: "NA",
				exclusive: "non_exclusive_right_offered",
			},
			{
				id: 6,
				name: "Highlights & Clips",
				shortLabel: "HL",
				exclusive: "exclusive_right_sold",
			},
			{
				id: 8,
				name: "Edited Program",
				shortLabel: "PR",
				exclusive: "non_exclusive_right_sold",
			},
		];
		const columns = [];

		columns.push({
			Header: "ID",
			accessor: "id",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LISTING" />,
			accessor: "listing",
		});

		rights.forEach((right) => {
			columns.push({
				headerClassName: "season-header-column",
				Header: () => this.renderRightHeader(right),
				Cell: () => this.renderRightCell(right),
				maxWidth: 40,
			});
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_TERRITORY" />,
			accessor: "territories",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LICENSE" />,
			accessor: "license",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_FEE" />,
			accessor: "fee",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_DATE" />,
			accessor: "date",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_USER" />,
			accessor: "user",
		});

		columns.push({
			Header: <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_ACTION" />,
			Cell: () => (
				<div className="d-flex justify-content-center">
					<img src={checkIcon} alt="" />
					<img src={cancelIcon} alt="" />
				</div>
			),
			maxWidth: 70,
		});

		return columns;
	};

	onChangeSelect = (selectedItem) => {
		const { history } = this.props;
		const { filter } = this.state;
		const filterString = (filter !== "ALL") ? (selectedItem) ? `&${filter}` : filter : "";
		const idString = selectedItem ? selectedItem.value : "";
		const prefix = (!selectedItem && filter === "ALL") ? "" : "/filter/";
		history.push(`/commercialoverview${prefix}${idString}${filterString}`);
	};

	sortSalesPackages = (a, b) => {
		const aOpen = a.bids.filter(bid => bid.status.name === "PENDING").length > 0;
		const bOpen = b.bids.filter(bid => bid.status.name === "PENDING").length > 0;
		const aClosed = a.bids.filter(bid => bid.status.name === "APPROVED").length > 0;
		const bClosed = b.bids.filter(bid => bid.status.name === "APPROVED").length > 0;
		const aWorldwide = a.territoriesMethod === "WORLDWIDE";
		const bWorldwide = b.territoriesMethod === "WORLDWIDE";

		const open = (!aOpen && bOpen) ? 1 : ((!bOpen && aOpen) ? -1 : 0);
		const closed = (!aClosed && bClosed) ? 1 : ((!bClosed && aClosed) ? -1 : 0);
		const worldwide = (!aWorldwide && bWorldwide) ? 1 : ((!bWorldwide && aWorldwide) ? -1 : 0);

		return open || closed || worldwide || this.compareProperty(b.territories.length, a.territories.length)
			|| this.compareProperty(b.name, a.name);
	};

	compareProperty = (a, b) => ((a > b) ? 1 : ((b > a) ? -1 : 0));

	filtered = () => {
		const { filter, selectedListings } = this.state;

		const { listings = [] } = this.state;
		if (selectedListings.length > 0) {
			return this.state.listings.filter(b => selectedListings.includes(b.customId));
		}

		switch (filter) {
		  case "closeddeals":
		  	return listings.filter(b => b.salesPackages.filter(sp => sp.bids.filter(b => b.status.name === "APPROVED").length > 0).length > 0);
		  case "openbids":
		  	return listings.filter(b => b.salesPackages.filter(sp => sp.bids.filter(b => b.status.name === "PENDING").length > 0).length > 0);
		  case "withactivity":
		  	return listings.filter(b => b.salesPackages.filter(sp => sp.bids.length > 0).length > 0);
		  case "ALL":
		  	return listings;
		  default:
		  	return listings;
		}
	};

	render() {
		const data = [
			{
				id: "#4HLOM",
				listing: "Soccer - Bundesliga - Season 2019/20 - New access",
				territories: "Germany",
				license: "Hogmore Media AG",
				fee: "$10.000",
				date: "12-10-2019",
				user: "Feliz Hubertus Muller",
			},
		];
		const { selectedListings } = this.state;
		const listings = this.filtered();
		const allListings = this.state.listings;
		return (
			<section className="commercial-overview-tab">
				<div className="region-filter">
					<div className="d-flex">
						<div className="split-filter">
							<div className="region-filter-title">
								{ <Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />}
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
										options={allListings.map(b => ({ value: b.customId, label: b.name }))}
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
				</div>

				{listings.length > 0 && listings.map((listing, i, list) => {
					const bidsOpen = list.length === 1 || this.state.filter !== "ALL";
					const showSalesPackage = list.length === 1 || this.state.filter !== "ALL";
					const hideWithoutBids = this.state.filter === "withactivity";
					const filterByOpenBids = this.state.filter === "openbids";
					const filterByClosedDeals = this.state.filter === "closeddeals";
					const salesPackages = listing.salesPackages.sort(this.sortSalesPackages);
					return showSalesPackage && salesPackages.map((sb, i) => {
						const closed = sb.bids.filter(b => b.status.name === "APPROVED");
						const open = sb.bids.filter(b => b.status.name === "PENDING");

						if (hideWithoutBids && sb.bids.length === 0) return;
						if (filterByOpenBids && open.length === 0) return;
						if (filterByClosedDeals && closed.length === 0) return;
						return (
							<CommercialSalesBundle
								onUpdate={this.update}
								onDelete={this.deleteBid}
								onApprove={this.approve}
								salesBundle={sb}
								bidsOpen={bidsOpen}
								company={listing.company}
								contentId={listing.id}
								listingCustomId={listing.customId}
								key={i}
							/>
						);
					});
				})}

				{/* <EmptyCommercialOverview history={history} propertyId={propertyId} /> */}

				{
					data.length > 0
					&& (
						<ReactTable
							showPagination={false}
							showPageSizeOptions={false}
							resizable={false}
							collapseOnPageChange={false}
							collapseOnDataChange={false}
							minRows={0}
							data={data}
							select={this.props.select}
							className="ca-table"
							columns={this.getColumns()}
							sorted={[{
								id: "name",
								desc: false,
							}]}
						/>
					)
				}

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
