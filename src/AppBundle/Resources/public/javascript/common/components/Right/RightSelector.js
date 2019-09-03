import React from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { SelectAllButtons } from "@components/Utils/Utils";
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
			onSelectAll,
			onUnselectAll,
			onSelectRight,
			onExclusive,
			exclusivityDisabled = false,
		} = this.props;
		return (
			<>
				{availableRights.length > 1 && (
					<SelectAllButtons
						onSelectAll={onSelectAll}
						onUnselectAll={onUnselectAll}
					/>
				)}

				<div className="right-selector">
					{availableRights.map((right) => {
						const {
							name, code,
						} = right;
						const { offers } = this.state;
						const idAttr = `checkbox-${code}`;
						const exclusiveIdAttr = `exc-id-${code}`;
						const nonExclusiveIdAttr = `non-exc-id-${code}`;
						const selectedRight = selectedRights.find(element => element.id === right.id);
						const exclusive = selectedRight && selectedRight.exclusive !== null ? selectedRight.exclusive : null;
						const offerValue = exclusive === null ? null : (exclusive ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE);
						return (
							<div className="right-selector-item" key={right.id}>
								<div className="right-name">
									<input
										type="checkbox"
										value={!!selectedRight}
										checked={!!selectedRight}
										className="ca-checkbox blue"
										onChange={() => onSelectRight(right)}
										id={idAttr}
									/>
									<label className={cn({ selected: !!selectedRight })} htmlFor={idAttr}>
										{name}
									</label>
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
								</div>

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
									<div className="right-exclusivity">
										<input
											disabled={!selectedRight}
											type="radio"
											checked={offerValue === offers.EXCLUSIVE}
											onChange={() => {
												onExclusive(right, true);
											}}
											id={exclusiveIdAttr}
											className="ca-radio ca-radio-exclusive"
										/>
										<label
											className={cn({ selected: !!selectedRight && offerValue === offers.EXCLUSIVE })}
											htmlFor={exclusiveIdAttr}
										>
											<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
										</label>
										<input
											type="radio"
											disabled={!selectedRight}
											checked={offerValue === offers.NON_EXCLUSIVE}
											onChange={() => {
												onExclusive(right, false);
											}}
											id={nonExclusiveIdAttr}
											className="ca-radio"
										/>
										<label
											htmlFor={nonExclusiveIdAttr}
											className={cn({ selected: !!selectedRight && offerValue === offers.NON_EXCLUSIVE })}
										>
											<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
										</label>
									</div>
								)}

							</div>
						);
					})}
				</div>
			</>
		);
	}
}

RightSelector.propTypes = {
	onSelectAll: PropTypes.func.isRequired,
	onUnselectAll: PropTypes.func.isRequired,
	onSelectRight: PropTypes.func.isRequired,
	onExclusive: PropTypes.func.isRequired,
};

export default RightSelector;
