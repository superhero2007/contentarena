import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import Loader from "@components/Loader/Loader";
import first from "lodash/first";
import Translate from "@components/Translator/Translate";
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
import { updateRightDetails, updateSinglePropertyByKeyValue } from "../actions/propertyActions";

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
			isModalOpen, config, rights,
		} = this.state;

		const {
			loading,
		} = this.props;

		if (rights.length === 0) return null;
		const firstRight = first(rights);

		return (
			<section className="property-rights-tab">
				<h6>
					<Translate i18nKey="PROPERTY_DETAILS_RIGHT_TAB_TEXT" />
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
						<label>
							{SUBLICENSE.name}
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(SUBLICENSE, rights, this.context)}
								onClick={() => this.handleModal(SUBLICENSE)}
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
								onClick={() => this.handleModal(BROADCASTING)}
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
								onClick={() => this.handleModal(EXPLOITATION_FORM)}
							/>
							{hasRightComment(firstRight, EXPLOITATION_FORM.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				<div className="row">
					<li className="item">
						<label>
							<Translate i18nKey="RIGHTS_TRANSMISSION_MEANS" />
						</label>
						<div className="input-wrapper">
							<input
								readOnly
								type="text"
								value={getRightsValue(TRANSMISSION_MEANS, rights, this.context)}
								onClick={() => this.handleModal(TRANSMISSION_MEANS)}
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
								onClick={() => this.handleModal(LICENSED_LANGUAGES)}
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
								onClick={() => this.handleModal(RESERVED_RIGHTS)}
							/>
							{hasRightComment(firstRight, RESERVED_RIGHTS.key) && <i className="fa fa-commenting-o" />}
						</div>
					</li>
				</div>

				{loading && <Loader xSmall loading />}

			</section>
		);
	}
}

PropertyDetailsRightsTab.contextTypes = {
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
)(PropertyDetailsRightsTab);
