import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { updateContentValue } from "../../sell/actions/contentActions";
import { SuperRightDefinitions } from "../../sell/components/SuperRightDefinitions";
import { RIGHTS } from "../../common/constants";
import CaTooltip from "../../main/components/CaTooltip";
import cn from "classnames";


class RightsSelector extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rightsPackage: new Map(),
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ rightsPackage: new Map(nextProps.rightsPackage.map(rightItem => [rightItem.id, rightItem])) });
	}

	addRight = (superRight) => {
		const { rightsPackage } = this.state;

		if (!rightsPackage.has(superRight.id)) {
			rightsPackage.set(superRight.id, {
				...superRight,
				exclusive: false,
			});
			this.props.superRightsUpdated(rightsPackage);
		}
	};

	removeRight = (superRight) => {
		const { rightsPackage } = this.state;

		if (rightsPackage.has(superRight.id)) {
			rightsPackage.delete(superRight.id);
			this.props.superRightsUpdated(rightsPackage);
		}
	};

	onExclusive = (superRight, exclusive) => {
		const { rightsPackage } = this.state;
		const { superRightsUpdated } = this.props;
		let rightPackageItem = rightsPackage.get(superRight.id);

		if (rightPackageItem.exclusive === exclusive) return;

		rightPackageItem = {
			...rightPackageItem,
			exclusive,
		};
		rightsPackage.set(superRight.id, rightPackageItem);
		superRightsUpdated(rightsPackage);
	};

	isCheckBoxChecked = (id) => {
		const { rightsPackage } = this.state;
		return rightsPackage.has(id);
	};

	getRadioBoxValue = (id) => {
		const { rightsPackage } = this.state;
		const superRight = rightsPackage.get(id);
		return superRight && superRight.exclusive || false;
	};

	render() {
		const { validation, rightsPackage } = this.props;
		const isInvalid = rightsPackage.length === 0 && validation;

		return (
			<div className="right-selector">

				{
					RIGHTS.map(right => {
						const { name, shortLabel, id } = right;
						const idAttr = `checkbox-${shortLabel}`;
						const { offers } = this.state;
						const exclusiveIdAttr = `exc-id-${shortLabel}`;
						const nonExclusiveIdAttr = `non-exc-id-${shortLabel}`;
						const offerValue = this.getRadioBoxValue(id) ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE;
						const defByLabel = SuperRightDefinitions[id] || [];
						const inputData = defByLabel[1];
						return (
							<div className="right-selector-item">
								<div className="right-name">
									<input
										type="checkbox"
										checked={this.isCheckBoxChecked(id)}
										className="ca-checkbox"
										onChange={(e) => {
											e.target.checked
												? this.addRight(right)
												: this.removeRight(right);
										}}
										id={idAttr}
									/>
									<label className={cn({"selected": this.isCheckBoxChecked(id)})} htmlFor={idAttr}>{name}</label>
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
										disabled={!this.isCheckBoxChecked(id)}
										type="radio"
										checked={offerValue === offers.EXCLUSIVE}
										onChange={() => {
											this.onExclusive(right, true);
										}}
										id={exclusiveIdAttr}
										className="ca-radio"
									/>
									<label
										htmlFor={exclusiveIdAttr}
									>
										{this.context.t("RIGHT_SELECTION_OFFER_EXCLUSIVE")}
									</label>
									<input
										type="radio"
										disabled={!this.isCheckBoxChecked(id)}
										checked={offerValue === offers.NON_EXCLUSIVE}
										onChange={() => {
											this.onExclusive(right, false);
										}}
										id={nonExclusiveIdAttr}
										className="ca-radio"
									/>
									<label
										htmlFor={nonExclusiveIdAttr}
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

RightsSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	superRightsUpdated: rightsPackage => dispatch({
		type: "SUPER_RIGHTS_UPDATED",
		rightsPackage,
	}),
	updateContentValue: (k, v) => dispatch(updateContentValue(k, v)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RightsSelector);
