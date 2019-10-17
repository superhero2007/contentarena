import React from "react";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import cn from "classnames";

class CmsRightsOverviewTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasonPosition: 0,
			loading: false,
			query: "",
		};
	}

	renderRightHeader = right => (
		<div className="d-flex justify-content-center">
			<span>
				{right.code}
			</span>
		</div>
	);

	renderRightCell = (right, territory, season) => {
		const listingHasRight = territory.listings.rights.indexOf(right.code) !== -1;
		const dealHasRight = territory.deals.rights.indexOf(right.code) !== -1;
		const listingHasSeason = territory.listings.seasons.indexOf(season.id) !== -1;
		const dealHasSeasons = territory.deals.seasons.indexOf(season.id) !== -1;

		// if (!listingHasSeason && dealHasSeasons && !listingHasRight && !dealHasRight) return <div />;

		return (
			<div
				className={cn("table-right-icon", {
					"green-background": true,
					"green-light-background": dealHasSeasons && !right.exclusive && territory.deals.closedDeals > 0,
					"red-light-background": dealHasSeasons && right.exclusive && dealHasRight && territory.deals.closedDeals > 0,
				})}
			>
				{listingHasSeason && listingHasRight && territory.listings.activeListings > 0 && <div className="purple-triangle" />}
				<div className="icon">
					<div className={cn({ "yellow-circle": right.exclusive, "blue-circle": !right.exclusive })} />
				</div>
			</div>
		);
	};

	getTerritoryColumns = () => [{
		Header: (
			<>
				<i className="icon-search" />
				<input
					placeholder="Search territories..."
					onChange={e => this.setState({ query: e.target.value })}
				/>
				{!this.seasonsFit() && this.state.seasonPosition !== 0 && (
					<i className="season-arrow icon-arrow-left" onClick={this.seasonLeft} />
				)}
			</>
		),
		headerClassName: "rt-th-search",
		minWidth: 230,
		maxWidth: 250,
		columns: [{
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY" />,
			headerClassName: "rt-th-name",
			className: "rt-td-name rt-td-rights",
			accessor: "name",
			minWidth: 230,
			maxWidth: 250,
		}],
	}];

	getSeasonColumns = () => {
		const { rights } = this.props;
		const seasons = this.getLimitedSeasons();
		const columns = [];
		if (seasons.length > 0) {
			seasons.forEach((season) => {
				const rightColumns = [];

				rights.forEach((right, index, list) => {
					let headerClassName = "";
					let cellClassName = "";

					if (index === 0) {
						headerClassName = `${headerClassName} rt-th-left`;
						cellClassName = `${cellClassName} rt-td-left`;
					}
					if (index + 1 === list.length) {
						headerClassName = `${headerClassName} rt-th-right`;
						cellClassName = `${cellClassName} rt-td-right`;
					}

					rightColumns.push({
						Header: () => this.renderRightHeader(right),
						Cell: props => this.renderRightCell(right, props.original, season),
						headerClassName: `rt-th-center ${headerClassName}`,
						className: `rt-td-center rt-td-full ${cellClassName}`,
						maxWidth: 33,
					});
				});

				columns.push({
					headerClassName: "rt-th-center rt-th-season",
					Header: () => (
						<span>
							{season.year}
						</span>
					),
					columns: rightColumns,
				});
			});
		}
		return columns;
	};

	seasonColumnsAllowed = () => {
		const { rights } = this.props;
		const availableSpace = 600;
		const columnSize = rights.length * 33;
		return Math.floor(availableSpace / columnSize);
	};

	seasonsFit = () => {
		const { seasons, rights } = this.props;
		const availableSpace = 594;
		const size = rights.length * seasons.length * 33;
		return size < availableSpace;
	};

	seasonsFitExactly = () => {
		const { seasons, rights } = this.props;
		const availableSpace = 594;
		const size = rights.length * seasons.length * 33;
		return size === availableSpace;
	};

	seasonLeft = () => {
		const { seasonPosition } = this.state;
		if (seasonPosition === 0) return false;
		this.setState({ seasonPosition: seasonPosition - 1 });
	};

	seasonRight = () => {
		const { seasonPosition } = this.state;
		// if (seasonPosition === 0) return false;
		this.setState({ seasonPosition: seasonPosition + 1 });
	};

	getDealsColumns = () => [{
		Header: () => (
			<>
				{!this.seasonsFit() && (this.state.seasonPosition + this.seasonColumnsAllowed()) < this.props.seasons.length && (
					<i className="season-arrow icon-arrow-right" onClick={this.seasonRight} />
				)}
			</>
		),
		columns: [{
			minWidth: this.seasonsFitExactly() ? 0 : 1,
			headerClassName: "no-padding",
			className: "no-padding",
		}, {
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING" />,
			headerClassName: "rt-th-center",
			className: "rt-td-center",
			width: 70,
			accessor: "listings",
			Cell: props => (
				<span className={props.value.activeListings === 0 ? "rights-table-inactive" : "rights-table-active"}>
					{props.value.activeListings}
				</span>
			),
		}, {
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS" />,
			headerClassName: "rt-th-center",
			className: "rt-td-center",
			width: 70,
			accessor: "deals",
			Cell: props => (
				<span className={props.value.closedDeals === 0 ? "rights-table-inactive" : "rights-table-active"}>
					{props.value.closedDeals}
				</span>
			),
		}],
	}];

	getLimitedSeasons = () => {
		const { seasonPosition } = this.state;
		const { seasons } = this.props;
		const seasonsFit = this.seasonsFit();
		const seasonColumnsAllowed = this.seasonColumnsAllowed();

		if (!seasonsFit) return seasons.slice(seasonPosition, seasonPosition + seasonColumnsAllowed);

		return seasons;
	};

	render() {
		const { territories } = this.props;
		const { query } = this.state;
		const columns = [...this.getTerritoryColumns(), ...this.getSeasonColumns(), ...this.getDealsColumns()];

		const filtered = (query !== "") ? territories.filter(territory => territory.name.match(new RegExp(query, "gi"))) : territories;

		return (
			<ReactTable
				showPageSizeOptions={false}
				showPagination={false}
				resizable={false}
				style={{
					maxHeight: "580px",
				}}
				maxWidth={980}
				collapseOnPageChange={false}
				collapseOnDataChange={false}
				minRows={0}
				defaultPageSize={250}
				data={filtered}
				select={this.props.select}
				className="ca-table rights-table"
				columns={columns}
				sorted={[{
					id: "name",
					desc: false,
				}]}
			/>
		);
	}
}

export default CmsRightsOverviewTable;
