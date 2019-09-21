import React from "react";
import CmsRadioBox from "./CmsRadioBox";
import CmsCheckBox from "./CmsCheckBox";
import CmsInputBox from "./CmsInputBox";

const CmsPropertyDetailTable = ({ heads, data }) => {
	const renderComponent = (item) => {
		if (item.type === "text") {
			return item.text;
		}

		if (item.type === "radio") {
			return (
				<CmsRadioBox
					value={item.value}
					text={item.text}
					onChange={() => {}}
				/>
			);
		}

		if (item.type === "checkbox") {
			return (
				<CmsCheckBox
					value={item.value}
					text={item.text}
					onChange={() => {}}
				/>
			);
		}

		if (item.type === "inputbox") {
			return (
				<CmsInputBox
					className={item.className}
					value={item.value}
					onChange={() => {}}
				/>
			);
		}

		return "";
	};

	return (
		<div className="property-details-table">
			{!!heads.length && (
				<div className="property-details-table-head">
					<div className="property-details-table-tr">
						{heads.map((item, index) => (
							<div className="property-details-table-th" key={`head-${index}`}>
								{item.value}
							</div>
						))}
					</div>
				</div>
			)}
			<div className="property-details-table-body">
				{data.map((item, row) => (
					<div className="property-details-table-tr" key={`row-${row}`}>
						{item.map((value, column) => (
							<div className="property-details-table-td" key={`column-${row}-${column}`}>
								{ renderComponent(value) }
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default CmsPropertyDetailTable;
