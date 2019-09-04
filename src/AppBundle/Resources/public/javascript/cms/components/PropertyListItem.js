import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import { getListingImage } from "../../common/utils/listing";
import PropertyListingTable from "./PropertyListingTable";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";

class PropertyListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			name, customId, listings = [], history, closedBids, openBids = 0,
		} = this.props;
		return (
			<section
				className="property-item-wrapper"
			>
				<div className="property-item-name">
					{name}
				</div>
				<div className="property-item-info">
					<Translate i18nKey="CMS_PROPERTY_LISTINGS" />
					<span className="property-item-count">
						({listings.length})
					</span>
				</div>
				<div className="property-item-info">
					<Translate i18nKey="CMS_PROPERTY_OPEN_BID" />
					<span className="property-item-count">
						({openBids})
					</span>
				</div>
				<div className="property-item-info">
					<Translate i18nKey="CMS_PROPERTY_CLOSED_BID" />
					<span className="property-item-closed">
						({closedBids})
					</span>
				</div>
				<div className="property-item-link">
					<i className="fa fa-eye" />
					<a onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`)}>
						<Translate i18nKey="CMS_PROPERTY_VIEW_LISTING_OVERVIEW" />
					</a>
				</div>
			</section>
		);
	}
}

export default PropertyListItem;
