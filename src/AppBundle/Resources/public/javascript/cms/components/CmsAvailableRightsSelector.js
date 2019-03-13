import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { updateContentValue } from "../../sell/actions/contentActions";
import { setSelectedRights } from "../actions/propertyActions";
import { cmsWorldActive, cmsWorldDisabled } from "../../main/components/Icons";
import { BUNDLE_TERRITORIES_METHOD } from "../../common/constants";

class CmsAvailableRightsSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rights: this.getRightsFromProps(this.getEditableRights()),
			selectedRights: this.getRightsFromProps(props.rights),
			allSelected: true,
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
		};
		this.props.rightsUpdated(this.getEditableRights());
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedRights: this.getRightsFromProps(nextProps.selectedRights),
			allSelected: nextProps.rights.length === nextProps.selectedRights.length,
		});
	}

	getRightsFromProps = rights => new Map(rights.map(rightItem => [rightItem.code, rightItem]));

	getRightsForProps = rights => [...rights.values()];

	getEditableRights = () => this.props.rights.filter(right => !right.edited);

	addRight = (right) => {
		const { selectedRights } = this.state;

		if (!selectedRights.has(right.code)) {
			selectedRights.set(right.code, {
				...right,
			});
		}
		this.props.rightsUpdated(this.getRightsForProps(selectedRights));
	};

	removeRight = (right) => {
		const { selectedRights } = this.state;

		if (selectedRights.has(right.code)) {
			selectedRights.delete(right.code);
		}
		this.props.rightsUpdated(this.getRightsForProps(selectedRights));
	};

	isCheckBoxChecked = (code) => {
		const { selectedRights } = this.state;
		return selectedRights.has(code);
	};

	getRadioBoxValue = (code) => {
		const { rights } = this.state;
		const right = rights.get(code);
		return right && right.exclusive || false;
	};

	render() {
		const {
			rights, onUndoTerritories, onEditTerritories,
		} = this.props;

		return (
			<div className="right-selector">
				<div className="right-selector-item full-width">
					<div className="right-name">
						<label className={cn({ selected: false })}>
							<Translate i18nKey="CMS_RIGHT_SELECTOR_ALL" />
						</label>
					</div>
					<div className="right-exclusivity">
						<label>
							<Translate i18nKey="CMS_RIGHT_SELECTION_EXCLUSIVITY" />
						</label>
					</div>
					<div className="right-territories">
						<label><Translate i18nKey="LISTING_PREVIEW_RIGHTS_TITLE" /></label>
					</div>
				</div>
				{
					rights.map((right, i) => {
						const {
							name, code, edited,
						} = right;
						const idAttr = `checkbox-${code}`;
						const { offers } = this.state;
						const offerValue = this.getRadioBoxValue(code) ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE;
						return (
							<div className="right-selector-item full-width" key={`right-${i}`}>
								<div className="right-name">
									<input
										type="checkbox"
										checked={edited || this.isCheckBoxChecked(code)}
										disabled={edited}
										className="ca-checkbox blue"
										onChange={(e) => {
											e.target.checked
												? this.addRight(right)
												: this.removeRight(right);
										}}
										id={idAttr}
									/>
									<label className={cn({ selected: this.isCheckBoxChecked(code) })} htmlFor={idAttr}>
										{name}
									</label>
									<div className="tooltip-container">
										<span className="" data-tip data-for={right.code}>
											<i className="fa fa-question-circle-o" />
										</span>
										<ReactTooltip id={right.code} effect="solid" className="CaTooltip " delayHide={400}>
											<div className="body">
												<Translate i18nKey={`CL_STEP2_RIGHT_DEFINITIONS_${code}`} />
											</div>
										</ReactTooltip>
									</div>
								</div>
								<div className="right-exclusivity">
									<label>
										{offerValue === offers.EXCLUSIVE && <Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />}
										{offerValue === offers.NON_EXCLUSIVE && <Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />}
									</label>
								</div>
								<div className="right-territories">
									<label>
										<img src={right.territories ? cmsWorldActive : cmsWorldDisabled} alt="" />
										{right.territories ? right.territories.length : "0"}
									</label>
									{right.territories && <i className="fa fa-edit" onClick={() => { onEditTerritories(right); }} />}
									{right.territories && <i className="fa fa-undo" onClick={() => { onUndoTerritories(right); }} />}
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
}

CmsAvailableRightsSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.property,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	rightsUpdated: selectedRights => dispatch(setSelectedRights(selectedRights)),
	updateContentValue: (k, v) => dispatch(updateContentValue(k, v)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsAvailableRightsSelector);
