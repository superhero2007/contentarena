import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { ProgramTypesDefinitions } from "../../main/components/ProgramTypesDefinitions";
import { RepresentationTextArea } from "../../sell/components/SellFormItems";

class ProgramDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	programDescription = description => description && (
		<div className="description-wrapper">
			<div className="title spacer-bottom">
				{this.context.t("LISTING_DETAILS_EDITED_PROGRAM_DESCRIPTION")}
			</div>
			<div className="spacer-bottom txt description-text">
				<RepresentationTextArea value={description} />
			</div>
		</div>
	);

	programTitle = title => (
		<div className="row-title">
			<b>{title}</b>
		</div>
	);

	programItem = (text, value, additionText) => (
		<div className="row-item-wrapper">
			<div className="row-item">
				<div className="cap">{text}</div>
				{value && <b>{value}</b>}
			</div>
			{additionText && <i>{additionText}</i>}
		</div>
	);

	getProgramTitle = () => ({
		episode: this.context.t("LISTING_DETAILS_PROGRAM_TITLE_EPISODES"),
		duration: this.context.t("LISTING_DETAILS_PROGRAM_TITLE_DURATION"),
		type: this.context.t("LISTING_DETAILS_PROGRAM_TITLE_TYPE"),
		release: this.context.t("LISTING_DETAILS_PROGRAM_TITLE_RELEASE"),
		differentLength: this.context.t("INCLUDED_EPISODES_HAVE_DIFFERENT_LENGTH"),
	});

	render() {
		const {
			PROGRAM_NAME,
			PROGRAM_YEAR = "Not available",
			PROGRAM_DESCRIPTION,
			PROGRAM_DURATION,
			PROGRAM_EPISODES,
			PROGRAM_TYPE,
			EDIT_PROGRAM_DESCRIPTION_OPTIONAL,
		} = this.props;

		const programsTitle = this.getProgramTitle();

		const title = `${this.context.t("LISTING_DETAILS_PROGRAM_TITLE_NAME")} - ${PROGRAM_NAME}`;
		const differentLengthText = EDIT_PROGRAM_DESCRIPTION_OPTIONAL === undefined || EDIT_PROGRAM_DESCRIPTION_OPTIONAL
			? null
			: programsTitle.differentLength; // old listings have that flag as undefined so we should treat it as default 'true'

		return (
			<div>
				{this.programDescription(PROGRAM_DESCRIPTION)}
				<div className="description-info">
					{this.programTitle(title)}
					<div className="col-wrapper">
						<div className="col">
							{this.programItem(programsTitle.episode, PROGRAM_EPISODES)}
							{this.programItem(programsTitle.duration, PROGRAM_DURATION, differentLengthText)}
						</div>
						<div className="col">
							{PROGRAM_TYPE && this.programItem(programsTitle.type, ProgramTypesDefinitions[PROGRAM_TYPE])}
							{this.programItem(programsTitle.release, PROGRAM_YEAR)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProgramDetails.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default ProgramDetails;
