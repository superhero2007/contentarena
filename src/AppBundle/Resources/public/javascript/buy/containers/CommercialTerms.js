import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Moment from "moment/moment";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader/Loader";
import Modal from "react-modal";
import test from "../actions";
import TerritoriesSalesPackages from "./TerritoriesSalesPackages";
import { pdfIcon } from "../../main/components/Icons";
import { DATE_FORMAT, TIME_FORMAT } from "@constants";
import { getSeasonDateString } from "../../common/utils/listing";
import { GenericModalStyle } from "../../main/styles/custom";

class CommercialTerms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: props.seasons,
			message: "",
			isLoading: false,
			isSuccess: false,
			isFail: false,
		};
		this.baseDir = `${assetsBaseDir}../`;
		this.textArea = React.createRef();
	}

	componentDidMount() {
		this.loadSchedule();
		this.setTextAreaHeight();
	}

	setTextAreaHeight = () => {
		if (this.textArea.current) {
			this.textArea.current.style.height = `${this.textArea.current.scrollHeight}px`;
		}
	};

	loadSchedule() {
		const _this = this;
		const { seasons, schedulesBySeason } = this.props;

		seasons.forEach((season, index) => {
			if (!season.schedules && !season.custom) {
				_this.setState({ loadingSchedule: true });
				ContentArena.Api.getSchedule(season.externalId).done((schedules) => {
					_this.setState({ loadingSchedule: false });
					let keys = [];
					if (schedulesBySeason && schedulesBySeason[index]) {
						keys = Object.keys(schedulesBySeason[index]);
						keys.forEach((k) => {
							schedulesBySeason[index][k].matches.forEach((m) => {
								if (m.selected) {
									schedules[k].matches.get(m.externalId).selected = true;
								}
							});
							schedules[k].selected = true;
						});
					}

					const tempSeasons = _this.state.seasons;
					tempSeasons[index].schedules = schedules;
					if (keys.length > 0) tempSeasons[index].showchedules = true;

					_this.setState({
						seasons: tempSeasons,
					});
				});
			}
		});
	}

	onChangeMessage = (e) => {
		this.setState({ message: e.target.value });
	};

	onMessage = () => {
		const { message } = this.state;
		const { id, company } = this.props;
		this.setState({ isLoading: true });

		const payload = {
			listing: id,
			recipient: company.id,
			content: message,
			role: "BUYER",
		};
		ContentArena.ContentApi.sendMessage(payload)
			.then(
				() => this.setState({ isSuccess: true }),
				() => this.setState({ isFail: true }),
			)
			.always(
				() => this.setState({ isLoading: false, message: "" }),
			);
	};

	onCloseModal = () => {
		this.setState({ isSuccess: false });
	};

	render() {
		const {
			website,
			attachments,
			description,
			programDetails,
			company,
			profile,
			userCanNotBuy,
		} = this.props;

		const {
			seasons, message, isSuccess, isLoading,
		} = this.state;
		const isDescriptionVisible = (description && !programDetails) || programDetails || website || (attachments && !!attachments.length);

		return (
			<div>
				<Modal isOpen={isSuccess} className="modal-wrapper message-modal" style={GenericModalStyle} onRequestClose={this.onCloseModal}>
					<div className="modal-body">
						<Translate i18nKey="MESSAGE_CONFIRM" />
					</div>
					<footer className="modal-footer">
						<button className="standard-button" onClick={this.onCloseModal}>
							<Translate i18nKey="MESSAGE_POPUP_BUTTON_CLOSE" />
						</button>
					</footer>
				</Modal>
				<div className="description-container">
					{isDescriptionVisible && (
						<div className="description-content">
							{description && !programDetails && (
								<div className="description-wrapper">
									<div className="spacer-bottom title">
										<Translate i18nKey="LISTING_DETAILS_EVENT_DESCRIPTION" />
									</div>
									<div className="txt description-text">
										<textarea
											readOnly
											ref={this.textArea}
											value={description}
											className="representation-textarea"
										/>
									</div>
								</div>
							)}
							{programDetails && programDetails}

							{(website || (attachments && attachments.length > 0)) && (
								<div className="additional-items">
									{website && (
										<div className="item">
											<i className="fa fa-link icon" />
											<div className="cap">
												<Translate i18nKey="LISTING_DETAILS_EVENT_TITLE_WEBSITE" />
											</div>
											<div className="d-flex">
												<b>
													{website && website.map((website, key) => (
														<a
															href={ContentArena.Utils.getWebsiteURl(website)}
															target="_blank"
															rel="noopener noreferrer"
															key={key}
														>
															{website}
														</a>
													))}
												</b>
											</div>
										</div>
									)}

									{attachments && attachments.length > 0 && (
										<div className="item">
											<i className="fa fa-folder-open-o icon" />
											<div className="cap">
												<Translate i18nKey="LISTING_DETAILS_EVENT_TITLE_ATTACHMENTS" />
											</div>
											<div className="d-flex">
												<b>
													{attachments.map((a, key) => (
														<div className="attachment-item" key={key}>
															<a download={a.name} target="_blank" href={this.baseDir + a.file} rel="noopener noreferrer">
																<img src={pdfIcon} alt="" />
																{a.name}
															</a>
														</div>
													))}
												</b>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					)}
					{profile === "BUYER" && !userCanNotBuy && (
						<div className={`message-wrapper ${!isDescriptionVisible && "no-description"}`}>
							<div className="message-wrapper__container">
								<div className="message-wrapper__container-title">
									<div><Translate i18nKey="MESSAGE_TITLE" /></div>
									<div>{company.legalName}</div>
								</div>
								<div className="message-wrapper__container-content">
									<textarea
										placeholder={this.context.t("MESSAGE_PLACEHOLDER")}
										value={message}
										onChange={this.onChangeMessage}
									/>
								</div>
								<div className="message-wrapper__container-button">
									<button className="ca-btn link-border" onClick={this.onMessage} disabled={!message || isLoading}>
										{isLoading ? <Loader loading xSmall /> : <Translate i18nKey="MESSAGES_SEND_BUTTON" />}
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* SEASON/FIXTURES */}
				{seasons && seasons.length > 0 && (
					<>
						<div className="spacer-bottom title">
							<Translate i18nKey="LISTING_DETAILS_EVENT_TITLE_SEASON" />
						</div>
						{seasons.map((season, key) => (
							<div key={`season-${key}`} className="season-details">
								<div className="season-cap">
									{/* {season.name} {" "} */}
									{season.customStartDate && season.customEndDate && (
										getSeasonDateString(season)
									)}
								</div>
								<div>
									{season.fixtures && season.fixtures.length > 0 && season.fixtures.map((fixture, i) => (
										<div className="row-container" style={{ width: "45%" }} key={i}>
											<div className="name">
												{fixture.name}
											</div>
											<div className="actions" style={{ minWidth: 230 }}>
												<div
													className="item"
													style={{
														width: "50%",
														marginLeft: 0,
													}}
												>
													<i className="fa fa-calendar icon" />
													{!fixture.date && "Date N/A"}
													{fixture.date && Moment(fixture.date)
														.format(DATE_FORMAT)}
												</div>
												<div
													className="item"
													style={{
														width: "50%",
														marginLeft: 0,
													}}
												>
													<i className="fa fa-clock-o icon" />
													{!fixture.time && !fixture.date && "Time N/A"}
													{!fixture.time && fixture.date && Moment(fixture.date).format(`${TIME_FORMAT} [UTC]`)}
													{fixture.time && `${fixture.time} UTC`}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</>
				)}

				<TerritoriesSalesPackages {...this.props} />
			</div>
		);
	}
}

CommercialTerms.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CommercialTerms);
