import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import cloneDeep from "lodash/cloneDeep";
// import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { RIGHTS_TAB } from "@constants";
import CmsTabLayout from "./CmsTabLayout";
import CmsLanguageFilter from "./CmsLanguageFilter";
// import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
// import {
// 	SUBLICENSE,
// 	BROADCASTING,
// 	TRANSMISSION_MEANS,
// 	EXPLOITATION_FORM,
// 	LICENSED_LANGUAGES,
// 	RESERVED_RIGHTS,
// } from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
// import { getRightsValue, hasRightComment } from "../helpers/PropertyDetailsHelper";
// import { updateRightDetails, updateSinglePropertyByKeyValue } from "../actions/propertyActions";

class PropertyDetailsRightsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// disableEditRight: true,
			config: "",
			// rights: cloneDeep(props.property.rights),
			currentStep: 1,
		};
		this.tabRefs = {};
		Object.values(RIGHTS_TAB).forEach(item => this.tabRefs[item] = React.createRef());

		this.tabs = [{
			title: "RIGHT_TO_SUBLICENSE_TITLE",
			type: RIGHTS_TAB.RIGHT_TO_SUBLICENSE,
		}, {
			title: "TRANSMISSION_OBLIGATION_TITLE",
			type: RIGHTS_TAB.TRANSMISSION_OBLIGATION,
		}, {
			title: "TRANSMISSION_FORM_TITLE",
			type: RIGHTS_TAB.TRANSMISSION_FORM,
		}, {
			title: "TRANSMISSION_MEANS_TITLE",
			type: RIGHTS_TAB.TRANSMISSION_MEANS,
		}, {
			title: "LICENSED_LANGUAGES_TITLE",
			type: RIGHTS_TAB.LICENSED_LANGUAGES,
		}, {
			title: "RESERVED_RIGHTS_TITLE",
			type: RIGHTS_TAB.RESERVED_RIGHTS,
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
		// 	config, rights,
		// } = this.state;
		//
		// if (rights.length === 0) return null;
		// const firstRight = first(rights);
		const { currentStep } = this.state;

		return (
			<section className="property-rights-tab">
				<div className="property-tab-description body2">
					<Translate i18nKey="PROPERTY_DETAILS_RIGHT_TAB_TEXT" />
				</div>

				{/*
					<PropertyRightsProductionModal
						isOpen={isModalOpen}
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
						<label>
							{SUBLICENSE.name}
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(SUBLICENSE, rights, this.context)}
								onClick={() => this.handleSave(SUBLICENSE)}
							/>
							{hasRightComment(firstRight, SUBLICENSE.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>
							<Translate i18nKey="RIGHTS_BROADCASTING" />
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(BROADCASTING, rights, this.context)}
								onClick={() => this.handleSave(BROADCASTING)}
							/>
							{hasRightComment(firstRight, BROADCASTING.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>
							{EXPLOITATION_FORM.name}
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(EXPLOITATION_FORM, rights, this.context)}
								onClick={() => this.handleSave(EXPLOITATION_FORM)}
							/>
							{hasRightComment(firstRight, EXPLOITATION_FORM.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>
							<Translate i18nKey="RIGHTS_TRANSMISSION_MEANS" />
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(TRANSMISSION_MEANS, rights, this.context)}
								onClick={() => this.handleSave(TRANSMISSION_MEANS)}
							/>
							{hasRightComment(firstRight, TRANSMISSION_MEANS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>
							{LICENSED_LANGUAGES.name}
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(LICENSED_LANGUAGES, rights, this.context)}
								onClick={() => this.handleSave(LICENSED_LANGUAGES)}
							/>
							{hasRightComment(firstRight, LICENSED_LANGUAGES.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>
							<Translate i18nKey="RIGHTS_RESERVED_RIGHTS" />
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(RESERVED_RIGHTS, rights, this.context)}
								onClick={() => this.handleSave(RESERVED_RIGHTS)}
							/>
							{hasRightComment(firstRight, RESERVED_RIGHTS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				*/}

			</section>
		);
	}
}

PropertyDetailsRightsTab.contextTypes = {
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
)(PropertyDetailsRightsTab);
