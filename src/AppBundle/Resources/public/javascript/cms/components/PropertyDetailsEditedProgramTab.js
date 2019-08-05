import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsEditedProgramDetail from "./CmsEditedProgramDetail";
import CmsEditedProgramList from "./CmsEditedProgramList";
import EmptyEditProgram from "./EmptyScreens/EmptyEditProgram";

import {
	createProgram,
	updateProgram,
	deleteProgram,
} from "../actions/propertyActions";

class PropertyDetailsEditedProgramTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "list",
			selected: {},
		};
	}

	onSave = (program) => {
		const { mode } = this.state;
		const { createProgram, updateProgram } = this.props;
		if (mode === "create") {
			createProgram(program);
		} else {
			updateProgram(program);
		}
		this.setState({ mode: "list", selected: {} });
	};

	onSelect = (program) => {
		this.setState({ mode: "edit", selected: program });
	};

	onDelete = (program) => {
		const { deleteProgram } = this.props;
		deleteProgram(program.customId);
	};

	onCreate = () => {
		this.setState({ mode: "create", selected: {} });
	};

	render() {
		const { property: { programs } } = this.props;
		const { mode, selected } = this.state;

		if (mode !== "list") {
			return (
				<section className="property-edited-program-tab">
					<CmsEditedProgramDetail
						program={selected}
						onSave={this.onSave}
					/>
				</section>
			);
		}

		if (!programs.length) {
			return (
				<section className="property-edited-program-tab">
					<EmptyEditProgram
						onCreate={this.onCreate}
					/>
				</section>
			);
		}

		return (
			<section className="property-edited-program-tab">
				<button
					className="ca-btn primary property-edited-program-tab__button"
					onClick={this.onCreate}
				>
					<Translate i18nKey="CMS_EMPTY_EDIT_RIGHTS_BUTTON" />
				</button>
				<div className="property-edited-program-tab__list">
					<CmsEditedProgramList
						programs={programs}
						onSelect={this.onSelect}
						onDelete={this.onDelete}
					/>
				</div>
			</section>
		);
	}
}

PropertyDetailsEditedProgramTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

const mapDispatchToProps = dispatch => ({
	createProgram: program => dispatch(createProgram(program)),
	updateProgram: program => dispatch(updateProgram(program)),
	deleteProgram: customId => dispatch(deleteProgram(customId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsEditedProgramTab);
