import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { PROPERTY_MAIN_TABS, ROUTE_PATHS } from "@constants";
import { Link } from "react-router-dom";

class PropertyHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			name, customId, deals = true, edit = true, listing = true,
		} = this.props;
		return (
			<h4 className="title title-property-wrapper">
				<span>
					{name}
				</span>
				<div className="title-action-wrapper">
					<Link
						to={`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.CREATE_LISTING}`}
						className="ca-btn primary"
						disabled={!listing}
					>
						<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
					</Link>
					<Link
						to={`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.ADD_DEALS}`}
						className="ca-btn primary"
						disabled={!deals}
					>
						<Translate i18nKey="CMS_PROPERTY_ADD_DEAL" />
					</Link>
					<Link
						to={`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.EDIT}`}
						className="ca-btn primary"
						disabled={!edit}
					>
						<Translate i18nKey="CMS_PROPERTY_EDIT_PROPERTY" />
					</Link>
				</div>
			</h4>
		);
	}
}

const mapStateToProps = state => ({
	...state.propertyDetails.property,
});

export default connect(
	mapStateToProps,
	null,
)(PropertyHeader);
