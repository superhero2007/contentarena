import React from "react";
import Moment from "moment/moment";
import ReactTable from "react-table";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import DeclineBidModal from "../../common/modals/DeclineBidModal/DeclineBidModal";
import AcceptBidModal from "../../common/modals/AcceptBidModal/AcceptBidModal";
import { getCurrencySymbol, getFee } from "../actions/utils";
import {
	bidIcon,
	blueEnvelopeIcon,
	pdfIcon,
	fixedIcon,
	plusYellowIcon,
	minusYellowIcon, bucketIcon, disabledPdfIcon,
} from "./Icons";
import { customStyles, GenericModalStyle } from "../styles/custom";
import ExtraTerritories from "./ExtraTerritories";
import { BUNDLE_TERRITORIES_METHOD, DATE_FORMAT } from "../../common/constants";

class CommercialSalesBundle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			approveModalIsOpen: false,
			rejectModalIsOpen: false,
			removeModalIsOpen: false,
			showBids: props.bidsOpen,
			territoriesList: [],
			showAllTerritories: false,
		};

		this.creditIcon = `${assetsBaseDir}app/images/credit-card.png`;
		this.coinIcon = `${assetsBaseDir}app/images/listing/coin.svg`;
		this.userIcon = `${assetsBaseDir}app/images/user.png`;
		this.calendarIcon = `${assetsBaseDir}app/images/listing/calendar.svg`;
		this.actionIcon = `${assetsBaseDir}app/images/download.png`;
	}

	componentWillReceiveProps() {
		this.setState({ removeModalIsOpen: false, saving: false });
	}

	removeBid = () => {
		const { selectedBid } = this.state;
		this.setState({ saving: true });
		ContentArena.ContentApi.removeBid(selectedBid).done((response) => {
			// this.setState({removeModalIsOpen : false, saving : false})
			this.props.onUpdate();
		});
	};

	closeRemoveModal = () => this.setState({ removeModalIsOpen: false });

	closeApproveModal = () => this.setState({ approveModalIsOpen: false });

	openApproveModal = () => this.setState({ approveModalIsOpen: true });

	closeRejectModal = () => this.setState({ rejectModalIsOpen: false });

	openRejectModal = () => this.setState({ rejectModalIsOpen: true });

	renderRemoveModal = () => {
		const { saving } = this.state;

		return (
			<Modal
				isOpen={this.state.removeModalIsOpen}
				onRequestClose={this.closeRemoveModal}
				bodyOpenClassName="generic-modal"
				style={GenericModalStyle}
			>
				<div className="generic-modal-container">
					<div className="title">
						<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_TITLE_REMOVE" />
					</div>

					<div className="container" />

					<div className="buttons">

						{!saving && (
							<button onClick={this.removeBid} className="confirm">
								<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CONFIRM" />
							</button>
						)}
						{saving && <i className="fa fa-spin fa-cog" />}
						<button onClick={this.closeRemoveModal}>
							<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CANCEL" />
						</button>
					</div>
				</div>
			</Modal>
		);
	};

	closeTerritoriesModal = () => {
		this.setState({ showAllTerritories: false });
	};

	allTerritories = () => (
		<Modal
			isOpen={this.state.showAllTerritories}
			onRequestClose={this.closeTerritoriesModal}
			bodyOpenClassName="selector"
			style={customStyles}
		>

			<div className="modal-inner">
				{
					this.state.territoriesList.map(territory => (
						<div className="country-modal">
							{territory.label}
						</div>
					))
				}
			</div>
		</Modal>
	);

	render() {
		const {
			salesBundle, onDelete, contentId, onUpdate, onApprove, listingCustomId, common,
		} = this.props;
		const {
			showBids, rejectModalIsOpen, approveModalIsOpen, selectedBid,
		} = this.state;

		const closedDeals = salesBundle.bids.filter(b => b.status.name === "APPROVED");
		const openBids = salesBundle.bids.filter(b => b.status.name === "PENDING");
		const totalFee = (closedDeals.length > 0) ? closedDeals.map(b => Number(b.totalFee)).reduce((t, n) => t + n) : null;
		const extraTerritories = (salesBundle.territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING) ? salesBundle.excludedTerritories : salesBundle.territories;
		const headers = {
			buyer: () => (
				<span>
					<img src={this.creditIcon} alt="Buyer" />
					{" "}
					<Translate i18nKey="BUYER" />
				</span>
			),
			fee: () => (
				<span>
					<img src={this.coinIcon} alt="Fee" />
					{" "}
					<Translate i18nKey="FEE" />
				</span>
			),
			user: () => (
				<span>
					<img src={this.userIcon} alt="User" />
					{" "}
					<Translate i18nKey="USER" />
				</span>
			),
			lastAction: () => (
				<span>
					<i className="fa fa-arrow-circle-o-right" />
					{" "}
					<Translate i18nKey="LAST_ACTION" />
				</span>
			),
			date: () => (
				<span>
					<img src={this.calendarIcon} alt="Action Date" />
					{" "}
					<Translate i18nKey="ACTION_DATE" />
				</span>
			),
			actions: () => (
				<span>
					<img src={this.actionIcon} alt="Action" />
					{" "}
					<Translate i18nKey="Actions" />
				</span>
			),
		};

		return (
			<div className="commercial-sales-bundles">
				{this.renderRemoveModal()}
				{this.allTerritories()}
				{approveModalIsOpen && (
					<AcceptBidModal
						selectedBid={selectedBid}
						postAction={onApprove}
						contentId={contentId}
						listingCustomId={listingCustomId}
						isOpen={approveModalIsOpen}
						onCloseModal={this.closeApproveModal}
					/>
				)}

				{rejectModalIsOpen && (
					<DeclineBidModal
						selectedBid={selectedBid}
						postAction={onUpdate}
						isOpen={rejectModalIsOpen}
						onCloseModal={this.closeRejectModal}
					/>
				)}

				<div
					className="commercial-sales-bundles-container"
					onClick={() => {
						this.setState({ showBids: !showBids });
					}}
				>
					<div className="sales-bundle-item">
						{salesBundle.bundleMethod === "SELL_AS_BUNDLE"
						&& <img style={{ width: 26, height: 23, marginRight: 5 }} src={fixedIcon} alt="" />}
						{salesBundle.name}

						{extraTerritories && extraTerritories.length > 3 && (
							<div style={{ marginRight: 5, marginLeft: 5 }}>
								<ExtraTerritories
									showAll={salesBundle.regionNamed}
									extraTerritories={extraTerritories}
								/>
							</div>
						)}
					</div>

					<div className="sales-bundle-item">
						<span>
							{salesBundle.fee > 0 && getFee(salesBundle)}
							{salesBundle.salesMethod === "BIDDING"
		&& <img style={{ width: 23, height: 23 }} src={bidIcon} alt="" />}
						</span>
					</div>

					<div className="sales-bundle-item-right" style={{ marginLeft: "auto" }}>
						<span>
							{closedDeals.length}
							{" "}
							{closedDeals.length === 1 && <Translate i18nKey="COMMERCIAL_ACTIVITY_CLOSED_DEAL" />}
							{closedDeals.length !== 1 && <Translate i18nKey="COMMERCIAL_ACTIVITY_CLOSED_DEALS" />}
						</span>
					</div>

					<div className="sales-bundle-item-right">
						<span>
							{openBids.length}
							{" "}
							{openBids.length === 1 && <Translate i18nKey="COMMERCIAL_ACTIVITY_OPEN_BID" />}
							{openBids.length !== 1 && <Translate i18nKey="COMMERCIAL_ACTIVITY_OPEN_BIDS" />}
						</span>
					</div>

					{totalFee && (
						<div className="sales-bundle-item-right">
							<span>
								<NumberFormat
									thousandSeparator
									value={totalFee}
									displayType="text"
									prefix={`${getCurrencySymbol(salesBundle.currency.code)} `}
								/>
							</span>
						</div>
					)}

					{salesBundle.bids.length > 0
					&& (
						<div className="sales-bundle-show-bids">
							{showBids ? minusYellowIcon : plusYellowIcon}
						</div>
					)}
				</div>
				{showBids && salesBundle.bids.length > 0
				&& (
					<div>
						<ReactTable
							className="ca-table bid-table"
							defaultPageSize={30}
							showPageSizeOptions={false}
							showPagination={false}
							onPageChange={this.onPageChange}
							minRows={0}
							resizable={false}
							data={salesBundle.bids}
							select={this.props.select}
							columns={[{
								accessor: d => d.buyerUser.company.legalName,
								Cell: props => (
									<div>
										{props.value}
									</div>
								),
								Header: headers.buyer(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								id: "company",
							}, {
								Header: headers.fee(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								id: "price",
								accessor: d => ({ fee: d.totalFee, currency: salesBundle.currency.code }),
								Cell: props => (
									<div className="blue" style={{ width: "100%", textAlign: "right" }}>
										<NumberFormat
											thousandSeparator
											value={parseFloat(props.value.fee)}
											displayType="text"
											prefix={`${getCurrencySymbol(props.value.currency)} `}
										/>

									</div>
								),
							}, {
								Header: headers.lastAction(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								accessor: "status.name",
								Cell: props => (
									<div>
										{props.value === "APPROVED" && <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_CLOSED_DEAL" />}
										{props.value === "PENDING" && <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_PENDING" />}
										{props.value === "REJECTED" && <Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_REJECTED" />}
									</div>
								),

							}, {
								Header: headers.date(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								accessor: "createdAt",
								Cell: props => (
									<div>
										{Moment(props.value).format(DATE_FORMAT)}
									</div>
								),

							}, {
								Header: headers.user(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								accessor: "buyerUser",
								Cell: props => (
									<div>
										{`${props.value.firstName} ${props.value.lastName}`}
									</div>
								),

							}, {
								Header: headers.actions(),
								headerClassName: "table-header-big",
								className: "table-header-big",
								id: "actions",
								accessor: b => ({ status: b.status.name, bid: b }),
								Cell: props => (
									<div className="actions-col d-flex align-items-center">
										{props.value.status === "REJECTED"
										&& (
											<img
												src={bucketIcon}
												onClick={() => {
													this.setState({
														showRemoveConfirm: true,
														selectedBidForDeletion: props.value.bid,
													});
												}}
												title={this.context.t("COMMERCIAL_ACTIVITY_TRASH_ICON")}
												alt=""
											/>
										)}
										{props.value.status === "PENDING"
										&& (
											<i
												className="fa fa-check-circle-o"
												style={{ color: "#19CB43", fontSize: 26 }}
												onClick={() => {
													this.setState({ selectedBid: props.value.bid }, this.openApproveModal);
												}}
												title={this.context.t("COMMERCIAL_ACTIVITY_ACCEPT_BID_ICON")}
											/>
										)}
										{props.value.status === "PENDING"
										&& (
											<i
												className="fa fa-times-circle-o"
												style={{ color: "#990000", fontSize: 26 }}
												onClick={() => {
													this.setState({ selectedBid: props.value.bid }, this.openRejectModal);
												}}
												title={this.context.t("COMMERCIAL_ACTIVITY_DECLINE_BID_ICON")}
											/>
										)}
										{(props.value.status === "APPROVED" || props.value.status === "PENDING") && !common.testStageMode
										&& (
											<a href={`/license/bid/${props.value.bid.customId}`} target="_blank" rel="noopener noreferrer">
												<img
													src={pdfIcon}
													title={props.value.status === "APPROVED" ? <Translate i18nKey="COMMERCIAL_ACTIVITY_CLOSED_BID_LICENSE_AGREEMENT" /> : <Translate i18nKey="COMMERCIAL_ACTIVITY_OPEN_BID_LICENSE_AGREEMENT" />}
													alt=""
												/>
											</a>
										)
										}

										{(props.value.status === "APPROVED" || props.value.status === "PENDING") && common.testStageMode
										&& <img src={disabledPdfIcon} alt="" />
										}

										{(props.value.status === "APPROVED" || props.value.status === "PENDING") && (
											<img
												onClick={() => {
													if (props.value.status === "APPROVED") {
														window.location.href = `/redirect-integration/messages-by-bid-seller/${props.value.bid.id}`;
													} else {
														window.open(
															`/redirect-integration/messages-by-bid-seller/${props.value.bid.id}`,
															"_blank",
														);
													}
												}}
												src={blueEnvelopeIcon}
												title={this.context.t("COMMERCIAL_ACTIVITY_MESSAGE_ICON")}
												alt=""
											/>
										)}

										{this.state.showRemoveConfirm && (
											<div className="confirmation-tooltip">
												<div className="confirmation-text" style={{ whiteSpace: "normal" }}>
													<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_TITLE_REMOVE" />
												</div>
												<button
													className="button button-confirm"
													onClick={(e) => {
														onDelete(this.state.selectedBidForDeletion.id);
														this.setState({
															showRemoveConfirm: false,
															selectedBidForDeletion: null,
														});
														e.stopPropagation();
													}}
												>
													<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CONFIRM" />
												</button>
												<button
													className="button"
													onClick={(e) => {
														this.setState({
															showRemoveConfirm: false,
															selectedBidForDeletion: null,
														});
														e.stopPropagation();
													}}
												>
													<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_BUTTON_REMOVE_CANCEL" />
												</button>
											</div>
										)}
									</div>
								),
							},

							]}
						/>

					</div>
				)}
			</div>
		);
	}
}

CommercialSalesBundle.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CommercialSalesBundle);
