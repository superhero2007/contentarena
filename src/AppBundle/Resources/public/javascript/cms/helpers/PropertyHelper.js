import React from "react";
import { ExclusiveRightAvailableIcon, NonExclusiveRightAvailableIcon, yellowCheckIcon } from "@icons";

export const getPropertyName = (property) => {
	const {
		sports,
		sportCategory,
		tournament,
	} = property;

	let name = "";

	if (sports && sports.length > 0) name += `${sports[0].name}`;

	if (sportCategory && sportCategory.length > 0) name += ` - ${sportCategory[0].name}`;

	if (tournament && tournament.length > 0) name += ` - ${tournament[0].name}`;

	return name;
};

const getRightCell = (props, shortLabel) => {
	const { value } = props;
	const right = value.find(right => right.shortLabel === shortLabel);

	if (right) {
		const className = (right.exclusive) ? "yellow-circle" : "blue-circle";
		return <div className={className} />;
	}

	return (
		<div className="legend-box-item">
			<div className="icon">
				<div className="yellow-circle" />
			</div>
		</div>
	);
};

export const getRightTableColumns = (accessor = "rightsPackage") => [{
	Header: () => <span data-tip="Live transmission">LT</span>,
	id: props => `lt-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "LT"),
}, {
	Header: () => <span data-tip="Live betting">LB</span>,
	id: props => `lb-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "LB"),
}, {
	Header: () => <span data-tip="Delayed & Archive">DT</span>,
	id: props => `dt-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "DT"),
}, {
	Header: () => <span data-tip="Highlights">HL</span>,
	id: props => `hl-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "HL"),
}, {
	Header: () => <span data-tip="News access">NA</span>,
	id: props => `na-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "NA"),
}, {
	Header: () => <span data-tip="Edited Program">PR</span>,
	id: props => `pr-${props.customId}-${props.index}`,
	headerClassName: "rt-td-center",
	className: "rt-td-center",
	width: 24,
	accessor,
	Cell: props => getRightCell(props, "PR"),
}];
