import React from "react";


export const processTerritoryInfo = (territories, deals, listings) => {
	const dealTerritories = {};
	const listingTerritories = {};

	deals.forEach((deal) => {
		deal.bundles.forEach((bundle) => {
			bundle.territories.forEach((territory) => {
				if (!dealTerritories[territory.id]) {
					dealTerritories[territory.id] = {
						closedDeals: 0,
						rights: deal.rights.map(right => right.code),
						seasons: deal.seasons.map(season => season.id),
					};
				}
				if (deal.status === "CLOSED") dealTerritories[territory.id].closedDeals++;
			});
		});
	});

	listings.forEach((listing) => {
		listing.bundles.forEach((bundle) => {
			bundle.territories.forEach((territory) => {
				if (!listingTerritories[territory.id]) {
					listingTerritories[territory.id] = {
						activeListings: 0,
						draftListing: 0,
						rights: listing.rights.map(right => right.code),
						seasons: listing.seasons.map(season => season.id),
					};
				}
				if (listing.status === "APPROVED") listingTerritories[territory.id].activeListings++;
				if (listing.status === "DRAFT") listingTerritories[territory.id].draftListing++;
			});
		});
	});


	territories.map((territory) => {
		territory.deals = dealTerritories[territory.id] || { closedDeals: 0, rights: [], seasons: [] };
		territory.listings = listingTerritories[territory.id] || {
			activeListings: 0,
			draftListing: 0,
			rights: [],
			seasons: [],
		};

		return territory;
	});

	return territories;
};


export const getUnifiedRegions = (regions, territories) => [
	...regions.map((region) => {
		region.type = "region";
		return region;
	}),
	...territories.map((region) => {
		region.type = "territory";
		return region;
	}),
];

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

const getRightCell = (props, code) => {
	const { value } = props;
	const right = value.find(right => right.code === code);

	if (right) {
		const className = (right.exclusive) ? "yellow-circle" : "blue-circle";
		return (
			<div className="table-right-icon">
				<div className="icon">
					<div className={className} />
				</div>
			</div>
		);
	}

	return (
		<div className="table-right-icon">
			<div className="icon" />
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
