import React from "react";
import { connect } from "react-redux";
import Loader from "@components/Loader/Loader";
import FixtureList from "../containers/FixturesList";
import FixtureForm from "../components/FixtureForm";
import api from "../../api";
import { fetchPropertySuccess, startFetchingPropertyDetails } from "../actions/propertyActions";

class SeasonFixtures extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			fixtures: [],
		};
	}

	getSeasonSelected() {
		const { propertyFilters: { seasons }, property } = this.props;
		return (seasons.length) ? seasons[0] : property.seasons.length ? property.seasons[0] : null;
	}

	onCreateFixture = (fixture) => {
		const season = this.getSeasonSelected();
		const { property } = this.props;

		this.setState({ saving: true });

		api.fixtures.createFixture({
			seasonId: season.id,
			propertyId: property.id,
			fixture,

		})
			.then((response) => {
				this.props.startFetchingPropertyDetails();
				this.props.fetchPropertySuccess(response.data);
				this.setState({
					isSuccess: true,
					isFail: false,
				});
			})
			.catch(() => {
				this.setState({ isFail: true });
			})
			.finally(() => {
				this.setState({ saving: false });
			});
	};

	onEditFixture = (fixture) => {
		this.setState({
			selectedFixture: fixture,
		});
	};

	onUpdateFixture = (fixture) => {
		this.setState({ saving: true, selectedFixture: null });

		api.fixtures.updateFixture({ fixture }).then((response) => {
			this.props.startFetchingPropertyDetails();
			this.props.fetchPropertySuccess(response.data);
			this.setState({
				isSuccess: true,
				isFail: false,
			});
		})
			.catch(() => {
				this.setState({ isFail: true });
			})
			.finally(() => {
				this.setState({ saving: false });
			});
	};

	onRemoveFixture = (fixture) => {
		api.fixtures.removeFixture({ fixture }).then((response) => {
			this.props.startFetchingPropertyDetails();
			this.props.fetchPropertySuccess(response.data);
			this.forceUpdate();
			this.setState({
				isSuccess: true,
				isFail: false,
			});
		})
			.catch(() => {
				this.setState({ isFail: true });
			})
			.finally(() => {
				this.setState({ saving: false });
			});
	};

	render() {
		const {
			saving,
			selectedFixture,
		} = this.state;

		const { season, style } = this.props;
		const fixtures = season.fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));

		return (
			<section className="fixture-container" style={style}>
				{season && (
					<>
						{season.fixtures.length > 0 && (
							<FixtureList
								fixtures={fixtures}
								onRemoveFixture={this.onRemoveFixture}
								onEditFixture={this.onEditFixture}
							/>
						)}

						{saving && <Loader xSmall loading />}

						<FixtureForm
							onCreate={this.onCreateFixture}
							onUpdate={this.onUpdateFixture}
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
});

const mapDispatchToProps = dispatch => ({
	fetchPropertySuccess: property => dispatch(fetchPropertySuccess(property)),
	startFetchingPropertyDetails: () => dispatch(startFetchingPropertyDetails()),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SeasonFixtures);
