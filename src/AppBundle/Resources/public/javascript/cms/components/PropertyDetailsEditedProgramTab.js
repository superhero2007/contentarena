import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "@components/Loader/Loader";
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

	onCancel = () => {
		this.setState({ mode: "list", selected: {} });
	};

	onSelect = (program) => {
		this.setState({ mode: "edit", selected: program });
	};

	onDelete = program => this.props.deleteProgram(program.id);

	onCreate = () => {
		this.setState({ mode: "create", selected: {} });
	};

	render() {
		const { property: { programs }, loading } = this.props;
		const { mode, selected } = this.state;

		if (loading) return <Loader xSmall loading />;

		if (mode !== "list") {
			return (
				<section className="property-edited-program-tab">
					<CmsEditedProgramDetail
						program={selected}
						onSave={this.onSave}
						onCancel={this.onCancel}
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
					className="button primary-outline-button"
					onClick={this.onCreate}
				>
					<Translate i18nKey="CMS_EMPTY_EDIT_RIGHTS_BUTTON" />
				</button>
				<CmsEditedProgramList
					programs={programs}
					onSelect={this.onSelect}
					onDelete={this.onDelete}
				/>
			</section>
		);
	}
}

PropertyDetailsEditedProgramTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	loading: state.propertyDetails.loading,
});

const mapDispatchToProps = dispatch => ({
	createProgram: program => dispatch(createProgram(program)),
	updateProgram: program => dispatch(updateProgram(program)),
	deleteProgram: id => dispatch(deleteProgram(id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsEditedProgramTab);
