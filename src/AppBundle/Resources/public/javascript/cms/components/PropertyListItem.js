import React from "react";
import Translate from "@components/Translator/Translate";
import cn from "classnames";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";

class PropertyListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	goToCommercial = () => {
		const { customId, history } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.COMMERCIAL}`);
	};

	goToListings = () => {
		const { customId, history } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.LISTING}`);
	};

	goToRights = () => {
		const { customId, history } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	render() {
		const {
			name, listings = [], closedBids, openBids = 0, sportCategory,
		} = this.props;
		return (
			<section
				className="property-item-wrapper"
			>
				<div className="property-item-name clickable" onClick={this.goToRights}>
					{name}
					<span>
						{sportCategory[0].name}
					</span>
				</div>
				<div
					className={cn("property-item-info", { clickable: listings.length > 0 })}
					 onClick={(listings.length > 0 && this.goToListings) || null}
				>
					<Translate i18nKey="CMS_PROPERTY_LISTINGS" />
					<span className="property-item-count">
						({listings.length})
					</span>
				</div>
				<div
					className={cn("property-item-info", { clickable: openBids > 0 })}
					 onClick={(openBids > 0 && this.goToCommercial) || null}
				>
					<Translate i18nKey="CMS_PROPERTY_OPEN_BID" />
					<span className="property-item-count">
						({openBids})
					</span>
				</div>
				<div
					className={cn("property-item-info", { clickable: closedBids > 0 })}
					 onClick={(closedBids > 0 && this.goToCommercial) || null}
				>
					<Translate i18nKey="CMS_PROPERTY_CLOSED_BID" />
					<span className={cn("property-item-count", { "property-item-closed": closedBids > 0 })}>
						({closedBids})
					</span>
				</div>
				<div className="property-item-link">
					<i className="icon-view" />
					<a onClick={this.goToRights}>
						<Translate i18nKey="CMS_PROPERTY_VIEW_LISTING_OVERVIEW" />
					</a>
				</div>
			</section>
		);
	}
}

export default PropertyListItem;
