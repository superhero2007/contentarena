import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import ListingLink from "@components/Links/ListingLink";
import Translate from "@components/Translator/Translate";
import TableSeasonList from "@components/Table/TableSeasonList";
import TableTerritoryList from "@components/Table/TableTerritoryList";
import { UserName } from "@utils/listing";
import TableTooltip from "@components/Tooltips/TableTooltip";
import { DATE_FORMAT } from "../../common/constants";
import CmsDeclineBidModal from "../../common/modals/CmsDeclineBidModal";
import CmsAcceptBidModal from "../../common/modals/CmsAcceptBidModal";
import { getRightTableColumns } from "../helpers/PropertyHelper";
import PropertyActionListing from "../../manage/components/PropertyActionListing";

class CommercialDealsTable extends React.Component {
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
		Cell: (props) => {
			let name;
			if (props.original.custom) {
				name = <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_MANUALLY_ADDED_DEAL" />;
			} else {
				name = `${props.original.listing.name}`;
			}

			return (<span>{name}</span>);
		},
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_SEASONS" />,
		id: props => `seasons-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		accessor: "seasons",
		width: 70,
		Cell: props => <TableSeasonList index={props.index} seasons={props.value} limit={3} />,
	}];


	getDetailColumns = () => [{
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_TERRITORY" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 82,
		accessor: "bundles",
		Cell: props => <TableTerritoryList territories={props.value[0].territories} index={props.index} />,
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LICENSE" />,
		id: props => `lic-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 112,
		accessor: "company",
		Cell: (props) => {
			let name;
			if (props.original.custom) {
				name = props.original.buyerCompanyName;
			} else {
				name = `${props.company.legalName}`;
			}

			return (<span>{name}</span>);
		},
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_FEE" />,
		id: props => `fee-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 80,
		Cell: props => (
			<span>
				{`${props.original.currency === "EUR" ? "€" : "$"} ${parseFloat(props.original.fee).toFixed(2)}`}
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
		Cell: (props) => {
			let name;
			if (props.original.custom) {
				name = "-";
			} else {
				name = `${props.original.buyerUser.firstName} ${props.original.buyerUser.lastName}`;
			}

			return (<span>{name}</span>);
		},
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
				Cell: props => (
					<div className="action-box action-box-accepted">
						<TableTooltip
							text={<Translate i18nKey="COMMERCIAL_OVERVIEW_STATUS_ACCEPTED" />}
							zIndex={9999 - props.index}
						>
							<>
								<div className="tools-action">
									<span>
										<Translate
											i18nKey="COMMERCIAL_OVERVIEW_STATUS_ACCEPTED_BY"
											params={{
												name: props.original.custom ? <UserName {...props.original.closedBy} /> : <UserName {...props.original.owner} />,
											}}
										/>
									</span>
								</div>

							</>

						</TableTooltip>
					</div>
				),
			}, {
				id: props => `action-2-${props.customId}-${props.index}`,
				headerClassName: "table-header",
				className: "table-header justify-content-center",
				width: 50,
				Cell: props => (
					<div className="tools">
						<PropertyActionListing
							className="listing pointer"
							style={{
								position: "absolute",
								zIndex: 1000 - props.index,
							}}
							defaultAction="EDIT"
							showLicense
							showMessage
							showView={false}
							{...props.original}
						/>
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
		const { deals, type, postAction } = this.props;
		const {
			approveModalIsOpen, rejectModalIsOpen, selectedBid, contentId, listingCustomId,
		} = this.state;

		const columns = [
			...this.getTitleColumns(),
			...getRightTableColumns("rights"),
			...this.getDetailColumns(type),
			...this.getActionColumns(type),
		];

		return (
			<section className="property-listing-wrapper">
				{approveModalIsOpen && (
					<CmsAcceptBidModal
						selectedBid={selectedBid}
						postAction={postAction}
						contentId={contentId}
						listingCustomId={listingCustomId}
						onCloseModal={this.closeModal}
					/>
				)}
				{rejectModalIsOpen && (
					<CmsDeclineBidModal
						selectedBid={selectedBid}
						postAction={postAction}
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
					data={deals}
					columns={columns}
				/>
				<ReactTooltip place="top" type="dark" effect="solid" />
			</section>
		);
	}
}

CommercialDealsTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CommercialDealsTable;
