import React from "react";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import cn from "classnames";

class CmsRightsOverviewTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			</>
		),
		headerClassName: "rt-th-search",
		width: 230,
		columns: [{
			Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY" />,
			accessor: "name",
			className: "rt-td-name",
		}],
	}];

	getSeasonColumns = () => {
		const { seasons, rights } = this.props;
		const columns = [];
		const rightColumns = [];

		rights.forEach((right) => {
			rightColumns.push({
				Header: () => this.renderRightHeader(right),
				Cell: () => this.renderRightCell(right),
				headerClassName: "rt-th-center",
				className: "rt-td-center rt-td-full",
				maxWidth: 36,
			});
		});

		if (seasons.length > 0) {
			seasons.forEach((season) => {
				columns.push({
					headerClassName: "rt-th-center",
					Header: props => (
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

	getDealsColumns = () => [{
		Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING" />,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 70,
		Cell: props => (
			<span>
				1
			</span>
		),
	}, {
		Header: <Translate i18nKey="CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS" />,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 70,
		Cell: props => (
			<span>
				1
			</span>
		),
	}];

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
					height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
				}}
				collapseOnPageChange={false}
				collapseOnDataChange={false}
				minRows={0}
				defaultPageSize={250}
				data={filtered}
				select={this.props.select}
				className="ca-table"
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
