import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Moment from "moment/moment";
import { test } from "../actions";
import { RightDefinitions } from "../../sell/components/RightDefinitions";
import { ProductionStandardsDefinitions } from "../../sell/components/ProductionStandardsDefinitions";
import { RightItemsDefinitions } from "../../sell/components/RightItemsDefinitions";
import { SuperRightProductionDetailsLabels } from "../../sell/components/SuperRightDefinitions";
import { RepresentationTextArea } from "../../sell/components/SellFormItems";
import { DATE_FORMAT } from "@constants";
import RightTableItem from "../components/RightTableItem";

class TermSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getDetailsByKey = (key, name) => {
		const translations = {
			SUBLICENSE: this.context.t("RIGHTS_SUBLICENSE_DETAILS"),
			BROADCASTING: this.context.t("RIGHTS_BROADCASTING_DETAILS"),
			TRANSMISSION_MEANS: this.context.t("RIGHTS_TRANSMISSION_MEANS_DETAILS"),
			EXPLOITATION_FORM: this.context.t("RIGHTS_EXPLOITATION_FORM_DETAILS"),
			LICENSED_LANGUAGES: this.context.t("RIGHTS_LICENSED_LANGUAGES_DETAILS"),
			RUNS: this.context.t("RIGHTS_RUNS_DETAILS"),
			EXPLOITATION_WINDOW: this.context.t("RIGHTS_EXPLOITATION_WINDOW_DETAILS"),
			RESERVED_RIGHTS: this.context.t("RIGHTS_RESERVED_RIGHTS_DETAILS"),
			VIDEO_STANDARD: this.context.t("RIGHTS_VIDEO_STANDARD_DETAILS"),
			ASPECT_RATIO: this.context.t("RIGHTS_ASPECT_RATIO_DETAILS"),
			COMMENTARY: this.context.t("RIGHTS_COMMENTARY_DETAILS"),
			TECHNICAL_DELIVERY: this.context.t("RIGHTS_TECHNICAL_DELIVERY_DETAILS"),
			GRAPHICS: this.context.t("RIGHTS_GRAPHICS_DETAILS"),
			CAMERA: this.context.t("RIGHTS_CAMERA_DETAILS"),
			CONTENT_DELIVERY: this.context.t("RIGHTS_CONTENT_DELIVERY_DETAILS"),
		};

