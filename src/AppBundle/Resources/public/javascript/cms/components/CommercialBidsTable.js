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
import { DATE_FORMAT } from "../../common/constants";
import {
	// exclusiveRightAvailable,
	// nonExclusiveRightAvailable,
	// exclusiveRightOffered,
	// nonExclusiveRightOffered,
	// exclusiveRightSold,
	// nonExclusiveRightSold,
	yellowCheckIcon,
	checkIcon,
	cancelIcon,
	pdfIcon,
	blueEnvelopeIcon,
} from "../../main/components/Icons";
import DeclineBidModal from "../../common/modals/DeclineBidModal/DeclineBidModal";
import AcceptBidModal from "../../common/modals/AcceptBidModal/AcceptBidModal";

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
		accessor: "salesPackage.name",
		Cell: props => (
			<span>
				{props.value}
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
		width: type === "openBids" ? 150 : 100,
		Cell: props => (
			<div className="d-flex justify-content-around">
				{type === "openBids" && (
					<div
						className="d-flex justify-content-center align-items-center"
						onClick={() => this.acceptBid(props)}
					>
						<img src={checkIcon} alt="" />
					</div>
				)}
				{type === "openBids" && (
					<div
						className="d-flex justify-content-center align-items-center"
						onClick={() => this.declineBid(props)}
					>
						<img src={cancelIcon} alt="" />
					</div>
				)}
				<Link
					className="d-flex justify-content-center align-items-center"
					to={`/license/bid/${props.original.customId}`}
					target="_blank"
				>
					<img src={pdfIcon} alt="" />
				</Link>
				<Link
					className="d-flex justify-content-center align-items-center"
					to={`/redirect-integration/messages-by-bid-seller/${props.original.id}`}
					target="_blank"
				>
					<img src={blueEnvelopeIcon} alt="" />
				</Link>
			</div>
		),
	}];

	render() {
		const { listings, type, postAction } = this.props;
		const {
			approveModalIsOpen, rejectModalIsOpen, selectedBid, contentId, listingCustomId,
		} = this.state;
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
