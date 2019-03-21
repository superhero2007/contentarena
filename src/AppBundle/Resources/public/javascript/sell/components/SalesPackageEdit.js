import React from "react";
import Modal from "react-modal";
import DatePicker from "@components/DatePicker";
import { PropTypes } from "prop-types";
import moment from "moment";
import { DATE_FORMAT } from "@constants";
import NumberFormat from "react-number-format";
import CountrySelector from "../../main/components/CountrySelector";
import { customStyles } from "../../main/styles/custom";
import { getCurrencySymbol } from "../../main/actions/utils";

const labelStyle = {
	height: "30px",
	fontSize: "12px",
};
const installmentIconStyle = {
	margin: "0 10px",
	position: "relative",
};
const smallContainerStyle = {
	display: "inline-block",
	overflowY: "overlay",
	maxHeight: "200px",
};
const containerStyle = {
	display: "inline-block",
};

class SalesPackageEdit extends React.Component {
	constructor(props) {
		super(props);
		const salesPackage = props.salesPackages[props.salesPackageId] || {};

		this.asBundle = "SELL_AS_BUNDLE";
		this.individually = "SELL_INDIVIDUALLY";
		this.worldwide = "WORLDWIDE";
		this.worldwideExcluding = "WORLDWIDE_EXCLUDING";
		this.selectedTerritories = "SELECTED_TERRITORIES";
		this.fixed = "FIXED";
		this.bidding = "BIDDING";
		this.limit = 3;

		this.state = {
			isOpen: props.isOpen,
			bundleMethod: salesPackage.bundleMethod,
			territoriesMethod: salesPackage.territoriesMethod,
			salesMethod: salesPackage.salesMethod,
			territories: (salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? salesPackage.excludedTerritories : salesPackage.territories,
			filterTerritories: [],
			installments: salesPackage.installments || [],
			fee: salesPackage.fee,
			salesPackageId: salesPackage.id,
			isNew: true,
		};
		this.bidIcon = `${assetsBaseDir}app/images/auction.svg`;
		this.fixedIcon = `${assetsBaseDir}app/images/bid.png`;
	}

	update = (selected) => {
		this.setState({ selected });
	};

	setBundleMethod = (bundleMethod) => {
		this.setState({ bundleMethod });
		this.fillTerritories(this.state.territoriesMethod, bundleMethod);
	};

	setTerritoriesMethod = (territoriesMethod) => {
		this.setState({ territoriesMethod });
		this.fillTerritories(territoriesMethod, this.state.bundleMethod);
	};

	fillTerritories = (territoriesMethod, bundleMethod) => {
		if (territoriesMethod === this.worldwide
			&& bundleMethod === this.individually) {
			this.setState({
				territories: Object.values(ContentArena.Data.Countries)
					.map(i => ({
						value: i.name,
						label: i.name,
					})),
			});
		} else {
			this.setState({ territories: [] });
		}
	};

	getFilterTerritories = () => {
		const { exclusivity, salesPackages, salesPackageId } = this.props;
		let filter = [];

		if (!exclusivity) return filter;

		salesPackages.forEach((salesPackage, id) => {
			if (salesPackageId !== id) filter = [...filter, ...salesPackage.territories.map(t => t.value)];
		});

		return filter;
	};

	getExcludedTerritories = () => {
		const { territories } = this.state;

		let filter = this.getFilterTerritories();

		const selected = territories.map(t => t.value);
		filter = [...filter, ...selected];


		return filter.filter((item, pos, self) => self.indexOf(item) === pos)
			.map(t => ({
				value: t,
				label: t,
			}));
	};

	preselectedExcluded = () => {
		const { salesPackages } = this.props;
		return salesPackages.filter(salesPackage => salesPackage.territoriesMethod === this.selectedTerritories).length === 0;
	};

	setSalesMethod = (salesMethod) => {
		this.setState({ salesMethod });
	};

	closeModal = () => {
		const { onClose } = this.props;
		if (onClose) onClose();
	};

	getName = () => {
		const { exclusivity } = this.props;
		const { territoriesMethod } = this.state;
		const excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : this.state.territories;
		const { territories } = this.state;

		let name = "";

		if (territoriesMethod === this.worldwide) {
			name = "Worldwide";
		} else if (territoriesMethod === this.selectedTerritories) {
			name = territories.slice(0, 3)
				.map(territory => territory.label)
				.join(", ");
		} else if (territoriesMethod === this.worldwideExcluding) {
			name = `Worldwide excl. ${excludedTerritories.slice(0, 3)
				.map(territory => territory.label)
				.join(", ")}`;
		}

		return name;
	};

	applySelection = () => {
		const {
			fee, bundleMethod, territoriesMethod, salesMethod, installments,
		} = this.state;
		const { salesPackageId, exclusivity } = this.props;
		const excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : this.state.territories;
		let { territories } = this.state;
		const allTerritories = Object.values(ContentArena.Data.Countries)
			.map((i, k) => ({
				value: i.name,
				label: i.name,
			}));
		const territoriesByLabel = (exclusivity) ? this.getExcludedTerritories()
			.map(t => t.label) : territories.map(t => t.label);
		if (territoriesMethod === this.worldwideExcluding) territories = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1);
		this.props.onUpdate({
			name: this.getName(),
			territories,
			excludedTerritories: (territoriesMethod === this.worldwideExcluding) ? excludedTerritories : [],
			fee,
			salesMethod,
			territoriesMethod,
			bundleMethod: (territories.length === 1) ? this.individually : bundleMethod,
			installments,
			id: this.state.salesPackageId,
			edited: true,
		}, salesPackageId);
		this.closeModal();
	};

