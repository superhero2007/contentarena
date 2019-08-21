import React from "react";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { ROUTE_PATHS } from "@constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PropertyHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			name, customId, deals = true, edit = true,
		} = this.props;
		return (
			<h4 className="title title-property-wrapper">
				<span>{name}</span>
				<div className="title-action-wrapper">
					<a className="ca-btn primary" href={ROUTE_PATHS.CREATE_LISTING}>
						<Translate i18nKey="CMS_EMPTY_LISTING_CREATE_LISTING" />
					</a>
					<Link
						to={`${ROUTE_PATHS.PROPERTIES}/${customId}/deals`}
						className="ca-btn primary"
						disabled={!deals}
					>
						<Translate i18nKey="CMS_PROPERTY_ADD_DEAL" />
					</Link>
					<Link
						to={`${ROUTE_PATHS.PROPERTIES}/${customId}/edit`}
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
