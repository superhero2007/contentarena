import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsTerritoryFilter from "@components/Filters/CmsTerritoryFilter";
import { updateRightDetails } from "../actions/propertyActions";
import CmsFileUpload from "../components/CmsFileUpload";
import CmsNumberInput from "../components/CmsNumberInput";
import { updateListing } from "../actions/propertyListingActions";

class PropertyListingAdditionalInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			annex: [],
		};
	}

	addFile = (files) => {
		const { listing: annex } = this.props;
		this.isUploading(true);
		ContentArena.ContentApi.saveTmpFile(files)
			.then((response) => {
				if (response.success) {
					annex.push({
						file: response.file,
						name: response.name,
						size: response.size,
					});
					this.setState({ annex }, this.onChange);
				}
				this.isUploading(false);
			});
	};

	removeFile = (index) => {
		const { listing: annex } = this.props;
		annex.splice(index, 1);
		this.setState({ annex }, this.onChange);
	};

	handleChangeCompany = (value, target) => {
		let { listing: { company } } = this.props;
		if (company === null) company = {};
		company[target] = value;
		this.props.updateListing({ company });
	};

	render() {
		const { listing, countries } = this.props;

		return (
			<section className="property-create-additional">

				<h5>
					<Translate i18nKey="CREATE_LISTING_ANNEX_TITLE" />
				</h5>
				<div className="description-files form-group w-75">
					<label>
						<Translate i18nKey="CREATE_LISTING_ANNEX_LABEL" />
					</label>
					<CmsFileUpload
						attachments={listing.annex}
						onUpload={this.addFile}
						onRemove={this.removeFile}
					/>

				</div>

				<h5>
					<Translate i18nKey="CREATE_LISTING_EXPIRY_TITLE" />
				</h5>
				<div className="d-flex justify-content-between">
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_EXPIRY_LABEL" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_ZIP_PLACEHOLDER")}
								value={listing.company.zip}
								onChange={e => this.handleChangeCompany(e.target.value, "zip")}
							/>
						</div>
					</div>
				</div>

				<h5>
					<Translate i18nKey="CREATE_LISTING_ANNEX_TITLE" />
				</h5>
				<div className="d-flex justify-content-between">
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_ZIP_LABEL" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_ZIP_PLACEHOLDER")}
								value={listing.company.zip}
								onChange={e => this.handleChangeCompany(e.target.value, "zip")}
							/>
						</div>
					</div>
					<div className="form-group w-33" style={{ marginRight: "auto" }}>
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_COUNTRY_LABEL" />
						</label>

						<div className="input-group">
							<CmsTerritoryFilter
								value={listing.company.country}
								onChange={value => this.handleChangeCompany(value, "country")}
							/>
						</div>
					</div>
				</div>

				<h5>
					<Translate i18nKey="CREATE_LISTING_ANNEX_TITLE" />
				</h5>
				<div className="d-flex justify-content-between">
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_NAME_LABEL" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
								value={listing.company.legalName}
								onChange={e => this.handleChangeCompany(e.target.value, "legalName")}
							/>
						</div>
					</div>
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_REGISTRATION_LABEL" />
						</label>

						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
								value={listing.company.registrationNumber}
								onChange={e => this.handleChangeCompany(e.target.value, "registrationNumber")}
							/>
						</div>
					</div>
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_VAT_LABEL" />
						</label>

						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("PROPERTY_DETAILS_EVENT_WEBSITE_PLACEHOLDER")}
								value={listing.company.vat}
								onChange={e => this.handleChangeCompany(e.target.value, "vat")}
							/>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_ADDRESS_LABEL" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_ADDRESS_PLACEHOLDER")}
								value={listing.company.address}
								onChange={e => this.handleChangeCompany(e.target.value, "address")}
							/>
						</div>
					</div>
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_ADDRESS2_LABEL" />
						</label>

						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_ADDRESS2_PLACEHOLDER")}
								value={listing.company.address2}
								onChange={e => this.handleChangeCompany(e.target.value, "address2")}
							/>
						</div>
					</div>
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_VAT_LABEL" />
						</label>

						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_VAT_PLACEHOLDER")}
								value={listing.company.city}
								onChange={e => this.handleChangeCompany(e.target.value, "city")}
							/>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="form-group w-33">
						<label>
							<Translate i18nKey="CREATE_LISTING_COMPANY_ZIP_LABEL" />
						</label>
						<div className="input-group">
							<input
								type="text"
								className="input-group-text"
								placeholder={this.context.t("CREATE_LISTING_COMPANY_ZIP_PLACEHOLDER")}
								value={listing.company.zip}
								onChange={e => this.handleChangeCompany(e.target.value, "zip")}
							/>
						</div>
					</div>
					<div className="form-group w-33" style={{ marginRight: "auto", marginLeft: "5%" }}>
						<CmsTerritoryFilter
							label={<Translate i18nKey="CREATE_LISTING_COMPANY_COUNTRY_LABEL" />}
							options={countries}
							multi={false}
							value={listing.company.country}
							onChange={value => this.handleChangeCompany(value, "country")}
						/>
					</div>
				</div>
			</section>
		);
	}
}

PropertyListingAdditionalInfo.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	countries: state.property.countries,
	property: state.propertyDetails.property,
	listing: state.propertyListing,
});

const mapDispatchToProps = dispatch => ({
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyListingAdditionalInfo);
