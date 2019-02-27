import React from "react";

import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import SellButtons from "../containers/SellButtons";
import SellFormSteps from "../containers/SellFormSteps";
import SellFormStep1 from "../containers/SellFormStep1";
import SellFormStep2 from "../containers/SellFormStep2";
import SellFormStep3 from "../containers/SellFormStep3";
import SellFormStep4 from "../containers/SellFormStep4";
import ReviewAndSign from "../containers/ReviewAndSign";
import SelectorModal from "../../common/modals/SelectorModal/SelectorModal";
import { updateProfile } from "../../main/actions/userActions";

class SellForm extends React.Component {
	constructor(props) {
		super(props);

		let content = (props.content.initialized) ? props.content : JSON.parse(props.newListing);

		if (content === null) props.history.push("/managelistings");

		if (content.law === undefined || content.law === null) {
			content.law = {
				label: content.company.country.name,
				value: content.company.country.name,
				name: content.company.country.name,
			};
		}

		if (content.userCanNotView) props.history.push("/managelistings");

		content = ContentArena.Utils.contentParserFromServer(content);

		if (props.match && props.match.params.step) {
			content.step = (props.match.params.step === "sign") ? 5 : Number(props.match.params.step);
		}

		this.state = {
			content,
			showSearch: props.match.params.customId === "new",
			editProgramDescriptionOptional: true,
		};
	}

	componentDidMount = () => {
		jQuery("body, .marketplace-container").css("background-color", "#eee"); // todo: remove this when other page redesign ready
		this.props.contentListingInit(this.state.content);
	};

	componentWillUnmount() {
		jQuery("body, .marketplace-container").removeAttr("style"); // todo: remove this when other page redesign ready
	}

	render() {
		const { history } = this.props;

		document.title = "Content Arena - Create Listing";

		return (
			<div className="manager-content">
				<SelectorModal />

				<div className="sell-form-steps-wrapper">
					<SellFormSteps history={history} />
					<SellFormStep1 history={history} showSearch={this.state.showSearch} />
					<SellFormStep2 packages={this.props.packages} />
					<SellFormStep3 packages={this.props.packages} />
					<SellFormStep4 packages={this.props.packages} />
					<ReviewAndSign history={history} />
				</div>

				<SellButtons history={history} />
				<ReactTooltip html />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
	contentListingInit: content => dispatch({
		type: "CONTENT_INIT",
		content,
	}),
	updateProfile: profile => dispatch(updateProfile(profile)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SellForm);
