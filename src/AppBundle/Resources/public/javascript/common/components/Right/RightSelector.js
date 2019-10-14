import React from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import cn from "classnames";
import ReactTooltip from "react-tooltip";

class RightSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
		};
	}

	render() {
		const {
			availableRights = [],
			selectedRights = [],
			onSelectRight,
			onExclusive,
			exclusivityDisabled = false,
			showTooltip,
		} = this.props;
		return (
			<div className="right-selector">
				{availableRights.map((right, index) => {
					const {
						name, code,
					} = right;
					const { offers } = this.state;
					const idAttr = `checkbox-${code}`;
					const exclusiveIdAttr = `exc-id-${code}`;
					const nonExclusiveIdAttr = `non-exc-id-${code}`;
					const selectedRight = selectedRights.find(element => element.code === right.code);
					const exclusive = selectedRight && selectedRight.exclusive !== null ? selectedRight.exclusive : null;
					const offerValue = exclusive === null ? null : (exclusive ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE);
					const isEven = (index % 2 === 0);
					return (
						<div className={cn("right-selector-item", { "right-selector-even": isEven })} key={right.code}>
							<label className="input-checkbox">
								<input
									type="checkbox"
									value={!!selectedRight}
									checked={!!selectedRight}
									onChange={() => onSelectRight(right)}
									id={idAttr}
								/>
								<span className="input-checkbox-selector" />
								<span className="input-checkbox-text">
									{name}
								</span>
							</label>

							{showTooltip && (
								<div className="tooltip-container">
									<span className="" data-tip data-for={code}>
										<i className="fa fa-question-circle-o" />
									</span>
									<ReactTooltip id={right.code} effect="solid" className="CaTooltip " delayHide={400}>
										<div className="body">
											<Translate i18nKey={`CMS_DEALS_RIGHT_DEFINITIONS_${code}`} />
										</div>
									</ReactTooltip>
								</div>
							)}

							{exclusivityDisabled && right.exclusive && (
								<label className="selected">
									<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
								</label>
							)}

							{exclusivityDisabled && !right.exclusive && (
								<label className="selected">
									<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
								</label>
							)}

							{!exclusivityDisabled && (
								<div className="d-flex">
									<label className="input-radio">
										<input
											disabled={!selectedRight}
											type="radio"
											checked={offerValue === offers.EXCLUSIVE}
											onChange={() => {
												onExclusive(right, true);
											}}
											id={exclusiveIdAttr}
										/>
										<span className="input-radio-selector" />
										<span className="input-radio-text">
											<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
										</span>
									</label>
									<label className="input-radio">
										<input
											type="radio"
											disabled={!selectedRight}
											checked={offerValue === offers.NON_EXCLUSIVE}
											onChange={() => {
												onExclusive(right, false);
											}}
											id={nonExclusiveIdAttr}
										/>
										<span className="input-radio-selector" />
										<span className="input-radio-text">
											<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
										</span>
									</label>
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	}
}

RightSelector.propTypes = {
	onSelectRight: PropTypes.func.isRequired,
	onExclusive: PropTypes.func.isRequired,
};

export default RightSelector;
