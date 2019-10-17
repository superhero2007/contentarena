import React, {} from "react";
import Translate from "@components/Translator/Translate";
import { Link } from "react-router-dom";
import { goTo } from "../../main/actions/utils";
import ShareListing from "../../common/components/ShareListing";

class PropertyActionListing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showOptions: false,
			showRemoveConfirm: false,
			showArchiveConfirm: false,
			showDeactivateConfirm: false,
		};
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
		const { customId, step, propertyId } = this.props;
		goTo(`properties/${propertyId}/listing/${customId}?step=${step}`);
	};

	submit = () => {
		const {
			customId, status, onRepublish, propertyId,
		} = this.props;

		if (status && status.name === "INACTIVE" && onRepublish) {
			onRepublish();
		} else {
			goTo(`properties/${propertyId}/listing/${customId}?step=6`);
		}
	};

	view = () => {
		const { customId } = this.props;
		goTo(`listing/${customId}`, true);
	};

	commercialOverview = () => {
		const { customId, propertyId } = this.props;
		goTo(`properties/${propertyId}/commercialoverview/${customId}`);
	};

	render() {
		const {
			id,
			customId,
			className,
			showEdit,
			showCommercialOverview,
			showRemove,
			showArchive,
			showSubmit,
			showDuplicate,
			showDeactivate,
			showLicense,
			showMessage,
			showView,
			onRemove,
			onArchive,
			onDuplicate,
			onDeactivate,
			style,
			canShare,
		} = this.props;

		const {
			showOptions, showRemoveConfirm, showDeactivateConfirm, showArchiveConfirm,
		} = this.state;

		return (
			<div className={className} style={style}>
				{showOptions && (
					<div className="tools-menu">
						{showLicense && (
							<div className="tools-option">
								<i className="icon-agreement" />
								<a
									className="action-box"
									href={`/license/bid/${customId}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Translate i18nKey="License Agreement" />
								</a>
							</div>
						)}
						{showMessage && (
							<div className="tools-option">
								<i className="icon-message" />
								<Link
									className="action-box"
									to={`/redirect-integration/messages-by-bid-seller/${id}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Translate i18nKey="Message" />
								</Link>
							</div>
						)}
						{showSubmit && (
							<div className="tools-option" onClick={this.submit}>
								<i className="icon-activate" />
								<Translate i18nKey="Submit" />
							</div>
						)}
						{showEdit && (
							<div className="tools-option" onClick={this.edit}>
								<i className="icon-edit" />
								<Translate i18nKey="Edit" />
							</div>
						)}
						{showCommercialOverview && (
							<div className="tools-option" onClick={this.commercialOverview}>
								<i className="icon-commercial-overview" />
								<Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />
							</div>
						)}
						{showDuplicate && (
							<div
								className="tools-option"
								onClick={() => {
									this.setState({ showOptions: false });
									onDuplicate(customId);
								}}
							>
								<i className="icon-copy" />
								<Translate i18nKey="Duplicate" />
							</div>
						)}
						{showView && (
							<div className="tools-option" onClick={this.view}>
								<i className="icon-view" />
								<Translate i18nKey="View" />
							</div>
						)}
						{showRemove && (
							<div
								className="tools-option"
								onClick={() => {
									this.setState({ showRemoveConfirm: true });
								}}
							>
								<i className="icon-remove" />
								<Translate i18nKey="MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM" />
							</div>
						)}
						{showArchive && (
							<div
								className="tools-option"
								onClick={() => {
									this.setState({ showArchiveConfirm: true });
								}}
							>
								<i className="icon-archive" />
								<Translate i18nKey="MANAGE_LISTINGS_ARCHIVE_BUTTON_CONFIRM" />
							</div>
						)}
						{showDeactivate && (
							<div
								className="tools-option"
								onClick={() => {
									this.setState({ showDeactivateConfirm: true });
								}}
							>
								<i className="icon-desactivate" />
								<Translate i18nKey="MANAGE_LISTINGS_DEACTIVATE_BUTTON_CONFIRM" />
							</div>
						)}

						{canShare && (
							<div className="tools-option">
								<ShareListing
									listingId={customId}
								/>
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

				<div className="tools-icon" onClick={this.toggleOptions}>
					<i className="icon-settings" />
				</div>
			</div>
		);
	}
}

export default PropertyActionListing;
