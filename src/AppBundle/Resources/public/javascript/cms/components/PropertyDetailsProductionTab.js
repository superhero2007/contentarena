import React, { Component } from "react";
import PropTypes from "prop-types";
import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
import {
	CONTENT_DELIVERY,
	TECHNICAL_DELIVERY,
	GRAPHICS,
	ASPECT_RATIO,
	COMMENTARY,
	CAMERA,
} from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
import { getRightsValue } from "../helpers/PropertyDetailsHelper";

class PropertyDetailsProductionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableEditRight: true,
			isModalOpen: false,
			config: "",
			rights: Object.values(props.rights) || [],
		};
	}

	handleModal = (config = "") => {
		this.setState(state => ({
			isModalOpen: !state.isModalOpen,
			config,
		}));
	};

	handleEditProductions = () => this.setState(state => ({ disableEditRight: !state.disableEditRight }));

	handleApplyProductionsChanges = () => {
		this.handleEditProductions();
		console.warn("apply changes: TODO");
	};

	handleRightUpdate = (rights) => {
		this.setState({ rights });
	};

	render() {
		const {
			disableEditRight, isModalOpen, config, rights,
		} = this.state;

		return (
			<section className="property-production-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TITLE")}</span>
						<span className="sub-title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TITLE")}</span>
					</div>
					<i className="fa fa-pencil-square-o" onClick={this.handleEditProductions} />
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
						<label>{this.context.t("RIGHTS_CONTENT_DELIVERY")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(CONTENT_DELIVERY, rights, this.context)}
							onClick={() => this.handleModal(CONTENT_DELIVERY)}
						/>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_TECHNICAL_DELIVERY")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(TECHNICAL_DELIVERY, rights, this.context)}
							onClick={() => this.handleModal(TECHNICAL_DELIVERY)}
						/>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_GRAPHICS")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(GRAPHICS, rights, this.context)}
							onClick={() => this.handleModal(GRAPHICS)}
						/>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_ASPECT_RATIO")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(ASPECT_RATIO, rights, this.context)}
							onClick={() => this.handleModal(ASPECT_RATIO)}
						/>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_COMMENTARY")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(COMMENTARY, rights, this.context)}
							onClick={() => this.handleModal(COMMENTARY)}
						/>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_CAMERA")}</label>
						<input
							readOnly
							type="text"
							disabled={disableEditRight}
							value={getRightsValue(CAMERA, rights, this.context)}
							onClick={() => this.handleModal(CAMERA)}
						/>
					</li>
				</div>

				{!disableEditRight && (
					<div className="buttons">
						<button
							className="yellow-button centered-btn"
							onClick={this.handleApplyProductionsChanges}
						>
							{this.context.t("Apply")}
						</button>
					</div>
				)}
			</section>
		);
	}
}

PropertyDetailsProductionTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PropertyDetailsProductionTab;
