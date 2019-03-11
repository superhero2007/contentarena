import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { PropTypes } from "prop-types";
import NumberFormat from "react-number-format";
import ReactTable from "react-table";
import { pdfIcon } from "../../main/components/Icons";
import Installments from "../components/Installments";
import DigitalSignature from "../../main/components/DigitalSignature";
import {
	getCurrencySymbol, getCustomLicenseUrl, getCustomLicenseUrlBids,
} from "../../main/actions/utils";
import { customStyles } from "../../main/styles/custom";
import { companyIsValid } from "../../sell/actions/validationActions";
import CountrySelector from "../../main/components/CountrySelector";
import { DATE_FORMAT } from "@constants";
import GeneralTerms from "../../main/components/GeneralTerms";
import { disableValidation, enableValidation } from "../../main/actions/validationActions";
import ExtraTerritories from "../../main/components/ExtraTerritories";
import { packageIcon } from "../../main/components/Icons";
import RadioSelector from "../../main/components/RadioSelector";
import Loader from "../../common/components/Loader";
import { BUNDLE_SALES_METHOD } from "../../common/constants";

const labelStyle = { height: "30px", fontSize: "12px", width: "400px" };
const inputStyle = { width: "380px", margin: 0, height: "30px" };

class Checkout extends React.Component {
	constructor(props) {
		super(props);

		let minimumBidBundles = 0;
		const allowMultiple = props.selectedPackages.filter(b => b.salesMethod === "BIDDING").length > 1;

		const selectedPackages = props.selectedPackages.map((b) => {
			if (b.salesMethod === "BIDDING" && b.fee !== 0 && b.fee !== "0" && b.fee !== "") {
				b.minimumBid = parseFloat(b.fee);
				b.fee = parseFloat(b.fee) + 1;
			} else {
				b.minimumBid = 1;
			}
			return b;
		});

		selectedPackages.forEach((b) => {
			minimumBidBundles += b.minimumBid;
		});

		minimumBidBundles /= 2;

		this.baseDir = `${assetsBaseDir}../`;
		this.single = "SINGLE";
		this.all = "ALL";
		this.state = {
			companyUpdated: false,
			content: props.listing,
			company: props.company,
			allowMultiple,
			spinner: false,
			tab: props.tab || "bundles",
			buyingMode: props.tab && props.tab === "checkout",
			bidMethod: (selectedPackages.length === 1 || !allowMultiple) ? this.single : this.all,
			soldOut: false,
			selectedPackages: selectedPackages || {},
			bundles: selectedPackages,
			minimumBidBundles,
			editCompanyOpen: false,
			bidApplied: false,
			openContactSellerModal: false,
			signatureName: `${props.user.firstName} ${props.user.lastName}`,
			signaturePosition: props.user.title,
			showSuccessScreen: false,
		};
	}

	closeModal = () => {
		this.setState({ editCompanyOpen: false, companyUpdated: true });
	};

	closeSuccessScreen = () => {
		const { history } = this.props;
		history.push("/marketplace");
	};

	getInstallments = () => {
		const { selectedPackages } = this.state;

		const result = selectedPackages.filter(b => b.salesMethod === "BIDDING").sort((a, b) => selectedPackages.filter(v => v.installments.length === a.installments.length).length
			- selectedPackages.filter(v => v.installments.length === b.installments.length).length).pop();

		if (!result) return;

		return result.installments;
	};

