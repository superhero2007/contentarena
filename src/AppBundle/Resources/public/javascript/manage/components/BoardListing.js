import React, {} from "react";
import Moment from "moment/moment";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { goTo } from "../../main/actions/utils";
import {
	clockRoundIcon, exclamationRoundIcon, expiredIcon, playIcon, soldIcon,
} from "../../main/components/Icons";
import { DATE_FORMAT, TIME_FORMAT } from "@constants";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import ShareListing from "../../common/components/ShareListing";

class BoardListing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showOptions: false,
			showRemoveConfirm: false,
			showArchiveConfirm: false,
			showDeactivateConfirm: false,
		};

		this.bucketIcon = `${assetsBaseDir}app/images/bucket_blue.png`;
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

	hideOptions = (e) => {
		this.setState({ showOptions: false });
		e.stopPropagation();
	};

	render() {
		const {
			PROGRAM_NAME,
			name,
			customId,
			expiresAt,
			salesPackages,
			rightsPackage,
			className,
			showEdit,
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
			hasPendingBids,
			style,
			canShare,
		} = this.props;

		const {
			showOptions, showRemoveConfirm, showDeactivateConfirm, showArchiveConfirm, showStatusInfo,
		} = this.state;

		return (
			<div className={className} style={style}>
				{showOptions && (
					<div className="options-tooltip">
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
								{`${lastActionUser.firstName} ${lastActionUser.lastName}`}
								{" "}
								{lastActionDate && `- ${Moment(lastActionDate)
									.format(`${DATE_FORMAT} ${TIME_FORMAT} [UTC]`)}`}
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

				{/* STATUS INFO */}
				{showStatusInfo && (
					<div className="status-tooltip">
						<div className="option">
							{status.name === "PENDING" && "Listing under review. Not visible in the marketplace yet."}
							{status.name === "INACTIVE" && "Listing is deactivated."}
							{status.name === "REJECTED" && "Listing rejected. Please edit or contact support."}
							{status.name === "EXPIRED" && "This listing has expired."}
							{status.name === "SOLD_OUT" && "All sales bundle of this listing were sold."}
							{hasPendingBids && "There are open bids on this listing. You can view the bid via the Commercial Overview tab. Until the bid is processed, the edit, decline and remove functionality will be unavailable"}
						</div>
					</div>
				)}

				{((status.name !== "DRAFT" && status.name !== "EDITED") || hasPendingBids)
				&& (
					<div
						className="status-icon"
						onMouseOver={() => {
							this.setState({ showStatusInfo: true });
						}}
						onMouseLeave={() => {
							this.setState({ showStatusInfo: false });
						}}
					>
						{status.name === "PENDING" && <img src={clockRoundIcon} alt="" />}
						{status.name === "INACTIVE" && <img src={playIcon} alt="" />}
						{status.name === "REJECTED" && <img src={exclamationRoundIcon} alt="" />}
						{status.name === "EXPIRED" && <img src={expiredIcon} alt="" />}
						{status.name === "SOLD_OUT" && <img src={soldIcon} alt="" />}
						{hasPendingBids && <img src={exclamationRoundIcon} alt="" />}
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
				<div className="name" title={name}>
					{name}
				</div>

				<ContentListingRightsPackage
					rightsPackage={rightsPackage}
					programName={PROGRAM_NAME}
					boardLabels
				/>

				<div className="expiry">
					{salesPackages && (
						<div>
							{salesPackages.length}
							{" "}
							territorial bundle


							{salesPackages.length > 1 && "s"}
						</div>
					)}
					<div>
						<div style={{ fontWeight: 500 }}><Translate i18nKey="Expiry:" /></div>
						{" "}
						{expiresAt ? Moment(expiresAt)
							.format(DATE_FORMAT) : "Not set"}
					</div>
				</div>

			</div>
		);
	}
}

BoardListing.contextTypes = {
	t: PropTypes.func.isRequired,
};
export default BoardListing;
