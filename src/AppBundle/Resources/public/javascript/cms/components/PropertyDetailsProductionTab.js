import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import first from "lodash/first";
import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
import {
	CONTENT_DELIVERY,
	TECHNICAL_DELIVERY,
	GRAPHICS,
	ASPECT_RATIO,
	COMMENTARY,
	CAMERA,
} from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
import { updatedPropertyRights } from "../actions/propertyActions";
import { getRightsValue, hasRightComment, getDedicatedRigths } from "../helpers/PropertyDetailsHelper";

class PropertyDetailsProductionTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableEditRight: true,
			isModalOpen: false,
			config: "",
			rights: cloneDeep(props.property.rights),
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
		const { rights } = this.state;
		this.handleEditProductions();
		this.props.updateRights(rights);
	};

	handleRightUpdate = (rights) => {
		this.setState({ rights });
	};

	render() {
		const {
			disableEditRight, isModalOpen, config, rights,
		} = this.state;

		if (rights.length === 0) return null;
		const firstRight = first(rights);
		const dedicatedRights = getDedicatedRigths(rights);

		return (
			<section className="property-production-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title">{this.context.t("PROPERTY_DETAILS_PRODUCTION_TAB_TITLE")}</span>
						<span className="sub-title">{this.context.t("PROPERTY_DETAILS_PRODUCTION_TAB_TEXT")}</span>
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
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(CONTENT_DELIVERY, rights, this.context)}
								onClick={() => this.handleModal(CONTENT_DELIVERY)}
							/>
							{hasRightComment(firstRight, CONTENT_DELIVERY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_TECHNICAL_DELIVERY")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(TECHNICAL_DELIVERY, dedicatedRights, this.context)}
								onClick={() => this.handleModal(TECHNICAL_DELIVERY)}
							/>
							{hasRightComment(firstRight, TECHNICAL_DELIVERY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_GRAPHICS")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(GRAPHICS, dedicatedRights, this.context)}
								onClick={() => this.handleModal(GRAPHICS)}
							/>
							{hasRightComment(firstRight, GRAPHICS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_ASPECT_RATIO")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(ASPECT_RATIO, dedicatedRights, this.context)}
								onClick={() => this.handleModal(ASPECT_RATIO)}
							/>
							{hasRightComment(firstRight, ASPECT_RATIO.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_COMMENTARY")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(COMMENTARY, dedicatedRights, this.context)}
								onClick={() => this.handleModal(COMMENTARY)}
							/>
							{hasRightComment(firstRight, COMMENTARY.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_CAMERA")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(CAMERA, dedicatedRights, this.context)}
								onClick={() => this.handleModal(CAMERA)}
							/>
							{hasRightComment(firstRight, CAMERA.key) && <i className="fa fa-commenting-o" />}
						</div>
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

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({
	updateRights: rights => dispatch(updatedPropertyRights(rights)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsProductionTab);
