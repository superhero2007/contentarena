import React from "react";
import { PropTypes } from "prop-types";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import cn from "classnames";
import { LISTING_STATUS, DATE_FORMAT } from "@constants";
import ListingLink from "@components/Links/ListingLink";
import { getListingBidsUrl } from "@utils/routing";
import Translate from "@components/Translator/Translate";
import { yellowCheckIcon } from "../../main/components/Icons";
import PropertyActionListing from "../../manage/components/PropertyActionListing";

class CmsListingOverviewTable extends React.Component {
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
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_HEADER_STATUS" />,
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
				{value}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_NAME" />,
		id: props => `listing-name-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		accessor: "name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_ID" />,
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
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_EXPIRY" />,
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
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_TERRITORIES" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 130,
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
		width: 50,
		Cell: (props) => {
			const {
				original: {
					customId, status, hasPendingBids,
				},
			} = props;
			return (
				<div className="tooltip-container">
					{
						status.name === LISTING_STATUS.DRAFT
						&& (
							<PropertyActionListing
								className="listing"
								style={{
									position: "absolute",
									zIndex: 100 - props.index,
								}}
								defaultAction="EDIT"
								showEdit
								showCommericalOverview
								showRemove
								showDuplicate
								showView={false}
								onRemove={() => {
									ContentArena.ContentApi.removeListing(customId);
								}}
								onDuplicate={this.duplicate}
								{...props.original}
							/>
						)
					}
					{
						(status.name === LISTING_STATUS.INACTIVE || status.name === LISTING_STATUS.AUTO_INACTIVE || status.name === LISTING_STATUS.REJECTED)
						&& (
							<PropertyActionListing
								className="listing"
								style={{
									position: "absolute",
									zIndex: 100 - props.index,
								}}
								defaultAction="SUBMIT"
								showCommericalOverview
								showEdit
								showArchive
								showDuplicate
								showSubmit
								showView
								onRepublish={() => {
									this.republish(listing.customId);
								}}
								onArchive={() => {
									ContentArena.ContentApi.archiveListing(customId);
								}}
								onDuplicate={this.duplicate}
								{...props.original}
							/>
						)
					}
					{
						(status.name === LISTING_STATUS.PENDING || status.name === LISTING_STATUS.APPROVED || status.name === LISTING_STATUS.EDITED)
						&& (
							<PropertyActionListing
								className="listing"
								style={{
									position: "absolute",
									zIndex: 100 - props.index,
								}}
								showEdit={!hasPendingBids}
								showCommericalOverview
								showDeactivate={!hasPendingBids}
								showDuplicate
								showArchive={!hasPendingBids}
								showView
								defaultAction="VIEW"
								onDeactivate={() => {
									this.deactivate(customId);
								}}
								onArchive={() => {
									ContentArena.ContentApi.archiveListing(customId);
								}}
								onDuplicate={this.duplicate}
								canShare
								{...props.original}
							/>
						)
					}
					{
						(status.name === LISTING_STATUS.SOLD_OUT || status.name === LISTING_STATUS.EXPIRED || status.name === LISTING_STATUS.SOLD_COPY)
						&& (
							<PropertyActionListing
								className="listing"
								style={{
									position: "absolute",
									zIndex: 100 - props.index,
								}}
								showCommericalOverview
								showDuplicate
								showArchive
								showView
								onArchive={() => {
									ContentArena.ContentApi.archiveListing(customId);
								}}
								onDuplicate={this.duplicate}
								{...props.original}
							/>
						)
					}
				</div>
			);
		},
	}];

	render() {
		// TODO YU check this component after BE implemented
		const { listings } = this.props;
		return (
			<section className="property-listing-overview-wrapper">
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

CmsListingOverviewTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsListingOverviewTable;
