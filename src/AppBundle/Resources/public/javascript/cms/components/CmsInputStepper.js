import React from "react";

const CmsInputStepper = ({
	value, onAdd, onMinus, ...props
}) => (
	<div className="input-stepper" {...props}>
		<div className="input-stepper-content">
			{value}
		</div>
		<div className="input-stepper-control">
			<div
				className="input-stepper-control-item"
				onClick={onAdd}
			>
				+
			</div>
			<div
				className="input-stepper-control-item"
				onClick={onMinus}
			>
				-
			</div>
		</div>
	</div>
);

export default CmsInputStepper;
