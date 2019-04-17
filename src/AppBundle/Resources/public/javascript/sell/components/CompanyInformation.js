import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { customStyles } from "../../main/styles/custom";
import CountrySelector from "../../main/components/CountrySelector";
import { companyIsValid } from "../actions/validationActions";

const labelStyle = {
	height: "35px", fontSize: "14px", width: "100%", padding: "0 20px",
};
const inputStyle = {
	width: "100%", margin: 0, height: "40px", padding: "0 20px",
};

class CompanyInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			company: props.company,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ company: nextProps.company });
	}

	closeModal = () => {
		this.setState({
			isOpen: false,
			company: this.props.company,
		});
	};

	updateCompanyContent = (e, name) => {
		const company = { ...this.state.company };

		company[name] = e.target.value;
		this.onDataChange("company", company);
	};

	updateCountry = (value) => {
		const { company } = this.state;

		if (!company.country) company.country = {};
		company.country.name = value.label;
		this.onDataChange("company", company);
	};

	renderModal = () => {
		const { company } = this.state;

		return (
			<Modal
				isOpen={this.state.isOpen}
				onRequestClose={this.closeModal}
				bodyOpenClassName="selector"
				style={customStyles}
				contentLabel="Example Modal"
			>

				<div className="modal-title" style={{ paddingBottom: 15 }}>
					{this.context.t("Company Information")}
					<i className="fa fa-times close-icon" onClick={this.closeModal} />
				</div>

				<div className="step-content custom">
					<div className="step-content-container">

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("Legal name")}
							</label>
							<input
								type="text"
								style={inputStyle}
								onChange={(e) => {
									this.updateCompanyContent(e, "legalName");
								}}
								value={company.legalName}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("Registration number")}
							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "registrationNumber");
								}}
								value={company.registrationNumber}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("VAT ID number")}
							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "vat");
								}}
								value={company.vat}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("LISTING_DETAILS_SELLER_TITLE_ADDRESS")}
								{" "}
								1


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "address");
								}}
								defaultValue={company.address}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("LISTING_DETAILS_SELLER_TITLE_ADDRESS")}
								{" "}
								2


							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "address2");
								}}
								defaultValue={company.address2}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("City")}
							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "city");
								}}
								value={company.city}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("ZIP code")}
							</label>
							<input
								style={inputStyle}
								type="text"
								onChange={(e) => {
									this.updateCompanyContent(e, "zip");
								}}
								value={company.zip}
							/>
						</div>

						<div className="base-full-input">
							<label style={labelStyle}>
								{this.context.t("Country")}
							</label>
							<CountrySelector
								multi={false}
								onChange={(val) => {
									this.updateCountry(val);
								}}
								value={{
									value: (company.country) ? company.country.name : null,
									label: (company.country) ? company.country.name : null,
								}}
							/>
						</div>


					</div>
				</div>

				<div className="buttons popup-buttons">
					<button
						className="cancel-button"
						onClick={this.closeModal}
					>
						Cancel


					</button>
					{companyIsValid(company) && (
						<button
							className="standard-button"
							onClick={this.onOKClick}
						>
							{this.context.t("MODAL_APPLY")}
						</button>
					)}

					{!companyIsValid(company) && (
						<button
							className="standard-button"
							disabled
						>
							{this.context.t("MODAL_APPLY")}
						</button>
					)}
				</div>

			</Modal>
		);
	};

	render() {
		const { company, validation } = this.props;
		const isInvalid = !company && validation;

		return (
			<div className="base-input">
				{this.renderModal()}
				<label>
					{this.context.t("Company address")}
				</label>
				<input
					type="text"
					value={`${company.legalName}, ${company.address}`}
					onClick={() => {
						this.setState({ isOpen: true });
					}}
					placeholder={isInvalid ? this.context.t("COMPANY_INFORMATION_EMPTY") : ""}
					className={`${isInvalid ? "is-invalid" : ""}`}
				/>
				<i
					className="fa fa-edit"
					onClick={() => {
						this.setState({ isOpen: true });
					}}
				/>
			</div>
		);
	}

	onOKClick = () => {
		const { updateContentValue, counter } = this.props;
		const { company } = this.state;

		updateContentValue("company", company);
		updateContentValue("counter", counter + 1);

		this.closeModal();
	};

	onDataChange(name, value) {
		this.setState({
			[name]: value,
		});
	}
}

CompanyInformation.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CompanyInformation);
