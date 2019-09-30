import React from "react";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import cn from "classnames";

class CmsProgramsOverviewTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			query: "",
		};
	}

	renderCell = program => (
		<div className="table-right-icon green-background">
			<div className="icon">
				<div className={cn({ "yellow-circle": program.exclusive, "blue-circle": !program.exclusive })} />
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
		className: "rt-td-name rt-td-rights",
		accessor: "name",
	}];

	getProgramColumns = () => {
		const { programs } = this.props;
		const columns = [];

		programs.forEach((program) => {
			columns.push({
				Header: () => (
					<div className="d-flex justify-content-center">
						<span>
							{program.name}
						</span>
					</div>
				),
				Cell: () => this.renderCell(program),
				headerClassName: "rt-th-center rt-th-program",
				className: "rt-td-center rt-td-full",
				maxWidth: 130,
			});
		});

		return columns;
	};

	render() {
		const { territories } = this.props;
		const { query } = this.state;
		const columns = [...this.getTerritoryColumns(), ...this.getProgramColumns()];

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
				sortable={false}
				columns={columns}
				sorted={[{
					id: "name",
					desc: false,
				}]}
			/>
		);
	}
}

export default CmsProgramsOverviewTable;
