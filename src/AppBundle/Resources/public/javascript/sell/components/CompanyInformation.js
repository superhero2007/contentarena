import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { customStyles } from "../../main/styles/custom";
import CountrySelector from "../../main/components/CountrySelector";
import companyIsValid from "../actions/validationActions";

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
					<Translate i18nKey="Company Information" />
					<i className="fa fa-times close-icon" onClick={this.closeModal} />
				</div>

				<div className="step-content custom">
					<div className="step-content-container">

						<div className="base-full-input">
							<label style={labelStyle}>
								<Translate i18nKey="POPUP_LABEL_COMPANY_NAME" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_REGISTRATION_NUMBER" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_VAT" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_ADDRESS" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_ADDRESS_2" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_CITY" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_ZIP" />
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
								<Translate i18nKey="POPUP_LABEL_COMPANY_COUNTRY" />
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
							<Translate i18nKey="MODAL_APPLY" />
						</button>
					)}

					{!companyIsValid(company) && (
						<button
							className="standard-button"
							disabled
						>
							<Translate i18nKey="MODAL_APPLY" />
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
					<Translate i18nKey="Company address" />
				</label>
				<input
					type="text"
					value={`${company.legalName}, ${company.address}`}
					onClick={() => {
						this.setState({ isOpen: true });
					}}
					placeholder={isInvalid ? <Translate i18nKey="COMPANY_INFORMATION_EMPTY" /> : ""}
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
