import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import EmptyEditProgram from "../components/EmptyScreens/EmptyEditProgram";


class CmsEditedProgram extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			programs: [],
		};
	}

	componentDidMount() {
		const { property: { programs } } = this.props;
		this.setState({ programs });
	}

	render() {
		const { programs } = this.state;
		const { history } = this.props;

		if (!programs.length) {
			return (
				<section className="edited-program-tab">
					<EmptyEditProgram history={history} />
				</section>
			);
		}

		return (
			<section className="edited-program-tab" />
		);
	}
}

CmsEditedProgram.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});

export default connect(
	mapStateToProps,
	null,
)(CmsEditedProgram);
