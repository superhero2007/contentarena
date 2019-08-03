import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CmsEditedProgramDetail from "./CmsEditedProgramDetail";
import CmsEditedProgramList from "./CmsEditedProgramList";
import EmptyEditProgram from "./EmptyScreens/EmptyEditProgram";
// import Translate from "@components/Translator/Translate";

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
		if (mode === "create") {
			// TODO: onCreate
		} else {
			// TODO: onUpdate
		}
		this.setState({ mode: "list", selected: {} });
	};

	onSelect = (program) => {
		this.setState({ mode: "edit", selected: program });
	};

	onDelete = (program) => {
		// TODO: onDelete
	};

	onCreate = () => {
		this.setState({ mode: "create", selected: {} });
	};

	render() {
		const { property: { programs } } = this.props;
		const { mode, selected } = this.state;

		if (mode === "list") {
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
				<CmsEditedProgramList
					programs={programs}
					onCreate={this.onCreate}
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
});

export default connect(
	mapStateToProps,
	null,
)(PropertyDetailsEditedProgramTab);
