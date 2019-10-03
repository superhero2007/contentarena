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

	renderRightCell = right => (
		<div className="table-right-icon green-background">
			<div className="purple-triangle" />
			<div className="icon">
				<div className={cn({ "yellow-circle": right.exclusive, "blue-circle": !right.exclusive })} />
			</div>
		</div>
	);

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
		width: 230,
		columns: [{
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY" />,
			headerClassName: "rt-th-name",
			className: "rt-td-name rt-td-rights",
			accessor: "name",
			width: 230,
		}],
	}];

	getSeasonColumns = () => {
		const { rights } = this.props;
		const seasons = this.getLimitedSeasons();
		const columns = [];
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
				Cell: () => this.renderRightCell(right),
				headerClassName: `rt-th-center ${headerClassName}`,
				className: `rt-td-center rt-td-full ${cellClassName}`,
				maxWidth: 36,
			});
		});

		if (seasons.length > 0) {
			seasons.forEach((season) => {
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
		const columnSize = rights.length * 36;
		return Math.floor(availableSpace / columnSize);
	};

	seasonsFit = () => {
		const { seasons, rights } = this.props;
		const availableSpace = 600;
		const size = rights.length * seasons.length * 36;
		return size < availableSpace;
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
			minWidth: 10,
		}, {
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING" />,
			headerClassName: "rt-th-center",
			className: "rt-td-center",
			width: 70,
			Cell: () => (
				<span className="rights-table-active">
					1
				</span>
			),
		}, {
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS" />,
			headerClassName: "rt-th-center",
			className: "rt-td-center",
			width: 70,
			Cell: () => (
				<span className="rights-table-inactive">
					0
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
