import React from "react";

export const contentWhiteLogo = <img src={`${assetsBaseDir}app/img/logo_contentarena.png`} alt="Content Arena" />;

export const cancelIcon = `${assetsBaseDir}app/images/cancel.png`;
export const checkIcon = `${assetsBaseDir}app/images/check.png`;
export const duplicateIcon = `${assetsBaseDir}app/images/duplicate.png`;
export const bucketIcon = `${assetsBaseDir}app/images/bucket.png`;
export const addIcon = `${assetsBaseDir}app/images/add.png`;
export const exclamationRoundIcon = `${assetsBaseDir}app/images/exclamation_round.png`;
export const clockRoundIcon = `${assetsBaseDir}app/images/clock.png`;
export const playIcon = `${assetsBaseDir}app/images/play.png`;

export const minusGreyIcon = <img src={`${assetsBaseDir}app/images/minus-gray.png`} alt="close" />;
export const plusGreyIcon = <img src={`${assetsBaseDir}app/images/plus-gray.png`} alt="open" />;
export const minusYellowIcon = <img src={`${assetsBaseDir}app/images/minus-yellow.png`} alt="close" />;
export const plusYellowIcon = <img src={`${assetsBaseDir}app/images/plus-yellow.png`} alt="open" />;

export const bidIcon = `${assetsBaseDir}app/images/hammer.png`;
export const fixedIcon = `${assetsBaseDir}app/images/bid.png`;
export const editIcon = `${assetsBaseDir}app/images/edit.png`;
export const blueEnvelopeIcon = `${assetsBaseDir}app/images/envelope_2.png`;
export const infoIcon = `${assetsBaseDir}app/images/info_blue.png`;
export const soldIcon = `${assetsBaseDir}app/images/sold.png`;
export const expiredIcon = `${assetsBaseDir}app/images/expired.png`;
export const filterIcon = `${assetsBaseDir}app/images/filter.png`;
export const searchIcon = `${assetsBaseDir}app/images/search.svg`;
export const hammerIcon = `${assetsBaseDir}app/images/listing/hammer.svg`;
export const pdfIcon = `${assetsBaseDir}app/images/file-pdf.svg`;
export const disabledPdfIcon = `${assetsBaseDir}app/images/file-pdf-disabled.svg`;
export const commentIcon = `${assetsBaseDir}app/images/comment-icon.svg`;
export const packageIcon = `${assetsBaseDir}app/images/package.svg`;

// rights
export const yellowCheckIcon = `${assetsBaseDir}app/images/rights/exclusive.svg`;
export const blueCheckIcon = `${assetsBaseDir}app/images/rights/non-exclusive.svg`;
export const greyMinusIcon = `${assetsBaseDir}app/images/rights/non-included.svg`;
export const yellowCheckOutlined = `${assetsBaseDir}app/images/rights/yellow_check_outlined.svg`;
export const blueCheckOutlined = `${assetsBaseDir}app/images/rights/blue_check_outlined.svg`;

export const exclusiveRightAvailable = `${assetsBaseDir}app/images/rights/exclusive_right_available.svg`;
export const nonExclusiveRightAvailable = `${assetsBaseDir}app/images/rights/non_exclusive_right_available.svg`;
export const exclusiveRightOffered = `${assetsBaseDir}app/images/rights/exclusive_right_offered.svg`;
export const nonExclusiveRightOffered = `${assetsBaseDir}app/images/rights/non_exclusive_right_offered.svg`;
export const exclusiveRightSold = `${assetsBaseDir}app/images/rights/exclusive_right_sold.svg`;
export const nonExclusiveRightSold = `${assetsBaseDir}app/images/rights/non_exclusive_right_sold.svg`;

// events
export const tournamentIcon = <img src={`${assetsBaseDir}app/images/listing/trophy.svg`} alt="" />;
export const seasonReleaseIcon = <img src={`${assetsBaseDir}app/images/listing/calendar.svg`} alt="" />;
export const sportIcon = <img src={`${assetsBaseDir}app/images/listing/tennis-ball.svg`} alt="" />;
export const fixturesEpisodeIcon = (
	<i
		className="fa fa-play-circle"
		aria-hidden="true"
		style={{ color: "#2aaaec", fontSize: 22 }}
	/>
);
export const sportCategoryIcon = <img src={`${assetsBaseDir}app/images/listing/flag.svg`} alt="" />;
export const eventTimeIcon = <img src={`${assetsBaseDir}app/images/listing/calendar-clock.svg`} alt="" />;
export const coinIcon = <img src={`${assetsBaseDir}app/images/listing/coin.svg`} alt="" />;

// messages
export const attachmentClipIcon = <img src={`${assetsBaseDir}app/images/attachment-clip.svg`} alt="" />;

// header
export const inviteIcon = `${assetsBaseDir}app/images/invite-icon-3.svg`;

// terms
export const pencilIcon = `${assetsBaseDir}app/images/pencil-edit-button.svg`;
export const reloadIcon = `${assetsBaseDir}app/images/reload.svg`;
export const minusIcon = `${assetsBaseDir}app/images/minus.svg`;
export const trashIconRed = `${assetsBaseDir}app/images/trash-red.svg`;
export const trashIcon = `${assetsBaseDir}app/images/trash-gray.svg`;
export const trashIconWhite = `${assetsBaseDir}app/images/trash-white.svg`;

// cms
export const cmsWorldActive = `${assetsBaseDir}app/images/cms/world-active.svg`;
export const cmsWorldDisabled = `${assetsBaseDir}app/images/cms/world-disabled.svg`;
export const cmsFile = `${assetsBaseDir}app/images/cms/file.svg`;
export const cmsFlow = `${assetsBaseDir}app/images/cms/flow.svg`;


export const IconYellowCircle = ({ icon, onClick }) => (
	<div onClick={onClick} className="icon-circle-background"><img src={icon} alt="" /></div>
);

export const Spinner = () => (
	<div><i className="fa fa-cog fa-spin" /></div>
);
