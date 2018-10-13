import React from 'react';
import {editedProgramSelected} from "../../main/actions/utils";
import {PropTypes} from "prop-types";
import moment from "moment";
import {
    tournamentIcon,
    sportIcon,
    sportCategoryIcon,
    seasonReleaseIcon,
    fixturesEpisodeIcon,
    eventTimeIcon
} from "../../main/components/Icons";

import {DATE_FORMAT} from "@constants";

class ContentListingEventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    buildSeasonString = (season) => {
        const { showSeasonDuration } = this.props;

        return (showSeasonDuration && season.startDate && season.endDate) ?
            `(${moment(season.startDate).format(DATE_FORMAT)} - ${moment(season.endDate).format(DATE_FORMAT)})` :
            '';
    };

    getFixtures = () => {
        const {seasons} = this.props;

        let fixtures = [];

        seasons.forEach(s => {
            if (s.fixtures) fixtures = [...fixtures, ...s.fixtures]
        });

        return fixtures;

    };

    getSchedules = () => {

        const {seasons, schedulesBySeason} = this.props;
        let schedules = {
            rounds: [],
            matches: []
        };
        seasons.forEach(s => {
            if (s.schedules) Object.entries(s.schedules).forEach((sh) => {
                if (sh[1].selected && schedules.rounds.indexOf(sh[0]) === -1) {
                    schedules.rounds.push(sh[0]);
                    sh[1].matches.forEach(m => {
                        if (m.selected) schedules.matches.push(m)
                    });
                }
            })
        });

        if (schedulesBySeason) {
            schedulesBySeason.forEach(s => {
                if (s && Object.entries(s)) Object.entries(s).forEach((sh) => {
                    if (schedules.rounds.indexOf(sh[0]) === -1) {
                        schedules.rounds.push(sh[0]);
                        sh[1].matches.forEach(m => {
                            if (m.selected) schedules.matches.push(m)
                        });
                    }


                })
            });
        }

        return schedules
    };

    showProgramInfo = () => {

        const {rightsPackage, PROGRAM_NAME} = this.props;
        let show = false;

        if (rightsPackage.length > 1) return show;
        show = editedProgramSelected(rightsPackage);
        return show && PROGRAM_NAME;

    };

    getSeasonsYears = (seasons) => {
        if (!seasons || seasons.length === 0) {
            return [];
        }
        seasons.forEach(s => {

            if (!s.to && !s.from && s.year) {
                let processedYears = s.year.split("/");
                s.from = processedYears.length === 1 ? processedYears[0] : 2000 + Number(processedYears[0]);
                s.to = processedYears.length === 1 ? false : 2000 + Number(processedYears[1]);
            }

            if (s.from) {
                if (!s.to) {
                    s.to = s.from;
                    s.year = s.from
                } else {
                    s.year = s.from + "/" + s.to.toString().slice(-2)
                }
            }

        });
        seasons = seasons.sort((a, b) => a.from - b.from);

        return seasons
    };

    render() {
        const {
            sports,
            sportCategory,
            customTournament,
            customCategory,
            customId,
            tournament,
            seasons,
            showCustomId,
            PROGRAM_YEAR,
            PROGRAM_EPISODES,
        } = this.props;

        let schedules = this.getSchedules();
        let rounds = schedules.rounds;
        let matches = schedules.matches;
        let seasonTitle = (seasons.length > 1) ? "Seasons: " : "Season: ";
        let episodesText = (PROGRAM_EPISODES > 1) ? "episodes" : "episode";
        let seasonName = seasonTitle + seasons.map(season => (season.year)).join(", ");
        let seasonsArray = this.getSeasonsYears(seasons);
        let roundsTitle = (rounds.length > 1) ? "Rounds: " : "Round: ";
        let roundsName = roundsTitle + rounds.join(", ");

        let tournamentArray = [];
        if (tournament) {
            tournamentArray = Array.isArray(tournament) ? tournament : [tournament]
        }

        return (
            <div className="listing-attributes col">

                <div className="listing-item tournament">
                    {/*Tournament name*/}
                    {tournamentArray && tournamentArray.length > 0 && (
                        <div className="event">
                            <div className="event-icon">
                                {tournamentIcon}
                            </div>
                            <div className="event-text">
                                {tournamentArray[0].name}
                            </div>
                        </div>
                    )}
                    {customTournament && !customId && (
                        <div className="event">
                            <div className="event-icon">
                                {tournamentIcon}
                            </div>
                            <div className="event-text">
                                {customTournament}
                            </div>
                        </div>
                    )}
                    {tournamentArray && tournamentArray.length === 0 && !customTournament && (
                        <div className="event">
                            <div className="event-icon">
                                {tournamentIcon}
                            </div>
                            <div className="event-text">
                                {this.context.t("LISTING_DETAILS_GENERAL_CONTENT")}
                            </div>
                        </div>
                    )}
                </div>

                <div className="listing-item">
                    {/*Sport name*/}
                    {sports && sports.length === 1 && (
                        <div className="event">
                            <div className="event-icon">
                                {sportIcon}
                            </div>
                            <div className="event-text">
                                {sports[0].name}
                            </div>
                        </div>
                    )}
                    {sports && sports.length > 1 && (
                        <div className="event">
                            <div className="event-icon">
                                {sportIcon}
                            </div>
                            <div className="event-text">
                                {this.context.t("LISTING_DETAILS_MULTIPLE_SPORTS")}
                            </div>
                        </div>
                    )}

                    {/*Sport category/Country*/}
                    {sportCategory && sportCategory.length > 0 ? (
                        <div className="event">
                            <div className="event-icon">
                                {sportCategoryIcon}
                            </div>
                            <div className="event-text">
                                {sportCategory[0].name}
                            </div>
                        </div>
                    ) : (
                        <div className="event">
                            <div className="event-icon">
                                {sportCategoryIcon}
                            </div>
                            <div className="event-text">
                                {this.context.t("International")}
                            </div>
                        </div>
                    )}

                    {/*as is duplicate in sportCategory*/}
                    {/*{customCategory && <span>{sportCategoryIcon} {customCategory}</span>}*/}

                </div>

                <div className="listing-item">
                    {/*Season/Release*/}
                    { seasonsArray.length > 0 && (
                         <div className="event">
                            <div className="event-icon">
                                {seasonReleaseIcon}
                            </div>
                            <div className="event-text">
                                {seasons.map(season => {
                                return <span>
                                        {season.year} {this.buildSeasonString(season)}
                                    </span>
                                })}
                            </div>
                        </div>
                    )}

                    {this.showProgramInfo() && PROGRAM_YEAR && (
                        <div className="event">
                            <div className="event-icon">
                                {seasonReleaseIcon}
                            </div>
                            <div className="event-text">
                                Release year: {PROGRAM_YEAR}
                            </div>
                        </div>
                    )}

                    {/*Event time*/}
                    {/*<span>{eventTimeIcon} todo: event time</span>*/}

                    {/*Fixtures/Episodes*/}
                    {!this.showProgramInfo() && this.getFixtures().length > 1 && (
                        <div className="event">
                            <div className="event-icon">
                                {fixturesEpisodeIcon}
                            </div>
                            <div className="event-text">
                                {this.getFixtures().length} fixtures
                            </div>
                        </div>
                    )}
                    {!this.showProgramInfo() && this.getFixtures().length === 1 && this.getFixtures()[0].name && (
                        <div className="event">
                            <div className="event-icon">
                                {fixturesEpisodeIcon}
                            </div>
                            <div className="event-text">
                                {this.getFixtures()[0].name}
                            </div>
                        </div>
                    )}
                    {this.showProgramInfo() && PROGRAM_EPISODES && (
                        <div className="event">
                            <div className="event-icon">
                                {fixturesEpisodeIcon}
                            </div>
                            <div className="event-icon">
                                {PROGRAM_EPISODES} {episodesText}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ContentListingEventDetails.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ContentListingEventDetails