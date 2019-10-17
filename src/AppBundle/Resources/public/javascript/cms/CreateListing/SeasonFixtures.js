import React from "react";
import { connect } from "react-redux";
import Loader from "@components/Loader/Loader";
import FixtureList from "../containers/FixturesList";
import FixtureForm from "../components/FixtureForm";
import api from "../../api";
import { fetchPropertySuccess, startFetchingPropertyDetails } from "../actions/propertyActions";
import { updateListing } from "../actions/propertyListingActions";

class SeasonFixtures extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			season: props.season || {
				fixtures: [],
			},
			listingSeason: props.listingSeason,
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ listingSeason: nextProps.listingSeason });
	}

	onCreateFixture = (fixture) => {
		const { property, season } = this.props;

		this.setState({ saving: true });

		api.fixtures.createFixture({
			seasonId: season.id,
			propertyId: property.id,
			fixture,
		})
			.then((response) => {
				this.props.fetchPropertySuccess(response.data);
				this.setState({
					isSuccess: true,
					isFail: false,
				});
			})
			.catch(() => this.setState({ isFail: true }))
			.finally(() => this.setState({ saving: false }));
	};

	onUpdateFixture = (fixture) => {
		this.setState({ saving: true, selectedFixture: null, editMode: true });

		api.fixtures.updateFixture({ fixture }).then((response) => {
			this.setState({
				isSuccess: true,
				isFail: false,
				editMode: false,
			}, () => {
				this.props.fetchPropertySuccess(response.data);
			});
		})
			.catch(() => this.setState({ isFail: true }))
			.finally(() => this.setState({ saving: false }));
	};

	onRemoveFixture = (fixture) => {
		api.fixtures.removeFixture({ fixture }).then((response) => {
			this.props.fetchPropertySuccess(response.data);
			this.setState({
				isSuccess: true,
				isFail: false,
			});
		})
			.catch(() => this.setState({ isFail: true }))
			.finally(() => this.setState({ saving: false }));
	};

	onSelectFixture = (fixture) => {
		const { listingSeason } = this.state;

		const selectedFixture = listingSeason.fixtures.find(f => f.externalId === fixture.externalId);
		if (!selectedFixture) {
			listingSeason.fixtures.push(fixture);
		}

		this.setState({ listingSeason });
		this.props.onUpdateSeason(listingSeason);
	};

	onUnselectFixture = (fixture) => {
		const { listingSeason } = this.state;
		listingSeason.fixtures = listingSeason.fixtures.filter(f => f.externalId !== fixture.externalId);
		this.setState({ listingSeason });
		this.props.onUpdateSeason(listingSeason);
	};

	render() {
		const {
			saving,
			selectedFixture,
			listingSeason,
		} = this.state;

		const { style, season } = this.props;

		return (
			<section className="fixture-container" style={style}>
				{season && (
					<>
						{season.fixtures.length > 0 && (
							<FixtureList
								season={season}
								listingSeason={listingSeason}
								onRemoveFixture={this.onRemoveFixture}
								onSelectFixture={this.onSelectFixture}
								onUnselectFixture={this.onUnselectFixture}
								onUpdateFixture={this.onUpdateFixture}
							/>
						)}

						<FixtureForm
							saving={saving}
							onCreate={this.onCreateFixture}
							fixture={selectedFixture}
						/>
					</>
				)}

			</section>
		);
	}
}

const mapStateToProps = state => ({
	common: state.common,
	propertyFilters: state.propertyFilters,
	property: state.propertyDetails.property,
	listing: state.propertyListing,
});

const mapDispatchToProps = dispatch => ({
	fetchPropertySuccess: property => dispatch(fetchPropertySuccess(property)),
	startFetchingPropertyDetails: () => dispatch(startFetchingPropertyDetails()),
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SeasonFixtures);