	selectTerritories = (territories) => {
		this.setState({ territories });
	};

	setInstallmentType = (type, i) => {
		const { installments } = this.state;
		installments[i].type = type;
		this.setState({ installments });
	};

	setInstallmentDate = (date, i) => {
		const { installments } = this.state;
		installments[i].date = date;
		this.setState({ installments });
	};

	setInstallmentDays = (days, i) => {
		const { installments } = this.state;
		installments[i].days = days;
		this.setState({ installments });
	};

	setInstallmentValue = (value, i) => {
		const { installments } = this.state;
		installments[i].value = value;
		this.setState({ installments });
	};

	addInstallment = () => {
		const { installments } = this.state;
		installments.push({
			value: 100,
			type: "DAY",
			days: 30,
		});
		this.setState({ installments });
	};

	removeInstallment = (i) => {
		const { installments } = this.state;
		installments.splice(i, 1);
		this.setState({ installments });
	};

	updateFee = (e) => {
		const fee = e.target.value;
		this.setState({ fee });
	};

	render = () => {
		const { salesPackages, salesPackageId, currency } = this.props;
		const salesPackage = salesPackages[salesPackageId] || {};

		return (
			<Modal
				isOpen={this.state.isOpen}
				bodyOpenClassName="selector"
				style={customStyles}
				contentLabel="Example Modal"
				onRequestClose={this.closeModal}
			>

				<div className="modal-title" style={{ paddingBottom: 15 }}>
					{this.context.t("CL_STEP4_SALES_BUNDLE_POPUP_TITLE")}
					<i className="fa fa-times close-icon" onClick={this.closeModal} />
				</div>

				<div className="step-content">
					<div className="step-content-container">
						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_TERRITORIES")}
								{this.state.territoriesMethod === this.worldwideExcluding && ": Worldwide excluding"}
							</label>
						</div>

						{(this.state.bundleMethod === this.asBundle) && (this.state.territoriesMethod === this.selectedTerritories)
						&& (
							<CountrySelector
								className="small-select country-selector"
								value={this.state.territories}
								onChange={this.selectTerritories}
								filter={this.getFilterTerritories()}
							/>
						)}

						{(this.state.bundleMethod === this.asBundle) && (this.state.territoriesMethod === this.worldwideExcluding)
						&& (
							<CountrySelector
								className="small-select country-selector"
								value={this.getExcludedTerritories()}
								onChange={this.selectTerritories}
							/>
						)
						}

						{(this.state.bundleMethod === this.individually)
						&& (
							<div style={{ padding: "10px 5px 20px" }}>
								{salesPackage.name}
							</div>
						)}

						{(this.state.bundleMethod === this.asBundle)
						&& (this.state.territoriesMethod === this.worldwide)
						&& (
							<div style={{ padding: "10px 5px 20px" }}>
								{this.context.t("Worldwide")}
							</div>
						)}

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("Sales method")}
							</label>
							<div className="content">
								<div
									className="item"
									onClick={() => {
										this.setSalesMethod(this.fixed);
									}}
								>
									{this.state.salesMethod !== this.fixed && <i className="fa fa-circle-thin" />}
									{this.state.salesMethod === this.fixed && <i className="fa fa-check-circle-o" />}
									<div className="title">
										{this.context.t("Fixed fee")}
									</div>
								</div>
								<div
									className="item"
									onClick={() => {
										this.setSalesMethod(this.bidding);
									}}
								>
									{this.state.salesMethod !== this.bidding && <i className="fa fa-circle-thin" />}
									{this.state.salesMethod === this.bidding && <i className="fa fa-check-circle-o" />}
									<div className="title">
										{this.context.t("Bidding")}
									</div>
								</div>
								<div
									className="item"
									style={{
										paddingLeft: 0,
										paddingRight: 0,
									}}
								>
									<span>
										{this.state.salesMethod === this.fixed && "Fixed fee"}
										{this.state.salesMethod !== this.fixed && "Minimum bid (optional)"}
									</span>
									<NumberFormat
										thousandSeparator
										value={this.state.fee}
										onValueChange={(values) => {
											const { value } = values;
											this.setState({ fee: value });
										}}
										min={0}
										style={{
											height: "26px",
											width: "100px",
										}}
										prefix={`${getCurrencySymbol(currency)} `}
									/>
								</div>
							</div>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_PAYMENT")}
							</label>

							{this.state.installments.map((installment, i, list) => (
								<div className="content">
									<div
										className="item"
										style={{
											marginRight: 55,
											paddingLeft: 10,
										}}
									>
										<div className="title">
											{i + 1}
											{" "}
											Installment(s)


											<input
												onChange={(e) => {
													this.setInstallmentValue(e.target.value, i);
												}}
												style={{
													height: "26px",
													width: "70px",
												}}
												type="number"
												max={100}
												value={installment.value}
											/>
											{" "}
											% of payment


										</div>
										{installment.type !== "DATE"
										&& (
											<i
												style={installmentIconStyle}
												className="fa fa-circle-thin"
												onClick={() => {
													this.setInstallmentType("DATE", i);
												}}
											/>
										)}
										{installment.type === "DATE"
										&& <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
										<div className="title">
											<DatePicker
												disabled={installment.type !== "DATE"}
												selected={installment.date}
												dateFormat={DATE_FORMAT}
												placeholderText={DATE_FORMAT.toLowerCase()}
												minDate={moment()}
												onChange={(date) => {
													this.setInstallmentDate(date, i);
												}}
												className="small-datepicker"
											/>
										</div>
										{installment.type !== "DAY"
										&& (
											<i
												style={installmentIconStyle}
												className="fa fa-circle-thin"
												onClick={() => {
													this.setInstallmentType("DAY", i);
												}}
											/>
										)}
										{installment.type === "DAY"
										&& <i style={installmentIconStyle} className="fa fa-check-circle-o" />}
										<div className="title">
											<input
												type="number"
												min={0}
												onChange={(e) => {
													this.setInstallmentDays(e.target.value, i);
												}}
												disabled={installment.type !== "DAY"}
												value={installment.days}
												style={{
													height: "26px",
													width: "70px",
												}}
											/>
											{" "}
											{this.context.t("CL_STEP4_EDIT_BUNDLE_INSTALLMENT_DAYS")}
										</div>

									</div>
									{i !== 0 && (
										<i
											style={{
												position: "absolute",
												color: "red",
												fontSize: 26,
												right: 36,
												top: 12,
											}}
											className="fa fa-minus-circle"
											onClick={() => {
												this.removeInstallment(i);
											}}
										/>
									)}
									{i === list.length - 1 && (
										<i
											style={{
												position: "absolute",
												color: "green",
												fontSize: 26,
												right: 5,
												top: 12,
											}}
											className="fa fa-plus-circle"
											onClick={this.addInstallment}
										/>
									)}
								</div>
							))}


						</div>

					</div>
				</div>

				<div
					className="error"
					style={{
						width: "100%",
						textAlign: "center",
						fontSize: "12px",
						color: "red",
					}}
				>
					{this.installmentsIncomplete() && this.context.t("CL_STEP4_EDIT_BUNDLE_INSTALLMENT_WARNING")}
				</div>

				<div className="buttons popup-buttons">
					<button
						className="standard-button"
						disabled={
							(this.state.salesMethod === this.fixed && Number(this.state.fee) === 0)
							|| (this.state.territoriesMethod !== this.worldwide && this.state.territories.length === 0)
							|| this.installmentsIncomplete()
						}
						onClick={this.applySelection}
					>
						Ok


					</button>
				</div>
			</Modal>
		);
	};

	installmentsIncomplete = () => {
		const { installments } = this.state;
		let total = 0;

		installments.forEach((i) => {
			total += Number(i.value);
		});

		return total !== 100;
	};
}

SalesPackageEdit.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default SalesPackageEdit;
