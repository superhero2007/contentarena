import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {editedProgramSelected} from "../../main/actions/utils";

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
            isFragment
        } = this.props;

        let schedules = this.getSchedules();
        let rounds = schedules.rounds;
        let matches = schedules.matches;
        let seasonTitle = ( seasons.length > 1 ) ? "Seasons: " : "Season: ";
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");
        return (
            <div id="listing-attributes" className="col">

                <div className="listing-item event">
                    {/*Sport name*/}
                    {sports && sports.length === 1 && <span>{sports[0].name}</span>}
                    {sports && sports.length > 1 && <span>Multiple Sports</span>}

                    {/*Sport category*/}
                    {sportCategory && sportCategory.length > 0 && <span>{sportCategory[0].name}</span> }
                    {customCategory && <span>{customCategory}</span>}
                </div>

                <div className="listing-item event">
                    {/*Tournament name*/}
                    {tournament && tournament.length > 0 && <span>{tournament[0].name}</span>}
                    {customTournament && !customId && <span>{customTournament}</span>}
                    {tournament && tournament.length === 0 && !customTournament && <span>General content</span>}

                    {/*Season name*/}
                    {seasons && seasons.length > 0 && seasonName}

                    {/*Release*/}
                    {this.showProgramInfo() && PROGRAM_YEAR && <span>{PROGRAM_YEAR}</span>}
                </div>

                <div className="listing-item event">
                    {/*Round name*/}
                    {rounds.length === 1 && <span>{roundsName}</span>}
                    {rounds.length > 1 && <span>Multiple rounds</span>}

                    {/*Matches*/}
                    {matches.length === 1 &&
                    matches[0].competitors.map(( competitor, i, list)=>{
                        return <span key={i}>{competitor.name} {(list.length !== i + 1) && " vs " }</span>
                    })}

                    {/*Summarizes two types: rounds and matches*/}
                    {this.getFixtures().length > 1 && this.getFixtures().length +' fixtures'}
                    {this.getFixtures().length === 1 && this.getFixtures()[0].name}

                    {/*Episodes*/}
                    {this.showProgramInfo() && PROGRAM_EPISODES && <span>{PROGRAM_EPISODES}</span>}
                </div>
            </div>
        );
    }
}



export default ContentListingEventDetails