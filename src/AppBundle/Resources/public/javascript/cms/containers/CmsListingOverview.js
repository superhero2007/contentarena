import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { first } from "lodash";
import Translate from "@components/Translator/Translate";
import { RIGHT_TYPE } from "@constants";
import {
	ListingFilter, RegionFilter, SeasonFilter, TerritoryFilter,
} from "@components/Filters";
import FilterAccordionContainer from "@components/Containers/FilterAccordionContainer";
import EmptyListingOverview from "../components/EmptyScreens/EmptyListingOverview";
import CmsListingOverviewTable from "../components/CmsListingOverviewTable";
import CmsRightsLegend from "../components/CmsRightsLegend";
import CmsFilterBox from "../components/CmsFilterBox";
import { getFilteredListings, getFilteredTerritories } from "../reducers/property";
import {
	setCountries,
	setListings,
	setRegions, setSeasons, setStatus,
} from "../actions/propertyFiltersActions";
import { groupListingsByStatus } from "../helpers/PropertyDetailsHelper";
import { getUnifiedRegions } from "../helpers/PropertyHelper";

class CmsListingOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			statuses: [],
			selectedStatus: null,
			countries: [],
			includeAllCountries: false,
			seasons: [],
		};
	}

	componentDidMount() {
		const { property: { seasons } } = this.props;
		const { location: { search } } = this.props.history;
		if (search) {
			const params = search.replace("?", "").split("&");
			for (let i = 0; i < params.length; i++) {
				const key = params[i].split("=")[0];
				const values = params[i].split("=")[1].split(",");
				if (key === "status") {
					this.setState({ selectedStatus: { value: values[0], label: <Translate i18nKey={values[0]} key={values[0]} /> } });
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
		}
	}

	onSelectStatus = (selectedStatus) => {
		this.setState({ selectedStatus });
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
				selectedStatus, countries, includeAllCountries, seasons,
			} = this.state;
			const { location: { pathname } } = this.props.history;
			let search = [];
			if (selectedStatus) {
				search.push(`status=${selectedStatus.value}`);
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

	render() {
		const {
			listings,
			property,
			history,
			baseProperty,
			territories,
			propertyFilters,
		} = this.props;

		const listingsByStatus = groupListingsByStatus(listings);
		const unifiedTerritories = getUnifiedRegions(baseProperty.regions, baseProperty.territories);

		if (!property.listings.length) {
			return <EmptyListingOverview customId={property.customId} history={history} />;
		}

		return (
			<>
				<CmsRightsLegend type={RIGHT_TYPE.exclusive} />

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
					title={<Translate i18nKey="LISTING_STATUS_REJECTED_WITH_AMOUNT" params={{ n: listingsByStatus.rejected.length }} />}
					disabled={listingsByStatus.rejected.length === 0}
					opened
				>
					<CmsListingOverviewTable listings={listingsByStatus.rejected} propertyId={property.customId} />
				</FilterAccordionContainer>

				<FilterAccordionContainer
					title={<Translate i18nKey="LISTING_STATUS_SUBMITTED_WITH_AMOUNT" params={{ n: listingsByStatus.submitted.length }} />}
					disabled={listingsByStatus.submitted.length === 0}
				>
					<CmsListingOverviewTable listings={listingsByStatus.submitted} propertyId={property.customId} />
				</FilterAccordionContainer>

				<FilterAccordionContainer
					title={<Translate i18nKey="LISTING_STATUS_ACTIVE_WITH_AMOUNT" params={{ n: listingsByStatus.active.length }} />}
					disabled={listingsByStatus.active.length === 0}
				>
					<CmsListingOverviewTable listings={listingsByStatus.active} propertyId={property.customId} />
				</FilterAccordionContainer>

				<FilterAccordionContainer
					title={<Translate i18nKey="LISTING_STATUS_DRAFT_WITH_AMOUNT" params={{ n: listingsByStatus.draft.length }} />}
					disabled={listingsByStatus.draft.length === 0}
				>
					<CmsListingOverviewTable listings={listingsByStatus.draft} propertyId={property.customId} />
				</FilterAccordionContainer>

				<FilterAccordionContainer
					title={<Translate i18nKey="LISTING_STATUS_DEACTIVATED_WITH_AMOUNT" params={{ n: listingsByStatus.deactivated.length }} />}
					disabled={listingsByStatus.deactivated.length === 0}
				>
					<CmsListingOverviewTable listings={listingsByStatus.deactivated} propertyId={property.customId} />
				</FilterAccordionContainer>

				<FilterAccordionContainer
					title={<Translate i18nKey="LISTING_STATUS_ARCHIVED_WITH_AMOUNT" params={{ n: listingsByStatus.archived.length }} />}
					disabled={listingsByStatus.archived.length === 0}
				>
					<CmsListingOverviewTable listings={listingsByStatus.archived} propertyId={property.customId} />
				</FilterAccordionContainer>
			</>
		);
	}
}


const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	propertyFilters: state.propertyFilters,
	baseProperty: state.property,
	listings: getFilteredListings(state),
	territories: getFilteredTerritories(state),
});

const mapDispatchToProps = dispatch => ({
	setSeasons: seasons => dispatch(setSeasons(seasons)),
	setRegions: regions => dispatch(setRegions(regions)),
	setStatus: statuses => dispatch(setStatus(statuses)),
	setListings: listings => dispatch(setListings(listings)),
	setCountries: countries => dispatch(setCountries(countries)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsListingOverview);
