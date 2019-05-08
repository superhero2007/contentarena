import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import cn from "classnames";
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

	getRightsFromProps = rights => new Map(rights.map(rightItem => [rightItem.id, rightItem]));

	getRightsForProps = rights => [...rights.values()];

	getEditableRights = () => this.props.rights.filter(right => !right.edited);

	addRight = (right) => {
		const { selectedRights } = this.state;

		if (!selectedRights.has(right.id)) {
			selectedRights.set(right.id, {
				...right,
			});
		}
		this.props.rightsUpdated(this.getRightsForProps(selectedRights));
	};

	removeRight = (right) => {
		const { selectedRights } = this.state;

		if (selectedRights.has(right.id)) {
			selectedRights.delete(right.id);
		}
		this.props.rightsUpdated(this.getRightsForProps(selectedRights));
	};

	isCheckBoxChecked = (id) => {
		const { selectedRights } = this.state;
		return selectedRights.has(id);
	};

	getRadioBoxValue = (id) => {
		const { rights } = this.state;
		const right = rights.get(id);
		return right && right.exclusive || false;
	};

	handleAll = (e) => {
		const allSelected = e.target.checked;
		this.setState({ allSelected });
		if (allSelected) this.props.rightsUpdated(this.getRightsForProps(this.getEditableRights()));
	};

	render() {
		const { validation, rights, onUndoTerritories, onEditTerritories } = this.props;
		const { allSelected } = this.state;
		const isInvalid = rights.length === 0 && validation;

		return (
			<div className="right-selector">
				<div className="right-selector-item full-width">
					<div className="right-name">
						<input
							type="checkbox"
							checked={allSelected}
							className="ca-checkbox"
							onChange={this.handleAll}
						/>
						<label className={cn({ selected: false })}>
							{this.context.t("CMS_RIGHT_SELECTOR_ALL")}
						</label>
					</div>
					<div className="right-exclusivity">
						<label>
							{this.context.t("CMS_RIGHT_SELECTION_EXCLUSIVITY")}
						</label>
					</div>
					<div className="right-territories">
						<label />
					</div>
				</div>
				{
					rights.map((right, i) => {
						const {
							name, shortLabel, id, edited,
						} = right;
						const idAttr = `checkbox-${shortLabel}`;
						const { offers } = this.state;
						const offerValue = this.getRadioBoxValue(id) ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE;
						return (
							<div className="right-selector-item full-width" key={`right-${i}`}>
								<div className="right-name">
									<input
										type="checkbox"
										checked={edited || this.isCheckBoxChecked(id)}
										disabled={edited}
										className="ca-checkbox"
										onChange={(e) => {
											e.target.checked
												? this.addRight(right)
												: this.removeRight(right);
										}}
										id={idAttr}
									/>
									<label className={cn({ selected: this.isCheckBoxChecked(id) })} htmlFor={idAttr}>{name}</label>
									<div className="tooltip-container">
										<span className="" data-tip data-for={right.id}>
											<i className="fa fa-question-circle-o" />
										</span>
										<ReactTooltip id={right.id} effect="solid" className="CaTooltip " delayHide={400}>
											<div className="body">
												{this.context.t(`CL_STEP2_RIGHT_DEFINITIONS_${id}`)}
											</div>
										</ReactTooltip>
									</div>
								</div>
								<div className="right-exclusivity">
									<label>
										{offerValue === offers.EXCLUSIVE && this.context.t("RIGHT_SELECTION_OFFER_EXCLUSIVE")}
										{offerValue === offers.NON_EXCLUSIVE && this.context.t("RIGHT_SELECTION_OFFER_NON_EXCLUSIVE")}
									</label>
								</div>
								<div className="right-territories">
									<label>
										<img src={right.territories ? cmsWorldActive : cmsWorldDisabled} alt="" />
										{right.territories ? right.territories.length : "0"}
									</label>
									{right.territories && <i className="fa fa-edit" onClick={() => {onEditTerritories(right)}} />}
									{right.territories && <i className="fa fa-undo" onClick={() => {onUndoTerritories(right)}} />}
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
