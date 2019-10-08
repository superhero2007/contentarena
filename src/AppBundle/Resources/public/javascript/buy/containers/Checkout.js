import React, { Fragment } from "react";
import { connect } from "react-redux";
import cn from "classnames";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { PropTypes } from "prop-types";
import NumberFormat from "react-number-format";
import ReactTable from "react-table";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import { pdfIcon, packageIcon } from "../../main/components/Icons";
import Installments from "../components/Installments";
import DigitalSignature from "../../main/components/DigitalSignature";
import {
	getCurrencySymbol, getCustomLicenseUrl,
} from "../../main/actions/utils";
import { customStyles, GenericModalStyle } from "../../main/styles/custom";
import companyIsValid from "../../sell/actions/validationActions";
import CountrySelector from "../../main/components/CountrySelector";
import { DATE_FORMAT } from "@constants";
import GeneralTerms from "../../main/components/GeneralTerms";
import { disableValidation, enableValidation } from "../../main/actions/validationActions";
import ExtraTerritories from "../../main/components/ExtraTerritories";
import Loader from "../../common/components/Loader";
import { BUNDLE_SALES_METHOD } from "../../common/constants";
import { GhostModeDisabledMessage } from "../../common/components/Utils/Utils";

const labelStyle = {
	height: "35px",
	fontSize: "14px",
	width: "100%",
	padding: "0 20px",
};
const inputStyle = {
	width: "100%",
	margin: 0,
	height: "40px",
	padding: "0 20px",
};

class Checkout extends React.Component {
	constructor(props) {
		super(props);

		const selectedPackages = cloneDeep(props.selectedPackages)
			.map((b) => {
				if (b.salesMethod === "BIDDING" && b.fee && b.fee !== "0") {
					b.minimumBid = parseFloat(b.fee);
					b.fee = "";
				} else {
					b.minimumBid = 1;
				}
				return b;
			});

		this.single = "SINGLE";
		this.all = "ALL";
		this.state = {
			companyUpdated: false,
			content: props.listing,
			company: props.company,
			spinner: false,
			soldOut: false,
			selectedPackages: selectedPackages || {},
			bundles: selectedPackages,
			focusedInputId: "",
			editCompanyOpen: false,
			openContactSellerModal: false,
			signatureName: `${props.user.firstName} ${props.user.lastName}`,
			signaturePosition: props.user.title,
			showSuccessScreen: false,
			showConfirmScreen: false,
			message: "",
		};
	}

	componentDidUpdate() {
		const { focusedInputId } = this.state;

		if (focusedInputId && this[`${focusedInputId}-input`]) {
			setTimeout(() => {
				this[`${focusedInputId}-input`].querySelector("input")
					.focus();
			}, 0);
		}
	}

	closeModal = () => {
		this.setState({
			editCompanyOpen: false,
			companyUpdated: true,
		});
	};

	closeSuccessScreen = () => {
		const { history } = this.props;
		history.push("/marketplace");
	};

	toggleConfirmScreen = () => {
		this.setState(state => ({
			showConfirmScreen: !state.showConfirmScreen,
		}));
	};

