import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsSeasonsFilter from "../components/CmsSeasonsFilter";
import EmptyFixture from "../components/EmptyScreens/EmptyFixture";
import FixtureList from "./FixturesList";
import FixtureForm from "../components/FixtureForm";


class CmsFixtures extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			create: false,
			fixtures: [],
		};
	}

	componentDidMount() {}

	showCreateFixture = () => {
		this.setState({ create: true });
	};

	onCreateFixture = (fixture) => {
		this.setState(prevState => ({
			fixtures: [...prevState.fixtures, fixture],
			create: false,
		}));
	};

	onUpdateFixture = (fixture, i) => {
		this.setState((prevState) => {
			const fixtures = [...prevState.fixtures];
			fixtures[i] = fixture;
			return {
				fixtures,
				create: false,
			};
		});
	};

	onRemoveFixture = (index) => {
		this.setState((prevState) => {
			const fixtures = [...prevState.fixtures];
			fixtures.splice(index, 1);
			return {
				fixtures,
			};
		});
	};

	render() {
		const {
			create,
			fixtures,
		} = this.state;

		const { property } = this.props;

		return (
			<section className="fixture-tab region-filter">
				<div className="region-filter-title">
					<Translate i18nKey="CMS_FIXTURES_TITLE" />
				</div>
				<div className="fixture-tab-description">
					<Translate i18nKey="CMS_FIXTURES_DESCRIPTION" />
				</div>
				<CmsSeasonsFilter property={property} />

				{
					property.seasons.length > 0
					&& (
						<>
							<div className="region-filter-title">
								<Translate i18nKey="CMS_FIXTURES" />
							</div>
							{
								fixtures.length === 0 && !create
								&& (
									<EmptyFixture onCreate={this.showCreateFixture} />
								)

							}

							{
								(fixtures.length > 0 || create)
								&& (
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
										<div className="fixture-item-actions" />
									</section>
								)
							}

							{
								fixtures.length > 0
								&& (
									<FixtureList
										fixtures={fixtures}
										onRemoveFixture={this.onRemoveFixture}
										onUpdateFixture={this.onUpdateFixture}
									/>
								)
							}

							{
								create
								&& (
									<FixtureForm onUpdate={this.onCreateFixture} />
								)
							}

							{
								!create && fixtures.length > 0
								&& (
									<div className="empty-property-tab">
										<a className="ca-btn primary" onClick={this.showCreateFixture}>
											<Translate i18nKey="CMS_EMPTY_FIXTURE_CREATE_FIXTURE" />
										</a>
									</div>
								)
							}
						</>
					)
				}

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

export default connect(
	mapStateToProps,
	null,
)(CmsFixtures);
