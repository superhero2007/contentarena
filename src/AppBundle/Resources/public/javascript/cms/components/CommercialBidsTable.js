import React from "react";
import { PropTypes } from "prop-types";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import { LISTING_STATUS } from "@constants";
import ListingLink from "@components/Links/ListingLink";
import { getListingBidsUrl } from "@utils/routing";
import Translate from "@components/Translator/Translate";
import { DATE_FORMAT } from "../../common/constants";
import {
	exclusiveRightAvailable,
	nonExclusiveRightAvailable,
	exclusiveRightOffered,
	nonExclusiveRightOffered,
	exclusiveRightSold,
	nonExclusiveRightSold,
	yellowCheckIcon,
	checkIcon,
	cancelIcon,
	duplicateIcon,
} from "../../main/components/Icons";

class CommercialBidsTable extends React.Component {
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
		const { list: { customId } } = original;

		return (
			<ListingLink customId={customId} name={value}>
				{value}
			</ListingLink>
		);
	};

	getRightCell = (props, shortLabel) => {
		const { value } = props;
		const rights = value.map(right => right.shortLabel);

		if (rights.indexOf(shortLabel) !== -1) return <img src={yellowCheckIcon} alt={shortLabel} />;

		return <span />;
	};

	getColumns = type => [{
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_ID" />,
		id: props => `custom-id-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		accessor: "customId",
		width: 80,
		Cell: props => (
			<span>
				{props.value}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LISTING" />,
		id: props => `listing-name-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		accessor: "list.name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("HL", "Highlights"),
		id: props => `hl-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "HL"),
	}, {
		Header: () => this.getHeader("LT", "Live transmission"),
		id: props => `lt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "LT"),
	}, {
		Header: () => this.getHeader("NA", "News access"),
		id: props => `na-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "NA"),
	}, {
		Header: () => this.getHeader("LB", "Live betting"),
		id: props => `lb-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "LB"),
	}, {
		Header: () => this.getHeader("DT", "Delayed & Archive"),
		id: props => `dt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "DT"),
	}, {
		Header: () => this.getHeader("PR", "Program"),
		id: props => `pr-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "list.rightsPackage",
		Cell: props => this.getRightCell(props, "PR"),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_TERRITORY" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 130,
		accessor: "list.law",
		Cell: props => (
			<span>
				{props.value.name}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LICENSE" />,
		id: props => `lic-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 150,
		accessor: "list.company",
		Cell: props => (
			<span>
				{props.value.legalName}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_FEE" />,
		id: props => `fee-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 100,
		accessor: "salesPackage",
		Cell: props => (
			<span>
				{`${props.value.currency.code === "EUR" ? "€" : "$"} ${parseFloat(props.value.fee).toFixed(3)}`}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_DATE" />,
		id: props => `date-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 100,
		accessor: "createdAt",
		Cell: props => (
			<span>
				{Moment(props.value).format(DATE_FORMAT)}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_USER" />,
		id: props => `user-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 130,
		accessor: "buyerUser",
		Cell: props => (
			<span>
				{`${props.value.firstName} ${props.value.lastName}`}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_ACTION" />,
		id: props => `action-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 100,
		Cell: () => {
			if (type === "openBids") {
				return (
					<div className="d-flex justify-content-around">
						<img src={checkIcon} alt="" />
						<img src={cancelIcon} alt="" />
					</div>
				);
			}
			if (type === "closedBids") {
				return (
					<div className="d-flex justify-content-around">
						<img src={duplicateIcon} alt="" />
						<img src={duplicateIcon} alt="" />
						<img src={duplicateIcon} alt="" />
					</div>
				);
			}
			return <div />;
		},
	}];

	render() {
		const { listings, type } = this.props;
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
					columns={this.getColumns(type)}
				/>
				<ReactTooltip place="top" type="dark" effect="solid" />
			</section>
		);
	}
}

CommercialBidsTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CommercialBidsTable;
