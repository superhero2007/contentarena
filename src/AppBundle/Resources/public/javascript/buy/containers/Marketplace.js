import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import first from "lodash/first";
import cn from "classnames";
import queryString from "query-string";
import moment from "moment";
import PropTypes from "prop-types";
import { test } from "../actions";
import EventFilter from "../components/EventFilter";
import RightsFilter from "../components/RightsFilter";
import SortByListing from "../components/ListingSorting";
import ContentListing from "../../main/components/ContentListing";
import ContentListingTable from "../../main/components/ContentListingTable";
import ListingDetails from "./ListingDetails";
import {
	addRight, clearUpdateFilter, removeRight, updateCountries, updateExclusive,
	updateMany, updateListingView, updateEvent, updateSport,
} from "../actions/filterActions";
import { CONTENT_LISTING_VIEW, LISTING_SORT_OPTIONS, SERVER_DATE_TIME_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import LocalStorageHelper from "../../main/utiles/localStorageHelper";
import Loader from "../../common/components/Loader";
import Pagination from "../../main/components/Pagination";
import { contentParserFromServer, serialize } from "../../common/utils/listing";
import localStorageEnums from "../../main/constants/localStorageEnums";
import { initGA, TrackingEvent } from "../../common/components/Tracking";
import api from "../../api";

class Marketplace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultRightsPackage: JSON.parse(props.rights),
			company: JSON.parse(props.company),
			loadingListing: false,
			loadingListingDetails: false,
			showDetails: false,
			listings: [],
			countries: [],
			territories: [],
			profile: props.user.profile,
			errorMessage: "",
			totalItems: 1,
			sortBy: LISTING_SORT_OPTIONS.PUBLISH_DATE,
		};
	}

	componentDidMount() {
		const { clearUpdateFilter, match, common } = this.props;

		if (match && match.params && match.params.customId) {
			this.selectListing(match.params.customId);
			return;
		}

		if (match && match.params && match.params.filterName) {
			switch (match.params.filterName) {
			case "sport":
				this.props.selectSport({
					value: match.params.filterValue,
					label: match.params.filterValue,
				});
				return;
			case "search":
				this.props.updateEvent(match.params.filterValue);
				return;
			case "territory":
				this.props.updateFilters({ countries: [match.params.filterValue] });
				return;
			case "multi":
				const customFilter = this.getQueryString();
				this.props.updateFilters(customFilter);
				return;

			default:
			}
		}
		initGA(common.gaTrackingId);
		this.clearRegisteringUserObj();
		this.filter();
		clearUpdateFilter();
	}

	componentWillReceiveProps(props) {
		const { filter, clearUpdateFilter } = props;

		this.setState({ sortSalesPackages: false });
		if (filter.forceUpdate) {
			this.filter();
			clearUpdateFilter();
		}
	}

	clearRegisteringUserObj = () => {
		let user = sessionStorage.getItem("registering_user");
		if (!user) return;

		sessionStorage.removeItem("registering_user");
		user = JSON.parse(user);

		if (user.fullName) TrackingEvent(`Register ${user.fullName}`, "Marketplace", user.fullName);
	};

	selectListing = (id) => {
		const { history } = this.props;

		const _this = this;
		if (id === _this.state.id) {
			_this.setState({
				showDetails: true,
			});

			return;
		}

		_this.setState({
			id,
			loadingListingDetails: true,
			showDetails: true,
		});

		ContentArena.ContentApi.getByCustomId(id)
			.done((content) => {
				_this.setState({
					content,
					loadingListingDetails: false,
				});
			})
			.fail((error) => {
				const data = error.data.responseJSON;

				if (data.code === 101) history.push("/marketplace");

				_this.setState({
					errorMessage: data.message,
					loadingListingDetails: false,
				});
			});
	};

	isEventTimeActive = () => {
		const { parsedFilter } = this.state;
		return parsedFilter.sortBy !== LISTING_SORT_OPTIONS.UPCOMING_EVENT;
	};

	getQueryString = () => queryString.parse(location.search, { arrayFormat: "index" });

	parseFilter = (filter, excludePage) => {
		const sports = LocalStorageHelper.getSportsSelected();
		const sportsFromStorage = sports ? sports.map(s => ({ name: s.value })) : null;
		const sportsFromProps = filter.sport ? filter.sport.map(s => ({ name: s.value })) : null;
		const exclusiveFromStorage = LocalStorageHelper.getExclusive();
		const rightsFromStorage = LocalStorageHelper.getRightsCheckboxSelected();
		const countriesFromStorage = LocalStorageHelper.getCountriesSelected();
		const allCountriesFromStorage = LocalStorageHelper.getAllCountries();
		const pageSize = LocalStorageHelper.getPageSize();
		const sortBy = LocalStorageHelper.getSortBy();

		const customFilter = this.getQueryString();

		const response = {
			rights: filter.rights.length ? filter.rights : rightsFromStorage,
			countries: countriesFromStorage || filter.countries,
		};

		if (!excludePage) {
			response.page = customFilter.page || 1;
		}

		if (pageSize) response.pageSize = pageSize;

		if (filter.event) response.event = filter.event;

		response.sortBy = sortBy || this.state.sortBy;

		if (exclusiveFromStorage || filter.exclusive) {
			response.exclusive = exclusiveFromStorage || filter.exclusive;
		}
		if (sportsFromStorage || sportsFromProps && first(sportsFromProps.name)) {
			response.sports = (sportsFromStorage || sportsFromProps).filter(s => s.name || s.value);
		}
		if (allCountriesFromStorage || filter.includeAllCountries) {
			response.includeAllCountries = allCountriesFromStorage || filter.includeAllCountries;
		}

		return response;
	};

	filter = () => {
		const { filter } = this.props;
		const parsedFilter = this.parseFilter(filter);
		this.fetchListings(parsedFilter);
		this.setState({
			parsedFilter,
			loadingListing: true,
		});
	};

	filterByRoute = () => {
		const { history } = this.props;
		const url = this.getFilterUrl(true);
		history.push(url);
	};

	selectPageSize = (pageSize) => {
		localStorage.setItem(localStorageEnums.PAGE_SIZE, pageSize);
		this.filterByRoute();
	};

	handleSortBy = (type) => {
		localStorage.setItem(localStorageEnums.SORT_BY, type);
		this.filterByRoute();
	};

	getFilterUrl = (excludePage) => {
		const { filter } = this.props;
		return `/marketplace/filter/multi?${serialize(this.parseFilter(filter, excludePage))}`;
	};

	goToListing = (customId) => {
		const { history } = this.props;
		history.push(`/listing/${customId}`);
	};

	setListingViewType = (type) => {
		localStorage.setItem(localStorageEnums.VIEW_MODE, type);
		this.props.updateListingView(type);
	};

	fetchListings = (filter) => {
		api.marketplace.fetchListings(filter)
			.then(({ data }) => {
				this.setState({
					listings: data.listings.map(listing => contentParserFromServer(listing)),
					totalItems: data.totalItems,
					sortSalesPackages: true,
				});
			})
			.catch(() => {
				console.log("fetch listings error")
			})
			.finally(() => {
				this.setState({ loadingListing: false });
			});
	};

	render() {
		const {
			filter,
			salesPackage,
			history,
			location,
			match,
			listingsData,
		} = this.props;

		const {
			loadingListingDetails,
			showDetails,
			content,
			company,
			sortSalesPackages,
			profile,
			errorMessage,
			defaultRightsPackage,
			parsedFilter,
			loadingListing,
			listings,
			totalItems,
		} = this.state;

		if (!parsedFilter) return null;

		if (errorMessage) {
			return <h2 className="text-center">{errorMessage}</h2>;
		}

		const customFilter = this.getQueryString();
		const listType = LocalStorageHelper.getViewMode() || filter.listType;

		return (
			<div
				className="manager-content"
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>

				{!showDetails && (
					<Fragment>
						<div className="buy-container-left">
							<EventFilter
								onFilter={this.filterByRoute}
							/>
							<RightsFilter
								onFilter={this.filterByRoute}
								rightsPackage={defaultRightsPackage}
								timeEventActive={this.isEventTimeActive()}
							/>
						</div>
						<div className="buy-container-right">

							<Loader loading={listings.length === 0 && loadingListing}>

								<div className="content-listing-header">
									<div className="content-listing-switcher">
										<button
											className={cn("content-view-tab", { selected: listType === CONTENT_LISTING_VIEW.LIST })}
											onClick={() => this.setListingViewType(CONTENT_LISTING_VIEW.LIST)}
										>
											<i className="fa fa-list-ul" />
										</button>
										<button
											className={cn("content-view-tab", { selected: listType === CONTENT_LISTING_VIEW.TABLE })}
											onClick={() => this.setListingViewType(CONTENT_LISTING_VIEW.TABLE)}
										>
											<i className="fa fa-th" />
										</button>
									</div>

									<SortByListing sortBy={parsedFilter.sortBy} onSelect={this.handleSortBy} />

									<div className="right-legend-wrapper">
										<RightsLegend />
									</div>
								</div>
								{listings.length > 0 && listType === CONTENT_LISTING_VIEW.TABLE && (
									<ContentListingTable
										listings={listings}
										history={history}
									/>
								)}
								{listings.length > 0 && listType === CONTENT_LISTING_VIEW.LIST && listings.map(listing => (
									<ContentListing
										onSelect={() => this.goToListing(listing.customId)}
										key={listing.customId}
										filter={filter}
										sortSalesPackages={sortSalesPackages}
										{...listing}
									/>
								))}

								{listings.length > 0 && (
									<Pagination
										page={Number(customFilter.page)}
										totalItems={totalItems}
										url={this.getFilterUrl(true)}
										pageSize={Number(parsedFilter.pageSize)}
										onSelectPageSize={this.selectPageSize}
									/>
								)}

								{listings.length === 0 && (
									<span className="no-results">{this.context.t("MARKETPLACE_NO_RESULTS")}</span>
								)}
							</Loader>
						</div>
					</Fragment>
				)}

				<Loader loading={loadingListingDetails}>
					{showDetails && (
						<ListingDetails
							key={location.pathname}
							tab={match.params.tab}
							bundles={match.params.bundles}
							history={history}
							onBack={() => {
								this.setState({ showDetails: false });
							}}
							salesPackage={salesPackage}
							company={company}
							profile={profile}
							listing={content}
						/>
					)
					}
				</Loader>
			</div>
		);
	}
}

Marketplace.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state,
	listingsData: state.marketplace.listingsData,
});

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
	selectSport: sport => dispatch(updateSport(sport)),
	updateEvent: event => dispatch(updateEvent(event)),
	clearUpdateFilter: () => dispatch(clearUpdateFilter()),
	addRight: id => dispatch(addRight(id)),
	removeRight: id => dispatch(removeRight(id)),
	updateCountries: countries => dispatch(updateCountries(countries)),
	updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
	updateFilters: filters => dispatch(updateMany(filters)),
	updateListingView: type => dispatch(updateListingView(type)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Marketplace);
