import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import ListingLink from "@components/Links/ListingLink";
import { getListingBidsUrl } from "@utils/routing";
import Translate from "@components/Translator/Translate";
import { LISTING_STATUS } from "@constants";
import TableSeasonList from "@components/Table/TableSeasonList";
import TableTerritoryList from "@components/Table/TableTerritoryList";
import { DATE_FORMAT } from "../../common/constants";
import DeclineBidModal from "../../common/modals/DeclineBidModal/DeclineBidModal";
import AcceptBidModal from "../../common/modals/AcceptBidModal/AcceptBidModal";
import { getRightTableColumns } from "../helpers/PropertyHelper";

class CommercialBidsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			approveModalIsOpen: false,
			rejectModalIsOpen: false,
			selectedBid: null,
			contentId: null,
			listingCustomId: null,
		};
	}

	acceptBid = (props) => {
		this.setState({
			approveModalIsOpen: true,
			selectedBid: props.original,
			contentId: props.original.list.id,
			listingCustomId: props.original.list.customId,
		});
	};

	declineBid = (props) => {
		this.setState({
			rejectModalIsOpen: true,
			selectedBid: props.original,
			contentId: props.original.list.id,
			listingCustomId: props.original.list.customId,
		});
	};

	closeModal = () => {
		this.setState({
			approveModalIsOpen: false,
			rejectModalIsOpen: false,
		});
	};

	getCell = (props) => {
		const { value, original } = props;
		const { list: { customId } } = original;

		return (
			<ListingLink customId={customId} name={value}>
				{value}
			</ListingLink>
		);
	};

	getTitleColumns = () => [{
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
		headerClassName: "rt-th-name",
		className: "rt-td-name",
		accessor: "list.name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_SEASONS" />,
		id: props => `seasons-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		accessor: "list.seasons",
		width: 70,
		Cell: props => <TableSeasonList index={props.index} seasons={props.value} limit={3} />,
	}];


	getDetailColumns = () => [{
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_TERRITORY" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 82,
		accessor: "salesPackage.territories",
		Cell: props => <TableTerritoryList territories={props.value} index={props.index} />,
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LICENSE" />,
		id: props => `lic-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 112,
		accessor: "list.company",
		Cell: props => (
			<span>
				{props.value.legalName}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_FEE" />,
		id: props => `fee-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 80,
		accessor: "salesPackage",
		Cell: props => (
			<span>
				{`${props.value.currency.code === "EUR" ? "€" : "$"} ${parseFloat(props.value.fee).toFixed(3)}`}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_DATE" />,
		id: props => `date-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 80,
		accessor: "createdAt",
		Cell: props => (
			<span>
				{Moment(props.value).format(DATE_FORMAT)}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_USER" />,
		id: props => `user-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 48,
		accessor: "buyerUser",
		Cell: props => (
			<span>
				{`${props.value.firstName} ${props.value.lastName}`}
			</span>
		),
	}];

	getActionColumns = (type) => {
		let columns = [];

		switch (type) {
		case "openBids":
			columns = [{
				id: props => `action-${props.customId}-${props.index}`,
				className: "rt-td-center rt-td-full",
				width: 50,
				Cell: props => (
					<>
						<div
							className="action-box action-box-column"
							onClick={() => this.acceptBid(props)}
						>
							<i className="icon-check" />
						</div>
						<div
							className="action-box action-box-column"
							onClick={() => this.declineBid(props)}
						>
							<i className="icon-remove" />
						</div>
					</>
				),
			}, {
				id: props => `action-2-${props.customId}-${props.index}`,
				className: "rt-td-center rt-td-full",
				width: 50,
				Cell: props => (
					<>
						<Link
							className="action-box action-box-column"
							to={`/license/bid/${props.original.customId}`}
							target="_blank"
						>
							<i className="icon-agreement" />
						</Link>
						<Link
							className="action-box action-box-column"
							to={`/redirect-integration/messages-by-bid-seller/${props.original.id}`}
							target="_blank"
						>
							<i className="icon-message" />
						</Link>
					</>
				),
			}];
			break;
		case "closedBids":
			columns = [{
				id: props => `action-${props.customId}-${props.index}`,
				className: "rt-td-center rt-td-full",
				width: 50,
				Cell: () => (
					<div className="action-box action-box-accepted">
						<Translate i18nKey="COMMERCIAL_OVERVIEW_STATUS_ACCEPTED" />
					</div>
				),
			}, {
				id: props => `action-2-${props.customId}-${props.index}`,
				headerClassName: "table-header",
				className: "table-header justify-content-center",
				width: 50,
				Cell: props => (
					<div
						className="action-box"
						onClick={() => this.declineBid(props)}
					>
						<i className="icon-settings" />
					</div>
				),
			}];
			break;
		case "declinedBids":
			columns = [{
				id: props => `action-${props.customId}-${props.index}`,
				headerClassName: "table-header",
				className: "table-header justify-content-center",
				width: 150,
				Cell: props => (
					<div className="action-box action-box-rejected">
						<Translate i18nKey="COMMERCIAL_OVERVIEW_STATUS_REJECTED" />
					</div>
				),
			}];
			break;
		default:
			break;
		}

		return columns;
	};


	render() {
		const { listings, type, postAction } = this.props;
		const {
			approveModalIsOpen, rejectModalIsOpen, selectedBid, contentId, listingCustomId,
		} = this.state;

		const columns = [
			...this.getTitleColumns(),
			...getRightTableColumns("list.rightsPackage"),
			...this.getDetailColumns(type),
			...this.getActionColumns(type),
		];

		return (
			<section className="property-listing-wrapper">
				{approveModalIsOpen && (
					<AcceptBidModal
						selectedBid={selectedBid}
						postAction={postAction}
						contentId={contentId}
						listingCustomId={listingCustomId}
						isOpen={approveModalIsOpen}
						onCloseModal={this.closeModal}
					/>
				)}
				{rejectModalIsOpen && (
					<DeclineBidModal
						selectedBid={selectedBid}
						postAction={postAction}
						isOpen={rejectModalIsOpen}
						onCloseModal={this.closeModal}
					/>
				)}
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
					columns={columns}
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
