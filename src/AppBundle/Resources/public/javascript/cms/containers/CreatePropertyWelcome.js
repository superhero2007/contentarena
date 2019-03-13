import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { isMobileOnly, isTablet } from "react-device-detect";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { DefaultBox } from "../../common/components/Containers";
import { ROUTE_PATHS } from "@constants";
import { selectTournament } from "../actions/propertyActions";
import CmsSearchCompetition from "../components/CmsSearchCompetition";
import CmsSearchResults from "../components/CmsSearchResults";

class CreatePropertyWelcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	selectTournament = (tournament) => {
		const { history, selectTournament } = this.props;
		history.push(ROUTE_PATHS.CREATE_PROPERTY_STEP_1);
		if (tournament) {
			setTimeout(() => {
				selectTournament(tournament);
			}, 1000);
		}
	};

	onSearch = (results) => {
		this.setState({ results });
	};

	render() {
		const {
			results,
		} = this.state;

		return (
			<div className="default-container property">
				<div className="default-title-box">
					<h1 className={cn({ mobile: isMobileOnly, tablet: isTablet })}>
						<Translate i18nKey="CMS_WELCOME_MAIN_TITLE" />
					</h1>
					<h3 className={cn({ mobile: isMobileOnly, tablet: isTablet })}>
						<Translate i18nKey="CMS_WELCOME_MAIN_SUBTITLE" />
					</h3>

				</div>

				<DefaultBox>
					<h5 className="text-center"><Translate i18nKey="CMS_WELCOME_SEARCH_TITLE" /></h5>
					<h5 className="text-center property-welcome-subtitle"><Translate i18nKey="CMS_WELCOME_SEARCH_SUB_TITLE" /></h5>

					<CmsSearchCompetition
						onSearch={this.onSearch}
					/>

					{!results && (
						<p className="text-center">
							<Translate i18nKey="CMS_WELCOME_SEARCH_PHRASE_1" />{" "}
							<a href={ROUTE_PATHS.CREATE_PROPERTY_STEP_1}><Translate i18nKey="CMS_WELCOME_SEARCH_PHRASE_2" /></a>
						</p>
					)}
				</DefaultBox>
				{results && results.length > 0 && (
					<DefaultBox>
						<CmsSearchResults
							results={results}
							select={this.selectTournament}
						/>
					</DefaultBox>
				)}
			</div>
		);
	}
}

CreatePropertyWelcome.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	selectTournament: tournament => dispatch(selectTournament(tournament)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePropertyWelcome);
