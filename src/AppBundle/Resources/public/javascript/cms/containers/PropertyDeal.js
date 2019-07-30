import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DefaultBox, HorizontalButtonBox } from "@components/Containers";
import Translate from "@components/Translator/Translate";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";
import CmsRightsSelector from "../components/CmsRightsSelector";
import CmsSeasonSelector from "../components/CmsSeasonSelector";
import CmsTerritorySelector from "../components/CmsTerritorySelector";

class PropertyDeal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSeasonApplicable: props.property.tournament.length,
			showCustomSeason: false,
			territories: [],
			territoriesMode: props.territoriesMode || BUNDLE_TERRITORIES_METHOD.WORLDWIDE,
		};
	}

	componentDidMount() {
		console.log(this.props.property);
	}

	componentWillReceiveProps(newProps) {
		console.log(newProps.property);
	}

	handleSeasonCheckbox = () => {
		this.setState(prevState => ({ isSeasonApplicable: !prevState.isSeasonApplicable }));
	};

	handleTerritories = (territories, territoriesMode) => {
		this.setState({ territories, territoriesMode });
	};

	rightsAreInvalid = () => {
		const { property } = this.props;
		const { rights } = property;

		return !rights.length || rights.filter(right => right.exclusive === null).length;
	};

	seasonsAreInvalid = () => {
		const { isSeasonApplicable } = this.state;
		const { property } = this.props;
		const { seasons } = property;

		return isSeasonApplicable && seasons.length === 0;
	};

	render() {
		const { isSeasonApplicable, territories, territoriesMode } = this.state;

		const {
			history,
			property,
		} = this.props;

		const {
			selectedRights,
			rights,
			tournament,
		} = property;
		console.log(this.props);

		const rightsInvalid = this.rightsAreInvalid();
		const seasonsInvalid = this.seasonsAreInvalid();

		return (
			<div className="default-container no-title property">
				<DefaultBox>
					<h4>
						<Translate i18nKey="CMS_CREATE_PROPERTY_TITLE" />
					</h4>
					<h6>
						<Translate i18nKey="CMS_CREATE_PROPERTY_DESCRIPTION" />
					</h6>

					{isSeasonApplicable && (
						<CmsSeasonSelector />
					)}

					<div className="season-checkbox">
						<input
							id="season-checkbox"
							type="checkbox"
							className="ca-checkbox blue"
							onClick={this.handleSeasonCheckbox}
							disabled={tournament.length === 0}
						/>
						<label htmlFor="season-checkbox">
							<Translate i18nKey="CMS_FORM_NOT_APPLICABLE" />
						</label>
					</div>
				</DefaultBox>
				<DefaultBox>
					<h4>
						<Translate i18nKey="CMS_SELECT_RIGHTS_TITLE" />
					</h4>
					<h6>
						<Translate i18nKey="CMS_SELECT_RIGHTS_DESCRIPTION" />
					</h6>
					<CmsRightsSelector />
				</DefaultBox>
				{selectedRights.length > 0 && (
					<DefaultBox>
						<h4>
							<Translate i18nKey="CMS_SELECT_TERRITORIES_TITLE" />
						</h4>
						<h6>
							<Translate i18nKey="CMS_SELECT_TERRITORIES_DESCRIPTION" />
						</h6>

						<CmsTerritorySelector
							className="small-select"
							onChange={this.handleTerritories}
							onSelectRegion={() => { }}
							value={territories}
							territoriesMode={territoriesMode}
							multiple
							filter={[]}
							selectedRights={selectedRights}
							exclusiveSoldTerritories={false}
						/>
					</DefaultBox>
				)
				}
				<HorizontalButtonBox>
					<button
						className="yellow-button"
						disabled={rightsInvalid || seasonsInvalid}
					>
						<Translate i18nKey="CMS_CREATE_PROPERTY_CONTINUE_BUTTON" />
					</button>
				</HorizontalButtonBox>
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
