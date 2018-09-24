import React from 'react';
import {editedProgramSelected} from "../../main/actions/utils";
import {PropTypes} from "prop-types";
import {
    tournamentIcon,
    sportIcon,
    sportCategoryIcon,
    seasonReleaseIcon,
    fixturesEpisodeIcon,
    eventTimeIcon
} from "../../main/components/Icons";

class ContentListingEventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getFixtures = () => {
        const {seasons} = this.props;

        let fixtures = [];

        seasons.forEach( s => {
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures]
        });

        return fixtures;

    };

    getSchedules = () => {

        const { seasons , schedulesBySeason} = this.props;
        let schedules = {
            rounds : [],
            matches : []
        };
        seasons.forEach(s => {
            if (s.schedules) Object.entries(s.schedules).forEach((sh) =>{
                if (sh[1].selected && schedules.rounds.indexOf(sh[0]) === -1){
                    schedules.rounds.push(sh[0]);
                    sh[1].matches.forEach(m => {
                        if(m.selected) schedules.matches.push(m)
                    });
                }
            })
        });

        if ( schedulesBySeason ){
            schedulesBySeason.forEach(s => {
                if (s && Object.entries(s)) Object.entries(s).forEach((sh) =>{
                    if (schedules.rounds.indexOf(sh[0]) === -1){
                        schedules.rounds.push(sh[0]);
                        sh[1].matches.forEach(m => {
                            if(m.selected) schedules.matches.push(m)
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
                if (!s.to){
                    s.to = s.from;
                    s.year = s.from
                } else {
                    s.year = s.from + "/" + s.to.toString().slice(-2)
                }
            }

        });
        seasons = seasons.sort((a,b)=> a.from-b.from);

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
        let seasonTitle = ( seasons.length > 1 ) ? "Seasons: " : "Season: ";
        let episodesText = ( PROGRAM_EPISODES > 1 ) ? "episodes" : "episode";
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let seasonsArray =  this.getSeasonsYears(seasons);
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");

        let tournamentArray = [];
        if (tournament) {
            tournamentArray = Array.isArray(tournament) ? tournament : [tournament]
        }

        return (
            <div className="listing-attributes col">

                <div className="listing-item tournament">
                    {/*Tournament name*/}
                    {tournamentArray && tournamentArray.length > 0 && <span>{tournamentIcon} {tournamentArray[0].name}</span>}
                    {customTournament && !customId && <span>{tournamentIcon} {customTournament}</span>}
                    {tournamentArray && tournamentArray.length === 0 && !customTournament && <span>
                        {tournamentIcon} {this.context.t("LISTING_DETAILS_GENERAL_CONTENT")}
                    </span>}
                </div>

                <div className="listing-item">
                    {/*Sport name*/}
                    {sports && sports.length === 1 && <span>{sportIcon} {sports[0].name}</span>}
                    {sports && sports.length > 1 && <span>{sportIcon} {this.context.t("LISTING_DETAILS_MULTIPLE_SPORTS")}</span>}

                    {/*Sport category/Country*/}
                    {sportCategory && sportCategory.length > 0 ? (
                            <span>{sportCategoryIcon} {sportCategory[0].name}</span>
                        ) : (
                            <span>{sportCategoryIcon} {this.context.t("International")}</span>
                        )
                    }
                    {/*as is duplicate in sportCategory*/}
                    {/*{customCategory && <span>{sportCategoryIcon} {customCategory}</span>}*/}

                </div>

                <div className="listing-item">
                    {/*Season/Release*/}
                    {!this.showProgramInfo() && seasonsArray.length > 0 && (
                        seasonsArray.length > 1 ? (
                            <span>{seasonReleaseIcon} from {seasonsArray[0].year} to {seasonsArray[seasonsArray.length -1].year}</span>
                        ) : (
                            <span>{seasonReleaseIcon} Season {seasonsArray[0].year}</span>
                        )
                    )}
                    {this.showProgramInfo() && PROGRAM_YEAR && <span>{seasonReleaseIcon} Release year: {PROGRAM_YEAR}</span>}

                    {/*Event time*/}
                    <span>{eventTimeIcon} todo: event time</span>

                    {/*Fixtures/Episodes*/}
                    {!this.showProgramInfo() && this.getFixtures().length > 1 && <span>{fixturesEpisodeIcon} {this.getFixtures().length} fixtures</span>}
                    {!this.showProgramInfo() && this.getFixtures().length === 1 && this.getFixtures()[0].name && <span>{fixturesEpisodeIcon} {this.getFixtures()[0].name}</span>}
                    {this.showProgramInfo() && PROGRAM_EPISODES && <span>{fixturesEpisodeIcon} {PROGRAM_EPISODES} {episodesText}</span>}
                </div>
            </div>
        );
    }
}

ContentListingEventDetails.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ContentListingEventDetails