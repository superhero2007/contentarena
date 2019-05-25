import React from "react";
import PropTypes from "prop-types";
import { getListingImage } from "../../common/utils/listing";
import PropertyListingTable from "./PropertyListingTable";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";

class PropertyListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getOpenBid = () => {
		// TODO: YU take a look after implemented BE for this
		const { salesPackages = [] } = this.props;
		return salesPackages.filter(item => item.status.name !== "REJECTED" && item.content.status.name !== "EXPIRED").length;
	};

	getClosedBid = () => {
		// TODO: YU take a look after implemented BE for this
		const { salesPackages = [] } = this.props;
		return salesPackages.filter(item => item.status.name === "REJECTED" || item.content.status.name === "EXPIRED").length;
	};

	render() {
		const {
			name, customId, listings = [], history,
		} = this.props; // TODO: YU check listings property
		return (
			<section className="property-item-wrapper">
				<div className="property-wrapper d-flex">
					<div className="property-img">{getListingImage(this.props)}</div>
					<div className="property-info">
						<a
							className="ca-title"
							onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}`)}
						>
							{name}
						</a>
						<div className="bids-wrapper">
							<div className="open-bid">
								<span>{this.getOpenBid()}</span>
								{this.context.t("CMS_PROPERTY_OPEN_BID")}
							</div>
							<div className="closed-bid">
								<span>{this.getClosedBid()}</span>
								{this.context.t("CMS_PROPERTY_CLOSED_BID")}
							</div>
							<button
								onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.LISTING}`)}
								className="link-button"
							>
								{this.context.t("CMS_PROPERTY_VIEW_LISTING_OVERVIEW")}
							</button>
						</div>
					</div>
				</div>
				{listings.length !== 0 && <PropertyListingTable listings={listings} />}
			</section>
		);
	}
}

PropertyListItem.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyListItem;
