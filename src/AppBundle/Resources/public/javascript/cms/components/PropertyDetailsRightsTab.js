import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import first from "lodash/first";
import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
import {
	SUBLICENSE,
	BROADCASTING,
	TRANSMISSION_MEANS,
	EXPLOITATION_FORM,
	LICENSED_LANGUAGES,
	RESERVED_RIGHTS,
} from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
import { getRightsValue, hasRightComment } from "../helpers/PropertyDetailsHelper";
import { updateSinglePropertyByKeyValue } from "../actions/propertyActions";

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
		const { rights } = this.state;
		this.handleEditRights();
		this.props.updateRights("rights", rights);
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

		return (
			<section className="property-rights-tab">
				<div className="title-property-tab">
					<div className="title-wrapper">
						<span className="title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TITLE")}</span>
						<span className="sub-title">{this.context.t("PROPERTY_DETAILS_RIGHT_TAB_TEXT")}</span>
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
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(SUBLICENSE, rights, this.context)}
								onClick={() => this.handleModal(SUBLICENSE)}
							/>
							{hasRightComment(firstRight, SUBLICENSE.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_BROADCASTING")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(BROADCASTING, rights, this.context)}
								onClick={() => this.handleModal(BROADCASTING)}
							/>
							{hasRightComment(firstRight, BROADCASTING.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{EXPLOITATION_FORM.name}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(EXPLOITATION_FORM, rights, this.context)}
								onClick={() => this.handleModal(EXPLOITATION_FORM)}
							/>
							{hasRightComment(firstRight, EXPLOITATION_FORM.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>{this.context.t("RIGHTS_TRANSMISSION_MEANS")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(TRANSMISSION_MEANS, rights, this.context)}
								onClick={() => this.handleModal(TRANSMISSION_MEANS)}
							/>
							{hasRightComment(firstRight, TRANSMISSION_MEANS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{LICENSED_LANGUAGES.name}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(LICENSED_LANGUAGES, rights, this.context)}
								onClick={() => this.handleModal(LICENSED_LANGUAGES)}
							/>
							{hasRightComment(firstRight, LICENSED_LANGUAGES.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
					<li className="item">
						<label>{this.context.t("RIGHTS_RESERVED_RIGHTS")}</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								disabled={disableEditRight}
								value={getRightsValue(RESERVED_RIGHTS, rights, this.context)}
								onClick={() => this.handleModal(RESERVED_RIGHTS)}
							/>
							{hasRightComment(firstRight, RESERVED_RIGHTS.key) && <i className="fa fa-commenting-o" />}
						</div>
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

const mapDispatchToProps = dispatch => ({
	updateRights: (key, value) => dispatch(updateSinglePropertyByKeyValue(key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsRightsTab);
