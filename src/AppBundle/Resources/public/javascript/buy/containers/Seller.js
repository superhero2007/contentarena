import React, { Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import test from "../actions";
import { RepresentationTextArea } from "../../sell/components/SellFormItems";

class Seller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			legalName, description, country, city, zip, address, address2,
		} = this.props.company;

		return (
			<Fragment>
				<div className="description-wrapper">
					{legalName && (
						<div className="title spacer-bottom">
							{legalName}
						</div>
					)}
					{description && (
						<div className="txt description-text">
							<RepresentationTextArea value={description} />
						</div>
					)}
				</div>
				<div className="company-info-table">
					<div className="table-title">{this.context.t("LISTING_DETAILS_SELLER_TITLE_ADDRESS")}</div>
					<div className="company-item">
						<span className="label">{this.context.t("LISTING_DETAILS_SELLER_COUNTRY")}</span>
						{country && country.name && <span className="value">{country.name}</span>}
					</div>
					<div className="company-item">
						<span className="label">{this.context.t("LISTING_DETAILS_SELLER_CITY")}</span>
						{city && <span className="value">{city}</span>}
					</div>
					<div className="company-item">
						<span className="label">{this.context.t("LISTING_DETAILS_SELLER_ZIP")}</span>
						{zip && <span className="value">{zip}</span>}
					</div>
					<div className="company-item">
						<span className="label">{this.context.t("LISTING_DETAILS_SELLER_ADDRESS_1")}</span>
						{address && <span className="value">{address}</span>}
					</div>
					<div className="company-item">
						<span className="label">{this.context.t("LISTING_DETAILS_SELLER_ADDRESS_2")}</span>
						{address2 && <span className="value">{address2}</span>}
					</div>
				</div>
			</Fragment>
		);
	}
}

Seller.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Seller);
