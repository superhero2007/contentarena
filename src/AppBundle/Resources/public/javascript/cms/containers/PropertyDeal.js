import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import CmsStepSelector from "../components/CmsStepSelector";

class PropertyDeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: "",
			rights: "",
			territories: "",
		};
	}

	seasonsAreValid = () => {
		const { seasons } = this.state;
		return !!seasons.length;
	};

	rightsAreValid = () => {
		const { rights } = this.state;
		return !!rights.length;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	selectSeasons = (e) => {
		this.setState({ seasons: e.target.value, rights: "", territories: "" });
	};

	selectRights = (e) => {
		this.setState({ rights: e.target.value, territories: "" });
	};

	selectTerritories = (e) => {
		this.setState({ territories: e.target.value });
	};

	render() {
		const {
			seasons,
			rights,
			territories,
		} = this.state;
		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();

		return (
			<div className="default-container no-title property">
				<DefaultBox>
					<CmsStepSelector
						title={<Translate i18nKey="CMS_DEALS_STEP1_TITLE" />}
						button={<Translate i18nKey="CMS_DEALS_STEP1_BUTTON" />}
						enableNextStep={seasonsValid}
					>
						<input type="text" value={seasons} onChange={this.selectSeasons} />
					</CmsStepSelector>

					{seasonsValid && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP2_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP2_BUTTON" />}
							enableNextStep={rightsValid}
						>
							<input type="text" value={rights} onChange={this.selectRights} />
						</CmsStepSelector>
					)}

					{seasonsValid && rightsValid && (
						<CmsStepSelector
							title={<Translate i18nKey="CMS_DEALS_STEP3_TITLE" />}
							button={<Translate i18nKey="CMS_DEALS_STEP3_BUTTON" />}
							enableNextStep={territoriesValid}
						>
							<input type="text" value={territories} onChange={this.selectTerritories} />
						</CmsStepSelector>
					)}

					<HorizontalButtonBox>
						<button
							className="yellow-button"
							disabled={!seasonsValid || !rightsValid || !territoriesValid}
						>
							<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
						</button>
					</HorizontalButtonBox>
				</DefaultBox>
			</div>
		);
	}
}

PropertyDeal.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(PropertyDeal);
