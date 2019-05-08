import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { updateContentValue } from "../../sell/actions/contentActions";
import { SuperRightDefinitions } from "../../sell/components/SuperRightDefinitions";
import { RIGHTS } from "../../common/constants";
import cn from "classnames";
import { setRights } from "../actions/propertyActions";


class CmsRightsSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rights: this.getRightsFromProps(props),
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ rights: this.getRightsFromProps(nextProps) });
	}

	getRightsFromProps = props => new Map(props.rights.map(rightItem => [rightItem.id, rightItem]));

	getRightsForProps = rights => [...rights.values()];

	addRight = (right) => {
		const { rights } = this.state;

		if (!rights.has(right.id)) {
			rights.set(right.id, {
				...right,
				exclusive: false,
			});
			this.props.rightsUpdated(this.getRightsForProps(rights));
		}
	};

	removeRight = (right) => {
		const { rights } = this.state;

		if (rights.has(right.id)) {
			rights.delete(right.id);
			this.props.rightsUpdated(this.getRightsForProps(rights));
		}
	};

	onExclusive = (right, exclusive) => {
		const { rights } = this.state;
		const { rightsUpdated } = this.props;
		let rightPackageItem = rights.get(right.id);

		if (rightPackageItem.exclusive === exclusive) return;

		rightPackageItem = {
			...rightPackageItem,
			exclusive,
		};
		rights.set(right.id, rightPackageItem);
		rightsUpdated(this.getRightsForProps(rights));
	};

	isCheckBoxChecked = (id) => {
		const { rights } = this.state;
		return rights.has(id);
	};

	getRadioBoxValue = (id) => {
		const { rights } = this.state;
		const right = rights.get(id);
		return right && right.exclusive || false;
	};

	render() {
		const { validation, rights } = this.props;
		const isInvalid = rights.length === 0 && validation;

		return (
			<div className="right-selector">

				{
					RIGHTS.map((right, i) => {
						const { name, shortLabel, id, translationKey } = right;
						const idAttr = `checkbox-${id}`;
						const { offers } = this.state;
						const exclusiveIdAttr = `exc-id-${shortLabel}`;
						const nonExclusiveIdAttr = `non-exc-id-${shortLabel}`;
						const offerValue = this.getRadioBoxValue(id) ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE;
						const defByLabel = SuperRightDefinitions[id] || [];
						const inputData = defByLabel[1];
						const checkboxIsDisabled = !this.isCheckBoxChecked(id);
						return (
							<div className="right-selector-item" key={`right-${i}`}>
								<div className="right-name">
									<input
										type="checkbox"
										checked={this.isCheckBoxChecked(id)}
										className="ca-checkbox blue"
										onChange={(e) => {
											e.target.checked
												? this.addRight(right)
												: this.removeRight(right);
										}}
										id={idAttr}
									/>
									<label className={cn({ selected: this.isCheckBoxChecked(id) })} htmlFor={idAttr}>
										{name}
									</label>
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
									<input
										disabled={checkboxIsDisabled}
										type="radio"
										checked={offerValue === offers.EXCLUSIVE}
										onChange={() => {
											this.onExclusive(right, true);
										}}
										id={exclusiveIdAttr}
										className="ca-radio"
									/>
									<label
										className={cn({ selected: !checkboxIsDisabled && offerValue === offers.EXCLUSIVE })}
										htmlFor={exclusiveIdAttr}
									>
										{this.context.t("RIGHT_SELECTION_OFFER_EXCLUSIVE")}
									</label>
									<input
										type="radio"
										disabled={checkboxIsDisabled}
										checked={offerValue === offers.NON_EXCLUSIVE}
										onChange={() => {
											this.onExclusive(right, false);
										}}
										id={nonExclusiveIdAttr}
										className="ca-radio"
									/>
									<label
										htmlFor={nonExclusiveIdAttr}
										className={cn({ selected: !checkboxIsDisabled && offerValue === offers.NON_EXCLUSIVE })}
									>
										{this.context.t("RIGHT_SELECTION_OFFER_NON_EXCLUSIVE")}
									</label>
								</div>

							</div>
						);
					})
				}
			</div>
		);
	}
}

CmsRightsSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.property,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	rightsUpdated: rights => dispatch(setRights(rights)),
	updateContentValue: (k, v) => dispatch(updateContentValue(k, v)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsRightsSelector);
