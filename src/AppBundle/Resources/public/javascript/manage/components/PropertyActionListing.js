import React, {} from "react";
import Moment from "moment/moment";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { goTo } from "../../main/actions/utils";
import { DATE_FORMAT, TIME_FORMAT } from "@constants";
import ShareListing from "../../common/components/ShareListing";
import { UserName } from "../../common/utils/listing";

class PropertyActionListing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showOptions: false,
			showRemoveConfirm: false,
			showArchiveConfirm: false,
			showDeactivateConfirm: false,
		};

		this.bucketIcon = `${assetsBaseDir}app/images/bucket_blue.png`;
		this.commercialIcon = `${assetsBaseDir}app/images/listing/default-sports/tennis.svg`;
		this.editIcon = `${assetsBaseDir}app/images/edit.png`;
		this.duplicateIcon = `${assetsBaseDir}app/images/duplicate.png`;
		this.viewIcon = `${assetsBaseDir}app/images/search.png`;
		this.submitIcon = `${assetsBaseDir}app/images/submit.png`;
		this.deactivateIcon = `${assetsBaseDir}app/images/close_red.png`;
	}

	onSelect = () => {
		const { onSelect, customId } = this.props;

		if (onSelect) onSelect(customId);
	};

	toggleOptions = (e) => {
		this.setState({ showOptions: !this.state.showOptions });
		e.stopPropagation();
	};

	edit = () => {
		const { customId, step, status } = this.props;
		let stepToShow = 1;

		if (status && status.name === "DRAFT") {
			stepToShow = step > 3 ? "sign" : (step + 1);
		}

		goTo(`contentlisting/${customId}/${stepToShow}`);
	};

	submit = () => {
		const { customId, status, onRepublish } = this.props;

		if (status && status.name === "INACTIVE" && onRepublish) {
			onRepublish();
		} else {
			goTo(`contentlisting/${customId}/sign`);
		}
	};

	view = () => {
		const { customId } = this.props;
		goTo(`listing/${customId}`, true);
	};

	render() {
		const {
			customId,
			className,
			showEdit,
			showCommericalOverview,
			showRemove,
			showArchive,
			showSubmit,
			showDuplicate,
			showDeactivate,
			showView,
			onRemove,
			onArchive,
			onDuplicate,
			onDeactivate,
			lastAction,
			lastActionDate,
			lastActionUser,
			owner,
			status,
			style,
			canShare,
		} = this.props;

		const {
			showOptions, showRemoveConfirm, showDeactivateConfirm, showArchiveConfirm,
		} = this.state;

		return (
			<div className={className} style={style}>
				{showOptions && (
					<div className="listing-menu-tooltip">
						{showSubmit && (
							<div className="option" onClick={this.submit}>
								<img src={this.submitIcon} alt="" />
								{" "}
								<Translate i18nKey="Submit" />
							</div>
						)}
						{showEdit && (
							<div className="option" onClick={this.edit}>
								<img src={this.editIcon} alt="" />
								{" "}
								<Translate i18nKey="Edit" />
							</div>
						)}
						{showCommericalOverview && (
							<div className="option">
								<img src={this.commercialIcon} alt="" />
								{" "}
								<Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />
							</div>
						)}
						{showDuplicate && (
							<div
								className="option"
								onClick={() => {
									this.setState({ showOptions: false });
									onDuplicate(customId);
								}}
							>
								<img src={this.duplicateIcon} alt="" />
								<Translate i18nKey="Duplicate" />
							</div>
						)}
						{showView && (
							<div className="option" onClick={this.view}>
								<img src={this.viewIcon} alt="" />
								<Translate i18nKey="View" />
							</div>
						)}
						{showRemove && (
							<div
								className="option"
								onClick={() => {
									this.setState({ showRemoveConfirm: true });
								}}
							>
								<img src={this.bucketIcon} alt="" />
								<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM" />
							</div>
						)}
						{showArchive && (
							<div
								className="option"
								onClick={() => {
									this.setState({ showArchiveConfirm: true });
								}}
							>
								<img src={this.bucketIcon} alt="" />
								<Translate i18nKey="MANAGE_LISTINGS_ARCHIVE_BUTTON_CONFIRM" />
							</div>
						)}
						{showDeactivate && (
							<div
								className="option"
								onClick={() => {
									this.setState({ showDeactivateConfirm: true });
								}}
							>
								<img src={this.deactivateIcon} style={{ width: 16 }} alt="" />
								<Translate i18nKey="MANAGE_LISTINGS_DEACTIVATE_BUTTON_CONFIRM" />
							</div>
						)}

						{canShare && (
							<div className="option">
								<ShareListing
									listingId={customId}
								/>
							</div>
						)}

						{lastAction && (
							<div className="last-action">
								<div style={{ fontWeight: 500 }}>
									<Translate i18nKey="MANAGE_LISTINGS_LAST_ACTION" />
									{" "}
									{`${lastAction.description} by `}
								</div>
								<UserName {...lastActionUser} />
								{" "}
								{lastActionDate && `- ${Moment(lastActionDate)
									.format(`${DATE_FORMAT} ${TIME_FORMAT}`)}`}
							</div>
						)}

						{owner && (
							<div className="last-action">
								<div style={{ fontWeight: 500 }}>
									<Translate i18nKey="MANAGE_LISTINGS_LISTING_OWNER" />
								</div>
								{`${owner.firstName} ${owner.lastName}`}
							</div>
						)}
					</div>
				)}

				{/* CONFIRM DEACTIVATE */}
				{showDeactivateConfirm && (
					<div className="confirmation-tooltip">
						<div className="confirmation-text">
							<Translate i18nKey="MANAGE_LISTINGS_DEACTIVATE_CONFIRMATION" />
						</div>
						<button
							className="button button-confirm"
							onClick={(e) => {
								this.setState({
									showOptions: false,
									showDeactivateConfirm: false,
								});
								onDeactivate();
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_DEACTIVATE_BUTTON_CONFIRM" />
						</button>
						<button
							className="button"
							onClick={(e) => {
								this.setState({ showDeactivateConfirm: false });
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_DEACTIVATE_BUTTON_CANCEL" />
						</button>
					</div>
				)}

				{/* CONFIRM REMOVE */}
				{showRemoveConfirm && (
					<div className="confirmation-tooltip">
						<div className="confirmation-text">
							<Translate i18nKey="MANAGE_LISTINGS_REMOVE_CONFIRMATION" />
						</div>
						<button
							className="button button-confirm"
							onClick={(e) => {
								this.setState({
									showOptions: false,
									showRemoveConfirm: false,
								});
								onRemove();
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM" />
						</button>
						<button
							className="button"
							onClick={(e) => {
								this.setState({ showRemoveConfirm: false });
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CANCEL" />
						</button>
					</div>
				)}

				{/* CONFIRM ARCHIVE */}
				{showArchiveConfirm && (
					<div className="confirmation-tooltip">
						<div className="confirmation-text">
							<Translate i18nKey="MANAGE_LISTINGS_ARCHIVE_CONFIRMATION" />
						</div>
						<button
							className="button button-confirm"
							onClick={(e) => {
								this.setState({
									showOptions: false,
									showArchiveConfirm: false,
								});
								onArchive();
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_ARCHIVE_BUTTON_CONFIRM" />
						</button>
						<button
							className="button"
							onClick={(e) => {
								this.setState({ showArchiveConfirm: false });
								e.stopPropagation();
							}}
						>
							<Translate i18nKey="MANAGE_LISTINGS_ARCHIVE_BUTTON_CANCEL" />
						</button>
					</div>
				)}

				{(status.name === "DRAFT") && (
					<div className="edit-icon" onClick={this.edit}>
						<i className="fa fa-pencil" />
					</div>
				)}

				<div className="menu-icon" onClick={this.toggleOptions}>
					<i className="fa fa-bars" />
				</div>

			</div>
		);
	}
}

PropertyActionListing.contextTypes = {
	t: PropTypes.func.isRequired,
};
export default PropertyActionListing;
