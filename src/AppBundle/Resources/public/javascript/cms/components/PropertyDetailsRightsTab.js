import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
import {
	SUBLICENSE,
	BROADCASTING,
	TRANSMISSION_MEANS,
	EXPLOITATION_FORM,
	LICENSED_LANGUAGES,
	RESERVED_RIGHTS,
} from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
import { getRightsValue } from "../helpers/PropertyDetailsHelper";

class PropertyDetailsRightsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableEditRight: true,
			isModalOpen: false,
			config: "",
			rights: cloneDeep(props.property.rights),
		};
	}

	handleEditRights = () => this.setState(state => ({ disableEditRight: !state.disableEditRight }));

	handleModal = (config = "") => {
		this.setState(state => ({
			isModalOpen: !state.isModalOpen,
			config,
		}));
	};

	handleApplyRightChanges = () => {
		this.handleEditRights();
		console.warn("apply changes: TODO");
	};

	handleRightUpdate = (rights) => {
		this.setState({ rights });
	};

	render() {
		const {
			disableEditRight, isModalOpen, config, rights,
		} = this.state;

		if (rights.length === 0) return null;

		return (
			<section className="property-rights-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TITLE")}</span>
						<span className="sub-title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TITLE")}</span>
					</div>
					<i className="fa fa-pencil-square-o" onClick={this.handleEditRights} />
				</div>

				{isModalOpen && (
					<PropertyRightsProductionModal
						isOpen={isModalOpen}
						onCloseModal={this.handleModal}
						config={config}
						rights={rights}
						onUpdate={this.handleRightUpdate}
					/>
				)}

				<div className="row">
					<li className="item">
						<label>{SUBLICENSE.name}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(SUBLICENSE, rights, this.context)}
							onClick={() => this.handleModal(SUBLICENSE)}
						/>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_BROADCASTING")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(BROADCASTING, rights, this.context)}
							onClick={() => this.handleModal(BROADCASTING)}
						/>
					</li>
					<li className="item">
						<label>{EXPLOITATION_FORM.name}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(EXPLOITATION_FORM, rights, this.context)}
							onClick={() => this.handleModal(EXPLOITATION_FORM)}
						/>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_TRANSMISSION_MEANS")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(TRANSMISSION_MEANS, rights, this.context)}
							onClick={() => this.handleModal(TRANSMISSION_MEANS)}
						/>
					</li>
					<li className="item">
						<label>{LICENSED_LANGUAGES.name}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(LICENSED_LANGUAGES, rights, this.context)}
							onClick={() => this.handleModal(LICENSED_LANGUAGES)}
						/>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_RESERVED_RIGHTS")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(RESERVED_RIGHTS, rights, this.context)}
							onClick={() => this.handleModal(RESERVED_RIGHTS)}
						/>
					</li>
				</div>

				{!disableEditRight && (
					<div className="buttons">
						<button className="yellow-button centered-btn" onClick={this.handleApplyRightChanges}>{this.context.t("Apply")}</button>
					</div>
				)}
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

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsRightsTab);