	editCompany = () => {
		const { company } = this.state;

		return (
			<Modal
				isOpen={this.state.editCompanyOpen}
				onRequestClose={this.closeModal}
				bodyOpenClassName="selector"
				style={customStyles}
				contentLabel="Example Modal"
			>

				<div className="modal-title">
					Company Information


					<i className="fa fa-times-circle-o close-icon" onClick={this.closeModal} />
				</div>

				<div className="step-content">
					<div className="step-content-container">

						<div className="base-full-input">
							<label style={labelStyle}>
								Legal name


							</label>
							<input
								type="text"
								style={inputStyle}
								onChange={(e) => {
									company.legalName = e.target.value;
									this.setState({ company });
								}}
								value={company.legalName}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								Registration number


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.registrationNumber = e.target.value;
									this.setState({ company });
								}}
								value={company.registrationNumber}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								VAT ID number


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.vat = e.target.value;
									this.setState({ company });
								}}
								value={company.vat}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								Address 1


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.address = e.target.value;
									this.setState({ company });
								}}
								value={company.address}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								Address 2


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.address2 = e.target.value;
									this.setState({ company });
								}}
								value={company.address2}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								City


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.city = e.target.value;
									this.setState({ company });
								}}
								value={company.city}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								ZIP code


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									company.zip = e.target.value;
									this.setState({ company });
								}}
								value={company.zip}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								Country


							</label>
							<CountrySelector
								multi={false}
								onChange={(value) => {
									company.country.name = value.label;
									this.setState({ company });
								}}
								value={{ value: company.country.name, label: company.country.name }}
							/>
						</div>


					</div>
				</div>

				<div className="buttons">
					{companyIsValid(company) && (
						<button
							className="standard-button"
							onClick={this.closeModal}
						>
							Ok


						</button>
					)}

					{!companyIsValid(company) && (
						<button
							className="standard-button"
							disabled
						>
							Ok


						</button>
					)}
				</div>
			</Modal>
		);
	};

	successScreen = () => {
		const { history } = this.props;
		const { bundles } = this.state;

		const biddingBundles = bundles.filter(bundle => bundle.salesMethod === BUNDLE_SALES_METHOD.BIDDING).length;
		const fixedBundles = bundles.filter(bundle => bundle.salesMethod === BUNDLE_SALES_METHOD.FIXED).length;

		return (
			<Modal
				isOpen={this.state.showSuccessScreen}
				onRequestClose={this.closeSuccessScreen}
				bodyOpenClassName="selector"
				style={customStyles}
			>

				<div style={{
					color: "grey",
					padding: 20,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				>
					<div style={{
						fontSize: 30,
						width: 600,
						textAlign: "center",
						fontWeight: 600,
					}}
					>
						{this.context.t("CHECKOUT_CONGRATULATIONS")}
					</div>
					{fixedBundles > 0 && (
						<div
							style={{
								fontSize: 20,
								width: 600,
								margin: 40,
								textAlign: "center",
							}}
						>
							{this.context.t("CHECKOUT_FIXED_SUCCESS_MESSAGE")}
						</div>
					)}
					{fixedBundles === 0 && biddingBundles > 0 && (
						<div
							style={{
								fontSize: 20,
								width: 600,
								margin: 40,
								textAlign: "center",
							}}
						>
							{this.context.t("CHECKOUT_BID_SUCCESS_MESSAGE")}
						</div>
					)}

					<div style={{ display: "flex" }}>
						{fixedBundles > 0 && (
							<button
								className="standard-button"
								onClick={() => {
									history.push("/closeddeals");
								}}
							>
								{this.context.t("CHECKOUT_FIXED_GO_TO_CLOSED_DEALS")}
							</button>
						)}

						{fixedBundles === 0 && biddingBundles > 0 && (
							<button
								className="standard-button"
								onClick={() => {
									history.push("/bids/activebids");
								}}
							>
								{this.context.t("CHECKOUT_FIXED_GO_TO_BIDS")}
							</button>
						)}

						<button className="standard-button" onClick={this.closeSuccessScreen}>
							{this.context.t("CHECKOUT_FIXED_GO_TO_MARKETPLACE")}
						</button>
					</div>
				</div>

			</Modal>
		);
	};

	getBundleTotalFee = (fee) => {
		const total = parseFloat(fee);
		return total + this.getTechnicalFeeValue(total);
	};

	getTotalFee = () => {
		const {
			selectedPackages,
			multipleBidValue,
			bidMethod,
		} = this.state;

		const total = selectedPackages.filter(b => !(b.salesMethod === "BIDDING" && bidMethod === this.all)).reduce((a, b) => {
			if (a.fee === undefined && b.fee === undefined) return { fee: 0 };
			if (a.fee === undefined) return { fee: parseFloat(b.fee) };
			if (b.fee === undefined) return { fee: parseFloat(a.fee) };
			return { fee: parseFloat(b.fee) + parseFloat(a.fee) };
		}, { fee: 0 });

		if (bidMethod === this.all) total.fee += multipleBidValue;

		total.withTechnical = total.fee + this.getTechnicalFeeValue(total.fee);

		return total;
	};

	placeBid = () => {
		const {
			signature,
			content,
			companyUpdated,
			company,
			signatureName,
			signaturePosition,
			bundles,
			multipleBidValue,
			bidMethod,
		} = this.state;

		this.props.disableValidation();
		this.setState({ spinner: true });

		const bids = bundles.map(bundle => ({
			amount: (bidMethod === this.all && bundle.salesMethod === "BIDDING") ? multipleBidValue : parseFloat(bundle.fee),
			salesPackage: bundle.id,
			salesMethod: bundle.salesMethod,
			totalFee: (bidMethod === this.all && bundle.salesMethod === "BIDDING") ? this.getBundleTotalFee(multipleBidValue) : this.getBundleTotalFee(bundle.fee),
		}));

		const bidObj = {
			signature,
			signatureName,
			signaturePosition,
			totalFee: this.getTotalFee(),
			content: content.id,
			bids,
			multiple: bidMethod === this.all,
		};

		if (companyUpdated) {
			bidObj.company = company;
		}

		ContentArena.ContentApi.placeBids(bidObj).then((r) => {
			this.setState({ showSuccessScreen: true, soldOut: r.soldOut, spinner: false });
		});
	};

	getTechnicalFee = () => {
		const { content } = this.state;

		const response = {
			TECHNICAL_FEE: "",
			TECHNICAL_FEE_PERCENTAGE: 0,
		};

		const selected = (content.rightsPackage && content.rightsPackage[0] && content.rightsPackage[0].selectedRights) ? content.rightsPackage[0].selectedRights : null;

		if (selected) {
			response.TECHNICAL_FEE = selected.TECHNICAL_FEE;
			response.TECHNICAL_FEE_PERCENTAGE = selected.TECHNICAL_FEE_PERCENTAGE;
		}

		return selected;
	};

	getTechnicalFeeValue = (bid) => {
		const technicalFee = this.getTechnicalFee();
		if (!bid) return 0;

		return technicalFee && technicalFee.TECHNICAL_FEE === "ON_TOP"
			? bid * (technicalFee.TECHNICAL_FEE_PERCENTAGE / 100)
			: 0;
	};

	getFee = (salesPackage) => {
		const feeNumber = parseFloat(salesPackage.fee);
		return (
			<NumberFormat
				thousandSeparator
				value={feeNumber}
				displayType="text"
				prefix={`${getCurrencySymbol(salesPackage.currency.code)} `}
			/>
		);
	};

	buttonDisabled = () => {
		const {
			terms,
			signature,
			signatureName,
			signaturePosition,
			bundles,
			bidMethod,
			multipleBidValue,
			minimumBidBundles,
		} = this.state;
		// const validateMinimumBid = this.getCheckoutType() === 'RAISE_BID' ? parseFloat(bid) > parseFloat(minimumBid) : parseFloat(bid) >= parseFloat(minimumBid);
		// return bid && parseFloat(bid) !== 0 && validateMinimumBid;
		return !terms
			|| !signature
			|| signatureName === ""
			|| signaturePosition === ""
			|| bundles.filter((b) => {
				const fee = parseFloat(b.fee);
				return bidMethod !== this.all === b.salesMethod === "BIDDING" && fee <= b.minimumBid;
			}).length > 0
			|| (bidMethod === this.all && !multipleBidValue)
			|| (bidMethod === this.all && multipleBidValue < minimumBidBundles);
	};

	getCompanyAddress = () => {
		const { company } = this.state;
		return [company.legalName, company.address, company.zip, company.country.name].join(", ");
	};

	openEditCompany = () => {
		this.setState({ editCompanyOpen: true });
	};

	setTermsAndConditions = (e) => {
		this.setState({ terms: e.target.checked });
	};

	getMinBid = (bundle) => {
		const { minimumBidBundles, bidMethod } = this.state;

		if (!bundle.minimumBid || (bidMethod === this.all && !bundle.all)) return <span>-</span>;

		return (
			<NumberFormat
				thousandSeparator
				value={bundle.all ? minimumBidBundles : bundle.salesMethod === "FIXED" ? parseFloat(bundle.fee) : parseFloat(bundle.minimumBid)}
				displayType="text"
				prefix={`${getCurrencySymbol(bundle.currency.code)} `}
			/>
		);
	};

	removeBundle = (index) => {
		const bundles = this.state.selectedPackages;

		bundles.splice(index, 1);

		const allowMultiple = bundles.filter(b => b.salesMethod === "BIDDING").length > 1;
		const bidMethod = (bundles.length === 1 || !allowMultiple) ? this.single : this.all;


		this.setState({ bundles, bidMethod, allowMultiple });
	};

	isBundleDisabled = (bundle) => {
		const { bidMethod } = this.state;
		return bidMethod === this.all && !bundle.all && bundle.salesMethod === "BIDDING";
	};

	componentDidUpdate() {
		if (this.state.isBidInputEdit) {
			this.bidInput.focus();
		}

		if (this.state.isBidMultInputEdit) {
			this.bidMultInput.focus();
		}
	}

	render() {
		ReactTooltip.rebuild();
		const { listing, validation } = this.props;
		const {
			content,
			signature,
			signatureName,
			signaturePosition,
			bid,
			multipleBidValue,
			company,
			spinner,
			bidMethod,
			terms,
			allowMultiple,
		} = this.state;

		const { selectedPackages } = this.state;

		const isTermsInvalid = !terms && validation;
		const total = this.getTotalFee();
		const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
		const columns = [
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_TERRITORY_BUNDLE"),
				headerClassName: selectedPackages.length > 15 ? "table-header-big scroll" : "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="d-flex align-items-center">

							{bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
								<img src={packageIcon} style={{ marginRight: 5 }} />
							)}

							<span>
								{bundle.name}
							</span>

							{bundle.extraTerritories && bundle.extraTerritories.length > 3 && (
								<ExtraTerritories
									excluded={bundle.territoriesMethod === "WORLDWIDE_EXCLUDING"}
									showAll={bundle.regionNamed}
									extraTerritories={bundle.extraTerritories}
								/>
							)}
						</div>
					);
				},
			},
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_DETAILS"),
				headerClassName: "table-header-big",
				width: 300,
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="details-wrapper">
							{(bundle.salesMethod === "FIXED" || bidMethod !== this.all)
							&& (
								<a
									className="bid-license"
									target="_blank"
									href={getCustomLicenseUrl(content.customId, bundle.id, bid, company)}
									title={this.context.t("CHECKOUT_LICENSE_AGREEMENT")}
								>
									<img src={pdfIcon} alt="Licence" />
									<span>{this.context.t("License agreement")}</span>
								</a>
							)}

							{bundle.all
							&& (
								<a
									className="bid-license"
									target="_blank"
									href={getCustomLicenseUrlBids(content.customId, selectedPackages, multipleBidValue, company, true)}
									title={this.context.t("CHECKOUT_LICENSE_AGREEMENT")}
								>
									<img src={pdfIcon} alt="Licence" />
									<span>{this.context.t("License agreement")}</span>
								</a>
							)}

							{bundle.all
							&& <Installments installments={this.getInstallments()} />}
							{!bundle.all && (bundle.salesMethod === "FIXED" || bidMethod !== this.all)
							&& <Installments installments={bundle.installments} />}
						</div>
					);
				},
			},
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID"),
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div
							className={cn("price-action-wrapper", { "price-action-center": bundle.salesMethod === "FIXED" || this.isBundleDisabled(bundle) })}
						>
							<div
								title={bundle.fee}
								className={cn({ "price-invalid": !bundle.all && bidMethod !== this.all && bundle.minimumBid && Number(bundle.minimumBid) >= Number(bundle.fee) })}
							>
								{this.getMinBid(bundle)}
							</div>
						</div>
					);
				},
			},
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_PRICE_YOUR_BID"),
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					const style = { height: "28px", width: "100%" };
					if (bidMethod === this.all && !bundle.all) style.backgroundColor = "#666";
					return (
						<div className={cn("price-action-wrapper")}>
							<div title={bundle.fee}>
								{bundle.salesMethod === "FIXED" && +bundle.fee > 0 && this.getFee(bundle)}
								{bundle.salesMethod === "BIDDING" && !bundle.all
								&& (
									<NumberFormat
										thousandSeparator
										value={bidMethod === this.all && !bundle.all ? undefined : bundle.fee}
										onValueChange={(values) => {
											const { value } = values;
											const bundles = this.state.selectedPackages;
											bundle.fee = value;
											bundles[props.index] = bundle;
											this.setState({ bundles, isBidInputEdit: true });
										}}
										disabled={bidMethod === this.all && !bundle.all}
										min={bundle.minimumBid}
										style={style}
										prefix={`${getCurrencySymbol(bundle.currency)} `}
										getInputRef={elm => this.bidInput = elm}
										onBlur={() => this.setState({ isBidInputEdit: false })}
									/>
								)}
								{bundle.all
								&& (
									<NumberFormat
										thousandSeparator
										value={multipleBidValue}
										onValueChange={(values) => {
											const { value } = values;
											this.setState({ multipleBidValue: parseFloat(value), isBidMultInputEdit: true });
										}}
										min={0}
										style={style}
										prefix={`${getCurrencySymbol(bundle.currency)} `}
										getInputRef={elm => this.bidMultInput = elm}
										onBlur={() => this.setState({ isBidMultInputEdit: false })}
									/>
								)}
							</div>
						</div>
					);
				},
			},
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_TECHNICAL_FEE"),
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					// console.log(bundle)
					return (
						<div className="price-action-wrapper">
							<div title={bundle.fee}>
								{this.isBundleDisabled(bundle) && <span>-</span>}
								{!this.isBundleDisabled(bundle) && (
									<NumberFormat
										thousandSeparator
										value={this.getTechnicalFeeValue(bundle.all ? multipleBidValue : bundle.fee)}
										displayType="text"
										prefix={`${getCurrencySymbol(selectedPackages[0].currency.code)} `}
									/>
								)}
							</div>
						</div>
					);
				},
			},
			{
				Header: this.context.t("SALES_PACKAGE_TABLE_TOTAL"),
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="price-action-wrapper">
							<div title={bundle.fee}>
								{!this.isBundleDisabled(bundle) && (
									<NumberFormat
										thousandSeparator
										value={this.getBundleTotalFee(bundle.all ? multipleBidValue : bundle.fee)}
										displayType="text"
										prefix={`${getCurrencySymbol(selectedPackages[0].currency.code)} `}
									/>
								)}
							</div>
							{!bundle.all && selectedPackages.length > 1
							&& <i className="fa fa-minus-circle" onClick={() => this.removeBundle(props.index)} />}
						</div>
					);
				},
			},
		];

		return (
			<div className="bid-wrapper">
				{this.editCompany()}
				{this.successScreen()}

				<div className="bid-header">
					<div className="name">
						{listing.name}
					</div>
				</div>
				<div className="bid-info-wrapper">
					{selectedPackages.length > 1 && allowMultiple && (
						<RadioSelector
							value={bidMethod}
							onChange={bidMethod => this.setState({ bidMethod })}
							className="bid-list-mode"
							items={[
								{ value: this.single, label: "Place bids for territories individually" },
								{ value: this.all, label: "Place one bid for all territories" },
							]}
						/>
					)}

					<ReactTable
						className={cn("ca-table round-0 bundles-table bundles-table-checkout", { showScroll: selectedPackages.length > 15 })}
						defaultPageSize={242} // max number of possible Territorial Bundles
						showPageSizeOptions={false}
						noDataText={null}
						showPagination={false}
						minRows={0}
						resizable={false}
						data={selectedPackages}
						columns={columns}
					/>

					{bidMethod === this.all && selectedPackages.length > 1 && (
						<ReactTable
							className="ca-table round-0 bundles-table bundles-table-checkout"
							style={{ marginTop: 20 }}
							data={[{
								name: "All territories",
								fee: 0,
								currency: selectedPackages[0].currency,
								salesMethod: "BIDDING",
								minimumBid: Math.max.apply(Math, selectedPackages.map(o => o.minimumBid)),
								all: true,
							}]}
							TheadComponent={TheadComponent}
							columns={columns}
							showPageSizeOptions={false}
							noDataText={null}
							showPagination={false}
							minRows={0}
							resizable={false}
						/>
					)}

					{selectedPackages.length > 1 && (
						<div className="total-fee">
							<span style={{ marginRight: 20 }}>TOTAL</span>
							<NumberFormat
								thousandSeparator
								value={this.getTechnicalFeeValue(total.fee) + total.fee}
								displayType="text"
								prefix={`${getCurrencySymbol(selectedPackages[0].currency.code)} `}
							/>
						</div>
					)}

				</div>

				{/* COMPANY INFORMATION */}
				<div className="bid-address-license">
					<div className="bid-title">
						{this.context.t("SALES_PACKAGE_COMPANY_ADDRESS")}
					</div>
					<div className="bid-address">
						<span>{this.getCompanyAddress()}</span>
						<i className="fa fa-pencil-square-o" onClick={this.openEditCompany} />
					</div>
				</div>

				{/* SIGNATURE */}
				<div className="bid-signature">
					<DigitalSignature
						customClass="for-listing"
						noLabel
						noInfo
						title={this.context.t("PLEASE_SIGN_WITH_YOUR_CURSOR")}
						signature={signature}
						signatureName={signatureName}
						signaturePosition={signaturePosition}
						onChangeSignatureName={(e) => {
							this.setState({ signatureName: e.target.value });
						}}
						onChangeSignaturePosition={(e) => {
							this.setState({ signaturePosition: e.target.value });
						}}
						onReady={(signature) => {
							this.setState({ signature });
						}}
					/>
				</div>

				<div className="bid-signature-btns">
					<GeneralTerms
						defaultChecked={terms}
						value={terms}
						onChange={e => this.setTermsAndConditions(e)}
						isInvalid={isTermsInvalid}
					/>

					<Loader loading={spinner} small>
						<button
							className="ca-btn primary"
							disabled={this.buttonDisabled()}
							onClick={this.placeBid}
						>
							{this.context.t("CHECKOUT_COMPLETE_TRANSACTION")}
						</button>
					</Loader>
				</div>
			</div>
		);
	}
}

Checkout.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Checkout);
