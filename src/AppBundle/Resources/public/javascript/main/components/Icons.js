import React from 'react';

export const cancelIcon = assetsBaseDir + "app/images/cancel.png";
export const bucketIcon = assetsBaseDir + "app/images/bucket.png";
export const addIcon = assetsBaseDir + "app/images/add.png";
export const exclamationRoundIcon = assetsBaseDir + "app/images/exclamation_round.png";
export const clockRoundIcon = assetsBaseDir + "app/images/clock.png";
export const playIcon = assetsBaseDir + "app/images/play.png";
export const minusGreyIcon = <img src={assetsBaseDir + "app/images/minus-gray.png"} alt="close" />;
export const plusGreyIcon = <img src={assetsBaseDir + "app/images/plus-gray.png"} alt="open"/>;
export const minusYellowIcon = <img src={assetsBaseDir + "app/images/minus-yellow.png"} alt="close"/>;
export const plusYellowIcon = <img src={assetsBaseDir + "app/images/plus-yellow.png"} alt="open"/>;


export const bidIcon = assetsBaseDir + "app/images/hammer.png";
export const fixedIcon = assetsBaseDir + "app/images/bid.png";
export const docIcon = assetsBaseDir + "app/images/doc.png";
export const pdfIcon = assetsBaseDir + "app/images/pdf.png";
export const editIcon = assetsBaseDir + "app/images/edit.png";
export const blueEnvelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
export const infoIcon = assetsBaseDir + "app/images/info_blue.png";
export const soldIcon = assetsBaseDir + "app/images/sold.png";
export const expiredIcon = assetsBaseDir + "app/images/expired.png";
export const filterIcon = assetsBaseDir + "app/images/filter.png";
export const searchIcon = assetsBaseDir + "app/images/search.svg";
export const hammerIcon = assetsBaseDir + "app/images/listing/hammer.svg";

//rights
export const yellowCheckIcon = assetsBaseDir + "app/images/rights/exclusive.svg";
export const blueCheckIcon = assetsBaseDir + "app/images/rights/non-exclusive.svg";
export const greyMinusIcon = assetsBaseDir + "app/images/rights/non-included.svg";

//events
export const tournamentIcon = <img src={assetsBaseDir + "app/images/listing/trophy.svg"} alt=""/>;
export const seasonReleaseIcon = <img src={assetsBaseDir + "app/images/listing/calendar.svg"} alt=""/>;
export const sportIcon = <img src={assetsBaseDir + "app/images/listing/tennis-ball.svg"} alt=""/>;
export const fixturesEpisodeIcon = <i className="fa fa-play-circle" aria-hidden="true" style={{color: '#2aaaec', fontSize: 18}}/>;
export const sportCategoryIcon = <img src={assetsBaseDir + "app/images/listing/flag.svg"} alt=""/>;
export const eventTimeIcon = <img src={assetsBaseDir + "app/images/listing/calendar-clock.svg"} alt=""/>;
export const coinIcon = <img src={assetsBaseDir + "app/images/listing/coin.svg"} alt=""/>;


export const Spinner = ({test}) => (
    <div><i className="fa fa-cog fa-spin"/></div>
);