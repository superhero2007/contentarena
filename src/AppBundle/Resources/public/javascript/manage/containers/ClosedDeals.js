import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Moment from "moment/moment";
import ReactTooltip from "react-tooltip";
import { PropTypes } from "prop-types";
import { getCurrencySymbol, goTo } from "../../main/actions/utils";
import { DATE_FORMAT } from "@constants";
import {
	blueCheckIcon, yellowCheckIcon, pdfIcon, disabledPdfIcon,
} from "../../main/components/Icons";
import RightsLegend from "../../main/components/RightsLegend";
import Loader from "../../common/components/Loader";

const rightImageStyle = {
	width: 17,
	height: 17,
};

class ClosedDeals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			bids: [],
		};
		this.cancelIcon = `${assetsBaseDir}app/images/cancel.png`;
		this.checkIcon = `${assetsBaseDir}app/images/blue_check.png`;
		this.blueEnvelopeIcon = `${assetsBaseDir}app/images/envelope_2.png`;
	}

	componentDidMount() {
		const _this = this;
		this.setState({ loading: true });
		ContentArena.ContentApi.getClosedDeals().done((bids) => {
			_this.setState({ bids, loading: false });
		});
		jQuery("body, #home-wrapper").css("background-color", "#eee"); // todo: remove this when other page redesign ready
	}

	componentWillUnmount() {
		jQuery("body, #home-wrapper").css("background-color", ""); // todo: remove this when other page redesign ready
	}

	selectListing = (id) => {
		goTo(`listing/${id}`);
	};

	render() {
		const { loading, bids } = this.state;

		const { common } = this.props;

		bids.forEach((bid) => {
			if (bid.soldListing && bid.soldListing.selectedRightsBySuperRight) {
				bid.soldListing.rightsPackage.forEach((rp, k) => {
					rp.exclusive = Object.values(bid.soldListing.selectedRightsBySuperRight)[k].exclusive;
				});
			}
		});


		return (
			<div className="section-container">
				<Loader
					loading={loading}
				>
					{bids.length > 0 ? (
						<div>
							<div className="align-to-right">
								<RightsLegend />
							</div>
							<ReactTable
								className="ca-table"
								defaultPageSize={30}
								showPageSizeOptions={false}
								showPagination={false}
								onPageChange={this.onPageChange}
								minRows={0}
								multiSort={false}
								resizable={false}
								data={bids}
								select={this.props.select}
								columns={[{
									Header: "Deal ID",
									headerClassName: "table-header",
									className: "table-header table-header-left",
									accessor: "customId",
									width: 80,
									Cell: props => (
										<div>
											{`#${props.value}`}
										</div>
									),
								}, {
									Header: () => (
										<span>
											{this.context.t("CLOSED_DEALS_LISTING_NAME")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									headerClassName: "table-header-big",
									className: "table-header-big",
									id: "name",
									sortMethod: (a, b) => {
										if (a.name.length === b.name.length) {
											return a > b ? 1 : -1;
										}
										return a.name.length > b.name.length ? 1 : -1;
									},
									accessor: d => ({
										name: d.content.name,
										customId: d.content.customId,
									}),
									Cell: props => (
										<div>
											<a
												title={props.value.name}
												href={`listing/${props.value.customId}`}
											>
												{props.value.name}
											</a>
										</div>
									),
								}, {
									accessor: "content.company.legalName", // Required because our accessor is not a string
									Header: () => (
										<span>
											{this.context.t("Seller")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									headerClassName: "table-header-big",
									className: "table-header-big",
								}, {
									Header: () => (
										<span data-tip="Live transmission">
                                        LT


										</span>
									),
									// accessor: 'soldListing.rightsPackage',
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "LT",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "LT");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span data-tip="Live betting">
                                        LB


										</span>
									),
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "LB",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "LB");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span data-tip="Delayed & Archive">
                                        DT


										</span>
									),
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "DT",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "DT");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span data-tip="Highlights">
                                        HL


										</span>
									),
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "HL",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "HL");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span data-tip="News access">
                                        NA


										</span>
									),
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "NA",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "NA");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span data-tip="Program">
                                        PR


										</span>
									),
									accessor: d => (d.soldListing ? d.soldListing.rightsPackage : d.content.rightsPackage),
									id: "PR",
									headerClassName: "table-header-small",
									className: "table-header-small",
									Cell: (props) => {
										const right = props.value.find(e => e.shortLabel === "PR");
										return (
											<div
												className="blue"
											>
												{right
												&& (
													<img
														style={rightImageStyle}
														src={(right.exclusive) ? yellowCheckIcon : blueCheckIcon}
														alt=""
													/>
												)}
											</div>
										);
									},
								}, {
									Header: () => (
										<span>
											{this.context.t("Territories")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									headerClassName: "table-header",
									className: "table-header",
									id: "territories",
									width: 200,
									sortMethod: (a, b) => {
										if (a.name.length === b.name.length) {
											return a > b ? 1 : -1;
										}
										return a.name.length > b.name.length ? 1 : -1;
									},
									accessor: d => ({
										name: d.salesPackage.name,
										size: d.salesPackage.territories.length,
										territories: d.salesPackage.territories,
										excludedCountries: d.salesPackage.excludedCountries,
										worldwide: d.salesPackage.territoriesMethod === "WORLDWIDE" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE",
										excluding: d.salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE" && d.salesPackage.excludedCountries.length === 1,
									}),
									Cell: (props) => {
										const {
											size, territories, worldwide, excluding, excludedCountries,
										} = props.value;

										return (
											<div className="blue">
												{!worldwide && !excluding && size > 1 && `${size} territories`}
												{!worldwide && !excluding && size === 1 && territories[0].name}
												{excluding && `Worldwide excluding ${excludedCountries[0].name}`}
												{worldwide && this.context.t("Worldwide")}
											</div>
										);
									},
								}, {
									Header: () => (
										<span>
											{this.context.t("Price")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									headerClassName: "table-header",
									className: "table-header",
									width: 120,
									id: "price",
									sortMethod: (a, b) => (parseFloat(a.fee) > parseFloat(b.fee) ? 1 : -1),
									accessor: d => ({ fee: d.totalFee, currency: d.salesPackage.currency.code }),
									Cell: props => (
										<div className="blue">
											{`${parseFloat(props.value.fee).toLocaleString()} ${getCurrencySymbol(props.value.currency)}`}
										</div>
									),
								}, {
									Header: () => (
										<span>
											{this.context.t("Date of sale")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									width: 135,
									headerClassName: "table-header",
									className: "table-header",
									accessor: "createdAt",
									Cell: props => (
										<div>
											{Moment(props.value).format(DATE_FORMAT)}
										</div>
									),

								}, {
									Header: () => (
										<span>
											{this.context.t("Buyer name")}
											{" "}
											<i className="fa fa-sort" />
										</span>
									),
									headerClassName: "table-header-big",
									className: "table-header-big",
									accessor: "buyerUser",
									sortMethod: (a, b) => {
										if (a.lastName.length === b.lastName.length) {
											return a > b ? 1 : -1;
										}
										return a.lastName.length > b.lastName.length ? 1 : -1;
									},
									Cell: props => (
										<div title={`${props.value.firstName} ${props.value.lastName}`}>
											{`${props.value.firstName} ${props.value.lastName}`}
										</div>
									),

								}, {
									headerClassName: "table-header",
									className: "table-header",
									Header: this.context.t("Actions"), // Custom header components!
									width: 100,
									id: "header",
									accessor: d => ({
										id: d.id,
										customId: d.customId,
									}),
									Cell: props => (
										<div className="actions-col">
											{!common.testStageMode
											&& (
												<a href={`/license/bid/${props.value.customId}`} target="_blank" rel="noopener noreferrer">
													<img
														src={pdfIcon}
														title={this.context.t("CLOSED_DEALS_LICENSE_AGREEMENT_ICON")}
														alt=""
													/>
												</a>
											)
											}

											{common.testStageMode
											&& <img src={disabledPdfIcon} alt="" />
											}

											<img
												onClick={() => {
													window.location.href = `/redirect-integration/messages-by-bid/${props.value.id}`;
												}}
												src={this.blueEnvelopeIcon}
												title={this.context.t("CLOSED_DEALS_MESSAGE_ICON")}
												alt=""
											/>
										</div>
									),
								},

								]}
							/>
							<ReactTooltip place="top" type="dark" effect="solid" />
						</div>
					) : (
						<div className="manager-content-message">
							{this.context.t("CLOSED_DEALS_EMPTY_MESSAGE")}
						</div>
					)}
				</Loader>
			</div>
		);
	}
}

ClosedDeals.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
)(ClosedDeals);
