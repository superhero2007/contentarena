import React from "react";
import { PropTypes } from "prop-types";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import cn from "classnames";
import ListingLink from "@components/Links/ListingLink";
import { getListingBidsUrl } from "@utils/routing";
import Translate from "@components/Translator/Translate";
import { LISTING_STATUS } from "@constants";
import { DATE_FORMAT } from "../../common/constants";
import { yellowCheckIcon } from "../../main/components/Icons";

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

	getColumns = () => [{
		Header: () => <Translate i18nKey="CMS_LISTING_TABLE_HEADER_STATUS" />,
		id: props => `status-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-status",
		accessor: "status.name",
		width: 90,
		Cell: ({ value }) => (
			<span className={cn({
				"status-active": value !== "REJECTED",
				"status-rejected": value === "REJECTED",
			})}
			>
				{value === "REJECTED" && "Rejected"}
				{value !== "REJECTED" && "Active"}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_TABLE_ID" />,
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
		Header: () => <Translate i18nKey="CMS_LISTING_TABLE_NAME" />,
		id: props => `listing-name-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		accessor: "name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => this.getHeader("LT", "Live transmission"),
		id: props => `lt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "LT"),
	}, {
		Header: () => this.getHeader("LB", "Live betting"),
		id: props => `lb-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "LB"),
	}, {
		Header: () => this.getHeader("DT", "Delayed & Archive"),
		id: props => `dt-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "DT"),
	}, {
		Header: () => this.getHeader("HL", "Highlights"),
		id: props => `hl-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "HL"),
	}, {
		Header: () => this.getHeader("NA", "News access"),
		id: props => `na-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "NA"),
	}, {
		Header: () => this.getHeader("PR", "Program"),
		id: props => `pr-${props.customId}-${props.index}`,
		headerClassName: "table-header-small",
		className: "table-header-small",
		accessor: "rightsPackage",
		Cell: props => this.getRightCell(props, "PR"),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_TABLE_EXPIRY" />,
		id: props => `expiry-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		accessor: "expiresAt",
		width: 100,
		Cell: props => (
			<span>
				{Moment(props.value).format(DATE_FORMAT)}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_TABLE_TERRITORIES" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 100,
		Cell: props => (
			<span>
				{props.original.territories}
			</span>
		),
	}, {
		Header: () => this.getHeader("", ""),
		id: props => `ter-${props.original.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		width: 120,
		Cell: (props) => {
			const {
				original: {
					customId, lastActionDate, owner, lastAction, hasActivity, status, name,
				},
			} = props;
			const formattedDate = Moment(lastActionDate).format(DATE_FORMAT);
			return (
				<div className="tooltip-container">
					{
						!hasActivity
						&& status.name !== LISTING_STATUS.REJECTED
						&& (
							<ListingLink customId={customId} name={name}>
								<Translate i18nKey="CMS_LISTING_TABLE_VIEW_LISTING" />
							</ListingLink>
						)
					}
					{
						hasActivity
						&& status.name !== LISTING_STATUS.REJECTED
						&& (
							<a href={getListingBidsUrl(customId)} target="_blank" rel="noopener noreferrer">
								<Translate i18nKey="CMS_LISTING_TABLE_VIEW_BIDS" />
							</a>
						)
					}
					{
						status.name === LISTING_STATUS.REJECTED
						&& (
							<a>
								<Translate i18nKey="CMS_LISTING_TABLE_EDIT" />
							</a>
						)
					}
					<span className="" data-tip data-for={customId}>
						<i className="fa fa-info-circle" />
					</span>
					<ReactTooltip id={customId} effect="solid" className="CaTooltip " delayHide={400}>
						<div className="body">
							<Translate i18nKey="CMS_LISTING_TABLE_LAST_ACTION_DATE" /> {`: ${formattedDate}`}
							<br />
							{lastAction && `${this.context.t("CMS_LISTING_TABLE_LAST_ACTION")}: ${lastAction.name}`}
							<br />
							{owner && `${this.context.t("CMS_LISTING_TABLE_OWNER")}: ${owner.firstName}`}
							<br />
						</div>
					</ReactTooltip>
				</div>
			);
		},
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
