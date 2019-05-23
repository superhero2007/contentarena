import React from "react";
import { PropTypes } from "prop-types";
import { ROUTE_PATHS } from "@constants";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";

class PropertyListingsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getHeader = (text, tooltip = "") => (
		<span data-tip={tooltip && tooltip}>
			{text && text}
		</span>
	);

	getCell = (props) => {
		const { value, original } = props;
		const { customId } = original;

		return <a href={`/listing/${customId}`} title={value}>{value}</a>;
	};

	getColumns = () => [{
		Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_LISTING_NAME"), ""),
		id: props => `status-${props.customId}-${props.index}`,
		headerClassName: "table-header-big",
		className: "table-header-big",
		accessor: "status",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_SPORT"), ""),
		id: props => `listing-name-${props.customId}-${props.index}`,
		headerClassName: "table-header-big",
		className: "table-header-big",
		accessor: "name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("LT", "Live transmission"),
		id: props => `lt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("LB", "Live betting"),
		id: props => `lb-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("DT", "Delayed & Archive"),
		id: props => `dt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("HL", "Highlights"),
		id: props => `hl-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("NA", "News access"),
		id: props => `na-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("PR", "Program"),
		id: props => `pr-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("", ""),
		id: props => `exp-${props.customId}-${props.index}`,
		headerClassName: "table-header-big",
		className: "table-header-big",
		accessor: "expiresAt",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("", ""),
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "table-header-big",
		className: "table-header-big",
		accessor: "sports",
		Cell: props => this.getCell(props),
	}];

	render() {
		// TODO YU check this component after BE implemented
		const { listings } = this.props;
		return (
			<section className="property-listing-wrapper">
				<ReactTable
					className="ca-table property-listings-table"
					defaultPageSize={30}
					showPageSizeOptions={false}
					showPagination={false}
					onPageChange={this.onPageChange}
					minRows={0}
					multiSort={false}
					resizable={false}
					data={listings}
					columns={this.getColumns()}
				/>
				<ReactTooltip place="top" type="dark" effect="solid" />
			</section>
		);
	}
}

PropertyListingsTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyListingsTable;
