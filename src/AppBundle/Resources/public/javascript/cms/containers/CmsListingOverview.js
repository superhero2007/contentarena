import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { first, uniqBy } from "lodash";
import Translate from "@components/Translator/Translate";
import EmptyListingOverview from "../components/EmptyScreens/EmptyListingOverview";
import CmsListingOverviewTable from "../components/CmsListingOverviewTable";
import TerritoryFilter from "../../main/components/TerritoryFilter";
import SeasonFilter from "../../main/components/SeasonFilter";
import CmsRightsLegend from "../components/CmsRightsLegend";

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
		const { property: { listings, seasons } } = this.props;
		const { location: { search } } = this.props.history;
		const statuses = uniqBy(listings.map(list => list.status.name));
		this.setState({ statuses });
		if (search) {
			const params = search.replace("?", "").split("&");
			for (let i = 0; i < params.length; i++) {
				const key = params[i].split("=")[0];
				const values = params[i].split("=")[1].split(",");
				if (key === "status") {
					this.setState({ selectedStatus: { value: values[0], label: values[0] } });
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
		const { listings, seasons: allSeasons, customId } = this.props.property;
		const {
			selectedStatus,
			statuses,
			countries,
			includeAllCountries,
			seasons,
		} = this.state;
		if (!listings.length) {
			return (
				<section className="listing-overview-tab">
					<EmptyListingOverview />
				</section>
			);
		}

		let allListings = listings;
		if (selectedStatus) {
			allListings = allListings.filter(list => list.status.name === selectedStatus.value);
		}

		if (seasons.length) {
			allListings = allListings.filter((list) => {
				const selectedSeasons = list.seasons.filter(season => seasons.find(b => b.value === season.id));
				return selectedSeasons.length;
			});
		}

		if (countries.length) {
			allListings = allListings.filter((b) => {
				let totalTerritories = [].concat(...b.salesPackages.map(element => element.territories));
				totalTerritories = uniqBy(totalTerritories, value => value.id);
				const territories = totalTerritories.filter(territory => countries.indexOf(territory.name) !== -1);
				return totalTerritories.length > 0 && (includeAllCountries && totalTerritories.length === territories.length || !includeAllCountries && territories.length);
			});
		}

		return (
			<section className="listing-overview-tab">
				<div className="region-filter">
					<h5>
						<Translate i18nKey="CMS_PROPERTY_TAB_LISTING" />
					</h5>
					<h6>
						<Translate i18nKey="CMS_LISTING_SUBTITLE" />
					</h6>
					<div className="d-flex">
						<div className="split-filter" style={{ width: "100%" }}>

							<div className="manager-filter-container">
								<div className="listing-filter">
									<Select
										name="form-field-name"
										placeholder={this.context.t("STATUS_FILTER_SEARCH_PLACEHOLDER")}
										clearable
										onChange={this.onSelectStatus}
										multi={false}
										value={selectedStatus}
										options={statuses.map(b => ({ value: b, label: b }))}
									/>
								</div>

								<TerritoryFilter
									className="listing-filter territories-filter"
									countries={countries}
									includeAllCountries={includeAllCountries}
									selectTerritory={this.selectTerritory}
									updateIncludedCountries={this.updateIncludedCountries}
								/>

								{allSeasons && allSeasons.length > 1 && (
									<SeasonFilter
										className="listing-filter territories-filter"
										allSeasons={allSeasons}
										seasons={seasons}
										selectSeasons={this.selectSeasons}
									/>
								)}
							</div>
						</div>
					</div>
					<div className="d-flex">
						<CmsRightsLegend />
					</div>
					<div className="region-filter-bids">
						<div className="region-filter-content">
							<CmsListingOverviewTable listings={allListings} propertyId={customId} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

CmsListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsListingOverview);
