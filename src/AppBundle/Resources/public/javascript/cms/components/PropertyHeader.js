import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { PROPERTY_MAIN_TABS, ROUTE_PATHS } from "@constants";

class PropertyHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			history, name, sportCategory, customId, deals = true, edit = true, listing = true,
		} = this.props;
		return (
			<div className="default-box-header">
				<div className="property-header">
					<h4 className="property-header-title">
						{sportCategory[0].name}
					</h4>
					<h3 className="property-header-name">
						{name}
					</h3>
				</div>

				<button
					className="button primary-outline-button"
					disabled={!listing}
					onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.CREATE_LISTING}`)}
				>
					<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
				</button>
				<button
					className="button primary-outline-button"
					disabled={!deals}
					style={{ marginLeft: 10 }}
					onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.ADD_DEALS}`)}
				>
					<Translate i18nKey="CMS_PROPERTY_ADD_DEAL" />
				</button>
				<button
					className="button primary-outline-button"
					disabled={!edit}
					style={{ marginLeft: 10 }}
					onClick={() => history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${PROPERTY_MAIN_TABS.EDIT}`)}
				>
					<Translate i18nKey="CMS_PROPERTY_EDIT_PROPERTY" />
				</button>
			</div>
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
