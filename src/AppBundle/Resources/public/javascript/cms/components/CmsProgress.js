import React from "react";
import { PROGRESS_STATUS } from "@constants";

const CmsProgressComponent = ({ title, status }) => (
	<div className={`progress-step ${status}`}>
		<div className="progress-selector">
			<div className="progress-selector-inner">
				{status === PROGRESS_STATUS.COMPLETED && <i className="icon-check" />}
				{status === PROGRESS_STATUS.ACTIVE && <div className="progress-selector-inner-rect" />}
			</div>
		</div>
		<div className="progress-text">
			{title}
		</div>
	</div>
);

const CmsProgress = ({ title, currentStep, progressList }) => (
	<div className="progress-wrapper">
		<h3 className="progress-title">
			{title}
		</h3>
		<div className="progress-steps">
			{progressList.map((item, index) => {
				let status = PROGRESS_STATUS.COMPLETED;
				if (currentStep === index + 1) {
					status = PROGRESS_STATUS.ACTIVE;
				}
				if (currentStep <= index) {
					status = PROGRESS_STATUS.DISABLED;
				}
				return (
					<CmsProgressComponent
						title={item}
						status={status}
						key={index}
					/>
				);
			})}
		</div>

		<div className="progress-line" />
	</div>
);

export default CmsProgress;
