import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader/Loader";
import CmsSeasonsFilter from "../components/CmsSeasonsFilter";
import EmptyFixture from "../components/EmptyScreens/EmptyFixture";
import FixtureList from "./FixturesList";
import FixtureForm from "../components/FixtureForm";
import api from "../../api";
import { fetchPropertySuccess, startFetchingPropertyDetails } from "../actions/propertyActions";
import { sortSeasons } from "../helpers/PropertyDetailsHelper";


class CmsFixtures extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			fixtures: [],
		};
	}

	componentDidMount() {}

	getSeasonSelected() {
		const { propertyFilters: { seasons }, property } = this.props;
		return (seasons.length) ? seasons[0] : property.seasons.length ? property.seasons[0] : null;
	}

	showCreateFixture = () => {
		this.setState({ create: true });
	};

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

		const { property } = this.props;
		const season = this.getSeasonSelected();
		const fixtures = season.fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));

		return (
			<section className="fixture-tab region-filter">
				<h5>
					<Translate i18nKey="CMS_FIXTURES_TITLE" />
				</h5>
				<h6>
					<Translate i18nKey="CMS_FIXTURES_DESCRIPTION" />
				</h6>

				{season && (
					<>
						<CmsSeasonsFilter property={property} singleOption />
						<div className="region-filter-title">
							<Translate i18nKey="CMS_FIXTURES" />
						</div>
						{season.fixtures.length > 0 && (
							<section className="fixture-item-wrapper no-border no-padding">
								<div className="fixture-item-round fixture-title">
									<Translate i18nKey="CMS_FIXTURES_TABLE_ROUND" />
								</div>
								<div className="fixture-item-name fixture-title">
									<Translate i18nKey="CMS_FIXTURES_TABLE_NAME" />
								</div>
								<div className="fixture-item-date fixture-title">
									<Translate i18nKey="CMS_FIXTURES_TABLE_DATE" />
								</div>
								<div className="fixture-item-time fixture-title">
									<Translate i18nKey="CMS_FIXTURES_TABLE_TIME" />
								</div>
								<div className="fixture-item-timezone fixture-title">
									<Translate i18nKey="CMS_FIXTURES_TABLE_TIME_ZONE" />
								</div>
								<div className="fixture-item-actions" />
							</section>
						)}

						{season.fixtures.length === 0 && (
							<Translate i18nKey="CMS_FIXTURES_NO_FIXTURES" />
						)}

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

				{!season && <EmptyFixture onCreate={this.showCreateFixture} />}

			</section>
		);
	}
}

CmsFixtures.contextTypes = {
	t: PropTypes.func.isRequired,
};

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
)(CmsFixtures);
