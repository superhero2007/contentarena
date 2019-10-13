import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { PRODUCTION_TAB } from "@constants";
import CmsTabLayout from "./CmsTabLayout";
import { updateRightDetails } from "../actions/propertyActions";
import { getRightsValue } from "../helpers/PropertyDetailsHelper";

class PropertyDetailsProductionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rights: props.listing ? cloneDeep(props.listing.rights) : cloneDeep(props.property.rights),
			currentStep: 0,
		};
		this.tabRefs = {};
		Object.values(PRODUCTION_TAB).forEach(item => this.tabRefs[item] = React.createRef());

		this.tabs = [{
			title: "CONTENT_DELIVERY_TITLE",
			type: PRODUCTION_TAB.CONTENT_DELIVERY,
		}, {
			title: "TECHNICAL_DELIVERY_TITLE",
			type: PRODUCTION_TAB.TECHNICAL_DELIVERY,
		}, {
			title: "GRAPHICS_TITLE",
			type: PRODUCTION_TAB.GRAPHICS,
		}, {
			title: "ASPECT_RATIO_TITLE",
			type: PRODUCTION_TAB.ASPECT_RATIO,
		}, {
			title: "COMMENTARY_TITLE",
			type: PRODUCTION_TAB.COMMENTARY,
		}, {
			title: "CAMERA_TITLE",
			type: PRODUCTION_TAB.CAMERA,
		}];
	}

	handleSave = (rights, index) => {
		if (index < this.tabs.length - 1) {
			this.tabRefs[this.tabs[index + 1].type].current.open();
		}
		this.tabRefs[this.tabs[index].type].current.close();

		const updateRights = cloneDeep(rights);

		this.setState({
			rights: updateRights,
			currentStep: index + 1,
		});

		if (rights.length && this.props.onChange) this.props.onChange(updateRights);
	};

	render() {
		const { rights } = this.state;
		if (rights.length === 0) return null;
		const { currentStep } = this.state;

		return (
			<section className="property-production-tab">
				<div className="property-tab-description body2">
					<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_TAB_TEXT" />
				</div>

				{this.tabs.map((item, index) => (
					<AccordionContainer
						title={<Translate i18nKey={item.title} />}
						disabled={currentStep < index}
						enableNextStep
						value={getRightsValue(item.type, rights, this.context)}
						opened={currentStep === index}
						ref={this.tabRefs[item.type]}
						key={item.type}
					>
						<CmsTabLayout
							type={item.type}
							rights={rights}
							onSave={value => this.handleSave(value, index)}
						/>
					</AccordionContainer>
				))}
			</section>
		);
	}
}

PropertyDetailsProductionTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({
	updateRights: (key, value) => dispatch(updateRightDetails(key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsProductionTab);
