import React from "react";
import Modal from "react-modal";
import DatePicker from "@components/DatePicker";
import { PropTypes } from "prop-types";
import cn from "classnames";
import moment from "moment";
import { connect } from "react-redux";
import { DATE_FORMAT } from "@constants";
import NumberFormat from "react-number-format";
import EmptySalesPackageTable from "./EmptySalesPackageTable";
import SalesPackageTable from "./SalesPackageTable";
import RegionCountrySelector from "../../main/components/RegionCountrySelector";
import CountrySelector from "../../main/components/CountrySelector";
import { getCurrencySymbol } from "../../main/actions/utils";
import { disableValidation, enableValidation } from "../../main/actions/validationActions";
import { customStyles } from "../../main/styles/custom";
import { BUNDLE_TERRITORIES_METHOD } from "../../common/constants";

const labelStyle = {
	height: "35px",
	fontSize: "15px",
};
const installmentIconStyle = {
	margin: "0 10px",
	position: "relative",
};

class SalesPackageForm extends React.Component {
	constructor(props) {
		super(props);

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
			bundleMethod: this.asBundle,
			territoriesMethod: this.selectedTerritories,
			salesMethod: this.fixed,
			territories: [],
			excludedTerritories: [],
			filterTerritories: [],
			territoriesList: [],
			installments: [{
				value: 100,
				type: "DAY",
				days: 30,
			}],
			fee: 0,
			isNew: true,
			territoriesQuantity: "single",
			countries: ContentArena.Data.Countries,
			remainCountries: [],
		};
		this.bidIcon = `${assetsBaseDir}app/images/hammer.png`;
		this.draftIcon = `${assetsBaseDir}app/images/draft.png`;
		this.cancelIcon = `${assetsBaseDir}app/images/cancel.png`;
	}

	componentDidMount() {
		ContentArena.Api.getCountries()
			.done((countries) => {
				this.setState({ countries });
			});
	}

	componentWillUnmount() {
		const { validation, disableValidation } = this.props;

		if (validation) disableValidation();
	}

	editSalesPackage = (salesPackage, index) => {
		const { onEdit } = this.props;
		if (onEdit) onEdit(index);
	};

	update = (selected) => {
		this.setState({ selected });
	};

	setBundleMethod = (bundleMethod) => {
		const { territoriesMethod } = this.state;
		this.setState({ bundleMethod });

		if (territoriesMethod === this.worldwide) {
			if (bundleMethod === this.individually) {
				this.fillTerritories(this.worldwide, this.individually);
			} else {
				this.setState({ territories: [] });
			}
		}
	};

	setTerritoriesMethod = (territoriesMethod) => {
		this.setState({
			territoriesMethod,
			territories: [],
		});
		this.fillTerritories(territoriesMethod, this.state.bundleMethod);
	};

	fillTerritories = (territoriesMethod, bundleMethod) => {
		if (territoriesMethod === this.worldwide && bundleMethod === this.individually) {
			this.setState({
				territories: Object.values(ContentArena.Data.Countries)
					.map((i, k) => ({
						value: i.name,
						label: i.name,
					})),
			});
		} else {
			this.setState({ territories: [] });
		}
	};

	getFilterTerritories = () => {
		const { exclusivity, salesPackages } = this.props;
		let filter = [];

		if (!exclusivity) return filter;

		salesPackages.forEach((salesPackage) => {
			filter = [...filter, ...salesPackage.territories.map(t => t.value)];
		});

		return filter;
	};

	getExcludedTerritories = () => {
		const { territories } = this.state;
		let territoriesArray = [];

		if (!Array.isArray(territories)) {
			territoriesArray = [territories];
		} else {
			territoriesArray = territories;
		}
		let filter = this.getFilterTerritories();

		const selected = territoriesArray.map(t => t.value);
		filter = [...filter, ...selected];


		return filter.filter((item, pos, self) => self.indexOf(item) == pos)
			.map(t => ({
				value: t,
				label: t,
			}));
	};

	worldwideAvailable = () => {
		const { salesPackages, exclusivity } = this.props;

		if (!exclusivity) return true;

		return salesPackages.filter(salesPackage => salesPackage.territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING).length === 0;
	};

	setSalesMethod = (salesMethod) => {
		const { fee } = this.state;
		const newFee = (salesMethod === this.bidding && parseInt(fee, 10) === 0) ? 1
			: parseInt(fee, 10) === 1 ? 0 : fee;

		this.setState({
			salesMethod,
			fee: newFee,
		});
	};

	closeModal = () => {
		this.setState({ isOpen: false });
	};

	closeTerritoriesModal = () => {
		this.setState({ showAllTerritories: false });
	};

	selectRegion = (region, countries) => {
		this.setState({
			selectedRegion: region,
			selectedRegionCountries: countries,
		});
	};

	applySelection = () => {
		this.setState({ isOpen: false });
		this.props.disableValidation();
		const {
			bundleMethod, territoriesMethod, fee, salesMethod, installments, selectedRegion, selectedRegionCountries, territoriesQuantity,
		} = this.state;
		const { exclusivity } = this.props;

		const territoriesAsArray = Array.isArray(this.state.territories) ? this.state.territories : [this.state.territories];
		let salesPackagesList = [];
		let
			name = "";
		const excludedTerritories = (exclusivity) ? this.getExcludedTerritories() : territoriesAsArray;
		let territories = territoriesAsArray;
		const allTerritories = this.getAllCountries();
		const territoriesByLabel = (exclusivity) ? this.getExcludedTerritories()
			.map(t => t.label) : territories.map(t => t.label);
		let regionNamed = false;

		if (territoriesQuantity === "multiple" && exclusivity) {
			this.setState({
				remainCountries: this.getRemainCountries(territories),
			});
		}
		if (this.state.isNew) {
			if (bundleMethod === this.individually) {
				if (territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING) {
					salesPackagesList = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1)
						.map(territory => ({
							name: territory.label,
							territories: [territory],
							fee,
							salesMethod,
							bundleMethod,
							territoriesMethod,
							installments,
						}));
				} else {
					salesPackagesList = territories.map(territory => ({
						name: territory.label,
						territories: [territory],
						fee,
						salesMethod,
						bundleMethod,
						territoriesMethod,
						installments,
					}));
				}
			} else {
				if (territoriesMethod === this.worldwide) {
					name = "Worldwide";
				} else if (territoriesMethod === this.selectedTerritories) {
					if (selectedRegion && territories.length <= selectedRegionCountries.length && territories.length >= (selectedRegionCountries.length - 3)) {
						name = selectedRegion.name;

						if (territories.length < selectedRegionCountries.length) {
							name += " excluding ";
							const territoriesNames = territories.map(t => t.label);
							const excludedFromRegion = selectedRegionCountries.filter(c => territoriesNames.indexOf(c.label) === -1);
							name += excludedFromRegion.map((territory, i) => territory.label)
								.join(", ");
						}
						regionNamed = true;
					} else {
						name = territories.slice(0, 3)
							.map((territory, i) => territory.label)
							.join(", ");
					}
				} else if (territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING) {
					territories = allTerritories.filter(t => territoriesByLabel.indexOf(t.label) === -1);
					name = `Worldwide excl. ${excludedTerritories.slice(0, 3)
						.map((territory, i) => territory.label)
						.join(", ")}`;
				}

				salesPackagesList = [{
					name,
					territories,
					excludedTerritories,
					fee,
					salesMethod,
					bundleMethod: (territories.length === 1) ? this.individually : bundleMethod,
					territoriesMethod,
					installments,
					regionNamed,
				}];
			}

			this.props.onAdd(salesPackagesList);
		} else {
			this.props.onUpdate(this.state, this.state.index);
		}

		this.setState({
			fee: 0,
			salesMethod: this.fixed,
			territories: [],
			territoriesMethod: this.selectedTerritories,
			// territoriesMethod: (this.worldwideAvailable()) ? this.worldwide : this.selectedTerritories
		});
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

	addBundlesAvailable = () => {
		const { exclusivity, salesPackages } = this.props;
		const { countries } = this.state;
		let territories = [];
		let
			worldwide = false;

		if (exclusivity) {
			salesPackages.map((sp) => {
				if (sp.territoriesMethod === "WORLDWIDE" && sp.bundleMethod === this.asBundle) worldwide = true;
				territories = [...territories, ...sp.territories];
			});
		}

		return !worldwide && territories.length !== Object.values(countries).length;
	};

	handleTerritories = (type) => {
		this.setState({ territoriesQuantity: type });
	};

	getSoldPackages = (salesPackages) => {
		const soldPackages = [];
		salesPackages.forEach((p) => {
			if (p.sold) soldPackages.push(p);
		});
		return soldPackages;
	};

	getExclusiveSoldTerritories = (soldPackages) => {
		const { territoriesMethod, countries } = this.state;
		const isExcludedTerritoriesEnabled = territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING;
		const isWorldwideEnabled = territoriesMethod === this.worldwide;

		let exclusiveSoldTerritories = [];
		soldPackages.forEach((p) => {
			p.territories.forEach((t) => {
				exclusiveSoldTerritories.push(t);
			});
		});

		if (isExcludedTerritoriesEnabled && countries) {
			exclusiveSoldTerritories = countries.filter(c => !exclusiveSoldTerritories.some(ht => c.name === ht.label));
		}

		if (isWorldwideEnabled && exclusiveSoldTerritories.length > 0 && countries) {
			exclusiveSoldTerritories = countries;
		}

		return exclusiveSoldTerritories;
	};

	getAlreadySelectedCountries = () => {
		const { salesPackages } = this.props;
		const selected = [];

		salesPackages.forEach((sp) => {
			sp.territories.forEach((t) => {
				selected.push(t);
			});
		});

		return selected;
	};

	getRemainCountries = (selectedTerritories) => {
		const { remainCountries } = this.state;
		const currentCountries = remainCountries && remainCountries.length > 0 ? remainCountries : this.getAllCountries();
		if (selectedTerritories.length > 0) {
			return currentCountries.filter(cc => !selectedTerritories.some(src => src.value === cc.value));
		}
		return [];
	};

	getAllCountries = () => Object.values(ContentArena.Data.Countries)
		.map((i, k) => ({
			value: i.name,
			label: i.name,
		}));

	renderModal = () => {
		const {
			exclusivity, salesPackages, currency, validation,
		} = this.props;
		const {
			territoriesQuantity, territoriesMethod, territories, fee, remainCountries,
		} = this.state;

		const isFilterEnabled = territoriesMethod === this.selectedTerritories;
		const isMultipleEnabled = territoriesQuantity === "multiple";
		const isExcludedTerritoriesEnabled = territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING && exclusivity;
		const isWorldwideEnabled = territoriesMethod === this.worldwide;

		const soldPackages = this.getSoldPackages(salesPackages);
		const isExclusiveSoldTerritoriesEnabled = (soldPackages.length > 0 && exclusivity);

		const isOkButtonDisabled = (Number(this.state.fee) === 0)
			|| this.territoriesIncomplete()
			|| this.installmentsIncomplete();

		const isTerritoriesEmpty = (territories.length === 0 && territoriesMethod !== this.worldwide) && validation;

		return (
			<Modal
				isOpen={this.state.isOpen}
				bodyOpenClassName="selector ca-modal-open"
				className="ca-modal"
				style={customStyles}
				overlayClassName="ca-modal-overlay"
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
								{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_TERRITORIES_MODE")}
							</label>
							<div className="content" style={{ padding: "5px 0" }}>
								<div className="item" onClick={() => this.handleTerritories("single")}>
									{territoriesQuantity === "single"
										? <i className="fa fa-check-circle-o" />
										: <i className="fa fa-circle-thin" />
									}
									<div className="title">
										{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_SINGLE_TERRITORY")}
									</div>
								</div>
								<div className="item" onClick={() => this.handleTerritories("multiple")}>
									{territoriesQuantity === "multiple"
										? <i className="fa fa-check-circle-o" />
										: <i className="fa fa-circle-thin" />
									}
									<div className="title">
										{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_MULTIPLE_TERRITORIES")}
									</div>
								</div>
							</div>
						</div>

						<div className="base-full-input" style={{ display: "block" }}>
							<label style={labelStyle}>Select territories</label>
							{territoriesQuantity === "multiple" && (
								<div className="content">
									<div
										className="item"
										onClick={() => {
											this.setTerritoriesMethod(this.selectedTerritories);
										}}
									>
										{territoriesMethod !== this.selectedTerritories
										&& <i className="fa fa-circle-thin" />}
										{territoriesMethod === this.selectedTerritories
										&& <i className="fa fa-check-circle-o" />}
										<div className="title">
											{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_SELECTED_TERRITORIES")}
										</div>
									</div>
									{(!exclusivity || (exclusivity && salesPackages.length === 0)) && (
										<div
											className="item"
											onClick={() => {
												this.setTerritoriesMethod(this.worldwide);
											}}
										>{territoriesMethod !== this.worldwide && <i className="fa fa-circle-thin" />}
											{territoriesMethod === this.worldwide
											&& <i className="fa fa-check-circle-o" />}
											<div className="title">
												{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_WORLDWIDE")}
											</div>
										</div>
									)}
									{this.worldwideAvailable() && (
										<div
											className="item"
											onClick={() => {
												this.setTerritoriesMethod(BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING);
											}}
										>
											{territoriesMethod !== BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
											&& <i className="fa fa-circle-thin" />}
											{territoriesMethod === BUNDLE_TERRITORIES_METHOD.WORLDWIDE_EXCLUDING
											&& <i className="fa fa-check-circle-o" />}
											<div className="title">
												{this.context.t("CL_STEP4_EDIT_BUNDLE_TITLE_WORLDWIDE_EXCLUDING")}
											</div>
										</div>
									)}
								</div>
							)}
							<div style={{
								margin: "10px 0",
								padding: "0 15px",
							}}
							>
								{!isMultipleEnabled && (
									<CountrySelector
										className="small-select"
										onChange={(c) => {
											this.selectTerritories([c]);
										}}
										value={territories[0]}
										filter={isFilterEnabled ? this.getFilterTerritories() : []}
										multi={false}
										exclusiveSoldTerritories={isExclusiveSoldTerritoriesEnabled ? this.getExclusiveSoldTerritories(soldPackages) : false}
										placeholder={isTerritoriesEmpty ? this.context.t("TERRITORIES_EMPTY") : null}
										isInvalid={isTerritoriesEmpty}
									/>
								)}
								{isMultipleEnabled && (
									<RegionCountrySelector
										className="small-select"
										onChange={this.selectTerritories}
										onSelectRegion={this.selectRegion}
										value={isExcludedTerritoriesEnabled ? this.getExcludedTerritories() : territories}
										filter={isFilterEnabled ? this.getFilterTerritories() : []}
										disabled={isWorldwideEnabled}
										exclusiveSoldTerritories={isExclusiveSoldTerritoriesEnabled ? this.getExclusiveSoldTerritories(soldPackages) : false}
										placeholder={isTerritoriesEmpty ? this.context.t("TERRITORIES_EMPTY") : null}
										isInvalid={isTerritoriesEmpty}
										remainCountries={exclusivity ? this.getRemainCountries(this.getAlreadySelectedCountries()) : []}
									/>
								)}
								{territoriesQuantity === "multiple" && (
									<div
										className="d-flex align-items-center"
										onChange={(e) => {
											this.setBundleMethod(e.target.value);
										}}
									>
										<div style={{
											margin: "15px 15px 10px 0",
											fontSize: "14px",
										}}
										>
											{this.context.t("CL_STEP4_EDIT_BUNDLE_AS_PACKAGE")}
										</div>
										<div
											className={cn({ "font-weight-bold": this.state.bundleMethod === this.asBundle })}
											style={{ marginRight: 20 }}
										>
											<input
												className="ca-radio"
												type="radio"
												value={this.asBundle}
												checked={this.state.bundleMethod === this.asBundle}
												style={{ marginRight: 5 }}
											/>
											{this.context.t("Yes")}
										</div>
										<div
											className={cn({ "font-weight-bold": this.state.bundleMethod === this.individually })}
										>
											<input
												className="ca-radio"
												type="radio"
												value={this.individually}
												checked={this.state.bundleMethod === this.individually}
												style={{ marginRight: 5 }}
											/>
											{this.context.t("No")}
										</div>

									</div>
								)}
							</div>
						</div>
						<div className="base-full-input">
							<label style={labelStyle}>Sales method</label>
							<div style={{
								padding: "10px 18px 0px",
								fontSize: "14px",
							}}
							>
								{this.context.t("CL4_TERRITORIES_BUNDLE_SALES_INFO")}
							</div>
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
										{this.context.t("CL_STEP4_EDIT_BUNDLE_TYPE_FIXED")}
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
										{this.context.t("CL_STEP4_EDIT_BUNDLE_TYPE_BIDDING")}
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
										value={fee}
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
							<label style={labelStyle}>Payment details</label>
							<div style={{
								padding: "10px 18px 0px",
								fontSize: "14px",
							}}
							>
								{this.context.t("CL4_TERRITORIES_BUNDLE_PAYMENT_INFO")}
							</div>
							{this.state.installments.map((installment, i, list) => (
								<div className="content">
									<div
										className="item"
										style={{
											marginRight: 55,
											paddingLeft: 15,
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
												placeholder={validation && !installment.value ? this.context.t("INSTALMENTS_EMPTY") : ""}
												className={validation && !installment.value ? "is-invalid" : ""}
											/>
											{" "}
											{this.context.t("CL_STEP4_INSTALLMENTS_PERCENTAGE")}
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
										<div
											className="title"
											onClick={() => {
												this.setInstallmentType("DATE", i);
											}}
										>
											<DatePicker
												disabled={installment.type !== "DATE"}
												selected={installment.date}
												placeholderText={DATE_FORMAT.toLowerCase()}
												dateFormat={DATE_FORMAT}
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
										<div
											className="title"
											onClick={() => {
												this.setInstallmentType("DAY", i);
											}}
										>
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
											{this.context.t("CL_STEP4_INSTALLMENTS_DAYS_AFTER")}
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
						className="cancel-button"
						onClick={this.closeModal}
					>
						Cancel


					</button>
					{isOkButtonDisabled ? (
						<button className="standard-button disabled" onClick={this.props.enableValidation}>
							{this.context.t("MODAL_APPLY")}
						</button>
					) : (
						<button className="standard-button" onClick={this.applySelection}>
							{this.context.t("MODAL_APPLY")}
						</button>
					)}
				</div>

			</Modal>
		);
	};

	territoriesIncomplete = () => {
		const { territoriesMethod, territories } = this.state;

		if (territoriesMethod === this.selectedTerritories && territories.length === 0) return true;

		if (territoriesMethod === this.worldwideExcluding
			&& territories.length === 0
			&& this.getExcludedTerritories().length === 0) {
			return true;
		}
	};

	showAllTerritories = (extraTerritories) => {
		this.setState({
			showAllTerritories: true,
			territoriesList: extraTerritories,
		});
	};

	showTerritories = salesPackage => (salesPackage.bundleMethod === this.individually
		&& salesPackage.territoriesMethod === this.worldwide)
		|| salesPackage.territoriesMethod !== this.worldwide;

	installmentsIncomplete = () => {
		const { installments } = this.state;
		let total = 0;

		installments.forEach((i) => {
			total += Number(i.value);
		});

		return total !== 100;
	};

	sortSalesPackages = (a, b) => {
		const aWorldwide = a.territoriesMethod === "WORLDWIDE";
		const bWorldwide = b.territoriesMethod === "WORLDWIDE";

		const worldwide = (aWorldwide && !bWorldwide) ? 1 : ((bWorldwide && !aWorldwide) ? -1 : 0);

		return worldwide || this.compareProperty(a.territories.length, b.territories.length)
			|| this.compareProperty(a.name, b.name);
	};

	compareProperty = (a, b) => ((a > b) ? 1 : ((b > a) ? -1 : 0));

	render() {
		const {
			onRemove, hideButtons, fullSize, sort, listingId, currency,
		} = this.props;
		const inputStyle = (fullSize) ? { maxWidth: "none" } : null;
		const { salesPackages } = this.props;

		if (sort) salesPackages.sort(this.sortSalesPackages);
		return (
			<div className="sales-package-form sales-bundle-wrapper">
				{this.renderModal()}
				<div className="base-full-input" style={inputStyle}>
					<label>
						{this.context.t("CL_STEP4_SALES_BUNDLES")}
					</label>
					<span>
						{this.context.t("CL_STEP4_TERRITORIAL_BUNDLES_DESCRIPTION")}
					</span>

					{!hideButtons && (
						<div className="sales-bundle-actions">
							<button
								className="ca-btn primary"
								onClick={() => {
									this.setState({
										isOpen: true,
										isNew: true,
									});
								}}
							>
								<i className="fa fa-plus-circle" />
								{this.context.t("CL_STEP4_ADD_SALES_BUNDLE")}
							</button>
							{salesPackages.length > 0 && (
								<button className="ca-btn primary remove-all" onClick={this.props.onRemoveAll}>
									<i className="fa fa-minus-circle" />
									{this.context.t("CL_STEP4_REMOVE_ALL_BUNDLES")}
								</button>
							)}
						</div>
					)}

					{salesPackages.length === 0 && <EmptySalesPackageTable />}

					{salesPackages.length > 0 && (
						<SalesPackageTable
							salesPackages={salesPackages}
							currency={currency}
							listingId={listingId}
							onRemove={onRemove}
							editSalesPackage={this.editSalesPackage}
							hideButtons={hideButtons}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	enableValidation: () => dispatch(enableValidation()),
	disableValidation: () => dispatch(disableValidation()),
});

SalesPackageForm.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SalesPackageForm);
