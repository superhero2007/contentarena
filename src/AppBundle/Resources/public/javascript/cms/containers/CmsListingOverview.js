import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { first, uniqBy } from "lodash";
import Translate from "@components/Translator/Translate";
import { CMS_STATUS, RIGHT_TYPE } from "@constants";
import { SeasonFilter } from "@components/Filters";
import EmptyListingOverview from "../components/EmptyScreens/EmptyListingOverview";
import CmsListingOverviewTable from "../components/CmsListingOverviewTable";
import CmsRightsLegend from "../components/CmsRightsLegend";
import CmsFilterBox from "../components/CmsFilterBox";
import { getFilteredListings } from "../reducers/property";
import {
	setRegions, setRights, setSeasons, setStatus,
} from "../actions/propertyFiltersActions";

class CmsListingOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			statuses: [
				CMS_STATUS.CMS_STATUS_REJECTED,
				CMS_STATUS.CMS_STATUS_DRAFT,
				CMS_STATUS.CMS_STATUS_SUBMITTED,
				CMS_STATUS.CMS_STATUS_ACTIVE,
				CMS_STATUS.CMS_STATUS_INACTIVE,
			],
			selectedStatus: null,
			countries: [],
			includeAllCountries: false,
			seasons: [],
		};
	}

	componentDidMount() {
		const { property: { seasons } } = this.props;
		const { location: { search } } = this.props.history;
		// const statuses = uniqBy(listings.map(list => list.status.name));
		// this.setState({ statuses });
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
			propertyFilters,
		} = this.props;

		const {
			selectedStatus,
			statuses,
			countries,
			includeAllCountries,
			seasons,
		} = this.state;
		if (!property.listings.length) {
			return (
				<section className="listing-overview-tab">
					<EmptyListingOverview customId={property.customId} />
				</section>
			);
		}

		let selectedStatusValue = [];
		if (selectedStatus) {
			switch (selectedStatus.value) {
			case CMS_STATUS.CMS_STATUS_REJECTED:
				selectedStatusValue = ["REJECTED"];
				break;
			case CMS_STATUS.CMS_STATUS_DRAFT:
				selectedStatusValue = ["DRAFT", "AUTO_INACTIVE"];
				break;
			case CMS_STATUS.CMS_STATUS_SUBMITTED:
				selectedStatusValue = ["PENDING"];
				break;
			case CMS_STATUS.CMS_STATUS_ACTIVE:
				selectedStatusValue = ["APPROVED", "EDITED"];
				break;
			case CMS_STATUS.CMS_STATUS_INACTIVE:
				selectedStatusValue = ["INACTIVE", "EXPIRED", "SOLD_OUT"];
				break;
			default:
				selectedStatusValue = [];
			}
		}

		return (
			<>
				<CmsRightsLegend type={RIGHT_TYPE.exclusive} />

				<CmsFilterBox open>
					<SeasonFilter
						options={property.seasons}
						value={propertyFilters.seasons}
						onChange={this.props.setSeasons}
					/>
				</CmsFilterBox>
				<CmsListingOverviewTable listings={listings} propertyId={property.customId} />
			</>
		);
	}
}


const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	propertyFilters: state.propertyFilters,
	listings: getFilteredListings(state),
});

const mapDispatchToProps = dispatch => ({
	setSeasons: seasons => dispatch(setSeasons(seasons)),
	setRights: rights => dispatch(setRights(rights)),
	setRegions: regions => dispatch(setRegions(regions)),
	setStatus: statuses => dispatch(setStatus(statuses)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsListingOverview);
