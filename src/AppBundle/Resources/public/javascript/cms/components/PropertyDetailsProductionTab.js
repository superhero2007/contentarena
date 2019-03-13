import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader/Loader";
import PropertyRightsProductionModal from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionModal";
import {
	CONTENT_DELIVERY,
	TECHNICAL_DELIVERY,
	GRAPHICS,
	ASPECT_RATIO,
	COMMENTARY,
	CAMERA,
} from "../../common/modals/PropertyRightsProductionModal/PropertyRightsProductionConfig";
import { updateRightDetails } from "../actions/propertyActions";
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

	handleRightUpdate = (rights) => {
		this.setState({ rights });
		this.props.updateRights("rights", rights);
	};

	render() {
		const {
			disableEditRight, isModalOpen, config, rights,
		} = this.state;

		const {
			loading,
		} = this.props;

		if (rights.length === 0) return null;
		const firstRight = first(rights);
		const dedicatedRights = getDedicatedRigths(rights);

		return (
			<section className="property-production-tab">
				<h6>
					<Translate i18nKey="PROPERTY_DETAILS_PRODUCTION_TAB_TEXT" />
				</h6>

				{isModalOpen && (
					<PropertyRightsProductionModal
						isOpen={isModalOpen}
						onCloseModal={this.handleModal}
						config={config}
						rights={rights}
						onUpdate={this.handleRightUpdate}
					/>
				)}
				<div className="row" style={{ marginTop: 20 }}>
					<li className="item">
						<label><Translate i18nKey="RIGHTS_CONTENT_DELIVERY" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(CONTENT_DELIVERY, rights, this.context)}
								onClick={() => this.handleModal(CONTENT_DELIVERY)}
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
								onClick={() => this.handleModal(TECHNICAL_DELIVERY)}
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
								onClick={() => this.handleModal(GRAPHICS)}
							/>
							{hasRightComment(firstRight, GRAPHICS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label><Translate i18nKey="RIGHTS_ASPECT_RATIO" /></label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(ASPECT_RATIO, dedicatedRights, this.context)}
								onClick={() => this.handleModal(ASPECT_RATIO)}
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
								onClick={() => this.handleModal(COMMENTARY)}
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
								onClick={() => this.handleModal(CAMERA)}
							/>
							{hasRightComment(firstRight, CAMERA.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				{loading && <Loader xSmall loading />}
			</section>
		);
	}
}

PropertyDetailsProductionTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	loading: state.propertyDetails.loading,
});

const mapDispatchToProps = dispatch => ({
	updateRights: (key, value) => dispatch(updateRightDetails(key, value)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsProductionTab);
