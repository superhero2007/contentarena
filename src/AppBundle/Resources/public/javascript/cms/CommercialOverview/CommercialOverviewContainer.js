import React from "react";
import { connect } from "react-redux";
import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import { RIGHT_TYPE } from "@constants";
import {
	ListingFilter, RegionFilter, SeasonFilter, TerritoryFilter,
} from "@components/Filters";
import FilterAccordionContainer from "@components/Containers/FilterAccordionContainer";
import EmptyCommercialOverview from "./EmptyCommercialOverview";
import CommercialBidsTable from "./CommercialBidsTable";
import { fetchPropertyDetails } from "../actions/propertyActions";
import CmsRightsLegend from "../components/CmsRightsLegend";
import CmsFilterBox from "../components/CmsFilterBox";
import {
	setCountries, setListings, setRegions, setSeasons, setStatus,
} from "../actions/propertyFiltersActions";
import {
	getFilteredListings,
	getFilteredRights,
	getFilteredSeasons,
	getFilteredTerritories,
} from "../reducers/property";
import { getUnifiedRegions } from "../helpers/PropertyHelper";
import CommercialDealsTable from "./CommercialDealsTable";

class CommercialOverviewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listings: [],
			selectedListings: null,
			openBids: true,
			closedBids: true,
			declinedBids: false,
			countries: [],
			includeAllCountries: false,
			allSeasons: [],
			seasons: [],
		};
	}

	componentDidMount() {
		this.updateData();
	}

	componentWillReceiveProps(newProps) {
		this.updateData(newProps);
	}

	updateData = (newProps) => {
		const props = newProps || this.props;
		const { property: { listings, seasons } } = props;
		this.setState({ listings, allSeasons: seasons });
		const { location: { search } } = props.history;
		if (search) {
			this.setState({ loading: true });
			const params = search.replace("?", "").split("&");
			for (let i = 0; i < params.length; i++) {
				const key = params[i].split("=")[0];
				const values = params[i].split("=")[1].split(",");
				if (key === "customId") {
					const selectedItem = listings.find(element => values.indexOf(element.customId) !== -1);
					if (selectedItem) {
						const selectedListings = { value: selectedItem.customId, label: selectedItem.name };
						this.setState({
							selectedListings,
						});
					}
				}
				if (key === "country") {
					this.setState({ countries: values });
				}
				if (key === "season") {
					const selectedSeasons = values
						.map((value) => {
							const selectedSeason = seasons.find(season => season.id === parseInt(value, 10));
							if (selectedSeason) {
								return { value: selectedSeason.id, label: selectedSeason.name };
							}
							return null;
						}).filter(value => value);
					this.setState({ seasons: selectedSeasons });
				}
				if (key === "include") {
					this.setState({ includeAllCountries: true });
				}
			}
			this.setState({ loading: false });
		}
	};

	onSelectListing = (selectedItem) => {
		this.setState({ selectedListings: selectedItem });
		this.onApplyFilter();
	};


	selectTerritory = (selectedCountry) => {
		selectedCountry = first(selectedCountry) ? selectedCountry : [];
		const countries = selectedCountry.map(c => c.value);
		this.setState({ countries });
		this.onApplyFilter();
	};

	updateIncludedCountries = (includeAllCountries) => {
		this.setState({ includeAllCountries });
		this.onApplyFilter();
	};

	selectSeasons = (seasons) => {
		seasons = first(seasons) ? seasons : [];
		this.setState({ seasons });
		this.onApplyFilter();
	};

	onApplyFilter = () => {
		setTimeout(() => {
			const {
				selectedListings, countries, includeAllCountries, seasons,
			} = this.state;
			const { location: { pathname } } = this.props.history;
			let search = [];
			if (selectedListings) {
				search.push(`customId=${selectedListings.value}`);
			}
			if (seasons.length) {
				search.push(`season=${seasons.map(element => element.value).join(",")}`);
			}
			if (countries.length) {
				search.push(`country=${countries.join(",")}`);
			}
			if (includeAllCountries) {
				search.push("include=true");
			}
			if (search.length) {
				search = `?${search.join("&")}`;
			}
			this.props.history.push(`${pathname}${search}`);
		}, 1);
	};

	onPostAction = () => {
		const { propertyId } = this.props;
		this.props.getPropertyDetails(propertyId);
	};

	render() {
		const {
			history,
			propertyId,
			propertyFilters,
			property,
			baseProperty,
			territories,
			listings,
		} = this.props;
		const {
			selectedListings,
			seasons,
		} = this.state;

		const unifiedTerritories = getUnifiedRegions(baseProperty.regions, baseProperty.territories);

		if (!property.listings.length && !property.deals.length) {
			return <EmptyCommercialOverview history={history} propertyId={propertyId} />;
		}

		let allListings = listings;
		if (selectedListings) {
			allListings = allListings.filter(list => selectedListings.value === list.customId);
		}

		if (seasons.length) {
			allListings = allListings.filter((list) => {
				const selectedSeasons = list.seasons.filter(season => seasons.find(b => b.value === season.id));
      	return selectedSeasons.length;
			});
		}

		const openBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "PENDING")
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


		const closedDeals = property.deals.filter(deal => deal.status === "CLOSED");

		return (
			<section className="commercial-overview-tab">
				<div className="region-filter">

					<CmsRightsLegend
						type={RIGHT_TYPE.rights}
						open
					/>

					<CmsFilterBox open>
						<ListingFilter
							options={property.listings}
							value={propertyFilters.listings}
							onChange={this.props.setListings}
						/>

						<SeasonFilter
							options={property.seasons}
							value={propertyFilters.seasons}
							onChange={this.props.setSeasons}
						/>

						<RegionFilter
							options={unifiedTerritories}
							value={propertyFilters.regions}
							onChange={this.props.setRegions}
						/>

						<TerritoryFilter
							options={territories}
							value={propertyFilters.countries}
							onChange={this.props.setCountries}
						/>
					</CmsFilterBox>

					<FilterAccordionContainer
						title={<Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_OPEN_BIDS" params={{ n: openBidsList.length }} />}
						disabled={openBidsList.length === 0}
						opened
					>
						<CommercialBidsTable
							listings={openBidsList}
							type="openBids"
							postAction={this.onPostAction}
						/>
					</FilterAccordionContainer>

					<FilterAccordionContainer
						title={<Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_CLOSED_DEALS" params={{ n: closedDeals.length }} />}
						disabled={closedDeals.length === 0}
					>
						<CommercialDealsTable
							deals={closedDeals}
							type="closedBids"
						/>
					</FilterAccordionContainer>

					<FilterAccordionContainer
						title={<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_REJECTED" params={{ n: declinedBidsList.length }} />}
						disabled={declinedBidsList.length === 0}
					>
						<CommercialBidsTable
							listings={declinedBidsList}
							type="declinedBids"
						/>
					</FilterAccordionContainer>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
	baseProperty: state.property,
	listings: getFilteredListings(state),
	territories: getFilteredTerritories(state),
});

const mapDispatchToProps = dispatch => ({
	getPropertyDetails: id => dispatch(fetchPropertyDetails(id)),
	setSeasons: seasons => dispatch(setSeasons(seasons)),
	setListings: listings => dispatch(setListings(listings)),
	setRegions: regions => dispatch(setRegions(regions)),
	setCountries: countries => dispatch(setCountries(countries)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CommercialOverviewContainer);
