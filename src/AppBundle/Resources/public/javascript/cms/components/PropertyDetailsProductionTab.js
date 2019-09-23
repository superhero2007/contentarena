import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import cloneDeep from "lodash/cloneDeep";
// import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { PRODUCTION_TAB } from "@constants";
import CmsTabLayout from "./CmsTabLayout";
// import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
// import {
// 	CONTENT_DELIVERY,
// 	TECHNICAL_DELIVERY,
// 	GRAPHICS,
// 	ASPECT_RATIO,
// 	COMMENTARY,
// 	CAMERA,
// } from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
// import { updateRightDetails } from "../actions/propertyActions";
// import { getRightsValue, hasRightComment, getDedicatedRigths } from "../helpers/PropertyDetailsHelper";

class PropertyDetailsProductionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// disableEditRight: true,
			config: "",
			// rights: cloneDeep(props.property.rights),
			currentStep: 1,
		};
		this.tabRefs = {};
		Object.values(PRODUCTION_TAB).forEach(item => this.tabRefs[item] = React.createRef());

		this.tabs = [{
			title: "CONTENT_DELIVERY_TITLE",
			type: PRODUCTION_TAB.CONTENT_DELIVERY,
		}, {
			title: "DELIVERY_METHOD_TITLE",
			type: PRODUCTION_TAB.DELIVERY_METHOD,
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
			title: "CAMERA_STANDARDS_TITLE",
			type: PRODUCTION_TAB.CAMERA_STANDARDS,
		}];
	}

	handleSave = (type, config) => {
		const { currentStep } = this.state;
		if (currentStep === this.tabs.length) {
			return;
		}
		this.tabRefs[this.tabs[currentStep - 1].type].current.close();
		this.tabRefs[this.tabs[currentStep].type].current.open();

		this.setState({
			config,
			currentStep: currentStep + 1,
		});
		// 	this.setState({ rights });
		// 	this.props.updateRights("rights", rights);
	};

	render() {
		// const {
		// 	disableEditRight, config, rights,
		// } = this.state;
		//
		// if (rights.length === 0) return null;
		// const firstRight = first(rights);
		// const dedicatedRights = getDedicatedRigths(rights);
		const { currentStep } = this.state;

		return (
			<section className="property-production-tab">
				<div className="property-tab-description body2">
					<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_TAB_TEXT" />
				</div>

				{/*
					<PropertyRightsProductionModal
						onCloseModal={this.handleSave}
						config={config}
						rights={rights}
						onUpdate={this.handleUpdate}
					/>
				*/}
				{this.tabs.map((item, index) => (
					<AccordionContainer
						title={<Translate i18nKey={item.title} />}
						disabled={currentStep < index + 1}
						enableNextStep
						value=""
						opened={currentStep === index + 1}
						ref={this.tabRefs[item.type]}
						key={item.type}
					>
						<CmsTabLayout
							type={item.type}
							onSave={this.handleSave}
						/>
					</AccordionContainer>
				))}
				{/*
					<li className="item">
						<label><Translate i18nKey="RIGHTS_CONTENT_DELIVERY" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(CONTENT_DELIVERY, rights, this.context)}
								onClick={() => this.handleSave(CONTENT_DELIVERY)}
							/>
							{hasRightComment(firstRight, CONTENT_DELIVERY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_TECHNICAL_DELIVERY" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(TECHNICAL_DELIVERY, dedicatedRights, this.context)}
								onClick={() => this.handleSave(TECHNICAL_DELIVERY)}
							/>
							{hasRightComment(firstRight, TECHNICAL_DELIVERY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_GRAPHICS" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(GRAPHICS, dedicatedRights, this.context)}
								onClick={() => this.handleSave(GRAPHICS)}
							/>
							{hasRightComment(firstRight, GRAPHICS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_ASPECT_RATIO" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(ASPECT_RATIO, dedicatedRights, this.context)}
								onClick={() => this.handleSave(ASPECT_RATIO)}
							/>
							{hasRightComment(firstRight, ASPECT_RATIO.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_COMMENTARY" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(COMMENTARY, dedicatedRights, this.context)}
								onClick={() => this.handleSave(COMMENTARY)}
							/>
							{hasRightComment(firstRight, COMMENTARY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_CAMERA" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(CAMERA, dedicatedRights, this.context)}
								onClick={() => this.handleSave(CAMERA)}
							/>
							{hasRightComment(firstRight, CAMERA.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				*/}
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
	// updateRights: (key, value) => dispatch(updateRightDetails(key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsProductionTab);
