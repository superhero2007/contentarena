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
			season: props.season || {
				fixtures: [],
			},
		};
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

	onEditFixture = (selectedFixture) => {
		this.setState({ selectedFixture });
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

		const { style, season } = this.props;

		return (
			<section className="fixture-container" style={style}>
				{season && (
					<>
						{season.fixtures.length > 0 && (
							<FixtureList
								season={season}
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
