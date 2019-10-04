import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { RIGHTS_TAB } from "@constants";
import CmsTabLayout from "./CmsTabLayout";
import { getRightsValue } from "../helpers/PropertyDetailsHelper";
import { updateRightDetails } from "../actions/propertyActions";

class PropertyDetailsRightsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rights: cloneDeep(props.property.rights),
			currentStep: 0,
		};
		this.tabRefs = {};
		Object.values(RIGHTS_TAB).forEach(item => this.tabRefs[item] = React.createRef());

		this.tabs = [{
			title: "SUBLICENSE_TITLE",
			type: RIGHTS_TAB.SUBLICENSE,
		}, {
			title: "BROADCASTING_TITLE",
			type: RIGHTS_TAB.BROADCASTING,
		}, {
			title: "EXPLOITATION_FORM_TITLE",
			type: RIGHTS_TAB.EXPLOITATION_FORM,
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

	handleSave = (rights, index) => {
		if (index < this.tabs.length - 1) {
			this.tabRefs[this.tabs[index + 1].type].current.open();
		}
		this.tabRefs[this.tabs[index].type].current.close();

		this.setState({
			rights: cloneDeep(rights),
			currentStep: index + 1,
		});
		// this.props.updateRights("rights", rights);
	};

	render() {
		const { rights } = this.state;
		if (rights.length === 0) return null;
		const { currentStep } = this.state;

		return (
			<section className="property-production-tab">
				<div className="property-tab-description body2">
					<Translate i18nKey="PROPERTY_DETAILS_RIGHT_TAB_TEXT" />
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

PropertyDetailsRightsTab.contextTypes = {
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
)(PropertyDetailsRightsTab);
