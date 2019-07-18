import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import EmptyListingOverview from "../components/EmptyScreens/EmptyListingOverview";
import CmsListingOverviewTable from "../components/CmsListingOverviewTable";

class CmsListingOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() { }

	render() {
		const { listings, customId } = this.props.property;
		if (!listings.length) {
			return (
				<section className="listing-overview-tab">
					<EmptyListingOverview />
				</section>
			);
		}

		// const selectedListings = listings.sort();

		return (
			<section className="listing-overview-tab">
				<div className="region-filter">
					<h5>
						<Translate i18nKey="CMS_PROPERTY_TAB_LISTING" />
					</h5>
					<h6>
						<Translate i18nKey="CMS_LISTING_SUBTITLE" />
					</h6>
					<div className="region-filter-bids">
						<div className="region-filter-content">
							<CmsListingOverviewTable listings={listings} propertyId={customId} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

CmsListingOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsListingOverview);