	getInstallments = () => {
		const { selectedPackages } = this.state;

		const result = selectedPackages.filter(b => b.salesMethod === "BIDDING")
			.sort((a, b) => selectedPackages.filter(v => v.installments.length === a.installments.length).length
				- selectedPackages.filter(v => v.installments.length === b.installments.length).length)
			.pop();

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

				<div className="modal-title" style={{ paddingBottom: 15 }}>
					<Translate i18nKey="Company Information" />
					<i className="fa fa-times close-icon" onClick={this.closeModal} />
				</div>

				<div className="step-content custom">
					<div className="step-content-container">

						<div className="base-full-input">
							<label style={labelStyle}>
								<Translate i18nKey="Legal name" />
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
								<Translate i18nKey="Registration number" />
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
								<Translate i18nKey="LISTING_DETAILS_SELLER_TITLE_ADDRESS" />
								{" "}
								1


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
								<Translate i18nKey="LISTING_DETAILS_SELLER_TITLE_ADDRESS" />
								{" "}
								2


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
								<Translate i18nKey="City" />
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
								<Translate i18nKey="ZIP code" />
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
								<Translate i18nKey="Country" />
							</label>
							<CountrySelector
								multi={false}
								onChange={(value) => {
									company.country.name = value.label;
									this.setState({ company });
								}}
								value={{
									value: company.country.name,
									label: company.country.name,
								}}
							/>
						</div>


					</div>
				</div>

				<div className="buttons popup-buttons">
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
						<Translate i18nKey="CHECKOUT_CONGRATULATIONS" />
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
							<Translate i18nKey="CHECKOUT_FIXED_SUCCESS_MESSAGE" />
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
							<Translate i18nKey="CHECKOUT_BID_SUCCESS_MESSAGE" />
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
								<Translate i18nKey="CHECKOUT_FIXED_GO_TO_CLOSED_DEALS" />
							</button>
						)}

						{fixedBundles === 0 && biddingBundles > 0 && (
							<button
								className="standard-button"
								onClick={() => {
									history.push("/bids/activebids");
								}}
							>
								<Translate i18nKey="CHECKOUT_FIXED_GO_TO_BIDS" />
							</button>
						)}

						<button className="standard-button" onClick={this.closeSuccessScreen}>
							<Translate i18nKey="CHECKOUT_FIXED_GO_TO_MARKETPLACE" />
						</button>
					</div>
				</div>

			</Modal>
		);
	};

	confirmScreen = () => {
		const { showConfirmScreen } = this.state;

		return (
			<Modal
				isOpen={showConfirmScreen}
				onRequestClose={this.toggleConfirmScreen}
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
						<Translate i18nKey="CMS_CHECKOUT_CONFIRM_TITLE" />
					</div>
					<div
						style={{
							fontSize: 20,
							width: 600,
							margin: 40,
							textAlign: "center",
						}}
					>
						<Translate i18nKey="CMS_CHECKOUT_CONFIRM_CONTENT" />
					</div>
					<div style={{ display: "flex" }}>
						<button className="standard-button ca-btn disabled" onClick={this.toggleConfirmScreen}>
							<Translate i18nKey="CMS_CHECKOUT_CONFIRM_CANCEL" />
						</button>

						<button
							className="standard-button ca-btn"
							onClick={this.placeBid}
						>
							<Translate i18nKey="CMS_CHECKOUT_CONFIRM_BUTTON" />
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

	getTotalFee = (packages) => {
		if (!packages.length) return { fee: 0 };

		const total = packages.reduce((a, b) => {
			if (a.fee === undefined && b.fee === undefined) return { fee: 0 };
			if (a.fee === undefined) return { fee: parseFloat(b.fee) };
			if (b.fee === undefined) return { fee: parseFloat(a.fee) };
			return { fee: parseFloat(b.fee) + parseFloat(a.fee) };
		}, { fee: 0 });

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
		} = this.state;

		this.props.disableValidation();
		this.setState({ spinner: true, showConfirmScreen: false });

		const bids = bundles.map(bundle => ({
			amount: parseFloat(bundle.fee),
			salesPackage: bundle.id,
			salesMethod: bundle.salesMethod,
			totalFee: this.getBundleTotalFee(bundle.fee),
		}));

		const bidObj = {
			signature,
			signatureName,
			signaturePosition,
			totalFee: this.getTotalFee(bundles),
			content: content.id,
			bids,
			multiple: false,
		};

		if (companyUpdated) {
			bidObj.company = company;
		}

		ContentArena.ContentApi.placeBids(bidObj)
			.then((r) => {
				this.setState({
					showSuccessScreen: true,
					soldOut: r.soldOut,
					spinner: false,
				});
			});

		this.onMessage();
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
		if (!bid) return 0;
		const technicalFee = this.getTechnicalFee();

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
		} = this.state;

		return !terms
			|| !signature
			|| !signatureName
			|| (signatureName && signatureName.trim() === "")
			|| !signaturePosition
			|| (signaturePosition && signaturePosition.trim() === "")
			|| bundles.length === 0
			|| bundles.some(b => b.salesMethod === "BIDDING" && (!b.fee || parseFloat(b.fee) < parseFloat(b.minimumBid)));
	};

	getCompanyAddress = () => {
		const { company } = this.state;
		return [company.legalName, company.address, company.zip, company.country.name].join(", ");
	};

	openEditCompany = () => this.setState({ editCompanyOpen: true });

	setTermsAndConditions = e => this.setState({ terms: e.target.checked });

	clearInputFocus = () => this.setState({ focusedInputId: "" });

	getMinBid = (bundle) => {
		if (!bundle.minimumBid) return <span>-</span>;
		if (bundle.minimumBid && (+bundle.minimumBid) === 1) return <span><Translate i18nKey="SALES_PACKAGE_TABLE_MINIMUM_BID_ONE" /></span>;

		return (
			<NumberFormat
				thousandSeparator
				value={bundle.salesMethod === BUNDLE_SALES_METHOD.FIXED ? parseFloat(bundle.fee) : parseFloat(bundle.minimumBid)}
				displayType="text"
				prefix={`${getCurrencySymbol(bundle.currency.code)} `}
			/>
		);
	};

	handleChangeYourBid = (values, id) => {
		const { value } = values;
		if (!value) return;
		const { bundles } = this.state;

		bundles.find(item => item.id === id).fee = value;

		this.setState({
			focusedInputId: id,
			bundles,
		});
	};

	removeBundle = (id) => {
		const { bundles } = this.state;
		const filtered = bundles.filter(item => item.id !== id);

		this.setState({
			bundles: filtered,
		});
	};

	getColumn(packages, type) {
		const { content, bid, company } = this.state;
		const tableStart = [
			{
				Header: <Translate i18nKey="SALES_PACKAGE_TABLE_TERRITORY_BUNDLE" />,
				headerClassName: packages.length > 15 ? "table-header-big scroll" : "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="d-flex align-items-center">

							{bundle.bundleMethod === "SELL_AS_BUNDLE" && bundle.territories.length > 1 && (
								<img src={packageIcon} style={{ marginRight: 5 }} alt="" />
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
				Header: <Translate i18nKey="SALES_PACKAGE_TABLE_DETAILS" />,
				headerClassName: "table-header-big",
				width: 300,
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="details-wrapper">
							<a
								className="bid-license"
								target="_blank"
								rel="noopener noreferrer"
								href={getCustomLicenseUrl(content.customId, bundle.id, bid, company)}
								title={this.context.t("CHECKOUT_LICENSE_AGREEMENT")}
							>
								<img src={pdfIcon} alt="Licence" />
								<span><Translate i18nKey="License agreement" /></span>
							</a>

							{bundle.salesMethod === BUNDLE_SALES_METHOD.BIDDING
								? (<Installments installments={this.getInstallments()} />)
								: (<Installments installments={bundle.installments} />)
							}
						</div>
					);
				},
			},
			{
				Header: type === BUNDLE_SALES_METHOD.FIXED
					? <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE" />
					: <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID" />,
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="price-action-wrapper">
							<div
								title={bundle.minimumBid}
								className={cn({
									"price-invalid": bundle.minimumBid
									&& bundle.minimumBid !== 1
									&& Number(bundle.minimumBid) > Number(bundle.fee),
								})}
							>
								{this.getMinBid(bundle)}
							</div>
						</div>
					);
				},
			},
		];
		const yourBid = [
			{
				Header: <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_YOUR_BID" />,
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="price-action-wrapper" ref={el => this[`${bundle.id}-input`] = el}>
							<div title={bundle.fee}>
								{bundle.salesMethod === "FIXED" && +bundle.fee > 0 && this.getFee(bundle)}
								{bundle.salesMethod === "BIDDING" && (
									<NumberFormat
										thousandSeparator
										value={bundle.fee}
										onValueChange={values => this.handleChangeYourBid(values, bundle.id)}
										min={bundle.minimumBid}
										prefix={`${getCurrencySymbol(bundle.currency.code)} `}
										onBlur={this.clearInputFocus}
									/>
								)}
							</div>
						</div>
					);
				},
			},
		];
		const tableEnd = [
			{
				Header: <Translate i18nKey="SALES_PACKAGE_TABLE_TECHNICAL_FEE" />,
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="price-action-wrapper">
							<div title={bundle.fee}>
								{<NumberFormat
									thousandSeparator
									value={this.getTechnicalFeeValue(bundle.fee)}
									displayType="text"
									prefix={`${getCurrencySymbol(bundle.currency.code)} `}
								/>}
							</div>
						</div>
					);
				},
			},
			{
				Header: <Translate i18nKey="SALES_PACKAGE_TABLE_TOTAL" />,
				headerClassName: "table-header-big",
				Cell: (props) => {
					const bundle = props.original;
					return (
						<div className="price-action-wrapper">
							<div title={bundle.fee}>
								<NumberFormat
									thousandSeparator
									value={this.getBundleTotalFee(bundle.fee)}
									displayType="text"
									prefix={`${getCurrencySymbol(bundle.currency.code)} `}
								/>
							</div>
							<i className="fa fa-minus-circle" onClick={() => this.removeBundle(bundle.id)} />
						</div>
					);
				},
			},
		];

		return type === BUNDLE_SALES_METHOD.FIXED
			? [...tableStart, ...tableEnd]
			: [...tableStart, ...yourBid, ...tableEnd];
	}

	onChangeMessage = e => this.setState({ message: e.target.value });

	onMessage = () => {
		const { message, content } = this.state;

		if (message === "") return;

		const payload = {
			listing: content.id,
			recipient: content.company.id,
			content: message,
			role: "BUYER",
		};

		ContentArena.ContentApi.sendMessage(payload)
			.then()
			.always(
				() => this.setState({ message: "" }),
			);
	};

	render() {
		ReactTooltip.rebuild();
		const { listing, validation, common } = this.props;
		const {
			signature,
			signatureName,
			signaturePosition,
			spinner,
			terms,
			bundles,
			message,
		} = this.state;

		const { ghostMode } = common;
		const isTermsInvalid = !terms && validation;

		const fixedPackages = bundles.filter(item => item.salesMethod === BUNDLE_SALES_METHOD.FIXED);
		const biddingPackages = bundles.filter(item => item.salesMethod === BUNDLE_SALES_METHOD.BIDDING);

		const fixedTotal = fixedPackages.length > 0 && this.getTotalFee(fixedPackages);
		const biddingTotal = biddingPackages.length > 0 && this.getTotalFee(biddingPackages);

		return (
			<div className="bid-wrapper">
				{this.editCompany()}
				{this.successScreen()}
				{this.confirmScreen()}

				<div className="bid-header">
					<div className="name">
						{listing.name}
					</div>
				</div>
				<div className="bid-info-wrapper">
					{biddingPackages.length > 0 && (
						<Fragment>
							<div className="checkout-title">
								<Translate i18nKey="SALES_PACKAGE_BIDDING_TITLE" />
							</div>
							<div className="checkout-subtitle">
								<Translate i18nKey="SALES_PACKAGE_BIDDING_SUB_TITLE" />
							</div>
							<ReactTable
								className={cn("ca-table round-0 bundles-table bundles-table-checkout", { showScroll: biddingPackages.length > 15 })}
								defaultPageSize={242} // max number of possible Territorial Bundles
								showPageSizeOptions={false}
								noDataText={null}
								showPagination={false}
								minRows={0}
								resizable={false}
								data={biddingPackages}
								// resolveData={data => console.log(data)}
								columns={this.getColumn(cloneDeep(biddingPackages), BUNDLE_SALES_METHOD.BIDDING)}
							/>
							<div className="total-fee">
								<span style={{ marginRight: 20 }}>TOTAL</span>
								<NumberFormat
									thousandSeparator
									value={this.getTechnicalFeeValue(biddingTotal.fee) + biddingTotal.fee}
									displayType="text"
									prefix={`${getCurrencySymbol(biddingPackages[0].currency.code)} `}
								/>
							</div>
						</Fragment>
					)}

					{fixedPackages.length > 0 && (
						<Fragment>
							<div className="checkout-title">
								<Translate i18nKey="SALES_PACKAGE_FIXED_TITLE" />
							</div>
							<div className="checkout-subtitle">
								<Translate i18nKey="SALES_PACKAGE_FIXED_SUB_TITLE" />
							</div>
							<ReactTable
								className={cn("ca-table round-0 bundles-table bundles-table-checkout", { showScroll: fixedPackages.length > 15 })}
								defaultPageSize={242} // max number of possible Territorial Bundles
								showPageSizeOptions={false}
								noDataText={null}
								showPagination={false}
								minRows={0}
								resizable={false}
								data={fixedPackages}
								// resolveData={data => console.log(data)}
								columns={this.getColumn(cloneDeep(fixedPackages), BUNDLE_SALES_METHOD.FIXED)}
							/>
							<div className="total-fee">
								<span style={{ marginRight: 20 }}>TOTAL</span>
								<NumberFormat
									thousandSeparator
									value={this.getTechnicalFeeValue(fixedTotal.fee) + fixedTotal.fee}
									displayType="text"
									prefix={`${getCurrencySymbol(fixedPackages[0].currency.code)} `}
								/>
							</div>
						</Fragment>
					)}
				</div>

				{/* COMPANY INFORMATION */}
				<div className="bid-info-wrapper">
					<div className="checkout-title">
						<Translate i18nKey="SALES_PACKAGE_COMPANY_ADDRESS" />
					</div>
					<div className="checkout-subtitle">
						<Translate i18nKey="SALES_PACKAGE_COMPANY_SUB_TITLE" />
					</div>

					<div
						className="total-fee"
						 style={{
						 	 justifyContent: "space-between",
							 cursor: "pointer",
							 margin: 0,
						 }}
						 onClick={this.openEditCompany}
					>
						<span style={{ fontSize: 14 }}>
							{this.getCompanyAddress()}
						</span>
						<i className="fa fa-pencil-square-o" />
					</div>

				</div>

				<div
					className="bid-signature"
					style={{
						marginTop: 0,
					}}
				>
					<div className="checkout-title">
						<Translate i18nKey="CHECKOUT_MESSAGE_BOX_TITLE" />
					</div>
					<div className="checkout-subtitle">
						<Translate i18nKey="CHECKOUT_MESSAGE_BOX_SUBTITLE" />
					</div>
					<div style={{
						marginBottom: 15,
					}}
					>
						<textarea
							style={{
								borderRadius: 5,
								border: "1px solid #999999",
								padding: 20,
							}}
							placeholder={this.context.t("MESSAGE_PLACEHOLDER")}
							value={message}
							onChange={this.onChangeMessage}
						/>
					</div>
				</div>

				{/* SIGNATURE */}
				<div className="bid-signature">
					<div className="checkout-title">
						<Translate i18nKey="SALES_PACKAGE_SIGNATURE_TITLE" />
					</div>
					<div className="checkout-subtitle">
						<Translate i18nKey="SALES_PACKAGE_SIGNATURE_SUB_TITLE" />
					</div>
					<DigitalSignature
						customClass="for-listing"
						noLabel
						noInfo
						title="PLEASE_SIGN_WITH_YOUR_CURSOR"
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
							disabled={this.buttonDisabled() || ghostMode}
							onClick={this.toggleConfirmScreen}
						>
							<Translate i18nKey="CHECKOUT_COMPLETE_TRANSACTION" />
							{ghostMode && <GhostModeDisabledMessage />}
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

const mapStateToProps = state => ({
	validation: state.validation,
	common: state.common,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Checkout);