		return typeof translations[key] !== "undefined" ? translations[key] : `${name} Details`;
	};

	hasRight = (shortLabel) => {
		const { rightsPackage } = this.props;
		return rightsPackage.filter(rp => rp.shortLabel === shortLabel).length > 0;
	};

	renderProgramInfo = (values, name, deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated) => {
		const { rightsPackage } = this.props;
		return (
			<tr className="row" key={`program-${name}`}>
				<RightTableItem
					className="right-name"
					value={name}
				/>
				{
					rightsPackage.map((rp, k) => {
						let liveFeedColumn = deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === rp.shortLabel;

						if ((rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
								|| highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"
						)
							&& !liveFeedColumn
							&& rp.shortLabel !== "LT") return;

						if (rp.shortLabel !== "PR" || !values) return <RightTableItem value="-" />;

						return (
							<RightTableItem
								value={values.length === 0 ? "No" : values.map(l => l.label).join(", ")}
							/>
						);
					})
				}
			</tr>
		);
	};

	renderList = (definitions, checkContentDelivery, deliveryViaLiveFeed, liveFeedPackages) => {
		const { selectedRightsBySuperRight, rightsPackage, LICENSED_LANGUAGES } = this.props;
		if (checkContentDelivery) {
			definitions = this.getFilteredByDelivery(definitions, rightsPackage, deliveryViaLiveFeed, liveFeedPackages);
		}

		let highlightRight = rightsPackage.filter(rp => rp.shortLabel === "HL");
		let highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";

		return definitions.map((right, i) => {
			if (right.key === "CONTENT_DELIVERY") return;
			if (right.key === "PROGRAM") return;

			if (right.key === "LICENSED_LANGUAGES") {
				if (!LICENSED_LANGUAGES || LICENSED_LANGUAGES.length === 0) return false;
			}

			return (
				<React.Fragment>
					<tr className="row" key={`list${i}`}>
						<RightTableItem
							className="right-name"
							value={this.context.t(`RIGHTS_${right.key}`)}
						/>
						{
							rightsPackage.map((rp, k) => {
								let liveFeedColumn = deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === rp.shortLabel;

								if (checkContentDelivery
									&& !liveFeedColumn
									&& (rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
										|| (highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"))
									&& rp.shortLabel !== "LT"
									&& rp.shortLabel !== "PR") return;

								if (right.key === "LICENSED_LANGUAGES") {
									return (
										<RightTableItem
											value={LICENSED_LANGUAGES.map(l => l.label).join(", ")}
										/>
									);
								}

								if (right.superRights.length > 0
									&& right.superRights.indexOf(rp.shortLabel) === -1) {
									return (
										<RightTableItem
											value="-"
										/>
									);
								}

								const defItems = selectedRightsBySuperRight[rp.id].items;
								let definition = defItems[right.key];
								let label = "";

								if (right.multiple) {
									if (Array.isArray(defItems[right.key])) {
										label = defItems[right.key].map(item => RightItemsDefinitions[item].label).join(", ");
									} else {
										label = defItems[right.key];
									}
								} else {
									const dynKey = `${right.key}_TEXT`;
									if (defItems[dynKey]) {
										label = defItems[dynKey];
									} else {
										label = definition && RightItemsDefinitions[definition].label;
									}
								}

								if (right.key === "RUNS" && defItems.RUNS_NUMBER) {
									label = defItems.RUNS_NUMBER;
								}


								if (right.key === "GRAPHICS" && defItems.GRAPHICS_LANGUAGES) {
									label = defItems.GRAPHICS_LANGUAGES.map(l => l.label).join(", ");
								}

								if (right.key === "COMMENTARY" && defItems.COMMENTARY_LANGUAGES) {
									label = defItems.COMMENTARY_LANGUAGES.map(l => l.label).join(", ");
								}

								if (right.key === "CAMERA") {
									label += ` ${defItems.CAMERAS}`;
								}

								return <RightTableItem key={`list_child${k}`} value={label} />;
							})
						}
					</tr>
					{selectedRightsBySuperRight[rightsPackage[0].id].items[`${right.key}_TEXTAREA`]
					&& (
						<tr className="row" key="reserved-rights-details">
							<RightTableItem value={this.getDetailsByKey(right.key, right.name)} className="right-name" />
							<RightTableItem
								key={`details-${i}`}
								textarea
								length={checkContentDelivery ? this.getProductionDetailsColumns().length + 1 : rightsPackage.length}
								value={selectedRightsBySuperRight[rightsPackage[0].id].items[`${right.key}_TEXTAREA`]}
							/>
						</tr>
					)}
				</React.Fragment>
			);
		});
	};

	getProductionDetailsColumns = () => {
		const {
			rightsPackage,
		} = this.props;

		let highlightRight = rightsPackage.filter(rp => rp.shortLabel === "HL");
		let highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";

		return rightsPackage.filter((rp, i) => {
			if ((rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
					|| (highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"))
				&& rp.shortLabel !== "PR"
				&& rp.shortLabel !== "LT") return false;

			return true;
		});
	};

	getFilteredByDelivery = (definitions, rightsPackage, deliveryViaLiveFeed, liveFeedPackages) => definitions.filter((d) => {
		if (d.checkDelivery) {
			return rightsPackage.some(p => !((!(deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === p.shortLabel) && p.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
				&& p.shortLabel !== "LT" && p.shortLabel !== "PR")
				|| p.shortLabel === "PR" && d.key !== "TECHNICAL_DELIVERY"));
		}
		return true;
	});

	render() {
		const {
			selectedRightsBySuperRight,
			rightsPackage,
			PROGRAM_SCRIPT,
			PROGRAM_SUBTITLES,
			PROGRAM_LANGUAGE,
			COMMENTS_RIGHTS,
			COMMENTS_PRODUCTION,
			HL_INPUT,
			NA_INPUT,
			programDescription,
			startDateMode,
			startDate,
			endDateMode,
			endDateLimit,
			endDate,
		} = this.props;
		let packagesAvailable = rightsPackage.map(rp => rp.shortLabel);
		let liveFeedPackages = rightsPackage.filter(rp => rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");
		let deliveryViaLiveFeed = liveFeedPackages.length > 0 && packagesAvailable.indexOf("LT") === -1;
		let highlightRight = rightsPackage.filter(rp => rp.shortLabel === "HL");
		let highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";


		return (
			<div className="term-sheet">

				{programDescription && (
					<div className="description-wrapper">
						<div className="title spacer-bottom">
							{this.context.t("LISTING_DETAILS_PROGRAM_DEFINITION")}
						</div>
						<div className="txt description-text">
							<RepresentationTextArea value={programDescription} />
						</div>
					</div>
				)}

				<div className="additional-items">
					<div className="item">
						<i className="fa fa-calendar-check-o icon" />
						<div className="cap">
							{this.context.t("LISTING_DETAILS_LICENSE_START")}
							:


						</div>
						<div className="d-flex">
							<b>
								{startDateMode !== "DATE" && this.context.t("LISTING_DETAILS_LICENSE_START_CONCLUSION")}
								{startDateMode === "DATE" && ` ${Moment(startDate).format(DATE_FORMAT)}`}
							</b>
						</div>
					</div>
					<div className="item">
						<i className="fa fa-calendar-times-o icon" />
						<div className="cap">
							{this.context.t("LISTING_DETAILS_LICENSE_END")}
							:


						</div>
						<div className="d-flex">
							<b>
								{endDateMode === "LIMITED" && ` ${endDateLimit}${this.context.t("LISTING_DETAILS_LICENSE_END_DAYS")}`}
								{endDateMode === "DATE" && ` ${Moment(endDate).format(DATE_FORMAT)}`}
								{endDateMode === "UNLIMITED" && this.context.t(" Unlimited")}
							</b>
						</div>
					</div>
				</div>

				<div className="term-sheet-items">
					<table>
						<tr className="row">
							<RightTableItem
								className="right-definition-title"
								value={this.context.t("LISTING_DETAILS_RIGHTS_HEADER_RIGHTS")}
							/>
							{
								rightsPackage.map((rp, i) => (
									<RightTableItem
										key={`rp-grant${i}`}
										className="right-definition-title"
										value={rp.name}
									/>
								))
							}
						</tr>
						{this.renderList(RightDefinitions, false)}
						{(this.hasRight("NA") && this.hasRight("HL"))
						&& (
							<tr className="row" key="transmission">
								<RightTableItem
									className="right-name"
									value={this.context.t("LISTING_DETAILS_RIGHTS_HEADER_GRANTED_TIME")}
								/>
								{
									rightsPackage.map((rp, k) => {
										let label = (rp.shortLabel === "NA") ? `${NA_INPUT} seconds` : rp.shortLabel === "HL" ? `${HL_INPUT} minutes` : "-";
										return (
											<RightTableItem
												key={`rp-list_childs${k}`}
												value={label}
											/>
										);
									})
								}
							</tr>
						)}
					</table>
				</div>

				{COMMENTS_RIGHTS && (
					<div>
						<div className="title spacer">
							{this.context.t("LISTING_DETAILS_RIGHTS_TITLE_AMENDMENTS")}
						</div>
						<div className="txt description-text">
							<RepresentationTextArea
								value={COMMENTS_RIGHTS}
							/>

						</div>
					</div>
				)}

				<div className="term-sheet-items">
					<table>
						<tr className="row">
							<RightTableItem
								className="right-definition-title"
								value={this.context.t("LISTING_DETAILS_RIGHTS_TITLE_PRODUCTION_DETAILS")}
							/>

							{deliveryViaLiveFeed
							&& (
								<RightTableItem
									className="right-definition-title"
									value={this.context.t("LISTING_DETAILS_RIGHTS_LIVE_FEED")}
								/>
							)}

							{
								rightsPackage.map((rp, i) => {
									if ((rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
											|| (highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"))
										&& rp.shortLabel !== "PR"
										&& rp.shortLabel !== "LT") return;
									let label = (rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT")
										? SuperRightProductionDetailsLabels.HL
										: SuperRightProductionDetailsLabels[rp.shortLabel];
									return (
										<RightTableItem
											key={`rp-grant${i}`}
											className="right-definition-title"
											value={label}
										/>
									);
								})
							}
						</tr>
						{this.renderList(ProductionStandardsDefinitions, true, deliveryViaLiveFeed, liveFeedPackages)}
						{packagesAvailable.indexOf("PR") !== -1 && PROGRAM_LANGUAGE && this.renderProgramInfo(PROGRAM_LANGUAGE, this.context.t("RIGHTS_LANGUAGES"), deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated)}
						{packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SUBTITLES && this.renderProgramInfo(PROGRAM_SUBTITLES, this.context.t("RIGHTS_SUBTITLES"), deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated)}
						{packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SCRIPT && this.renderProgramInfo(PROGRAM_SCRIPT, this.context.t("RIGHTS_SCRIPT"), deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated)}

					</table>
				</div>

				{
					selectedRightsBySuperRight[rightsPackage[0].id].items.TECHNICAL_FEE_DETAILS && (
						<div>
							<div className="title spacer">
								{this.context.t("LISTING_DETAILS_RIGHTS_TECHNICAL_FEE_DETAILS")}
							</div>
							<div className="txt description-text">
								{selectedRightsBySuperRight[rightsPackage[0].id].items.TECHNICAL_FEE_DETAILS}
							</div>
						</div>
					)}

				{COMMENTS_PRODUCTION && (
					<div>
						<div className="title spacer">
							{this.context.t("LISTING_DETAILS_RIGHTS_TITLE_AMENDMENTS_2")}
						</div>
						<div className="txt description-text">
							{COMMENTS_PRODUCTION}
						</div>
					</div>
				)}

			</div>
		);
	}
}

TermSheet.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TermSheet);
