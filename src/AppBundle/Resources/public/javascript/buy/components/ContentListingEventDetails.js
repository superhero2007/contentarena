import React from 'react';
import {editedProgramSelected} from "../../main/actions/utils";
import {PropTypes} from "prop-types";
import {tournamentIcon, sportIcon, sportCategoryIcon, seasonReleaseIcon, fixturesEpisodeIcon, eventTimeIcon} from "../../main/components/Icons";

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
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");


        return (
            <div className="listing-attributes col">

                <div className="listing-item tournament">
                    {/*Tournament name*/}
                    {tournament && tournament.length > 0 && <span>{tournamentIcon} {tournament[0].name}</span>}
                    {customTournament && !customId && <span>{tournamentIcon} {customTournament}</span>}
                    {tournament && tournament.length === 0 && !customTournament && <span>
                        {tournamentIcon} {this.context.t("LISTING_DETAILS_GENERAL_CONTENT")}
                    </span>}
                </div>

                <div className="listing-item">
                    {/*Sport name*/}
                    {sports && sports.length === 1 && <span>{sportIcon} {sports[0].name}</span>}
                    {sports && sports.length > 1 && <span>
                        {sportIcon} {this.context.t("LISTING_DETAILS_MULTIPLE_SPORTS")}
                    </span>}

                    {/*Sport category*/}
                    {sportCategory && sportCategory.length > 0 && <span>{sportCategoryIcon} {sportCategory[0].name}</span> }
                    {customCategory && <span>{sportCategoryIcon} {customCategory}</span>}

                    {/*Season/Release*/}
                    {!this.showProgramInfo() && seasons && seasons.length > 0 && <span>{seasonReleaseIcon} {seasonName}</span>}
                    {this.showProgramInfo() && PROGRAM_YEAR && <span>{seasonReleaseIcon} {PROGRAM_YEAR}</span>}
                </div>

                <div className="listing-item">
                    {/*Event time*/}
                    <span>{eventTimeIcon} todo: event time</span>

                    {/*Fixtures/Episodes*/}
                    {!this.showProgramInfo() && this.getFixtures().length > 1 && <span>{fixturesEpisodeIcon} {this.getFixtures().length} fixtures</span>}
                    {!this.showProgramInfo() && this.getFixtures().length === 1 && <span>{fixturesEpisodeIcon} {this.getFixtures()[0].name}</span>}
                    {this.showProgramInfo() && PROGRAM_EPISODES && <span>{fixturesEpisodeIcon} {PROGRAM_EPISODES}</span>}
                </div>
            </div>
        );
    }
}

ContentListingEventDetails.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ContentListingEventDetails