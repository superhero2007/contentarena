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
	console.log(value);
	const right = value.find(right => right.shortLabel === shortLabel);

	if (right) {
		if (right.exclusive) return <ExclusiveRightAvailableIcon />;

		return <NonExclusiveRightAvailableIcon />;
	}

	return <span />;
};

export const getRightTableColumns = (accessor = "rightsPackage") => [{
	Header: () => <span data-tip="Live transmission">LT</span>,
	id: props => `lt-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "LT"),
}, {
	Header: () => <span data-tip="Live betting">LB</span>,
	id: props => `lb-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "LB"),
}, {
	Header: () => <span data-tip="Delayed & Archive">DT</span>,
	id: props => `dt-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "DT"),
}, {
	Header: () => <span data-tip="Highlights">HL</span>,
	id: props => `hl-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "HL"),
}, {
	Header: () => <span data-tip="News access">NA</span>,
	id: props => `na-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "NA"),
}, {
	Header: () => <span data-tip="Edited Program">PR</span>,
	id: props => `pr-${props.customId}-${props.index}`,
	headerClassName: "table-header-small",
	className: "table-header-small",
	accessor,
	Cell: props => getRightCell(props, "PR"),
}];
